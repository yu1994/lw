<template>
  <div class="wrap CustomList">
    <pack-nav type="primary" title="定制品" />
    <div>
      <div>
        <div class="photo p16">
          <van-uploader
            :max-count="picSetting.count"
            :accept="picSetting.accept"
            :max-size="picSetting.maxSize"
            :before-read="beforeRead"
            :deletable="false"
            v-model="currentFile"
          />
          <template v-if="currentFile.length > 0">
            <van-uploader
              :before-read="beforeRead"
              :after-read="afterRead"
              :max-count="picSetting.count"
              :accept="picSetting.accept"
              :max-size="picSetting.maxSize"
            >
              <van-button
                size="small"
                icon="photo"
                :color="$variable.themeColor"
                >更换照片</van-button
              >
            </van-uploader>
          </template>

          <!--<van-button size="small" icon="photo" :color="$variable.themeColor">
              更换照片</van-button
            >-->
        </div>
      </div>
      <div class="list">
        <!--  :style="{ backgroundImage: 'url(' + result.background + ')' }"  -->
        <div class="theme-list">
          <div
            class="theme-list-item"
            v-for="(item, key) in result.list"
            :key="key"
          >
            <div class="layout" ref="layout">
              <div
                class="panel"
                ref="themePanel"
                :style="{ backgroundImage: 'url(' + design.backImage + ')' }"
              >
                <div
                  class="panel-mask"
                  :style="{ maskImage: 'url(' + design.editImage + ')' }"
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
                          width:
                            paper.width * (themeAttr.width / item.imgWidth) +
                            'PX',
                          top:
                            (paper.centralY - paper.heigth / 2) *
                              (themeAttr.height / item.imgHeight) +
                            'PX',
                          height:
                            paper.heigth * (themeAttr.height / item.imgHeight) +
                            'PX'
                        }"
                      >
                        <div
                          v-if="currentFile.length > 0"
                          class="compile-area-edit-paper-bg"
                          :style="{
                            width:
                              paper.width * (themeAttr.width / item.imgWidth) +
                              'px',
                            height:
                              ((paper.width *
                                (themeAttr.width / item.imgWidth)) /
                                currentImgAttr.w) *
                                currentImgAttr.h +
                              'px',
                            backgroundImage:
                              'url(' + currentFile[0].content + ')'
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="uploadDialog">
      <van-dialog v-model="show" :show-confirm-button="false">
        <template slot="title">
          <h2 slot="title">
            您还没有上传照片哦
          </h2>
        </template>
        <div class="content p16">
          <p>上传清晰的照片,将为您生成定制效果</p>
        </div>
        <div class="p16">
          <van-uploader
            :before-read="beforeRead"
            :after-read="afterRead"
            :max-count="picSetting.count"
            :accept="picSetting.accept"
            :max-size="picSetting.maxSize"
          >
            <!--result-type="file"-->
            <van-button block icon="photo" :color="$variable.themeColor"
              >上传照片</van-button
            >
          </van-uploader>
        </div>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import {
  customListMockAPI,
  customDesignMockAPI
} from "../../../mock/API/mock-customList-api";
import {  customMaterialAPI, customDesignAPI } from "@/api/customListAPI";
import { getInnerWidth, createImgHandle } from "@/utils";

export default {
  name: "CustomList",
  data() {
    return {
      materialList: [],
      design: {},
      picSetting: {
        count: 1,
        accept: ".png, .jpg, .jpeg",
        maxSize: "10 * 1024 * 1024"
      },
      show: true,
      result: {},
      photo: "",
      layoutRatio: {
        // 总体比例
        w: 0,
        h: 0
      },
      currentFile: [],
      fileList: [],
      currentImgAttr: {
        w: 0,
        h: 0
      },
      // 素材位置
      themeAttr: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      },
      query: {}
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      this.query = this.$route.query;
      /* 手机模型 */
       await this.getCustomDesignAPI({});
      if (process.env.NODE_ENV === 'development'){
        await this.getCustomDesignMockAPI();
        /* 壁纸 */
        await this.getCustomListMockAPI();
      }
      /* 壁纸 */
      await this.getCustomMaterialAPI({ category: 1, playingMethod: 4 });
      this.$nextTick(() => {
        let width = getInnerWidth();
        this.layoutRatio.w = width / 2 / this.design.backImageWidth;
        const themePanelList = this.$refs.themePanel;
        for (let i = 0, len = themePanelList.length; i < len; i += 1) {
          themePanelList[i].style.height =
            this.design.backImageHeight * this.layoutRatio.w + "px";
        }
        const areaList = this.$refs.compileArea;
        this.themeAttr.width = this.layoutRatio.w * this.design.viewImageWidth;
        this.themeAttr.height = this.layoutRatio.w * this.design.viewImageHeight;
        this.themeAttr.left = this.layoutRatio.w * this.design.offsetX;
        this.themeAttr.top = this.layoutRatio.w * this.design.offsetY;
        /* 素材 题材的位置 */
        for (let i = 0, len = areaList.length; i < len; i += 1) {
          areaList[i].style.width = this.themeAttr.width + "px";
          areaList[i].style.height = this.themeAttr.height + "px";
          areaList[i].style.left = this.themeAttr.left + "px";
          areaList[i].style.top = this.themeAttr.top + "px";
        }
      });
    },
    beforeRead(file) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        this.$toast.fail("请上传 jpg 或 png 格式图片");
        return false;
      }
      return true;
    },
    async afterRead(file) {
      const img = await createImgHandle(file);
      this.currentImgAttr.w = img.width;
      this.currentImgAttr.h = img.height;
      this.currentFile = [];
      // 此时可以自行将文件上传至服务器
      this.currentFile.push(file);
      // 历史上传文件
      this.fileList.push(file);
      this.show = false;
    },
    getCustomListMockAPI() {
      return new Promise(resolve => {
        customListMockAPI().then(response => {
           this.result = response.data;
          resolve(true);
        });
      });
    },
    getCustomDesignMockAPI() {
      return new Promise(resolve => {
        customDesignMockAPI().then(response => {
          this.design = response.data;
          resolve(true);
        });
      });
    },
    getCustomDesignAPI(params) {
      return new Promise(resolve => {
        customDesignAPI(params).then(response => {
          this.design = response.data;
          resolve(true);
        });
      });
    },
    getCustomMaterialAPI(params) {
      return new Promise(resolve => {
        customMaterialAPI(params).then(response => {
          this.result = response.data;
          this.materialList = response.data.materialExtendList;
          resolve(true);
        });
      });
    },
    previewHandle(item) {
      this.$store.commit("mobileShellParameter/SET_CURRENT_FILE", this.currentFile);
      this.$store.commit("mobileShellParameter/SET_DESIGN", this.design);
      this.$store.commit("mobileShellParameter/SET_CUTTENT_THEME", item);
      this.$store.commit("mobileShellParameter/SET_CURRENT_IMG_ATTR", this.currentImgAttr);
      this.$router.push({ path: "custom-preview", query: this.query });
    }
  }
};
</script>

<style scoped lang="stylus">
.CustomList
  padding-top 46px
  padding-bottom 120px
  overflow hidden
  .list
    position relative
    background-repeat no-repeat
    background-size 100% auto
    .theme-list
      display flex
      position relative
      top 60px
      align-content start
      flex-wrap wrap
      .theme-list-item
        position relative
        flex 1 0 50%
        /*padding 10px*/
        box-sizing border-box
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
                background-repeat no-repeat
                .compile-area-edit-paper-bg
                  position absolute
                  left 0
                  z-index 7
                  background-repeat no-repeat
                  background-position 50%
                  background-size cover
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
<style scoped lang="stylus">
.CustomList
  .uploadDialog
    text-align center
    h2
      font-size 20px
  .photo
    display flex
    align-items center
    justify-content space-between
</style>
