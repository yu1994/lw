<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
const baseSize = 75;
export default {
  data() {
    return {};
  },
  mounted() {
    this.setRem();
  },
  methods: {
    setRem() {
      let width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      if (width >= 640) width = 640;
      const scale = width / 750;
      document.documentElement.style.fontSize = `${baseSize *
        Math.min(scale, 2)}px`;
    }
  }
};
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
</style>
