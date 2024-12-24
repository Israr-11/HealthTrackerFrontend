<template>
  <div class="mt-5 position-relative">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Target vs Actual Screen Hours</h3>
    </div>

    <canvas ref="screenTimeChart" style="max-height: 400px;"></canvas>

    <div v-if="loading" class="text-center mt-3">
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, BarController, BarElement, Legend, CategoryScale, LinearScale } from 'chart.js';
import { getScreenTimeLogsByUserId } from '../../services/screentime';
ChartJS.register(Title, Tooltip, Legend, BarElement, BarController, CategoryScale, LinearScale);

export default {
  name: 'ScreenTimeChart',
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
        const response = await getScreenTimeLogsByUserId(userId);
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

      // EXTRACTING DATA FOR CHART
      const labels = this.performanceData.map((item, index) => `Goal ${index + 1}`);
      const targetHours = this.performanceData.map(item => item.actualScreenHours - item.extraHours);
      const actualHours = this.performanceData.map(item => item.actualScreenHours);
      const extraHours = this.performanceData.map(item => item.extraHours);

      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Target Screen Hours',
            data: targetHours,
            backgroundColor: '#28a745',
            borderColor: '#28a745',
            borderWidth: 1,
          },
          {
            label: 'Actual Screen Hours',
            data: actualHours,
            backgroundColor: '#dc3545',
            borderColor: '#dc3545',
            borderWidth: 1,
          },
          {
            label: 'Extra Hours',
            data: extraHours,
            backgroundColor: '#ffc107',
            borderColor: '#ffc107',
            borderWidth: 1,
          },
        ],
      };

      const ctx = this.$refs.screenTimeChart.getContext('2d');

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
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Hours',
                },
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
