<template>
    <div class='Row-container'>
        <slot></slot>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Row extends Vue {}
</script>
<style scoped>
.Row-container {
   display: flex;
   flex-direction: row;
   align-items: center;
}
</style>