<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-1 mt-5">
      <h3 class="table-title">Goals</h3>
      <button class="btn btn-primary" @click="showModal = true">Create Goal</button>
    </div>

    <!--FETCHING SLEEP GOALS!-->

    <table class="table table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>Sleep ID</th>
        <th>Target Sleep Hours Type</th>
        <th>Target Sleep Quality</th>
        <th>Target Sleep Timing</th>
        <th>Entry Time</th>
        <th>Enter Sleep Log</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(goal, index) in goals" :key="goal.id">
        <td>{{ index + 1 }}</td>
        <td>{{ goal.id }}</td>
        <td>{{ goal.targetSleepHours }}</td>
        <td>{{ goal.targetSleepQuality }}</td>
        <td>{{ goal.targetSleepTiming }}</td>
        <td>{{ new Date(goal.entryTime).toLocaleString() }}</td>
        <td>
          <button
              class="btn btn-success btn-sm"
              @click="openLogModal(goal)"
          >
            <i class="bi bi-check-circle"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <!--MODAL FOR SLEEP GOAL!-->

    <SleepGoalModal
        v-if="showModal"
        @close="showModal = false"
        @scheduleAdded="addGoal"
    />

    <!--MODAL FOR SLEEP LOG!-->

    <div
        v-if="showCompletionModal"
        class="modal-overlay"
        @click.self="closeLogModal"
    >
      <div class="modal-dialog animate__animated animate__fadeInDown">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Enter Log for Sleep</h5>
            <button
                type="button"
                class="btn-close"
                @click="closeLogModal"
                aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="AddLog">

            <div class="modal-body">
              <div class="mb-3">
                <label for="actualSleepHours" class="form-label">Actual Sleep Hours</label>
                <input
                    type="number"
                    id="actualSleepHours"
                    v-model="actualSleepHours"
                    class="form-control"
                    placeholder="e.g 1, 2, 3 etc"
                    required
                />
              </div>
            </div>

            <div class="modal-body">
              <div class="mb-3">
                <label for="actualSleepQuality" class="form-label">Actual Sleep Quality</label>
                <select
                    id="actualSleepQuality"
                    v-model="actualSleepQuality"
                    class="form-control"
                    required
                >
                  <option value="" disabled>Select Quality</option>
                  <option value="excellent">excellent</option>
                  <option value="good">good</option>
                  <option value="poor">poor</option>
                </select>
              </div>
            </div>


            <div class="modal-body">
              <div class="mb-3">
                <label for="actualSleepTiming" class="form-label">Actual Sleep Timing</label>
                <select
                    id="actualSleepTiming"
                    v-model="actualSleepTiming"
                    class="form-control"
                    required
                >
                  <option value="" disabled >Select Timing</option>
                  <option value="day">day</option>
                  <option value="night">night</option>
                </select>
              </div>
            </div>

            <div class="modal-footer">
              <button
                  type="button"
                  class="btn btn-secondary"
                  @click="closeLogModal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">Submit Log</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import SleepGoalModal from "./SleepGoalModal.vue";
import showToast from "@/utils/ToastManager.js";
import { createSleepGoalAndLog, getSleepGoalByUserId } from "@/services/sleep.js";

export default {
  name: "GoalsList",
  components: {SleepGoalModal },
  data() {
    return {
      goals: [],
      showModal: false,
      showCompletionModal: false,
      selectedGoal: null,
      actualSleepHours: "",
      actualSleepQuality: "",
      actualSleepTiming: "",
    };
  },
  async mounted() {
    await this.fetchGoals();
  },
  methods: {
    //FETCHING THE GOALS FOR SLEEP FEATURE
    async fetchGoals() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;
      try {
        const scheduleResponse = await getSleepGoalByUserId(userId);
        this.goals = scheduleResponse.data;

      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    },
    openLogModal(goal) {
      this.selectedGoal = goal;
      this.showCompletionModal = true;
    },
    closeLogModal() {
      this.showCompletionModal = false;
      this.selectedGoal = null;
    },

    //ADDING LOG FOR SPECIFIC GOAL
    async AddLog() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;
      const sleepGoalId = this.selectedGoal.id;

      const logData = {
        userId,
        sleepGoalId,
        actualSleepHours: this.actualSleepHours,
        actualSleepQuality: this.actualSleepQuality,
        actualSleepTiming: this.actualSleepTiming,

      };

      try {
        await createSleepGoalAndLog(logData);
        this.selectedGoal.completed = true;
        showToast("Sleep log added successfully.");
        window.location.reload()
        this.closeLogModal();
      } catch (error) {
        console.error("Error marking goal as completed:", error);
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
