/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/6 13:49
 * @File: debounce.js
 * @Description 防抖函数
 */

/**
 * 防抖函数
 * @param func 实际调用的回调
 * @param wait 2次回调执行的最短时间间隔
 * @param immediate 是否立即执行回调
 * @returns {function(): *}
 */
function debounce (func, wait, immediate) {
  let timer, result
  let debounced = function () {
    let context = this
    let args = arguments

    // 在第一次事件触发的时候就执行，此后触发的事件都不再执行
    if (immediate) {
      if (timer) {
        clearTimeout(timer)
      } else {
        result = func.apply(context, args)
      }
      timer = setTimeout(function () {
        timer = null
      }, wait)

      // 只在最后一次事件触发的间隔之后执行
    } else {
      clearTimeout(timer)
      timer = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }

    return result
  }

  debounced.cancel = function () {
    clearInterval(timer)
    timer = null
  }

  return debounced
}

export default debounce
