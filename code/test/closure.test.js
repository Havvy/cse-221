LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/obj/TestSet.js');

let (closure = new TestSet("closures")) {
	
	closure.addTest("broken let binding", function () {
		try {
			let (uuid = 0) {
				var f = function () {
					uuid++;
				};
			}
			
			for (let i = 0; i < 10; i++) {
				 f();
			}
		} catch (e) {
			return true;
		}
		return false;
	});
	
	closure.run();
}