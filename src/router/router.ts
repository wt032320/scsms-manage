import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/ManageLogin.vue"),
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/home/car",
    component: () => import("@/views/ManageHome.vue"),
    children: [
      {
        path: "car",
        name: "Car",
        component: () => import("@/views/CarManage.vue"),
      },
      {
        path: "order",
        name: "Order",
        component: () => import("@/views/OrderManage.vue"),
      },
      {
        path: "people",
        name: "People",
        component: () => import("@/views/PeopleManage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
