import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

const CategoryCreate = () => import('../views/category/create') 
const CategoryList = () => import('../views/category/list') 
const ArticleCreate = () => import('../views/article/create') 
const ArticleList = () => import('../views/article/list') 
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Main',
    redirect: '/',
    component: Main,
    children: [
      { path: '/', component: Home },
      { path: '/category/create', component: CategoryCreate },
      { path: '/category/list', component: CategoryList },
      
      { path: '/article/create', component: ArticleCreate },
      { path: '/article/list', component: ArticleList },
      { path: '/article/:id', component: ArticleCreate, props: true },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
