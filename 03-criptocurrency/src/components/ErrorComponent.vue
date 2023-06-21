<template>
  <div class="error">
    {{ props.message }}
  </div>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue'

  const props = defineProps({
    message: {
      type: String,
      required: true
    }
  })
</script>

<style scoped>
.error {
  background-color: #B7322C;
  color: #FFF;
  padding: 15px;
  font-size: 22px;
  text-transform: uppercase;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  text-align: center;
}
</style>