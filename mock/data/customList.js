import Mock from "mockjs";
const List = [];
const count = 10;
const URL = {
  phone: "/origin/phone.png",
  bg: "/origin/bg.png",
  theme: "/origin/bg-theme.png",
  theme2: "/origin/bg-theme2.png",
  mask: "/origin/phone.fw.png"
};

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@increment",
      title: "@title(5, 10)",
      background: URL.bg,
      phone: URL.phone,
      mask: URL.mask,
      height: 1800,
      width: 900,
      headArea: [
        {
          x: -16.6,
          y: -18,
          w: 939.6,
          h: 1828.8,
          angle: 0,
          superType: 3,
          type: [1, 2, 3],
          outside: "0"
        }
      ],
      area: {
        /* x: i === 0 ? 0 : 98,
        y: i === 0 ? 0 : 1040,*/
        w: i % 2 === 0 ? (i === 0 ? 900 : 840) : i === 0 ? 900 : 724,
        h: i === 0 ? 1800 : i % 2 === 0 ? 800 : 524,
        centerX: i === 0 ? 900 / 2 : 900 / 2,
        centerY: i % 2 === 0 ? 1800 / 2 : i === 0 ? 1800 / 2 : 524 / 2 + 1026
      },
      bgTheme: i % 2 === 0 ? URL.theme2 : URL.theme,
      isTheme: i !== 0,
    })
  );
}

export default [
  {
    url: "/custom/list",
    type: "get",
    response: config => ({
      code: 20000,
      data: {
        background: URL.bg,
        phone: URL.phone,
        mask: URL.mask,
        list: List,
        pw: 292,
        ph: 603
      }
    })
  }
];
