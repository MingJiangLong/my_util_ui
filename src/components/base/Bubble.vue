<template>
  <span
    class="Bubble-container"
    :style="
      active === content
        ? {
            background: 'blue',
            color: '#fff',
          }
        : {
            background: '#fff',
            color: '#111',
          }
    "
    @click="onBubbleSelect && onBubbleSelect(active === content ? '' : content)"
    >{{ content }}</span
  >
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component
export default class Bubble extends Vue {
  @Prop() content!: string;
  @Prop() onBubbleSelect?: (value: string) => void;
  @Prop({ default: false, required: true }) active!: boolean;
  //   @Watch("active")
  //   onChoice(value: boolean) {
  //     if (value && this.onBubbleSelect) {
  //       this.onBubbleSelect(this.content);
  //     }
  //     if (!!!value && this.onBubbleSelect) {
  //       this.onBubbleSelect("");
  //     }
  //   }
}
</script>
<style scoped>
.Bubble-container {
  display: inline-block;
  height: 0.5rem;
  line-height: 0.5rem;
  padding: 0 0.3rem;
  border-radius: 0.5rem;
  margin: 0.1rem;
}
</style>