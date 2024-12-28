<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-1 mt-5">
      <h3 class="table-title">Logs</h3>
    </div>

    <table class="table table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>Screen Time ID</th>
        <th>Actual Screen Hours</th>
        <th>Target Met</th>
        <th>Extra Hours</th>
        <th>Recommendations</th>
        <th>Entry Time</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(log, index) in logs" :key="log.id">
        <td>{{ index + 1 }}</td>
        <td>{{ log.screenTimeGoalId }}</td>
        <td>{{ log.actualScreenHours}}</td>
        <td>{{ log.targetMet? 'Yes': 'No' }}</td>
        <td>{{log.extraHours}}</td>
        <td>{{log.recommendations}}</td>
        <td>{{ new Date(log.entryTime).toLocaleString() }}</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import {
  getScreenTimeLogsByUserId,
} from "../../services/screenTime.js";
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
        const response = await getScreenTimeLogsByUserId(userId);
        this.logs = response.data;
      } catch (error) {
        console.error("Error fetching logs:", error);
        showToast("Error fetching logs. Please try again.");
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
