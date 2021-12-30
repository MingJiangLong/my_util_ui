<template>
    <div class="textarea_container">
        <div class="textarea_caption">
            <div style="flex:1">
                {{ caption }}
                <span v-if="isRequire" class="textarea_warn">*</span>
            </div>
            <div @click="onScan">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-saoyisao" />
                </svg>
            </div>
        </div>
        <textarea
            class="textarea_render_container"
            :maxlength="max"
            :placeholder="placeholder"
            v-model="componentValue"
        />
        <div v-if="max" class="textarea_tip">
            {{
                `${componentValue.length}/${max}`
            }}
        </div>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class TextArea extends Vue {
    @Prop({ default: false }) isRequire!: boolean;
    @Prop() onValueChange?: (value: any, key?: any) => void
    @Prop() initValue?: string
    @Prop({ default: 65535 }) max?: number
    @Prop({ default: '' }) placeholder?: string
    @Prop({ default: '' }) caption?: string
    @Prop() dataKey?: any
    componentValue = ''

    @Watch('componentValue')
    onComponentValueChange(value: any) {
        this.onValueChange && this.onValueChange(value, this.dataKey)
    }

    async onScan() {

    }
    mounted() {
        this.componentValue = this.initValue ?? ''
    }

}
</script>
<style scoped>
.icon {
    width: 1.5em;
    height: 1.5em;
    fill: currentColor;
    vertical-align: 0.1em;
    /* vertical-align: .125em; */
    overflow: hidden;
}
.textarea_warn {
    color: red;
    padding: 0 0.1rem;
}
.textarea_container {
    min-height: 0.5rem;
    /* border-radius: 0.1rem; */
    background: #fff;
    padding: 0.1rem;
}
.textarea_tip {
    text-align: right;
    color: #a699a6;
    font-size: 0.14rem;
}
.textarea_render_container {
    width: 100%;
    min-height: 0.5rem;
    border-radius: 0.1rem;
}
.textarea_caption {
    padding: 0.1rem 0;
    display: flex;
    flex-direction: row;
}
</style>