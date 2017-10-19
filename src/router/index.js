import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import SayHi from '@/components/SayHi'
import Login from '@/components/Login'
import BaseLeft from '@/components/BaseLeft'
import LocalFiles from '@/components/LocalFiles'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
      hidden: true
    },
    {
      path: '/say_hi',
      name: 'SayHi',
      component: SayHi,
      hidden: true
    },
    {
      path: '/accounts/login/',
      name: 'Login',
      component: Login,
      hidden: true
    },
    {
      path: '/base/left/',
      name: 'BaseLeft',
      component: BaseLeft,
      hidden: true
    },
    {
      path: '/',
      component: Home,
      name: '',
      iconCls: 'fa fa-home fa-fw',
      leaf: true, // 只有一个节点
      children: [
          { path: '/apps/files', component: LocalFiles, name: '我的文件' }
      ]}
  ]
})
