#BLOGBLIMP

###HTML5 website theme with responsive video gallery

------------------------------------------------------------------------

##LICENSE

This is the company website for <http://blogblimp.com>.

All code is available via MIT license.

However, please note, the BlogBlimp logo (i.e., the blimp), all original artwork, and original written copy pertaining specifically to BlogBlimp are proprietary and may not be duplicated.  However, you're free to clone this repo and refactor the code therein and incorporate your own styling to generate another website with similar functionality.  Please do not replicate any proprietary styling or brand related features--i.e., visual or written elements--of the BlogBlimp website on your own URL without the express written permission to do so.  Attribution / credit is appreciated but not required.

------------------------------------------------------------------------

##ACKNOWLEDGEMENTS

The site's theme is comprised of simple static HTML5 pages that leverage Javascript and JQuery, but also includes a hybridized version of the PhotoSwipe gallery by CodeComputerLove and the Reveal modal from Zurb.  These two scripts were combined to create a cool responsive gallery of thumbnails; clicking on any thumbnail within the gallery activates activates a dropdown modal pertaining to that thumbnail; in each respective modal that is activated, a related video can be embedded.  The awesome MediaElement.js player by John Dyer delivers HTML5 video throughout the site with Flash and Silverlight "fall-forward", enabling the video to play on nearly any device and on older browsers.  Additionally, an elaborately customized version of the visually fun Spritely plugin by Artlogic is used to create a catchy animation on the Home page.

------------------------------------------------------------------------

##APP LAYOUT

Presently, various scripts and stylesheets are spread out in several incongruous directories.  We're in the process of consolidating these in a more sensible and intuitive manner.  Fixing this is at the top of our TODO list.

-build: a MediaElement player directory
-font: custom fonts and icons
-media: video assets and a few random jpegs
-scripts: Javascript for our flying blimp sprite
-src: a MediaElement player directory
-styles: various CSS files



##NOTES ON USING VIDEO IN YOUR PORTFOLIO PAGE

On the "Portfolio" page, embedded text in the drop-down modal can be easily switched to embedded video.  See comments in portfolio.html.  Videos can be stored locally in the *media* folder.  See below for faster video delivery via a CDN.


##NOTES ON DEPLOYMENT

Our production site is deployed on AWS and uses Route53. For its Content Delivery Network, video and various scripts are distributed via CloudFront (via http://awesome.blogblimp.com).  Serving the videos (or any static files or scripts) via AWS is simply a matter of uploading them to S3, and changing the URL within the appropriate HTML files.

##TO DO
-optimze and refactor app structure/layout and rename variables, fix imports, and links accordingly
-prepare unique videos for each modal in the portfolio page
-enable dynamic resizing of the drop-down modals and the MediaElement.js player embedded within it

This was one of the first sites we built.  The site is presently being refactored.

------------------------------------------------------------------------

##CONTACT

Feel free to e-mail me and make suggestions or ask questions.  Your input is highly valued:

sean@blogblimp.com
