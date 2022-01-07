<template>
  <div class="BeJson-container">
    <div class="BeJson-container-first-item">
      <textarea v-model="parsingValue" placeholder="输入待格式化json字符串" />
    </div>
    <div class="BeJson-container-second-item">
      <div v-if="parsedError" class="BeJson-container-error">
        {{ parsedError }}
      </div>
      <div v-else id="parsed-dom-container"></div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component
export default class BeJson extends Vue {
  parsingValue = "";

  parsedValue = {};
  parsedError = "";

  generatedDom: any = "";
  @Watch("parsingValue")
  onParsingValueChange(changeValue: string) {
    try {
      this.parsedError = "";
      this.parsedValue = {};
      changeValue = `${changeValue}`;

      // 空字符串不解析
      if (!!!changeValue.trim()) return;

      let paredValue = JSON.parse(changeValue);
      if (Object.prototype.toString.call(paredValue) === "[object Object]") {
        let resultDom = this.genParsedDom(paredValue);
        let findDom = document.getElementById("parsed-dom-container");
        let childNodes = findDom?.childNodes || [];
        childNodes.forEach((v) => {
          findDom?.removeChild(v);
        });
        findDom?.appendChild(resultDom);
      }
    } catch (error) {
      this.parsedError = `${error}`;
    }
  }

  /**
   * 默认是一个json字符串
   * 会通过JSON.parse校验
   */
  genParsedDom(values: any, parentDom?: HTMLElement, key?: string) {
    let parentContainer = parentDom || document.createElement("div");

    let keys = Object.keys(values);
    if (key) {
      this.appendChild(parentContainer, `${key}: {`);
    } else {
      this.appendChild(parentContainer, "{");
    }
    keys.forEach((key) => {
      let currentValue = values[key];
      if (Object.prototype.toString.call(currentValue) === "[object Object]") {
        let tempt = this.genParsedDom(currentValue, undefined, key);
        tempt.style.marginLeft = "20px";
        parentContainer.appendChild(tempt);
      } else {
        this.appendChild(
          parentContainer,
          `${key}: `,
          currentValue,
          "div",
          "margin-left:20px"
        );
      }
    });
    this.appendChild(parentContainer, "}");
    return parentContainer;
  }

  /**
   * 添加子节点
   */
  appendChild(
    parentDom: HTMLElement,
    key?: string,
    value?: any,
    tagType = "div",
    extraStyle?: string
  ) {
    let dom = document.createElement(tagType);
    dom.style.color = "white";
    dom.style.fontSize = "20px";

    if (key) {
      let keyDom = document.createElement("span");
      keyDom.style.color = "#94bfda";
      keyDom.innerText = `${key}`;
      dom.appendChild(keyDom);
    }

    if (value) {
      let valueDom = document.createElement("span");
      valueDom.style.color = "#c6b625";
      valueDom.innerText = `${
        value instanceof Array ? JSON.stringify(value) : `${value}`
      },`;
      dom.appendChild(valueDom);
    }
    if (extraStyle) {
      dom.setAttribute("style", extraStyle);
    }
    parentDom.appendChild(dom);
  }
}
</script>
<style scoped>
.BeJson-container {
  height: 100%;
  display: flex;
  flex-direction: row;
}
.BeJson-container > div {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0.1rem;
  border-radius: 0.1rem;
}
.BeJson-container-first-item > textarea {
  flex: 1;
  font-size: 0.2rem;
  padding: 0.1rem;
  border-radius: 0.1rem;
}
.BeJson-container-second-item {
  background: black;
  color: white;
}
.BeJson-container-error {
  color: red;
  padding: 0.1rem;
}
</style>