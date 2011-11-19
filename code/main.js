LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');
Exec('../code/obj/Shell.js');

let (main = {}) {
	
	main.showShells = function () {
		return Directory.List('../code/prog/shell/').filter(function (file) {
			return isFileType(file, '.js');
		});
	};
	
	main.shell = new Shell("main", function (input) {
		var command = getCommand(input);
		var parameter = getAllParameters(input);
		switch (command) {
			case "exit":
			case "quit":
			case "bye" :
			case "q"   :
				this.exit(0);
				break;
			case "help":
			case "-h"  :
				this.print("This is the 'main' shell. From here, you can interface with the rest of the code.");
				this.print("Type 'exit', 'quit', 'q', or 'bye' to close me.");
				this.print();
				this.print("You can run an arbitrary script with 'run filename'. Leave out the js.");
				this.print("Example:  'run prog/sorted'");
				this.print("Example:  'run test/VectorTest'");
				this.print();
				this.print("To run all tests, send the 'tests' command.");
				this.print("To run one set of tests, use 'test ObjectName'");
				break;
			case "show":
				this.print(main.showShells());
				break;
			case "open":
			case "run":
				try {
					Exec('../code/prog/' + parameter + '.js');
				} catch (e) {
					this.print(e);
				}
			case "exec":
				try {
					Exec('../code/' + parameter + '.js');
				} catch (e) {
					this.print(e);
				}
				break;
			case "tests":
				let (testFiles = Directory.List('../code/test/').filter(function (file) {
					return isFileType(file, '.js');
				})) {
					testFiles.forEach(function (file) {
						try {
							Exec('../code/test/' + file);
						} catch (e) {
							this.print(e + "\n");
						}
					});
				}
				break;
			case "test":
				try {
					Exec('../code/test/' + parameter + 'Test.js');
				} catch (e) {
					this.print(e + "\n");
				}
				break;
			case "shell":
				try {
					Exec('../code/prog/shell/' + parameter + '.js');
				} catch (e) {
					this.print(e);
				}
				break;
			default:
				this.print(noEscape);
				break;
		}
	}, function () {
		this.print("Type 'help' if confused.");
	}).run();
	
}