export default [
  {
    path: "/address",
    name: "Address",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Address")
  }
]
