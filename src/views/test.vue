<template>

  <table>
    <tr v-for="(item, key) in 10" :key="key">
      <td v-for="(td, k) in 3" :key="k">{{td}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "test",
  methods: {
    test(val){
      console.info(val.join())
    }
  },
  mounted() {
    this.test([1,2,3])
    const oDiv = this.$refs.div1;
    const oDiv2 = this.$refs.div2;
    console.info(oDiv)
    console.info(oDiv2)
    oDiv2.οnmοusedοwn = function(ev) {
      console.info(ev)
      ev = ev || event;
      var disX = ev.clientX - oDiv2.offsetLeft;
      var disY = ev.clientY - oDiv2.offsetTop;
      document.οnmοusemοve = function(ev) {
        ev = ev || event;
        oDiv.style.width = ev.clientX - disX + oDiv2.offsetWidth + "px";
        oDiv.style.height = ev.clientY - disY + oDiv2.offsetHeight + "px";
      };
      document.οnmοuseup = function() {
        document.onmousemove = document.onmouseup = null;
      };
    };
  }
};
</script>

<style scoped>
#div1 {
  width: 200px;
  height: 200px;
  background-color: red;
  position: relative;
  top: 50%;
  left: 50%;
}
#div2 {
  width: 10px;
  height: 10px;
  background-color: black;
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
