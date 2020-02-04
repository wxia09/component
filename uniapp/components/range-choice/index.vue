<template>
  <view class="">
    <view class="text-right show-arrow" @tap="show = true">
      {{valueSync? valueSync: placeholder}}
    </view>
    <view class="cu-modal bottom-modal" :class="show?'show':''">
      <view class="cu-dialog">
        <view class="bg-white padding-xl" style="margin: auto">
          <view class="flex justify-center">
            <input type="text" v-model="start" class="border-bottom text-df text-right padding-right-xl"
                   style="width: 400rpx; height: 50rpx" @blur="startBlur"/>
            <text style="line-height: 1.8;">-</text>
            <input type="text" v-model="end" class="border-bottom text-df text-left padding-left-xl"
                   style="width: 400rpx; height: 50rpx" @blur="endBlur"/>
          </view>
          <view class="flex justify-between">
            <view style="width: 50%; max-height: 500rpx; overflow-y: auto;" class="text-right">
              <view v-for="(item, index) of list" :key="index" class="padding-tb-sm text-gray padding-right-xl"
                    @tap="startChoice(item)">
                {{item+unit}}
              </view>
            </view>
            <view style="width: 50%; max-height: 500rpx; overflow-y: auto;" class="text-left">
              <view v-for="(item, index) of list" :key="index" class="padding-tb-sm text-gray padding-left-xl"
                    @tap="endChoice(item)">
                {{item+unit}}
              </view>
            </view>
          </view>
          <view class="flex justify-center" style="margin-top: 10rpx">
            <button class="cu-btn action bg-blue text-white margin-right-xl" @tap="handlerSave">确定</button>
            <button class="cu-btn action bg-red text-white" @tap="show = false">取消</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        valueSync: '',
        start: '',
        end: ''
      }
    },
    props: {
      list: {
        type: Array,
        default: _ => ([])
      },
      unit: {
        type: String,
        default: '元'
      },
      placeholder: {
        type: String,
        default: '还未选择'
      },
      value: {
        type: Array
      }
    },
    watch: {
      value: {
        handler(v) {
          this.start = (parseInt(v[0]) || '0') + this.unit;
          this.end = (parseInt(v[1]) || '0') + this.unit;
          this.valueSync = this.start + '-' + this.end;
        },
        deep: true
      }
    },
    methods: {
      handlerSave() {
        this.$emit('input', this.value);
        this.$emit('change', this.value);
        this.show = false;
      },
      startBlur(e) {
        let item = e.detail.value.replace(this.unit, '');
        if (!item) return false;
        this.value[0] = item;
        this.start = item + this.unit;
      },
      endBlur(e) {
        let item = e.detail.value.replace(this.unit, '');
        if (!item) return false;
        this.value[1] = item;
        this.end = item + this.unit;
      },
      startChoice(item) {
        this.value[0] = item;
        this.start = item + this.unit;
      },
      endChoice(item) {
        this.value[1] = item;
        this.end = item + this.unit;
      }
    }
  }
</script>

<style scoped>
  .border-bottom {
    border: 0;
    border-bottom: 1 rpx solid #eee;
  }
</style>
