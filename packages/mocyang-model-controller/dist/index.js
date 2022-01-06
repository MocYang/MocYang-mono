function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $d50172fc6ae3940a$export$2e2bcd8739ae039);
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


class $d50172fc6ae3940a$var$ModelController {
    constructor(){
        this.models = {
            id: [],
            // 原始数据和id的映射,用来方便查找
            data: {
            }
        };
    }
    async load(fetchFn, options) {
        options = $1a9b0b1edd7ab783$export$8b58be045bf06082({
            // 是否手动发出请求
            manual: false,
            onSuccess: $1a9b0b1edd7ab783$export$5702a91a6f42969f,
            onProgress: $1a9b0b1edd7ab783$export$5702a91a6f42969f
        }, options);
        if (!$1a9b0b1edd7ab783$export$f6e2535fb5126e54(fetchFn)) throw new Error('Expected a function to fetch data!');
        const self = this;
        return new Promise(async (resolve)=>{
            const response = await fetchFn();
            self.cache(response.data);
            resolve();
        });
    }
    // 可以额外添加接口之外的数据
    add(source) {
        this.cache(source);
        return this;
    }
    /**
   * 缓存接口返回的数据.
   * @param source[Array] 接口返回的数据,数据格式
   */ cache(source1) {
        if (!$1a9b0b1edd7ab783$export$43bee75e5e14138e(source1)) throw new Error('parameter error. not expected type.');
        const target = this.models;
        // 缓存时,合并已有的数据,并插入新数据
        target.id = Array.from(new Set([
            ...target.id,
            ...source1.map((item)=>item.id
            )
        ]));
        target.data = source1.reduce((t, c)=>{
            t[c.id] = c;
            return t;
        }, target.data);
        return this;
    }
    // 返回当前控制器中缓存的所有数据
    all() {
        return Object.values(this.models.data);
    }
    /**
   * 对所有模型数据进行过滤
   * @param type 传入的要过滤的函数
   * @returns {*}
   */ filter(type) {
        const allModels = this.all();
        if ($1a9b0b1edd7ab783$export$f6e2535fb5126e54(type)) return allModels.filter(type);
    }
    /**
   * 过滤出室外的模型
   * @returns {*}
   */ filterOutdoor() {
        const allModels = this.all();
        return allModels.filter((m)=>!m.indoor
        );
    }
    /**
   * 分层过滤模型
   * @param build{String} 建筑ID: V001JZ0001
   * @param floor{String} 楼层名: F001
   * @returns {Array<Object>}
   */ filterIndoor(build, floor) {
        const allModels = this.all();
        // "V001_JZ0003#F003" 因为接口数据中的 floor_id 是完整的建筑Id+楼层名, 所以这里进行拼接
        const floorId = `${build}#${floor}`;
        return allModels.filter((m)=>m.build_id === build && m.floor_id === floorId
        );
    }
    /**
   * 查找指定ID的数据
   * @param id
   * @ret urns {*}
   */ one(id) {
        return this.models.data[id];
    }
    /**
   * 批量添加模型
   * @param mapV   {Object}
   * @param source {Array<Object>}
   * @param size   {Number} 每次最多添加200个。不能再多。多了数据传输会失败。
   * @param cb     {Function}
   */ batchedAddModel(mapV, source2, size = 100, cb) {
        if (!$1a9b0b1edd7ab783$export$43bee75e5e14138e(source2) || size > 200) return;
        const start = +new Date();
        const sourceSize = source2.length;
        const addModel = (startOffset, endOffset = 0)=>{
            const sourceSlice = source2.slice(startOffset, endOffset);
            if (startOffset > sourceSize - 1) {
                setTimeout(()=>{
                    const end = +new Date();
                    console.log(`加载 ${sourceSize} 个模型,共耗时: ${(end - start) / 1000}s. `);
                    cb && cb();
                }, 0);
                return;
            }
            // 注意,此功能为异步操作
            mapV.OverLayerCreateObjects(sourceSlice, (res)=>{
                if (startOffset < sourceSize) setTimeout(()=>{
                    addModel(endOffset, endOffset + size);
                }, 10);
            });
        };
        addModel(0, size);
    }
}
class $d50172fc6ae3940a$var$ModelControlManager {
    constructor(){
        this.controllers = new Map();
    }
    create(key) {
        if (!key) throw new Error('controller key is required!');
        const existController = this.get(key);
        if (existController) return existController;
        const controller = new $d50172fc6ae3940a$var$ModelController();
        this.controllers.set(key, controller);
        return this.get(key);
    }
    get(key1) {
        return this.controllers.get(key1);
    }
}
var $d50172fc6ae3940a$export$2e2bcd8739ae039 = new $d50172fc6ae3940a$var$ModelControlManager();


//# sourceMappingURL=index.js.map
