<template>
  <view class="content">
    <range-choice
      :list="[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200]"
      v-model="vRange"
      :dpi="dpi"
    />
  </view>
</template>

<script>
import RangeChoice from "@/components/range-choice";

export default {
  data() {
    return {
      title: "Hello",
      vRange: [],
      dpi: 0
    };
  },
  onLoad() {
    let self = this;
    uni.getSystemInfo({
      success: function (res) {
        self.dpi = res.screenWidth / 750;
      }
    });
  },
  watch: {
    vRange: {
      handler(v) {
        console.log(v, "外出");
      },
      deep: true
    }
  },
  components: {
    RangeChoice
  },
  methods: {},
  mounted() {
    this.vRange = [30, 60];
  }
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200 rpx;
  width: 200 rpx;
  margin-top: 200 rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50 rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36 rpx;
  color: #8f8f94;
}
</style>
