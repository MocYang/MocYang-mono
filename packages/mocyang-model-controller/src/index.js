/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2021/12/26 14:47
 * @File: index.js
 * @Description 模型控制器, 处理模型相关逻辑.(添加,删除,更新,查找)
 */

import {
  isFunction,
  isArray,
  extend,
  NOOP
} from 'mocyang-utils/src'
import { toTypeString } from 'mocyang-utils'

class ModelController {
  constructor() {
    this.models = {
      id: [],
      // 原始数据和id的映射,用来方便查找
      data: {}
    }
  }

  async load(fetchFn, options) {
    if (!isFunction(fetchFn)) {
      throw new Error('Expected a function to fetch data!')
    }
    const self = this
    return new Promise(async resolve => {
      const response = await fetchFn()
      self.cache(response.data)
      resolve()
    })
  }

  // 可以额外添加接口之外的数据
  add(source) {
    this.cache(source)

    return this
  }

  /**
   * 缓存接口返回的数据.
   * @param source[Array] 接口返回的数据,数据格式
   */
  cache(source) {
    if (!isArray(source)) {
      throw new Error('parameter error. not expected type.')
    }
    const target = this.models
    // 缓存时,合并已有的数据,并插入新数据
    target.id = Array.from(new Set([...target.id, ...source.map(item => item.id)]))
    target.data = source.reduce((t, c) => {
      t[c.id] = c
      return t
    }, target.data)

    return this
  }

  // 返回当前控制器中缓存的所有数据
  all() {
    return Object.values(this.models.data)
  }

  /**
   * 对所有模型数据进行过滤
   * @param type 传入的要过滤的函数
   * @returns {*}
   */
  filter(type) {
    const allModels = this.all()

    if (isFunction(type)) {
      return allModels.filter(type)
    }
  }

  /**
   * 过滤出室外的模型
   * @returns {*}
   */
  filterOutdoor() {
    const allModels = this.all()
    return allModels.filter(m => !m.indoor)
  }

  /**
   * 分层过滤模型
   * @param build{String} 建筑ID: V001JZ0001
   * @param floor{String} 楼层名: F001
   * @returns {Array<Object>}
   */
  filterIndoor(build, floor) {
    const allModels = this.all()
    // "V001_JZ0003#F003" 因为接口数据中的 floor_id 是完整的建筑Id+楼层名, 所以这里进行拼接
    const floorId = `${build}#${floor}`
    return allModels.filter(m => m.build_id === build && m.floor_id === floorId)
  }

  /**
   * 查找指定ID的数据
   * @param id
   * @ret urns {*}
   */
  one(id) {
    return this.models.data[id]
  }

  /**
   * 批量添加模型
   * @param mapV   {Object}
   * @param source {Array<Object>}
   * @param options {Object}
   */
  batchedAddModel(mapV, source, options) {
    options = extend({
      size: 100,

      onSuccess: NOOP,

      // onProgress(): {progress: number}
      onProgress: NOOP
    }, options)

    const {
      size,
      onSuccess,
      onProgress
    } = options

    if (!isArray(source)) {
      console.error('type source must be an array, got '+ (toTypeString(source)))
      return
    }

    const start = +new Date()
    const sourceSize = source.length
    const addModel = (startOffset, endOffset = 0) => {
      const sourceSlice = source.slice(startOffset, endOffset)
      if (startOffset > sourceSize - 1) {
        setTimeout(() => {
          const end = +new Date()
          console.log(`加载 ${sourceSize} 个模型,共耗时: ${(end - start) / 1000}s. `)

          onProgress && onProgress({
            progress: 100
          })

          onSuccess && onSuccess()

          // 把所有带有GID的对象的配置，缓存起来。方便后面进一步操作

        }, 0)
        return
      }

      if (mapV.OverLayerCreateObjects) {
        // 注意,此功能为异步操作
        mapV.OverLayerCreateObjects(sourceSlice, (res) => {
          if (startOffset < sourceSize) {
            onProgress && onProgress({
              progress: Math.floor(Math.pow(10, 4) * (startOffset / sourceSize) / 100)
            })
            setTimeout(() => {
              addModel(endOffset, endOffset + size)
            }, 10)
          }
        })
      }
    }

    addModel(0, size)
  }
}

class ModelControlManager {
  constructor() {
    this.controllers = new Map()
  }

  create(key) {
    if (!key) {
      throw new Error('controller key is required!')
    }
    const existController = this.get(key)
    if (existController) {
      return existController
    }
    const controller = new ModelController()
    this.controllers.set(key, controller)
    return this.get(key)
  }

  get(key) {
    return this.controllers.get(key)
  }
}

export default new ModelControlManager()


