import * as types from '../mutation-types'
import { GET_MELODY } from '@/config/url'
import { getModel, restful, analy } from '@/utils/net'


const state = {
	catalog: [],
	melody: {
		name: '',
		src: '',
		img: '',
		bg_img: ''
	},
	last: '1',	//上一曲
	next: '2',	//下一曲
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
