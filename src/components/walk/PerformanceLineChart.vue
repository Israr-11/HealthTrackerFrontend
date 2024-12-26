<template>
  <div class="mt-5 position-relative">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Walk Performance for steps, extra steps over time</h3>
    </div>

    <canvas ref="performanceChart" style="max-height: 400px;"></canvas>

    <div v-if="loading" class="text-center mt-3">
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineController,
  LineElement,
  PointElement,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { getWalkLogByUserId } from '../../services/walk.js';

ChartJS.register(
    Title,
    Tooltip,
    LineController,
    LineElement,
    PointElement,
    Legend,
    CategoryScale,
    LinearScale
);

export default {
  name: 'PerformanceLineChart',
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

      const labels = this.performanceData.map((item) =>
          new Date(item.entryTime).toLocaleDateString('en-GB')
      );
      const actualSteps = this.performanceData.map((item) => item.actualSteps);
      const extraSteps = this.performanceData.map((item) => item.extraSteps);

      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Actual Steps',
            data: actualSteps,
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderWidth: 2,
            tension: 0.4,
            pointBackgroundColor: '#4CAF50',
          },
          {
            label: 'Extra Steps',
            data: extraSteps,
            borderColor: '#FF5722',
            backgroundColor: 'rgba(255, 87, 34, 0.2)',
            borderWidth: 2,
            tension: 0.4,
            pointBackgroundColor: '#FF5722',
          },
        ],
      };

      const ctx = this.$refs.performanceChart.getContext('2d');

      if (this.chartInstance) {
        this.chartInstance.data = data;
        this.chartInstance.update();
      } else {
        this.chartInstance = new ChartJS(ctx, {
          type: 'line',
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
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Steps',
                },
                beginAtZero: true,
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
</style>
