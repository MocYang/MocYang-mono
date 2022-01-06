/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/6 15:22
 * @File: types.js
 * @Description
 */

export type Service<T, P extends any[]> = (...args: P) => Promise<T>

export interface Options<D, P extends any[]> {
  manual?: boolean;

  onBefore?: (params: P) => void;
  onSuccess?: (data: D, params: P) => void;
  onError?: (e: Error, params: P) => void;
  onFinally?: (params: P, data?: D, e?: Error) => void;

  defaultParams?: P;

}

export type Plugin<D, P extends any[]> = {

}
