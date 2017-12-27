/**
 * 栈（LIFO）
 * 
 */
function Stack() {

	var items = [];

	this.size = function() {
		return items.length;
	}

	this.isEmpty = function() {
		return items.length === 0;
	}

	this.push = function() {

		for(var i in arguments) {
			if(arguments.hasOwnProperty(i)) {
				items.push(arguments[i]);
			}
		}

	}
	
	this.pop = function() {
		var _value = items.pop();
		return _value == undefined ? '' : _value;
	}

	this.peek = function() {
		return items[item.length - 1] == undefined ? '' : iteitemsm[items.length - 1];
	}

	this.clear = function() {
		return items.length = 0;
	}
	
}

