// 短信倒计时获取功能
$.fn.extend({
        timerButton: function (option) {
            var setting = {
                'timeshow': 'timerButtonSpan',
                'do': function (callback) {
                    return true
                },
                'ajaxUrl':'',
                'params':'',
                'cycle': '60',
                'normalTxt': '重新获取',
                'activateTxt': '正在获取'
            };
            setting = $.extend(setting, option);
            var _$obj = $(this);
            var _index = setting.cycle;
            var _timer = '';
            var _flag = false;
            var _activateTxt = setting.activateTxt + '(<span class="' + setting.timeshow + '">' + setting.cycle + '</span>)'

            var _btnEvent = function () {
                if (typeof setting.do == 'function') {
                	$.post(setting.ajaxUrl,setting.params,function(){
                		setting.do();
                		_$obj.html(_activateTxt);
                        _track();	
                	});
                  
                }
                _flag = true;
            }


            var _track = function () {
                _index--;
                if (!(_index < 1)) {
                    _$obj.find('.' + setting.timeshow).html(_index);
                    _timer = setTimeout(function () {
                        _track();
                    }, 1000);

                }
                else {
                    _flag = false;
                    _index = setting.cycle;
                    _$obj.html(setting.normalTxt);
                }

            }

            _$obj.bind("click", function () {
                if (_flag == false) {
                    _btnEvent();
                }
            });


        }
    });
    // $('#timerButton').timerButton({
    //     do: function () {
    //         alert('ajax.php');
    //     }
    // });