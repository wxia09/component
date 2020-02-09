<template>
  <div style="font-size: 30px; text-align: center; line-height: 100px;">
    点击窗口, 在右下角会有提示弹窗
  </div>
</template>

<script>
export default {
  methods: {
    handlerClik() {
      // type => warning , info(default), success, error
      // offset => 20(default), 距离底部的偏移量
      // onClose 关闭时的回调函数, 返回当前关闭组件的实例
      // 参数可以是一个字符串(message)
      // 使用时注意层级
      // 该组件思想来源于element-ui的message
      this.$message({
        type: "warning",
        message: "警告哦, 这是一个警告消息",
        offset: 20,
        onClose(component) {
          console.log(component);
        }
      });
    }
  },
  mounted() {
    setTimeout(() => {
      window.onclick = this.handlerClik;
    }, 0);
  },
  beforeRouteLeave(to, from, next) {
    window.onclick = null;
    next();
  }
};
</script>
