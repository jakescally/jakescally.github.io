
var documents = [{
    "id": 0,
    "url": "http://localhost:4000/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "http://localhost:4000/about",
    "title": "About Scally Network",
    "body": "Hey! This is my website. I'm Jake Scally, a Physics and Astrophysics student at FSU. I'm into astrophotography, 3D printing, 3D modeling, app development, piano, retro video games and technology, CRT TV repair, and more.  "
    }, {
    "id": 2,
    "url": "http://localhost:4000/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "http://localhost:4000/gallery",
    "title": "Gallery",
    "body": ""
    }, {
    "id": 4,
    "url": "http://localhost:4000/",
    "title": "Home",
    "body": "      Featured:                                                                                                                                                                                                                       What is this blog?                              :               This blog is supposed to serve as a portfolio/documentary/place to store descriptions of all of the stuff or projects I work on. I plan on. . . :                                                                                                                                                                               Jake Scally                                    09 Aug 2024                                                                                                                                                                                                                                                                                                                                                            How I run this blog                              :               It was such a pain figuring out how to host a blog that I could style however I wanted for free. I didn’t want to. . . :                                                                                                                                                                               Jake Scally                                    09 Aug 2024                                                                                                                                                                                        All Stories:                                                                                                     Setting Up LightGallery on a Jekyll Website Hosted by Github Pages              :       As I mentioned in the “What is this blog?” post, I want this website to serve as both tutorials/documentation for myself, while also being a portfolio of my projects. Having. . . :                                                                               Jake Scally                29 Aug 2024                                                                                            Gallery test (working!)              :       This is a test of the Image Gallery script. :                                                                               Jake Scally                27 Aug 2024                                                                                                                                     What is this blog?              :       This blog is supposed to serve as a portfolio/documentary/place to store descriptions of all of the stuff or projects I work on. I plan on including some of my physics. . . :                                                                               Jake Scally                09 Aug 2024                                                                                                                                     How I run this blog              :       It was such a pain figuring out how to host a blog that I could style however I wanted for free. I didn’t want to do any of the “build. . . :                                                                               Jake Scally                09 Aug 2024                                                                                                                                     An Orange Moon Picture              :       This was taken just outside of Tallahassee on my way home from an attempted astrophotography night. The astro pictures didn’t come out like I hoped, but I saw this as. . . :                                                                               Jake Scally                25 Jan 2024                                                                                                                                     Imaging the Orion Nebula              :       Here is a shot of the Orion Nebula I got in Tallahassee. I’ll explain more in-detail at a later date, as I don’t quite have the time right now. :                                                                               Jake Scally                25 Jan 2024                                               &laquo; Prev       1        2      Next &raquo; "
    }, {
    "id": 5,
    "url": "http://localhost:4000/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 6,
    "url": "http://localhost:4000/page2/",
    "title": "Home",
    "body": "{% if page. url == “/” %}       Featured:       {% for post in site. posts %}    {% if post. featured == true %}      {% include featuredbox. html %}    {% endif %}  {% endfor %}  {% endif %}       All Stories:         {% for post in paginator. posts %}    {% include postbox. html %}    {% endfor %}    {% include pagination. html %}"
    }, {
    "id": 7,
    "url": "http://localhost:4000/setting-up-lightgallery/",
    "title": "Setting Up LightGallery on a Jekyll Website Hosted by Github Pages",
    "body": "2024/08/29 - As I mentioned in the “What is this blog?” post, I want this website to serve as both tutorials/documentation for myself, while also being a portfolio of my projects. Having recently travelled to Japan, I wanted a nice way to display my photos in a nice carousel, with a gallery of thumbnails that I could embed in a blog post. Lightgallery is the best way to achieve this. For personal use, it’s free, and it is a very powerful (and professional-looking) tool to display and offer downloads to your photos. Many websites and blogs use it, so you’ve probably seen it before without even knowing it. Github Pages Doesn’t Like Plugins: Github pages doesn’t like plugins. They like some plugins, but not all plugins. if you add a gem to your gemfile that isn’t on Github’s supported list of plugins, Github will fail to build and publish the website. In order to get things working, I recommend you switch over to Github Actions for deploying your site. It’s necessary for some of the gems we need, so you should get it working before changing any of your underlying website code. Jekyll’s docs are great for this, and the relevant tutorial can be found here. The error I ran into here was something strange about a date in a markdown file in the \vendor\ directory, which doesn’t even exist when I build the website locally. Either way, this can be fixed by adding simply the word “vendor” to the “excludes” list in _config. yml. Installing the Necessary Plugins: The way I figured out the rest of this was mostly by following Jimmy Xiao’s blog post describing the process. HUGE thanks to him for his work, I never could’ve gotten such an easy-to use solution without his work. However, I ran into a variety of issues, likely due to my amateurish skills with this sort of thing. As such, I am going to describe exactly what I did, in order, to get this up and running on Github Pages. Firstly, you’ll want to install ImageMagick. ImageMagick is an open-source image manipulation command line tool. As I’m on a Mac, I installed it using the package manager homebrew with brew install imagemagick. If you’re on a Mac and have never installed a package manager, you’ll have to install brew or something similar. This is straightforward and instructions are available on homebrew’s website. Other download instructions exist here for other operating systems. Then, you’ll want to download the ruby gems exiftag. rb and jekyll_minimagick. rb. exiftag. rb is a plugin that extracts metadata from the images you want in your gallery (we’ll get to that later). The jekyll_minimagick. rb uses the program ImageMagick to automatically convert the images we want in our gallery to small, easy-to-load thumbnails. Put these both in the _plugins folder in the root of the directory of your jekyll project. If there isn’t one, don’t worry, just create one and put the files in. Now we want to make sure we install the necessary gems. Open your gemfile and add these two lines anywhere in the file: 12gem  mini_magick gem  exifr Then (if you’re using bundle, which hopefully you are) run bundle install in the root of your project and the gems should install. Installing Lightgallery: Installing lightgallery is easy using npm, yarn, or bower. I recommend using npm, as that’s what I’m familiar with. Make sure you initialize your directory (the root of your jekyll project) using npm init and then install lightgallery with npm install lightgallery. File Structure: This is very important. I had tons of file structure issues for some reason that took hours to figure out, but I think I got it. Here is what my file structure looks like: 1234567891011121314├── _includes│   └── album. html├── _layouts│  └── layout-with-gallery. html├── _plugins│   ├── exiftag. rb│   └── jekyll_minimagick. rb├── _posts│   └── 2024-08-29-setting-up-lightgallery. md└── assets    └── images       └── gallery          └── galleryNameHere            └── my-picture. jpgAlbum. html and Layout-with-gallery. html: My version of album. html is a slightly tweaked version of Jimmy Xiao’s, but the underlying functionality is the same. The code is here: 123456789101112131415161718&lt;div id= {{include. albumname}} &gt;  {%- for image in site. static_files -%}  {%- if image. path contains 'images/gallery' and image. path contains include. albumname -%}  {%- unless image. path contains 'thumbnails' -%}  &lt;a href= {{ image. path }}  data-sub-html= {% exiftag image_description, , {{ image. path }} %} &gt;    &lt;img src= /thumbnails{{ image. path }}  /&gt;  &lt;/a&gt;  {%- endunless -%}  {%- endif -%}  {%- endfor -%}&lt;/div&gt;&lt;script type= text/javascript &gt;  lightGallery(document. getElementById( {{include. albumname}} )); &lt;/script&gt;I’ll try to describe to the best of my ability what’s going on here. This first element is a div that contains the images for lightgallery. Lightgallery works in two steps: first, you create a simple div that contains your images, which are set up as links (as you can see above) with an image tag between the two &lt;a&gt; tags. This div has an id that you can refer to later. The second step is actually running the lightgallery script and feeding it the id of the div that contains your images. Here, we want this album. html to take an argument called albumname when it’s ‘called’. I’m saying ‘called’ in quotes because I have no idea what the proper terminology is for embedding an html file inside another. But either way, when we ‘call’ album. html, we pass the albumname argument to be used as the id for the div. Then the Liquid code loops through all the images on the site, and searches for paths that contain images/gallery AND the album name. This allows us to use this for different album names (folders of pictures) inside the images/gallery folder. Because we also created thumbnails for these in another folder with a similar path, we want to use the Liquid command unless to avoid double-counting images. The link and image are pretty straightforward, except for the data-sub-html section. This is where we ‘call’ exiftag, which can read the description from the image specified at image. path. In this case, we want the description, so we pass image_description as an argument. Now how does lightgallery interpret all of this? The link specified by the href is going to be the full-size image that lightgallery serves once the thumbnail is clicked. The image between the &lt;a&gt; tags should be the thumbnail, which is what we want to display on the actual page before it is clicked. As for layout-with-gallery. html, this should be one of your existing jekyll layout files in _layouts. The following code should be put at the top of this file, or really just anywhere before your content from your markdown file is read-in: 1234&lt;!-- lightgallery Stuff --&gt;&lt;script src= /node_modules/lightgallery/lightgallery. umd. js &gt;&lt;/script&gt;&lt;script src= /node_modules/lightgallery/plugins/thumbnail/lg-thumbnail. umd. js &gt;&lt;/script&gt;&lt;script src= /node_modules/lightgallery/plugins/zoom/lg-zoom. umd. js &gt;&lt;/script&gt;In order for this to work, we must also add these lines to the &lt;head&gt; of the default layout, which is usually just called default. html: 1234&lt;head&gt;  &lt;!-- Stuff for lightGallery --&gt;  &lt;link type= text/css  rel= stylesheet  href= /node_modules/lightgallery/css/lightgallery-bundle. css  /&gt;&lt;/head&gt;lightgallery-bundle. css includes various lightgallery tools that we want. Calling album. html: Finally, we can use this in our markdown files. First make sure that your layout is set to layout-with-gallery. html in your markdown file’s YAML front matter. Then you can simply add the album with lightgallery using this line: 123{% include album. html albumname= your_album_name_here  %}Ah, finally, beautiful galleries: Here, you can see this working:                                     There’s still some slight formatting gripes I have (like why isn’t it centered?), but it works well enough that I’m satisfied. If anything isn’t working for you, feel free to download this entire website as a folder using one of those online website downloader tools so that you can look at the code yourself. Thanks for reading and happy coding! "
    }, {
    "id": 8,
    "url": "http://localhost:4000/my-first-gallery/",
    "title": "Gallery test (working!)",
    "body": "2024/08/27 - This is a test of the Image Gallery script.                                     "
    }, {
    "id": 9,
    "url": "http://localhost:4000/this-blog/",
    "title": "What is this blog?",
    "body": "2024/08/09 - This blog is supposed to serve as a portfolio/documentary/place to store descriptions of all of the stuff or projects I work on. I plan on including some of my physics research, my astrophotography, projects I work on at FSU’s FABLAB, old cameras, cool pictures, old TVs, and much much more. Hopefully, at some point I’ll be like “Oh remember that project I did years ago?” and I’ll be able to go look for it and remind myself what the project was. Or I can use this blog to show to employers and others as a catalog of what I do in my free time. Dome posts will be small, some will be longer. Maybe I just want to write something down (like how to add posts to this website in case I forget!). Or maybe I want to compare a bunch of different cameras I’ve owned. Who knows! Anyways, I’m glad everything is up and running now. Hopefully I keep this updated but ‘the best laid plans of mice and men’ etc etc… "
    }, {
    "id": 10,
    "url": "http://localhost:4000/how-i-run-this-blog/",
    "title": "How I run this blog",
    "body": "2024/08/09 - It was such a pain figuring out how to host a blog that I could style however I wanted for free. I didn’t want to do any of the “build a website” things because, frankly they look too fancy. Like if you a see a portfolio for some guy whose a physics major and it looks like the first default website from Squarespace, then you know he didn’t really make it himself. With that in mind, I found out about Github Pages. Maybe you’ve seen them before. They’re those websites with the “username. github. io” address and they often host tutorials or personal blogs. The issue with Github Pages is that it only supports static websites. No backend whatsoever. So I wondered how so many people manage to host websites on Pages. Sure enough, most people use a tool called Jekyll. Jekyll is a static website creator. It lets you easily put together markdown files, images, and themes/layouts created by other people into a single website. Like a folder you could have any ol browser open and navigate it like a true website (even without an internet connection of course). So basically Github just hosts a folder containing all the website files created by Jekyll and serves them to visitors. At least that’s what I thought. You don’t actually dump the output “_site” folder from Jekyll to your main branch on your repo. You actually dump the whole directory, meaning the directory which you run the jekyll build command from in the command line. For some reason I had tons of issues when just uploading the _site folder itself. Once this is working, these commands are my bread and butter to get this stuff working… Once I add a post or update something, I run git add . to add all updated files in the directory on my computer. Then I check it with git status and it should show all the files that were modified or added. Then I use git commit to commit it all to the main branch. Then I had issues verifying my user from the command line, so I used Github for Desktop to push to remote. And then the website updated automatically. Pretty cool! "
    }, {
    "id": 11,
    "url": "http://localhost:4000/some-moon-shots/",
    "title": "An Orange Moon Picture",
    "body": "2024/01/25 - This was taken just outside of Tallahassee on my way home from an attempted astrophotography night. The astro pictures didn’t come out like I hoped, but I saw this as I drove home and just had to take pictures of it. "
    }, {
    "id": 12,
    "url": "http://localhost:4000/imaging-the-orion-nebula/",
    "title": "Imaging the Orion Nebula",
    "body": "2024/01/25 - Here is a shot of the Orion Nebula I got in Tallahassee. I’ll explain more in-detail at a later date, as I don’t quite have the time right now. "
    }, {
    "id": 13,
    "url": "http://localhost:4000/astro-images-thus-far/",
    "title": "Imaging Andromeda for the First Time",
    "body": "2024/01/25 - This is a stacked image of Andromeda photographed from my backyard. This was in a Bortle 4, so somewhat bright, but I got it on a relatively clear night. Gear was a Canon 80D and whatever that something-to-300mm zoom lens is that Canon makes too. "
    }, {
    "id": 14,
    "url": "http://localhost:4000/my-crt-history/",
    "title": "The CRT Stash As Of 2024",
    "body": "2024/01/23 - My wonderful collection of those old TVs everyone throws away. One man’s trash is another man’s treasure, and finding these old TVs has been a hobby of mine for the past couple years I’m super busy right now, so I haven’t had the time to fill in this page, but eventually I’ll list here how I got into the hobby, my first few TVs, and more. "
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});