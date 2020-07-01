export default [
  {
    path: "/custom-preview",
    name: "CustomPreview",
    component: () => import("@/views/CustomPreview"),
    meta: { keepAlive: false }
  }
];
