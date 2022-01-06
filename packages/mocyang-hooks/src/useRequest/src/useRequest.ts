/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/6 15:09
 * @File: useRequest.js
 * @Description
 */

import type { Service, Options, Plugin } from "./types";

function useRequest<T, P extends any[]> (
  service: Service<T, P>,
  options?: Options<T, P>,
  plugins?: Plugin<T, P>[]
) {

}



export default useRequest
