LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');
Exec('../code/obj/Node.js');
Exec('../code/obj/Graph.js');

Math.seedrandom('test');

var Generator = {
	create : function(obj, generator) {
		return {
			get seed() {return obj},
			generate : generator
		};
	}
};