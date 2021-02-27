import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView';
import Dashboard from '../views/DashboardView';
import Welcome from '../views/Welcome';


const routes = [
   {
    path: '/',
    component: Welcome
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/dashboard',
    component: Dashboard
  }
 /* {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about"  '../views/About.vue')
  } */
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
