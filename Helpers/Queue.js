function Queue(){
	
	var items = [];
	
	this.enqueue = function(){
		
		for(var i in arguments) {
			if(arguments.hasOwnProperty(i)) {
				items.push(arguments[i]);
			}
		}
	}
	
	this.size = function() {
		return items.length;
	}

	this.isEmpty = function() {
		return items.length === 0;
	}

	this.clear = function() {
		return items.length = 0;
	}
	
	this.dequeue = function(){
		return items.shift();
	}
	
	this.front = function(){
		return items[0];
	}
}
