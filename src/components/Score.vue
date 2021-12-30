<template>
    <div class="score_container">
        <svg class="icon" aria-hidden="true" v-for="value in allScoreArr" :key="value">
            <use xlink:href="#icon-gongdan-copy" />
        </svg>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Getter, Mutation, State } from 'vuex-class'
@Component
export default class Score extends Vue {
    @Prop() readonly score!: number;
    @Prop() readonly allScore!: number

    allScoreArr: Array<number> = []
    @Watch('allScore')
    onAllScoreChange() {
        let tempt = this.allScore;
        while (tempt >= 1) {
            this.allScoreArr.unshift(tempt)
            tempt--
        }
    }
}
</script>
<style scoped>
.score_container {
    display: flex;
    flex-direction: row;
}
</style>