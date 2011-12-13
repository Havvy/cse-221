LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');

var TestSet = function (files) {
	this.tests = [];
	this.passed = this.failed = 0;
	this.files = (typeof files === "object") ? files : [];
	this.name = (typeof files === "string") ? files : files[0];
}

TestSet.prototype.run = function () {
	try {
		this.files.forEach(function (file) {
			Exec("../code/" + file);
	});
	} catch (e) {
		println("Unable to run tests for " + this.name);
		println("Required files cannot be opened.");
		return;
	}

	println("Running tests for " + this.name);
	
	for (let i = 0; i < this.tests.length; i++) {
		try {
			if (this.tests[i]()) {
				this.passed++;
				println("\tPASS:" + this.tests[i].name);
			} else {
				this.failed++;
				println("\tFAIL:" + this.tests[i].name);
			}
		} catch (e) {
			this.failed++;
			println("\t ERR: " + this.tests[i].name + "\n\t\t" + e + ".\n");
		}
	}

	println("\t" +  this.passed + "/" + this.tests.length + " tests pass.");
};

TestSet.prototype.urun = function () {
	this.files.forEach(function (file) {
		Exec("../code/" + file);
	});
	
	println("Running tests for " + this.files[0] + " unsafely.");
	
	for (let i = 0; i < this.tests.length; i++) {
		if (this.tests[i]()) {
			this.passed++;
			println("\tPASS:" + this.tests[i].name);
		} else {
			this.failed++;
			println("\tFAIL:" + this.tests[i].name);
		}
	}
	
	println("\t" +  this.passed + "/" + this.tests.length + " tests pass.");
};

TestSet.prototype.addTest = function (name, test) {
	test.name = name;
	this.tests.append(test);
};