function get (location) {
	var contents, file
	try { // to open the file and get the data
		file = new File("../data/" + location);
		if (file.exist) {
			file.Open( File.RDONLY );
			contents = (file.Read());
			file.Close();
			return contents;
		}
		else {
			return "";
		}
	} catch (ex) {
		file.Close();
		throw new Error();
	}
}

function isFileType(string, type) {
	return (string.slice(-(type.length)) === type);
}