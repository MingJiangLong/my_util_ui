<template>
    <div>
        <div class="multiselect_caption_2 multiselect_caption ">
            <div>{{ caption }}</div>
            <p v-if="isRequire" class="multiselect_warn">*</p>
        </div>
        <div
            class="multiselect_container"
            v-for="(item,key) in selectionArr"
            :key="key"
            @click="onPressItem(key)"
        >
            <div class="multiselect_caption">
                <div>{{ item.name }}</div>
            </div>

            <RadiusWithCheck
                v-if="componentValue.includes(key)"
                :styleAttr="{ border: '.02rem solid #1693a4', background: '#1693a4' }"
                :onRadiusPress="true"
            ></RadiusWithCheck>
            <RadiusWithCheck
                v-else
                :styleAttr="{ border: '0.02rem solid #a4a4a4' }"
                :onRadiusPress="false"
            ></RadiusWithCheck>
        </div>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, PropSync, Vue, Watch } from 'vue-property-decorator';
import Radius from './Radius.vue';
import RadiusWithCheck from './RadiusWithCheck.vue';
@Component({
    components: {
        Radius,
        RadiusWithCheck
    }
})
export default class MultiSelect extends Vue {
    @Prop(Boolean) isRequire: boolean | undefined;
    @Prop({ type: String, default: '标题' }) caption!: string;
    @Prop() selectionArr!: Array<any>

    // 主要是为嘛渲染列表入参都统一
    @Prop() initValue?: Array<number>
    @Prop() onValueChange?: (value: Array<number>, key?: any) => void
    @Prop() dataKey?: any;
    componentValue: Array<number> = []

    onPressItem(index: number) {
        let findIndex = this.componentValue.findIndex(v => v === index);
        if (findIndex === -1) {
            this.componentValue = [...this.componentValue, index]
        } else {
            this.componentValue.splice(findIndex, 1);
        }
        this.onValueChange && this.onValueChange(this.componentValue, this.dataKey)
    }


    mounted() {
        this.componentValue = Array.isArray(this.initValue) ? this.initValue : []
    }
}
</script>
<style scoped>
.multiselect_container {
    height: 0.43rem;
    background: #fff;
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    padding-right: 0.1rem;
}
.multiselect_caption {
    padding: 0.1rem;
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #fff;
    padding-top: 0;
}
.multiselect_caption_2 {
    background: #f9f9f9;
    padding: 0.1rem;
}
.multiselect_warn {
    color: red;
    padding: 0 0.1rem;
}

.multiselect_item {
    position: relative;
    right: 0;
    width: 0.6rem;
    height: 0.2rem;
    background: #d6e9ec;
    border-radius: 0.2rem;
}
.multiselect_radius {
    width: 0.24rem;
    height: 0.24rem;
    border-radius: 0.23rem;
    top: -0.02rem;
    position: absolute;
    background: #1693a4;
}
</style>