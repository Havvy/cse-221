common || function () {
	LoadModule('jsstd');
	LoadModule('jsio');
	Exec('../code/common/common.js');
}();
Exec('../code/obj/Shell.js');
Exec('../code/obj/Vector.js');

let (
	data = new Vector()
) {

	new Shell("vector", function (input) {
		if (!input.isEmpty()) {
			var command = getCommand(input), parameter = getAllParameters(input);
			switch (command) {
				case "+f":
				case "addfirst":
				case "prepend":
					data.prepend(parameter);
					break;
				case "+l":
				case "addlast":
				case "append":
					data.append(parameter);
					break;
				case "insertat":
					try {
						data.insertAt(+(getCommand(parameter)), getAllParameters(parameter));
					} catch (e) {
						if (e.name === "RangeError") {
							this.print("Element " + getAllParameters(parameter) + " cannot be added at position " + getCommand(parameter));
						} else {
							this.print(e);
						}
					}
					break;
				case "size":
					this.print(data.size());
					break;
				case "at":
					try {
						this.print(data.at(parameter - 1));
					} catch (e) {
						this.print(e);
					}
					break;
				case "removefirst":
				case "-f":
				case "popf":
					data.pop(true);
					break;
				case "removelast":
				case "-l":
				case "popl":
					data.pop();
					break;
				case "show":
					this.print(data.toString());
					break;
				case "peek":
					try {
						this.print(data.peek(parameter));
					} catch (e) {
						if (e.name === "EmptyCollectionError") {
							this.print("This ordered collection is empty.");
						} else {
							this.print(e);
						}
					}
					break;
				case "exit":
				case "bye" :
				case "quit":
					this.exit(0);
					break;
				case "debug":
					this.print(data.debug(parameter));
					break;
				default:
					this.print(noEscape);
					break;
			}
		}
	}, function () {
	}).run();
}