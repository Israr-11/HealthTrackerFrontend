<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-1 mt-5">
      <h3 class="table-title">Logs</h3>
    </div>

    <table class="table table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>Exercise ID</th>
        <th>Status</th>
        <th>Completion Time</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(log, index) in logs" :key="log.id">
        <td>{{ index + 1 }}</td>
        <td>{{ log.exerciseId }}</td>
        <td>{{ log.status}}</td>
        <td>{{ new Date(log.entryTime).toLocaleString() }}</td>
        <td>
          <button
              class="btn btn-danger btn-sm"
              @click="deleteLogs(log.id)"
          >
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  getExerciseLogsByUserId,
  deleteExerciseLogsByScheduleId,
} from "../../services/exercise";
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
        const response = await getExerciseLogsByUserId(userId);
        this.logs = response.data;
      } catch (error) {
        console.error("Error fetching logs:", error);
        showToast("Error fetching logs. Please try again.");
      }
    },
    async deleteLogs(logId) {
      try {
        await deleteExerciseLogsByScheduleId(logId);
        this.logs = this.logs.filter(
            (log) => log.id !== logId
        );
        showToast("Log deleted successfully.");
      } catch (error) {
        console.error("Error deleting log:", error);
        showToast("Error deleting log. Please try again.");
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
