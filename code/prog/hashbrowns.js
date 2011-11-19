LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');
Exec('../code/obj/HashTest.js');
Exec('../code/obj/Student.js');

println("\n\n Student Records Hash Table Magical Adventure v.01b\n Please enter then name of the file you're reading in: ")

println(Directory.List('../data/students'));

var rawRecords = get('../data/students/' + readln());

var students = rawRecords.split("||");

for (let i = 0; i < students.length; i++){
	students[i] = students[i].split("|");
}

students = students.map(function (student) {
	return new Student(student[0], student[1], parseInt(student[2], 10), student[3],
		parseInt(student[4], 10), parseInt(student[5], 10));
});

var framework = new HashTest(students);

//const 0
framework.addFn("const 0", function (stud) {
	return 0;
});

//const 1
framework.addFn("const 1", function (stud) {
	return 1;
});

//const 7
framework.addFn("const 7", function (stud) {
	return 7;
});

//const 11
framework.addFn("const 11", function (stud) {
	return 11;
});

//const 35
framework.addFn("const 35", function (stud) {
	return 35;
});

//ASCII value of the first letter of the first (given) name.
framework.addFn("ASCII value of first letter of name", function (stud) {
	return stud.firstName.charCodeAt(0);
});

//Count of letters in the first name.
framework.addFn("name count", function (stud) {
	return stud.firstName.length;
});

//Sum of the ASCII values of the letters in the given name.
framework.addFn("sum of ASCII vals of first name", function (stud) {
	var ret = 0;
	for (let ix = 0; ix < stud.firstName.length; ix++) {
		ret += stud.firstName.charCodeAt(ix);
	}
	return ret;
});

//Sum of the ASCII values of the letters in both names.
framework.addFn("sum of ASCII vals of full name", function (stud) {
	var ret = 0;
	for (let ix = 0; ix < stud.firstName.length; ix++) {
		ret += stud.firstName.charCodeAt(ix);
	}
		for (let ix = 0; ix < stud.sirName.length; ix++) {
		ret += stud.sirName.charCodeAt(ix);
	}
	return ret;
});

//SID
framework.addFn("SID", function (stud) {
	return stud.SID;
});

//(SID mod 28) * 2
framework.addFn("(SID mod 28) * 2", function (stud) {
	return ((stud.SID % 28) * 2);
});

//Sum of digits in the phone number
framework.addFn("sum of digits in phone", function (stud) {
	var ret = 0;
	for (let ix = 0; ix < stud.phone.length; ix++) {
		if (!isNaN(parseInt(stud.phone[ix]))) {
			ret += parseInt(stud.phone[ix]);
		}
	}
	return ret;
});

framework.run();