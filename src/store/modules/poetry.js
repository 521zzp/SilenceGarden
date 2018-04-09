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
		try{
			const result = await fetch(GET_POETRY_CATALOG, getModel()).then(analy)
			result ? commit(types.GET_POETRY_CATALOG, result) : ''
		}catch(e){
			//TODO handle the exception
		}
	},
	getPoemByTitle ({ commit }, obj){
		commit(types.GET_POEM, {})
		fetch(restful(GET_POEM, obj), getModel()).then(analy)
				.then((datas)=>{
					datas ? commit(types.GET_POEM, datas) : ''
			}).catch(function(error) {
			  });
  	}
}

const mutations = {
	[types.GET_POEM] (state, obj) {
		state.poem = obj
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
