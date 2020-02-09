<template>
  <div>
    <h3 style="color: red">组件列表:</h3>
    <router-link to="/carousel" tag="h4">carousel</router-link>
    <router-link to="/slider" tag="h4">slider</router-link>
    <router-link to="/message" tag="h4">message</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
h4 {
  width: 100px;
  cursor: pointer;
}
</style>
