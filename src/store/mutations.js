import * as types from './mutation-types'
//import store from '@/store'

export const mutations = {
  [types.GLOBAL_LOADING] (state, { loading }) {
    state.loading = loading
  }
}
