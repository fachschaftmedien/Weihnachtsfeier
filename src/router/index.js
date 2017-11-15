import Router from 'vue-router'
import Front from '@/components/Front'
import Program from '@/components/Program'
import Music from '@/components/Music'
import Menu from '@/components/Menu'


export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Front
    },
    {
      path: '/Front',
      name: 'Front',
      component: Front
    },
    {
      path: '/Program',
      name: 'Program',
      component: Program
    },
    {
      path: '/Music',
      name: 'Music',
      component: Music,
    },
    {
      path: '/Prices',
      name: 'Prices',
      component: Menu,
    }
  ]
});
