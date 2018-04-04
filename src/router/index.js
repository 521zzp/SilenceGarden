import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/page/Home' 
import Poetry from '@/components/page/Poetry' 

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/poetry',
      name: 'Poetry',
      component: Poetry
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
  ]
})
