var HTTPSecure = {
	"links": function() {
		return(document.getElementsByTagName("a"));
	},
	
	"linkRegEx": function() {
		var regexStr = "^" + HTTPSecure.insecureProtocol + window.location.host;
		console.log("RegExpStr: " + regexStr);
		return(new RegExp(regexStr));
	},
	
	"insecureProtocol": "http://",
	
	"insecureProtocolRegEx": function() {
		return(new RegExp("^" + HTTPSecure.insecureProtocol));
	},
	
	"secureProtocol": "https://",
	
	"secureElement": function(element) {
		var href = element.getAttribute("href");
				
		if( href !== null &&
			  href.match(HTTPSecure.linkRegEx()) !== null) {
				var newAttribute = href.replace(HTTPSecure.insecureProtocolRegEx(),
																				HTTPSecure.secureProtocol)
				element.setAttribute("href", newAttribute);


				return true;
		}
		
		return false;
	}
};



var links = HTTPSecure.links();
// of course for…in does not work on this list. Why would it?
for (var i = 0; i < links.length; ++i) {
	HTTPSecure.secureElement(links[i]);
}
