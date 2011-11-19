var print = Print; // Bad API fix!.

/**
*
* passed string is printed to stdout with a newline afterwards.
*
*/
function println (string) {
	if (string === undefined) {
		Print("\n");
	} else {
		Print(string + "\n");
	}
}

/**
*
* prints 70 dashes to stdout followed by a newline.
*
*/
function printline () {
	var line = "";
	for (let i = 0; i < 70; i++) {
		line += "-";
	}
	Print(line + "\n");
}

function readln () {
	return File.stdin.Read().toString().slice(0, -2);
}

function getCommand (string) {
	if (string.indexOf(" ") !== -1) {
		return (string.slice(0, string.indexOf(" ")).toLowerCase());
	} else {
		return (string.toLowerCase());
	}
}

function getAllParameters (string) {
	if (string.indexOf(" ") !== -1) {
		return (string.slice(string.indexOf(" ") + 1).trim());
	} else {
		return "";
	}
}