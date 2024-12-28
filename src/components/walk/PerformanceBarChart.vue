<template>
  <div class="mt-5 position-relative">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Walk Performance</h3>
    </div>

    <canvas ref="performanceChart" style="max-height: 400px;"></canvas>

    <div v-if="loading" class="text-center mt-3">
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, BarController, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import {getWalkLogByUserId} from "@/services/walk.js";
import showToast from "@/utils/ToastManager.js";
ChartJS.register(Title, Tooltip, Legend, BarElement, BarController, CategoryScale, LinearScale);

export default {
  name: 'PerformanceBarChart',
  data() {
    return {
      performanceData: [],
      loading: true,
      chartInstance: null,
    };
  },
  async mounted() {
    await this.fetchPerformanceData();
  },
  methods: {
    async fetchPerformanceData() {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user.id;

      try {
        const response = await getWalkLogByUserId(userId);

        if (Array.isArray(response.data)) {
          this.performanceData = response.data;
        } else {
          console.error('API response is not an array:', response.data);
          showToast("An error has occurred. Please try again.");
          this.performanceData = [];
        }

        this.loading = false;
        this.renderChart();
      } catch (error) {
        console.error('Error fetching performance data:', error);
        showToast("Error fetching performance data. Please try again.");
        this.loading = false;
      }
    },
    renderChart() {
      if (this.performanceData.length === 0) {
        console.error('No performance data available');
        showToast("No performance data available. Please try again.");
        return;
      }

      const highWalkQuality = this.performanceData.filter(item => item.walkQuality === 'High').length;
      const normalWalkQuality = this.performanceData.filter(item => item.walkQuality === 'Normal').length;
      const stepsTargetMet = this.performanceData.filter(item => item.targetMet === true).length;
      const stepsTargetNotMet = this.performanceData.filter(item => item.targetMet === false).length;
      const actualStepsGreaterThanFiveHundred = this.performanceData.filter(item => item.actualSteps >= 500).length;

      const data = {
        labels: ['High Walk Quality (Number of times)', 'Normal Walk Quality (Number of times)', 'Steps Target Met (Number of times)', 'Steps Target Not Met (Number of times)', 'Actual Steps Greater Than 500 (Number of times)'],
        datasets: [
          {
            label: '',
            data: [highWalkQuality, normalWalkQuality,stepsTargetMet, stepsTargetNotMet, actualStepsGreaterThanFiveHundred],
            backgroundColor: [
              '#4CAF50',
              '#FFC107',
              '#2196F3',
              '#FF5722',
              '#9C27B0'
              ],
            borderColor: [
              '#388E3C',
              '#FFA000',
              '#1976D2',
              '#E64A19',
              '#7B1FA2'
            ],
            borderWidth: 1,
          },
        ],
      };

      const ctx = this.$refs.performanceChart.getContext('2d');

      if (this.chartInstance) {
        this.chartInstance.data = data;
        this.chartInstance.update();
      } else {

        this.chartInstance = new ChartJS(ctx, {
          type: 'bar',
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
          },
        });
      }
    },
  },
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: auto;
}
.btn-primary {
  background-color: #5c636a;
  border-color: #5c636a;
  transition: all 0.3s ease;
}
</style>
