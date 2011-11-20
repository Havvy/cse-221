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
				"quit" : poly.quit,
				"clear" : poly.clear
			};
			
			if (fns.hasOwnProperty(input)) {
				return fns[input];
			} else {
				poly.last = input;
				return poly.readPoly(input);
			}
		},
		
		evaluator : function (fn) {
			if (arguments[0] instanceof Polynomial) {
				let (polynomial = arguments[0]) {
					poly.stack.append(polynomial);
					poly.last = polynomial;
					return polynomial;
				} 
			}
			
			if (fn === poly.quit) {
				fn.apply(poly.shell);
				return "Closing Polynomial calculator.";
			} else {
				var ret = fn.apply(poly.stack);
				poly.last = fn;
				return ret;
			}
		},
		
		printer : function (poly) {
			println(poly);
		},
		
		//STACK MODFICATION
		
		repeat : function () {
			if (poly.last instanceof Polynomial) {
				poly.stack.append(poly.last);
				return poly.last;
			} else {
				return poly.last.apply(this).last();
			}
		},
		
		readPoly : function () {
			
		},
		
		add : function () {
			var p1 = this.pop(), p2 = this.pop();
			this.push(Polynomial.add(p1, p2));
			this.push(p1.add(p2));
			return this.last();
		},
		
		sub : function () {
			var p1 = this.pop(), p2 = this.pop();
			this.push(Polynomial.subtract(p1, p2));
			this.push(p1.subtract(p2));
			return this.last();
		},
		
		mult : function () {
			var p1 = this.pop(), p2 = this.pop();
			this.push(Polynomial.multiply(p1, p2));
			this.push(p1.multiply(p2));
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
		
		help : function () {
			return get(DOC + "polynomial.txt");
		},
		
		quit : function () {
			this.exit(0);
		},
		
		print : function () {
			for (let ix = 0; ix < poly.stack.length; ix++) {
				println(poly.stack[ix]);
			}
		}
	});

	poly.repl = new REPL("polynomial", poly.reader, poly.evaluator, 
	poly.printer, poly.entry).run()
}