<template>
  <div class="tabs_container">
    <div class="tab_item" v-for="(value, key) in tabArr" :key="key">
      <div style="display: inline-block" @click="activeTab = key">
        <SubTitle :styleAttr="{ color: key === activeTab ? '#1693a4' : 'black' }">{{ value }}</SubTitle>
        <div class="tabs_tag" :style="{ background: key === activeTab ? '#1693a4' : 'transparent' }"></div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, PropSync, Vue, Watch } from 'vue-property-decorator'
import { Getter, Mutation, State } from 'vuex-class'
import SubTitle from './SubTitle.vue'
@Component({
  components: {
    SubTitle,
  },
})
export default class Tabs extends Vue {
  @Prop({
    type: Array,
    default: ['沟通记录', '工单信息'],
  })
  readonly tabArr!: Array<string>
  @Prop() initActive?: number
  @Prop() onValueChange?: (value: number) => void
  // @PropSync('onTabActive', { type: Number, default: 0 }) activeTab!: number

  activeTab = 0

  @Watch('activeTab')
  onActiveTabChange(value: number) {
    this.onValueChange && this.onValueChange(value)
  }
  mounted() {
    if (this.initActive) {
      this.activeTab = this.initActive
    }
  }
}
</script>
<style scoped>
.tabs_container {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 0.4rem;
  background: #fff;
}
.tabs_tag {
  height: 0.02rem;
  margin-top: 0.1rem;
  background: #1693a4;
}
.tab_item {
  flex: 1;
}
</style>