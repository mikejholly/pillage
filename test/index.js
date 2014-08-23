var fs      = require('fs');
var should  = require('should');
var pillage = require('../src/pillage');

var load = function(name) {
  return fs.readFileSync(__dirname + '/fixtures/' + name + '.html', 'utf8');
}

var articleSparseText = load('buzzfeed');
var articleWithImages = load('images');
var articleWithVideos = load('wired');

describe('extractOpenGraphTags', function() {
  it('should return all open graph tags', function() {
    var tags = pillage.extractOpenGraphTags(articleSparseText);
    tags.should.have.property('og:title');
  });
});

describe('extractArticleTags', function() {
  it('should return all article meta tags', function() {
    var tags = pillage.extractArticleTags(articleSparseText);
    tags.should.have.property('article:author');
  });
});

describe('extractTwitterTags', function() {
  it('should return all twitter meta tags', function() {
    var tags = pillage.extractTwitterTags(articleSparseText);
    tags.should.have.property('twitter:title');
  });
});

describe('extractText', function() {
  it('should extract document text', function() {
    var text = pillage.extractText(articleSparseText);
  });
});

describe('extractImages', function() {
  it('should extract images', function() {
    var images = pillage.extractImages(articleWithImages);
    images.should.have.lengthOf(23);
  });
});

describe('extractVideos', function() {
  it('should extract videos', function() {
    var videos = pillage.extractVideos(articleWithVideos);
    videos.should.have.lengthOf(2);
  });
});
