import { useRef, useMemo, useEffect, useState, useCallback } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class Fetch {
    constructor(serviceRef, options, subscribe, initState = {}) {
        this.serviceRef = serviceRef;
        this.options = options;
        this.subscribe = subscribe;
        this.initState = initState;
        this.count = 0;
        this.state = {
            loading: false,
            params: undefined,
            data: undefined,
            error: undefined
        };
        this.state = Object.assign(Object.assign(Object.assign({}, this.state), { loading: !options.manual }), initState);
    }
    setState(s = {}) {
        this.state = Object.assign(Object.assign({}, this.state), s);
        this.subscribe();
    }
    runPluginHandler(event, ...rest) {
        // @ts-ignore
        const r = this.pluginImpls.map((i) => { var _a; return (_a = i[event]) === null || _a === void 0 ? void 0 : _a.call(i, ...rest); }).filter(Boolean);
        return Object.assign({}, ...r);
    }
    runAsync(...params) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __awaiter(this, void 0, void 0, function* () {
            this.count += 1;
            const currentCount = this.count;
            const _l = this.runPluginHandler('onBefore', params), { stopNow = false, returnNow = false } = _l, state = __rest(_l, ["stopNow", "returnNow"]);
            if (stopNow) {
                return new Promise(() => { });
            }
            this.setState(Object.assign({ loading: true, params }, state));
            if (returnNow) {
                return Promise.resolve(state.data);
            }
            (_b = (_a = this.options).onBefore) === null || _b === void 0 ? void 0 : _b.call(_a, params);
            try {
                let { servicePromise } = this.runPluginHandler('onRequest', this.serviceRef.current, params);
                if (!servicePromise) {
                    servicePromise = this.serviceRef.current(...params);
                }
                const res = yield servicePromise;
                if (currentCount !== this.count) {
                    return new Promise(() => { });
                }
                this.setState({
                    data: res,
                    error: undefined,
                    loading: false
                });
                (_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.onSuccess) === null || _d === void 0 ? void 0 : _d.call(_c, res, params);
                this.runPluginHandler('onSuccess', res, params);
                (_f = (_e = this.options) === null || _e === void 0 ? void 0 : _e.onFinally) === null || _f === void 0 ? void 0 : _f.call(_e, params, res, undefined);
                if (currentCount === this.count) {
                    this.runPluginHandler('onFinally', params, res, undefined);
                }
                return res;
            }
            catch (e) {
                // ToFix: error type unknow
                const error = new Error('error');
                if (currentCount !== this.count) {
                    // prevent run.then when request is canceled.
                    return new Promise(() => { });
                }
                this.setState({
                    error,
                    loading: false
                });
                (_h = (_g = this.options).onError) === null || _h === void 0 ? void 0 : _h.call(_g, error, params);
                this.runPluginHandler('onError', error, params);
                (_k = (_j = this.options).onFinally) === null || _k === void 0 ? void 0 : _k.call(_j, params, undefined, error);
                if (currentCount === this.count) {
                    this.runPluginHandler('onFinally', params, undefined, error);
                }
                throw error;
            }
        });
    }
    run(...params) {
        this.runAsync(...params).catch((error) => {
            if (!this.options.onError) {
                console.error(error);
            }
        });
    }
    cancel() {
        this.count += 1;
        this.setState({
            loading: false
        });
        this.runPluginHandler('onCancel');
    }
    refresh() {
        //  @ts-ignore
        this.run(...(this.state.params || []));
    }
    refreshAsync() {
        // @ts-ignore
        return this.run(...(this.state.params || []));
    }
    mutate(data) {
        let targetData;
        if (typeof data === 'function') {
            // @ts-ignore
            targetData = data(this.state.data);
        }
        else {
            targetData = data;
        }
        this.runPluginHandler('onMutate', targetData);
        this.setState({
            data: targetData
        });
    }
}

function useRequestImplement(service, options = {}, plugins = []) {
    const { manual = false } = options, rest = __rest(options, ["manual"]);
    const fetchOptions = Object.assign({ manual }, rest);
    const serviceRef = useLatest(service);
    const update = useUpdate();
    const fetchInstance = useCreation(() => {
        const initState = plugins.map(p => { var _a; return (_a = p === null || p === void 0 ? void 0 : p.onInit) === null || _a === void 0 ? void 0 : _a.call(p, fetchOptions); }).filter(Boolean);
        return new Fetch(serviceRef, fetchOptions, update, Object.assign({}, ...initState));
    }, []);
    fetchInstance.options = fetchOptions;
    // ?
    fetchInstance.pluginImpls = plugins.map(p => p(fetchInstance, fetchOptions));
    useMount(() => {
        if (!manual) {
            const params = fetchInstance.state.params || options.defaultParams || [];
            // @ts-ignore
            fetchInstance.run(...params);
        }
    });
    useUnmount(() => {
        fetchInstance.cancel();
    });
    return {
        loading: fetchInstance.state.loading,
        data: fetchInstance.state.data,
        error: fetchInstance.state.error,
        params: fetchInstance.state.params || [],
        cancel: useMemoizedFn(fetchInstance.cancel.bind(fetchInstance)),
        refresh: useMemoizedFn(fetchInstance.refresh.bind(fetchInstance)),
        refreshAsync: useMemoizedFn(fetchInstance.refreshAsync.bind(fetchInstance)),
        run: useMemoizedFn(fetchInstance.run.bind(fetchInstance)),
        runAsync: useMemoizedFn(fetchInstance.runAsync.bind(fetchInstance)),
        mutate: useMemoizedFn(fetchInstance.mutate.bind(fetchInstance))
    };
}

/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/6 15:09
 * @File: useRequest.js
 * @Description
 */
function useRequest(service, options, plugins) {
    return useRequestImplement(service, options, [
        ...(plugins || [])
    ]);
}

/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/24 9:12
 * @File: index.js
 * @Description
 */
function useLatest(value) {
    const ref = useRef(value);
    ref.current = value;
    return ref;
}

/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/24 9:27
 * @File: index.js
 * @Description
 */
function useMemoizedFn(fn) {
    const fnRef = useRef(fn);
    // why not write `fnRef.current = fn`?
    // https://github.com/alibaba/hooks/issues/728
    fnRef.current = useMemo(() => fn, [fn]);
    const memoizedFn = useRef();
    if (!memoizedFn.current) {
        memoizedFn.current = function (...args) {
            // @ts-ignore
            return fnRef.current.apply(this, args);
        };
    }
    return memoizedFn.current;
}

/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/24 9:06
 * @File: index.js
 * @Description
 */
const useMount = (fn) => {
    // TODO: log error msg on development
    useEffect(() => {
        fn === null || fn === void 0 ? void 0 : fn();
    }, []);
};

/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/24 9:10
 * @File: index.js
 * @Description
 */
const useUnmount = (fn) => {
    const fnRef = useLatest(fn);
    useEffect(() => {
        return () => {
            fnRef.current();
        };
    });
};

/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/24 9:24
 * @File: index.js
 * @Description
 */
const useUpdate = () => {
    const [, setState] = useState({});
    return useCallback(() => setState({}), []);
};

function depsAreSame(oldDeps, deps) {
    if (oldDeps === deps)
        return true;
    for (let i = 0; i < oldDeps.length; i++) {
        if (!Object.is(oldDeps[i], deps[i]))
            return false;
    }
    return true;
}

function useCreation(factory, deps) {
    const { current } = useRef({
        deps,
        obj: undefined,
        initialized: false
    });
    if (current.initialized === false || !depsAreSame(current.deps, deps)) {
        current.deps = deps;
        current.obj = factory();
        current.initialized = true;
    }
    return current.obj;
}

export { useCreation, useLatest, useMemoizedFn, useMount, useRequest, useUnmount, useUpdate };
