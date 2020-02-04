<template>
  <view class="content">
    <range-choice :list="[0, 10, 20, 30, 40, 50, 60]" v-model="vRange"/>
  </view>
</template>

<script>
  import RangeChoice from '@/components/range-choice';

  export default {
    data() {
      return {
        title: 'Hello',
        vRange: []
      }
    },
    onLoad() {

    },
    watch: {
      vRange: {
        handler(v) {
          console.log(v, '外出');
        },
        deep: true
      }
    },
    components: {
      RangeChoice
    },
    methods: {},
    mounted() {
      console.log(2);
      this.vRange[1] = 1;
    }
  }
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
