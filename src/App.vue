<script setup lang="ts">
import { ref } from 'vue';
import Budget from './components/Budget.vue';
import ControlBudgetVue from './components/ControlBudget.vue';

const budget = ref<number>(0)

const defineBudget = (quantity) => {
  budget.value = quantity
}

</script>

<template>
  <div>
    <header>
      <h1>Budget manager</h1>
      <div class="container-header container shadow">
        <Budget
          v-if="budget === 0"
          @define-budget="defineBudget"
        />
        <ControlBudgetVue v-else
        />
      </div>
    </header>
  </div>
</template>

<style>
:root {
  --blue: #5053cf;
  --violet: #a52f67;
  --violet-dark: #572e65;
  --white: #ffffff;
  --gray: #b8c1d3;
  --gray-light: #f5f7fa;
  --gray-dark: #64748b;
  --black: #1e1e1e;
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
}
header h1{
  padding: 3rem 0;
  margin: 0;
  color: var(--white);
  text-align: center;
  font-weight: 900;
  text-transform: uppercase;
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
  
</style>
