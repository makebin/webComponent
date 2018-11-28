$(function () {


    function getAddEventListenerHandle() {
        if (this.addEventListener) {
            return (function (self) {
                return function (type, fn) {
                    self.addEventListener(type, fn, false);
                }
            })(this);
        } else {
            return (function (self) {
                return function (type, fn) {
                    self.attachEvent("on" + type, fn);
                }
            })(this);
        }
    }

    function getRemoveEventListenerHandle() {
        if (this.removeEventListener) {
            return (function (self) {
                return function (type, fn) {
                    self.removeEventListener(type, fn, false);
                }
            })(this);
        } else {
            return (function (self) {
                return function (type, fn) {
                    self.detachEvent("on" + type, fn);
                }
            })(this);
        }
    }


    var Media = function () {

    };
    // 
    // 微信不自动全屏播放代码  直接添加页面中
    // <video src="" controls="true" width="100%" preload="false" x-webkit-airplay="true" playsinline="" webkit-playsinline="" x5-playsinline="" id="media_1532315479" class="video-ele" style="display: none">您的浏览器不支持 VIDEO 标签。</video>
    //
    Media.create = function (settings) {
        settings = settings || {};
        var elementDefaultAttributes = {
            "content": window.document.body, //添加原始到哪里
            "autoplay": undefined, //如果出现该属性，则视频在就绪后马上播放。
            "controls": false, //如果出现该属性，则向用户显示控件，比如播放按钮。
            "height": 200, //设置视频播放器的高度。
            "loop": false, //如果出现该属性，则当媒介文件完成播放后再次开始播放。
            "preload": false, // 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。
            "src": '',//要播放的视频的 URL。
            "width": 200, //设置视频播放器的宽度
            "id": "",
            "className": "",
            "type": Media.VIDEO_ELEMENT,
            "poster": '',
            "isPlayerFullScreen": false, //是否进行全屏
            "mediaEle": undefined, //直接提过相应的播放器ele,公众号要首先在页面上写上对象，然后再使用本组件，才不会自动全屏
            "uuid": undefined, //自定义uuid
            "bindCallback": undefined //时间绑定后的毁掉
        };
        var elementDefaultEventConfig = {
            "abort": undefined,//当发生中止事件时运行脚本
            "canplay": undefined,//当媒介能够开始播放但可能因缓冲而需要停止时运行脚本
            "canplaythrough": undefined,//当媒介能够无需因缓冲而停止即可播放至结尾时运行脚本
            "durationchange": undefined,
            "emptied": undefined,//当媒介资源元素突然为空时（网络错误、加载错误等）运行脚本
            "ended": undefined,//当媒介已抵达结尾时运行脚本
            "error": undefined,//当在元素加载期间发生错误时运行脚本
            "loadeddata": undefined,//当加载媒介数据时运行脚本,
            "loadedmetadata": undefined,
            "loadstart": undefined,
            "pause": undefined,//当媒介数据暂停时运行脚本
            "play": undefined,//当媒介数据将要开始播放时运行脚本
            "playing": undefined,//当媒介数据已开始播放时运行脚本
            "progress": undefined,//当浏览器正在取媒介数据时运行脚本
            "ratechange": undefined,//当媒介数据的播放速率改变时运行脚本
            "readystatechange": undefined,//当就绪状态（ready-state）改变时运行脚本
            "seeked": undefined,//当媒介元素的定位属性 [1] 不再为真且定位已结束时运行脚本
            "seeking": undefined,//当媒介元素的定位属性为真且定位已开始时运行脚本
            "stalled": undefined,//当取回媒介数据过程中（延迟）存在错误时运行脚本
            "suspend": undefined,//当浏览器已在取媒介数据但在取回整个媒介文件之前停止时运行脚本
            "timeupdate": undefined,//当媒介改变其播放位置时运行脚本
            "volumechange": undefined,//当媒介改变音量亦或当音量被设置为静音时运行脚本
            "waiting": undefined,//当媒介已停止播放但打算继续播放时运行脚本
        };

        for (var i in elementDefaultAttributes) {
            if (elementDefaultAttributes.hasOwnProperty(i) && settings[i]) {
                elementDefaultAttributes[i] = settings[i];
            }
        }

        for (var i in elementDefaultEventConfig) {
            if (elementDefaultEventConfig.hasOwnProperty(i) && settings[i]) {
                elementDefaultEventConfig[i] = settings[i];
            }
        }

        return new mediaElement(elementDefaultAttributes, elementDefaultEventConfig);
    };

    Media.createVideo = function (settings) {
        settings = settings || {};
        settings.type = Media.VIDEO_ELEMENT;
        return Media.create(settings);
    }

    Media.createAudio = function (settings) {
        settings = settings || {};
        settings.type = Media.AUDIO_ELEMENT;
        return Media.create(settings);
    };


    Media.VIDEO_ELEMENT = 1;

    Media.AUDIO_ELEMENT = 2;

    Media.NETWORK_EMPTY = 0;
    Media.NETWORK_IDLE = 1;
    Media.NETWORK_LOADING = 2;
    Media.NETWORK_NO_SOURCE = 3;


    Media.HAVE_NOTHING = 0;
    Media.HAVE_METADATA = 1;
    Media.HAVE_CURRENT_DATA = 2;
    Media.HAVE_FUTURE_DATA = 3;
    Media.HAVE_ENOUGH_DATA = 4;
    var bindElementLogic = {

    };
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement
     */
    function mediaElement(attributes, events) {
        this.unid = attributes.uuid ? attributes.uuid : "media_" + ~~new Date();
        this.coreElement = undefined;
        this.mediaType = attributes.type;
        this.attributes = attributes;
        this.events = events;
        this.sourceElements = [];
        this.mediaEleType = 0;
        if (this.attributes.mediaEle) {
            this.mediaEleType = this.attributes.mediaEle.nodeName.toUpperCase != 'VIDEO' ? Media.VIDEO_ELEMENT : Media.AUDIO_ELEMENT;
        }
        this.isCreateNew = this.mediaEleType == this.mediaType;
        if (this.attributes.mediaEle && this.isCreateNew) {
            this.coreElement = this.attributes.mediaEle;
        } else {
            this.mediaType == Media.AUDIO_ELEMENT ? createAudioElement.call(this) : createVideoElement.call(this);
            if (this.attributes.content && this.coreElement) {
                this.attributes.content.appendChild(this.coreElement);
            }
        }
        if (this.attributes.content && this.coreElement) {
            this.bindElement();
        }
        if (this.attributes.src && this.attributes.mediaEle && this.isCreateNew) {
            this.changeSrc(this.attributes.src);
        }

        if (typeof (this.attributes.bindCallback) == 'function') {
            this.attributes.bindCallback.call(this);
        }
    }

    function createVideoElement() {
        this.coreElement = document.createElement('VIDEO');
        this.coreElement.setAttribute('src', this.attributes.src);
        if (this.attributes.controls) {
            this.coreElement.setAttribute('controls', this.attributes.controls);
        }
        this.coreElement.setAttribute('height', this.attributes.height || 0);
        this.coreElement.setAttribute('width', this.attributes.width || 0);
        if (this.attributes.loop) {
            this.coreElement.setAttribute('loop', this.attributes.loop);
        }
        if (this.attributes.autoplay != undefined) {
            this.coreElement.setAttribute('autoplay', this.attributes.autoplay || false);
        } else {
            this.coreElement.setAttribute('preload', this.attributes.preload || false);
        }
        if (!this.isPlayerFullScreen) {
            this.coreElement.setAttribute('x-webkit-airplay', true);
            this.coreElement.setAttribute('playsinline', '');
            this.coreElement.setAttribute('webkit-playsinline', '');
            this.coreElement.setAttribute('x5-playsinline', '');
        }
        this.coreElement.setAttribute('id', this.attributes.id || this.unid);
        this.coreElement.setAttribute('class', this.attributes.className || "video-ele");
        this.coreElement.innerHTML = '您的浏览器不支持 VIDEO 标签。';
        if (this.attributes.poster) {
            this.coreElement.setAttribute('poster', this.attributes.poster)
        }
    };

    function createAudioElement() {
        this.coreElement = document.createElement('AUDIO');
        this.coreElement.setAttribute('src', this.attributes.src);
        this.coreElement.setAttribute('height', this.attributes.height || 0);
        this.coreElement.setAttribute('width', this.attributes.width || 0);
        if (this.attributes.loop) {
            this.coreElement.setAttribute('loop', this.attributes.loop);
        }
        if (this.attributes.controls) {
            this.coreElement.setAttribute('controls', this.attributes.controls);
        }
        if (this.attributes.autoplay != undefined) {
            this.coreElement.setAttribute('autoplay', this.attributes.autoplay || false);
        } else {
            this.coreElement.setAttribute('preload', this.attributes.preload || false);
        }
        this.coreElement.setAttribute('id', this.attributes.id || this.unid);
        this.coreElement.setAttribute('class', this.attributes.className || "audio-ele");
        this.coreElement.innerHTML = '您的浏览器不支持 AUDIO 标签。';
    };


    mediaElement.prototype.stop = function () {
        this.coreElement.pause();
    };

    mediaElement.prototype.play = function (src) {

        this.coreElement.play();

    };

    mediaElement.prototype.rePlay = function () {
        this.coreElement.load(), this.coreElement.play();
    };

    /**
     * 当前播放时间，单位为秒。为其赋值将会使媒体跳到一个新的时间。
     * @param {*} second 
     */
    mediaElement.prototype.setCurrentTime = function (second) {
        this.coreElement.currentTime = second;
    };


    /**
     * 获取当前播放时间
     */
    mediaElement.prototype.getCurrentTime = function () {
        return this.coreElement.currentTime.toFixed(1);
    }

    /**
     * 获取当前播放进度
     */
    mediaElement.prototype.getCurrentProgress = function () {
        var duration = this.getDuration();
        if (duration > 0) {
            return this.getCurrentTime / duration;
        }
        return 0;
    }
    /**
     * 媒体以秒为单位的总长度时间，如果媒体不可用，则为0.  如果媒体可用，但时间长度未知, 值为NAN. 如果媒体是以stream形式传输并且没有预定长度，则值为Inf。
     */
    mediaElement.prototype.getDuration = function () {
        return this.coreElement.duration;
    }


    mediaElement.prototype.isPaused = function () {
        return this.coreElement.paused;
    }


    mediaElement.prototype.isPlayed = function () {
        return this.coreElement.played;
    };


    mediaElement.prototype.bind = function (event, fn) {
        var addEventListenerHandle = getAddEventListenerHandle.call(this.coreElement);
        addEventListenerHandle(event, fn);
    };

    mediaElement.prototype.removeBind = function (event, fn) {
        var removeEventListenerHandle = getRemoveEventListenerHandle.call(this.coreElement);
        removeEventListenerHandle(event, fn);
    };

    mediaElement.prototype.changeSrc = function (src) {
        this.coreElement.setAttribute('src', src);
        this.coreElement.load();
    };

    mediaElement.prototype.changeSrcAndPlay = function (src) {
        this.changeSrc(src);
        this.play();
    };

    mediaElement.prototype.bindElement = function () {
        if (bindElementLogic[this.unid]) {
            return false;
        }
        var addEventListenerHandle = getAddEventListenerHandle.call(this.coreElement);
        for (var i in this.events) {
            if (this.events.hasOwnProperty(i) && typeof (this.events[i]) == 'function') {
                addEventListenerHandle(i, this.events[i]);
            }
        }
        bindElementLogic[this.unid] = true;
    };


    mediaElement.prototype.getCore = function () {
        return this.coreElement;
    }



    window.X5Media = Media;


});