/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/24 9:12
 * @File: index.js
 * @Description
 */
import { useRef } from 'react'

function useLatest<T>(value: T) {
  const ref = useRef(value)
  ref.current = value

  return ref
}

export default useLatest
