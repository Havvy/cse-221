LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');

function REPL(name, reader, evaluator, printer, init) {
	
	this.name = name || "";
	this.read = reader;
	this.eval = evaluator;
	this.print = printer;

	this.initialize = init || function () {};
}

extend(REPL.prototype, {
	run : function () {
		this.initialize();
		
		while (!this.closing) {
			this.print(this.eval(this.read(readln())));
		}
		
		return true;
	},
	
	exit : function () {
		this.closing = true;
	}
});