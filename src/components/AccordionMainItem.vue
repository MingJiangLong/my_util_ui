<template>
    <div>
        <div
            class="accordion_main_item_container"
            @click="onMainPress && onMainPress(mainItemIndex)"
        >
            <div class="accordion_main_item_text">{{ mainItem.name }}</div>
            <svg class="icon" aria-hidden="true">
                <use v-bind:xlink:href="!mainItem.flag ? '#icon-xiangxia' : '#icon-xiangshang'" />
            </svg>
        </div>
        <template v-if="mainItem.flag">
            <AccordionSubItem
                v-for="(item,key) in sonItem"
                :key="key"
                :item="item"
                :onPress="onPress"
            ></AccordionSubItem>
        </template>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import AccordionSubItem from './AccordionSubItem.vue'
@Component({
    components: {
        AccordionSubItem
    }
})
export default class AccordionMainItem extends Vue {
    @Prop() onMainPress: ((value: any) => void) | undefined
    @Prop() onPress: ((item: any) => void) | undefined
    @Prop({ type: Number, default: 0 }) mainItemIndex!: number
    @Prop({ type: Object, default: {} }) mainItem!: any
    @Prop({ type: Array, default: [] }) sonItem!: Array<any>
}
</script>
<style scoped>
.icon {
    width: 0.25rem;
    height: 0.25rem;
    padding-right: 0.2rem;
}
.accordion_main_item_container {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #fff;
    padding: 0.12rem 0;
    font-weight: 800;
    border-bottom: 0.01rem solid #e6e6e6;
}
.accordion_main_item_text {
    flex: 1;
    text-align: left;
    font-size: 0.18rem;
    padding-left: 0.2rem;
}
</style>