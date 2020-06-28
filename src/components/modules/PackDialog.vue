<template>
  <van-dialog v-model="show" title="标题" v-bind="$attrs" show-cancel-button>
    <img src="https://img.yzcdn.cn/vant/apple-3.jpg" />
  </van-dialog>
</template>

<script>
export default {
  name: "PackDialog",
  data() {
    return {
      show: false
    };
  }
};
</script>

<style scoped></style>
