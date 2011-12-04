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
* prints 70 dashes to stdout followed by a newline.
*/
function printline () {
	var line = "";
	for (let i = 0; i < 70; i++) {
		line += "-";
	}
	Print(line + "\n");
}

function printval (name, val, isFullString) {
	Print(name + ": ");
	if (val) {
		if (typeof val === "string") {
			Print("\"" + val + "\"\n")
		} else {
			Print((isFullString ? val.toFullString() : val) + '\n');
		}
	} else {
		if (val === false) {
			Print("false\n");
		} else {
			Print("nil\n");
		}
	}
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