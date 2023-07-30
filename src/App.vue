<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import Budget from './components/Budget.vue';
import ControlBudgetVue from './components/ControlBudget.vue';
import Expense from './components/expense.vue'
import Modal from './components/Modal.vue'
import { IModal, ICategoryOptions, IExpense } from './services/all.interfaces'
import newExpenseIcon from './assets/img/nuevo-gasto.svg'
import { idGenerator } from './helpers/index'

let categoryOptions = ref<ICategoryOptions[]>([
    {id:0,text: 'Saving', value: 1},
    {id:1,text: 'Food', value: 2},
    {id:2,text: 'Rent', value: 3},
    {id:3,text: 'Expenses', value: 4},
    {id:4,text: 'Leisure', value: 5},
    {id:6,text: 'Health', value: 6},
    {id:7,text: 'Subscriptions', value: 7},
])

const modal = reactive<IModal>({
  show:false,
  animate:false
})

const budget = ref<number>(0)
const availableBudget = ref<number>(0)
const spentBudget = ref<number>(0)

const expense = reactive<IExpense>({
  id:'',
  name: '',
  quantity: 0,
  category: '',
  date: Date.now()
})

const allExpenses = ref<IExpense[]>([])

const reinitializeExpense = () => {
  Object.assign(expense, {
    id:'',
    name: '',
    quantity: 0,
    category: '',
    date: Date.now()
  })
}

watch(allExpenses, () => {
  const totalExpenses = allExpenses.value.reduce((total, expense) => expense.quantity + total, 0)
  spentBudget.value = totalExpenses
  availableBudget.value = (budget.value - spentBudget.value)
},{
  deep:true //several values
})

watch(modal, () => {
  if(!modal.show){
    reinitializeExpense()
  }
})

const defineBudget = (quantity: number) => {
  budget.value = quantity
  availableBudget.value = quantity
}

const showModal = ():void => {
  modal.show = true,
  setTimeout(() => {
    modal.animate = true
  }, 200);
}

const hideModal = ():void => {
  modal.animate = false,
  setTimeout(() => {
    modal.show = false
  }, 200);
}

const safeExpense = () => {
  if(expense.id){
    //edit expense info
    const { id } = expense
    const i = allExpenses.value.findIndex((expense => expense.id === id))
    allExpenses.value[i] = { ...expense }
  }else{
    const newExpense = {
      ...expense,
      id: idGenerator()
    }
    allExpenses.value.push(newExpense)
  }
  
  hideModal()
  reinitializeExpense()
  
}

const getExpense = (id:string) => {
  const editExpense = allExpenses.value.find(expense => expense.id === id)
  Object.assign(expense, editExpense)
  showModal()
}
</script>

<template>
  <div>
    <header>
      <h1>Budget manager</h1>
      <div class="container shadow container-header">
        <Budget
          v-if="budget === 0"
          @define-budget="defineBudget"
        />
        <ControlBudgetVue 
          v-else
          :budget="budget"
          :availableBudget="availableBudget"
          :spentBudget="spentBudget"
        />
      </div>
    </header>
    <main v-if="budget > 0">
      <div class="container shadow expenses-list">
        <h2>{{ allExpenses.length !== 0 ? 'Your expenses' : 'There is not expenses' }}</h2>
        <Expense 
          v-for="expense in allExpenses"
          :key="expense.id"
          :expense="expense"
          @get-expense="getExpense"
        />
      </div>
      <div class="create-expense">
        <img 
          :src="newExpenseIcon" 
          alt="add new expense icon"
          @click="showModal"
          >
      </div>
      <Modal 
        v-if="modal.show" 
        @hide-modal="hideModal"
        @safe-expense="safeExpense"
        :categoryOptions="categoryOptions"
        :modal="modal"
        :availableBudget="availableBudget"
        :id="expense.id"
        v-model:name="expense.name"
        v-model:quantity="expense.quantity"
        v-model:category="expense.category"
      />
    </main>
  </div>
</template>

<style lang="scss">
:root {
  --blue: #5053cf;
  --violet: #a52f67;
  --violet-dark: #572e65;
  --white: #ffffff;
  --gray: #b8c1d3;
  --gray-light: #f5f7fa;
  --gray-dark: #64748b;
  --black: #666672;
}

html{
  font-size: 62.5%;
  box-sizing: border-box;
}

*,
*::before,
*::after{
  box-sizing: inherit;
}

body{
  font-size: 1.6rem;
  font-family: 'Lato', sans-serif;
  background-color: var(--gray-light);
  color: var(--black);
  font-weight: 400;
}
main{
  margin-bottom: 15rem;
}
h1{
  font-size: 4rem;
}
h2{
  font-size: 3rem;
}
header{
  background-color: var(--blue);
  padding-top: 5rem;

  h1{
    padding: 3rem 0;
    margin: 0;
    color: var(--white);
    text-align: center;
    font-weight: 900;
    text-transform: uppercase;
  }
}

.container{
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
  background-color: var(--white);
  border-radius: 0.5rem;
  padding: 5rem;
}
.container-header{
  margin-top: -12rem;
  transform: translateY(15rem);
  padding: 5rem;
}
.shadow{
  -webkit-box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1); 
  box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
}
form{
  display: grid;
  gap: 2rem;
  .field {
      display: grid;
      gap: 1rem;
  }
  input,select{
    background-color: var(--gray-light);
    border-radius: 0.5rem;
    padding: 1rem;
    border: none;
    font-size: 2rem;
    text-align: center;

    &::placeholder{
      color: var(--gray)
    }
  }
  select{
    color: var(--gray);
  }

}
button{
  background-color: var(--violet);
  border-radius: 0.5rem;
  padding: 0.8rem;
  border: none;
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  color: var(--white);
  transition: background-color 300ms ease;
  width: 100%;
  
  &:hover{
    background-color: var(--violet-dark);
    cursor: pointer;
  }
}
.expenses-list{
  margin-top: 18rem;
  h2{
    font-weight: 900;
  }
}
.create-expense{
  position: fixed;
  bottom: 5rem;
  right: 5rem;

  img{
    width: 5rem;
    cursor:pointer
  }
}
</style>
