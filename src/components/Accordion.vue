<template>
    <div class="accordion_container">
        <AccordionMainItem
            v-for="(value,key) in accordionData"
            :key="key"
            :sonItem="value.item"
            :mainItem="value"
            :onPress="onItemPress"
            :onMainPress="onMainPress"
            :mainItemIndex="key"
        ></AccordionMainItem>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import AccordionMainItem from './AccordionMainItem.vue';
@Component({
    components: {
        AccordionMainItem,
    }
})
export default class Accordion extends Vue {
    @Prop() accordionData!: any
    @Prop() onMainPress: ((value: any) => void) | undefined
    @Prop() onItemPress: ((value: any) => void) | undefined
}
</script>
<style scoped>
.accordion_container {
    flex: 1;
}
</style>