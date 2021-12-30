<template>
  <div class="process_container">
    <template>
      <div
        class="process_item_group"
        v-for="(value, key) in statusArr"
        :key="key"
        :style="key != statusArr.length - 1 ? { flex: 1 } : null"
      >
        <div class="process_radius_group" @click="status = value.value">
          <Radius :onRadiusPress="value.value <= status"></Radius>
          <div class="process_name" :style="{ color: value.value <= status ? '#1693a4' : '#ccc' }">
            {{ value.alise }}
          </div>
        </div>
        <div class="process_line" :style="value.value > status - 1 ? { background: '#ccc' } : null"></div>
      </div>
    </template>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
import Radius from './Radius.vue'
@Component({
  components: {
    Radius,
  },
})
export default class Process extends Vue {
  @PropSync('onProcessPress', {
    type: Number,
    default: 1,
  })
  status!: number
  @Prop({
    type: Array,
    default: () => [
      {
        alise: '待指派',
        name: '', //后端的value
        value: 1,
      },
      {
        alise: '处理中',
        name: '',
        value: 2,
      },
      {
        alise: '已完成',
        name: '',
        value: 3,
      },
      {
        alise: '已关闭',
        name: '',
        value: 4,
      },
    ],
  })
  statusArr!: Array<any>
}
</script>
<style scoped>
.process_container {
  display: flex;
  flex-direction: row;
  height: 0.57rem;
  /* align-items: center; */
  background-color: white;
  border-radius: 0;
  padding: 0 0.2rem 0.15rem;
}

.process_item_group {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.process_item_group_extra {
  flex: 1;
}
.process_line {
  flex: 1;
  height: 0.05rem;
  background: #1693a4;
}
.process_radius_group {
  position: relative;
}
.process_name {
  position: absolute;
  width: 0.6rem;
  font-size: 0.14rem;
  top: 0.22rem;
  left: -0.2rem;
}
</style>