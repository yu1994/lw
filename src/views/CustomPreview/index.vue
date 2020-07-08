<template>
  <div class="customPreview">
    <div class="preview" ref="preview">
      <div class="compile" ref="compile">
        <div
          class="panel"
          ref="themePanel"
          :style="{ backgroundImage: 'url(' + design.backImage + ')' }"
        >
          <div
            class="panel-mask"
            :style="{ maskImage: 'url(' + design.editImage + ')' }"
          >
            <div class="compile-area" ref="compileArea">
              <div
                v-if="currentTheme.imgUrl"
                class="compile-area-theme"
                ref="themeBg"
                :style="{
                  backgroundImage: 'url(' + currentTheme.imgUrl + ')'
                }"
              ></div>
              <div class="compile-area-edit">
                <div
                  ref="editPaper"
                  class="compile-area-edit-paper"
                  v-for="(paper, index) in currentTheme.materialExtendList"
                  :key="index"
                  :style="{
                    left:
                      (paper.centralX - paper.width / 2) *
                        (themeAttr.width / currentTheme.imgWidth) +
                      'PX',
                    width:
                      paper.width * (themeAttr.width / currentTheme.imgWidth) +
                      'PX',
                    top:
                      (paper.centralY - paper.heigth / 2) *
                        (themeAttr.height / currentTheme.imgHeight) +
                      'PX',
                    height:
                      paper.heigth *
                        (themeAttr.height / currentTheme.imgHeight) +
                      'PX'
                  }"
                >
                  <div
                    v-if="currentFile.length > 0"
                    class="compile-area-edit-paper-bg"
                    ref="paperBg"
                    :style="{
                      width: '100%',
                      height:
                        ((paper.width *
                          (themeAttr.width / currentTheme.imgWidth)) /
                          currentImgAttr.w) *
                          currentImgAttr.h +
                        'px',
                      backgroundImage: 'url(' + currentFile[0].content + ')'
                    }"
                  ></div>
                </div>
              </div>
            </div>
            <div
              class="cover-bg"
              :style="{ backgroundImage: 'url(' + design.hiddenImage + ')' }"
            ></div>
          </div>
          <div class="dragWrap" ref="dragWrap">
            <div
              class="drag"
              ref="drag"
              v-for="(paper, index) in currentTheme.materialExtendList"
              :key="index"
              :style="{
                left:
                  (paper.centralX - paper.width / 2) *
                    (themeAttr.width / currentTheme.imgWidth) +
                  'PX',
                width:
                  paper.width * (themeAttr.width / currentTheme.imgWidth) +
                  'PX',
                top:
                  (paper.centralY - paper.heigth / 2) *
                    (themeAttr.height / currentTheme.imgHeight) +
                  'PX',
                height:
                  ((paper.width * (themeAttr.width / currentTheme.imgWidth)) /
                    currentImgAttr.w) *
                    currentImgAttr.h +
                  'px'
              }"
            >
              <vue-drag-resize
                v-if="show"
                class="drag-resize-view"
                :w="paper.width * (themeAttr.width / currentTheme.imgWidth)"
                :h="
                  ((paper.width * (themeAttr.width / currentTheme.imgWidth)) /
                    currentImgAttr.w) *
                    currentImgAttr.h
                "
                :minw="paper.width * (themeAttr.width / currentTheme.imgWidth)"
                :minh="
                  ((paper.width * (themeAttr.width / currentTheme.imgWidth)) /
                    currentImgAttr.w) *
                    currentImgAttr.h
                "
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
      </div>
      <div class="lens">
        <div class="icon" @click="lensHandle">
          <van-icon name="search" :color="$variable.themeColor" size="32" />
        </div>
      </div>
      <div class="cart">
        <div class="cart-icon">
          <van-icon name="cart-o" badge="9"  :color="$variable.normalColor" size="2em"/>
        </div>
      </div>
    </div>
    <div class="btn-wrap">
      <div class="btn-wrap-buy">
        <span>立即购买</span>
      </div>
      <div class="btn-wrap-shopping" @click="shoppingHandle">
        <span>加入购物车</span>
      </div>
    </div>
  </div>
</template>

<script>
import VueDragResize from "vue-drag-resize";
import { mapState } from "vuex";
import { drawImage } from "@/utils";
import { getInnerWidth } from "@/utils";
import { cartAddAPI } from "@/api/customPreviewAPI";

export default {
  name: "CustomPreview",
  components: {
    VueDragResize
  },
  data() {
    return {
      layoutRatio: {
        w: 0
      },
      show: false,
      // 素材位置
      themeAttr: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      },
      areaStyle: {},
      area: {
        left: null,
        top: null,
        width: null,
        height: null
      },
      materialList: [],
      materialNumber: 1 // 有的有多个编辑区域 暂时一个吧
    };
  },
  computed: {
    ...mapState({
      ratio: state => state.mobileShellParameter.ratio,
      design: state => state.mobileShellParameter.design,
      currentImgAttr: state => state.mobileShellParameter.currentImgAttr, // 用户上传图片的实际宽和高
      currentFile: state => state.mobileShellParameter.currentFile,
      currentTheme: state => state.mobileShellParameter.currentTheme,
      themeQuery: state => state.mobileShellParameter.themeQuery
    })
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        let width = getInnerWidth();
        this.layoutRatio.w = width / this.design.backImageWidth;
        const compileArea = this.$refs.compileArea;
        const dragWrap = this.$refs.dragWrap;
        this.themeAttr.width = this.layoutRatio.w * this.design.viewImageWidth;
        this.themeAttr.height = this.layoutRatio.w * this.design.viewImageHeight;
        this.themeAttr.left = this.layoutRatio.w * this.design.offsetX;
        this.themeAttr.top = this.layoutRatio.w * this.design.offsetY;
        compileArea.style.width = this.themeAttr.width + "px";
        compileArea.style.height = this.themeAttr.height + "px";
        compileArea.style.left = this.themeAttr.left + "px";
        compileArea.style.top = this.themeAttr.top + "px";
        // 调整范围设置
        dragWrap.style.width = this.themeAttr.width + "px";
        dragWrap.style.height = this.themeAttr.height + "px";
        dragWrap.style.left = this.themeAttr.left + "px";
        dragWrap.style.top = this.themeAttr.top + "px";
        this.getMaterialListAttrHandle();
        this.show = true;
      });
    },
    resizeHandle(newRect) {
      if (!this.paperBg) {
        this.paperBg = this.$refs.paperBg[0];
      }
      this.paperBg.style.width = newRect.width + "px";
      this.paperBg.style.height = newRect.height + "px";
      this.paperBg.style.top = newRect.top + "px";
      this.paperBg.style.left = newRect.left + "px";
    },
    resizeStopHandle(newRect) {
      if (this.materialNumber === 1) {
        const {w , h} = this.materialList[this.materialNumber - 1];
        if (!this.drag) {
          this.drag = document.querySelectorAll(".drag-resize-view")[this.materialNumber - 1];
        }
        const dragWidth = this.drag.clientWidth;
        const dragHeight = this.drag.clientHeight;
        if (newRect.left < 0 && (Math.abs(newRect.left) + w) > dragWidth) {
          this.drag.style.right = 0;
          this.drag.style.left = 'auto';
          this.paperBg.style.right = 0;
          this.paperBg.style.left = 'auto';
        }
        if (newRect.left > 0 && (Math.abs(newRect.left) + dragWidth) > w) {
          this.drag.style.left = 0;
          this.drag.style.right = 'auto';
          this.paperBg.style.left = 0;
          this.paperBg.style.right = 'auto';
        }
        if (newRect.top > 0 && (Math.abs(newRect.top) + h) < dragHeight) {
          this.drag.style.top = 0;
          this.drag.style.bottom = 'auto';
          this.paperBg.style.top = 0;
          this.paperBg.style.bottom = 'auto';
        }
        if (newRect.top < 0 && (Math.abs(newRect.top) + h) > dragHeight) {
          this.drag.style.bottom = 0;
          this.drag.style.top = 'auto';
          this.paperBg.style.bottom = 0;
          this.paperBg.style.top = 'auto';
        }
      }
    },
    shoppingHandle() {
      const query = JSON.parse(JSON.stringify(this.themeQuery));
      cartAddAPI(query).then((response) => {
        console.info(response)
      });
      const canvas = document.createElement("canvas");
      canvas.width = this.design.backImageWidth;
      canvas.height = this.design.backImageHeight;
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
      if (!this.compile) {
        this.preview = this.$refs.preview;
      }
      const h = this.preview.clientHeight;
      const w = this.preview.clientWidth;
      console.info(this.preview);
      console.info(this.preview.height);
      console.info(this.preview.clientHeight);
      // this.preview.style.transform = "scale(2)";
      // this.preview.style.transform
    },
    getMaterialListAttrHandle() {
      this.materialList = [];
      if (Object.prototype.toString.call(this.currentTheme.materialExtendList) === '[object Array]') {
        this.currentTheme.materialExtendList.forEach((paper) => {
          const w = paper.width * (this.themeAttr.width / this.currentTheme.imgWidth);
          const h = paper.heigth * (this.themeAttr.height / this.currentTheme.imgHeight);
          this.materialList.push({w, h})
        })
      }
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
    /*transform scale(2)*/
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
        left 0
        top 0
        width 100%
        height 100%
        background-size 100% auto
        background-repeat no-repeat
        .panel-mask
          position absolute
          left 0
          top 0
          width 100%
          height 100%
          mask-size 100% auto
          .compile-area
            position absolute
            .compile-area-theme
              position absolute
              left 0
              top 0
              right 0
              bottom 0
              z-index 90
              background-size 100% 100%
              background-repeat no-repeat
          .bg
            position absolute
            left 0
            top 0
            right 0
            bottom 0
            z-index 90
            background-size 100% auto
        .compile-area-edit
          position absolute
          width 100%
          height 100%
          .compile-area-edit-paper
            position absolute
            background-repeat no-repeat
            .compile-area-edit-paper-bg
              position absolute
              left 0
              z-index 7
              background-size cover
              background-repeat no-repeat
              background-position 50%
              .drag-resize-view
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
      right 0
      top 20px
      z-index 99
      .icon
        position absolute
        top 0
        bottom 0
        right 8px
        display flex
        width 40px
        justify-content center
        align-items center
        flex-direction row-reverse
    .cart
      position fixed
      width 60px
      height 60px
      right 20px
      bottom 60px
      border-radius 50%
      box-shadow: 0 0.02667rem 0.21333rem 0 rgba(226,55,28,.6)
      background-image linear-gradient(180deg,#ff8b79,$themeColor)
      .cart-icon
        display flex
        height @height
        align-items center
        justify-content center
        font-size 14px
</style>
<!-- 按钮-->
<style scoped lang="stylus">
.customPreview
  .btn-wrap
    display flex
    height 46px
    align-items center
    text-align center
    z-index 1
    .btn-wrap-buy
      flex 1 0  40%
      height @height
      line-height @height
      background-color $normalColor
    .btn-wrap-shopping
      flex 1 0  60%
      height @height
      line-height @height
      color $normalColor
      background-color $themeColor
</style>

<style scoped lang="stylus">
.customPreview
  .dragWrap
    position absolute
    .drag
      position absolute
</style>
