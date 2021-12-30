<template>
  <div class="ProcessManage-container">
    <h1>项目管理</h1>
    <h3>项目数:{{ processArr.length }}</h3>
    <h3>运行中:{{ 0 }}</h3>

    <div class="ProcessManage-body">
      <div
        v-for="(item, k) in processArr"
        :key="k"
        class="ProcessManage-table-item"
      >
        <row>
          <h2>项目名: {{ item.name }}</h2>
          <img
            src="../assets/image/start.png"
            class="ProcessManage-send"
            @click="sendCmd"
          />
          <img src="../assets/image/stop.png" class="ProcessManage-send" />
        </row>
        <h3>本机储存位置: {{ item.location }}</h3>
        <h3>运行命令: {{ item.branch }}</h3>

        <h2>项目信息</h2>
        <h3>运行端口: {{ item.port }}</h3>
        <h3>GIT: {{ item.git }}</h3>
        <h3>分支: {{ item.branch }}</h3>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Input from "@/components/base/Input.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { ProcessArr } from "@/config/PROCESS";
import Row from "@/components/base/Row.vue";
@Component({
  components: {
    Input,
    Row,
  },
})
export default class ProcessManagePage extends Vue {
  processArr = ProcessArr;

  sendCmd() {
    const cmd = new ActiveXObject("WScript.Shell");
    /*
        命令参数说明

        cmd.exe /c dir 是执行完dir命令后关闭命令窗口。

        cmd.exe /k dir 是执行完dir命令后不关闭命令窗口。

        cmd.exe /c start dir 会打开一个新窗口后执行dir指令，原窗口会关闭。

        cmd.exe /k start dir 会打开一个新窗口后执行dir指令，原窗口不会关闭。
    */
    alert("???");
    cmd('cmd.exe /k echo lance  shuai  i love  !')
  }
}
</script>
<style scoped>
.ProcessManage-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.ProcessManage-body {
  flex: 1;
  overflow-y: scroll;
}
.ProcessManage-body::-webkit-scrollbar {
  display: none;
}
.ProcessManage-table-item {
  border-bottom: 1px solid red;
}
.ProcessManage-send {
  width: 35px;
  height: 35px;
  padding: 0 10px;
}
</style>