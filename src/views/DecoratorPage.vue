<template>
    <div class="Decorator-container">
        <Clock></Clock>
        <div class="Decorator-page">22</div>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter, Mutation, State } from 'vuex-class'
import Clock from '../components/base/Clock.vue'
@Component({
    components: {
        Clock
    }
})
export default class DecoratorPage extends Vue {
    @Prop() private msg!: string;

}
</script>
<style scoped>
.Decorator-container {
    height: 100%;
    /* border-radius: 0.1rem; */
}
.Decorator-page {
    background: green;
    margin: 0.5rem;
}
</style>