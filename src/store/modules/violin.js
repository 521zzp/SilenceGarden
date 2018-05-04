import * as types from '../mutation-types'
import { GET_MELODY, GET_MELODY_CATALOG, GET_MELODY_RANDOM } from '@/config/url'
import { getModel, restful, analy } from '@/utils/net'
import router from '@/router'

const state = {
	catalog: [],
	melody: {
		name: '',
		src: '',
		disk_img: '',
		bg_img: ''
	},
	last: '',	//上一曲
	next: '',	//下一曲
}

const actions = {
	async getVillinCatalog ({ commit }, obj) {
		const list = await fetch(GET_MELODY_CATALOG, getModel()).then(analy)
		list && commit(types.GET_MELODY_CATALOG, list)
	},
	getViolinInfo ({ commit }, obj){
		commit(types.GET_MELODY, {})
		fetch(restful(GET_MELODY, obj), getModel()).then(analy)
				.then((datas)=>{
					console.log('datas')
					console.log(datas)
					datas && commit(types.GET_MELODY, datas)
			}).catch(function(error) {
			  });
  	},
  	async getRamdonViolinInfo ({ commit }, obj) {
  		const result = await fetch(restful(GET_MELODY_RANDOM, obj), getModel()).then(analy)
  		result && router.push(result._id)
  	}
}

const mutations = {
	[types.GET_MELODY] (state, { melody, last, next }) {
		state.melody = melody ? melody : {}
		state.last = last
		state.next = next
    },
    [types.GET_MELODY_CATALOG] (state, list) {
   		state.catalog = list
    },
    /*[types.GET_MELODY_RANDOM] (state, result) {
   		state.melody = result
    }*/
}


export default{
	state,
	actions,
	mutations
}
