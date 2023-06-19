<template>
  <div :class="{ 'fijar': modal }">
    <HeaderComponent 
      :isValidBudget="isValidBudget"
      @setIsValidBudget="setIsValidBudget"
      :budget="budget"
      @setBudget="setBudget"
      :expenses="expenses"
      @setExpenses="setExpenses"
    />

    <div v-if="isValidBudget">
      <main>
        <ExpensesFilters
          :filter="filter"
          @setFilter="setFilter"
        />
        <ExpensesList 
          :expenses="expenses"
          :filter="filter"
          :expensesFilters="expensesFilters"
          @setExpenseEdit="setExpenseEdit"
          @deleteExpense="deleteExpense"
        />
      </main>

      <div className="nuevo-gasto">
        <img 
          :src="NewExpenseIcon"
          alt="icono nuevo gasto"
          @click="handleNewExpense"
        />
      </div>
      <ModalComponent 
        v-if="modal"
        :modalAnimate="modalAnimate"
        :expenseEdit="expenseEdit"
        @setModal="setModal"
        @setModalAnimate="setModalAnimate"
        @storeExpense="storeExpense"
        @setExpenseEdit="setExpenseEdit"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Ref, ref, watchEffect } from 'vue';
  import HeaderComponent from './components/HeaderComponent.vue'
  import ExpensesFilters from './components/ExpensesFilters.vue'
  import ExpensesList from './components/ExpensesList.vue'
  import ModalComponent from './components/ModalComponent.vue'
  import IExpense from '@/interfaces/IExpense'
  import { generateUUID } from '@/helpers'
  import NewExpenseIcon from './assets/img/nuevo-gasto.svg'

  const isValidBudget:Ref<boolean> = ref<boolean>(false)
  const budget:Ref<number> = ref<number>(Number(localStorage.getItem('presupuesto')) || 0)
  const expenses:Ref<Array<IExpense>> = ref<Array<IExpense>>(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [])
  const filter:Ref<string> = ref<string>('')
  const expensesFilters:Ref<Array<IExpense>> = ref<Array<IExpense>>([])
  const modal:Ref<boolean> = ref<boolean>(false)
  const modalAnimate:Ref<boolean> = ref<boolean>(false)
  const expenseEdit:Ref<IExpense> = ref<IExpense>({})

  const setIsValidBudget = (value:boolean) => {
    isValidBudget.value = value
  }

  const setBudget = (value:number) => {
    budget.value = value
  }

  const setExpenses = (expensesList:Array<IExpense>) => {
    expenses.value = expensesList
  }

  const setFilter = (newFilter:string) => {
    filter.value = newFilter
  }

  const setModal = (show:boolean) => {
    modal.value = show
  }

  const setModalAnimate = (animate:boolean) => {
    modalAnimate.value = animate
  }

  const setExpenseEdit = (expense:IExpense) => {
    expenseEdit.value = expense
  }

  watchEffect(() => {
    localStorage.setItem('presupuesto', budget.value.toString() ?? 0)
    localStorage.setItem('gastos', JSON.stringify(expenses.value) ?? [])

    const budgetLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if(budgetLS > 0 ) {
      setIsValidBudget(true)
    }

    if (filter.value) {
      expensesFilters.value = expenses.value.filter( expense => expense.category === filter.value)
    }

    if (Object.keys(expenseEdit.value).length > 0 ) {
      setModal(true)

      setTimeout(() => {
          setModalAnimate(true)
      }, 500);
    }
  });

  const handleNewExpense = () => {
    setModal(true)
    setExpenseEdit({})

    setTimeout(() => {
      setModalAnimate(true)
    }, 500);
  }

  const storeExpense = (expense:IExpense) => {
    if (expense.id) {
      const expensesListUpdated = expenses.value.map(expenseState => expenseState.id === expense.id ? expense : expenseState)
      setExpenses(expensesListUpdated)
      setExpenseEdit({})
    } else {
      expense.id = generateUUID();
      expense.date = Date.now();
      setExpenses([...expenses.value, expense ])
    }

    setModalAnimate(false)

    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const deleteExpense = (id:string) => {
    const expensesList = expenses.value.filter(expense => expense.id !== id);
    setExpenses(expensesList);
  }
</script>