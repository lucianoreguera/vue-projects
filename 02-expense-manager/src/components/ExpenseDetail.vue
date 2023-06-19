<template>
  <div class="gasto sombra">
    <div class="contenido-gasto">
      <img 
          :src="dictIcons[icon]"
          alt="Icono Tipo Gasto"
      />
      <div class="descripcion-gasto">
          <p class="categoria">{{ expense.category }}</p>
          <p class="nombre-gasto">{{ expense.name }}</p>
          <p class="fecha-gasto">
              Agregado el:
              <span>{{ dateFormat(expense.date) }}</span>
          </p>
      </div>
    </div>
    <p class="cantidad-gasto">
      {{ currencyFormat(expense.quantity) }}
    </p>
    <div class="actions">
      <button 
        class="btn btn-edit"
        @click="setExpenseEdit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
          <path d="M13.5 6.5l4 4"></path>
        </svg>
      </button>
      <button 
        class="btn btn-delete"
        @click="deleteExpense"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 7l16 0"></path>
          <path d="M10 11l0 6"></path>
          <path d="M14 11l0 6"></path>
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Ref, ref, defineProps, defineEmits, watchEffect } from 'vue'
  import { dateFormat, currencyFormat } from '@/helpers'

  import SavingIcon from '@/assets/img/icono_ahorro.svg'
  import HouseIcon from '@/assets/img/icono_casa.svg'
  import FoodIcon from '@/assets/img/icono_comida.svg'
  import ExpenseIcon from '@/assets/img/icono_gastos.svg'
  import EntertainmentIcon from '@/assets/img/icono_ocio.svg'
  import HealthIcon from '@/assets/img/icono_salud.svg'
  import SubscriptionsIcon from '@/assets/img/icono_suscripciones.svg'

  const dictIcons:object = {
    saving : SavingIcon,
    house : HouseIcon,
    food : FoodIcon,
    expenses : ExpenseIcon,
    entertainment : EntertainmentIcon,
    health : HealthIcon,
    subscriptions : SubscriptionsIcon
  }

  const props = defineProps({
    expense: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(['deleteExpense', 'setExpenseEdit'])

  const icon:Ref<string> = ref<string>(props.expense.category)

  watchEffect(() => {
    icon.value = props.expense.category
  })
  
  const setExpenseEdit = () => {
    emit('setExpenseEdit', props.expense)
  }

  const deleteExpense = () => {
    emit('deleteExpense', props.expense.id)
  }
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2px;
}
.btn {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.btn-edit{
  color: #16a34a;
}
.btn-delete {
  color: #dc2626;
}
</style>