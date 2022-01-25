/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/24 8:09
 * @File: useRequestImplement.js
 * @Description
 */
import Fetch from './Fetch'
import type { Options, Plugin, Result, Service } from './types'


function useRequestImplement<D, P extends any[]> (
  service: Service<D, P>,
  options: Options<D, P> = {},
  plugins: Plugin<D, P>[] = []
){

}

export default useRequestImplement
