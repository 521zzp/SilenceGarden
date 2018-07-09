import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/page/Home'
import Poetry from '@/components/page/Poetry'
import Poem from '@/components/page/Poem'
import ViolinCatalog from '@/components/page/ViolinCatalog'
import Violin from '@/components/page/Violin'
import Article from '@/components/page/Article'
import ArticleCatalog from '@/components/page/ArticleCatalog'
import Editor from '@/components/page/Editor'
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
    {
      path: '/article',
      name: 'ArticleCatalog',
      component: ArticleCatalog
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article
    },
		{
			path: '/write',
			name: 'Editor',
			component: Editor
		},
  ]
})
