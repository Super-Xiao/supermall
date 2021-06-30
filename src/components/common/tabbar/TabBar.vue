<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style>
#tab-bar {
  background-color: #f6f6f6;
  display: flex;
  /* justify-content: space-between; */
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  box-shadow: 0px -2px 1px rgba(100, 100, 100, 0.1);
}

</style>
