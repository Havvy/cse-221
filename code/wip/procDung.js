LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');
Exec('../code/obj/Node.js');
Exec('../code/obj/Graph.js');
Exec('../code/obj/Generator.js');

Math.seedrandom('test');
createGeneratingGraphFromFile("test");