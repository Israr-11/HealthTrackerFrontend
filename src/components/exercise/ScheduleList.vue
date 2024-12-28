<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-1 mt-5">
      <h3 class="table-title">Schedules</h3>
      <button class="btn btn-primary" @click="showModal = true">Create Schedule</button>
    </div>

    <table class="table table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>Exercise ID</th>
        <th>Exercise Type</th>
        <th>Duration (minutes)</th>
        <th>Entry Time</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(schedule, index) in schedules" :key="schedule.id">
        <td>{{ index + 1 }}</td>
        <td>{{ schedule.id }}</td>
        <td>{{ schedule.exerciseType }}</td>
        <td>{{ schedule.duration }}</td>
        <td>{{ new Date(schedule.entryTime).toLocaleString() }}</td>
        <td>
          <button class="btn btn-danger btn-sm me-2" @click="deleteSchedule(schedule.id)">
            <i class="bi bi-trash"></i>
          </button>

          <button v-if="!schedule.completed" class="btn btn-success btn-sm" @click="markAsCompleted(schedule)">
            <i class="bi bi-check-circle"></i>
          </button>

          <button v-else class="btn btn-success btn-sm" disabled>
            <i class="bi bi-check-circle-fill"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <ExerciseScheduleModalScheduleModal
        v-if="showModal"
        @close="showModal = false"
        @scheduleAdded="addSchedule"
    />

    <div v-if="showCompletionModal" class="modal show" style="display: block; background: rgba(0, 0, 0, 0.5);" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Mark as Completed</h5>
            <button type="button" class="btn-close" @click="showCompletionModal = false"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to mark this schedule as completed?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showCompletionModal = false">Close</button>
            <button type="button" class="btn btn-primary" @click="confirmCompletion">Yes, Mark as Completed</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExerciseScheduleModalScheduleModal from "./ExerciseScheduleModal.vue";
import {
  getExerciseSchedulesByUserId,
  deleteExerciseSchedulesByScheduleId,
  createExerciseLogs,
  getExerciseLogsByUserId,
} from "../../services/exercise";
import showToast from "@/utils/ToastManager.js";
import showLoadingToast from "@/utils/LoadingToast.js";

export default {
  name: "ScheduleList",
  components: {
    ExerciseScheduleModalScheduleModal,
  },
  data() {
    return {
      schedules: [],
      showModal: false,
      showCompletionModal: false,
      selectedSchedule: null,
    };
  },
  async mounted() {
    await this.fetchSchedules();
  },
  methods: {
    async fetchSchedules() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;
      try {
        const scheduleResponse = await getExerciseSchedulesByUserId(userId);
        this.schedules = scheduleResponse.data;

        const logResponse = await getExerciseLogsByUserId(userId);
        const logs = logResponse.data;

        this.schedules.forEach(schedule => {
          const log = logs.find(log => log.exerciseId === schedule.id && log.status === 'completed');
          if (log) {
            schedule.completed = true;
          } else {
            schedule.completed = false;
          }
        });
      } catch (error) {
        console.error("Error fetching schedules:", error);
        showToast("Error fetching schedules. Please try again.");
      }
    },
    async deleteSchedule(scheduleId) {
      try {
        await deleteExerciseSchedulesByScheduleId(scheduleId);
        this.schedules = this.schedules.filter((schedule) => schedule.id !== scheduleId);
        showToast("Schedule deleted successfully.");
      } catch (error) {
        console.error("Error deleting schedule:", error);
        showToast("Error deleting schedule. Please try again.");
      }
    },
    addSchedule(newSchedule) {
      this.schedules.push(newSchedule);
    },
    markAsCompleted(schedule) {
      this.selectedSchedule = schedule;
      this.showCompletionModal = true;
    },
    async confirmCompletion() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;
      const scheduleId = this.selectedSchedule.id;

      const logData = {
        userId,
        exerciseId: scheduleId,
        status: "completed",
      };

      try {
        await createExerciseLogs(logData);

        this.selectedSchedule.completed = true;
        showLoadingToast()
        this.showCompletionModal = false;
        this.selectedSchedule = null;
      } catch (error) {
        console.error("Error marking schedule as completed:", error);
        showToast("Error marking schedule as completed. Please try again.");

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
.me-2 {
  margin-right: 0.5rem;
}
</style>
