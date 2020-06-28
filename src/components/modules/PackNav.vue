<template>
  <div class="PackNav">
    <van-nav-bar
      v-bind="$attrs"
      :title="$attrs.title ? $attrs.title : '标题'"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
export default {
  name: "PackNav",
  methods: {
    onClickLeft() {
      this.$toast("返回");
    },
    onClickRight() {
      this.$toast("按钮");
    }
  }
};
</script>

<style scoped lang="stylus">
.PackNav
  position fixed
  top 0
  z-index 999
  width 100%
</style>
