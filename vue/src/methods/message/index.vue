<template>
  <transition @after-leave="handleAfterLeave" name="fade">
    <div
      class="message"
      v-show="visible"
      @mouseleave="startTimer"
      @mouseenter="clearTimer"
      :style="positionStyle"
      :class="typeClass"
    >
      <slot>
        <p>{{ message }}</p>
      </slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "message",
  data() {
    return {
      duration: 3000,
      message: "",
      verticalOffset: 20,
      visible: false,
      closed: false,
      onClose: null,
      type: "info"
    };
  },
  methods: {
    handleAfterLeave() {
      this.$destroy(true);
      document.body.removeChild(this.$el);
    },
    close() {
      this.closed = true;
      if (typeof this.onClose === "function") {
        this.onClose();
      }
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
    clearTimer() {
      clearTimeout(this.timer);
    }
  },
  computed: {
    positionStyle() {
      return {
        bottom: this.verticalOffset + "px"
      };
    },
    typeClass() {
      return ["message-" + this.type];
    }
  },
  watch: {
    closed(v) {
      if (v) {
        this.visible = false;
      }
    },
    type(v) {
      console.log(v);
    }
  },
  mounted() {
    this.startTimer();
  }
};
</script>
<style lang="scss">
.message {
  position: fixed;
  bottom: 20px;
  right: 10px;
  width: 300px;
  height: 20px;
  padding: 10px;
  background: green;
  border-radius: 5px;
  color: #909399;
  font-size: 14px;
  line-height: 1.4;
  transition: opacity 0.5s, transform 0.5s, bottom 0.5s;
}
.message-info {
  background-color: #edf2fc;
}
.message-success {
  background-color: #edf2fc;
  color: #67c23a;
}
.message-warning {
  background-color: mix(#ffffff, #e6a23c, 90%);
  color: #e6a23c;
}
.message-error {
  background-color: mix(#ffffff, #f56c6c, 90%);
  color: #f56c6c;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translate(0, 100%);
}
</style>
