import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/page/Home' 
import Poetry from '@/components/page/Poetry' 
import Poem from '@/components/page/Poem' 

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
      path: '/poem/:title',
      name: 'Poem',
      component: Poem
    },
  ]
})
