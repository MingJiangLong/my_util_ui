<template>
  <div class="app-container">
    <!-- 背景图片 -->
    <div
      ref="app_container"
      class="app-container"
      :style="appBackgroundImage"
    ></div>
    <Drawer>
      <RobotDrawerContent></RobotDrawerContent>
    </Drawer>
    <!-- mask遮罩 实际内容承载 -->
    <div class="app-mask">
      <div class="app-render">
        <router-view></router-view>
      </div>
    </div>
    <div class="app-clock">
      <Clock></Clock>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { namespace } from "vuex-class";
import Api from "./api/api";
import Drawer from "./components/base/Drawer.vue";
import RobotDrawerContent from "./components/business/RobotDrawerContent.vue";
import Clock from "./components/base/Clock.vue";

const globalInfo = namespace("globalInfo");
@Component({
  components: {
    Drawer,
    RobotDrawerContent,
    Clock,
  },
})
export default class App extends Vue {
  @Ref("app_container") appContainer!: HTMLElement;
  appBackgroundImage = {};
  changeBgImageTimer: any = 0;

  async refreshBackgroundImage() {
    try {
      let { data } = await Api.fetchAppBackgroundImage();
      this.appBackgroundImage = {
        background: `url(${data})`,
      };
    } catch (error) {
      // 增加默认背景
      this.appBackgroundImage = {
        background: `url(${require("./assets/image/default-bg.jpg")})`,
      };
    }
  }

  async refreshBackgroundTimer() {
    if (this.changeBgImageTimer) return;
    await this.refreshBackgroundImage();

    this.changeBgImageTimer = setInterval(() => {
      this.refreshBackgroundImage();
    }, 1000 * 60 * 1);
  }

  mounted() {
    this.refreshBackgroundTimer();
  }
  destroyed() {
    if (this.changeBgImageTimer) {
      clearInterval(this.changeBgImageTimer);
      this.changeBgImageTimer = 0;
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  color: #2c3e50;
  font-size: 0.01rem;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
}
.app-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0;
  padding: 0;
  z-index: 100;
}
.app-mask {
  position: fixed;
  height: 100%;
  width: 100%;
  background: #8581817a;
  z-index: 200;
}
.app-render {
  position: relative;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 300;
}
.app-clock {
  position: absolute;
  /* bottom: 0; */
  /* right: 0; */
}
</style>
