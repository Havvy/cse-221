LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');

var BinaryNode = function (data, LChild, RChild) {
	this.value = data;
	
	this.children = [];
	if (LChild) this.children[0] = LChild;
	if (RChild) this.children[1] = RChild;
};

extend(BinaryNode.prototype, {
	constructor: BinaryNode,
	
	// Boolean methods.
	
	hasLesserNode : function () {
		return (this.lesser() !== null);
	},
	
	hasGreaterNode : function () {
		return (this.greater() !== null);
	},
	
	isLeaf : function () {
		return (this.children.length === 0);
	},
	
	// Mutator methods.
	
	addChild : function (value) {
		if (value < this.value) {
			let (l = this.lesser()) {
				if (l === null) {
					this.children[0] = new BinaryNode(value);
				} else {
					l.addChild(value);
				}
			}
		} else if (value > this.value) {
			let (g = this.greater()) {
				if (g === null) {
					this.children[1] = new BinaryNode(value);
				} else {
					g.addChild(value);
				}
			}
		} else {
			this.tally = this.frequency() ? this.tally + 1 : 2;
		}
	},
	
	addChildren : function (values) {
		values.forEach(function (value) {
			this.addChild(value);
		}, this);
	},
	
	// Accessors.
	
	lesser : function () {
		return (this.children[0] || null);
	},
	
	greater : function () {
		return (this.children[1] || null);
	},
	
	findSubnode : function (value) {
		if (value === this.value) {
			return this;
		} else if (value < this.value) {
			 if (this.lesser()) {
				 return this.lesser().findSubnode(value);
			 } else {
				 return false;
			 }
		} else /* value > this.value */ {
			if (this.greater()) {
				return this.greater().findSubnode(value);
			} else {
				return false;
			}
		}
	},
	
	iterate : function (callback, thisArg, index) {
		var myIndex = index = (index || 0);
		
		if (this.lesser()) {
			index = this.lesser().iterate(callback, thisArg, index + 1);
		}
		
		callback.apply((thisArg || this), [this.value, this, myIndex]);
		
		if (this.greater()) {
			index = this.greater().iterate(callback, thisArg, index + 1);
		}
		
		return index;
	},
	
	// Statistics
	
	count : function (underlings) {
		underlings = underlings || 1;
		if (this.lesser()) {
			if (this.lesser().isLeaf()) {
				underlings += 1;
			} else {
				underlings += this.lesser().count();
			}
		}
		if (this.greater()) {
			if (this.greater().isLeaf()) {
				underlings += 1;
			} else {
				underlings += this.greater().count();
			}
		}
		
		return underlings;
	},
	
	depth : function () {
		return 1 + Math.max(
			((this.lesser() && this.lesser().depth()) || 0),
			((this.greater() && this.greater().depth()) || 0));
	},
	
	frequency : function (value) {
		if (arguments.length === 1) {
			if (this.findSubnode(value)) {
				return (this.findSubnode(value).tally || 1);
			} else {
				return null;
			}
		} else {
			return (this.tally || 1);
		}
	},
	
	heightOf : function (value, height) {
		height = height || 0;
		
		if (value === this.value) {
			return height;
		}
		
		if (value < this.value && this.lesser()) {
			return this.lesser().heightOf(value, height + 1);
		} else if (value > this.value && this.greater()){
			return this.greater().heightOf(value, height + 1);
		} else {
			return null;
		}
	},
		
	
	// Display methods.
	
	toString : function () {
		var out = ""
		out += "{:value " + this.value;
		out += " :lesser " + this.lesser();
		out += " :greater " + this.greater();
		out += " :tally " + (this.tally || 1);
		out += "}"
	
		return out;
	},
	
	toTreeString : function () {
		var str = "";
		
		this.iterate(function (value, node, index) {
			var height = this.heightOf(value);
			
			for (let i = 0; i < height; i++) {
				str += "     ";
			}
			
			str += "---< ";
			str += value;
			str += "\n";
		}, this);
		return str;
	},
	
	depthList : function (list, depth) {
		depth = depth || 0;
		list = list || [0];
		
		list[depth] = (list[depth] && list[depth] + 1) || 1;
		
		list = this.lesser() ? this.lesser().depthList(list, depth + 1) : list;
		list = this.greater() ? this.greater().depthList(list, depth + 1) : list;
		
		return list;
	}
		
	});

var printNodeData = function(inputNode, listing){
	var str = " ";
	
	str += listing ;
	str += "\t";
	str += inputNode.value;
	for (let i = 0; i < 14 - inputNode.value.length; i++) {
		str += (" ");
	}
	str += "/";
	if (inputNode.lesser()) {
		str += inputNode.lesser().value
		for (let i = 0; i < 14 - inputNode.lesser().value.length; i++) {
			str += (" ");
		}
	} else {
		str += "N             ";
	}
	str += "\\" ;
	if (inputNode.greater()) {
		str += inputNode.greater().value
		for (let i = 0; i < 14 - inputNode.greater().value.length; i++) {
			str += (" ");
		}
	} else {
		str += "N             ";
	}
	str += inputNode.count();
	
	return str;
};

var printTreeData = function(inputNode, listing){
	listing = listing || 1;
	println(printNodeData(inputNode, listing));
	listing += 1;
	
	if (inputNode.lesser()){
		if (inputNode.lesser().isLeaf()) {
			println(printNodeData(inputNode.lesser(), listing));
			listing += 1;
		} else {
			listing = printTreeData(inputNode.lesser(), listing);
		}
	}
	if (inputNode.greater()){
		if (inputNode.greater().isLeaf()) {
			println(printNodeData(inputNode.greater(), listing));
			listing += 1;
		} else {
			listing = printTreeData(inputNode.greater(), listing);
		}
	}
	
	return listing;
};