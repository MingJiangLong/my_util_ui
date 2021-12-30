<template>
    <Modal>
        <div class="selectcontent_container" @click="close && close()">
            <div class="selectcontent_render">
                <div
                    class="selectcontent_item"
                    v-for="(item,key) in selectionArr"
                    :key="item.value"
                    :style="{
                        'border-top-left-radius': key == 0 ? '0.2rem' : 0,
                        'border-top-right-radius': key == 0 ? '0.2rem' : 0,
                        'color': key === selectIndex ? '#1693a4' : 'black'
                    }"
                    @click="onPress(key)"
                >{{ item.name }}</div>
            </div>
            <div class="selectcontent_item" style="margin-top:0.03rem" @click="close && close()">取消</div>
        </div>
    </Modal>
</template>
<script lang='ts'>
import { Component, Emit, Prop, PropSync, Vue } from 'vue-property-decorator';
import Modal from './Modal.vue';
@Component({
    components: {
        Modal
    }
})
export default class SelectContent extends Vue {
    @PropSync('onSelect') selectIndex!: number
    @Prop(Array) readonly selectionArr!: Array<any>;
    @Prop() close: (() => void) | undefined
    @Prop() onItemSelect?: (index: number) => void

    onPress(index: number) {
        this.selectIndex = index
        this.onItemSelect && this.onItemSelect(index)
    }
}
</script>
<style scoped>
.selectcontent_container {
    /* flex: 1; */
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    font-size: 0.16rem;
}
.selectcontent_item {
    height: 0.53rem;
    background: #fff;
    text-align: center;
    vertical-align: middle;
    border-bottom: 0.02rem solid #f8f8f8;
    line-height: 0.53rem;
}
.selectcontent_render {
    background: transparent;
    max-height: 60%;
    overflow-y: scroll;
}
</style>