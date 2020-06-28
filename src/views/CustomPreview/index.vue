<template>
  <div class="customPreview">
    <div class="preview" ref="preview">
      <div class="compile">
        <div
          class="panel"
          ref="themePanel"
          :style="{ backgroundImage: 'url(' + currentTheme.phone + ')' }"
        >
          <div class="panel-mask" :style="{}">
            <!-- maskImage: 'url(' + result.mask + ')'-->
            <div class="compile-area">
              <div
                v-if="currentTheme.isTheme"
                class="bg"
                :style="{
                  backgroundImage: 'url(' + currentTheme.bgTheme + ')'
                }"
              ></div>
              <div class="panel-paper">
                <div
                  class="paper"
                  :style="{
                    left:
                      (currentTheme.area.centerX - currentTheme.area.w / 2) *
                        ratio.paperW +
                      'PX',
                    width: currentTheme.area.w * ratio.paperW + 'PX',
                    top:
                      (currentTheme.area.centerY - currentTheme.area.h / 2) *
                        ratio.paperH +
                      'PX',
                    height: currentTheme.area.h * ratio.paperH + 'PX'
                  }"
                >
                  <div v-if="currentFile.length > 0" class="paper-bg">
                    <vue-drag-resize
                      class="view"
                      :minw="currentTheme.area.w * ratio.paperW"
                      :minH="currentTheme.area.h * ratio.paperH"
                      :z="999"
                      :style="{
                        backgroundImage: 'url(' + currentFile[0].content + ')'
                      }"
                      :isAcative="true"
                      v-on:resizing="resize"
                      v-on:dragging="resize"
                    >
                      <!--<img :src="currentFile[0].content" width="100%" />-->
                    </vue-drag-resize>
                    <!--<viewer :images="currentFile[0]">
                      <img :src="currentFile[0].content" width="100%" />
                    </viewer>-->
                  </div>
                </div>
              </div>
              <!-- <div class="control">
                <div
                  class="control-border"
                  :style="{
                    left:
                      (currentTheme.area.centerX - currentTheme.area.w / 2) *
                        ratio.paperW +
                      'PX',
                    width: currentTheme.area.w * ratio.paperW + 'PX',
                    top:
                      (currentTheme.area.centerY - currentTheme.area.h / 2) *
                        ratio.paperH +
                      'PX',
                    height: currentTheme.area.h * ratio.paperH + 'PX'
                  }"
                >
                  <div class="btn btn-zoom" @click="zoomHandle"></div>
                </div>
              </div>-->
              <div
                class="panel-bg"
                :style="{ backgroundImage: 'url(' + currentTheme.phone + ')' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="lens">
        <div class="icon" @click="lensHandle">
          <van-icon name="search" :color="$variable.themeColor" size="32" />
        </div>
      </div>-->
    </div>
    <div class="btn-wrap">
      <div class="buy"><span>立即购买</span></div>
      <div class="shopping"><span>加入购物车</span></div>
    </div>
  </div>
</template>

<script>
// import "viewerjs/dist/viewer.css";
// import Viewer from "v-viewer";
// import Vue from "vue";
// Vue.use(Viewer);
import VueDragResize from "vue-drag-resize";
import { mapState } from "vuex";
export default {
  name: "CustomPreview",
  components: {
    VueDragResize
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      currentFile: state => state.parameter.currentFile,
      ratio: state => state.parameter.ratio,
      currentTheme: state => state.parameter.currentTheme
    })
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        const themePanel = this.$refs.themePanel;
        themePanel.style.width = this.ratio.w + "px";
        themePanel.style.height = this.ratio.h + "px";
      });
    },
    resize(newRect) {
      console.info(newRect);
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
    lensHandle() {
      if (!this.preview) {
        this.preview = this.$refs.preview;
      }
      this.preview.style.transform = "scale(2)";
      // this.preview.style.transform
    },
    zoomHandle() {}
  }
};
</script>

<style scoped lang="stylus">
.customPreview
  display flex
  flex-flow column nowrap
  height 100vh
  background-color $normalColor
  overflow hidden
  .preview
    position relative
    flex 1
    width 100%
    background-image url("../../assets/img/wallpaper.jpg")
    background-size 100% auto
    background-repeat no-repeat
    transform scale(2)
    .compile
      position absolute
      left 0
      right 0
      width 100%
      padding-top 100%
      top 50%
      transform translateY(-50%)
      .panel
        position absolute
        left 50%
        top 50%
        transform translate(-50%,-50%)
        background-size 100% auto
        .panel-mask
          position absolute
          left 0
          top 0
          width 100%
          height 100%
          mask-size 100% auto
          mask-image url("../../assets/img/phone.fw.png")
          .compile-area
            position absolute
            left 0
            top 0
            width 100%
            height 100%
          .bg
            position absolute
            left 0
            top 0
            right 0
            bottom 0
            z-index 90
            background-size 100% auto
        .panel-paper
          position absolute
          width 100%
          height 100%
          .paper
            position absolute
            background-color #333
            overflow hidden
            .paper-bg

              top -20px /* position absolute*/
              right 0
              bottom -20px
              z-index 7
              left 0
              background-size cover
              background-repeat no-repeat
              background-position 50%
              .view
                z-index 999
                background-size 100% auto
                background-repeat no-repeat
        .panel-bg
          position absolute
          left 0
          top 0
          width 100%
          height 100%
          z-index 100
          background-repeat no-repeat
          background-size 100% auto
    .lens
      position absolute
      width 100%
      height 40px
      left 0
      top 20px
      z-index 99
      .icon
        position absolute
        top 0
        bottom 0
        right 0
        display flex
        width 40px
        justify-content center
        align-items center
        flex-direction row-reverse
  .btn-wrap
    display flex
    height 46px
    align-items center
    text-align center
    z-index 1
    .buy
      flex 1 0  40%
      height @height
      line-height @height
      background-color $normalColor
    .shopping
      flex 1 0  60%
      height @height
      line-height @height
      color $normalColor
      background-color $themeColor
</style>
<style scoped lang="stylus">
.customPreview
  .control
    position absolute
    width 100%
    height 100%
    background-color red
    .control-border
      position absolute
      z-index 101
      border 2px solid red
      .btn-zoom
        position absolute
        width 10px
        height 10px
        right 0
        bottom 0
        transform translate(50%,50%)
        background red
        border-radius 20px
</style>
