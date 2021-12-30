<template>
    <div class="button_container" :style="styleAttr" @click="onPress && onPress()">
        <slot></slot>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter, Mutation, State } from 'vuex-class'
@Component({
    components: {}
})
export default class Button extends Vue {
    @Prop() readonly styleAttr: { [key: string]: string } | undefined;
    @Prop() onPress?: () => void

}
</script>
<style scoped>
.button_container {
    background: #1693a4;
    height: 0.44rem;
    text-align: center;
    line-height: 0.44rem;
    border-radius: 0.05rem;
    color: #fff;
}
</style>