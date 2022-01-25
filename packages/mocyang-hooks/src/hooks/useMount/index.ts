/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/24 9:06
 * @File: index.js
 * @Description
 */
import { useEffect } from 'react'

const useMount = (fn: () => void) => {
  // TODO: log error msg on development

  useEffect(() => {
    fn?.()
  }, [])
}

export default useMount
