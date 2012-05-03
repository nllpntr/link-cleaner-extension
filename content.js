function facebook(options, link) {
    var cleaned = false;
    var a = null;
    if (link.hasAttribute('onmousedown') && link.rel.indexOf("nofollow") !== -1 && link.target == "_blank") {
        a = link.cloneNode();
        a.innerHTML = link.innerHTML;
        a.removeAttribute("onmousedown");
        cleaned = true;
    }
    if (cleaned) {
        if (options.highlight) {
            a.setAttribute("style", "color: #3D983D;");
        }
        a.setAttribute("rel", "cleaned");
        link.parentNode.replaceChild(a, link);
    }
}


chrome.extension.sendRequest({method: "getOptions"}, function(response) {
    setInterval(function() {
        var links = document.getElementsByTagName("a");
        for(var i = 0, l = links.length; i < l; i++) {
            if (response.options.facebook) {
                facebook(response.options, links[i]);
            }
        }
    }, 3000);
});
