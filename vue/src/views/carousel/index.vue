<template>
  <div style="width: 800px; margin: auto">
    <carousel :items="items" :hide-dir="false" />
  </div>
</template>

<script>
import items from "@components/carousel/items";
import Carousel from "@components/carousel";
export default {
  data() {
    return {
      items
    };
  },
  components: {
    Carousel
  }
};
</script>
