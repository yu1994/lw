import Mock from "mockjs";

const URL = {
  phone: "http://192.144.129.220/img/phone.png",
  bg: "http://192.144.129.220/img/bg.png"
};

const List = [];
const count = 10;
const baseContent =
  '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>';
// eslint-disable-next-line camelcase
const image_uri =
  "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3";

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@increment",
      timestamp: +Mock.Random.date("T"),
      author: "@first",
      reviewer: "@first",
      title: "@title(5, 10)",
      content_short: "mock data",
      content: baseContent,
      forecast: "@float(0, 100, 2, 2)",
      importance: "@integer(1, 3)",
      "type|1": ["CN", "US", "JP", "EU"],
      "status|1": ["published", "draft", "deleted"],
      display_time: "@datetime",
      comment_disabled: true,
      pageviews: "@integer(300, 5000)",
      image_uri,
      platforms: ["a-platform"],
      month: [
        ["1月", "@integer(0, 100)", "@integer(0, 100)", "@integer(0, 100)"],
        ["2月", "@integer(0, 100)", "@integer(0, 100)", "@integer(0, 100)"],
        ["3月", "@integer(0, 100)", "@integer(0, 100)", "@integer(0, 100)"],
        ["3月", "@integer(0, 100)", "@integer(0, 100)", "@integer(0, 100)"],
        ["4月", "@integer(0, 100)", "@integer(0, 100)", "@integer(0, 100)"],
        ["5月", "@integer(0, 100)", "@integer(0, 100)", "@integer(0, 100)"],
        ["6月", "@integer(0, 100)", "@integer(0, 100)", "@integer(0, 100)"],
        ["7月", "@integer(0, 100)", "@integer(0, 100)", "@integer(0, 100)"],
        ["8月", "@integer(0, 100)", "@integer(0, 100)", "@integer(0, 100)"],
        ["9月", "@integer(0, 100)", "@integer(0, 100)", "@integer(0, 100)"],
        ["10月", "@integer(0, 100)", "@integer(0, 100)", "@integer(0, 100)"],
        ["11月", "@integer(0, 100)", "@integer(0, 100)", "@integer(0, 100)"],
        ["12月", "@integer(0, 100)", "@integer(0, 100)", "@integer(0, 100)"]
      ]
    })
  );
}

export default [
  {
    url: "/article/list",
    type: "get",
    response: config => {
      const {
        importance,
        type,
        title,
        page = 1,
        limit = 20,
        sort
      } = config.query;

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false;
        if (type && item.type !== type) return false;
        return !(title && item.title.indexOf(title) < 0);
      });

      if (sort === "-id") {
        mockList = mockList.reverse();
      }

      const pageList = mockList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      );

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      };
    }
  },

  {
    url: "/article/detail",
    type: "get",
    response: config => {
      const { id } = config.query;
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          };
        }
      }
    }
  },

  {
    url: "/article/pv",
    type: "get",
    response: config => {
      const { id } = config.query;
      if (id === "12") {
        return {
          code: 20000,
          list: List[0]
        };
      } else if (id === "3") {
        return {
          code: 20000,
          list: List[1]
        };
      } else {
        return {
          code: 20000,
          list: List[2]
        };
      }
    }
  },

  {
    url: "/article/create",
    type: "post",
    response: _ => ({
      code: 20000,
      data: "success"
    })
  },

  {
    url: "/article/update",
    type: "post",
    response: _ => ({
      code: 20000,
      data: "success"
    })
  }
];
