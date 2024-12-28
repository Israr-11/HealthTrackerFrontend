<template>
  <div class="mt-5 position-relative">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Mental Health Performance</h3>
    </div>

    <canvas ref="performanceChart" style="max-height: 400px;"></canvas>

    <div v-if="loading" class="text-center mt-3">
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, DoughnutController, Legend, ArcElement } from 'chart.js';
import { getMentalHealthLogsByUserId } from '../../services/mentalhealth.js';
import showToast from "@/utils/ToastManager.js";
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
        const response = await getMentalHealthLogsByUserId(userId);

        if (Array.isArray(response.data)) {
          this.performanceData = response.data;
        } else {
          console.error('API response is not an array:', response.data);
          showToast("An error occurred. Please try again later.");
          this.performanceData = [];
        }

        this.loading = false;
        this.renderChart();
      } catch (error) {
        console.error('Error fetching performance data:', error);
        showToast("Error fetching performance data. Please try again later.");
        this.loading = false;
      }
    },
    renderChart() {
      if (this.performanceData.length === 0) {
        console.error('No performance data available');
        showToast("No performance data available. Please try again later.");
        return;
      }

      const targetCompleted = this.performanceData.filter(item => item.targetMet === true).length;
      const targetNotCompleted = this.performanceData.filter(item => item.targetMet === false).length;
      const achievedMoodScoreGreaterThanFive = this.performanceData.filter(item => item.moodScore >= 5).length;
      const extremeStress=this.performanceData.filter(item=> item.stressLevel >= 7).length;

      const data = {
        labels: [
          'Mental Health Target Completed (Number of times)',
          'Mental Health Target not Completed (Number of times)',
          'Achieved Mood Score greater than 5 (Number of times)',
          'Extreme Stress Level (Warning: Consult doctor immediately)'
        ],
        datasets: [
          {
            data: [
              targetCompleted,
              targetNotCompleted,
              achievedMoodScoreGreaterThanFive,
              extremeStress
            ],
            backgroundColor: [
              '#4CAF50',
              '#FF5722',
              '#9C27B0',
              '#F44336'
            ],
            borderColor: [
              '#388E3C',
              '#E64A19',
              '#7B1FA2',
              '#D32F2F'
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
</style>
