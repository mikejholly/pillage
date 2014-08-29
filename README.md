<pre>
      ::::::::: ::::::::::: :::        :::            :::      ::::::::  ::::::::::
     :+:    :+:    :+:     :+:        :+:          :+: :+:   :+:    :+: :+:
    +:+    +:+    +:+     +:+        +:+         +:+   +:+  +:+        +:+
   +#++:++#+     +#+     +#+        +#+        +#++:++#++: :#:        +#++:++#
  +#+           +#+     +#+        +#+        +#+     +#+ +#+   +#+# +#+
 #+#           #+#     #+#        #+#        #+#     #+# #+#    #+# #+#
###       ########### ########## ########## ###     ###  ########  ##########       
</pre>

 Pillage is a super awesome Node.js library for parsing webpages. It uses a baller
 algorithm to identify the content region of a webpage with incredibly fun
 accuracy. Once we have the content region we can parse out text, images, videos
 and other media. We also through in a lot of the easy stuff like OG tags for your
 convenience.

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
