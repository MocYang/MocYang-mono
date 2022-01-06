/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/6 14:04
 * @File: querystring.js
 * @Description
 */
import { isPlainObject, isArray } from './index'

class Querystring {
  parse(url = '') {
    url = !url ? window.location.href : url

    if (url.indexOf('?') === -1) {
      return {}
    }

    let search = url[0] === '?' ? url.substr(1) : url.substring(url.lastIndexOf('?') + 1)
    if (!search) {
      return {}
    }

    search = search.split('&')
    return Array.from(search).reduce((ret, cur) => {
      const objKeyAndValuePair = cur.split('=')
      let value = decodeURIComponent(objKeyAndValuePair[1])
      /*
       name=1,2,3 => name: [1, 2, 3]
       */
      if (value.indexOf(',') !== -1) {
        value = value.split(',')
      }
      ret[objKeyAndValuePair[0]] = value
      return ret
    }, {})
  }

  stringify(url = '', params = {}) {
    if (isPlainObject(params)) {
      return `${url}?${Object.keys(params).reduce((ret, key) => {
        let value = params[key]
        /*
         name=[1, 2, 3] => name=1,2,3
         */
        if (isArray(params[key])) {
          value = value.reduce((acc, cur) => {
            acc.push(cur)
            return acc
          }, []).join(',')
        }
        ret.push(`${key}=${encodeURIComponent(value)}`)
        return ret
      }, []).join('&')}`
    }
  }
}

export default new Querystring()
