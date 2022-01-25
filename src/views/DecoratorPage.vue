<template>
  <div class="Decorator-container">
    <Clock></Clock>
    <div>历史上的今天</div>
    <div class="Decorator-page">
      <div>
        <div
          v-for="(value, key) in todayInHistory"
          :key="key"
          class="Decorator-card"
        >
          <div>
            {{ value.date }}
          </div>
          <div>
            {{ value.title }}
          </div>
        </div>
      </div>
      <div id="joke">
        <div v-if="joke">
          <div>{{ joke.type }}</div>
          <div>{{ joke.title }}</div>
          <div v-html="joke.content"></div>
          <button @click="initJoke">换一个</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Api from "@/api/api";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, Getter, Mutation, namespace, State } from "vuex-class";
import Clock from "../components/base/Clock.vue";
const globalInfo = namespace("globalInfo");
@Component({
  components: {
    Clock,
  },
})
export default class DecoratorPage extends Vue {
  @globalInfo.Action fetchTodayInHistory!: () => Promise<any>;
  @globalInfo.State todayInHistory!: { date: string; title: string }[];
  joke: any = null;

  async initJoke() {
    try {
      let { data } = await Api.getJoke();
      this.joke = data;
    } catch (error) {}
  }
  mounted() {
    this.fetchTodayInHistory();
    this.initJoke();
  }
}
</script>
<style scoped>
.Decorator-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  /* border-radius: 0.1rem; */
}
.Decorator-page {
  flex: 1;
  margin: 0.5rem;
  display: flex;
  flex-direction: row;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE 10+ */
}
.Decorator-page::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.Decorator-page > div:first-child {
  flex: 3;
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE 10+ */
}

.Decorator-page > div:last-child {
  flex: 1;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE 10+ */
}
.Decorator-page > div::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.Decorator-card {
  margin-bottom: 8px;
}
</style>