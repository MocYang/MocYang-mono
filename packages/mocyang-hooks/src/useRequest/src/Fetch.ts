import type { MutableRefObject } from "react"
import { FetchState, Service, Options, Subscribe, PluginReturn } from "./types";

export default class Fetch<D, P extends any[]> {
  pluginImpls: any;

  count: number = 0;

  state: FetchState<D, P> = {
    loading: false,
    params: undefined,
    data: undefined,
    error: undefined
  }

  constructor(
    public serviceRef: MutableRefObject<Service<D, P>>,
    public options: Options<D, P>,
    public subscribe: Subscribe,
    public initState: Partial<Fetch<D, P>> = {}
  ) {
    this.state = {
      ...this.state, // ? 这一行做了啥
      loading: !options.manual,
      ...initState
    }
  }

  setState(s: Partial<FetchState<D, P>> = {}) {
    this.state = {
      ...this.state,
      ...s
    }

    this.subscribe()
  }

  runPluginHandler(event: keyof PluginReturn<D, P>, ...rest: any[]) {
    // @ts-ignore
    const r = this.pluginImpls.map((i) => i[event]?.(...rest)).filter(Boolean)
    return Object.assign({}, ...r)
  }

  async runAsync(...params: P): Promise<D> {
    this.count += 1
    const currentCount = this.count

    const {
      stopNow = false,
      returnNow = false,
      ...state
    } = this.runPluginHandler('onBefore', params)

    if (stopNow) {
      return new Promise(() => {})
    }

    this.setState({
      loading: true,
      params,
      ...state
    })

    if(returnNow) {
      return Promise.resolve(state.data)
    }

    this.options.onBefore?.(params)

    try {
      let { servicePromise } = this.runPluginHandler('onRequest', this.serviceRef.current, params)

      if (!servicePromise) {
        servicePromise = this.serviceRef.current(...params)
      }

      const res = await servicePromise

      if (currentCount !== this.count) {
        return new Promise(() => {})
      }

      this.setState({
        data: res,
        error: undefined,
        loading: false
      })

      this.options?.onSuccess?.(res, params)
      this.runPluginHandler('onSuccess', res, params)

      this.options?.onFinally?.(params, res, undefined)


      if (currentCount === this.count) {
        this.runPluginHandler('onFinally', params, res, undefined)
      }

      return res
    } catch (e) {
      // ToFix: error type unknow
      const error = new Error('error')
      if (currentCount !== this.count) {
        // prevent run.then when request is canceled.
        return new Promise(() => {})
      }

      this.setState({
        error,
        loading: false
      })

      this.options.onError?.(error, params)
      this.runPluginHandler('onError', error, params)
      this.options.onFinally?.(params, undefined, error)

      if (currentCount === this.count) {
        this.runPluginHandler('onFinally', params, undefined, error)
      }

      throw error
    }
  }

  run(...params: P) {
    this.runAsync(...params).catch((error) => {
      if(!this.options.onError) {
        console.error(error)
      }
    })
  }

  cancel() {
    this.count += 1
    this.setState({
      loading: false
    })

    this.runPluginHandler('onCancel')
  }

  refresh() {
    //  @ts-ignore
    this.run(...(this.state.params || []))
  }

  refreshAsync() {
    // @ts-ignore
    return this.run(...(this.state.params || []))
  }

  mutate(data?: D | ((oldData?: D) => D | undefined)) {
    let targetData: D | undefined
    if (typeof data === 'function') {
      // @ts-ignore
      targetData =  data(this.state.data)
    } else {
      targetData = data
    }

    this.runPluginHandler('onMutate', targetData)

    this.setState({
      data: targetData
    })
  }
}


