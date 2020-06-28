<template>
  <div class="wrap CustomList">
    <pack-nav type="primary" title="定制品" />
    <div>
      <div>
        <!-- <van-sticky>-->
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
        <!--</van-sticky>-->
      </div>
      <div
        class="list"
        :style="{ backgroundImage: 'url(' + result.background + ')' }"
      >
        <div class="theme-list">
          <div
            class="theme-list-item"
            v-for="(item, key) in result.list"
            :key="key"
          >
            <div class="layout">
              <div
                class="panel"
                ref="themePanel"
                :style="{ backgroundImage: 'url(' + result.phone + ')' }"
              >
                <div class="panel-mask" :style="{}" @click="previewHandle(item)">
                  <!-- maskImage: 'url(' + result.mask + ')'-->
                  <div class="compile-area">
                    <div
                      v-if="item.isTheme"
                      class="bg"
                      :style="{
                        backgroundImage: 'url(' + item.bgTheme + ')'
                      }"
                    ></div>
                    <div class="panel-paper">
                      <div
                        class="paper"
                        :style="{
                          left:
                            (item.area.centerX - item.area.w / 2) *
                              ratio.paperW +
                            'PX',
                          width: item.area.w * ratio.paperW + 'PX',
                          top:
                            (item.area.centerY - item.area.h / 2) *
                              ratio.paperH +
                            'PX',
                          height: item.area.h * ratio.paperH + 'PX'
                        }"
                      >
                        <div
                          v-if="currentFile.length > 0"
                          class="paper-bg"
                          :style="{
                            backgroundImage:
                              'url(' + currentFile[0].content + ')'
                          }"
                        ></div>
                      </div>
                    </div>
                    <div
                      class="panel-bg"
                      :style="{ backgroundImage: 'url(' + result.phone + ')' }"
                    ></div>
                  </div>
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
import { customListAPI } from "../../../mock/API/mock-customList-api";

export default {
  name: "CustomList",
  data() {
    return {
      picSetting: {
        count: 1,
        accept: ".png, .jpg, .jpeg",
        maxSize: "10 * 1024 * 1024"
      },
      show: false,
      result: {},
      photo: "",
      pw: 292,
      ph: 603,
      ratio: {
        w: 0,
        h: 0,
        paperW: 0,
        paperH: 0
      },
      currentFile: [],
      fileList: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      await this.getCustomListAPI();
      this.$nextTick(() => {
        let width =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
        // console.log(width);
        // if (this.pw * 2 > width) {
        //   console.log(width / (this.pw * 2));
        // }
        const themePanelList = this.$refs.themePanel;
        for (let i = 0, len = themePanelList.length; i < len; i += 1) {
          themePanelList[i].style.width = (width / (this.pw * 2)) * 100 + "%";
        }
        const themePanel = themePanelList[0];
        this.ratio.w = themePanel.clientWidth || themePanel.offsetWidth;
        const ratio = this.ratio.w / this.pw;
        this.ratio.h = ratio * this.ph;
        for (let i = 0, len = themePanelList.length; i < len; i += 1) {
          themePanelList[i].style.height = ratio * this.ph + "px";
        }
        this.ratio.paperW = this.ratio.w / 900;
        this.ratio.paperH = this.ratio.h / 1800;
      });
    },
    beforeRead(file) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        this.$toast.fail("请上传 jpg 或 png 格式图片");
        return false;
      }
      return true;
    },
    afterRead(file) {
      this.currentFile = [];
      // 此时可以自行将文件上传至服务器
      this.currentFile.push(file);
      // 历史上传文件
      this.fileList.push(file);
      this.show = false;
    },
    getCustomListAPI() {
      return new Promise(resolve => {
        customListAPI().then(response => {
          this.result = response.data;
          resolve(true);
        });
      });
    },
    previewHandle(item) {
      this.$store.commit("parameter/SET_CURRENT_FILE", this.currentFile);
      this.$store.commit("parameter/SET_RATIO", this.ratio);
      this.$store.commit("parameter/SET_CUTTENT_THEME", item);
      this.$router.push({ path: "custom-preview" });
    }
  }
};
</script>

<style scoped lang="stylus">
.CustomList
  padding-top 46px
  padding-bottom 120px
  overflow-y hidden
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
          .panel
            position relative
            margin-bottom 16px
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
                background-color rebeccapurple
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
            .panel-bg
              position absolute
              left 0
              top 0
              width 100%
              height 100%
              z-index 100
              background-repeat no-repeat
              background-size 100% auto
  .uploadDialog
    text-align center
    h2
      font-size 20px
  .photo
    display flex
    align-items center
    justify-content space-between
</style>
