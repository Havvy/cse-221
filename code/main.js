LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');
Exec('../code/obj/Shell.js');

let (main = {}) {
	
	// File-based interactions.
	
	main.listScriptsInFolder = function (folder) {
		try {
			return Directory.List(CODE + folder + '/').filter(function (file) {
				return isFileType(file, '.js');
			});
		} catch (fnfe) {
			return [];
		}
	};
	
	main.showShells = function () {
		this.print(main.listScriptsInFolder('prog/shell'));
	};
	
	main.scriptInFolder = function (script, folder) {
		return main.listScriptsInFolder(folder).contains(script);
	};
	
	// Running other programs.
	
	main.runAllTests = function () {
		let (testFiles = main.listScriptsInFolder('test')) {
			testFiles.forEach(function (file) {
				try {
					Exec(CODE + 'test/' + file);
				} catch (e) {
					this.print(e + "\n");
				}
			});
		}
	};
	
	main.runSingleTest = function (testname) {
		testname += "Test.js";
		
		if (main.listScriptsInFolder('test').contains(testname)) {
			try {
				Exec(CODE + 'test/' + testname);
			} catch (e) {
				this.print(e + "\n");
			}
		} else {
			this.print("Tests do not exist for specified topic.");
		}
	};
	
	main.runProgram = function (program) {
		try {
			Exec(CODE + 'prog/' + program + '.js');
		} catch (e) {
			this.print(e);
		}
	};
	
	main.runShell = function (shell) {
		if (main.readShells().contains(shell + ".js")) {
			try {
				Exec(CODE + 'prog/shell/' + shell + '.js');
			} catch (e) {
				this.print(e);
			}
		} else {
			this.print("Shell '" + shell + "' does not exist.");
		}
	};
	
	main.execScript = function (file) {
		try {
			Exec(CODE + file + '.js');
		} catch (e) {
			this.print(e);
		}
	};
	
	main.clear = function () {
		for (let i = 0; i < 100; i++) {
			this.print("\n");
		}
	};
	
	main.exit = function () {
		this.exit(0);
	};
	
	main.help = function () {
		
		this.print("This is the 'main' shell. From here, you can interface with the rest of the code.");
		this.print("Type 'exit', 'quit', 'q', or 'bye' to close me.");
		this.print();
		this.print("You can run an arbitrary script with 'run filename'. Leave out the js.");
		this.print("Example:  'run prog/sorted'");
		this.print("Example:  'run test/VectorTest'");
		this.print();
		this.print("To run all tests, send the 'tests' command.");
		this.print("To run one set of tests, use 'test ObjectName'");
	};
	
	main.fns = {
		exit : main.exit,
		quit : main.exit,
		bye  : main.exit,
		q    : main.exit,
		help : main.help,
		"-h" : main.help,
		shells : main.showShells,
		run  : main.runProgram,
		open : main.runProgram,
		exec : main.execScript,
		tests : main.runAllTests,
		test : main.runSingleTest,
		shell : main.runShell,
		clear : main.clear
	};
	
	main.entry = function () {
		this.print("Type 'help' if confused.");
	};
	
	main.loop = function (input) {
		var command = getCommand(input);
		var args = getAllParameters(input);
		
		if (main.fns.hasOwnProperty(command)) {
			main.fns[command].apply(this, [args]);
		} else {
			this.print(NOESCAPE);
		}
		
	}
	
	main.shell = new Shell("main", main.loop, main.entry).run();	
}