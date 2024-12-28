<template>
  <div class="mt-5 position-relative">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Sleep Performance</h3>
    </div>

    <canvas ref="performanceChart" style="max-height: 400px;"></canvas>

    <div v-if="loading" class="text-center mt-3">
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, BarController, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { getSleepLogByUserId } from '../../services/sleep';
import showToast from "@/utils/ToastManager.js";
ChartJS.register(Title, Tooltip, Legend, BarElement, BarController, CategoryScale, LinearScale);

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
        const response = await getSleepLogByUserId(userId);

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

      const goodSleep = this.performanceData.filter(item => item.actualSleepQuality === 'good');
      const excellentSleep = this.performanceData.filter(item => item.actualSleepQuality === 'excellent');
      const nightSleep = this.performanceData.filter(item => item.actualSleepTiming === 'night');
      const daySleep = this.performanceData.filter(item => item.actualSleepTiming === 'day');
      const sleepGreaterThanSixHours = this.performanceData.filter(item => item.actualSleepHours >= 6);

      const achievedGoodSleep = goodSleep.length;
      const achievedExcellentSleep = excellentSleep.length;
      const achievedNightSleep = nightSleep.length;
      const achievedDaySleep = daySleep.length;
      const achievedSleepGreaterThanSixHours = sleepGreaterThanSixHours.length;

      const data = {
        labels: ['Good Sleep (Number of times)', 'Excellent Sleep (Number of times)', 'Night Sleep (Number of times)', 'Day Sleep (Number of times)', 'Sleep Greater than 6 hours (Number of times)'],
        datasets: [
          {
            label: '',
            data: [achievedGoodSleep, achievedExcellentSleep,achievedNightSleep, achievedDaySleep, achievedSleepGreaterThanSixHours],
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
</style>
