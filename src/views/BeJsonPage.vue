<template>
  <div class="BeJson-container">
    <div class="BeJson-container-first-item">
      <textarea v-model="parsingValue" placeholder="输入待格式化json字符串" />
    </div>
    <div class="BeJson-container-second-item">
      <div id="parsed-dom-container" style="overflow-y: scroll"></div>
      <div v-if="parsedError" class="BeJson-container-error">
        {{ parsedError }}
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component
export default class BeJson extends Vue {
  UI_COLOR = {
    jsonKey: "#94bfda",
    doubleQuotation: "white",
  };

  /**
   * 待解析的值
   */
  parsingValue = "";

  /**
   * 解析错误提示
   */
  parsedError = "";

  @Watch("parsingValue", {
    immediate: true,
    deep: true,
  })
  onParsingValueChange(changeValue: string) {
    try {
      if (changeValue === "") return;
      this.parsedError = "";

      /**
       * JSON 检查格式是否正确
       */
      let paredValue = JSON.parse(changeValue);

      /**
       * 生成的节点
       */
      let resultDom = null;
      if (
        Object.prototype.toString.call(paredValue) === "[object Object]" ||
        Object.prototype.toString.call(paredValue) === "[object Array]"
      ) {
        resultDom = this.genParsedDom(paredValue);
      } else {
        // 简单类型直接展示
        resultDom = document.createElement("div");
        resultDom.innerText = `${paredValue}`;
      }

      // TODO: 已有节点移除需要防止数组坍塌
      let findDom = document.getElementById("parsed-dom-container");

      if (findDom) {
        let childNodes = findDom.childNodes;
        let childNodesLength = childNodes.length;

        // 移除已有节点
        if (childNodesLength) {
          for (let i = childNodesLength - 1; i >= 0; i--) {
            findDom.removeChild(childNodes[i]);
          }
        }
        // 将生成的节点插入
        findDom.appendChild(resultDom);
      }
    } catch (error) {
      this.parsedError = `${error}`;
    }
  }

  /**
   * 生成外壳
   * @param key 节点名字
   * @param valueType 所属数据类型
   * @param haveMore 是否有更多的key
   */
  genShell(key: string, value: any, haveMore = false) {
    let prefixDom = null;
    let suffixDom = null;
    let valueType = this.getValueType(value);
    if (valueType === "Object" || valueType === "Array") {
      prefixDom = document.createElement("div");
      suffixDom = document.createElement("div");
    } else {
      suffixDom = document.createElement("span");
      prefixDom = document.createElement("span");
    }

    let prefixPart1 = document.createElement("span"); // key
    let prefixPart2 = document.createElement("span"); // ：
    let prefixPart3 = document.createElement("span"); // {/[
    let prefixPart4 = document.createElement("img");
    prefixPart4.style.cssText =
      "display:inline-block;height:20px;width:20px;margin:0 10px";
    let suffixDomPart1 = document.createElement("span");

    if (key) {
      prefixPart2.innerText = ":";
      prefixPart1.innerText = key;
      prefixPart2.style.paddingRight = "7px";
      prefixPart2.style.paddingLeft = "3px";
    }
    if (valueType === "Object" || valueType === "Array") {
      // if (value.$$status === undefined) {
      //   value.$$status = true;
      // }

      // if (value.$$status) {
      //   prefixPart4.src = require("../assets/image/reduce.png");
      // } else {
      //   prefixPart4.src = require("../assets/image/add.png");
      // }
      prefixPart3.innerText = valueType === "Object" ? "{" : "[";
      suffixDom.innerText = valueType === "Object" ? "}" : "]";
    }

    suffixDomPart1.innerText = haveMore ? "," : "";
    suffixDomPart1.style.paddingLeft = "3px";
    suffixDom.style.color = prefixDom.style.color = "#c1c1c1";
    prefixPart2.style.color = suffixDomPart1.style.color = "white";

    prefixDom.appendChild(prefixPart1);
    prefixDom.appendChild(prefixPart2);
    prefixDom.appendChild(prefixPart3);
    if (valueType === "Object" || valueType === "Array") {
      // prefixPart4.addEventListener("click", () => {
      //   value.$$status = !value.$$status;
      // });
      // 添加打开或者关闭标签
      // prefixDom.appendChild(prefixPart4);
    }

    suffixDom.appendChild(suffixDomPart1);

    return {
      prefixDom,
      suffixDom,
    };
  }

  /**
   * 判断是否需要继续遍历
   */
  needDeep(value: any) {
    let type = this.getValueType(value);
    return type === "Array" || type === "Object";
  }

  /**
   * 获取值类型
   */
  getValueType(value: any) {
    return Object.prototype.toString.call(value).slice(8, -1);
  }
  /**
   * 生成解析节点
   * 默认是一个json字符串
   * 会通过JSON.parse校验
   */
  genParsedDom(
    values: any,
    parentDom?: HTMLElement,
    dataKey?: string,
    keyIndex = 0,
    keyCount = 0,
    tag = 1
  ) {
    let parentContainer = parentDom || document.createElement("div");
    // 如果是最外层 增加间距
    if (tag === 1) {
      parentContainer.style.margin = "20px 20px 0 20px";
    }

    // 生成子元素节点
    let childContainer = document.createElement("div");
    childContainer.style.paddingLeft = `${20}px`;
    childContainer.style.fontSize = "22px";
    childContainer.style.fontWeight = "800";

    let valuesType = this.getValueType(values);

    // 基础类型直接返回
    if (!this.needDeep(values)) {
      childContainer.innerText = `${values}`;
      childContainer.style.color = "white";
      return childContainer;
    }

    // 生成包裹shell [] / {} valuesType这里只会是复杂类型
    let shell = this.genShell(dataKey || "", values, keyIndex !== keyCount);

    // 复杂类型递归直至简单类型
    if (valuesType === "Object") {
      let keys = Object.keys(values);
      keys.forEach((key, index) => {
        let currentValue = values[key];
        if (this.needDeep(currentValue)) {
          this.genParsedDom(
            currentValue,
            childContainer,
            key,
            index,
            keys.length - 1,
            tag++
          );
        } else {
          this.appendChild(
            childContainer,
            key,
            currentValue,
            index,
            keys.length - 1
          );
        }
      });
    } else {
      values.forEach((value: any, index: number) => {
        if (this.needDeep(value)) {
          this.genParsedDom(
            value,
            childContainer,
            "",
            index,
            values.length - 1,
            tag++
          );
        } else {
          this.appendChild(childContainer, "", value, index, values.length - 1);
        }
      });
    }
    // 将生成节点添加至新child body
    parentContainer.appendChild(shell.prefixDom);
    parentContainer.appendChild(childContainer);
    parentContainer.appendChild(shell.suffixDom);

    return parentContainer;
  }
  /**
   * 添加子节点
   */
  appendChild(
    parentDom: HTMLElement,
    key?: string,
    value?: any,
    keyIndex = 0,
    keyCount = 0
  ) {
    let dom = document.createElement("div");
    dom.style.color = "#94bfda";
    dom.style.fontSize = "20px";

    let valueDom = document.createElement("span");
    valueDom.innerText = `${value}`;
    valueDom.style.color = "#c6b625";

    let valueType = this.getValueType(value);
    switch (valueType) {
      case "String":
        valueDom.innerText = `"${value}"`;
        break;
      case "Number":
        valueDom.style.color = "#bec5a8";
        break;
      case "Array":
        break;
      case "Boolean":
        valueDom.style.color = "#4c85b5";
        break;
      case "Undefined":
        valueDom.style.color = "#5191c6";

        break;
      case "Null":
        valueDom.style.color = "#5191c6";
        break;
      default:
        valueDom.style.color = "#CE9178";
    }
    const shell = this.genShell(key || "", value, keyIndex !== keyCount);
    dom.appendChild(shell.prefixDom);
    dom.appendChild(valueDom);
    dom.appendChild(shell.suffixDom);
    parentDom.appendChild(dom);
  }
}
</script>
<style scoped>
.icon {
  width: 1.8em;
  height: 1.8em;
}
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