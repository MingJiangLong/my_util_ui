<template>
    <div class="flatlist_container">
        <div class="render_container" id="render_container" @scroll="onScroll">
            <div v-if="false" class="flat_list_empty"></div>
            <template v-if="data.length">
                <!-- 
                这里需要预置各种item类型 
                  o(╥﹏╥)o也太难受了 
                // !item只需要一个data Prop
                // !每个item组件记得要在下面注册
                -->
                <component v-for="(item,key) in data" :key="key" :is="type" :data="item"></component>
            </template>
            <template v-else>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-wushuju" />
                </svg>
                <p style="margin:0">暂无数据...</p>
            </template>
            <div v-if="isTouchEnd" class="flat_list_empty"></div>
        </div>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import WorkOrderCard from './WorkOrderCard.vue';
@Component({
    components: {
        WorkOrderCard
    }
})
export default class FlatList extends Vue {
    @Prop({ required: true }) data!: Array<any>
    @Prop({ required: true }) type!: string
    renderData: Array<any> = [] // 预置参数 可用作列表优化

    @Prop() onTouchEnd?: () => void
    timer: any = null
    isTouchEnd = false

    onScroll(event: any) {
        console.log(event)
        if (this.timer) return;
        this.timer = setTimeout(this.onScrollListener, 1000)
    }

    onScrollListener() {
        const scrollEle = document.getElementById('render_container');
        if (!!!scrollEle) return;
        let scrollTop = scrollEle.scrollTop;// 滚动高度
        let clientHeight = scrollEle.clientHeight;// 可视区域 / 屏幕高度
        let scrollHeight = scrollEle.scrollHeight // 页面高度
        // 滚动高度+可视区域~~页面高度
        if (scrollTop + clientHeight >= scrollHeight) {
            this.isTouchEnd = true
            this.onTouchEnd && this.onTouchEnd()
        } else {
            this.isTouchEnd = false
        }
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = 0;
        }
    }
}
</script>
<style scoped>
.flatlist_container {
    position: relative;
    /* background: red; */
    width: 100%;
    height: 100%;
    /* overflow-y: scroll; */
}
.flat_list_empty {
    background-color: transparent;
    height: 0.3rem;
}
.render_container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow-y: scroll;
}
.icon {
    width: 1rem;
    height: 1rem;
    margin-top: 0.8rem;
}
</style>