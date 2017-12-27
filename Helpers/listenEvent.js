var listenEvent = {
	"listen": function(key, fn) {
		if(!this.clientListenList[key]) {
			this.clientListenList[key] = [];
		}
		this.clientListenList[key].push(fn);
		console.log(this.clientListenList);
	},
	"trigger": function() {
		var key = Array.prototype.shift.call(arguments),
			fns = this.clientListenList[key];
		if(!fns || fns.length === 0) {
			return false;
		}

		for(var i = 0, fn; fn = fns[i++];) {
			fn.apply(this, arguments);
		}
	},
	"remove":function(key,fn){
		var fns = this.ClientRectList[key];
		if(!fns)
		{
			return false;
		}
		if(!fn)
		{
			fns && fns.length =0;
		}else{
			for(var l = fns.length -1;l>=0;l--)
			{
				var _fn = fns[l];
				if(_fn === fn)
				{
					fns.splice(l,1);
				}
			}
		}
	}
};

function installListenEventUnit(listenEventHandle) {
	for(var i in listenEvent) {
		listenEventHandle[i] = listenEvent[i];
	}	
}