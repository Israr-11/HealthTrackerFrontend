<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-1 mt-5">
      <h3 class="table-title">Logs</h3>
    </div>

    <table class="table table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>Sleep ID</th>
        <th>Actual Sleep Hours</th>
        <th>Actual Sleep Quality</th>
        <th>Actual Sleep Timing</th>
        <th>Sleep Interruptions</th>
        <th>Sleep Phase Details</th>
        <th>Sleep Quality Index %</th>
        <th>Sleep Recommendations</th>
        <th>Entry Time</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(log, index) in logs" :key="log.id">
        <td>{{ index + 1 }}</td>
        <td>{{ log.sleepGoalId }}</td>
        <td>{{ log.actualSleepHours}}</td>
        <td>{{ log.actualSleepQuality }}</td>
        <td>{{ log.actualSleepTiming}}</td>
        <td>{{ log.sleepInterruptions }}</td>
        <td>{{ log.sleepPhaseDetails}}</td>
        <td>{{ log.sleepQualityIndex }}</td>
        <td>{{ log.remarks}}</td>
        <td>{{ new Date(log.entryTime).toLocaleString() }}</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import {
  getSleepLogByUserId,
} from "../../services/sleep";

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
        const response = await getSleepLogByUserId(userId);
        this.logs = response.data;
      } catch (error) {
        console.error("Error fetching logs:", error);
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
