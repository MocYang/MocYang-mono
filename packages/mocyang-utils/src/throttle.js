/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/6 13:50
 * @File: throttle.js
 * @Description 节流函数
 */

function throttle(func, wait, options) {
  let timeout
  let context
  let args
  let result

  let previous = 0

  options = options || {
    leading: false, // 是否禁用第一次执行
    trailing: true // 是否禁用最后一次回调
  }

  let later = function () {
    previous = !options.leading ? 0 : +new Date()
    timeout = null
    func.apply(context, args)
    if (!timeout) {
      context = args = null
    }
  }

  let throttled = function () {
    let now = +new Date()

    if (!previous && !options.leading) {
      previous = now
    }

    context = this
    args = arguments
    let remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing) {
      timeout = setTimeout(later, remaining)
    }
  }

  throttled.cancel = function () {
    clearTimeout(timeout)
    timeout = null
    previous = 0
  }

  return throttled
}

export default throttle
