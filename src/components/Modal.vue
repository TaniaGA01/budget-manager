<script setup lang="ts">
    import { computed, ref } from 'vue'
    import Alert from './Alert.vue'
    import closeModal from '../assets/img/cerrar.svg'
    import { IModal,ICategoryOptions } from '../services/all.interfaces'

    const error = ref<string>('')

    const props = defineProps<{
        modal: IModal,
        categoryOptions: ICategoryOptions[],
        name: String,
        quantity: Number | String,
        category: String,
        availableBudget: Number | String,
        id: Number | String
    }>()

    const emit = defineEmits([
        'hide-modal',
        'safe-expense',
        'delete-expense',
        'update:name',
        'update:quantity',
        'update:category'
    ])

    const addExpense = () =>{
        const { name, quantity, category, availableBudget, id } = props
        if([name, quantity, category].includes('')){
            error.value = 'All fields are required'
            setTimeout(() => {
                error.value = ''
            }, 3000);
            return
        }
        const oldQuantity = quantity
        //Quantity validation
        if(quantity <= '0'){
            error.value = 'Quantity must be greater than 0'
            setTimeout(() => {
                error.value = ''
            }, 3000);
            return
        }

        //Max budget validation
        if(id){
            //edit exiting expense
            if(Number(quantity) > Number(oldQuantity) + Number(availableBudget) ){
                if(quantity > availableBudget){
                    error.value = 'You are exceeding the budget'
                    setTimeout(() => {
                        error.value = ''
                    }, 3000);
                    return
                }
            }

        }else{
            if(quantity > availableBudget){
                error.value = 'You are exceeding the budget'
                setTimeout(() => {
                    error.value = ''
                }, 3000);
                return
            }
        }
        
        emit('safe-expense')
    }
    const isEditing = computed(() => {
        return props.id
    })

</script>
<template>
    <div class="modal">
        <div class="close-modal">
            <img 
                :src="closeModal" 
                alt="close modal"
                @click.prevent="$emit('hide-modal')"
                >
        </div>
        <div 
            class="modal-content"
            :class="[modal.animate ? 'animate':'close']"
            >
            <div class="container">
                <form 
                    @submit.prevent="addExpense"
                >
                    <h2>{{ id ? "Edit expense" : "Add Expense" }}</h2>
                    <Alert v-if="error">{{ error }}</Alert>
                    <div class="field">
                        <label 
                            for="name">Expense title:</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Expense title"
                            :value="name"
                            @input="$emit('update:name', ($event.target as HTMLInputElement).value)"
                            id="">
                    </div>
                    <div class="field">
                        <label 
                            for="quantity">Quantity:</label>
                        <input 
                            type="number" 
                            name="quantity" 
                            placeholder="Add expense quantity, e.g.: 300"
                            :value="quantity"
                            @input="$emit('update:quantity', +($event.target as HTMLInputElement).value)"
                            id="">
                    </div>
                    <div class="field">
                        <label 
                            for="category">Category:</label>
                        <select 
                            id="category"   
                            :value="category"
                            @input="$emit('update:category', ($event.target as HTMLInputElement).value)"
                            >
                                <option value="">-- Choose an option --</option>
                                <option 
                                    v-for="category in categoryOptions" 
                                    :key="category.id" 
                                    :value="category.text">
                                    {{ category.text }}
                                </option>
                        </select>
                    </div>
                    <div class="buttons-container">
                        <button class="simple-button"
                            type="submit"
                            @click="$emit('delete-expense')"
                            v-if="isEditing" 
                        >Delete expense
                        </button>
                        <button class="button button-primary"
                            type="submit" 
                        >{{ id ? "Edit expense" : "Add Expense" }}
                        </button>
                    </div>
                </form>
        </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.modal{
    position: fixed;
    background-color: rgb(0 0 0 / 0.5);
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    .modal-content {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        transition-property: all;
        transition-duration:300ms;
        transition-timing-function: ease-in;
    }
    .modal-content.animate{
        opacity: 1;
    }
    .modal-content.close{
        opacity: 0;
    }
    .close-modal{
        position: absolute;
        right: 2rem;
        top:2rem;

        img{
            width: 2rem;
            cursor: pointer;
        }
        
    }
}
form{
    input, select{
        text-align: left;
    }
}
</style>