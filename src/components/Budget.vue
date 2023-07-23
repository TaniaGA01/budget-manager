<script setup lang="ts">
import { ref } from 'vue';
import Alert from './Alert.vue'

const budget = ref<number>(0)
const error = ref<string>('')

const emit = defineEmits([
    'define-budget'
])

const defineBudget = () =>{
    if(budget.value <= 0 || Number.isNaN(budget.value)){
        budget.value = 0
        error.value = 'Invalid budget value'
        setTimeout(() => {
            error.value = ''
        }, 3000);
        return
    }
    emit('define-budget', budget.value)
}

</script>
<template>
    <div class="define-budget-block">
        <img src="../assets/img/budget-illustration.png" alt="" srcset="">
        <form class="budget-form" @submit.prevent="defineBudget">
            <Alert v-if="error">
                {{ error }}
            </Alert>
            <label for="newBudget">Define budget :</label>
            <input 
                id="newBudget"
                class="new-budget"
                placeholder="Add your budget here"
                type="number" 
                name=""
                min="0"
                v-model.number="budget"
                @click="budget === 0 ? budget = NaN : budget"
            >
            <button class="button"
                type="submit" 
            >Send</button>
        </form>
    </div>
    
</template>
<style scoped>
.define-budget-block{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5rem;
}
.define-budget-block img{
    width: 50%;
}
.budget-form{
    display: grid;
    gap: 1rem;
}
.budget-form{
    width: 50%;
}
.budget-form input[type="number"]{
    background-color: var(--gray-light);
    border-radius: 0.5rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
    text-align: center;
}

.budget-form input[type="number"]::placeholder{
    color: var(--gray)
}
@media (max-width: 768px){
    .define-budget-block{
        display: grid;
        justify-items: center;
    }
    .define-budget-block img{
        width: 80%;
    }
    .budget-form{
        width: 100%;
    }
}
</style>