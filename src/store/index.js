import Vue from 'vue'
import Vuex from 'vuex'
//import 'babel-polyfill'
import {actions} from './actions'
import {mutations} from './mutations'
import poetry from './modules/poetry'


Vue.use(Vuex)


const store = new Vuex.Store({
	state: {
		notice: {
			state: 1,
			type: 0,
			config: null
		},
		noticeClose: {
			state: 1,
			key: ''
		},
		message: {
			state: 1,
			type: 0,
			config: null
		},
		simpleModal: {
			state: 1,
			type: 0,
			config: null
		},
		confirmMoadl: {
			state: 1,
			config: null
		},
		progress: false,
	},
	mutations,
	actions,
	modules: {
		poetry,
	}
})

export default store
