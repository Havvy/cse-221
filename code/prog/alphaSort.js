LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');
Exec('../code/obj/Vector.js');
Exec('../code/obj/Sorted.js');

v = new Vector().append('a', 8.167).append('b', 1.492).append('c', 2.782).append('d', 4.253).append('e', 12.702).append('f', 2.228).append('g', 2.015).append('h', 6.094).append('i', 6.966).append('j', 0.153).append('k', 0.772).append('l', 4.025).append('m', 2.406).append('n', 6.749).append('o', 7.507).append('p', 1.929).append('q', 0.095).append('r', 5.987).append('s', 6.327).append('t', 9.056).append('u', 2.758).append('v', 0.978).append('w', 2.360).append('x', 0.150).append('y', 1.974).append('z', 0.074)

s = new Sorted(v, function (v1, v2) {
	return (v1 > v2);
});

print(s);