import * as types from '../mutation-types'
import { GET_MELODY } from '@/config/url'
import { getModel, restful, analy } from '@/utils/net'


const state = {
	catalog: [],
	melody: {
		src: '',
		img: '',
	}
}

const actions = {
	getViolinInfo ({ commit }, obj){
		commit(types.GET_MELODY, {})
		fetch(restful(GET_MELODY, obj), getModel()).then(analy)
				.then((datas)=>{
					datas ? commit(types.GET_MELODY, datas) : ''
			}).catch(function(error) {
			  });
  	}
}

const mutations = {
	[types.GET_MELODY] (state, obj) {
		state.melody = obj
   },
}


export default{
	state,
	actions,
	mutations
}
