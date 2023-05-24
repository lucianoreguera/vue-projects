<template>
  <div className="bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 rounded-md">
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