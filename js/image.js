var swarm = Swarm.at("http://swarm-gateways.net");
var imageData = "";
(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=', 2);
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);


swarm.download($.QueryString["i"]).then(function(buffer) {
    imageData = JSON.parse(buffer.toString());
    var image = document.getElementById("image");
    var caption = document.getElementById("caption");
    image.src = imageData.image;
    caption.innerHTML = imageData.caption;
});

