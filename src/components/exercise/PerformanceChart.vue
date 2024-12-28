<template>
  <div class="mt-5 position-relative">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Performance</h3>
      <button
          class="btn btn-primary"
          @click="refreshPerformanceData"
      >
        Fetch Latest Performance
      </button>
    </div>

    <canvas ref="performanceChart" style="max-height: 400px;"></canvas>

    <div v-if="loading" class="text-center mt-3">
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, BarController, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { getExercisePerformanceByUserPerId, createExercisePerformanceByUserId } from '../../services/exercise';
import ExerciseChartsLoading from "@/utils/ExerciseChartsLoading.js";
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
        const response = await getExercisePerformanceByUserPerId(userId);

        if (Array.isArray(response.data)) {
          this.performanceData = response.data;
        } else {
          console.error('API response is not an array:', response.data);
          showToast("Error fetching response. Please try again.");

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

    async refreshPerformanceData() {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user.id;

      try {
        this.loading = true;

        await createExercisePerformanceByUserId(userId);
        ExerciseChartsLoading()

        await this.fetchPerformanceData();
      } catch (error) {
        console.error('Error refreshing performance data:', error);
        showToast("Error refreshing performance data. Please try again.");
        this.loading = false;
      }
    },

    renderChart() {
      if (this.performanceData.length === 0) {
        console.error('No performance data available');
        showToast("No performance data available. Please try again.");
        return;
      }

      const achievedData = this.performanceData.filter(item => item.performanceStatus === 'Achieved');
      const missedData = this.performanceData.filter(item => item.performanceStatus === 'Missed');
      const achievedCount = achievedData.reduce((sum, item) => sum + item.achievedCount, 0);
      const missedCount = missedData.reduce((sum, item) => sum + item.missCount, 0);

      const data = {
        labels: ['Achieved (Number of Exercise Targets)', 'Missed (Number of Exercise Targets)'],
        datasets: [
          {
            label: 'Performance',
            data: [achievedCount, missedCount],
            backgroundColor: ['#28a745', '#dc3545'],
            borderColor: ['#28a745', '#dc3545'],
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
