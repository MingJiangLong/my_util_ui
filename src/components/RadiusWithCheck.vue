<template>
    <div @click="isActive = !!!isActive">
        <div v-if="!!isActive" class="block_base">
            <svg class="radiuswithcheck_icon" aria-hidden="true">
                <use xlink:href="#icon-dui-copy" />
            </svg>
        </div>

        <div
            v-else
            class="radiuswithcheck_container_not_active block_base"
            @click="isActive = !!!isActive"
        ></div>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
@Component
export default class RadiusWithCheck extends Vue {
    @PropSync('onRadiusPress') isActive!: boolean;
    @Prop() styleAttr?: { [key: string]: string }
}
</script>
<style scoped>
.radiuswithcheck_icon {
    width: 0.25rem;
    height: 0.25rem;
    fill: currentColor;
    overflow: hidden;
}
.radiuswithcheck_container {
    width: 0.22rem;
    height: 0.22rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.block_base {
    width: 0.22rem;
    height: 0.223rem;
}
.radiuswithcheck_container_not_active {
    color: white;
    width: 0.22rem;
    height: 0.22rem;
    border-radius: 100%;
    border: 0.01rem solid #cccccc;
}
</style>