<template>
  <div class="RobotDrawerContent-container">
    <div class="RobotDrawerContent-chat-container" ref="chat_list">
      <ChatBubble
        v-for="(value, key) in chatArr"
        :key="key"
        :content="value.content"
        :model="value.model"
      ></ChatBubble>
      <div ref="tag" style="height: 1px"></div>
    </div>
    <div>
      <Search placeholder="你想聊什么?" :onEnterUp="onEnterUp"></Search>
      <div>
        <Bubble
          :content="value"
          v-for="(value, key) in bubbleArr"
          :key="key"
          :active="activeBubble"
          :onBubbleSelect="onBubbleSelect"
        ></Bubble>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import Search from "../Search.vue";
import ChatBubble from "./ChatBubble.vue";
import Bubble from "../base/Bubble.vue";
const chatStore = namespace("chatStore");
@Component({
  components: {
    Search,
    ChatBubble,
    Bubble,
  },
})
export default class RobotDrawerContent extends Vue {
  @chatStore.Action("sendMessageToRobot") sendMsg2Robot!: (
    message: string
  ) => Promise<void>;
  @chatStore.State chatArr!: { content: string; model: "left" | "right" }[];

  @Ref("chat_list") chatListDom!: HTMLElement;
  @Ref("tag") dispalyTag!: HTMLElement;
  onEnterUp(value: string) {
    let str = value;
    str = `${this.activeBubble}${value}`;
    this.sendMsg2Robot(str);
  }

  bubbleArr = ["翻译", "天气"];
  activeBubble = "";

  @Watch("chatArr")
  onChatContentChange() {
    // 滚动到末尾
    Vue.nextTick(() => {
      this.dispalyTag.scrollIntoView();
    });
  }

  onBubbleSelect(key: string) {
    this.activeBubble = key;
  }
}
</script>
<style scoped>
.RobotDrawerContent-container {
  height: 100%;
  width: 100%;
  font-size: 0.18rem;
  display: flex;
  flex-direction: column;
  background: #a6a5b6;
}
.RobotDrawerContent-chat-container {
  flex: 1;
  padding: 0.1rem;
  overflow-y: scroll;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.RobotDrawerContent-chat-container::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>