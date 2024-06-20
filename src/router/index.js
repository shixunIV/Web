import { createRouter, createWebHashHistory } from 'vue-router'
import One from "../components/one.vue"
import Two from "../components/two.vue"
import Three from '../components/three.vue'
import Login from "../components/login.vue"
import Main from "../components/main.vue"

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },

  {
    path: '/main',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/one',
        component: One,
      },
      {
        path: '/two',
        component: Two,
      },
      {
        path: '/three',
        component: Three,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to,from,next) => {
  // 验证token, 只有存在token时, 才能跳转路由
  let token = localStorage.getItem('token');
  if(token || to.path === '/'){
    next();
  }
  else{
    // 没有token跳转到登录页
    next('/');
  }
})

export default router
