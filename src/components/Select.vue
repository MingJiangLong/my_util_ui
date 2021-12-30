<template>
    <div>
        <div class="select_container" @click="showContent = !showContent">
            <div class="select_caption">{{ caption }}</div>
            <p v-if="isRequire" class="select_warn">*</p>
            <input
                class="select_input"
                readonly
                required
                :placeholder="placeholder"
                :value="typeof componentValue === 'number' ?
                selectionArr[componentValue] ? selectionArr[componentValue].name : '' : ''"
            />
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiayiye" />
            </svg>
        </div>
        <SelectContent
            v-if="showContent"
            :selectionArr="selectionArr"
            :onSelect.sync="componentValue"
            :close="close"
        ></SelectContent>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import SelectContent from './SelectContent.vue'
@Component({
    components: {
        SelectContent
    }
})
export default class Select extends Vue {
    showContent = false
    @Prop({ default: false }) isRequire!: boolean;
    @Prop({ type: String, default: '标题' }) caption!: string;
    @Prop({ type: String, default: '请选择' }) placeholder!: string;
    @Prop() dataKey?: any

    @Prop({
        type: Array,
        default: () => [{ name: 'hello', value: 1 }, { name: 'world', value: 2 }]
    }) selectionArr!: Array<any>

    @Prop({ type: Boolean, default: true }) closeAfterSelect!: boolean


    // 主要是为嘛渲染列表入参都统一
    @Prop() initValue?: number
    componentValue = -1
    @Prop() onValueChange?: (value: number, key?: any) => void

    @Watch('componentValue')
    onComponentValueChange(value: number) {
        this.onValueChange && this.onValueChange(value, this.dataKey)
        if (this.closeAfterSelect) {
            this.showContent = false
        }
    }


    /**
     * 关闭弹窗
     */
    close() {
        this.showContent = false
    }
    mounted() {
        this.componentValue = this.initValue ?? -1;
    }
}
</script>
<style scoped>
.select_container {
    height: 0.43rem;
    background: #fff;
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    padding: 0.1rem;
}
.select_caption {
    /* padding-left: 0.1rem; */
}
.select_warn {
    color: red;
    padding: 0 0.1rem;
}
.select_input {
    flex: 1;
    text-align: right;
}
</style>