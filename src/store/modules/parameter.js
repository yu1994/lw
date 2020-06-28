const state = {
  area: {},
  ratio: {
    // 计算的尺寸
  },
  currentTheme: {
    //当前的主题
  },
  currentFile: []
};
const mutations = {
  SET_AREA: (state, area) => {
    state.area = area;
  },
  SET_RATIO: (state, ratio) => {
    state.ratio = ratio;
  },
  SET_CUTTENT_THEME: (state, theme) => {
    state.currentTheme = theme;
  },
  SET_CURRENT_FILE: (state, file) => {
    state.currentFile = file;
  },
};
const actions = {};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
