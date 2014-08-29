![Pillage](http://i.imgur.com/oaliSyP.jpg)

Pillage is a super awesome Node.js library for parsing webpages. It uses a baller
algorithm✝ to identify the content region of a webpage with accuracy that's really,
really, really, really ... fun. Once we have the content region we can parse out text,
images, videos and other media. We also threw in a lot of the easy stuff like OG tags
for your convenience.

<sub>✝ It basically searches for every text node, then recursively climbs the parent tree, assigning a weighed "score" based on text length to each parent. The value rapidly drops off as we move up the tree. This is done for all text nodes so the weights accumulate to identify the most probable shared parent. Once we have that wrapper we can make assumptions and easily parse out body content.</sub>

## Install

`npm install pillage`

## Usage

```js
var pillage = require('pillage');

// Fetch a URL and process
pillage(url, function(err, result) {
  console.log(result);
});

// or, process HTML directly
var result = pillage(html);
console.log(result);
 ```

```js
 // Here's the object structure that it will return
 return {
   title: extractTitle(html),
   description: extractDescription(html),
   text: extractText(html),
   images: extractImages(html),
   videos: extractVideos(html),
   twitterTags: extractTwitterTags(html),
   openGraphTags: extractOpenGraphTags(html),
   articleTags: extractArticleTags(html),
   oEmbed: extractOEmbed(html),
 };
```

## License

MIT

## Author

Mike Holly
