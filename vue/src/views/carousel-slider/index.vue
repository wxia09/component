<template>
  <div style="width: 700px;height: 80px;margin: auto;">
    <slider :items="items" />
  </div>
</template>

<script>
import Slider from "@components/carousel-slider";
import items from "./items";
export default {
  data() {
    return {
      items
    };
  },
  methods: {},
  components: {
    Slider
  }
};
</script>
