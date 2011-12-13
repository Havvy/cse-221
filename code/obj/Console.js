LoadModule('jsstd');
LoadModule('jsio');

Console = {
	print : Print,
	
	println : function (string) {
		if (string === undefined) {
			Print("\n");
		} else {
			Print(string + "\n");
		}
	},
	
	printline : function () {
		var line = "";
		for (let i = 0; i < 70; i++) {
			line += "-";
		}
		Print(line + "\n");
	},
	
	printval : function (name, val, isFullString) {
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
	},
	
	readln : function () {
		return File.stdin.Read().toString().slice(0, -2);
	}
};