import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index'
export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '首页'
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home'),
        name: 'Home',
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    path: '/chat',
    component: Layout,
    redirect: '/chat/chatRoom',
    meta: {
      title: '聊天室'
    },
    children: [
      {
        path: 'chatRoom',
        component: () => import('@/views/wechat'),
        name: 'chatRoom',
        meta: {}
      }
    ]
  }
];
// process.env.BASE_URL
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;