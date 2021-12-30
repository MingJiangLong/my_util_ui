<template>
    <div class="container">
        <div class="icon_container" @click="onBack">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-weibiaoti--" />
            </svg>
        </div>
        <MainTitle :styleAttr="{ textAlign: 'center', flex: 1, marginLeft: '-.38rem' }">{{ title }}</MainTitle>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter, Mutation, State } from 'vuex-class'
import MainTitle from './MainTitle.vue';
@Component({
    components: {
        MainTitle
    }
})
export default class HeadNav extends Vue {
    @Prop(String) readonly title!: string;

    onBack() {
        this.$router.go(-1)
        // 需不需要做特殊处理
    }
}
</script>
<style scoped>
.container {
    /* background: red; */
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #fff;
    flex: 1;
}
.icon {
    width: 0.2rem;
    height: 0.2rem;
    fill: currentColor;
    /* vertical-align: 0.1em; */
    /* vertical-align: .225em; */
    padding: 0.1rem 0.1rem;
    overflow: hidden;
}
.icon_container {
    width: 0.4rem;
    height: 0.4rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 400;
}
</style>