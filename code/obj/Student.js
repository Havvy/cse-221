var Student = function(firstName, sirName, SID, phone, height, birthday) {
	
	// Check preconditions.
	if (typeof firstName !== "string") {
		throw new TypeError("First name must be a string.");
	}
	
	if (typeof sirName !== "string") {
		throw new TypeError("Sir name must be a string.");
	}

	if (typeof SID !== "number" || Math.floor(SID) !== SID) {
		throw new TypeError("SID must be an integer.");
	}
	
	if (typeof phone !== "string") {
		throw new TypeError("Phone must be a string.");
	}
	
	if (typeof height !== "number") {
		throw new TypeError("Height must be a number.");
	}
	
	if (typeof birthday !== "number" || birthday < 0 || birthday > 366) {
		throw new TypeError("Birthday must be an int betweet 0 and 366. Was given " + birthday + " instead.");
	}
	
	// Set field values.
	
	this.firstName = firstName;
	this.sirName = sirName;
	this.SID = SID;
	this.phone = phone;
	this.height = height;
	this.birthday = birthday;
};

extend(Student.prototype, {
	toString : function () {
		var ret = "";
		
		ret += this.firstName + " ";
		ret += this.sirName + " ";
		ret += this.SID + " ";
		ret += this.phone + " ";
		ret += this.height + " ";
		ret += this.birthday;
		
		return ret;
	}
});

Student.prototype.compareByName = function (student) {
	if (this.firstName.toLowerCase() <= student.firstName.toLowerCase()) {
		return true;
	} else {
		return false;
	}
}

Student.prototype.compareBySID = function(student) {
	if (this.SID <= student.SID) {
		return true;
	} else {
		return false;
	}
}

Student.prototype.compareByHeight = function (student) {
	if (this.height <= student.height) {
		return true;
	} else {
		return false;
	}
}

Student.prototype.compareByBirthday = function (student) {
	if (this.birthday <= student.birthday) {
		return true;
	} else {
		return false;
	}
}