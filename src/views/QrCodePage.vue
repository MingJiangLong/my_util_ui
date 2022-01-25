<template>
  <div class="QrCode-container">
    <Input
      prefix="输入待生成的二维码"
      suffix="发送"
      :onSuffixPress="genQRcode"
    ></Input>
    <div class="QrCode-image-area">
      <img :src="qrImage" v-if="qrImage" class="QrCode-image" />
      <div>{{ qrStr }}</div>
    </div>
  </div>
</template>
<script lang='ts'>
import Http, { ResponseData } from "@/api/http";
import Input from "@/components/base/Input.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Mutation, State } from "vuex-class";
@Component({
  components: {
    Input,
  },
})
export default class QrCode extends Vue {
  qrStr = "";
  qrImage = "";
  async genQRcode(text: string) {
    const {
      code,
      data: { url, text: inputText },
      message,
    } = await Http.fetch<ResponseData<{ text: string; url: string }>>(
      "/image/genQrCode",
      {
        text,
      }
    );
    this.qrImage = url;
    this.qrStr = text;
  }
}
</script>
<style scoped>
.QrCode-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.QrCode-image-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  margin: 0.5rem 0;
}

.QrCode-image {
  width: 3.2rem;
  height: 3.2rem;
}
</style>