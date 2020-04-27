import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import Users from './components/user/Users.vue'
import Rights from './components/power/Rights.vue'
import Roles from './components/power/Roles.vue'
Vue.use(VueRouter)

const routes = [
    {
      path:'/login',
      component:Login
    },
    {
      path:'/',
      redirect:'login'
    },
    {
      path:'/home',
      component:Home,
      redirect:'/welcome',
      children:[{path:'/welcome',component:Welcome},{path:'/users',component:Users},{path:'/rights',component:Rights},{path:'/roles',component:Roles}]
    }
]

const router = new VueRouter({
  routes
})
//挂载路由导航守卫
router.beforeEach((to,form,next) => {
  //to表示将要访问的路径
  //form表示路径的来源
  //next是一个函数，表示放行，next()代表强制跳转到一个地址
  if(to.path === '/login'){
    return next();
  }
  const tokenstr = window.sessionStorage.getItem('token');
  if(!tokenstr){
    return next('/login')
  }
  next();
});
export default router
