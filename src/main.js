var cheerio = require('cheerio');

function extractText(html) {

}

function extractTitle(html) {
  var $ = cheerio.load(html);
  return $('title').text().trim();
}

function extractImages(html) {

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
  if (openGraphTags['og:title']) {
    return openGraphTags['og:title'].trim();
  }

  var twitterTags = extractTwitterTags(html);
  if (twitterTags['twitter:title']) {
    return twitterTags['twitter:title'].trim();
  }

  var $ = cheerio.load(html);

  return $('title').text().trim();
}

function extractSummary(html) {

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

}

module.exports = {
  extractImages: extractImages,
  extractArticleTags: extractArticleTags,
  extractOpenGraphTags: extractOpenGraphTags,
  extractTwitterTags: extractTwitterTags,
};
