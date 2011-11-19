LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');
Exec('../code/obj/Node.js');
Exec('../code/obj/BinaryNode.js');

let (gettysburg = get('../data/gettysburg.txt')) {
	gettysburg = gettysburg.split(" ");
	gettysburg = gettysburg.filter(function (element) { return (element.trim() != ""); });
	
	var tree = new BinaryNode(gettysburg[0]);
	
	tree.addChildren(gettysburg.rest());
	
	println("What would you like to know about the Gettysburg Address?\n t: tree data\n w: word frequency/alphabetical order\n s: shape of Tree\n h: histogram\n anything else: Quit\n\n");
	switch(File.stdin.Read().toString().slice(0, -2)){
		case "t":{
			println("\n #      word       left child       right child     size\n");
			printTreeData(tree);
			break;
		}
		case "s": {
			println(tree.toTreeString());
			break;
		}
		case "w":{
			println("\n word        count\n");
			tree.iterate(function (value, node, index) {
			print(" " + value);
			for (let i = 0; i < 14 - this.value.length; i++) {
			print(" "); 
			} 
			print(node.frequency() + "\n");
			});
			break;
		}
		case "h":{
			println("\n depth\t# of nodes");
			var list = tree.depthList();
				for (let i = 1; i < list.length; i++){
					println("   " + i + ":\t    " + list[i]);
					}	
			break;
		}
		default:{break;}
	}
}