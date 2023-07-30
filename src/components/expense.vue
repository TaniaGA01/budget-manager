<script setup lang="ts">
import { ref } from 'vue';
import { quantityFormat, dateFormat } from '../helpers/index'
import { IExpense, IIconsCollection } from '../services/all.interfaces'
import IconoAhorro from '../assets/img/icono_ahorro.svg'
import IconoCasa from '../assets/img/icono_casa.svg'
import IconoComida from '../assets/img/icono_comida.svg'
import IconoGastos from '../assets/img/icono_gastos.svg'
import IconoOcio from '../assets/img/icono_ocio.svg'
import IconoSalud from '../assets/img/icono_salud.svg'
import IconoSuscripciones from '../assets/img/icono_suscripciones.svg'

const props = defineProps<{
    expense:IExpense
}>()

defineEmits([
    'get-expense'
])

const iconsCollection = ref<IIconsCollection[]>([
    {id: 1, name: 'Saving',  icon: IconoAhorro},
    {id: 2, name: 'Food',  icon: IconoComida},
    {id: 3, name: 'Rent',  icon: IconoCasa},
    {id: 4, name: 'Expenses',  icon: IconoGastos},
    {id: 5, name: 'Leisure',  icon: IconoOcio},
    {id: 6, name: 'Health',  icon: IconoSalud},
    {id: 7, name: 'Subscriptions',  icon: IconoSuscripciones}
])

const categoryIcon = () => {
    const icon = iconsCollection.value.find(icon => icon.name === props.expense.category)
    return icon?.icon
}

</script>
<template>
    <div class="expense">
        <div class="content">
            <img :src="categoryIcon()" alt="expense icon" class="icon">
            <div class="details">
                <h3 class="category">{{ expense.category }}</h3>
                <p class="name" @click="$emit('get-expense', expense.id)">{{ expense.name }}</p>
                <p class="date">Date: <span>{{ dateFormat(expense.date) }}</span></p>
            </div>
        </div>
        <p class="quantity" @click="$emit('get-expense', expense.id)">{{ quantityFormat(expense.quantity) }}</p>
    </div>
</template>
<style lang="scss" scoped>

.expense{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    background-color: var(--gray-light);
    padding: 2rem;

    .content{
        display: flex;
        align-items: center;
        gap: 2rem;
        width: 100%;

        img{
            width: 8rem;
        }
    }
    .details{
        .category{
            text-transform: uppercase;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
        .name{
            font-size: 2.7rem;
            font-weight: 700;
            margin: 0;
            cursor: pointer;

            &:hover{
                color: var(--violet);
            }
        }
        .date{
            font-size: 1.6rem;
            font-weight: 900;

            span{
                font-weight: 400;
            }
        }
    }
    .quantity{
        font-size: 2.5rem;
        font-weight: 900;
        margin: 0;
        color: var(--violet);
        text-align: center;
        cursor: pointer;

        &:hover{
            color: var(--violet-dark)
        }
    }

}
@media (max-width: 768px){
    .expense{
        display: block;
        text-align: center;
        .content{
            display: block;
        }
    }
}

</style>