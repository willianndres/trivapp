import { createRouter, createWebHistory } from "vue-router";

const validateRouteRegister = (to, from, next) => {
  const token = localStorage.getItem("token");
  if (token) next({ name: "Dashboard" });
  else next();
};
const validateToken = (to, from, next) => {
  const token = localStorage.getItem("token");
  if (!token && to.name !== "Register") next({ name: "Register" });
  else next();
};

const routes = [
  {
    path: "/",
    name: "Register",
    component: () => import("../views/Register.vue"),
    beforeEnter: [validateRouteRegister],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    redirect: "",
    component: () => import("../views/Dashboard.vue"),
    beforeEnter: [validateToken],
    children: [
      {
        path: "",
        component: () => import("../components/Dashboard/Index.vue"),
      },
    ],
  },
  {
    path: "/categories",
    name: "Categories",
    redirect: "",
    component: () => import("../views/Categories.vue"),
    beforeEnter: [validateToken],
    children: [
      {
        path: "",
        component: () => import("../components/Categories/Index.vue"),
      },
      {
        path: "add",
        name: "AddCategory",
        component: () => import("../components/Categories/Add.vue"),
      },
      {
        path: "edit/:id",
        name: "EditCategory",
        component: () => import("../components/Categories/Edit.vue"),
      },
      {
        path: "add-questions/:id",
        name: "AddQuestions",
        component: () => import("../components/Categories/AddQuestions.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
