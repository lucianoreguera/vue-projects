<template>
  <div class="container">
    <img 
      :src="ImageCripto"
      alt="imagenes criptomonedas"
    />

    <div>
        <h1>Cotiza Criptomonedas al Instante</h1>
        <FormComponent 
          :currency="currency"
          :cryptoCurrency="cryptoCurrency"
          @setCurrency="setCurrency"
          @setCryptoCurrency="setCryptoCurrency"
        />

        <SpinnerComponent 
          v-show="loading"
        />
        <ResultComponent
          v-show="result.PRICE"
          :result="result"
        />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Ref, ref, watchEffect } from 'vue'
  import FormComponent from '@/components/FormComponent.vue'
  import ResultComponent from './components/ResultComponent.vue'
  import SpinnerComponent from '@/components/SpinnerComponent.vue'
  import ImageCripto from '@/assets/img/image-criptos.png'

  const currency:Ref<string> = ref('')
  const cryptoCurrency:Ref<string> = ref('')
  const result = ref({})
  const loading:Ref<boolean> = ref(false)

  watchEffect(() => {
    if(currency.value !== '' && cryptoCurrency.value !== '') {
      const quoteCrypto = async () => {
        loading.value = true
        result.value = {}
  
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency.value}&tsyms=${currency.value}`
        const response = await fetch(url)
        const results = await response.json()

        result.value = await results.DISPLAY[cryptoCurrency.value][currency.value]
        loading.value = false
      }

      quoteCrypto()
    }
  })

  const setCurrency = (newCurrency:string) => {
    currency.value = newCurrency
  }

  const setCryptoCurrency = (newCryptoCurrency:string) => {
    cryptoCurrency.value = newCryptoCurrency
  }
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
}

img {
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
}

h1 {
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
}
</style>