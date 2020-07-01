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
                <div class="paper" :style="areaStyle">
                  <div
                    v-if="currentFile.length > 0"
                    class="paper-bg"
                    ref="paperBg"
                    :style="{
                      backgroundImage: 'url(' + currentFile[0].content + ')'
                    }"
                  ></div>
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
          <div class="drag" :style="areaStyle">
            <vue-drag-resize
              id="drag"
              class="view"
              :w="currentTheme.area.w * ratio.paperW"
              :h="currentTheme.area.h * ratio.paperH"
              :minw="currentTheme.area.w * ratio.paperW"
              :minh="currentTheme.area.h * ratio.paperH"
              :z="999"
              :isAcative="true"
              @resizing="resizeHandle"
              @dragging="resizeHandle"
              @resizestop="resizeStopHandle"
              @dragstop="resizeStopHandle"
            >
            </vue-drag-resize>
          </div>
        </div>
      </div>
      <!--<div class="lens">
        <div class="icon" @click="lensHandle">
          <van-icon name="search" :color="$variable.themeColor" size="32" />
        </div>
      </div>-->
    </div>
    <div
      class="test"
      style="position: absolute; width: 200px;height: 200px;z-index: 999999999"
    >
      <img id="avatar" />
    </div>
    <div class="btn-wrap">
      <div class="buy">
        <span><!--立即购买--></span>
      </div>
      <div class="shopping" @click="shoppingHandle">
        <span><!--加入购物车--></span>
      </div>
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
import { drawImage } from "@/utils";

export default {
  name: "CustomPreview",
  components: {
    VueDragResize
  },
  data() {
    return {
      areaStyle: {},
      area: {
        left: null,
        top: null,
        width: null,
        height: null
      }
    };
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
      this.area.width = this.currentTheme.area.w * this.ratio.paperW;
      this.area.height = this.currentTheme.area.h * this.ratio.paperH;
      this.area.left =
        (this.currentTheme.area.centerX - this.currentTheme.area.w / 2) *
        this.ratio.paperW;
      this.area.top =
        (this.currentTheme.area.centerY - this.currentTheme.area.h / 2) *
        this.ratio.paperH;
      this.areaStyle = {
        left: this.area.left + "PX",
        width: this.area.width + "PX",
        top: this.area.top + "PX",
        height: this.area.height + "PX"
      };
      this.$nextTick(() => {
        const themePanel = this.$refs.themePanel;
        themePanel.style.width = this.ratio.w + "px";
        themePanel.style.height = this.ratio.h + "px";
      });
    },
    resizeHandle(newRect) {
      if (!this.paperBg) {
        this.paperBg = this.$refs.paperBg;
      }
      this.paperBg.style.width = newRect.width + "px";
      this.paperBg.style.height = newRect.height + "px";
      this.paperBg.style.top = newRect.top + "px";
      this.paperBg.style.left = newRect.left + "px";
    },
    resizeStopHandle(newRect) {
      if (!this.drag) {
        this.drag = document.querySelector("#drag");
      }
      if (newRect.left > 0) {
        this.drag.style.left = 0;
        this.paperBg.style.left = 0;
      }
      if (newRect.left < -(this.currentTheme.area.w * this.ratio.paperW)) {
        this.drag.style.left = 0;
        this.paperBg.style.left = 0;
      }
      if (newRect.top > 0) {
        this.drag.style.top = 0;
        this.paperBg.style.top = 0;
      }
      if (newRect.top < -(this.currentTheme.area.h * this.ratio.paperH)) {
        this.drag.style.top = 0;
        this.paperBg.style.top = 0;
      }
    },
    shoppingHandle() {
      const that = this;
      const canvas = document.createElement("canvas");
      canvas.width = this.ratio.w;
      canvas.height = this.ratio.h;
      const context = canvas.getContext("2d");
      context.rect(0, 0, canvas.width, canvas.height);
      context.fill();
      drawImage(context, this.currentTheme.bgTheme, {
        left: 0,
        top: 0,
        width: this.ratio.w,
        height: this.ratio.h
      }).then(() => {
        drawImage(context, this.currentTheme.phone, {
          left: 0,
          top: 0,
          width: this.ratio.w,
          height: this.ratio.h
        }).then(() => {




          drawImage(context, this.currentFile[0].content, {
            left: this.area.left,
            top: this.area.top,
            width: this.area.width,
            height: this.area.height
          }).then(() => {
            let base64 = canvas.toDataURL("image/png"); //"image/png" 这里注意一下
            let img = document.getElementById("avatar");
            img.setAttribute("src", base64);
          });
        });
      });
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
            background-color red
            overflow hidden
            .paper-bg
              position absolute
              top -20px
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
<style scoped lang="stylus">
.customPreview
  .drag
    position absolute
</style>
