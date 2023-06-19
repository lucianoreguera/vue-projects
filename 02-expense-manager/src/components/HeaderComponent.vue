<template>
  <header>
    <h1>Planificador de Gastos</h1>

    <BudgetControl 
      v-if="isValidBudget" 
      :budget="budget"
      :expenses="expenses"
      @setBudget="setBudget" 
      @setIsValidBudget="setIsValidBudget"
      @setExpenses="setExpenses"
    />
    <NewBudget v-else @setIsValidBudget="setIsValidBudget" @setBudget="setBudget" />

    <!-- {isValidPresupuesto ? (
        <ControlPresupuesto 
            gastos={gastos}
            setGastos={setGastos}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
        />
    ) : (
        <NuevoPresupuesto 
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto }
        />
    )} -->

  </header>
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue'
  import BudgetControl from './BudgetControl.vue'
  import NewBudget from './NewBudget.vue'
import IExpense from '@/interfaces/IExpense';

  defineProps({
    isValidBudget: {
      type: Boolean,
      required: true
    },
    budget: {
      type: Number,
      required: true
    },
    expenses: {
      type: Array,
      required: true
    }
  })

  const emit = defineEmits(['setIsValidBudget', 'setBudget', 'setExpenses'])
  
  const setIsValidBudget = (value:boolean) => {
    emit('setIsValidBudget', value)
  }

  const setBudget = (value:number) => {
    emit('setBudget', value)
  }

  const setExpenses = (expensesList:Array<IExpense>) => {
    emit('setExpenses', expensesList)
  }
</script>