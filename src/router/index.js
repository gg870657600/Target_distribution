import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import device from '@/components/device'
import server from '@/components/server'
import data from '@/components/data'
import data2 from '@/components/data2'
import data3 from '@/components/data3'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/device',
          name: 'device',
          component: device,          
        },
        {
          path: '/server',
          name: 'server',
          component: server
        },    
        {
          path: '/data',
          name: 'data',
          component: data
        },
        {
          path: '/data2',
          name: 'data2',
          component: data2
        },
        {
          path: '/data3',
          name: 'data3',
          component: data3
        }
      ],
      redirect:'/device'            //默认显示二级路由
    },
    
    
  ],
  //mode:'history',
})
