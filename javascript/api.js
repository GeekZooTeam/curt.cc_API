// example:
// curt.cc('http://www.kukufun.com', function(url) {
//     alert(url);
// });

var curt = {

    version : '0.2',

    getScript : function(method, url, callback) {
        var curt_cc_callback = 'curt_cc_' + new Date().getTime(),
            api = document.createElement('script');

        api.type = 'text/javascript';
        api.src = 'http://curt.cc/service/'+method+'.php?url='
                  + encodeURIComponent(url)
                  + '&callback=' + curt_cc_callback;
        document.getElementsByTagName('head')[0].appendChild(api);
        window[curt_cc_callback] = function(json) {
            callback(json.url);
            window[curt_cc_callback] = undefined;
            try {
                delete window[curt_cc_callback];
            } catch(e) {}
            document.getElementsByTagName('head')[0].removeChild(api);
        };
        return true;
    },

    cc : function(url, callback) {
        return curt.getScript('generator', url, callback);
    },
    
    preView : function(url, callback) {
        return curt.getScript('preview', url, callback);
    }
};