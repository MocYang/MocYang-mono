/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/24 9:24
 * @File: index.js
 * @Description
 */
import { useCallback, useState } from 'react'

const useUpdate = () => {
  const [, setState] = useState({})
  return useCallback(() => setState({}), [])
}

export default useUpdate
