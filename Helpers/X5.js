/**
 *　　┏┓　　　┏┓+ +
 *　┏┛┻━━━┛┻┓ + +
 *　┃　　　　　　　┃ 　
 *　┃　　　━　　　┃ ++ + + +
 * ████━████ ┃+
 *　┃　　　　　　　┃ +
 *　┃　　　┻　　　┃
 *　┃　　　　　　　┃ + +
 *　┗━┓　　　┏━┛
 *　　　┃　　　┃　　　　　　　　　　　
 *　　　┃　　　┃ + + + +
 *　　　┃　　　┃
 *　　　┃　　　┃ +  神兽保佑
 *　　　┃　　　┃    代码无bug　　
 *　　　┃　　　┃　　+　　　　　　　　　
 *　　　┃　 　　┗━━━┓ + +
 *　　　┃ 　　　　　　　┣┓
 *　　　┃ 　　　　　　　┏┛
 *　　　┗┓┓┏━┳┓┏┛ + + + +
 *　　　　┃┫┫　┃┫┫
 *　　　　┗┻┛　┗┻┛+ + + +
 *@author keBin Ma
 */
; (function (self, $) {

	try {

		var _agent = navigator.userAgent.toLowerCase();

		var defaultRequestSettings = {
			"bindTargets": null, //绑定的对象目标
			"async": true,
			"type": 'get',
			"cache": true,
			"contentType": "application/x-www-form-urlencoded",
			"beforeSend": null,
			"complete": null,
			"context": null,
			"data": [],
			"dataType": "json"

		};
		var defaultTargetStyle = {
			"DOM_READY_STYLE": 'x5_dom_ready',
			"DOM_ACTIVE_STYLE": 'x5_dom_active',
			"DOM_FINISH_STYLE": 'x5_dom_finish',
			"DOM_REVIVE_TIME": 2e3, //按钮回复时间
			"DOM_HASH_REQUEST_ERROR": 'has_request_error'
		}

		self.mAgent = {
			other: 0,
			ios: 1,
			android: 2,
			windows: 3
		};

		var _mAgent = self.mAgent.other;

		if (_agent.indexOf('android') > -1) {
			_mAgent = self.mAgent.android;
		} else if (_agent.indexOf('iphone') > -1 || _agent.indexOf('ipod') > -1 || _agent.indexOf('ipad') > -1) {
			_mAgent = self.mAgent.ios;
		} else if (_agent.indexOf('windows') > -1) {
			_mAgent = self.mAgent.windows;
		}

		self.isIE = !!window.ActiveXObject;
		self.isIE6 = self.isIE && !window.XMLHttpRequest;
		self.isIE8 = self.isIE && !!document.documentMode;
		self.isIE7 = self.isIE && !self.isIE6 && !self.isIE8;
		self.h5Support = window.applicationCache ? true : false;

		/**
		 * 字符串替换
		 */
		self.stringFormat = function () {
			if (arguments.length == 0) return '';
			if (arguments.length == 1) return arguments[0];
			for (var s = arguments[0], i = 1; i <= arguments.length; i++) {
				s = s.replace(new RegExp("\\{" + i + "\\}", "g"), typeof (arguments[i]) == 'undefined' ? "" : arguments[i]);
			}
			return s;
		};

		self.modulExports = function (settings) {

		};

		/**
		 * document.getElementById简写
		 * @param {Object} id
		 */
		self.$g = function (id) {
			return document.getElementById(id);
		};

		/*
		 * 简易的判断用户是否为FALSE类型
		 */
		self.empty = function (mixture) {
			return typeof (mixture) !== 'function' &&
				(mixture == false || mixture == undefined ||
					mixture == 0 || mixture == null ||
					isNaN(mixture) || self.isEmptyArray(mixture) ||
					mixture == '' || self.isEmptyObject(mixture)) ? true : false;
		}

		/**
		 * 判断是否为数组
		 * @param {Object} Arr
		 */
		self.isArray = function (Arr) {
			return Object.prototype.toString.call(Arr) === '[object Array]';
		}

		/**
		 * 判断是否为空数组
		 * @param {Object} Arr
		 */
		self.isEmptyArray = function (Arr) {
			return self.isArray(Arr) && Arr.length == 0 ? true : false;
		}

		/**
		 * 判断是否为对象
		 * @param {Object} obj
		 */
		self.isObject = function (obj) {
			return Object.prototype.toString.call(obj) === '[object Object]';
		}

		/**
		 * 判断对象是否为空
		 * @param {Object} obj
		 */
		self.isEmptyObject = function (obj) {
			return self.isObject(obj) && Object.getOwnPropertyNames(obj).length === 0 ? true : false;
		}
		/**
		 * 返回浏览器窗口的高和宽:需要注意
		 * 这个函数必须在页面加载完成后才能运行，否则document对象还没生成，浏览器会报错。
		 * 大多数情况下，都是document.documentElement.clientWidth返回正确值。但是，在IE6的quirks模式中，document.body.clientWidth返回正确的值，因此函数中加入了对文档模式的判断。
		 * clientWidth和clientHeight都是只读属性，不能对它们赋值。
		 * @param {Object} index
		 */
		self.getViewport = function () {
			if (document.compatMode == "BackCompat") {
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
		self.getPagearea = function () {
			if (document.compatMode == "BackCompat") {
				return {
					"width": Math.max(document.body.scrollWidth, document.body.clientWidth),
					"height": Math.max(document.body.scrollHeight, document.body.clientHeight)
				}
			} else {
				return {
					"width": Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
					"height": Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
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
		self.getElementLeft = function (element) {
			var actualLeft = element.offsetLeft;
			var current = element.offsetParent;
			while (current !== null) {
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
		self.getElementTop = function (element) {
			var actualTop = element.offsetTop;
			var current = element.offsetParent;
			while (current !== null) {
				actualTop += current.offsetTop;
				current = current.offsetParent;
			}
			return actualTop;
		}

		/**
		 * 滚动条滚动的距离
		 */
		self.getViewScroll = function () {
			return {
				"left": document.compatMode == "BackCompat" ? document.body.scrollLeft : (document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft),
				"top": document.compatMode == "BackCompat" ? document.body.scrollTop : (document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop)
			}
		}
		/**
		 * 网页元素的相对位置，指该元素左上角相对于浏览器窗口左上角的坐标
		 * 有了绝对位置以后，获得相对位置就很容易了，只要将绝对坐标减去页面的滚动条滚动的距离就可以了
		 * @param {Object} element
		 */
		self.getElementViewLeft = function (element) {
			return self.getElementLeft(element) - self.getViewScroll()['left'];
		}

		/**
		 * 网页元素的相对位置，指该元素左上角相对于浏览器窗口左上角的坐标
		 * 有了绝对位置以后，获得相对位置就很容易了，只要将绝对坐标减去页面的滚动条滚动的距离就可以了
		 * @param {Object} element
		 */
		self.getElementViewTop = function (element) {
			return self.getElementTop(element) - self.getViewScroll()['top'];
		}

		/**
		 * 获取元素相对于父元素的位置
		 * PS 如果父元素中没有采用定位的，则是获取上外边缘距离文档内壁的距离。所谓的定位就是position属性值为relative、absolute或者fixed。
		 */
		self.getElementOffset = function (element) {
			return {
				"top": element.offsetTop,
				"left": element.offsetLeft
			}
		}
		/**
		 * 异步请求处理机
		 * @param {Object} maxTryCount 最多尝试次数
		 */
		self.asyncTryBoot = function (maxTryCount, bootBody, fail) {
			var loopCount = 1;
			setTimeout(function () {
				loopCount++;
				var timer = setTimeout(arguments.callee, 1e3);
				if (bootBody() == true) {
					clearTimeout(timer);
				}
				if (loopCount >= maxTryCount) {
					if (typeof (fail) == "function") {
						fail(loopCount);
					}
					clearTimeout(timer);
				}
			}, 1e3);
		}
		/**
		 * ajax请求打包处理
		 * @param {Object} settings
		 */
		self.request = function (settings) {
			defaultRequestSettings.context = defaultRequestSettings.context || document.body;
			var config = {};
			$.extend(true, config, defaultRequestSettings, settings);

			if (!config.url) {
				throw ('request url missing!');
			}

			config.url += (config.url.indexOf('?') > -1 ? "&" : "?");
			config.url += ('_t=' + ~new Date());
			/**
			 * 绑定对象的状态操作
			 */
			var bindTargetsHandle = null;
			if (config.bindTargets) {
				bindTargetsHandle = self.bindTargetStyle(config.bindTargets);
			}

			$.ajax({
				"type": config.type,
				"url": config.url,
				"async": config.async,
				"cache": config.cache,
				"contentType": config.contentType,
				"context": config.context,
				"data": config.data,
				"dataType": config.dataType,
				"beforeSend": function (XMLHttpRequest) {
					if (bindTargetsHandle) {
						bindTargetsHandle.active();
					}
					if (typeof (config.beforeSend) == 'function') {
						config.beforeSend(XMLHttpRequest);
					}
				},
				"complete": function (XMLHttpRequest, code) {
					if (bindTargetsHandle) {
						bindTargetsHandle.finish();
					}
					if (typeof (config.complete) == 'function') {
						config.complete(XMLHttpRequest, code);
					}
				},
				"error": function (XMLHttpRequest, code, err) {
					// that for context
					var that = $(this);
					that.addClass(defaultTargetStyle.DOM_HASH_REQUEST_ERROR);
					setTimeout(function () {
						that.removeClass(defaultTargetStyle.DOM_HASH_REQUEST_ERROR);
					}, defaultTargetStyle.DOM_REVIVE_TIME);
					if (typeof (config.error) == 'function') {
						config.error(XMLHttpRequest, code, error);
					}
				},
				"success": function (XMLHttpRequest) {
					if (typeof (config.success) == 'function') {
						config.success(XMLHttpRequest);
					}
				}
			});
		}

		/**
		 * request get alias
		 * @param {Object} settings
		 */
		self.requestGet = function (settings) {
			$.extend(settings, {
				"type": "get"
			});
			self.request(settings);
		}

		/**
		 * request post alias
		 * @param {Object} settings
		 */
		self.requestPost = function (settings) {
			$.extend(settings, {
				"type": "post"
			});
			self.request(settings);
		}

		/**
		 * 调整按钮在不同操作状态时的样式
		 * @param {Object} targets
		 */
		self.bindTargetStyle = function (targets) {

			function targetsHandle(targets) {
				this.targets = targets;
			}
			/**
			 * 设置按钮准备时的状态
			 */
			targetsHandle.prototype.ready = function () {
				this.targets.removeClass(defaultTargetStyle.DOM_ACTIVE_STYLE + " " + defaultTargetStyle.DOM_FINISH_STYLE);
				this.targets.addClass(defaultTargetStyle.DOM_READY_STYLE);
				this.targets.attr("disabled", false);
			}
			/**
			 * 设置按钮激活时的状态
			 */
			targetsHandle.prototype.active = function () {
				this.targets.removeClass(defaultTargetStyle.DOM_FINISH_STYLE + " " + defaultTargetStyle.DOM_READY_STYLE);
				this.targets.addClass(defaultTargetStyle.DOM_ACTIVE_STYLE);
				this.targets.attr("disabled", true);
			}
			/**
			 * 设置按钮解释时的状态
			 */
			targetsHandle.prototype.finish = function () {
				this.targets.removeClass(defaultTargetStyle.DOM_ACTIVE_STYLE + " " + defaultTargetStyle.DOM_READY_STYLE);
				this.targets.addClass(defaultTargetStyle.DOM_FINISH_STYLE);
				var _ts = this.targets;
				this.targets.attr("disabled", true);
				setTimeout(function () {
					var _cs = _ts.filter("[unloop!='true']");
					var handle = self.bindTargetStyle(_cs);
					handle.ready();
					handle = null;
				}, defaultTargetStyle.DOM_REVIVE_TIME);
			}
			return new targetsHandle(targets);
		}

		/**
		 * 动画仓库，用于
		 */
		self.animation = {
			"infoStore": {

			}
		};

		/**
		 * 播放动画
		 */
		self.playAnimation = function () {

		};

		self.echo = function () {

			for (var i = 0; i < arguments.length; i++) {
				console.log(arguments[0]);
			}

		};
		/**
		 * 判断一个元素是否在这个元素列表里
		 * @param {Object} dom
		 * @param {Object} domList
		 */
		self.isInDom = function (dom, domList) {
			if (domList.length > 0 && dom) {
				for (var i = 0; i < domList.length; i++) {
					var t = domList[i];
					if (dom == t) {
						return true;
					}
				}
			}
			return false;
		};

		/**
		 * 格式化
		 * @param {Object} num
		 */
		self.formatNumberSpanDom = function (num) {
			num = "" + (~~num);
			if (num.length == 1) {
				return "<span class=\"g-num g" + num + "\"></span>";
			} else {
				num = num.split('');
				var output = '';
				for (var i = 0; i < num.length; i++) {
					var item = num[i];
					output += ("<span class=\"g-num g" + item + "\"></span>");
				}
				return output;
			}
		};

		/**
		 * 内容渐显
		 */
		self.htmlFadeIn = function () {
			this.html('<div class="inner" style="display:none;">' + arguments[0] + '</div>');
			var innerDom = this.children('.inner');
			setTimeout(function () {
				innerDom.fadeIn('slow');
			}, 0);
		}

		self.changeTargetLogicLabel = function (target, state, callback) {

			var logicKey = state ? "right" : "left";
			target.children('label').html(self.$data(target, logicKey));
			self.$setData(target, 'state', ~~state);
			if (typeof (callback) == 'function') {
				callback(logicKey);
			}
		};

		self.$data = function (target, key, deep) {
			if (key) {
				deep = deep || false;
				return !deep ? target.data(key) : target.attr("data-" + key);
			}
		};

		/**
		 * 
		 * @param {Object} target
		 * @param {Object} key
		 * @param {Object} deep
		 */
		self.$setData = function (target, key, value, deep) {
			if (key) {
				deep = deep || false;
				return !deep ? target.data(key, value) : target.attr("data-" + key, value);
			}
			return false;
		};

		/**
		 * 通过swfobject获取swf对象
		 * @param {Object} id
		 */
		self.$swf = function (id) {
			if (typeof (swfobject) != 'undefined') {
				return swfobject.getObjectById(id);
			}
			return false;
		};

		/**
		 * dom操作池,仅对固定长度里的池内dom进行相应的操作
		 * @param {Object} max 池长度
		 * @param {Object} max 添加入池的尝试次数,达到次数就进行抛弃
		 */
		self.ponds = function (max, tryMax) {

			function ponds(max) {
				this.max = max;
				this.ponds = [];
				this.tryMax = tryMax || 3;
			}

			ponds.prototype.max = function (max) {
				this.max = max;
			}

			ponds.prototype.use = function (content) {

				function pondsUnitClass(content) {
					this.pondContent = content; //保存PondContentClass生成的对象
					this.unid = ~new Date() + Math.ceil(Math.random() * 100000); //生成时间
					this.state = false; //当前的状态
					this.trySize = 0; //这个对象尝试加入池的次数
					this.timer = null; //用于记录用到的timer对象
					this.createtime = new Date(); //创建的时间
				};
				var pondUnit = new pondsUnitClass(content);
				if (this.size() < this.max) {
					this.ponds.unshift(pondUnit);
					pondUnit.pondContent.start.call(pondUnit);
				} else {
					var that = this;
					this.hasFreePonAndShift(pondUnit, function (freePondUnid) {
						that.ponds.unshift(pondUnit);
						pondUnit.pondContent.start.call(pondUnit);
					});
				}
				return pondUnit;
			}

			ponds.prototype.size = function () {
				return this.ponds.length;
			}

			ponds.prototype.hasFreePond = function () {

				if (this.size() < this.max) {
					return true;
				}
				for (var i = 0; i < this.max; i++) {
					if (this.ponds[i].state == false) {
						return true;
					}
					break;
				}
				return false;
			}
			/**
			 * 判断是否已经有空闲的元素体
			 */
			ponds.prototype.hasFreePonAndShift = function (pondUnit, callback) {
				var that = this;
				pondUnit.timer = setInterval(function () {
					if (that.hasFreePond()) {
						callback();
					} else {

						pondUnit.trySize++;

						/**
						 * 最后一次尝试,直接删除占用较久的池
						 */
						if ((pondUnit.trySize + 1) == that.tryMax) {
							that.kill();
						}
						if (pondUnit.trySize > that.tryMax) {
							clearInterval(pondUnit.timer);
						}
					}
				}, 1e3);
			}

			ponds.prototype.remove = function (index) {
				for (var i = 0; i < this.max; i++) {
					if (this.ponds[i].unid == index) {
						this.ponds[i].pondContent.stop.call(this.ponds[i]);
					}
					break;
				}
			}

			ponds.prototype.getLong = function () {
				return this.ponds.length > 0 ? this.ponds[this.ponds.length - 1] : null;
			}
			/*
			 *强制删除一条内容 
			 */
			ponds.prototype.kill = function () {

				var pondUnit = this.getLong();
				if (pondUnit) {
					var that = this;
					pondUnit.pondContent.stop.call(pondUnit) || pondUnit.pondContent.kill.call(pondUnit, function () {
						that.ponds.pop();
					});
				}
			}

			ponds.prototype.clean = function () {

				for (var i = 0; i < this.max; i++) {
					this.ponds[i].pondContent.stop.call(this.ponds[i]);
				}

			}
			return new ponds(max);
		}

		self.factoryPondContent = function (settings) {

			/**
			 * 创建队列
			 * @param {Object} content
			 */
			function PondContentClass(content) {
				this.content = content;
				this.settings = settings;
			}

			/**
			 * 结束队列
			 */
			PondContentClass.prototype.stop = function () {
				console.log("finish", this);
				if (typeof (this.pondContent.settings.stop) == 'function') {
					this.pondContent.settings.stop.call(this);
				}
			}

			/**
			 * 开始使用队列
			 * @param {Object} pondsDom
			 */
			PondContentClass.prototype.start = function () {
				console.log("start", this);
				if (typeof (this.pondContent.settings.start) == 'function') {
					this.pondContent.settings.start.call(this);
				}
			}
			PondContentClass.prototype.kill = function () {
				//强制删除相应的池内容
				console.log(this);
				if (typeof (arguments[0] == 'function')) {
					arguments[0]();
				}
			}
			return new PondContentClass(settings.content, settings);
		}

	} catch (e) {
		console.warn(e);
	};

	/**
	 * 创建一个flash对象
	 * @param {Object} settings
	 */
	self.createSwfObject = function (settings) {
		if (typeof (swfobject) == 'undefined') {
			return false;
		}
		var config = {
			"contain": "",
			"swfUrl": "",
			"width": "100%",
			"height": "100%",
			"version": "3.2.6",
			"expressInstallSwfurl": "http://www.adobe.com/cfusion/knowledgebase/index.cfm?id=6a253b75",
			"flashvars": {

			},
			"params": {
				"quality": "high",
				"allowScriptAccess": "always",
				"wmode": "Opaque",
				"allowFullScreenInteractive": true,
				"allowFullScreen": true
			},
			"attributes": {
				"type": "application/x-shockwave-flash",
				"align": "center"
			}
		};
		$.extend(true, config, settings);
		swfobject.embedSWF(config.swfUrl, config.contain, config.width, config.height, config.version, config.expressInstallSwfurl, config.flashvars, config.params, config.attributes);
		return true;
	};

	/**
	 * 对编码的文字进行处理
	 * @param {Object} r
	 */
	self.stringCodingFormat = function (r) {
		var result = false;
		try {
			if (!r) {
				return false;
			}
			if (typeof (r) == 'string') {
				var _r = decodeURI(r);
				result = $.parseJSON(_r);
			} else if (typeof r == 'object') {
				result = r;
			}

		} catch (error) {
			result = decodeURI(r);
		}

		return result;
	};
	/**
	 *获取时间戳
	 */
	self.timeSecond = function () {
		return Math.round(new Date().getTime() / 1000);
	};

	self.unid = function (ext) {
		return 'plug_' + (ext ? ext : '') + '_' + self.timeSecond() + parseInt((Math.random() * 1000));
	};

	/**
	 * 对嵌套里的tab不做处理,需要手动增加元素
	 * @param {Object} content
	 */
	self.TAB_HD_ITEM_CLASS = 'plug-tab-hd-item';
	self.TAB_CONTENT_CLASS = 'plug-tab-content-item';
	self.TAB_PLUG_CLASS = 'plug-tab-contain';
	self.convertTable = function (content, cur) {
		var CURRENT_CLASS = 'cur';
		var tab = content.find('.plug-tab-hd-item:eq(0)').parent().children('.plug-tab-hd-item');
		var itemParent = content.find('.plug-tab-content-item:eq(0)').parent();
		itemParent.children('.plug-tab-content-item').hide();
		itemParent.children('.plug-tab-content-item:eq(0)').show();
		var isSelectCurrentStyle = cur || CURRENT_CLASS;
		tab.eq(0).addClass(isSelectCurrentStyle);
		tab.parent().on('click', '.' + self.TAB_HD_ITEM_CLASS, function () {
			var that = $(this);
			if (that.hasClass(isSelectCurrentStyle)) {
				return false;
			}
			that.siblings().removeClass(isSelectCurrentStyle);
			that.addClass(isSelectCurrentStyle);
			var items = itemParent.children('.plug-tab-content-item').hide();
			items.eq(that.index()).fadeIn("slow");
		});
	};


	self.bindNumberInput = function () {
		this.on('keydown', function (event) {
			if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39)) {
				return false;
			}
		});
		this.on("input propertychange change", function () {
			var that = $(this);
			that.val(1 * that.val());
		});
		this.on('focus', function () {
			$(this).select();
		});
	};


	/**
	 * 下拉菜单榜单初始化
	 * @param {Object} settings
	 * @param {Object} settings.showClass #触发显示的样式
	 * @param {Object} settings.id  #触发的按钮
	 * @param {Function} settings.before #前置条件
	 * @param {Function} settings.after #后续操作
	 */
	self.plugSelectEnable = function (settings) {
		var config = {};
		$.extend(config, settings);
		$('.plug-select-list-on-off').click(function (event) {
			var onOff = $(this);
			if (X5.$data('disable')) {
				return false;
			}
			if ($.isFunction(settings.before) && !settings.before(onOff, event)) {
				return false;
			}
			onOff.toggleClass('active');
			var target = X5.$data(onOff, 'target');
			if (target) {
				target = $(target);
				if (target.length > 0) {
					target.toggleClass("active");
					target.toggleClass(target.attr('toggle-class'));
					var selectListItem = target.find('.select-list-item');
					var targetForData = X5.$data(target, 'relation');
					targetForData = $(targetForData)
					selectListItem.unbind('click').click(function () {
						var value = X5.$data($(this), 'count');
						targetForData.val(value).trigger('change');
						X5.$setData(targetForData, 'select-result', value, true);
						onOff.trigger('click');
					});
					if ($.isFunction(settings.after)) {
						settings.after(selectListItem,targetForData);
					}
				}
			}
		});
	};

	var memoryDebugTimer = 0;
	self.memoryDebug = function () {

		if ($('#x5_memory_debug_content').length < 1) {
			var output = '<div id="x5_memory_debug_content" style="position:absolute;top:0;right:0;z-index:99999;height:auto;width:250px;background:rgba(0,0,0,.2);color:red;font-size:12px;padding:1em"><ul><li>--非标准内存参考--</li><li style="color:#00ffff">实用:<em id="usedJSHeapSize"></em></li><li>可用:<em id="totalJSHeapSize">0</em></li><li>限制:<em id="jsHeapSizeLimit"></em></li></ul></div>';
			$('body').append(output);

		}
		memoryDebugTimer = setInterval(function () {
			var memory = console.memory;
			$('#totalJSHeapSize').html(memory.totalJSHeapSize / Math.pow(1024, 2));
			$('#usedJSHeapSize').html(memory.usedJSHeapSize / Math.pow(1024, 2));
			$('#jsHeapSizeLimit').html(memory.jsHeapSizeLimit / Math.pow(1024, 2));
		}, 1e2);

	};

	self.memoryDebugOff = function () {
		$('#x5_memory_debug_content').remove();
		if (memoryDebugTimer) {
			clearInterval(memoryDebugTimer);
		}
	};
	self.JSONStringify = function (obj) {
		$result = '';
		try {
			if (typeof (JSON) != 'undefined') {
				$result = JSON.stringify(obj);
			}
		} catch (err) {

		}
		return $result;
	};
	/**
	 * 绑定懒执行js事件
	 * [lazyloadEnable description]
	 * @param  {[type]}   events   [description]
	 * @param  {Function} callback [description]
	 * @param  {[type]}   targets  [description]
	 * @return {[type]}            [description]
	 */
	self.lazyloadEnable = function (events, callback, targets) {
		targets = targets || '.lazyload-js';
		var events = events.join(" ");
		$(targets).one(events, function (e) {
			var res = $(this).attr('lazyload-js-bind');
			if (res) {
				if ($.isFunction(callback)) {
					res = self.formatLazyParam(res);
					callback(res, e, $(this));
				}
			}

		})
	};

	/**
	 * 本地缓存
	 * [Storage description]
	 * @type {Object}
	 */
	self.Storage = {};
	/**
	 * 获取缓存
	 * [get description]
	 * @param  {[type]} key [description]
	 * @return {[type]}     [description]
	 */
	self.Storage.get = function (key) {
		if (typeof (localStorage) == 'undefined') {
			return false;
		}
		var result = false;
		try {
			var item = localStorage.getItem(key);
			if (!item) {
				return false;
			}
			item = JSON.parse(item);
			if (item.time + item.expires < self.timeSecond) {
				return false;
			}
			if (item.type == 'string') {
				result = item.content.toString();
			} else if (item.type == 'number') {
				return item.content * 1;
			} else if (item.type == 'boolean') {
				return !!item.content;
			} else {
				return JSON.parse(item.content);
			}

		} catch (err) {

		}
		return result;
	};

	/**
	 * 设置缓存
	 * [set description]
	 * @param {[type]} key   [description]
	 * @param {[type]} value [description]
	 */
	self.Storage.set = function (key, value, expires) {
		if (typeof (localStorage) == 'undefined') {
			return false;
		}
		try {
			if (null === value) {
				localStorage.setItem(key, null);
				return true;
			}
			var thisType = typeof (value);
			var content = thisType == "string" || thisType == "number" ? value : (thisType == 'boolean' ? ~~value : JSON.stringify(value));
			return localStorage.setItem(key, JSON.stringify({
				"type": thisType,
				"content": content,
				"time": self.timeSecond(),
				"expires": expires || 6e2
			}));
		} catch (err) {

		}
		return false;
	};



	/**
	 * 格式处理绑定的事件名称
	 * [formatLazyParam description]
	 * @param  {[type]} param [description]
	 * @return {[type]}       [description]
	 */
	self.formatLazyParam = function (param) {
		if (param.indexOf('-') < 0) {
			return param;
		}
		param = param.split("-");
		if (param.length > 2) {
			param = param.map(function (x) {
				x = x.toString();
				x = x.toLocaleLowerCase();
				var x1 = x.substr(0, 1).toUpperCase();
				var x2 = x.substr(1);
				x = x1 + x2;
				return x;
			});

		}
		return "bind" + (param.join(''));
	};

	/**
	 * 给绑定的对象绑定一个
	 * [elementStateMachine description]
	 * @return {[type]} [description]
	 * dely 默认1.5秒后可再出发对象
	 */
	self.elementStateMachineIndex = 'element-state-machine';
	self.registerElementStateMachine = function (element, dely) {
		dely = dely || 1.5e3;
		var result = true;
		try {
			if (element.length < 1 || element.hasClass(self.elementStateMachineIndex)) {
				return false;
			}
			element.addClass(self.elementStateMachineIndex);
			setTimeout(function () {
				element.removeClass(self.elementStateMachineIndex);
			}, dely);
		} catch (err) {
		}
		return result;
	}
	/**
	 * @todo可以进一步优化性能
	 * [registerAutoClose description]
	 * @param  {[type]}   target   [description] 要判断的元素
	 * @param  {Function} callback [description] 元素要隐藏执行的操作
	 * @param  {[type]}   before   [description] 元素不隐藏的先决条件是否已经满足
	 * @param  {[type]}   deep   [description] 使用深度檢測
	 * @return {[type]}            [description]
	 */
	var BORDER_STEP = 0.6;
	self.registerAutoClose = function (target, callback, before, deep) {
		if (target.length > 0) {
			$('body').click(function (event) {

				if ($.isFunction(before)) {
					if (before(target, event)) {
						return true;
					}
				}
				if (deep == false) {
					var plugAutoCloseOriginWidth = ~~(target.attr('plug-auto-close-origin-width'));
					var plugAutoCloseOriginHeight = ~~(target.attr('plug-auto-close-origin-height'));
					var elementXY = { "x": X5.getElementTop(target[0]), "y": X5.getElementLeft(target[0]) };
					var elementHW = { "w": target.outerWidth() + plugAutoCloseOriginWidth, "h": target.outerHeight() + plugAutoCloseOriginHeight };
					var eventXY = { "x": event.clientX, "y": event.clientY };
					var xL = elementXY.x * (1 - BORDER_STEP);
					var xR = (elementXY.x + elementHW.w) * (1 + BORDER_STEP);
					var yB = (elementXY.y - elementHW.h) * (1 - BORDER_STEP);
					var yT = (elementXY.y + elementHW.h) * (1 + BORDER_STEP);
					//判断鼠标边界直接处理，如果还是不能进一步判断再走下面的依次dom搜索
					if ((eventXY.x < xL || eventXY.x > xR) || (eventXY.y < yB || eventXY.y > yT)) {
						if ($.isFunction(callback)) {
							callback(target, event);
						}
					};
				}
				if (event.target == target[0] || self.isInDom(target[0], $(event.target).parents())) {
					return true;
				} else {
					if ($.isFunction(callback)) {
						callback(target, event);
					}
				}

			});
		}
	};
	/**
	 * 整理某个列对里位置的用户到最佳的显示位
	 * [neatenPoint description]
	 * @return {[type]} [description]
	 */
	self.neatenPointForListItem = function (wrapElement, element, unneaten) {
		if (unneaten) {
			wrapElement.scrollTop(0);
			return false;
		}
		if (element[0]) {
			var offset = self.getElementOffset(element[0]);
			wrapElement.scrollTop(offset.top);
		}

	};
	/**
	 * 剩余文字内容绑定输出到指定对象
	 * [registerMaxLengthResidue description]
	 * @return {[type]} [description]
	 */
	self.registerMaxLengthResidue = function (element, callback) {
		element.on('input propertychange change', function (event) {
			var maxlength = element.attr('maxlength');
			var targetViewElement = element.attr('residue-target-for');
			targetViewElement = $(targetViewElement);
			if (targetViewElement.length > 0) {
				var residue = maxlength - element.val().length;
				residue = residue > 0 ? residue : 0;
				targetViewElement.html(residue);
				if (jQuery.isFunction(callback)) {
					callback(element, targetViewElement, event);
				}
			}

		});
	};


	self.CSS3 = {};
	/**
	 * X5.CSS3.animation($('#core_run_way'),1,["{background: red;}","{background: yellow;}"],'ccsdfsdf55');
	 * [animation description]
	 * @param  {[type]} element   [description] 
	 * @param  {[type]} duration  [description] 完成动画需要的毫秒数
	 * @param  {[type]} keyframes [description] 动画针
	 * @param  {[type]} unid      [description] 唯一ID
	 * @return {[type]}           [description]
	 */
	self.CSS3.animation = function (element, duration, keyframes, unid, keyframesDeep) {
		duration = (duration / 1e3) + 's';
		var animationUnid = "animation_css_style_" + unid;
		var output = '.{1}{animation:{3};-moz-animation:{3};-webkit-animation:{3};-o-animation:{3};}@keyframes {1}{{2}}@-moz-keyframes {1}{{2}}@-webkit-keyframes {1}{{2}}@-o-keyframes{1}{{2}}';
		var frames = '';
		frames = self.CSS3.converFrames(keyframes, keyframesDeep);
		var cssContain = animationUnid + " " + duration + ' linear 0s 1 normal;animation-fill-mode:forwards';
		output = self.stringFormat(output, animationUnid, frames, cssContain)
		element.addClass(animationUnid);
		output = '<style  type="text/css" id="' + animationUnid + '">' + output + '</style>';
		$('body').append(output);
	};
	/**
	 * 生成动画针
	 * [converFrames description]
	 * @param  {[type]} keyframes [description]
	 * @return {[type]}           [description]
	 */
	self.CSS3.converFrames = function (keyframes, keyframesDeep) {
		var framesSize = keyframes.length;
		keyframesDeep = keyframesDeep || [];
		if (!keyframes && framesSize < 2) {
			return false;
		}
		var frames = [];
		for (var i = 0; i < framesSize; i++) {
			var framesItem = keyframes[i];
			frames.push(JSON.stringify(framesItem).split('"').join(""));
		}
		if (framesSize == 2) {
			return self.stringFormat('from{1}to{2}', frames[0], frames[1]);
		} else {
			var output = '';
			var deepStep = 10 / framesSize;
			for (var i = 0; i < framesSize; i++) {
				var currentDeep = deepStep * i;
				output += self.stringFormat("{1}%,{2}", currentDeep, frames[i]);
			}
			return output;
		}
	}

	/**
	 * 擴展系統原型
	 */
	if (typeof ([].map) == 'undefined') {
		Array.prototype.map = function (callback) {
			var _tmp = [];
			var size = this.length;
			var step = 10 / size;
			for (var i = 0; i < size; i++) {
				_tmp.push(callback(this[i]));
			}
			return _tmp;
		};
	};
	if (typeof ([].diff) == 'undefined') {
		Array.prototype.diff = function (a) {
			return this.filter(function (i) { return a.indexOf(i) < 0; });
		};
	};
	if (typeof ([].remove) == 'undefined') {
		Array.prototype.remove = function (item) {
			return this.join('').split(item).join('').split('');

		}
	}
	if (typeof ([].random) == 'undefined') {
		Array.prototype.random = function () {
			return this[Math.floor((Math.random() * this.length))];
		}
	};

	if (typeof (Math.X5Random) == 'undefined') {
		Math.X5Random = function (min, max) {

			return parseInt(Math.random() * (max - min) + (min), 10);
		}
	}

	if (typeof ([].each) == 'undefined') {
		Array.prototype.each = function (callback) {
			var outPut = '';
			if (this.length < 1 || !$.isFunction(callback)) {
				return false;
			}
			for (var i = 0; i < this.length; i++) {
				outPut += callback(this[i], i);
			}
			return outPut;
		}
	};
	/**
	 * 是否在数组中
	 */
	if (typeof ([].inArray) == 'undefined') {
		Array.prototype.inArray = function (content) {
			return ("," + this.join(',') + ",").indexOf("," + content + ",") > -1 ? true : false;
		};
	}

	/**
	 * 
	 * @param {Object} obj 
	 * @param {function} callback 
	 */
	self.forEach = function (obj, callback) {
		if (!$.isFunction(callback)) {
			return false;
		}
		var outPut = '';
		var loop = 0;
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				outPut += callback(obj[key], loop);
				loop++;
			}
		}
	};

	window.X5 = self;
	//self.memoryDebug();
})({}, typeof (jQuery) == 'undefined' ? {} : jQuery);