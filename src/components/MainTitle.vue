<template>
    <div class="main_title" :style="{ color: color || 'black', ...styleAttr }">
        <slot />
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter, Mutation, State } from 'vuex-class'
@Component
export default class MainTitle extends Vue {
    @Prop(String) readonly color?: string | undefined;
    @Prop(Object) readonly styleAttr?: { [key: string]: string }
}
</script>
<style scoped>
.main_title {
    font-size: 0.2rem;
}
</style>