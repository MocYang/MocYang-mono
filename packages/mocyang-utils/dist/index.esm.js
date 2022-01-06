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
 */ function $f38201ec84a556cf$var$debounce(func, wait, immediate) {
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
var $f38201ec84a556cf$export$2e2bcd8739ae039 = $f38201ec84a556cf$var$debounce;


/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/6 13:50
 * @File: throttle.js
 * @Description 节流函数
 */ function $d49b83110be46e9a$var$throttle(func, wait, options) {
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
var $d49b83110be46e9a$export$2e2bcd8739ae039 = $d49b83110be46e9a$var$throttle;



class $75e72aacbc5f68af$var$Querystring {
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
        if ($d60c885ae703e4d7$export$53b83ca8eaab0383(params)) return `${url1}?${Object.keys(params).reduce((ret, key)=>{
            let value = params[key];
            /*
         name=[1, 2, 3] => name=1,2,3
         */ if ($d60c885ae703e4d7$export$43bee75e5e14138e(params[key])) value = value.reduce((acc, cur)=>{
                acc.push(cur);
                return acc;
            }, []).join(',');
            ret.push(`${key}=${encodeURIComponent(value)}`);
            return ret;
        }, []).join('&')}`;
    }
}
var $75e72aacbc5f68af$export$2e2bcd8739ae039 = new $75e72aacbc5f68af$var$Querystring();


/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/6 13:55
 * @File: random.js
 * @Description
 */ class $1466cb8596827c4f$var$Random {
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
var $1466cb8596827c4f$export$2e2bcd8739ae039 = new $1466cb8596827c4f$var$Random();


const $d60c885ae703e4d7$var$EMPTY_OBJ = {
};
const $d60c885ae703e4d7$var$EMPTY_ARR = [];
const $d60c885ae703e4d7$export$5702a91a6f42969f = ()=>{
};
const $d60c885ae703e4d7$var$NO = ()=>false
;
const $d60c885ae703e4d7$export$8b58be045bf06082 = Object.assign;
const $d60c885ae703e4d7$export$5a15a386532a5ea4 = Object.prototype.hasOwnProperty;
const $d60c885ae703e4d7$export$b5a638e9b3fff9f3 = (val, key)=>$d60c885ae703e4d7$export$5a15a386532a5ea4.call(val, key)
;
const $d60c885ae703e4d7$export$830c053460e5ddf6 = Object.prototype.toString;
const $d60c885ae703e4d7$export$1dccc787cc36538b = (value)=>$d60c885ae703e4d7$export$830c053460e5ddf6.call(value)
;
const $d60c885ae703e4d7$export$53b83ca8eaab0383 = (val)=>$d60c885ae703e4d7$export$1dccc787cc36538b(val) === '[object Object]'
;
const $d60c885ae703e4d7$export$43bee75e5e14138e = Array.isArray;
const $d60c885ae703e4d7$export$5c90113a285f2241 = (val)=>$d60c885ae703e4d7$export$1dccc787cc36538b(val) === '[object Map]'
;
const $d60c885ae703e4d7$export$6750766a7c7ec627 = (val)=>$d60c885ae703e4d7$export$1dccc787cc36538b(val) === '[object Set]'
;
const $d60c885ae703e4d7$export$f6e2535fb5126e54 = (val)=>typeof val === 'function'
;
const $d60c885ae703e4d7$export$a6cdc56e425d0d0a = (val)=>val !== null && typeof val === 'object'
;
const $d60c885ae703e4d7$export$4369c812aac99591 = (val)=>{
    return $d60c885ae703e4d7$export$a6cdc56e425d0d0a(val) && $d60c885ae703e4d7$export$f6e2535fb5126e54(val.then) && $d60c885ae703e4d7$export$f6e2535fb5126e54(val.catch);
};
const $d60c885ae703e4d7$export$5c152495ed2c5c39 = (val)=>val instanceof Date
;
const $d60c885ae703e4d7$export$844ec244b1367d54 = (val)=>typeof val === 'string'
;
const $d60c885ae703e4d7$export$a244864fd9645c7f = (val)=>typeof val === 'symbol'
;
const $d60c885ae703e4d7$export$5ad0a3c360b8fbb5 = (val)=>$d60c885ae703e4d7$export$1dccc787cc36538b(val).slice(8, -1)
;
const $d60c885ae703e4d7$export$a0a81dc3380ce7d3 = (val)=>{
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
};
const $d60c885ae703e4d7$export$87c2784dc9fc4ab = (str)=>str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '')
;
function $d60c885ae703e4d7$export$5c069c93d2b7493f(time, cb) {
    return new Promise((resolve)=>{
        cb && cb();
        setTimeout(()=>{
            resolve();
        }, time);
    });
}
function $d60c885ae703e4d7$export$a40009bd2c363351(thisArg, fn, ...args) {
    return new Promise((resolve)=>{
        if ($d60c885ae703e4d7$export$f6e2535fb5126e54(fn)) fn.apply(thisArg, [
            ...args,
            (...arg)=>{
                resolve(...arg);
            }
        ]);
    });
}
function $d60c885ae703e4d7$export$4be65e66cfa2648a(key) {
    let arr = document.cookie.replace(/\s/g, '').split(';');
    for(let i = 0; i < arr.length; i++){
        let keyAndValuePair = arr[i].split('=');
        if (keyAndValuePair[0] === key) return decodeURIComponent(keyAndValuePair[1]);
    }
    return '';
}
function $d60c885ae703e4d7$export$110700823644f4a6(key, value, timestamps = 0) {
    let now = new Date();
    now.setDate(now.getDate() + timestamps);
    document.cookie += `${key}=${value}`;
}


export {$d60c885ae703e4d7$export$5702a91a6f42969f as NOOP, $d60c885ae703e4d7$export$8b58be045bf06082 as extend, $d60c885ae703e4d7$export$5a15a386532a5ea4 as hasOwnProperty, $d60c885ae703e4d7$export$b5a638e9b3fff9f3 as hasOwn, $d60c885ae703e4d7$export$830c053460e5ddf6 as objectToString, $d60c885ae703e4d7$export$1dccc787cc36538b as toTypeString, $d60c885ae703e4d7$export$53b83ca8eaab0383 as isPlainObject, $d60c885ae703e4d7$export$43bee75e5e14138e as isArray, $d60c885ae703e4d7$export$5c90113a285f2241 as isMap, $d60c885ae703e4d7$export$6750766a7c7ec627 as isSet, $d60c885ae703e4d7$export$f6e2535fb5126e54 as isFunction, $d60c885ae703e4d7$export$a6cdc56e425d0d0a as isObject, $d60c885ae703e4d7$export$4369c812aac99591 as isPromise, $d60c885ae703e4d7$export$5c152495ed2c5c39 as isData, $d60c885ae703e4d7$export$844ec244b1367d54 as isString, $d60c885ae703e4d7$export$a244864fd9645c7f as isSymbol, $d60c885ae703e4d7$export$5ad0a3c360b8fbb5 as toRawType, $d60c885ae703e4d7$export$a0a81dc3380ce7d3 as toNumber, $d60c885ae703e4d7$export$87c2784dc9fc4ab as trim, $d60c885ae703e4d7$export$5c069c93d2b7493f as wait, $d60c885ae703e4d7$export$a40009bd2c363351 as until, $d60c885ae703e4d7$export$4be65e66cfa2648a as getCookie, $d60c885ae703e4d7$export$110700823644f4a6 as setCookie, $f38201ec84a556cf$export$2e2bcd8739ae039 as debounce, $d49b83110be46e9a$export$2e2bcd8739ae039 as throttle, $75e72aacbc5f68af$export$2e2bcd8739ae039 as querystring, $1466cb8596827c4f$export$2e2bcd8739ae039 as random};
//# sourceMappingURL=index.esm.js.map
