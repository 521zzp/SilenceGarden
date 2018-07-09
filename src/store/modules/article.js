import * as types from '../mutation-types'
import { GET_ARTICLE_DETAILS, GET_ARTICLE_CATALOG, ARTICLE_SAVE } from '@/config/url'
import { postModel, getModel, restful, analy } from '@/utils/net'


const state = {
  catalog: [],
  article: {}
}

const actions = {
  async articleSave ({ commit }, obj) {
    const result = await fetch(ARTICLE_SAVE, postModel(obj)).then(analy)
    result && console.log(result)
  },
  async getArticleCatalog ({ commit }, obj) {
    const result = await fetch(GET_ARTICLE_CATALOG, getModel()).then(analy)
    console.log('result', result)
    result && commit(types.GET_ARTICLE_CATALOG, result)
  },
  async getArticleDetails ({ commit }, obj) {
    const result = await fetch(restful(GET_ARTICLE_DETAILS, obj), getModel()).then(analy)
    result && commit(types.GET_ARTICLE_DETAILS, result)
  }
}

const mutations = {
  [types.GET_ARTICLE_CATALOG] (state, obj) {
    state.catalog = obj
  },
  [types.GET_ARTICLE_DETAILS] (state, obj) {
    state.article = obj
  },
}


export default{
  state,
  actions,
  mutations
}
