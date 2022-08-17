export default [
  // {
  //   path: "/dashboard/analytics",
  //   name: "dashboard-analytics",
  //   component: () => import("@/views/dashboard/analytics/Analytics.vue"),
  // },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/dashboard/newPage.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];
