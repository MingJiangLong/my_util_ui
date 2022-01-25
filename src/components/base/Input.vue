<template>
  <div class="input_container">
    <div
      v-if="prefix"
      class="input_prefix"
      @click="onPrefixPress && onPrefixPress(componentValue)"
    >
      <div>
        {{ prefix }}
      </div>
    </div>
    <input
      class="input_input"
      :placeholder="placeholder"
      v-model="componentValue"
      :style="{
        'border-top-left-radius': prefix ? 0 : '0.1rem',
        'border-bottom-left-radius': prefix ? 0 : '0.1rem',
        'border-top-right-radius': suffix ? 0 : '0.1rem',
        ' border-bottom-right-radius': suffix ? 0 : '0.1rem',
      }"
    />
    <div v-if="suffix" @click="onSuffixItemPress" class="input_suffix">
      <div>
        {{ suffix }}
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Input extends Vue {
  @Prop({ type: String }) prefix?: string;
  @Prop() onPrefixPress?: (value: string) => void;
  @Prop({ type: String }) suffix?: string;
  @Prop() onSuffixPress?: (value: string) => void;

  @Prop({ type: String }) placeholder?: string;
  @Prop() onTextInput?: (value: string, key?: any) => void;

  // 这里这样设计都是为嘛动态渲染；非动态可以考虑 PropSync
  @Prop() initValue?: string;

  componentValue = "";

  @Watch("componentValue")
  onComponentValueChange(value: string) {
    this.onTextInput && this.onTextInput(value);
  }

  onSuffixItemPress() {
    this.onSuffixPress && this.onSuffixPress(this.componentValue);
  }
  mounted() {
    this.componentValue = this.initValue ?? "";
  }
}
</script>
<style scoped>
.input_container {
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 0.1rem;
}
.input_prefix {
  padding: 0 0.3rem;
  height: 100%;
  border-top-left-radius: 0.1rem;
  border-bottom-left-radius: 0.1rem;
  background: #90a3c3;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.input_suffix {
  /* padding: 0.2rem 0.3rem; */
  padding: 0 0.3rem;
  height: 100%;
  border-top-right-radius: 0.1rem;
  border-bottom-right-radius: 0.1rem;
  color: #fff;
  background: green;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.input_input {
  flex: 1;
  margin: 0;
  padding: 0;
  border: 0;
  height: 100%;
  padding: 0 0.3rem;
  font-size: 0.18rem;
}
</style>