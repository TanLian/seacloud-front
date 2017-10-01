import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import SayHi from '@/components/SayHi'
import Login from '@/components/Login'
import BaseLeft from '@/components/BaseLeft'
import LocalFiles from '@/components/LocalFiles'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/say_hi',
      name: 'SayHi',
      component: SayHi
    },
    {
      path: '/accounts/login/',
      name: 'Login',
      component: Login
    },
    {
      path: '/base/left/',
      name: 'BaseLeft',
      component: BaseLeft
    },
    {
      path: '/apps/files',
      name: 'LocalFiles',
      component: LocalFiles
    }
  ]
})
