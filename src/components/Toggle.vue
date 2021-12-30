<template>
    <div class="toggle_container">
        <div class="toggle_caption">
            <div>{{ caption }}</div>
            <p v-if="isRequire" class="toggle_warn">*</p>
        </div>
        <div class="toggle_item" @click="componentValue = !componentValue">
            <div class="toggle_radius" :style="!componentValue ? { left: 0 } : { right: 0 }"></div>
        </div>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, PropSync, Vue, Watch } from 'vue-property-decorator';
import { Getter, Mutation, State } from 'vuex-class'
@Component
export default class Toggle extends Vue {
    @Prop({ default: false }) isRequire!: boolean;
    @Prop({ type: String, default: '标题' }) caption!: string;

    // 主要是为嘛渲染列表入参都统一
    @Prop() initValue?: boolean
    componentValue = false
    @Prop() dataKey?: any;
    @Prop() onValueChange?: (value: boolean, key?: any) => void

    @Watch('componentValue')
    onComponentValueChange(value: boolean) {
        this.onValueChange && this.onValueChange(value, this.dataKey)
    }

    mounted() {
        this.componentValue = !!this.initValue;
    }
}
</script>
<style scoped>
.toggle_container {
    height: 0.43rem;
    background: #fff;
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    /* padding: 0 0.1rem; */
}
.toggle_caption {
    /* padding-left: 0.1rem; */
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.toggle_warn {
    color: red;
    padding: 0 0.1rem;
}

.toggle_item {
    position: relative;
    right: 0;
    width: 0.6rem;
    height: 0.2rem;
    background: #d6e9ec;
    border-radius: 0.2rem;
}
.toggle_radius {
    width: 0.24rem;
    height: 0.24rem;
    border-radius: 0.23rem;
    top: -0.02rem;
    position: absolute;
    background: #1693a4;
}
</style>