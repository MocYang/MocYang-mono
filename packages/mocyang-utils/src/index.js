/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/6 9:56
 * @File: index.js
 * @Description
 */

const EMPTY_OBJ = (process.env.NODE_ENV !== 'production')
  ? Object.freeze({})
  : {}

const EMPTY_ARR = (process.env.NODE_ENV !== 'production')
  ? Object.freeze([])
  : []

export const NOOP = () => {
}

const NO = () => false

export const extend = Object.assign

export const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (val, key) => hasOwnProperty.call(val, key)

export const objectToString = Object.prototype.toString

export const toTypeString = (value) => objectToString.call(value)

export const isPlainObject = (val) => toTypeString(val) === '[object Object]'

export const isArray = Array.isArray

export const isMap = (val) => toTypeString(val) === '[object Map]'

export const isSet = (val) => toTypeString(val) === '[object Set]'

export const isFunction = (val) => typeof val === 'function'

export const isObject = (val) => val !== null && typeof val === 'object'

export const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export const isData = (val) => val instanceof Date

export const isString = (val) => typeof val === 'string'

export const isSymbol = (val) => typeof val === 'symbol'

// extract "RawType" from strings like "[object RawType]"
export const toRawType = (val) => toTypeString(val).slice(8, -1)

export const toNumber = (val) => {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

export const trim = (str) => str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '')

/**
 * 立即执行回调，然后等待指定时间之后，执行后面的代码
 * @param time
 * @param cb
 * @returns {Promise<unknown>}
 */
export function wait(time, cb) {
  return new Promise((resolve => {
    cb && cb()
    setTimeout(() => {
      resolve()
    }, time)
  }))
}

/**
 * 等待异步回调函数执行后才继续往下执行
 * @param thisArg
 * @param fn
 * @param args
 * @returns {Promise<any>}
 */
export function until(thisArg, fn, ...args) {
  return new Promise(resolve => {
    if (isFunction(fn)) {
      fn.apply(thisArg, [...args, (...arg) => {
        resolve(...arg)
      }])
    }
  })
}

