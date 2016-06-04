(function ($) {
    $.fn.extend({

        griddle: function (option) {

            var _selectParam = function(key,value){

                var father = $(setting.extFather+key);
                if(father.length !== 1)
                {
                    console.log('condition "'+key+'" father length neq 1');
                    return false;
                }
                var value = !value?'':setting.extHref+value;

                var options = father.find('.'+setting.option);

                options.removeClass(setting.selectedClassName);

                var optionsSelected = father.find('.'+setting.option+'['+setting.optionTag+'="'+value+'"]');

                if(options.length < 1)
                {
                    console.log('condition "'+key+'" options length must  be greater than 1');
                    return false;
                }
                if(optionsSelected.length > 1)
                {
                    console.log('condition "'+key+'" optionsSelected length Must be smaller than 1');
                    return false;
                }

                optionsSelected.addClass(setting.selectedClassName);

                if(typeof setting.hookSelected === 'function')
                {
                    setting.hookSelected(optionsSelected);
                }

            }

            var _getRequest = function() {
                var url = location.search; //获取url中"?"符后的字串
                var theRequest = new Object();
                if (url.indexOf("?") != -1) {
                    var str = url.substr(1);
                    strs = str.split("&");
                    for(var i = 0; i < strs.length; i ++) {
                        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
                    }
                }
                return theRequest;
            }

            var _getSearchUrl = function(){

                var url;
                if(setting.searchUrl.length > 0)
                {
                    url = setting.searchUrl;
                }
                else
                {
                    url = location.href;
                    if(url.indexOf('?') != -1)
                    {
                        var url = url.substr(0,url.indexOf('?'));
                    }

                }
                return url;
            }


            var _getSearchFullUrl = function(){
                var _urlRequest = '';

                for(var key  in urlRequest)
                {
                    _urlRequest = _urlRequest+key+"="+urlRequest[key]+'&'
                }

                if(_urlRequest.length > 0)
                {

                    _urlRequest = "?" + _urlRequest;
                    _urlRequest = _urlRequest.substring(0,_urlRequest.length-1);
                }
                return _getSearchUrl()+_urlRequest+urlHash;
            }

            var _setRequest = function(key,value){
                urlRequest[key] = value;
            }

            var _convertOption = function(value){
                return value.replace('#','');
            }

            var setting = {
                'extFather':'.param-',
                'extHref':'#',
                'option':'param',
                'father':'param-list',
                'selectedClassName':'action',
                'optionTag':'href',
                'hookSelected':'',
                'canFast':false,
                'searchUrl':''
            };

            setting = $.extend(setting,option);

            var container = this;
            var tmsData = container.attr('tms-data');
            var urlHash = location.hash;
            var urlRequest =_getRequest();

            if (!tmsData) {
                console.log('tms-data attributes empty');
            }
            tmsData = $.parseJSON(tmsData);

            for (var key in tmsData){
                if (tmsData.hasOwnProperty(key) === true) {
                    _selectParam(key,tmsData[key])
                }
            }

            container.find('a.'+setting.option).on('click', function(){
                var tmsData = $.parseJSON($(this).parent("."+setting.father).attr('tms-data'));
                var value = $(this).attr(setting.optionTag);
                value = _convertOption(value);
                _setRequest(tmsData.param,value);
                if(setting.canFast)
                {
                    window.location.href = _getSearchFullUrl();
                }
                else
                {
                    _selectParam(tmsData.param,value);
                }
                return false;

            });





        }

        });
})(jQuery);