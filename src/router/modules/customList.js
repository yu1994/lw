export default [
  {
    path: "/custom-list",
    name: "customList",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/CustomList")
  }
];
