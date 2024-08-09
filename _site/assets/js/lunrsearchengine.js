
var documents = [{
    "id": 0,
    "url": "https://jakescally.github.io/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "https://jakescally.github.io/about",
    "title": "About Scallywag Network",
    "body": "Hey! This is my website. I'm Jake Scally, a Physics and Astrophysics student at FSU. I'm into astrophotography, 3D printing, 3D modeling, app development, piano, retro video games and technology, CRT TV repair, and more.  Documentation: Please, read the docs here. Questions or bug reports?: Head over to our Github repository! Etc. Thanks for stopping by! "
    }, {
    "id": 2,
    "url": "https://jakescally.github.io/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "https://jakescally.github.io/gallery",
    "title": "Gallery",
    "body": ""
    }, {
    "id": 4,
    "url": "https://jakescally.github.io/",
    "title": "Home",
    "body": "      Featured:                                                                                                                                                                                                                 Imaging the Orion Nebula                              :               Here is a shot of the Orion Nebula I got in Tallahassee. I’ll explain more in-detail at a later date, as I don’t quite have. . . :                                                                                                                                                                               Jake                                    25 Jan 2024                                                                                                                                                                                                                                                                                                                                                            Imaging Andromeda for the First Time                              :               Don’t have the time to fill this out fully, but here is my stacked image of Andromeda from my backyard. :                                                                                                                                                                               Jake                                    25 Jan 2024                                                                                                                                                                      All Stories:                                                                                                     Some Moon Shots              :       Some moon pictures. I’ll put more detail here later when I have time. :                                                                               Jake                25 Jan 2024                                                                                                                                     Imaging the Orion Nebula              :       Here is a shot of the Orion Nebula I got in Tallahassee. I’ll explain more in-detail at a later date, as I don’t quite have the time right now. :                                                                               Jake                25 Jan 2024                                                                                                                                     Imaging Andromeda for the First Time              :       Don’t have the time to fill this out fully, but here is my stacked image of Andromeda from my backyard. :                                                                               Jake                25 Jan 2024                                                                                                                                     The CRT Stash As Of 2024              :       Hey! I collect, repair, service, and modify old CRT televisions and monitors!:                                                                               Jake                23 Jan 2024                                            "
    }, {
    "id": 5,
    "url": "https://jakescally.github.io/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 6,
    "url": "https://jakescally.github.io/some-moon-shots/",
    "title": "Some Moon Shots",
    "body": "2024/01/25 - Some moon pictures. I’ll put more detail here later when I have time. "
    }, {
    "id": 7,
    "url": "https://jakescally.github.io/imaging-the-orion-nebula/",
    "title": "Imaging the Orion Nebula",
    "body": "2024/01/25 - Here is a shot of the Orion Nebula I got in Tallahassee. I’ll explain more in-detail at a later date, as I don’t quite have the time right now. "
    }, {
    "id": 8,
    "url": "https://jakescally.github.io/astro-images-thus-far/",
    "title": "Imaging Andromeda for the First Time",
    "body": "2024/01/25 - Don’t have the time to fill this out fully, but here is my stacked image of Andromeda from my backyard. "
    }, {
    "id": 9,
    "url": "https://jakescally.github.io/my-crt-history/",
    "title": "The CRT Stash As Of 2024",
    "body": "2024/01/23 - Hey! I collect, repair, service, and modify old CRT televisions and monitors! I’m super busy right now, so I haven’t had the time to fill in this page, but eventually I’ll list here how I got into the hobby, my first few TVs, and more. "
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