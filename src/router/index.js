import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Master from '@/components/Master'
import Home from '@/views/home/Home'
import KeywordDetail from '@/views/article/KeywordDetail'

import My from '@/views/my/My'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Master',
      component: Master,
      redirect:'/Home',//从定向到首页
      children:[
        {
          path:'/Home',
          name:'Home',
          component: Home
        },,{
          path:'/My',
          name:'My',
          component: My
        },{
          path: '/article/detail/:id',
          name: 'KeywordDetail',
          component: KeywordDetail
        },
      ]
    },
  ]
})
