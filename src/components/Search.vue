<template>
    <div class="search_container">
        <input
            class="search_input_container"
            :placeholder="placeholder"
            v-model="value"
            @keyup.enter="onInputEnterUp"
        />
    </div>
</template>
<script lang='ts'>
import { Component, Prop, PropSync, Vue, Watch } from 'vue-property-decorator';
@Component
export default class Search extends Vue {
    // @PropSync("onTextChange") value: string | undefined
    @Prop({ type: String, default: '请输入搜索值' }) readonly placeholder!: string
    @Prop() onValueChange?: (value: any) => void
    @Prop() onEnterUp?: (value: any) => Promise<void>
    value: string = ''

    @Watch('value')
    onComponentValueChange(value: any) {
        this.onValueChange && this.onValueChange(value)
    }

    onInputEnterUp() {
        if (this.value && this.onEnterUp) {
            this.onEnterUp(this.value)
            this.value = ''
        }
    }
}
</script>
<style scoped>
.icon {
    height: 0.2rem;
    width: 0.2rem;
}
.search_container {
    background: #fff;
    display: flex;
    flex-direction: row;
    height: 1rem;
    align-items: center;
    padding: 0 0.1rem;
}
.search_input_container {
    border: 0;
    margin: 0;
    padding: 0;
    flex: 1;
    /* background: #F6F6F6; */
    height: 0.6rem;
    margin-right: 0.1rem;
    border-top-right-radius: 0.05rem;
    border-bottom-right-radius: 0.05rem;
    background: #f6f6f6;
    padding: 0 0.1rem;
    font-size: 0.18rem;
}
.search_icon {
    height: 0.4rem;
    margin-left: 0.1rem;
    border-top-left-radius: 0.05rem;
    border-bottom-left-radius: 0.05rem;
    background: #f6f6f6;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 0.1rem;
}
</style>