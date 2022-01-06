function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "NOOP", () => $1a9b0b1edd7ab783$export$5702a91a6f42969f);
$parcel$export(module.exports, "extend", () => $1a9b0b1edd7ab783$export$8b58be045bf06082);
$parcel$export(module.exports, "hasOwnProperty", () => $1a9b0b1edd7ab783$export$5a15a386532a5ea4);
$parcel$export(module.exports, "hasOwn", () => $1a9b0b1edd7ab783$export$b5a638e9b3fff9f3);
$parcel$export(module.exports, "objectToString", () => $1a9b0b1edd7ab783$export$830c053460e5ddf6);
$parcel$export(module.exports, "toTypeString", () => $1a9b0b1edd7ab783$export$1dccc787cc36538b);
$parcel$export(module.exports, "isPlainObject", () => $1a9b0b1edd7ab783$export$53b83ca8eaab0383);
$parcel$export(module.exports, "isArray", () => $1a9b0b1edd7ab783$export$43bee75e5e14138e);
$parcel$export(module.exports, "isMap", () => $1a9b0b1edd7ab783$export$5c90113a285f2241);
$parcel$export(module.exports, "isSet", () => $1a9b0b1edd7ab783$export$6750766a7c7ec627);
$parcel$export(module.exports, "isFunction", () => $1a9b0b1edd7ab783$export$f6e2535fb5126e54);
$parcel$export(module.exports, "isObject", () => $1a9b0b1edd7ab783$export$a6cdc56e425d0d0a);
$parcel$export(module.exports, "isPromise", () => $1a9b0b1edd7ab783$export$4369c812aac99591);
$parcel$export(module.exports, "isData", () => $1a9b0b1edd7ab783$export$5c152495ed2c5c39);
$parcel$export(module.exports, "isString", () => $1a9b0b1edd7ab783$export$844ec244b1367d54);
$parcel$export(module.exports, "isSymbol", () => $1a9b0b1edd7ab783$export$a244864fd9645c7f);
$parcel$export(module.exports, "toRawType", () => $1a9b0b1edd7ab783$export$5ad0a3c360b8fbb5);
$parcel$export(module.exports, "toNumber", () => $1a9b0b1edd7ab783$export$a0a81dc3380ce7d3);
$parcel$export(module.exports, "trim", () => $1a9b0b1edd7ab783$export$87c2784dc9fc4ab);
$parcel$export(module.exports, "wait", () => $1a9b0b1edd7ab783$export$5c069c93d2b7493f);
$parcel$export(module.exports, "until", () => $1a9b0b1edd7ab783$export$a40009bd2c363351);
$parcel$export(module.exports, "getCookie", () => $1a9b0b1edd7ab783$export$4be65e66cfa2648a);
$parcel$export(module.exports, "setCookie", () => $1a9b0b1edd7ab783$export$110700823644f4a6);
$parcel$export(module.exports, "debounce", () => $02b95b52b57d9ffe$export$2e2bcd8739ae039);
$parcel$export(module.exports, "throttle", () => $b9bf14436fda87a2$export$2e2bcd8739ae039);
$parcel$export(module.exports, "querystring", () => $85b93061845526c9$export$2e2bcd8739ae039);
$parcel$export(module.exports, "random", () => $c02d1ab0731a3a9c$export$2e2bcd8739ae039);
/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/6 13:49
 * @File: debounce.js
 * @Description 防抖函数
 */ /**
 * 防抖函数
 * @param func 实际调用的回调
 * @param wait 2次回调执行的最短时间间隔
 * @param immediate 是否立即执行回调
 * @returns {function(): *}
 */ function $02b95b52b57d9ffe$var$debounce(func, wait, immediate) {
    let timer, result;
    let debounced = function() {
        let context = this;
        let args = arguments;
        // 在第一次事件触发的时候就执行，此后触发的事件都不再执行
        if (immediate) {
            if (timer) clearTimeout(timer);
            else result = func.apply(context, args);
            timer = setTimeout(function() {
                timer = null;
            }, wait);
        // 只在最后一次事件触发的间隔之后执行
        } else {
            clearTimeout(timer);
            timer = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        }
        return result;
    };
    debounced.cancel = function() {
        clearInterval(timer);
        timer = null;
    };
    return debounced;
}
var $02b95b52b57d9ffe$export$2e2bcd8739ae039 = $02b95b52b57d9ffe$var$debounce;


/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/6 13:50
 * @File: throttle.js
 * @Description 节流函数
 */ function $b9bf14436fda87a2$var$throttle(func, wait, options) {
    let timeout;
    let context;
    let args;
    let result;
    let previous = 0;
    options = options || {
        leading: false,
        trailing: true // 是否禁用最后一次回调
    };
    let later = function() {
        previous = !options.leading ? 0 : +new Date();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };
    let throttled = function() {
        let now = +new Date();
        if (!previous && !options.leading) previous = now;
        context = this;
        args = arguments;
        let remaining = wait - (now - previous);
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing) timeout = setTimeout(later, remaining);
    };
    throttled.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
        previous = 0;
    };
    return throttled;
}
var $b9bf14436fda87a2$export$2e2bcd8739ae039 = $b9bf14436fda87a2$var$throttle;



class $85b93061845526c9$var$Querystring {
    parse(url = '') {
        url = !url ? window.location.href : url;
        if (url.indexOf('?') === -1) return {
        };
        let search = url[0] === '?' ? url.substr(1) : url.substring(url.lastIndexOf('?') + 1);
        if (!search) return {
        };
        search = search.split('&');
        return Array.from(search).reduce((ret, cur)=>{
            const objKeyAndValuePair = cur.split('=');
            let value = decodeURIComponent(objKeyAndValuePair[1]);
            /*
       name=1,2,3 => name: [1, 2, 3]
       */ if (value.indexOf(',') !== -1) value = value.split(',');
            ret[objKeyAndValuePair[0]] = value;
            return ret;
        }, {
        });
    }
    stringify(url1 = '', params = {
    }) {
        if ($1a9b0b1edd7ab783$export$53b83ca8eaab0383(params)) return `${url1}?${Object.keys(params).reduce((ret, key)=>{
            let value = params[key];
            /*
         name=[1, 2, 3] => name=1,2,3
         */ if ($1a9b0b1edd7ab783$export$43bee75e5e14138e(params[key])) value = value.reduce((acc, cur)=>{
                acc.push(cur);
                return acc;
            }, []).join(',');
            ret.push(`${key}=${encodeURIComponent(value)}`);
            return ret;
        }, []).join('&')}`;
    }
}
var $85b93061845526c9$export$2e2bcd8739ae039 = new $85b93061845526c9$var$Querystring();


/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/6 13:55
 * @File: random.js
 * @Description
 */ class $c02d1ab0731a3a9c$var$Random {
    randomColor() {
        return `#${(Math.random() * 268435456 << 0).toString(16).slice(-6)}`;
    }
    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    pick(valueArr) {
        return valueArr[this.randomNumber(0, valueArr.length - 1)];
    }
}
var $c02d1ab0731a3a9c$export$2e2bcd8739ae039 = new $c02d1ab0731a3a9c$var$Random();


const $1a9b0b1edd7ab783$var$EMPTY_OBJ = {
};
const $1a9b0b1edd7ab783$var$EMPTY_ARR = [];
const $1a9b0b1edd7ab783$export$5702a91a6f42969f = ()=>{
};
const $1a9b0b1edd7ab783$var$NO = ()=>false
;
const $1a9b0b1edd7ab783$export$8b58be045bf06082 = Object.assign;
const $1a9b0b1edd7ab783$export$5a15a386532a5ea4 = Object.prototype.hasOwnProperty;
const $1a9b0b1edd7ab783$export$b5a638e9b3fff9f3 = (val, key)=>$1a9b0b1edd7ab783$export$5a15a386532a5ea4.call(val, key)
;
const $1a9b0b1edd7ab783$export$830c053460e5ddf6 = Object.prototype.toString;
const $1a9b0b1edd7ab783$export$1dccc787cc36538b = (value)=>$1a9b0b1edd7ab783$export$830c053460e5ddf6.call(value)
;
const $1a9b0b1edd7ab783$export$53b83ca8eaab0383 = (val)=>$1a9b0b1edd7ab783$export$1dccc787cc36538b(val) === '[object Object]'
;
const $1a9b0b1edd7ab783$export$43bee75e5e14138e = Array.isArray;
const $1a9b0b1edd7ab783$export$5c90113a285f2241 = (val)=>$1a9b0b1edd7ab783$export$1dccc787cc36538b(val) === '[object Map]'
;
const $1a9b0b1edd7ab783$export$6750766a7c7ec627 = (val)=>$1a9b0b1edd7ab783$export$1dccc787cc36538b(val) === '[object Set]'
;
const $1a9b0b1edd7ab783$export$f6e2535fb5126e54 = (val)=>typeof val === 'function'
;
const $1a9b0b1edd7ab783$export$a6cdc56e425d0d0a = (val)=>val !== null && typeof val === 'object'
;
const $1a9b0b1edd7ab783$export$4369c812aac99591 = (val)=>{
    return $1a9b0b1edd7ab783$export$a6cdc56e425d0d0a(val) && $1a9b0b1edd7ab783$export$f6e2535fb5126e54(val.then) && $1a9b0b1edd7ab783$export$f6e2535fb5126e54(val.catch);
};
const $1a9b0b1edd7ab783$export$5c152495ed2c5c39 = (val)=>val instanceof Date
;
const $1a9b0b1edd7ab783$export$844ec244b1367d54 = (val)=>typeof val === 'string'
;
const $1a9b0b1edd7ab783$export$a244864fd9645c7f = (val)=>typeof val === 'symbol'
;
const $1a9b0b1edd7ab783$export$5ad0a3c360b8fbb5 = (val)=>$1a9b0b1edd7ab783$export$1dccc787cc36538b(val).slice(8, -1)
;
const $1a9b0b1edd7ab783$export$a0a81dc3380ce7d3 = (val)=>{
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
};
const $1a9b0b1edd7ab783$export$87c2784dc9fc4ab = (str)=>str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '')
;
function $1a9b0b1edd7ab783$export$5c069c93d2b7493f(time, cb) {
    return new Promise((resolve)=>{
        cb && cb();
        setTimeout(()=>{
            resolve();
        }, time);
    });
}
function $1a9b0b1edd7ab783$export$a40009bd2c363351(thisArg, fn, ...args) {
    return new Promise((resolve)=>{
        if ($1a9b0b1edd7ab783$export$f6e2535fb5126e54(fn)) fn.apply(thisArg, [
            ...args,
            (...arg)=>{
                resolve(...arg);
            }
        ]);
    });
}
function $1a9b0b1edd7ab783$export$4be65e66cfa2648a(key) {
    let arr = document.cookie.replace(/\s/g, '').split(';');
    for(let i = 0; i < arr.length; i++){
        let keyAndValuePair = arr[i].split('=');
        if (keyAndValuePair[0] === key) return decodeURIComponent(keyAndValuePair[1]);
    }
    return '';
}
function $1a9b0b1edd7ab783$export$110700823644f4a6(key, value, timestamps = 0) {
    let now = new Date();
    now.setDate(now.getDate() + timestamps);
    document.cookie += `${key}=${value}`;
}


//# sourceMappingURL=index.js.map
