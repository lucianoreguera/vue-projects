<template>
  <ErrorComponent
    v-show="error"
    message="Todos los campos son obligatorios"
  />

  <form
    @submit.prevent="handleSubmit"
  >
    <label
      class="label"
    >Elige tu Moneda</label>
    <select
      class="select"
      v-model="currency"
    >
      <option value="">-- Seleccione --</option>
      <option value="USD">Dolar de Estados Unidos</option>
      <option value="MXN">Peso Mexicano</option>
      <option value="EUR">Euro</option>
      <option value="GBP">Libra Esterlina</option>
    </select>

    <label
      class="label"
    >Elige tu Criptomoneda</label>
    <select
      class="select"
      v-model="cryptoCurrency"
    >
      <option value="">-- Seleccione --</option>
      <option v-for="crypto in cryptosCurrency" :key="crypto.id" :value="crypto.id">{{ crypto.name }}</option>
    </select>
    
    <input
      class="input" 
      type="submit" 
      value="Cotizar" 
    />
  </form>
</template>

<script lang="ts" setup>
  import { onMounted, defineProps, defineEmits, Ref, ref } from 'vue'
  import CryptoService from '@/services/CryptoService'
  import ErrorComponent from '@/components/ErrorComponent.vue'

  const props = defineProps({
    currency: {
      type: String,
      required: true
    },
    cryptoCurrency: {
      type: String,
      required: true
    }
  })

  const emit = defineEmits(['setCurrency', 'setCryptoCurrency'])

  const currency:Ref<string> = ref(props.currency)
  const cryptoCurrency:Ref<string> = ref(props.cryptoCurrency)
  const error:Ref<boolean> = ref(false)

  const serviceCrypto = new CryptoService()
  const cryptosCurrency = serviceCrypto.getCryptosCurrency()

  onMounted(async () => {
    await serviceCrypto.fetchCryptosCurrency()
  })

  const handleSubmit = () => {
    if([currency.value, cryptoCurrency.value].includes('')) {
      error.value = true
      return
    }

    error.value = false
    
    emit('setCurrency', currency.value)
    emit('setCryptoCurrency', cryptoCurrency.value)

    currency.value = ''
    cryptoCurrency.value = ''
  }
</script>

<style scoped>
.input {
  background-color: #9497FF;
  border: none;
  width: 100%;
  padding: 10px;
  color: #FFF;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease;
  margin-top: 30px;
  &:hover {
      background-color: #7A7DFE;
      cursor: pointer;
  }
}
.label {
  color: #FFF;
  display: block;
  font-family: 'Lato', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin: 15px 0;
}
.select {
  width: 100%;
  font-size: 18px;
  padding: 14px;
  border-radius: 10px;
}
</style>