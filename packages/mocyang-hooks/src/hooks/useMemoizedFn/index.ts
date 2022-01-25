/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/24 9:27
 * @File: index.js
 * @Description
 */
import { useMemo, useRef } from 'react'

type noop = (...arg: any[]) => any

function useMemoizedFn<T extends noop>(fn: T) {
  const fnRef = useRef<T>(fn)

  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo(() => fn, [fn])

  const memoizedFn = useRef<T>()
  if (!memoizedFn.current) {
    memoizedFn.current = function (...args) {
      // @ts-ignore
      return fnRef.current.apply(this, args)
    } as T
  }

  return memoizedFn.current
}

export default useMemoizedFn
