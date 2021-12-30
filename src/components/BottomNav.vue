<template>
    <div id="nav">
        <div class="item">
            <div @click="goPage('/')">
                <svg class="icon" aria-hidden="true">
                    <use
                        v-bind:xlink:href="activeTab === 0 ? '#icon-gongdan' : '#icon-gongdan-copy'"
                    />
                </svg>
                <div :class="activeTab == 0 ? 'focusFontColor' : 'blurFontColor'">发起工单</div>
            </div>
        </div>
        <div class="item">
            <div @click="goPage('/WorkOrderList')">
                <svg class="icon" aria-hidden="true">
                    <use v-bind:xlink:href="activeTab === 1 ? '#icon-fenlei1' : '#icon-fenlei2'" />
                </svg>
                <div :class="activeTab == 1 ? 'focusFontColor' : 'blurFontColor'">工单列表</div>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, } from 'vue-property-decorator';
@Component
export default class extends Vue {
    @Prop(Number) activeTab!: number

    goPage(path: string) {
        if (this.$route.path != path) {
            this.$router.push(path)
        }
    }
}
</script>
<style scoped >
#nav {
    display: flex;
    flex-direction: row;
    flex: 1;
}
.item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.14rem;
}
.focusFontColor {
    color: #1693a4;
    font-weight: 800;
}
.blurFontColor {
    color: #999999;
    font-weight: 500;
}
</style>