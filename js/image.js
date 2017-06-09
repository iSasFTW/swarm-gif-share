$(document).ready(function() {
    $("#tipbox").hide();
});
var swarm = Swarm.at("http://swarm-gateways.net");
var imageData = "";
var uploader = "";
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
    uploader = imageData.poster;
    
});

function openTip() {
    document.getElementById("tipbutton").style.display = "none";
    $("#tipbox").show();
}

function tip() {
    var szaboAmount = $("#tip-amount").value;
    var weiAmount = web3.toWei(szaboAmount, "szabo");
    var sender = web3.eth.accounts[0];
    var recipient = uploader;
    web3.eth.sendTransaction({from: sender, to: recipient, value: weiAmount});
}