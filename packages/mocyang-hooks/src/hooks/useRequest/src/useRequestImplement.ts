/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/24 8:09
 * @File: useRequestImplement.js
 * @Description
 */
import {
  useLatest,
  useMount,
  useUpdate,
  useCreation,
  useUnmount,
  useMemoizedFn
} from '../../index'
import Fetch from './Fetch'
import type {Options, Plugin, Result, Service} from './types'

function useRequestImplement<D, P extends any[]>(
  service: Service<D, P>,
  options: Options<D, P> = {},
  plugins: Plugin<D, P>[] = []
) {
  const {manual = false, ...rest} = options
  const fetchOptions = {
    manual,
    ...rest
  }

  const serviceRef = useLatest(service)
  const update = useUpdate()

  const fetchInstance = useCreation(() => {
    const initState = plugins.map(p => p?.onInit?.(fetchOptions)).filter(Boolean)

    return new Fetch<D, P>(
      serviceRef,
      fetchOptions,
      update,
      Object.assign({}, ...initState)
    )
  }, [])

  fetchInstance.options = fetchOptions

  // ?
  fetchInstance.pluginImpls = plugins.map(p => p(fetchInstance, fetchOptions))

  useMount(() => {
    if (!manual) {
      const params = fetchInstance.state.params || options.defaultParams || []
      // @ts-ignore
      fetchInstance.run(...params)
    }
  })

  useUnmount(() => {
    fetchInstance.cancel()
  })

  return {
    loading: fetchInstance.state.loading,
    data: fetchInstance.state.data,
    error: fetchInstance.state.error,
    params: fetchInstance.state.params || [],
    cancel: useMemoizedFn(fetchInstance.cancel.bind(fetchInstance)),
    refresh: useMemoizedFn(fetchInstance.refresh.bind(fetchInstance)),
    refreshAsync: useMemoizedFn(fetchInstance.refreshAsync.bind(fetchInstance)),
    run: useMemoizedFn(fetchInstance.run),
    runAsync: useMemoizedFn(fetchInstance.runAsync),
    mutate: useMemoizedFn(fetchInstance.mutate.bind(fetchInstance))
  } as Result<D, P>
}

export default useRequestImplement
