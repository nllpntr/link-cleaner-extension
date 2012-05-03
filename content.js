function facebook(options, link) {
        if (link.hasAttribute('onmousedown') && link.rel.indexOf("nofollow") !== -1 && link.target == "_blank") {
            var a = link.cloneNode();
            a.innerHTML = link.innerHTML;
            a.removeAttribute("onmousedown");
            if (options.highlight) {
                a.setAttribute("rel", "cleaned");
                a.setAttribute("style", "color: #3D983D;");
            }
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
