function cleanquerystring(a) {
    if (a.search.indexOf('fb_') !== -1) {
        var nofb = [];
        var params = a.search.substring(1).split('&');
        for (var i = 0, l = params.length; i < l; i++) {
            if (params[i].substring(0, 3) !== 'fb_') {
                nofb.push(params[i]);
            }
        }
        a.search = nofb.join('&');
        if (a.search === '') {
            a.search = null;
        }
    }
}


function facebook(options, link) {
    var cleaned = false;
    var a = null;
    if (link.hasAttribute('onmousedown') && link.rel.indexOf("nofollow") !== -1 && link.target == "_blank") {
        a = link.cloneNode();
        a.innerHTML = link.innerHTML;
        a.removeAttribute("onmousedown");
        cleanquerystring(a)
        cleaned = true;
    }
    else if (link.href.indexOf('redirect_uri=') !== -1) {
        a = link.cloneNode();
        a.innerHTML = link.innerHTML;
        var redirect_uri = link.search.split('redirect_uri=')[1].split('&', 1);
        a.setAttribute("href", decodeURIComponent(redirect_uri));
        a.setAttribute("target", "_blank");
        cleanquerystring(a)
        cleaned = true;
    }
    if (cleaned) {
        if (options.highlight) {
            a.setAttribute("style", "color: " + options.highlight_color);
        }
        a.setAttribute("rel", "cleaned");
        link.parentNode.replaceChild(a, link);
    }
}

onload=function(){
    if (document.getElementsByClassName == undefined) {
        document.getElementsByClassName = function(className)
        {
            var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
            var allElements = document.getElementsByTagName("*");
            var results = [];

            var element;
            for (var i = 0; (element = allElements[i]) != null; i++) {
                var elementClass = element.className;
                if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
                    results.push(element);
            }

            return results;
        }
        document.removeElementsByClassName = function(className)
        {
            var elements = document.getElementsByClassName(className);
            var element;
            for (var i = 0; (element = elements[i]) != null; i++)
                element.parentNode.removeChild(element);
        }
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
    
    if ( response.options.remove_classes) {
        var element;
    	for (var i = 0; (element = response.options.classes_to_remove[i]) != null; i++)
	    	document.removeElementsByClassName(element); 
    }
});