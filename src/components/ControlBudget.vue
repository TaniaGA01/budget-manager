<script setup lang="ts">
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts'
import { quantityFormat } from '../helpers/index'

const props = defineProps<{
    budget:number
    availableBudget:number
    spentBudget:number
}>()

defineEmits([
    'reset-app'
])

const series = computed(() => [ Math.ceil((props.availableBudget * 100)/ props.budget) ]);

var chartOptions = {
  chart: {
    height: 280,
    type: "radialBar",
  },

//   series: [67],
  colors: ["#a276f0"],
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: "70%",
        background: "#2f2e5c"
      },
      track: {
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          blur: 4,
          opacity: 0.15
        }
      },
      dataLabels: {
        name: {
          offsetY: -10,
          color: "#fff",
          fontSize: "13px"
        },
        value: {
          color: "#fff",
          fontSize: "30px",
          show: true
        }
      }
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      gradientToColors: ["#5053cf"],
      stops: [0, 100]
    }
  },
  stroke: {
    lineCap: "round"
  },
  labels: ["Progress"]
};

</script>
<template>
    <div class="col-2">
        <div class="graphic-container">
            <div id="chart">
                <VueApexCharts type="radialBar" height="350" :options="chartOptions" :series="series" />
            </div>
        </div>
        <div class="budget-container">
            <button 
                class="button button-primary reset-app"
                type="button"
                @click="$emit('reset-app')"
                >Reset App</button>
            <p><span>Budget:</span> {{ quantityFormat(budget) }}</p>
            <p><span>Available budget:</span> {{ quantityFormat(availableBudget) }}</p>
            <p><span>Spent budget:</span>{{ quantityFormat(spentBudget) }}</p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.col-2{
    display: flex;
    justify-content: center;
    align-items: center;
}
.graphic-container,
.budget-container {
    width: 50%;

    p{
        font-size: 2rem;
    }
    span{
    text-transform: uppercase;
    color: var(--blue);
    font-weight: 700;
    margin-right: 0.8rem;
}
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