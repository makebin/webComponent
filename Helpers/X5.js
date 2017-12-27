var X5 = (function(self,$){

	try{

	var _agent = navigator.userAgent.toLowerCase();
	self.isDebug = true;

	self.mAgent = {
		other: 0,
        ios: 1,
        android: 2,
        windows: 3
	};

	var _mAgent = self.mAgent.other;

    if (_agent.indexOf('android') > -1)
    {
        _mAgent = self.mAgent.android;
    }
    else if (_agent.indexOf('iphone') > -1 || _agent.indexOf('ipod') > -1 || _agent.indexOf('ipad') > -1)
    {
        _mAgent = self.mAgent.ios;
    }
    else if (_agent.indexOf('windows') > -1)
    {
        _mAgent = self.mAgent.windows;
    }

	self.isIE = !!window.ActiveXObject;
	self.isIE6 = self.isIE && !window.XMLHttpRequest;
	self.isIE8 = self.isIE && !!document.documentMode;
	self.isIE7 = self.isIE && !self.isIE6 && !self.isIE8;



	/**
	 * 字符串替换
	 */
	self.stringFormat = function(){
		if(arguments.length==0) return '';
		if(arguments.length == 1) return arguments[0];
		for(var s=arguments[0], i=1; i<=arguments.length; i++){
    		s=s.replace(new RegExp("\\{"+i+"\\}","g"), typeof(arguments[i]) =='undefined' ? "":arguments[i]);
    	}
		return s;
	};

	/**
	 * document.getElementById简写
	 * @param {Object} id
	 */
	self.$g = function(id){
		return document.getElementById(id);
	};

	/*
	 * 简易的判断用户是否为FALSE类型
	 */
	self.empty = function(mixture){
		if(typeof(mixture) === 'function')
		{
			return false;
		}
		if(mixture === false || mixture === undefined || mixture === 0 || mixture === null || mixture === '' || self.isNaNVal(mixture))
		{
			return true;
		}
		if(self.isEmptyArray(mixture) === true)
		{
			return true;
		}
		if(self.isEmptyObject(mixture) === true)
		{
			return true;
		}
		return false;
	}

	/**
	 * 判断是否为NaN
	 * @param {Object} mixture
	 */
	self.isNaNVal = function(mixture){
		return typeof(mixture) === 'number' && isNaN(mixture) === true ? true : false;
	}

	/**
	 * 判断是否为数组
	 * @param {Object} Arr
	 */
	self.isArray = function(Arr){
		return Object.prototype.toString.call(Arr) === '[object Array]';
	}

	/**
	 * 判断是否为空数组
	 * @param {Object} Arr
	 */
	self.isEmptyArray = function(Arr){
		return self.isArray(Arr) && Arr.length == 0 ? true : false;
	}

	/**
	 * 判断是否为对象
	 * @param {Object} obj
	 */
	self.isObject = function(obj)
	{
		return Object.prototype.toString.call(obj) === '[object Object]';
	}

	/**
	 * 判断对象是否为空
	 * @param {Object} obj
	 */
	self.isEmptyObject = function(obj){
		if(!self.isObject(obj))
		{
			return false;
		}
		if(self.isIE)
		{
			for (var i in obj) {
				if(obj.hasOwnProperty(i))
				{
					return false;
				}
			}
		}else {
				return Object.getOwnPropertyNames(obj).length ===0 ? true : false;
		}
	}
	/**
	 * 返回浏览器窗口的高和宽:需要注意
	 * 这个函数必须在页面加载完成后才能运行，否则document对象还没生成，浏览器会报错。
	 * 大多数情况下，都是document.documentElement.clientWidth返回正确值。但是，在IE6的quirks模式中，document.body.clientWidth返回正确的值，因此函数中加入了对文档模式的判断。
	 * clientWidth和clientHeight都是只读属性，不能对它们赋值。
	 * @param {Object} index
	 */
	self.getViewport = function(){
	　if (document.compatMode == "BackCompat"){
　　　　　　return {
　　　　　　　　"width": document.body.clientWidth,
　　　　　　　　"height": document.body.clientHeight
　　　　　　}
　　　　} else {
　　　　　　return {
　　　　　　　　"width": document.documentElement.clientWidth,
　　　　　　　　"height": document.documentElement.clientHeight
　　　　　　}
　　　　}
	}

	/**
	 * 含滚动条在内的浏览器窗口的高和宽
	 *网页上的每个元素还有scrollHeight和scrollWidth属性，指包含滚动条在内的该元素的视觉面积。那么，document对象的scrollHeight和scrollWidth属性就是网页的大小，意思就是滚动条滚过的所有长度和宽度。
	 */
	self.getPagearea = function(){
	　　if (document.compatMode == "BackCompat"){
　　　　　　return {
　　　　　　　　"width": Math.max(document.body.scrollWidth,
　　　　　　　　　　　　　　　　document.body.clientWidth),
　　　　　　　　"height": Math.max(document.body.scrollHeight,
　　　　　　　　　　　　　　　　document.body.clientHeight)
　　　　　　}
　　　　} else {
　　　　　　return {
　　　　　　　　"width": Math.max(document.documentElement.scrollWidth,
　　　　　　　　　　　　　　　　document.documentElement.clientWidth),
　　　　　　　　"height": Math.max(document.documentElement.scrollHeight,
　　　　　　　　　　　　　　　　document.documentElement.clientHeight)
　　　　　　}
　　　　}
	}


	/**
	 * 网页元素的绝对位置，指该元素的左上角相对于整张网页左上角的坐标
	 * 首先，每个元素都有offsetTop和offsetLeft属性，表示该元素的左上角与父容器（offsetParent对象）左上角的距离。所以，只需要将这两个值进行累加，就可以得到该元素的绝对坐标。
	 * PS:由于在表格和iframe中，offsetParent对象未必等于父容器，所以上面的函数对于表格和iframe中的元素不适用。
	 * PS:如果父元素中没有采用定位的，则是获取上外边缘距离文档内壁的距离。所谓的定位就是position属性值为relative、absolute或者fixed。
	 * @param {Object} element
	 */
	self.getElementLeft = function(element){
	　var actualLeft = element.offsetLeft;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualLeft += current.offsetLeft;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return actualLeft;
	}

	/**
	 * 网页元素的绝对位置，指该元素的左上角相对于整张网页左上角的坐标
	 * 首先，每个元素都有offsetTop和offsetLeft属性，表示该元素的左上角与父容器（offsetParent对象）左上角的距离。所以，只需要将这两个值进行累加，就可以得到该元素的绝对坐标。
	 * PS:由于在表格和iframe中，offsetParent对象未必等于父容器，所以上面的函数对于表格和iframe中的元素不适用。
	 * @param {Object} element
	 */
	self.getElementTop = function(element){
	　  var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualTop += current.offsetTop;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return actualTop;
	}

	/**
	 * 滚动条滚动的距离
	 */
	self.getViewScroll = function(){
		return {
			"left":document.compatMode == "BackCompat" ? document.body.scrollLeft : (document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft),
			"top": document.compatMode == "BackCompat" ? document.body.scrollTop : ( document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop)
		}
	}
	/**
	 * 网页元素的相对位置，指该元素左上角相对于浏览器窗口左上角的坐标
	 * 有了绝对位置以后，获得相对位置就很容易了，只要将绝对坐标减去页面的滚动条滚动的距离就可以了
	 * @param {Object} element
	 */
	self.getElementViewLeft = function(element)
	{
		return self.getElementLeft(element) - self.getViewScroll()['left'];
	}

	/**
 	 * 网页元素的相对位置，指该元素左上角相对于浏览器窗口左上角的坐标
	 * 有了绝对位置以后，获得相对位置就很容易了，只要将绝对坐标减去页面的滚动条滚动的距离就可以了
	 * @param {Object} element
	 */
	self.getElementViewTop = function(element){
		return self.getElementTop(element) - self.getViewScroll()['top'];
	}

	/**
	 * 获取元素相对于父元素的位置
	 * PS 如果父元素中没有采用定位的，则是获取上外边缘距离文档内壁的距离。所谓的定位就是position属性值为relative、absolute或者fixed。
	 */
	self.getElementOffset = function(element)
	{
		return {
			"top":element.offsetTop,
			"left":element.offsetLeft
		}
	}

	/**
	 * 异常处理
	 * @param {Object} e
	 */
	self.catchError = function(e){

		if(type(console) == 'object' && self.isDebug == true)
		{
			console.error(e);
		}

	}


	/**
	*是否开启调试打印功能
	*/
	self.openDebug = function(){
		self.isDebug = true;
	}





	}
	catch(e)
	{
		console.log(e);
	}

	return self;

})({},typeof(jQuery)=='undefined'?{}:jQuery);
