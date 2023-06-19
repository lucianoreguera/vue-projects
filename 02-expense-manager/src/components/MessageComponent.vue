<template>
  <div :class="alert">{{ props.message }}</div>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue'

  const props = defineProps({
    message: {
      type: String,
      required: true
    },
    typeAlert: {
      type: String,
      required: true
    }
  })

  const alert = `alerta ${props.typeAlert}`
</script>