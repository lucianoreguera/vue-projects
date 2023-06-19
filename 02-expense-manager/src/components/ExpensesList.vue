<template>
  <div className="listado-gastos contenedor">
    <div v-if="filter">
      <h2 v-show="!expensesFilters.length">No hay gastos en esta categoría</h2>
      <ExpenseDetail
        v-for="expense in expensesFilters" 
        :key="expense.id"
        :expense="expense"
        @setExpenseEdit="setExpenseEdit"
        @deleteExpense="deleteExpense"
      />
    </div>
    <div v-else>
      <h2 v-show="!expenses.length">No hay gastos aún</h2>
      <ExpenseDetail
        v-for="expense in expenses" 
        :key="expense.id"
        :expense="expense"
        @setExpenseEdit="setExpenseEdit"
        @deleteExpense="deleteExpense"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue'
  import ExpenseDetail from './ExpenseDetail.vue';
  import IExpense from '@/interfaces/IExpense';

  defineProps({
    expenses: {
      type: Array,
      required: true
    },
    filter: {
      type: String,
      required: true
    },
    expensesFilters: {
      type: Array,
      required: true
    }
  })

  const emit = defineEmits(['deleteExpense', 'setExpenseEdit'])

  const setExpenseEdit = (expense:IExpense) => {
    emit('setExpenseEdit', expense)
  }

  const deleteExpense = (id:string) => {
    emit('deleteExpense', id)
  }
</script>