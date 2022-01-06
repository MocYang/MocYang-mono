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
 * @Date: 2022/1/6 9:56
 * @File: index.js
 * @Description
 */ const $1a9b0b1edd7ab783$var$EMPTY_OBJ = {
};
const $1a9b0b1edd7ab783$var$EMPTY_ARR = [];
const $1a9b0b1edd7ab783$var$NOOP = ()=>{
};
const $1a9b0b1edd7ab783$var$NO = ()=>false
;
const $1a9b0b1edd7ab783$var$extend = Object.assign;
const $1a9b0b1edd7ab783$var$hasOwnProperty = Object.prototype.hasOwnProperty;
const $1a9b0b1edd7ab783$var$hasOwn = (val, key)=>$1a9b0b1edd7ab783$var$hasOwnProperty.call(val, key)
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


class $d50172fc6ae3940a$var$ModelController {
    constructor(){
        this.models = {
            id: [],
            // 原始数据和id的映射,用来方便查找
            data: {
            }
        };
    }
    async load(fetchFn) {
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