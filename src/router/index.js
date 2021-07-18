import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>import('../../src/views/home/Home')
const Cart = () =>import('../../src/views/cart/Cart')
const Category = () =>import('../../src/views/category/Category')
const Profile = () =>import('../../src/views/profile/Profile')
const Detail = () =>import('../../src/views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})


export default router

