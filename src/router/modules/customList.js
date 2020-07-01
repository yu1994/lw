export default [
  {
    path: "/custom-list",
    name: "CustomList",
    component: () => import("@/views/CustomList"),
    meta: { keepAlive: true }
  }
];
