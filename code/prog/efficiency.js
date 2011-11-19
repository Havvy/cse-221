LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');
Exec('../code/obj/Transformation.js');

var morseToLength = new Transformation([".", "-", " "], [2, 4, 2], 0);

var getMorseLength = function (morse) {
	var length = 0;
	
	if (morse !== " ") {
		for (let i = 0; i < morse.length; i++) {
			length += morseToLength.transform(morse[i]);
		}
	} else {
		length = 7;
	}
	
	return length;
};

var alphabet = [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var mystery = [' ', 'e', 't', 'a', 'o', 'i', 'n', 's', 'h', 'r', 'd', 'l', 'c', 'u', 'm', 'w', 'f', 'g', 'y', 'p', 'b', 'v', 'k', 'j', 'x', 'q', 'z', '1', '0', '2', '9', '3', '4', '5', '6', '7', '8'];
var lexicalDict = [' ', '. ', '- ', '.. ', '.- ', '-. ', '-- ', '... ', '..- ', '.-. ', '.-- ', '-.. ', '-.- ', '--. ', '--- ', '.... ', '...- ', '..-. ', '..--' , '.-.. ', '.-.- ', '.--. ', '.--- ', '-... ', '-..- ', '-.-. ', '-.-- ', '--.. ', '---. ', '---- ', '..... ', '....- ', '...-. ', '...-- ', '..-.. ', '..-.- ', '..--. '];
var morseDict = [" ", ".- ", "-... ", "-.-. ", "-.. ", ". ", "..-. ", "--. ", ".... ", ".. ", ".--- ", "-.- ", ".-.. ", "-- ", "-. ", "--- ", ".--. ", "--.- ", ".-. ", "... ", "- ", "..- ", "...- ", ".-- ", "-..- ", "-.-- ", "--.. ", "----- ", ".---- ", "..--- ", "...-- ", "....- ", "..... ", "-.... ", "--... ", "---.. ", "----. "];

var alphaToMorse = new Transformation(alphabet, morseDict, "");
var alphaToLexical = new Transformation(alphabet, lexicalDict, "");
var mysteryToMorse = new Transformation(mystery, morseDict, "");
var mysteryToLexical = new Transformation(mystery, lexicalDict, "");

var countAsLexical = function (string) {
	var length = 0;

	for (let i = 0; i < string.length; i++) {
		length += getMorseLength(alphaToLexical.transform(string[i]));
	}

	return length - 1;
};

var countAsMorse = function (string) {
	var length = 0;
	
	for (let i = 0; i < string.length; i++) {
		length += getMorseLength(alphaToMorse.transform(string[i]));
	}
	
	return length - 1;
};

var countAsMysteryMorse = function (string) {
	var length = 0;
	
	for (let i = 0; i < string.length; i++) {
		length += getMorseLength(mysteryToMorse.transform(string[i]));
	}
	
	return length - 1;
};

var countAsMysteryLexical = function (string) {
	var length = 0;
	
	for (let i = 0; i < string.length; i++) {
		length += getMorseLength(mysteryToLexical.transform(string[i]));
	}
	
	return length - 1;
};

	println("Which text file would you like to convert?");
	println(Directory.List('../data/').join('\n'), '\n' );

var file = File.stdin.Read().toString().slice(0, -2)
var contents = get('../data/' + file);
println("How would you like to measure this? (morse, lexical, ???, mystery)\n");
switch(File.stdin.Read().toString().slice(0, -2)){
	case "morse":
		println("As morse code, " + file + " takes " + countAsMorse(contents) + " dots worth of time.");
		break;
	case "lexical":
		println("As morse code, " + file + " takes " + countAsLexical(contents) + " dots worth of time.");
		break;
	case "???":
		println("As ????? code, th?s ?nput takes " + countAsMysteryMorse(contents) + " dots worth of t?me.");
		break;
	case "mystery":
		println("As mysterious code, *~" + file + "~*  takes *~" + countAsMysteryLexical(contents) + "~* dots worth of time.");
}