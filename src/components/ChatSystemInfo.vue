<template>
  <div class="container">
    <div class="systeminfo_msg">{{ msg }}</div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Getter, Mutation, State } from 'vuex-class'
@Component
export default class ChatSystemInfo extends Vue {
  @Prop() private msg!: string
}
</script>
<style scoped>
.container {
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
  display: flex;
  justify-content: center;
}
.systeminfo_msg {
  max-width: 90%;
  white-space: pre-line;
  border-radius: 0.05rem;
  background: #ccc;
  color: #fff;
  padding: 0.05rem;
  font-size: 0.12rem;
}
</style>