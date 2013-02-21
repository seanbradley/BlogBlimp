#BLOGBLIMP

###HTML5 website theme with responsive video gallery

------------------------------------------------------------------------

##LICENSE

This is the company website for <http://blogblimp.com>.

The BlogBlimp logo (i.e., the blimp), all original artwork, and original written copy pertaining specifically to BlogBlimp are proprietary and may not be duplicated.  However you're free to clone this repo and refactor the code therein and incorporate your own styling to generate another website with similar _functionality_.  Do not replicate any styling or brand related features--i.e., visual or written elements--of the BlogBlimp website on your own URL without the express written permission to do so.

------------------------------------------------------------------------

##ACKNOWLEDGEMENTS

The site's theme is comprised of simple static HTML5 pages that leverage Javascript and JQuery, but also includes a hybridized version of the PhotoSwipe gallery by CodeComputerLove and the Reveal modal from Zurb.  These two scripts were combined to create a cool responsive gallery of thumbnails; clicking on any thumbnail within the gallery activates activates a dropdown modal pertaining to that thumbnail; in each respective modal that is activated, a related video can be embedded.  The awesome MediaElement.js player by John Dyer delivers HTML5 video throughout the site with Flash and Silverlight "fall-forward", enabling the video to play on nearly any device and on older browsers.  Additionally, an elaborately customized version of the visually fun Spritely plugin by Artlogic is used to create a catchy animation on the Home page.

------------------------------------------------------------------------

##A NOTE ON VIDEOS / DEPLOYMENT

The video which presently plays for each thumbnail is for demonstration purposes only.  Videos can be stored locally in the *anydevice/media* folder.  Our production site is deployed on AWS, and uses Route53 for its Domain Name Server. For its Content Delivery Network, video and various scripts are distributed via CloudFront (via http://awesome.blogblimp.com).  Serving the videos (or any static files or scripts) via AWS is simply a matter of uploading them to S3, and changing the URL within the appropriate HTML files.

On our "to do" list: preparing unique videos for each modal, and enabling dynamic resizing of the modals and the MediaElement.js player within them. This was one of the first sites we built.  It has a lot of cruft and an awkward directory structure; its presently being optimized / refactored.

------------------------------------------------------------------------

##CONTACT

Feel free to e-mail me and make suggestions or ask questions.  Your input is highly valued:

sean@blogblimp.com
