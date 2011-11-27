LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');
Exec('../code/obj/REPL.js');
Exec('../code/obj/Polynomial.js');

let (poly = {}) {
	extend(poly, {
		// DATA
		stack : [],
		last : "",
		
		// REPL
		
		initializer : function () {
			this.print("Polynomial Calculator by Ryan's Dean and Scheel (Bob & Havvy)");
		},
		
		reader : function (input) {
			var fns = {
				"" : poly.repeat,
				"+" : poly.add,
				"add" : poly.add,
				"-" : poly.sub,
				"sub" : poly.sub,
				"*" : poly.mult,
				"mult" : poly.mult,
				"/" : poly.div,
				"%" : poly.mod,
				"h" : poly.help,
				"help" : poly.help,
				"-h" : poly.help,
				"q" : poly.quit,
				"exit" : poly.quit,
				"quit" : poly.quit,
				"clear" : poly.clear,
				"print" : poly.print,
				"show" : poly.print,
				"dup" : poly.dup,
				"drop" : poly.drop,
				"swap" : poly.swap
			};
			
			if (fns.hasOwnProperty(input)) {
				return fns[input];
			} else {
				poly.last = input;
				return poly.readPoly(input);
			}
		},
		
		evaluator : function (fn) {
			
			if (arguments[0].constructor === Polynomial) {
				let (polynomial = arguments[0]) {
					poly.stack.append(polynomial);
					poly.last = polynomial;
					return polynomial;
				} 
			}
			
			if (fn === poly.quit) {
				fn.apply(poly.repl);
				return "Closing Polynomial calculator.";
			} else {
				var ret = fn.apply(poly.stack);
				poly.last = (fn === poly.repeat) ? poly.last : fn;
				return ret;
			}
		},
		
		printer : function (poly) {
			println(poly);
		},
		
		//STACK MODFICATION
		
		repeat : function () {
			if (poly.last.constructor === Polynomial) {
				poly.stack.append(poly.last);
				return poly.last;
			} else {
				return poly.last.apply(this).last();
			}
		},
		
		readPoly : function (input) {
			var poly=[], ret;
			
			input = input.trim();
			
			let (splitPoly = input.split(" ")) {
				for (let ix = 0; ix < splitPoly.length; ix++) {
					if (splitPoly[ix] === "+" || splitPoly[ix] === "-") {
						poly.append(splitPoly[ix] + splitPoly[ix + 1]);
						ix++;
					} else {
						poly.append(splitPoly[ix]);
					}
				}
			}
			
			poly = poly.map(function (element) {
				return element.split("x");
			});
			
			ret = new Polynomial();
			for (let ix = 0; ix < poly.length; ix++) {
				ret.addTerm(parseInt(poly[ix].first(), 10), 
										(parseInt(poly[ix].second(), 10) || 0));
			}
			
			return ret;
		},
		
		add : function () {
			var p1 = this.pop(), p2 = this.pop();
			this.push(p1.addPoly(p2));
			return this.last();
		},
		
		sub : function () {
			var p1 = this.pop(), p2 = this.pop();
			this.push(subtractPoly(p1, p2));
			return this.last();
		},
		
		mult : function () {
			var p1 = this.pop(), p2 = this.pop();
			this.push(multiplyPoly(p1, p2));
			return this.last();
		},
		
		div : function () {
			var p1 = this.pop(), p2 = this.pop();
			this.push(Polynomial.divide(p1, p2));
			this.push(p1.divide(p2));
			return this.last();
		},
		
		mod : function () {
			var p1 = this.pop(), p2 = this.pop();
			this.push(Polynomial.modulus(p1, p2));
			this.push(p1.modulus(p2));
			return this.last();
		},
		
		clear : function () {
			for (let ix = 0; ix < this.length; ix++) {
				delete this[ix];
			}
			this.length = 0;
			return "Memory Cleared";
		},
		
		swap : function () {
			let last = this.pop(),
				penultimate = this.pop(),
			this.push(last);
			this.push(penultimate);
			return (this.penultimate() + "\n" + this.last());
		},
		
		dup : function () {
			this.push(this.last());
			return this.last();
		},
		
		drop : function () {
			return this.pop();
		},
		
		help : function () {
			return get(DOC + "polynomial.txt");
		},
		
		quit : function () {
			this.exit();
		},
		
		print : function () {
			for (let ix = 0; ix < poly.stack.length; ix++) {
				println(poly.stack[ix]);
			}
		}
	});

	poly.repl = new REPL("polynomial", poly.reader, poly.evaluator, 
	poly.printer, poly.entry)
	poly.repl.run()
}