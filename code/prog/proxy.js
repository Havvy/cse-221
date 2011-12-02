LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');

if(Proxy) {
	println("Have Proxies.");
} else {
	println("Missing awesome feature.  :(");
}