<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-1 mt-5">
      <h3 class="table-title">Logs</h3>
    </div>

    <table class="table table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>Health ID</th>
        <th>Status</th>
        <th>Achieved Value</th>
        <th>Target Reached</th>
        <th>Remarks</th>
        <th>Entry Time</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(log, index) in logs" :key="log.id">
        <td>{{ index + 1 }}</td>
        <td>{{ log.healthGoalId }}</td>
        <td>{{ log.status}}</td>
        <td>{{ log.achievedValue }}</td>
        <td>{{ log.targetReached ? 'Yes' : 'No' }}</td>
        <td>{{log.remarks}}</td>
        <td>{{ new Date(log.entryTime).toLocaleString() }}</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import {
  getHealthLogsByUserId,
} from "../../services/health";
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
        const response = await getHealthLogsByUserId(userId);
        this.logs = response.data;
      } catch (error) {
        console.error("Error fetching logs:", error);
        showToast("Error fetching logs. Please try again later.");
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

</style>
