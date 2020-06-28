export default [
  {
    path: "/address",
    name: "address",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Address")
  }
]
