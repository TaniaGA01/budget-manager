<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { quantityFormat } from '../helpers/index'

defineProps<{
    budget:number
    availableBudget:number
}>()

const series = [70]

const chartOptions = {
    chart: {
        height: 350,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            hollow: {       
                size: '50%',
            }
        },
    },
    // labels: ['Cricket'],
    fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#ABE5A1'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: ['Percent']
    
}

</script>
<template>
    <div class="col-2">
        <div class="graphic-container">
            <div id="chart">
                <VueApexCharts type="radialBar" height="350" :options="chartOptions" :series="series" />
            </div>
        </div>
        <div class="budget-container">
            <button class="reset-app">Reset App</button>
            <p><span>Budget:</span> {{ quantityFormat(budget) }}</p>
            <p><span>Available budget:</span> {{ quantityFormat(availableBudget) }}</p>
            <p><span>Spent budget:</span>$0</p>
        </div>
    </div>
</template>
<style scoped>
.col-2{
    display: flex;
    justify-content: center;
    align-items: center;
}
.graphic-container,
.budget-container {
    width: 50%;
}
.budget-container p{
    font-size: 2rem;
}
.budget-container span{
    text-transform: uppercase;
    color: var(--blue);
    font-weight: 700;
    margin-right: 0.8rem;
}
#chart {
    padding: 0;
    width: 300px;
    margin: 0;
}
@media (max-width: 768px){
    .col-2{
        display: grid;
        justify-items: center;
    }
    .graphic-container,
    .budget-container {
        width: 100%;
    }
}
</style>