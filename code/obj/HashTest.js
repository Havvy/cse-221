LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');

var HashTest = function (objs, size) {
	this.unhashed = [];
	this.fns = [];
	this.size = size || undefined;
	
	for (let o = 0; o < objs.length; o++) {
		this.unhashed.append(objs[o]);
	}
	
	// Transient slots.
	this.hashed = new Array(size || this.unhashed.length);
	this.failed = undefined;
	this.hashfn = "";
	this.rehashfn = "";
};

extend(HashTest.prototype, {
	clearTransients : function () {
		this.hashed = new Array(this.unhashed.length);
		this.failed = undefined;
		this.hashfn = "";
		this.rehashfn = "";
	},
	
	run : function () {
		cross([this.fns, this.fns], this.singlerun, this);
	},
	
	addFn : function (name, fn) {
		this.fns.append(fn);
		this.fns.last().name = name;
	},
	
	singlerun : function (hash, rehash) {
		var that = this;
		this.hashfn = hash.name;
		this.rehashfn = rehash.name;
		for (let o = 0; o < this.unhashed.length; o++) {
			var obj = this.unhashed[o], calculations = 0;
			
			function maybeAdd(current, obj) {
				if (!that.hashed[current]) {
					that.hashed[current] = {
						data : obj,
			 hash : hashVal,
			 rehash : rehashVal,
			 calculations : calculations
					};
					return true;
				} else {
					calculations++;
					return false;
				}
			}
			
			function maybeFail(obj, hash, rehash, current) {
				if (!(that.hashed[current].data === obj)) {
					that.failed = {
						data : obj,
			 hash : hash,
			 rehash : rehash,
			 calculations : calculations,
			 toString : function () {return this.data + "|H:" + this.hash + 
			 " R:" + this.rehash + " C:" + this.calculations}
					};
					return true;
				} else {
					return false;
				}
			}
			
			var hashVal = hash(obj), rehashVal = rehash(obj);
			
			let (tried = [], current = hashVal % this.hashed.length) {
				do {
					if (maybeAdd(current, obj)) {
						break;
					} else {
						tried.append(current);
						current = (current + rehashVal) % this.hashed.length;
					}
				} while (!tried.contains(current))
				
				if (maybeFail(obj, hashVal, rehashVal, current)) {
					break; 
				}
			}
		}	
		this.print();
		this.clearTransients();
	},
	
	print : function (verbose) {
		var totalCalcs = 0, studs = 0;
		
		println("Crossing '" + this.hashfn + "' with '" + this.rehashfn + "'");
		if (this.failed) {
			println("\tFailure:" + this.failed);
			totalCalcs += this.failed.calculations;
		}
		if (verbose) {
			println();
			println();
			println("Students:");
		}
		for (let ix = 0; ix < this.hashed.length; ix++) {
			let (stud = this.hashed[ix]) {
				if (stud) {
					if (verbose) {
						println("" + ix + ":" + " " + stud.data + "|H:" + stud.hash + 
						" R:" + stud.rehash + " C:" + stud.calculations);
					}
					totalCalcs += stud.calculations;
					studs += 1;
				} else {
					if (verbose) {
						println("" + ix + ": --");
					}
				}
			}
		}
		if (verbose) {
			println();
		} else {
			print("\t");
		}
		println("Total Rehash Calculations: " + totalCalcs + 
			". Average: " + (totalCalcs / studs) + ". In hash: " + 
			studs + "/" + this.unhashed.length + ".");
		if (verbose) {
			printline();
		}
	}
});