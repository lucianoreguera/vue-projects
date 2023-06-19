<template>
  <div class="contenedor-presupuesto contenedor sombra">
    <form class="formulario" @submit.prevent="handleSubmit">
      <div class="campo">
          <label>Definir Presupuesto</label>

          <input 
              class="nuevo-presupuesto"
              type="number"
              placeholder="Añade tu Presupuesto"
              v-model="budget"
          />
      </div>

      <input type="submit" value="Añadir" />

      <MessageComponent v-if="showAlert" :message="message" typeAlert="error" />
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { Ref, ref, defineEmits } from 'vue'
  import MessageComponent from '@/components/MessageComponent.vue'

  const emit = defineEmits(['setIsValidBudget', 'setBudget'])

  const message:Ref<string> = ref<string>('')
  const showAlert:Ref<boolean> = ref<boolean>(false)
  const budget:Ref<number> = ref<number>(0)

  const handleSubmit = () => {
    if(!budget.value || budget.value < 0) {
      message.value = 'No es un presupuesto válido'
      showAlert.value = true
      return
    }
    
    message.value = ''
    showAlert.value = false
    
    emit('setIsValidBudget', true)
    emit('setBudget', budget.value)
  }

  // const setIsValidBudget = (value:boolean) => {
  //   emit('setIsValidBudget', value)
  // }
</script>