<template>
  <div class="container">
    <img 
      class="image"
      :src="`https://cryptocompare.com/${props.result.IMAGEURL}`" 
      alt="imagen cripto" 
    />
    <div>
      <p class="price">El Precio es de: <span>{{ props.result.PRICE }}</span></p>
      <p class="text">Precio más alto del día: <span>{{ props.result.HIGHDAY }}</span></p>
      <p class="text">Precio más bajo del día: <span>{{ props.result.LOWDAY }}</span></p>
      <p class="text">Variación últimas 24 horas: <span>{{ props.result.CHANGEPCT24HOUR }}</span></p>
      <p class="text">Última Actualización: <span>{{ props.result.LASTUPDATE }}</span></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue'

  const props = defineProps({
    result: {
      type: Object,
      required: true
    }
  })
</script>

<style scoped>
.container {
  color: #FFF;
  font-family: 'Lato', sans-serif;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 30px;
}
.image {
  display: block;
  width: 120px;
}
.text {
  font-size: 18px;
  span {
    font-weight: 700;
  }
}
.price {
  font-size: 24px;
  span {
      font-weight: 700;
  }
}
</style>