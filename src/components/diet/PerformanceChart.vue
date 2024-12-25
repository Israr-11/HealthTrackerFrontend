<template>
  <div class="mt-5 position-relative">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Diet Performance</h3>
    </div>

    <canvas ref="performanceChart" style="max-height: 400px;"></canvas>

    <div v-if="loading" class="text-center mt-3">
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, DoughnutController, Legend, ArcElement } from 'chart.js';
import { getDietLogByUserId } from '../../services/diet';
ChartJS.register(Title, Tooltip, Legend, DoughnutController, ArcElement);

export default {
  name: 'PerformanceChart',
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
        const response = await getDietLogByUserId(userId);
        console.log(response.data);

        if (Array.isArray(response.data)) {
          this.performanceData = response.data;
        } else {
          console.error('API response is not an array:', response.data);
          this.performanceData = [];
        }

        this.loading = false;
        this.renderChart();
      } catch (error) {
        console.error('Error fetching performance data:', error);
        this.loading = false;
      }
    },
    renderChart() {
      if (this.performanceData.length === 0) {
        console.error('No performance data available');
        return;
      }

      const targetCompleted = this.performanceData.filter(item => item.targetReached === true).length;
      const targetNotCompleted = this.performanceData.filter(item => item.targetReached === false).length;
      const caloriesGreaterThousand = this.performanceData.filter(item => item.caloriesConsumed >= 1000).length;

      const data = {
        labels: [
          'Calories Target Completed',
          'Calories Target not Completed',
          'Calories consumed greater than 1000 ',
        ],
        datasets: [
          {
            data: [
              targetCompleted,
              targetNotCompleted,
              caloriesGreaterThousand,
            ],
            backgroundColor: [
              '#4CAF50',
              '#FF5722',
              '#9C27B0',
            ],
            borderColor: [
              '#388E3C',
              '#E64A19',
              '#7B1FA2',
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
          type: 'doughnut',
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
