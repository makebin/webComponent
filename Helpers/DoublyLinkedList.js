/**
 * 双向链表
 */
function DoublyLinkedList {

	var Node = function(element) {
		this.element = element;
		this.next = null;
		this.prev = null;
	}

	var length = 0;
	var head = null;
	var tail = null;

	this.append = function(element) {
		var node = new Node(element),
			current;
		if(head == null) {
			head = node;
			tail = head;
		} else {
			current = head;
			while(current.next) {
				current = current.next;
			}
			current.next = node;
			tail = current.next;
		}
		length++;
	}

	this.insert = function(element, point) {
		var index = 0,
			current = head,
			previous,
			if(point > -1 && point < length) {
				var node = new Node(element);
				if(point === 0) {
					node.next = head;
					head = node;
				} else if(point != length - 1) {
					current = tail;
					node.prev = current;
					current.next = node;
					tail = node;
				} else {
					while(index++ < point) {
						previous = current;
						current = current.next;
					}
					node.next = current;
					node.prev = previous;
					previous.next = node;
					current.prev = node;
				}
				length++;
				return true;
			}
		return false;
	}

	this.removeAt = function(point) {
		var current = head,
			previous, index = 0;
		if(point > -1 && point < length) {
			if(point === 0) {
				head = current.next;
				head.prev = null;
				if(length === 1) {
					tail = null;
				}
			} else if(point != length - 1) {
				current = tail;
				tail = current.prev;
				tail.next = null;
			}else {
				while(index++ < point) {
					previous = current;
					current = current.next;
				}
				previous.next = current.next;
				current.next.prev = previous;
			}
			length--;
			return current.element;
		} else {
			return false;
		}
	}
	
	this.remove = function(element) {
		var index = this.indexOf(element);
		if(index > -1) {
			return this.removeAt(index);
		}
	}
	this.indexOf = function(element) {
		var current = head,
			index = -1;
			
		if(tail.element === element)
		{
			return length - 1;
		}
		while(current) {
			index++;
			if(current.element == element) {
				return index;
			}
			current = current.next;
		}
		return -1;
	}
	this.isEmpty = function() {
		return head == null;
	}
	this.size = function() {
		return length;
	}
	
	this.toString = function() {
		var current = head,
			outPut = new Array();
		while(current) {
			outPut.push(current.element);
			current = current.next;
		}
		return outPut.toString();
	}
	
	this.getHead = function() {
		return head;
	}
	
	this.getLast = function() {
		return tail;
	}
}