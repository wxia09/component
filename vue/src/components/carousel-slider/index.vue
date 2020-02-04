<template>
  <div style="display:flex; width: 100%; height: 100%;">
    <div
      class="pre dir"
      style="margin-right: 10px;"
      @click="index = index <= 0 ? items.length - 1 : --index"
      v-if="dirChange"
    >
      &lt;
    </div>
    <div class="items" style="flex: 1;height: 100%;overflow-y: auto" ref="wrap">
      <ul
        class="item"
        style="display:flex;"
        :style="{
          width: items.length * 100 + 'px',
          transition: `all ${transition / 1000}s ease`,
          transform: `translateX(${transformX}px)`
        }"
      >
        <li
          v-for="(item, i) of items"
          :key="i"
          style="width: 100px;height: 100%;background: rgba(0, 0, 0, .5);margin-right: 10px;cursor: pointer"
          :class="{ active: i === index }"
          @click="index = i"
        >
          <img :src="item.src" alt="" style="width: 100%; height: 95%" />
          <p style="text-align: center">{{ item.title }}</p>
        </li>
      </ul>
    </div>
    <div
      class="next dir"
      style="margin-left: 10px;"
      @click="index = index >= items.length - 1 ? 0 : ++index"
      v-if="dirChange"
    >
      &gt;
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      wrapWidth: 0,
      showCount: 0,
      transformX: 0
    };
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    transition: {
      type: Number,
      default: 500
    },
    dirChange: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    index(index) {
      if (index < this.showCount) {
        this.transformX = 0;
      } else if (index >= this.items.length - this.showCount) {
        this.transformX = -this.items.length * 100 + this.wrapWidth;
      } else if (index >= this.showCount) {
        this.transformX = -(index - this.showCount || 1) * 100;
      }
      this.$emit("change", index);
    }
  },
  methods: {
    getWidth(ele, attr) {
      return parseFloat(getComputedStyle(ele)[attr]);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.wrapWidth = this.getWidth(this.$refs.wrap, "width");
      this.showCount = Math.round(this.wrapWidth / 100 / 2);
    });
  }
};
</script>

<style lang="scss">
ul {
  padding: 0;
  margin: 0;
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
p {
  margin: 0;
}
.dir {
  width: 40px;
  height: 100%;
  background: dodgerblue;
  border-radius: 5px;
  color: #fff;
  font-size: 25px;
  text-align: center;
  line-height: 3;
  cursor: pointer;
}
.items {
  .item {
    .active {
      background: transparent !important;
    }
  }
}
.items::-webkit-scrollbar {
  display: none;
}
</style>
