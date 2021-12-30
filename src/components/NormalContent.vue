<template>
    <div class="normal_container" :style="{ color: color || 'black', ...styleAttr }">
        <slot></slot>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter, Mutation, State } from 'vuex-class'
@Component
export default class NormalContent extends Vue {
    @Prop() readonly color?: string;
    @Prop(Object) readonly styleAttr?: { [key: string]: string }
}
</script>
<style scoped>
.normal_container {
    font-size: 0.16rem;
}
</style>