function get (location) {
	var contents, file
	
	//try { // to open the file and get the data
		file = new File("../data/" + location);
		if (file.exist) {
			file.Open( File.RDONLY );
			contents = file.Read().toString();
			contents = contents.replace(/\r/g, "")
			file.Close();
			return contents;
		}
		else {
			return "";
		}
	//} catch (ex) {
	//	file.Close();
	//	throw new Error("Unexpected file error.");
	//}
}

function isFileType(string, type) {
	return (string.slice(-(type.length)) === type);
}