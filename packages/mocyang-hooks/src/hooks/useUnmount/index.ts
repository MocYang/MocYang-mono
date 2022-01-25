/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/24 9:10
 * @File: index.js
 * @Description
 */
import { useEffect } from 'react'
import useLatest from '../useLatest'

const useUnmount = (fn: () => void) => {
  const fnRef = useLatest(fn)

  useEffect(() => {
    return () => {
      fnRef.current()
    }
  })
}

export default useUnmount
