import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import SayHi from '@/components/SayHi'
import Login from '@/components/Login'
import BaseLeft from '@/components/BaseLeft'
import LocalFiles from '@/components/LocalFiles'
import Home from '@/components/Home'
import Trash from '@/components/Trash'
import Favorites from '@/components/Favorites'
import PdfViewer from '@/components/viewer/PdfViewer'
import VideoViewer from '@/components/viewer/VideoViewer'
import TextViewer from '@/components/viewer/TextViewer'
import Profile from '@/components/Profile'
import Users from '@/components/Users'
import Groups from '@/components/Groups'

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
      path: '/view/pdf/',
      name: 'PdfViewer',
      component: PdfViewer,
      hidden: true
    },
    {
      path: '/view/video/',
      name: 'VideoViewer',
      component: VideoViewer,
      hidden: true
    },
    {
      path: '/view/text/',
      name: 'TextViewer',
      component: TextViewer,
      hidden: true
    },
    {
      path: '/profile/',
      name: 'Profile',
      component: Profile,
      hidden: true
    },
    {
      path: '/',
      component: Home,
      name: 'Home',
      iconCls: 'fa fa-home fa-fw',
      leaf: true, // 只有一个节点
      children: [
          { path: '/apps/files', component: LocalFiles, name: 'MyFile', showname: '我的文件' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: 'Home',
      iconCls: 'fa fa-star-o fa-fw',
      leaf: true, // 只有一个节点
      children: [
            { path: '/apps/files/favorites', component: Favorites, name: 'MyFavorate', showname: '我的收藏' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: 'Home',
      showname: '通讯录',
      iconCls: 'fa fa-users fa-fw',
      children: [
            { path: '/apps/users', component: Users, name: 'AllUsers', showname: '所有用户' },
            { path: '/apps/groups', component: Groups, name: 'AllGroups', showname: '所有群组' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: 'Home',
      iconCls: 'fa fa-trash-o fa-fw',
      leaf: true, // 只有一个节点
      children: [
            { path: '/apps/files/trash', component: Trash, name: 'Trash', showname: '回收站' }
      ]
    }
  ]
})
