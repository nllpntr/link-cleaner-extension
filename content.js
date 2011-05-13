setInterval(function() {
    var links = document.getElementsByTagName("a");
    for(var i = 0; i < links.length; i++) {
        var link = links[i];
        if (link.rel === "nofollow" && link.onmousedown !== null) {
            var a = link.cloneNode();
            a.innerHTML = link.innerHTML;
            a.removeAttribute("onmousedown");
            a.setAttribute("style", "color: #3D983D;");
            link.parentNode.replaceChild(a, link);
        }
    }
}, 3000);
