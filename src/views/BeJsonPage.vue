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
  UI_COLOR = {
    jsonKey: "#94bfda",
    doubleQuotation: "white",
  };
  parsingValue = "";

  parsedValue = {};
  parsedError = "";

  @Watch("parsingValue")
  onParsingValueChange(changeValue: string) {
    try {
      this.parsedError = "";
      this.parsedValue = {};
      let paredValue = JSON.parse(changeValue);

      let resultDom = null;
      if (
        Object.prototype.toString.call(paredValue) === "[object Object]" ||
        Object.prototype.toString.call(paredValue) === "[object Array]"
      ) {
        resultDom = this.genParsedDom(paredValue);
      } else {
        resultDom = document.createElement("div");
        resultDom.innerText = `${paredValue}`;
      }

      let findDom = document.getElementById("parsed-dom-container");
      if (findDom) {
        let childNodes = findDom.childNodes;
        console.log(childNodes);

        let childArr = childNodes.entries();

        for (let value of childArr) {
          let [index, node] = value;
          findDom.removeChild(node);
        }
        findDom.appendChild(resultDom);
      }
    } catch (error) {
      this.parsedError = `${error}`;
    }
  }

  /**
   * 生成节点外壳
   * {}  name:{}
   */
  genShell(prefix = "{", suffix = "}") {
    let prefixDom = document.createElement("div");
    let suffixDom = document.createElement("div");
    prefixDom.innerText = `${prefix}`;
    suffixDom.innerText = `${suffix}`;
    prefixDom.style.color = "white";
    suffixDom.style.color = "white";
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
  genParsedDom(values: any, parentDom?: HTMLElement, key?: string, tag = 1) {
    let parentContainer = parentDom || document.createElement("div");

    if (tag === 1) {
      parentContainer.style.margin = "20px";
    }
    let childContainer = document.createElement("div");
    childContainer.style.paddingLeft = `${tag * 20}px`;
    childContainer.style.fontSize = "22px";
    childContainer.style.fontWeight = "800";
    let valuesType = this.getValueType(values);

    if (!this.needDeep(values)) {
      childContainer.innerText = `${values}`;
      childContainer.style.color = "white";
      return childContainer;
    }

    let prefixShell = "";
    let shellSuffix = "";
    if (valuesType === "Object") {
      prefixShell = key ? `${key}: {` : "{";
      shellSuffix = "},";
    } else {
      prefixShell = key ? `${key}: [` : "[";
      shellSuffix = "],";
    }

    let shell = this.genShell(prefixShell, shellSuffix);
    parentContainer.appendChild(shell.prefixDom);

    if (valuesType === "Object") {
      let keys = Object.keys(values);
      // 主题内容
      keys.forEach((key) => {
        let currentValue = values[key];
        if (this.needDeep(currentValue)) {
          this.genParsedDom(currentValue, childContainer, key, tag++);
        } else {
          this.appendChild(childContainer, `${key}: `, currentValue);
        }
      });
    } else {
      values.forEach((value: any) => {
        if (this.needDeep(value)) {
          this.genParsedDom(value, childContainer, "", tag++);
        } else {
          this.appendChild(childContainer, "", value);
        }
      });
    }

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
    extraStyle?: string
  ) {
    let dom = document.createElement("div");
    dom.style.color = "white";
    dom.style.fontSize = "20px";

    if (key) {
      let keyDom = document.createElement("span");
      keyDom.style.color = "#94bfda";
      keyDom.innerText = `${key}`;
      dom.appendChild(keyDom);
    }

    let prefixDom = document.createElement("span");
    prefixDom.style.color = "#CE9178";
    let valueDom = document.createElement("span");
    valueDom.innerText = `${value}`;
    valueDom.style.color = "#c6b625";
    let suffixDom = document.createElement("span");
    suffixDom.style.color = "#CE9178";
    let valueType = this.getValueType(value);

    switch (valueType) {
      case "String":
        prefixDom.innerText = '"';
        suffixDom.innerText = '",';
        break;
      case "Array":
        prefixDom.innerText = "[";
        suffixDom.innerText = "],";
        break;
      case "Boolean":
        valueDom.innerText = `${value},`;
        valueDom.style.color = "red";
        break;
      case "Undefined":
        valueDom.innerText = `${value},`;
        valueDom.style.color = "blue";
        break;
      case "Null":
        valueDom.innerText = `${value},`;
        valueDom.style.color = "blue";
        break;
      default:
        valueDom.innerText = `${value},`;
        valueDom.style.color = "#CE9178";
    }
    dom.appendChild(prefixDom);
    dom.appendChild(valueDom);
    dom.appendChild(suffixDom);

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