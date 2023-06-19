<template>
  <div class="modal">
    <div class="cerrar-modal">
      <img 
        :src="CloseBtnIcon"
        alt="Cerrar Modal"
        @click="handleCloseModal"
      />
    </div>

    <form 
      :class="animateStyles"
      @submit.prevent="handleSubmit"
    >
      <legend>Nuevo Gasto</legend>
      <MessageComponent v-show="message" :message="message" typeAlert="error" />

      <div class="campo">
        <label htmlFor="name">Nombre Gasto</label>

        <input 
            id="name"
            type="text"
            placeholder="Añade el Nombre del Gasto"
            v-model="name"
        />
      </div>

      <div class="campo">
        <label htmlFor="quantity">Cantidad</label>

        <input 
          id="quantity"
          type="number"
          placeholder="Añade La cantidad del gasto: ej. 300"
          v-model="quantity"
        />
      </div>

      <div class="campo">
        <label htmlFor="category">Categoría</label>

        <select
            id="category"
            v-model="category"
        >
          <option value="">-- Seleccione --</option>
          <option value="saving">Ahorro</option>
          <option value="food">Comida</option>
          <option value="house">Casa</option>
          <option value="expenses">Gastos Varios</option>
          <option value="entertainment">Ocio</option>
          <option value="health">Salud</option>
          <option value="subscriptions">Suscripciones</option>
        </select>
      </div>

      <input 
        v-if="props.expenseEdit.id"
        type="submit"
        value="Guardar Cambios"
      />
      <input 
        v-else
        type="submit"
        value="Añadir Gasto"
      />
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { defineEmits, defineProps, computed, Ref, ref, watchEffect } from 'vue'
  import MessageComponent from './MessageComponent.vue';
  import CloseBtnIcon from '@/assets/img/cerrar.svg'

  const props = defineProps({
    modalAnimate: {
      type: String,
      required: true
    },
    expenseEdit: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(['setModal', 'setModalAnimate', 'storeExpense', 'setExpenseEdit'])

  const name:Ref<string> = ref<string>('')
  const quantity:Ref<string> = ref<string>('')
  const category:Ref<string> = ref<string>('')
  const date:Ref<number> = ref<number>(0)
  const id:Ref<string> = ref<string>('')
  const message:Ref<string> = ref<string>('')

  const animateStyles = computed(() => props.modalAnimate ? 'formulario animar' : 'formulario cerrar')

  watchEffect(() => {
    if (Object.keys(props.expenseEdit).length > 0) {
      name.value = props.expenseEdit.name
      quantity.value = props.expenseEdit.quantity
      category.value = props.expenseEdit.category
      date.value = props.expenseEdit.date
      id.value = props.expenseEdit.id
    }
  })

  const handleSubmit = () => {
    if ([name.value, quantity.value, category.value].includes('')) {
      message.value = 'Todos los campos son obligatorios'
      
      setTimeout(() => {
        message.value = ''
      }, 3000);
      
      return
    }

    emit('storeExpense', { name: name.value, quantity: quantity.value, category: category.value, date: date.value, id: id.value })
  }

  const handleCloseModal = () => {
    emit('setModalAnimate', false)
    emit('setExpenseEdit', {})

    setTimeout(() => {
      emit('setModal', false)
    }, 500);
  }
</script>
