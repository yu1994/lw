<template>
  <div class="layout">
    <div
      class="panel"
      ref="themePanel"
      :style="{ backgroundImage: 'url(' + design.url + ')' }"
    >
      <div
        class="panel-mask"
        :style="{ maskImage: 'url(' + design.mask + ')' }"
        @click="previewHandle(item)"
      >
        <div class="compile-area" ref="compileArea">
          <div
            v-if="item.imgUrl"
            class="compile-area-theme"
            ref="themeBg"
            :style="{
              backgroundImage: 'url(' + item.imgUrl + ')'
            }"
          ></div>
          <div class="compile-area-edit">
            <div
              ref="editPaper"
              class="compile-area-edit-paper"
              v-for="(paper, index) in item.materialExtendList"
              :key="index"
              :style="{
                left:
                  (paper.centralX - paper.width / 2) *
                    (themeAttr.width / item.imgWidth) +
                  'PX',
                width: paper.width * (themeAttr.width / item.imgWidth) + 'PX',
                top:
                  (paper.centralY - paper.heigth / 2) *
                    (themeAttr.height / item.imgHeight) +
                  'PX',
                height:
                  paper.heigth * (themeAttr.height / item.imgHeight) + 'PX'
              }"
            >
              <div
                v-if="currentFile.length > 0"
                class="compile-area-edit-paper-bg"
                :style="{
                  backgroundImage: 'url(' + currentFile[0].content + ')'
                }"
              ></div>
            </div>
          </div>
        </div>
        <div
          class="cover-bg"
          :style="{ backgroundImage: 'url(' + design.cover + ')' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PackPhoneLayout",
  props: {
    item: {
      type: Object,
      defaulst() {
        return {};
      }
    },
    currentFile: {
      type: Array
    },
    themeAttr: {
      type: Object
    },
    design: {
      type: Object
    }
  }
};
</script>

<style scoped lang="stylus">
.layout
  display flex
  justify-content center
  background-repeat no-repeat
  background-size 100% auto
  transform scale(1.7)
  .panel
    position relative
    width 100%
    margin-bottom 16px
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
    .compile-area-edit
      position absolute
      width 100%
      height 100%
      .compile-area-edit-paper
        position absolute
        background-color rebeccapurple
        background-repeat no-repeat
        .compile-area-edit-paper-bg
          position absolute
          top -20px
          right 0
          bottom -20px
          z-index 7
          left 0
          background-size 100%
          background-repeat no-repeat
          background-position 50%
    .cover-bg
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      z-index 100
      background-repeat no-repeat
      background-size 100% auto
</style>
