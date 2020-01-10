export default {
    urlParse(query) {
        if (typeof query !== 'string') {
            return {};
        }
        let abj = {},
            reg = /^([^&]*)=([^#&]*)(\/|#|&|$)/,
            matchs = [];
        while (matchs = query.match(reg)) {
            abj[matchs[1]] = decodeURIComponent(matchs[2]);
            query = query.substring(matchs[0].length);
        }
        return abj;
    },
    dateFormat(date,format){
        if(!date) return "";
        var date = new Date(date);

        var map = {
            "M": date.getMonth() + 1, //月份
            "d": date.getDate(), //日
            "h": date.getHours(), //小时
            "m": date.getMinutes(), //分
            "s": date.getSeconds(), //秒
            "q": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        format =format ||'yyyy-MM-dd';
        let  value = format.replace(/([yMdhmsqS])+/g, function(all, t) {
            var v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                    v = '0' + v;
                    v = v.substr(v.length - 2);
                }
                return v;
            } else if (t === 'y') {
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return value;
    }
}
export let extend = function(){//对象拷贝
    let length = arguments.length;
    let target = arguments[0] || {};
    if (typeof target!="object" && typeof target != "function") {
        target = {};
        return target;
    }
    if (length == 1) {
        target = this;
        return target;
    }
    for (var i = 1; i < length; i++) { 
        var source = arguments[i]; 
        for (var key in source) { 
            // 使用for in会遍历数组所有的可枚举属性，包括原型。
            if (Object.prototype.hasOwnProperty.call(source, key)) { 
                target[key] = source[key]; 
            } 
        } 
    }
    return target; 
}

