/**
*
* @name Havvy's Common JS Console Functions
* @author Ryan Scheel (havvy)
*
*/

LoadModule('jsstd');
LoadModule('jsio');

// CLASSICAL PROGRAMMING ASSISTANTS "CLASSES"
Exec("../code/common/classes.js");

// PROTOTYPE ADDITIONS "PROTO"
Exec("../code/common/object.js"); //depends upon CLASSES
Exec("../code/common/array.js");
Exec("../code/common/string.js");

// LOAD USER-DEFINED TYPES "TYPE"
Exec("../code/obj/EmptyCollectionError.js");

// COMMAND LINE HELPERS "CLI"
Exec("../code/common/console.js");

// FUNCTIONS "FNS"
function isInAt (key, array) {
	for (let i = 0; i < array.length; i++) {
		if (key === array[i]) {
			return i;
		}
	}
	return -1;
}

function cross(collections, callback, thisArg, elements) {
	elements = elements || [];
	
	if (!collections.isEmpty()) {
		for (let element in collections.first()) {
			if (collections.first().hasOwnProperty(element)) {
				cross(collections.rest(), callback, thisArg, elements.append(collections.first()[element]));
				elements.pop();
			}
		}
	} else {
		callback.apply(thisArg || undefined, elements);
	}
	
	return collections;
}

// FILE HANDLING "FILE"
Exec("../code/common/files.js");

// CONSTANTS
var noEscape = "N.O.E.S.C.A.P.E.",
NOESCAPE = "N.O.E.S.C.A.P.E.",
CODE = "../code/";

// HIGHER-ORDER-FUNCTIONS "HOF"
Exec("../code/common/comparisons.js");