<template>
    <div class="radius_container" @click="isActive = !!!isActive" :style="styleAttr">
        <div v-if="!!isActive" class="radius_container_active"></div>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
@Component
export default class Radius extends Vue {
    @PropSync('onRadiusPress') isActive!: boolean;
    @Prop() styleAttr?: { [key: string]: string }
}
</script>
<style scoped>
.radius_container {
    width: 0.2rem;
    height: 0.2rem;
    /* background: #ccc; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
}
.radius_container_active {
    width: 0.12rem;
    height: 0.12rem;
    background: #1693a4;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
}
</style>