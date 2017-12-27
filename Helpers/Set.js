function Set() {
	var items = {};

	this.has = function(value) {
		return items.hasOwnProperty(value);
	}

	this.add = function(value) {
		if(!this.has(value)) {
			items[value] = value;
			return true;
		}
		return false;
	}

	this.remove = function(value) {
		if(!this.has(value)) {
			delete items[value];
			return true;
		}
		return false;
	}

	this.clear = function() {
		items = {};
	}

	this.sizeHight = function() {
		return Object.keys(items).length;
	}

	this.sizeLegacy = function() {

		return this.valuesLegacy().length;
	}

	/**
	 * 适配器
	 */
	this.size = function() {
		return typeof(Object.keys) === 'function' ? this.sizeHight() : this.sizeLegacy();
	}

	this.valuesHight = function() {
		return Object.keys(items);
	}

	this.valuesLegacy = function() {
		var values = [];
		for(var i in items) {
			if(items.hasOwnProperty(i)) {
				values.push(i);
			}
		}
		return values;
	}

	this.values = function() {
		return typeof(Object.keys) === 'function' ? this.valuesHight() : this.valuesLegacy();
	}

	this.union = function(otherSet) {
		var unionSet = new Set();
		var values = this.values();
		for(var i = 0; i < values.length; i++) {
			unionSet.add(values[i]);
		}
		var values = otherSet.values();
		for(var i = 0; i < values.length; i++) {
			unionSet.add(values[i]);
		}
		return unionSet;
	}

	this.intersection = function(otherSet) {
		var intersectionSet = new Set();
		var values = this.values();
		for(var i = 0; i < values.length; i++) {
			if(otherSet.has(values[i])) {
				intersectionSet.add(values[i]);
			}
		}
		return intersectionSet();
	}

	this.difference = function(otherSet) {
		var differenceSet = new Set();
		var values = this.values();
		for(var i = 0; i < values.length; i++) {
			if(!otherSet.has(values[i])) {
				differenceSet.add(values[i]);
			}
		}
		return differenceSet();
	}
	
	this.isSubSet = function(otherSet){
		if(otherSet.size()<this.size())
		{
			return false;
		}
		var _values = this.values();
		for(var i = 0 ;i<_values.length;i++){
			if(otherSet.has(_values[i]))
			{
				return false;
			}
		}
		return true;
	}

}