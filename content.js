function facebook(options) {
    var links = document.getElementsByTagName("a");
    for(var i = 0; i < links.length; i++) {
        var link = links[i];
        if (link.rel.indexOf("nofollow") !== -1 && link.target == "_blank") {
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
}


chrome.extension.sendRequest({method: "getOptions"}, function(response) {
    setInterval(function() {
        if (response.options.facebook) {
            facebook(response.options);
        }
    }, 3000);
});
