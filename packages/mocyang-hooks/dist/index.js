import { useRef, useMemo, useEffect, useState, useCallback } from 'react';

/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/6 15:09
 * @File: useRequest.js
 * @Description
 */
function useRequest(service, options, plugins) {
}

/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/24 9:12
 * @File: index.js
 * @Description
 */
function useLatest(value) {
    var ref = useRef(value);
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
    var fnRef = useRef(fn);
    // why not write `fnRef.current = fn`?
    // https://github.com/alibaba/hooks/issues/728
    fnRef.current = useMemo(function () { return fn; }, [fn]);
    var memoizedFn = useRef();
    if (!memoizedFn.current) {
        memoizedFn.current = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
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
var useMount = function (fn) {
    // TODO: log error msg on development
    useEffect(function () {
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
var useUnmount = function (fn) {
    var fnRef = useLatest(fn);
    useEffect(function () {
        return function () {
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
var useUpdate = function () {
    var _a = useState({}), setState = _a[1];
    return useCallback(function () { return setState({}); }, []);
};

export { useLatest, useMemoizedFn, useMount, useRequest, useUnmount, useUpdate };
