export default [
  {
    path: "/custom-preview",
    name: "customPreview",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/CustomPreview")
  }
];
