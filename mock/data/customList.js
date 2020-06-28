import Mock from "mockjs";
const List = [];
const count = 10;
const URL = {
  phone: "http://192.144.129.220/img/phone.png",
  bg: "http://192.144.129.220/img/bg.png",
  theme: "http://192.144.129.220/img/bg-theme.png",
  theme2: "http://192.144.129.220/img/bg-theme2.png",
  mask: "http://192.144.129.220/img/phone.fw.png"
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
      pw: 292,
      ph: 603
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
        list: List
      }
    })
  }
];
