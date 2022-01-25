<template>
  <div class="Barcode-container">
    <Input
      prefix="输入待生成的条形码"
      suffix="发送"
      :onSuffixPress="genBarcode"
    ></Input>
    <div class="Barcode-image-area">
      <!-- <img :src="qrImage" v-if="qrImage" class="Barcode-image" /> -->
      <img id="barcode" />
      <div>{{ qrStr }}</div>
    </div>
  </div>
</template>
<script lang='ts'>
import Http, { ResponseData } from "@/api/http";
import Input from "@/components/base/Input.vue";
import JsBarcode from "jsbarcode";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  components: {
    Input,
  },
})
export default class Barcode extends Vue {
  qrStr = "";
  qrImage = "";
  async genBarcode(text: string) {
    JsBarcode("#barcode", text);
  }
}
</script>
<style scoped>
.Barcode-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.Barcode-image-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  margin: 0.5rem 0;
}

.Barcode-image {
  width: 3.2rem;
  height: 3.2rem;
}
</style>