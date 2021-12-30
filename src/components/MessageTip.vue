<template>
    <Modal v-if="isShow">
        <div class="messagetip_container">
            <div class="messagetip_render">
                <div class="message_tip_icon">
                    <svg class="icon" aria-hidden="true">
                        <use v-bind:xlink:href="type ? '#icon-dui-copy' : '#icon-cuo'" />
                    </svg>
                </div>
                <div class="messagetip_render_content">{{ message }}</div>
                <div class="messagetip_render_button" @click="close">确定</div>
            </div>
        </div>
    </Modal>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter, Mutation, State } from 'vuex-class'
import Modal from './Modal.vue'
@Component({
    components: {
        Modal
    }
})
export default class extends Vue {
    message?: string = '缺失提示语!';
    type?: boolean = true;
    isShow = false

    open(value: { message: string, type: boolean }) {
        if (value.message) this.message = value.message;
        if (typeof value.type == 'boolean') this.type = value.type
        this.isShow = true;
    }
    close() {
        this.isShow = false
    }
}
</script>
<style scoped>
.messagetip_container {
    /* background: red; */
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    font-size: 0.16rem;
}
.messagetip_render {
    background: #fff;
    width: 80%;
    min-height: 30%;
    max-height: 60%;
    border-radius: 0.1rem;
    box-shadow: 0 0 0.05rem 0.02rem #cdcdcd;
    display: flex;
    flex-direction: column;
}
.messagetip_render_content {
    flex: 1;
    word-break: break-all;
    word-wrap: break-word;
    padding: 0 0.1rem;
}
.messagetip_render_button {
    color: #8f93ad;
    height: 0.5rem;
    line-height: 0.5rem;
    border-top: 0.01rem solid #e3e1e1;
}
.message_tip_icon {
    margin: 0.2rem 0;
}
</style>