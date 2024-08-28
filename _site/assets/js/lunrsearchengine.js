
var documents = [{
    "id": 0,
    "url": "http://localhost:4000/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "http://localhost:4000/about",
    "title": "About Scallywag Network",
    "body": "Hey! This is my website. I'm Jake Scally, a Physics and Astrophysics student at FSU. I'm into astrophotography, 3D printing, 3D modeling, app development, piano, retro video games and technology, CRT TV repair, and more.  Documentation: Please, read the docs here. Questions or bug reports?: Head over to our Github repository! Etc. Thanks for stopping by! "
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
    "body": "      Featured:                                                                                                                                                                                                                 What is this blog?                              :               This blog is supposed to serve as a portfolio/documentary/place to store descriptions of all of the stuff or projects I work on. I plan on. . . :                                                                                                                                                                               Jake Scally                                    09 Aug 2024                                                                                                                                                                                                                                                                                                                                                            How I run this blog                              :               It was such a pain figuring out how to host a blog that I could style however I wanted for free. I didn’t want to. . . :                                                                                                                                                                               Jake Scally                                    09 Aug 2024                                                                                                                                                                                        All Stories:                                                             Gallery Test              :       This is a test of the Image Gallery script. :                                                                               Jake Scally                27 Aug 2024                                                                                                                                     What is this blog?              :       This blog is supposed to serve as a portfolio/documentary/place to store descriptions of all of the stuff or projects I work on. I plan on including some of my physics. . . :                                                                               Jake Scally                09 Aug 2024                                                                                                                                     How I run this blog              :       It was such a pain figuring out how to host a blog that I could style however I wanted for free. I didn’t want to do any of the “build. . . :                                                                               Jake Scally                09 Aug 2024                                                                                                                                     An Orange Moon Picture              :       This was taken just outside of Tallahassee on my way home from an attempted astrophotography night. The astro pictures didn’t come out like I hoped, but I saw this as. . . :                                                                               Jake Scally                25 Jan 2024                                                                                                                                     Imaging the Orion Nebula              :       Here is a shot of the Orion Nebula I got in Tallahassee. I’ll explain more in-detail at a later date, as I don’t quite have the time right now. :                                                                               Jake Scally                25 Jan 2024                                                                                                                                     Imaging Andromeda for the First Time              :       This is a stacked image of Andromeda photographed from my backyard. This was in a Bortle 4, so somewhat bright, but I got it on a relatively clear night. Gear. . . :                                                                               Jake Scally                25 Jan 2024                                               &laquo; Prev       1        2      Next &raquo; "
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
    "url": "http://localhost:4000/my-first-gallery/",
    "title": "Gallery Test",
    "body": "2024/08/27 - This is a test of the Image Gallery script.                                                                         "
    }, {
    "id": 8,
    "url": "http://localhost:4000/this-blog/",
    "title": "What is this blog?",
    "body": "2024/08/09 - This blog is supposed to serve as a portfolio/documentary/place to store descriptions of all of the stuff or projects I work on. I plan on including some of my physics research, my astrophotography, projects I work on at FSU’s FABLAB, old cameras, cool pictures, old TVs, and much much more. Hopefully, at some point I’ll be like “Oh remember that project I did years ago?” and I’ll be able to go look for it and remind myself what the project was. Or I can use this blog to show to employers and others as a catalog of what I do in my free time. Dome posts will be small, some will be longer. Maybe I just want to write something down (like how to add posts to this website in case I forget!). Or maybe I want to compare a bunch of different cameras I’ve owned. Who knows! Anyways, I’m glad everything is up and running now. Hopefully I keep this updated but ‘the best laid plans of mice and men’ etc etc… "
    }, {
    "id": 9,
    "url": "http://localhost:4000/how-i-run-this-blog/",
    "title": "How I run this blog",
    "body": "2024/08/09 - It was such a pain figuring out how to host a blog that I could style however I wanted for free. I didn’t want to do any of the “build a website” things because, frankly they look too fancy. Like if you a see a portfolio for some guy whose a physics major and it looks like the first default website from Squarespace, then you know he didn’t really make it himself. With that in mind, I found out about Github Pages. Maybe you’ve seen them before. They’re those websites with the “username. github. io” address and they often host tutorials or personal blogs. The issue with Github Pages is that it only supports static websites. No backend whatsoever. So I wondered how so many people manage to host websites on Pages. Sure enough, most people use a tool called Jekyll. Jekyll is a static website creator. It lets you easily put together markdown files, images, and themes/layouts created by other people into a single website. Like a folder you could have any ol browser open and navigate it like a true website (even without an internet connection of course). So basically Github just hosts a folder containing all the website files created by Jekyll and serves them to visitors. At least that’s what I thought. You don’t actually dump the output “_site” folder from Jekyll to your main branch on your repo. You actually dump the whole directory, meaning the directory which you run the jekyll build command from in the command line. For some reason I had tons of issues when just uploading the _site folder itself. Once this is working, these commands are my bread and butter to get this stuff working… Once I add a post or update something, I run git add . to add all updated files in the directory on my computer. Then I check it with git status and it should show all the files that were modified or added. Then I use git commit to commit it all to the main branch. Then I had issues verifying my user from the command line, so I used Github for Desktop to push to remote. And then the website updated automatically. Pretty cool! "
    }, {
    "id": 10,
    "url": "http://localhost:4000/some-moon-shots/",
    "title": "An Orange Moon Picture",
    "body": "2024/01/25 - This was taken just outside of Tallahassee on my way home from an attempted astrophotography night. The astro pictures didn’t come out like I hoped, but I saw this as I drove home and just had to take pictures of it. "
    }, {
    "id": 11,
    "url": "http://localhost:4000/imaging-the-orion-nebula/",
    "title": "Imaging the Orion Nebula",
    "body": "2024/01/25 - Here is a shot of the Orion Nebula I got in Tallahassee. I’ll explain more in-detail at a later date, as I don’t quite have the time right now. "
    }, {
    "id": 12,
    "url": "http://localhost:4000/astro-images-thus-far/",
    "title": "Imaging Andromeda for the First Time",
    "body": "2024/01/25 - This is a stacked image of Andromeda photographed from my backyard. This was in a Bortle 4, so somewhat bright, but I got it on a relatively clear night. Gear was a Canon 80D and whatever that something-to-300mm zoom lens is that Canon makes too. "
    }, {
    "id": 13,
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