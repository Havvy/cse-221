LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');

let o = {a: 7, get b() {return this.a + 1;}, set c(x) {this.a = x / 2}};
let d = Object.getOwnPropertyDescriptor(o, "a");
println(d.toFullString());
