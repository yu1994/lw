const state = {
  area: {},
  ratio: {
    // 计算的尺寸
  },
  // 手机模型参数
  design: {},
  currentTheme: {
    //当前的主题
  },
  currentImgAttr: {

  },
  currentFile: [],
  themeQuery: {
    channelId: '11', //渠道ID
    id: '',
    memberId: '',
    memberNickname: '', // 会员名称
    price: '',
    productAttr: '', // 产品属性
    productCategoryId: '', // 商品分类
    productId: '',
    productName: '', // 商品名称
    productPic: '', //商品主图
    productSkuCode: '', // sku条码
    quantity: '', // 购买数量
  }
};
const mutations = {
  SET_DESIGN: (state, design) => {
    state.design = design;
  },
  SET_CUTTENT_THEME: (state, theme) => {
    state.currentTheme = theme;
  },
  SET_CURRENT_FILE: (state, file) => {
    state.currentFile = file;
  },
  SET_CURRENT_IMG_ATTR: (state, attr) => {
    state.currentImgAttr = attr;
  },
  SET_RATIO: (state, ratio) => {
    state.ratio = ratio;
  },
  SET_AREA: (state, area) => {
    state.area = area;
  },
  SET_THERE_QUERY:(state, query) => {
  state.themeQuery = query;
  },
};
const actions = {};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
