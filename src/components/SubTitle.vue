<template>
  <div
    class="subtitle_container"
    :style="{ color: color || 'black', ...styleAttr }"
  >
    <slot></slot>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation, State } from "vuex-class";
@Component
export default class SubTitle extends Vue {
  @Prop() readonly color!: string;
  @Prop(Object) readonly styleAttr?: { [key: string]: string };
}
</script>
<style scoped>
.subtitle_container {
  font-size: 0.18rem;
}
</style>