LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');

function Shell(name, dispatch, entry) {
	
	this.name = name || "shell";
	
	this.dispatch = dispatch || function (input) {
		this.exit(1);
	};
	
	this.entry = entry || function () {};
}

extend(Shell.prototype, {
	print : println,
	
	run : function () {
		this.entry();
		
		while (!this.closing) {
			print(this.name + "> ");
			this.dispatch(File.stdin.Read().toString().slice(0, -2));
		}
		
		return true;
	},
	
	exit : function () {
		this.closing = true;
	}
});