<template>
  <section class="wrap">
    <div :style="{ width, height, overflow: 'hidden' }">
      <div
        class="carousel-img"
        :style="{
          width: listLen * 100 + '%',
          transform: `translateX(${tranlateX}px)`,
          transition: transition ? `all ${interval / 1000}s ease` : ''
        }"
      >
        <div
          class="item"
          v-for="(item, index) of list"
          :key="index"
          :style="{
            background: `url(${item.src}) no-repeat center center/100% 100%`,
            color: '#fff'
          }"
        >
          <slot name="title" :title="item.title"></slot>
        </div>
      </div>
    </div>
    <div
      class="wrap-btn"
      @mouseenter="clearPlay"
      @mouseleave="autoPlay"
      @click="$emit('imgs', index)"
    >
      <div style="flex: 1"></div>
      <div class="carouse-btn-directon" v-if="!hideDir">
        <p @click.stop="runDirection">&lt;</p>
        <p @click.stop="runDirection('add')">&gt;</p>
      </div>
      <div style="flex: 1"></div>
      <div class="carouse-btn">
        <section>
          <p style="flex: 1"></p>
          <template v-if="clickEach">
            <span
              v-for="i of itemsLen + 1"
              :key="i * 2"
              :class="[i === index + 1 ? 'active' : '']"
              @click.stop="index = i - 1"
            ></span>
          </template>
          <p style="flex: 1"></p>
          <slot name="count" :count="{ index, total: itemsLen + 1 }"></slot>
        </section>
      </div>
    </div>
    <div class="carouse-slider"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      listIndex: 1,
      tranlateX: 0,
      transition: true,
      itemsLen: 0,
      list: [],
      listLen: 0,
      timer: 0,
      intervalTimer: 0
    };
  },
  props: {
    width: {
      type: String,
      default: "800px"
    },
    height: {
      type: String,
      default: "450px"
    },
    items: {
      type: Array,
      required: true
    },
    interval: {
      type: Number,
      default: 500
    },
    auto: {
      type: Boolean,
      default: true
    },
    autoInterval: {
      type: Number,
      default: 5000
    },
    hideDir: {
      type: Boolean,
      default: false
    },
    isReloadPlay: {
      type: Boolean,
      default: false
    },
    clickEach: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.initList();
  },
  watch: {
    index(index, oldIndex) {
      this.$emit("change", index);
      this.transition = true;
      if (oldIndex === 0 && index !== 1 && index !== index - oldIndex) {
        this.tranlateX = 0;
        this.timer = setTimeout(() => {
          this.transition = false;
          this.tranlateX = -(index + 1) * 800;
        }, 500);
      } else if (oldIndex === this.itemsLen && index === 0) {
        this.tranlateX = -(this.listLen - 1) * 800;
        this.timer = setTimeout(() => {
          this.transition = false;
          this.tranlateX = -1 * 800;
        }, 500);
      } else {
        this.tranlateX = (index + 1) * -800;
      }
    },
    items: {
      hanlder() {
        if (this.isReloadPlay) {
          this.initList();
        }
      },
      deep: true
    }
  },
  methods: {
    initList() {
      this.itemsLen = this.items.length - 1;
      this.list = [this.items[this.itemsLen], ...this.items, this.items[0]];
      this.listLen = this.list.length;
      this.tranlateX = this.listIndex * -800;
      this.index = 0;
      this.listIndex = 1;
    },
    runDirection(add) {
      if (add === "add") {
        this.index = this.index >= this.itemsLen ? 0 : ++this.index;
      } else {
        this.index = this.index <= 0 ? this.itemsLen : --this.index;
      }
    },
    autoPlay() {
      this.clearPlay();
      if (this.auto) {
        this.intervalTimer = setInterval(() => {
          this.index = this.index >= this.itemsLen ? 0 : ++this.index;
        }, this.autoInterval);
      }
    },
    clearPlay() {
      clearInterval(this.intervalTimer);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.autoPlay();
    });
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  flex-direction: column;
  .carousel-img {
    display: flex;
    height: 100%;
    .item {
      position: relative;
      width: 800px;
      height: 100%;
    }
  }
  .wrap-btn {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .carouse-btn {
      width: 100%;
      align-self: center;
      section {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: flex-end;
        padding: 20px 0;
        span {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: grey;
          margin-right: 5px;
          cursor: pointer;
        }
        .active {
          background: red;
        }
      }
    }
    .carouse-btn-directon {
      display: inherit;
      justify-content: space-between;
      margin-top: 100px;
      p:nth-child(2) {
        align-self: end;
      }
      p {
        width: 100px;
        height: 100px;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        font-size: 35px;
        line-height: 2.9;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
p {
  margin: 0;
}
</style>
