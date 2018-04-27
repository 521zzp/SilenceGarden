import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/page/Home' 
import Poetry from '@/components/page/Poetry' 
import Poem from '@/components/page/Poem'
import ViolinCatalog from '@/components/page/ViolinCatalog'
import Violin from '@/components/page/Violin'


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
    {
      path: '/violin',
      name: 'ViolinCatalog',
      component: ViolinCatalog
    },
    {
      path: '/violin/:id',
      name: 'Violin',
      component: Violin
    },
  ]
})
