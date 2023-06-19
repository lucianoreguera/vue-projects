<template>
  <div class="contenedor-presupuesto contenedor sombra dos-columnas">
    <div>
      <CircleProgress 
        :percent="percentage" 
        :is-bg-shadow="true"
        fill-color="#3B82F6"
      />
    </div>

    <div class="contenido-presupuesto">
      <button
        class="reset-app"
        type="button"
        @click="handleResetApp"
      >
          Resetear App
      </button>
      <p>
        <span>Presupuesto: </span>{{ currencyFormat(budget) }}
      </p>

      <p class="">
        <span>Disponible: </span>{{ currencyFormat(available) }}
      </p>

      <p>
        <span>Gastado: </span>{{ currencyFormat(spending) }}
      </p>
    </div>
</div>
</template>

<script lang="ts" setup>
  import { ref, Ref, defineProps, defineEmits, watchEffect } from 'vue'
  import CircleProgress from 'vue3-circle-progress'
  import { currencyFormat } from '@/helpers'
  import 'vue3-circle-progress/dist/circle-progress.css'

  const props = defineProps({
    budget: {
      type: Number,
      required: true
    },
    expenses: {
      type: Array,
      required: true
    }
  })

  const emit = defineEmits(['setBudget', 'setIsValidBudget', 'setExpenses'])

  const percentage:Ref<number> = ref<number>(0)
  const available:Ref<number> = ref<number>(props.budget)
  const spending:Ref<number> = ref<number>(0)

  watchEffect(() => {
    const totalSpending:any = props.expenses.reduce((total, expense:any) => expense.quantity + total, 0)
    const totalAvailable = props.budget - totalSpending
    const newPercentage = Number((((props.budget - totalAvailable) / props.budget) * 100).toFixed(2))
    
    available.value = totalAvailable,
    spending.value = totalSpending
    setTimeout(() => {
      percentage.value = newPercentage
    }, 1000)
  })

  const handleResetApp = () => {
    const result = confirm('¿Deseas reiniciar presupuesto y gastos?');

    if(result) {
      emit('setBudget', 0)
      emit('setIsValidBudget', false)
      emit('setExpenses', [])
    } 
  }
</script>
