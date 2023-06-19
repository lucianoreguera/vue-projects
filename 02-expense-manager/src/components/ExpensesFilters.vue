<template>
  <div className="filtros sombra contenedor">
    <form>
      <div className="campo">
        <label>Filtrar Gastos</label>
        <select
          v-model="selectedValue"
          ref="select"
          @change="setFilter"
        >
          <option value="">-- Todas las Categorías --</option>
          <option value="saving">Ahorro</option>
          <option value="food">Comida</option>
          <option value="house">Casa</option>
          <option value="expense">Gastos Varios</option>
          <option value="entertainment">Ocio</option>
          <option value="health">Salud</option>
          <option value="subscriptions">Suscripciones</option>
        </select>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits, Ref, ref } from 'vue'

  const props = defineProps({
    filter: {
      type: String,
      required: true
    }
  })

  const emit = defineEmits(['setFilter'])

  const selectedValue:Ref<string> = ref<string>(props.filter)
  const select = ref(null)

  const setFilter = () => {
    selectedValue.value = select.value.value;
    emit('setFilter', selectedValue.value)
  }
</script>