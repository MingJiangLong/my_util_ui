<template>
  <div class="HomePage-container">
    <div class="HomePage-top-part">
      <router-view></router-view>
    </div>
    <div class="HomePage-bottom-part">
      <div v-for="(value, key) in fns_arr" :key="key" class="HomePage-item">
        <img
          :src="iconMap[value.imageAlias]"
          @click="$router.push(value.route)"
        />
        <div>{{ value.name }}</div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { FNS_ARR } from "@/config/UI_CONFIG";
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import Drawer from "../components/base/Drawer.vue";
@Component({
  components: {
    Drawer,
  },
})
export default class HomePage extends Vue {
  fns_arr = FNS_ARR;
  iconMap: any = {
    QrCode: require("../assets/image/qrcode.png"),
    BeJson: require("../assets/image/bejson.jpg"),
    ProcessManage: require("../assets/image/pm.png"),
  };

  onItemPress() {
    alert("??");
    // $router.push(value.route)
  }
}
</script>
<style scoped>
.HomePage-container {
  font-size: 0.18rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}
.HomePage-top-part {
  flex: 1;
  background: transparent;
  overflow-y: hidden;
  margin: 0.5rem;
}
.HomePage-top-part::-webkit-scrollbar {
  display: none;
}
.HomePage-bottom-part {
  display: flex;
  flex-direction: row;
  /* overflow-x: scroll; */
  /* overflow: scroll; */
}
.HomePage-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.HomePage-item img {
  width: 1rem;
  height: 1rem;
  border-radius: 100%;
  border: 0.01rem solid white;
  margin: 0.2rem;
  background: #8071c2;
}
</style>