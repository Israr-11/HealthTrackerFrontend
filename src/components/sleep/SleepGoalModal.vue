<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-dialog animate__animated animate__fadeInDown">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Sleep Goal</h5>
          <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close"></button>
        </div>
        <form @submit.prevent="createGoal">
          <div class="modal-body">
            <div class="mb-3">
              <label for="targetSleepHours" class="form-label">Target Sleep Hours</label>
              <input
                  type="number"
                  id="targetSleepHours"
                  v-model="targetSleepHours"
                  class="form-control"
                  placeholder="e.g., 8"
                  required
              />
            </div>
            <div class="mb-3">
              <label for="targetSleepQuality" class="form-label">Target Sleep Quality</label>
              <select id="targetSleepQuality" v-model="targetSleepQuality" class="form-control" required>
                <option value="" disabled>Select Quality</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="poor">Poor</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="targetSleepTiming" class="form-label">Target Sleep Timing</label>
              <select id="targetSleepTiming" v-model="targetSleepTiming" class="form-control" required>
                <option value="" disabled>Select Timing</option>
                <option value="day">Day</option>
                <option value="night">Night</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Close</button>
            <button type="submit" class="btn btn-primary">Add Goal</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { createSleepGoal} from "@/services/sleep.js";
import showToast from "@/utils/ToastManager.js";

export default {
  name: "SleepGoalModal",
  data() {
    return {
      targetSleepHours: "",
      targetSleepQuality: "",
      targetSleepTiming: "",
    };
  },
  methods: {
    async createGoal() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;
      const newGoal = {
        userId,
        targetSleepHours: this.targetSleepHours,
        targetSleepQuality:this.targetSleepQuality,
        targetSleepTiming: this.targetSleepTiming,
        entryTime: new Date().toISOString(),
      };
      try {
        const response = await createSleepGoal(newGoal);
        showToast("New goal added successfully.");
        this.$emit("goalAdded", response.data);
        window.location.reload();
        this.$emit("close");
      } catch (error) {
        console.error("Error creating gaol:", error);
        showToast("Failed to create goal. Please try again.", "error");
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
.btn-primary {
  background-color: #5c636a;
  border-color: #5c636a;
  transition: all 0.3s ease;
}
</style>
