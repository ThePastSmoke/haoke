<template>
  <i :class="['iconfont', `icon-${icon}`]"></i>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<style></style>
