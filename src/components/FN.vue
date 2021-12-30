<template>
    <div class="FN-container">
        <div>{{ name }}</div>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
@Component
export default class FN extends Vue {

    @Prop({
        default: '../assets/image/qrcode.png'
    }) imgUrl!: string

    @Prop({ default: '二维码生成' }) name!: string

}
</script>
<style scoped>
.FN-container {
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    border: 0.01rem solid white;
    background: url("../assets/image/qrcode.png");
    background-size: auto 100%;
    margin: 0.2rem;
}
</style>