/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/6 15:22
 * @File: types.js
 * @Description
 */
import type { CachedData } from "./utils/cache";

export type Service<T, P extends any[]> = (...args: P) => Promise<T>

export type subscribe = () => void

export interface FetchState<T, P extends any[]> {
  loading: boolean
  params?: P
  data?: T
  error?: Error
}

export interface PluginReturn<D, P extends any[]> {
  onBefore?: (params: P) =>
    | ({
    stopNow?: boolean;
    returnNow?: boolean;
  } & Partial<FetchState<D, P>>)
    | void

  onRequest?: (
    service: Service<D, P>,
    params: P
  ) => {
    servicePromise?: Promise<D>
  }

  onSuccess?: (data: D, params: P) => void
  onError?: (e: Error, params: P) => void
  onFinally?: (params: P, data?: D, e?: Error) => void
  onCancel?: () => void
  onMutate?: (data: D) => void
}

export interface Options<D, P extends any[]> {
  manual?: boolean;

  onBefore?: (params: P) => void;
  onSuccess?: (data: D, params: P) => void;
  onError?: (e: Error, params: P) => void;
  onFinally?: (params: P, data?: D, e?: Error) => void;

  defaultParams?: P;

  // refreshDeps
  refreshDeps?: number;
  refreshDepsAction?: () => void;

  // polling
  pollingInterval?: number;
  pollingWhenHidden?: boolean; // whether poll, when document visibility hidden.

  // refresh on window focus
  refreshOnWindowFocus?: boolean;
  focusTimespan?: number;

  // debounce
  debounceWait?: number;
  debounceLeading?: boolean;
  debounceTrailing?: boolean;

  // throttle
  throttleWait?: number;
  throttleLeading?: boolean;
  throttleTrailing?: boolean;

  // cache
  cacheKey?: string;
  cacheTime?: number; // maybe expire better?
  staleTime?: number // ?
  setCache?: (data: CachedData<D, P>) => void;
  getCache?: (params: P) => CachedData<D, P> | undefined;

  // retry
  retryCount?: number;
  retryInterval?: number;

  ready?: boolean; // ?
}

export type Plugin<D, P extends any[]> = {}

export interface Result<D, P extends any[]> {
  loading: boolean;
  data?: D;
  error?: Error;
  params: P | [];
  cancel: Fetch<D, P>['cancel'];
}

