<template>
    <div class="accordion_sub_item_container" @click="onPress && onPress(item)">
        <div class="accordion_sub_item_text">{{ item.name }}</div>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiayiye" />
        </svg>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
@Component
export default class AccordionSubItem extends Vue {
    @Prop() item!: any
    @Prop(Function) onPress: ((value: any) => void) | undefined
}
</script>
<style scoped>
.accordion_sub_item_container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.12rem 0;
    background: #fff;
    border-bottom: 0.01rem solid #e6e6e6;
}
.icon {
    width: 0.2rem;
    height: 0.2rem;
    padding-right: 0.2rem;
}

.accordion_sub_item_text {
    flex: 1;
    text-align: left;
    font-size: 0.14rem;
    padding-left: 0.2rem;
}
</style>