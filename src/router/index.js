import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import SayHi from '@/components/SayHi'

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
    }
  ]
})
