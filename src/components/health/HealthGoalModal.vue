<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-dialog animate__animated animate__fadeInDown">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create Goal</h5>
          <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close"></button>
        </div>
        <form @submit.prevent="createGoal">
          <div class="modal-body">
            <div class="mb-3">
              <label for="healthGoalType" class="form-label">Health Goal Type</label>
              <input
                  type="text"
                  id="healthGoalType"
                  v-model="healthGoalType"
                  class="form-control"
                  placeholder="e.g., Walk, Fat Loss"
                  required
              />
            </div>
            <div class="mb-3">
              <label for="targetValue" class="form-label">Target Value</label>
              <input
                  type="number"
                  id="targetValue"
                  v-model="targetValue"
                  class="form-control"
                  placeholder="Enter Target Value"
                  required
              />
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
import { createHealthGoal } from "../../services/health";
import showToast from "@/utils/ToastManager.js";

export default {
  name: "HealthGoalModal",
  data() {
    return {
      healthGoalType: "",
      targetValue: null,
    };
  },
  methods: {
    async createGoal() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;
      const newSchedule = {
        userId,
        healthGoalType: this.healthGoalType,
        targetValue: this.targetValue,
        entryTime: new Date().toISOString(),
      };
      try {
        const response = await createHealthGoal(newSchedule);
        showToast("New goal added successfully.");
        this.$emit("goalAdded", response.data);
        this.$emit("close");
      } catch (error) {
        console.error("Error creating gaol:", error);
        showToast("Failed to create goal. Please try again.");
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
