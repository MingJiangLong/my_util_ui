<!-- 
    整个组件始终维持两页数据
    使用
      <VueList :data="listData">
         <template v-slot:default="{ item: { name } }">
          <div style="color:red">{{ name }}</div>
         </template>
      </VueList>
 -->
<template>
    <div class="vuelist-container" @scroll="onScroll" ref="vuelistContainer">
        <!-- 虚拟列表 -->
        <div
            v-if="data.length"
            class="vuelist-item-container"
            :style="`height:${containerWholeHeight}px;`"
        >
            <!-- 实际渲染的数据 -->
            <div :style="{
                transform: `translateY(${offsetY}px)`
            }">
                <div v-for="(item,key) in renderData" :key="key" ref="vuelistItem">
                    <slot :item="item"></slot>
                </div>
            </div>
        </div>
        <slot v-if="!!!data.length" name="empty-page">2</slot>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class VueList extends Vue {
    @Prop({
        default() {
            return [
                { name: 'onTouchEnd1' }, { name: 'onTouchEnd2' },
                { name: 'onTouchEnd3' }, { name: 'onTouchEnd4' },
                { name: 'onTouchEnd5' }, { name: 'onTouchEnd6' },
                { name: 'onTouchEnd7' }, { name: 'onTouchEnd8' },
                { name: 'onTouchEnd9' }, { name: 'onTouchEnd10' },
                { name: 'onTouchEnd11' }, { name: 'onTouchEnd12' },
                { name: 'onTouchEnd13' }, { name: 'onTouchEnd14' },
                { name: 'onTouchEnd15' }, { name: 'onTouchEnd16' },
                { name: 'onTouchEnd17' }, { name: 'onTouchEnd18' },
                { name: 'onTouchEnd19' }, { name: 'onTouchEnd20' },
                { name: 'onTouchEnd21' }, { name: 'onTouchEnd22' },
                { name: 'onTouchEnd23' }, { name: 'onTouchEnd24' },
                { name: 'onTouchEnd25' }, { name: 'onTouchEnd26' },
                { name: 'onTouchEnd27' }, { name: 'onTouchEnd28' },
                { name: 'onTouchEnd29' }, { name: 'onTouchEnd30' },
                { name: 'onTouchEnd31' }, { name: 'onTouchEnd32' },
            ]
        }
    }) data!: Array<any>
    @Prop() containerStyle?: { [key: string]: string }
    @Prop() onTouchEnd?: () => void
    @Prop() onTouchStart?: () => void

    // 一页数据容器高度
    containerHeight = 0;

    // 元素高度
    itemHeight = 0;

    // 所有数据渲染需要的高度
    containerWholeHeight = 0

    // 一屏幕能展示的个数
    numberOfOnePage: number = 0;

    // 实际渲染的数据 取自data
    renderData: Array<any> = []


    /**
     * 滚动监听节流timer
     */
    timer = 0

    // 位移距离
    offsetY = 0

    // 滚动定时器
    scrollTimer: any = 0;

    // 触底事件监听
    touchEndTimer: any = 0;

    // 触顶事件监听
    touchStartTimer: any = 0;

    /**
     * 滚动监听
     */
    onScroll(e: any) {
        if (this.scrollTimer != 0) return;
        this.scrollTimer = setTimeout(() => {
            this.countPageItem(e)
        }, 100)
    }


    countPageItem(e: any) {

        console.log('滚动')
        let scrollTop = e.target.scrollTop; // 滚动条的宽度

        // 计算位移高度
        this.offsetY = scrollTop - (scrollTop % this.itemHeight)
        this.renderData = this.data.slice(
            Math.floor(scrollTop / this.itemHeight),
            Math.floor(scrollTop / this.itemHeight) + this.numberOfOnePage
        )

        if (this.touchEndTimer === 0 && scrollTop + this.containerHeight >= this.containerWholeHeight) {
            this.touchEndTimer = setTimeout(() => {
                clearTimeout(this.touchEndTimer)
                this.touchEndTimer = 0
                this.onTouchEnd && this.onTouchEnd()
            }, 500)
        }

        if (this.touchStartTimer === 0 && scrollTop === 0) {
            this.touchStartTimer = setTimeout(() => {
                clearTimeout(this.touchStartTimer)
                this.touchStartTimer = 0
                this.onTouchStart && this.onTouchStart()
            }, 500)
        }

        if (this.scrollTimer != 0) {
            clearTimeout(this.scrollTimer)
            this.scrollTimer = 0
        }
    }

    /**
     * 滚动监听事件
     */
    onScrollListener() {
        const scrollEle = this.getRef('vuelistContainer');
        if (!!!scrollEle) return;
        let scrollTop = scrollEle.scrollTop;// 滚动高度
        let clientHeight = scrollEle.clientHeight;// 可视区域 / 屏幕高度
        let scrollHeight = scrollEle.scrollHeight // 页面高度
        // 滚动高度+可视区域~~页面高度
        if (scrollTop + clientHeight >= scrollHeight) {
            this.onTouchEnd && this.onTouchEnd()
        } else {

        }
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = 0;
        }
    }

    /**
     * 获取节点信息
     */
    getRef(name: string) {
        let tempt = this.$refs[name] as (HTMLElement | HTMLAreaElement[] | undefined);
        if (Array.isArray(tempt)) return tempt[0];
        return tempt;
    }

    /**
     * 设置容器以及子元素高度
     * 计算一页能展示的子元素个数
     */
    setHeightAndItemNumber() {
        let container = this.getRef('vuelistContainer');
        let item = this.getRef('vuelistItem');
        if (!container || !item) {
            this.numberOfOnePage = 0
        } else {

            this.containerHeight = container.offsetHeight;
            this.itemHeight = item.offsetHeight;

            this.containerWholeHeight = this.itemHeight * this.data.length

            // 每页渲染数据 
            this.numberOfOnePage = ~~(container.offsetHeight / item.offsetHeight) + 4
        }
    }

    /**
     * 渲染一条数据
     */
    renderOneItem() {
        this.renderData = this.data.slice(0, 1);
    }

    initRenderItem() {
        this.renderData = this.data.slice(0, this.numberOfOnePage);
    }
    mounted() {

        // 列表先渲染一条数据 方便动态计算高度
        this.renderOneItem();

        // 初始化列表信息
        this.$nextTick(() => {
            this.setHeightAndItemNumber()
            this.initRenderItem()
        })
    }

}
</script>
<style scoped>
.vuelist-container {
    height: 100%;
    overflow-y: scroll;
}
.vuelist-item-container {
}
</style>