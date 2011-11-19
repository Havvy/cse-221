LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');
Exec('../code/obj/Vector.js');
Exec('../code/obj/Sorted.js');
Exec('../code/obj/Student.js');

var students = new Vector();
var field = 1;

try { // to open the file and get the data
   var file = new File('../data/studentRecords.csv');
   if ( file.exist ) {
      file.Open( File.RDONLY );
      var contents = (file.Read() );
      file.Close();
   }
} catch ( ex if ex instanceof IoError ) {
   Print( 'IOError: ' + ex.text, '\n' );
	try {
		file.Close();
	} catch (e) {
		println("Failing to close file!");
	}
} catch( ex ) {
   throw ex;
}

contents = contents.split("|")

for (let i = 1; i < (contents.length / 8) - 1; i++) {
	students.append(new Student(contents[i * 8 + field++].trim().slice(1, -1),
															contents[i * 8 + field++].trim().toInt(),
															contents[i * 8 + field++].trim().slice(1, -1),
															contents[i * 8 + field++].trim().toFloat(),
															contents[i * 8 + field++].trim().toInt(),
															contents[i * 8 + field++].trim().toInt(),
															contents[i * 8 + field++].trim().toInt(),
															contents[i * 8 + field].trim().toInt()));
	field = 1;
}

println("  SORTING THE FOLLOWING DATA")
for (let i = 0; i < students.size(); i++) {
	println(students.at(i).toFullString());
}

var studentsByName = new Sorted(students, function (s1, s2) {
	return s1.name < s2.name;
});

var studentsBySID = new Sorted(students, function (s1, s2) {
	return s1.SID < s2.SID;
});

var studentsByHeight = new Sorted(students, function (s1, s2) {
	return s1.height < s2.height;
});

var studentsByBirthday = new Sorted(students, function (s1, s2) {
	return s1.birthday < s2.birthday;
});

printline();
println("  SORTING BY NAME");

for (let i = 0; i < studentsByName.size(); i++) {
	println(studentsByName.at(i).toFullString());
}

printline();
println("  SORTING BY SID");

for (let i = 0; i < studentsBySID.size(); i++) {
	println(studentsBySID.at(i).toFullString());
}

printline();
println("  SORTING BY HEIGHT");

for (let i = 0; i < studentsByHeight.size(); i++) {
	println(studentsByHeight.at(i).toFullString());
}

printline();
println("  SORTING BY BIRTHDAY");

for (let i = 0; i < studentsByBirthday.size(); i++) {
	println(studentsByBirthday.at(i).toFullString());
}

printline();