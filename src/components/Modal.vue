<template>
    <div class="model_container" @click="close && close()" >
        <slot></slot>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class Modal extends Vue {
    @Prop() close: (() => void) | undefined
}
</script>
<style scoped>
.model_container {
    position: fixed;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    /* position: fixed; */
    z-index: 999;
    /* background: pink; */
    background: #bea6a696;
    top: 0;
    left: 0;
}
</style>