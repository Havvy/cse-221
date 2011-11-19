LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');

let (letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
	numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
	endLetters = ['z', 'y', 'x', 'w', 'u', 't', 's', 'r', 'q', 'p']
	) {
	
	cross([numbers, letters, endLetters], function (number, letter, endLetter) {
		println("" + number + "|" + letter.toUpperCase() + "|" + endLetter);
	});
	
}