<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'

const series = [30]

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
    labels: ['Cricket'],
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
        </div>
    </div>
</template>
<style scoped>

</style>