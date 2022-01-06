/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/6 13:55
 * @File: random.js
 * @Description
 */
class Random {
  randomColor() {
    return `#${(Math.random() * 0x10000000 << 0).toString(16).slice(-6)}`
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  pick(valueArr) {
    return valueArr[this.randomNumber(0, valueArr.length - 1)]
  }
}

export default new Random()
