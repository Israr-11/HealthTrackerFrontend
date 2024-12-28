<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-1 mt-5">
      <h3 class="table-title">Diet Logs</h3>
    </div>

    <table class="table table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>Diet Goal ID</th>
        <th>Status</th>
        <th>Actual Calories Consumed</th>
        <th>Target Reached</th>
        <th>Calories Status (More or less than target value)</th>
        <th>Diet Recommendations</th>
        <th>Entry Time</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(log, index) in logs" :key="log.id">
        <td>{{ index + 1 }}</td>
        <td>{{ log.dietGoalId }}</td>
        <td>{{ log.status}}</td>
        <td>{{ log.caloriesConsumed }}</td>
        <td>{{ log.targetReached? 'Yes' : 'No' }}</td>
        <td>{{ log.deficitSurplus}}</td>
        <td>{{ log.recommendations}}</td>
        <td>{{ new Date(log.entryTime).toLocaleString() }}</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import {
  getDietLogByUserId,
} from "../../services/diet";
import showToast from "@/utils/ToastManager.js";

export default {
  name: "LogList",
  components: {
  },
  data() {
    return {
      logs: [],
    };
  },
  async mounted() {
    await this.fetchLogs();
  },
  methods: {
    async fetchLogs() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;
      try {
        const response = await getDietLogByUserId(userId);
        this.logs = response.data;
      } catch (error) {
        console.error("Error fetching logs:", error);
        showToast("Error fetching logs. Please try again!")
      }
    },
  },
};
</script>

<style scoped>
.d-flex {
  display: flex;
}
.justify-content-between {
  justify-content: space-between;
}
.align-items-center {
  align-items: center;
}
.table-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}
.table {
  margin-top: 20px;
}
.btn-primary {
  background-color: #5c636a;
  border-color: #5c636a;
  transition: all 0.3s ease;
}
</style>
