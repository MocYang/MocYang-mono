/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/6 15:09
 * @File: useRequest.js
 * @Description
 */
import useRequestImplement from './useRequestImplement'
import type {Service, Options, Plugin} from "./types";

function useRequest<D, P extends any[]>(
  service: Service<D, P>,
  options?: Options<D, P>,
  plugins?: Plugin<D, P>[]
) {
  return useRequestImplement<D, P>(service, options, [
    ...(plugins || [])] as Plugin<D, P>[])
}

export default useRequest
