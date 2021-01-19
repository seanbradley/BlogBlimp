# BLOGBLIMP

### HTML5 website theme with responsive video gallery

------------------------------------------------------------------------

## LICENSE

This is the company website for <http://blogblimp.com>.

All code is available via MIT license.

However, please note, the BlogBlimp logo (i.e., the blimp), all original artwork, and original written copy pertaining specifically to BlogBlimp are proprietary and may not be duplicated.  However, you're free to clone this repo and refactor the code therein and incorporate your own styling to generate another website with similar functionality.  Please do not replicate any proprietary styling or brand related features--i.e., visual or written elements--of the BlogBlimp website on your own URL without the express written permission to do so.  Attribution / credit is appreciated but not required.

------------------------------------------------------------------------

## ACKNOWLEDGEMENTS

An elaborately customized version of the visually fun Spritely plugin by Artlogic is used to create a catchy animation on the Home page.

The site's theme is comprised of simple static HTML5 pages that leverage Javascript and JQuery, but also includes a hybridized version of the PhotoSwipe gallery by CodeComputerLove and the Reveal modal from Zurb.  These two scripts were combined to create a cool responsive gallery of thumbnails; clicking on any thumbnail within the gallery activates activates a dropdown modal pertaining to that thumbnail; in each respective modal that is activated, a related video can be embedded.  

Formerly, the MediaElement.js player by John Dyer delivered HTML5 video throughout the site with Flash and Silverlight "fall-forward", enabling the video to play on nearly any device and on older browsers. That's since been deprecated and swapped with a simple YouTube embed.

------------------------------------------------------------------------

## ARCHITECTURE

The site is designed to be visually unique and non-boilerplate. For its age, it is surprisingly performant on all devices, everything validates well, and the infra choices make it easily scalable.

In summary, the AWS services used are:

* Route53
* ACM (with two certs)
* Global Accelerator
* ALB
* Target Group
* VPC (with one subnet)
* EC2
* S3 (static content and logs)
* CloudFront (for static CDN)

Granted--this is a lot for a simple informational site, but the point in the initial building of it was to explore now to wire these services together.

------------------------------------------------------------------------

## DIRECTORY STRUCTURE

This was one of the very first sites BlogBlimp ever built.  As such, it's a bit of a hodgepodge of pre-existing libraries and plug-ins...and layers of solutioning have accreted.  Hence, various scripts and stylesheets are spread out in several incongruous directories or in unexpected places.  We're in the process of consolidating these in a more sensible and intuitive manner.  Making the location of various scripts and stylesheets more sane is at the top of our TODO list.  But, to help during that process, here's a brief overview of where stuff is presently located...

* styles: various CSS files
* font: custom fonts and icons
* scripts: Javascript for our flying blimp sprite
* media: video assets and a few random jpegs

------------------------------------------------------------------------

## CHANGELOG (JAN 2021)

* build, media, and src directories (mostly for the MediaElement player and Silverlight) have been deprecated
* URLs for static assets have been changed to accommodate SSL

------------------------------------------------------------------------

## TO DO

* optimze and refactor app structure/layout and rename variables, fix imports, and links accordingly
* prepare unique explainer vids for and enable dynamic resizing of the drop-down modals (which would contain those vids) in the portfolio page

------------------------------------------------------------------------

## CONTACT

Feel free to e-mail BlogBlimp and make suggestions or ask questions.  Your input is highly valued. Email your comments and inquiries to:

sean@blogblimp.com
