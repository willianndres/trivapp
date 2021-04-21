import { createRouter, createWebHistory } from 'vue-router'

const validateToken = (to, from, next) => {
  const token = localStorage.getItem("token");
  if (!token && to.name !== "Login") {
    return next("/403");
  }
  return next();
};

const routes = [
  {
    path: '/',
    name: 'Register',
    component: () => import("@/views/Register")
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("@/views/Login")
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '',
    component: () => import('@/views/Dashboard'),
    beforeEnter: [validateToken],
    children: [
      {
        path: "",
        component: () => import("@/components/Dashboard/Index")
      }
    ]
  },
  {
    path: '/categories',
    name: 'Categories',
    redirect: '',
    component: () => import('@/views/Categories'),
    beforeEnter: [validateToken],
    children: [
      {
        path: "",
        component: () => import("@/components/Categories/Index")
      },
      {
        path: "add",
        name: "AddCategory",
        component: () => import("@/components/Categories/Add")
      },
      {
        path: "edit/:id",
        name: "EditCategory",
        component: () => import("@/components/Categories/Edit")
      },
      {
        path: "add-questions/:id",
        name: "AddQuestions",
        component: () => import("@/components/Categories/AddQuestions")
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
