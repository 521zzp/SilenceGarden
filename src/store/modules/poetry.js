import * as types from '../mutation-types'
import { GET_POEM, GET_POETRY_CATALOG } from '@/config/url'
import { getModel, restful, analy } from '@/utils/net'


const state = {
	catalog: [],
	poem: {
		title: '',
		content: [],
		section: false
	}
}

const actions = {
	async getPoetryCatalog ({ commit }, obj) {
    commit(types.GLOBAL_LOADING, { loading: true })
		try{
			const result = await fetch(GET_POETRY_CATALOG, getModel()).then(analy)
			result ? commit(types.GET_POETRY_CATALOG, result) : ''
      commit(types.GLOBAL_LOADING, { loading: false })
		}catch(e){
      commit(types.GLOBAL_LOADING, { loading: false })
		}
	},
	getPoemByTitle ({ commit }, obj){
		commit(types.GET_POEM, { poem: {}})
    commit(types.GLOBAL_LOADING, { loading: true })
		fetch(restful(GET_POEM, obj), getModel()).then(analy)
				.then((datas)=>{
					datas ? commit(types.GET_POEM, { poem: datas }) : ''
          commit(types.GLOBAL_LOADING, { loading: false })
			}).catch(function(error) {
        commit(types.GLOBAL_LOADING, { loading: false })
			  });
  	}
}

const mutations = {
	[types.GET_POEM] (state, { poem }) {
		state.poem = poem
   },
   [types.GET_POETRY_CATALOG] (state, obj) {
   	state.catalog = obj
   }
}


export default{
	state,
	actions,
	mutations
}
