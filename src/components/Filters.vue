<script setup lang="ts">
import { ICategoryOptions } from '../services/all.interfaces'
defineProps<{
    categoryOptions: ICategoryOptions[],
    filter:String,
}>()
defineEmits([
    'update:filter'
])

</script>
<template>
    <div class="filters">
        <form>
            <div class="field">
                <label for="filter">Expense's filters</label>
                <select 
                    id="filter"   
                    :value="filter"
                    @input="$emit('update:filter', ($event.target as HTMLInputElement).value)"
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
        </form>
    </div>
</template>
<style lang="scss" scoped>

.filters{
    .field{
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
}

</style>