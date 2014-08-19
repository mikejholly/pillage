var fs     = require('fs');
var should = require('should');
var main   = require('../src/main');
var html   = fs.readFileSync(__dirname + '/fixtures/buzzfeed.html', 'utf8');

describe('extractOpenGraphTags', function() {
  it('should return all open graph tags', function() {
    var tags = main.extractOpenGraphTags(html);
    tags.should.have.property('og:title');
  });
});

describe('extractArticleTags', function() {
  it('should return all article meta tags', function() {
    var tags = main.extractArticleTags(html);
    tags.should.have.property('article:author');
  });
});

describe('extractTwitterTags', function() {
  it('should return all twitter meta tags', function() {
    var tags = main.extractTwitterTags(html);
    tags.should.have.property('twitter:url');
  });
});
