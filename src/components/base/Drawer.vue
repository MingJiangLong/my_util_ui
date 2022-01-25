<template>
  <div class="Drawer-container">
    <div :class="[isDrawerOpen ? 'Drawer-open' : 'Drawer-close']">
      <slot></slot>
    </div>
    <img
      src="../../assets/image/expand.png"
      class="Drawer-collapse"
      @click="isDrawerOpen = false"
      v-if="isDrawerOpen"
    />
    <img
      v-if="!isDrawerOpen"
      src="../../assets/image/expand.png"
      class="Drawer-expand"
      @click="isDrawerOpen = true"
    />
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Drawer extends Vue {
  isDrawerOpen: boolean = false;
  openDrawer() {
    this.isDrawerOpen = true;
  }
}
</script>
<style scoped>
.Drawer-container {
  position: fixed;
  z-index: 900;
  font-size: 0.18rem;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.Drawer-open {
  height: 100%;
  overflow: hidden;
  animation: Drawer-open 1s;
  background: #fff;
  width: 90%;
}
.Drawer-close {
  height: 100%;
  overflow: hidden;
  animation: Drawer-close 1s;
  background: transparent;
  width: 0;
}
.Drawer-expand {
  width: 0.4rem;
  height: 0.4rem;
}
.Drawer-collapse {
  width: 0.4rem;
  height: 0.4rem;
  transform: rotate(180deg);
}
.Drawer-expand:hover::after {
  content: "和菲菲聊天";
  position: relative;
  right: 0;
  left: 0;
  width: 1rem;
  height: 1rem;
}
@keyframes Drawer-open {
  from {
    width: 0;
    background: transparent;
  }
  to {
    width: 90%;
    background: #fff;
  }
}
@keyframes Drawer-close {
  from {
    width: 90%;
    background: #fff;
  }
  to {
    width: 0;
    background: transparent;
  }
}
</style>