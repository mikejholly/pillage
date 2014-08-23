'use strict';

var _       = require('lodash');
var cheerio = require('cheerio');
var oid     = require('oid');

function getLinkToTextRatio($, el) {

  var $el = $(el);

  if ($el.parents('a').length > 0) {
    return 1;
  }

  var cleanedText = $el.text().trim();
  var cleanedTextLength = cleanedText.length;

  if (cleanedTextLength < 1) {
    return 0;
  }

  var linkTextLength = 0;
  var linkText = '';

  $el.find('a').each(function() {
    var $link = $(this);
    linkText += $link.text().trim();
    linkTextLength += $link.text().trim().length;
  });

  return linkTextLength / cleanedTextLength;
}

function getContentNode($, textNodes) {
  var candidates = {};
  var nodes = {};

  textNodes.forEach(function(node) {
    var textLength = node.data.length;
    $(node).parents().each(function(i) {
      var hash = oid.hash(this);
      nodes[hash] = this;
      if (typeof candidates[hash] === 'undefined') {
        candidates[hash] = textLength / (i * 5 + 1);
      } else {
        candidates[hash] += textLength / (i * 5 + 1);
      }
    });
  });

  var items = _(candidates).pairs().sortBy(function(pair) {
    return -pair[1];
  }).value();

  var winner = items.shift();
  return nodes[winner[0]];
}

function extractText(html) {
  var $ = cheerio.load(html);

  $('head, script, style').remove();

  var textNodes = [];
  findAllTextNodes($, $.root(), textNodes);

  var contentNode = getContentNode($, textNodes);

  var lines = [];
  var selector = 'h1, h2, h3, h4, h5, h6, p, blockquote, li';
  $(contentNode).find(selector).each(function() {
    var line  = $(this).text().trim().replace(/\s+/g, ' ');
    var ratio = getLinkToTextRatio($, this);
    if (ratio < 0.25 && line.length > 12) {
      lines.push(line);
    }
  });

  return lines.join('\n\n');
}

function findAllTextNodes($, el, textNodes) {
  $(el).contents().each(function() {
    if (this.type == 'text' && this.data.trim().length > 0 && $(this).parents('a').length < 1) {
      textNodes.push(this);
    }
    findAllTextNodes($, this, textNodes);
  });
}

function extractTitle(html) {
  var $ = cheerio.load(html);
  return $('title').text().trim();
}

function extractImages(html) {
  var $ = cheerio.load(html);

  $('head, script, style').remove();

  var textNodes = [];
  findAllTextNodes($, $.root(), textNodes);

  var contentNode = getContentNode($, textNodes);

  var imageUrls = [];
  $(contentNode).find('img').each(function(i) {
    var src = $(this).attr('src');
    if (!/^data:/.test(src)) {
      imageUrls.push(src);
    }
  });

  return imageUrls;
}

function extractCanonicalUrl(html) {
  var $ = cheerio.load(html);

  var link = $('link[rel=canonical]').attr('href');
  if (link) {
    return link.trim();
  }

  var openGraphTags = extractOpenGraphTags(html);
  if (openGraphTags['og:url']) {
    return openGraphTags['og:url'].trim();
  }

  return null;
}

function extractDescription(html) {
  var openGraphTags = extractOpenGraphTags(html);
  if (openGraphTags['og:description']) {
    return openGraphTags['og:description'].trim();
  }

  var twitterTags = extractTwitterTags(html);
  if (twitterTags['twitter:description']) {
    return twitterTags['twitter:description'].trim();
  }

  var $ = cheerio.load(html);

  var desc = $('meta[name=description]');
  if (desc.length) {
    return desc.attr('content').trim();
  }

  return $('title').text().trim();
}

function extractSummary(html) {
  return extractDescription(html);
}

function extractOpenGraphTags(html) {
  var $ = cheerio.load(html);
  var tags = {};
  $('meta[property^="og:"]').each(function(i, el) {
    var $el = $(el);
    tags[$el.attr('property').trim()] = $el.attr('content').trim();
  });
  return tags;
}

function extractTwitterTags(html) {
  var $ = cheerio.load(html);
  var tags = {};
  $('meta[name^="twitter:"]').each(function(i, el) {
    var $el = $(el);
    tags[$el.attr('name').trim()] = $el.attr('content').trim();
  });
  return tags;
}

function extractArticleTags(html) {
  var $ = cheerio.load(html);
  var tags = {};
  $('meta[property^="article:"]').each(function(i, el) {
    var $el = $(el);
    tags[$el.attr('property').trim()] = $el.attr('content').trim();
  });
  return tags;
}

function extractVideos(html) {
  var $ = cheerio.load(html);
  var videoUrls = [];
  $('iframe').each(function() {
    var src = $(this).attr('src');
    if (/youtube.com/.test(src)) {
      videoUrls.push(src);
    }
  });
  return videoUrls;
}

module.exports = function(resource, fn) {
  if (/^https?:\/\//.test(resource)) {
    request(resource, function(err, res, body) {
      fn(err, body);
    });
  } else {
    return pillage(html);
  }
};

function pillage(html) {
  return {
    title: extractTitle(html),
    description: extractDescription(html),
    text: extractText(html),
    images: extractImages(html),
    videos: extractVideos(html),
    twitterTags: extractTwitterTags(html),
    openGraphTags: extractOpenGraphTags(html),
    articleTags: extractArticleTags(html),
  };
}

_.extend(module.exports, {
  extractText: extractText,
  extractImages: extractImages,
  extractVideos: extractVideos,
  extractArticleTags: extractArticleTags,
  extractOpenGraphTags: extractOpenGraphTags,
  extractTwitterTags: extractTwitterTags,
});
