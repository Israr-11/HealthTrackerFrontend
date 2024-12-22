<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-dialog animate__animated animate__fadeInDown">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create Log</h5>
          <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close"></button>
        </div>
        <form @submit.prevent="createLog">
          <div class="modal-body">
            <div class="mb-3">
              <label for="exerciseType" class="form-label">Exercise Type</label>
              <input
                  type="text"
                  id="exerciseType"
                  v-model="exerciseType"
                  class="form-control"
                  placeholder="e.g., Running, Yoga"
                  required
              />
            </div>
            <div class="mb-3">
              <label for="duration" class="form-label">Duration (minutes)</label>
              <input
                  type="number"
                  id="duration"
                  v-model="duration"
                  class="form-control"
                  placeholder="Enter duration in minutes"
                  required
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Close</button>
            <button type="submit" class="btn btn-primary">Add Schedule</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { createExerciseLogs} from "@/services/exercise.js";
import showToast from "@/utils/ToastManager.js";

export default {
  name: "ScheduleModal",
  data() {
    return {
      exerciseType: "",
      duration: null,
    };
  },
  methods: {
    async createLog() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;
      const newLog = {
        userId,
        exerciseType: this.exerciseType,
        duration: this.duration,
        entryTime: new Date().toISOString(),
      };
      try {
        const response = await createExerciseLogs(newLog);
        showToast("New log added successfully.");
        this.$emit("logAdded", response.data);
        window.location.reload();
        this.$emit("close");
      } catch (error) {
        console.error("Error creating schedule:", error);
        showToast("Failed to create schedule. Please try again.", "error");
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal-dialog {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  max-width: 500px;
  width: 100%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #dee2e6;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-top: 1px solid #dee2e6;
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.animate__fadeInDown {
  animation-duration: 0.5s;
}
</style>
