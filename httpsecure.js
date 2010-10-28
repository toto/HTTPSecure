var HTTPSecure = {
	"links": function() {
		return(document.getElementsByTagName("a"));
	},
	
	"linkRegEx": function() {
		var regexStr = "^" + HTTPSecure.insecureProtocol + window.location.host;
		console.log("regex: " +regexStr);
		return(new RegExp(regexStr));
	},
	
	"insecureProtocol": "http://",
	"secureProtocol": "https://",
	"protocolRegEx": /^\w+:/i,
		
	"insecureProtocolRegEx": function() {
		return(new RegExp("^" + HTTPSecure.insecureProtocol));
	},
	

	
	"secureElement": function(element) {
		var editedAttribute;
		
		if (element.nodeName === "A" || element.nodeName === "a") {
			editedAttribute = "href";
		} else {
			if (element.nodeName === "form") {
				editedAttribute = "action";			
			} else {
				console.log("Editing " + element.nodeName);				
				return false
			};			
		};
		
		
		var href = element.getAttribute(editedAttribute);
		var newAttribute = href;
		if( href !== null) {
 			// we have a protocol, but it is http and links to our own site			
			if(href.match(HTTPSecure.linkRegEx()) !== null) {
				newAttribute = href.replace(HTTPSecure.insecureProtocolRegEx(),
																		HTTPSecure.secureProtocol);
			};
			
			// we have a non-protocol refernece (not http:, mailto:, javascript:, etc)
			// so this is an relative or absolute link
			if(!href.match(HTTPSecure.protocolRegEx)) {
				
				// absolute link
				if(href.match(/^\//) !== null) {
					// FIXME: Handle ports or make sure it is port 80
					newAttribute = "https://" + window.location.host + href;
				};
			};
			console.log("Set new href Attribute: " + newAttribute);
			element.setAttribute(editedAttribute, newAttribute);			
			return true;			
		};
		
		
		
		return false;
	}
};



var links = HTTPSecure.links();
// of course for…in does not work on this list. Why would it?
for (var i = 0; i < links.length; ++i) {
	HTTPSecure.secureElement(links[i]);
}

//for (var i = 0; i < document.forms.length; ++i) {
//	HTTPSecure.secureElement(document.forms[i]);
//}