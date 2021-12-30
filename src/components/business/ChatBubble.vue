<template>
  <div>
    <div class="chatbubble_outer_container">
      <div
        class="chatbubble_container"
        :style="{ justifyContent: model == 'right' ? 'flex-end' : 'flex-start' }"
      >
        <!-- 头像 -->
        <img src="../../assets/image/robot2.jpeg" class="chatbubble_img" v-if="model === 'left'" />
        <!-- 聊天框 -->
        <div
          :style="{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '80%',
            alignItems: model === 'left' ? 'flex-start' : 'flex-end',
          }"
        >
          <div
            :style="{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: model === 'left' ? 'flex-start' : 'flex-end',
            }"
          >
            <div v-if="model === 'left'" class="chatbubble_bubble_left"></div>
            <!-- 聊天内容 -->
            <div
              class="chatbubble_content"
              :style="{
                background: model === 'left' ? '#fff' : '#1693a4',
                color: model === 'left' ? '#111' : '#fff',
              }"
            >{{ content }}</div>
            <div class="chatbubble_bubble_right" v-if="model === 'right'"></div>
          </div>
        </div>
        <img src="../../assets/image/me.jpg" class="chatbubble_img" v-if="model === 'right'" />
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  components: {},
})
export default class ChatBubble extends Vue {
  @Prop({ type: String, default: 'left' }) readonly model!: 'left' | 'right'
  @Prop({ type: String, default: '聊天内容dddzzzzzzzzzzzzzzz' }) readonly content!: string
  mounted() { }
}
</script>
<style scoped>
.chatbubble_title_left {
  margin-left: 0.1rem;
  text-align: left;
  margin-top: 0.1rem;
  width: 100%;
  font-size: 0.14rem;
}
.chatbubble_title_right {
  margin-right: 0.1rem;
  text-align: right;
  margin-top: 0.1rem;
  width: 100%;
  font-size: 0.14rem;
}
.chatbubble_outer_container {
  display: flex;
  flex-direction: row;
  padding: 0.06rem;
}
.chatbubble_container {
  display: flex;
  flex-direction: row;
  flex: 1;
}
.chatbubble_content {
  border-radius: 0.08rem;
  margin-top: 0.08rem;
  padding: 0.1rem 0.2rem;
  word-break: break-all;
  word-wrap: break-word;
  font-size: 0.18rem;
  min-height: 0.6rem;
  text-align: left;
}
.chatbubble_content >>> p {
  margin: 0;
}
.chatbubble_bubble_left {
  position: relative;
  top: 0.2rem;
  width: 0;
  height: 0;
  border-top: 0.1rem solid #fff;
  border-left: 0.1rem solid transparent;
}
.chatbubble_bubble_right {
  position: relative;
  top: 0.2rem;
  width: 0;
  height: 0;
  border-top: 0.1rem solid #1693a4;
  border-right: 0.1rem solid transparent;
}
.chatbubble_img_bg {
  margin-top: 0.14rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.25rem;
  background-color: #ddd;
}
.chatbubble_img {
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
}
</style>