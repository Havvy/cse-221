LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');
Exec('../code/obj/HashTest.js');
Exec('../code/obj/Student.js');

print("\n\n Student Records Hash Table Magical Adventure v.01b\n Please enter then name of the file you're reading in: ")
var rawRecords = get('../data/sampleHash/' + readln());

var students = rawRecords.split("||");

for (let i = 0; i < students.length; i++){
	students[i] = students[i].split("|");
}

println(students);

	
