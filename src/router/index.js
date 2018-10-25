import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/pages/MainPage'
import Tetris from '@/components/tetris/Tetris'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/tetris',
      component: Tetris
    }
  ]
})
