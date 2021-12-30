<template>
    <div class="Clock-container">
        <div class="Clock-calender">
            <div class="Clock-yearandmonth">
                <span>{{ yearAndMonth }}</span>
            </div>
            <div class="Clock-date">
                <span>{{ date }}</span>
            </div>
            <div class="Clock-day">
                <span>{{ day }}</span>
            </div>
            <!-- <p class="Clock-extra">十月十八</p> -->
        </div>
        <div class="Clock-time">
            <span>{{ time }}</span>
        </div>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Getter, Mutation, State } from 'vuex-class'
@Component
export default class Clock extends Vue {
    @Prop() private msg!: string;

    dateInstance: Date = new Date()
    yearAndMonth = ''
    date = ''
    day = ''
    time = ''
    timer: any = 0;

    dayMap: any = {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        0: '日',
    }

    @Watch('dateInstance')
    onDateChange(value: Date) {
        const month = value.getMonth() + 1;
        const date = value.getDate();
        const hours = value.getHours();
        const mins = value.getMinutes()
        const seconds = value.getSeconds()
        this.yearAndMonth = `${value.getFullYear()}年${month >= 10 ? '' : 0}${month}月`
        this.date = `${date >= 10 ? '' : 0}${date}`;
        this.day = `星期${this.dayMap[value.getDay()]}`
        this.time = `${hours >= 10 ? '' : 0}${hours}:${mins >= 10 ? '' : 0}${mins}:${seconds >= 10 ? '' : 0}${seconds}`
    }
    mounted() {
        this.timer = setInterval(() => {
            this.dateInstance = new Date()
        }, 1000)
    }

    destroyed() {
        clearInterval(this.timer)
    }
}
</script>
<style scoped>
.Clock-container {
    background: transparent;
    width: 1.7rem;
    text-align: center;
    border-top-right-radius: 0.1rem;
    border-top-left-radius: 0.1rem;
}
.Clock-calender {
    width: 1.7rem;
    height: 2rem;
    background: white;
    border-radius: 0.1rem;
    display: flex;
    flex-direction: column;
}
.Clock-yearandmonth {
    background: #b9b6ec;
    padding: 0.1rem 0;
    border-top-right-radius: 0.1rem;
    border-top-left-radius: 0.1rem;
}
.Clock-date {
    font-weight: 800;
    font-size: 0.7rem;
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.Clock-day {
    padding: 0.1rem 0;
    background: #b9b6ec;
    border-bottom-right-radius: 0.1rem;
    border-bottom-left-radius: 0.1rem;
}
.Clock-time {
    font-size: 0.35rem;
    color: #00008b;
}
</style>