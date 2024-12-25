<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-1 mt-5">
      <h3 class="table-title">Goals</h3>
      <button class="btn btn-primary" @click="showModal = true">Create Mental Health Goal</button>
    </div>

    <!--FETCHING MENTAL HEALTH GOALS!-->

    <table class="table table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>Mental Health Goal ID</th>
        <th>Target Mood Score</th>
        <th>Entry Time</th>
        <th>Enter Mental Health Log</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(goal, index) in goals" :key="goal.id">
        <td>{{ index + 1 }}</td>
        <td>{{ goal.id }}</td>
        <td>{{ goal.targetMoodScore }}</td>
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

    <!--MODAL FOR MENTAL HEALTH GOAL!-->

    <MentalHealthGoalModal
        v-if="showModal"
        @close="showModal = false"
        @scheduleAdded="addGoal"
    />

    <!--MODAL FOR MENTAL HEALTH LOG!-->

    <div
        v-if="showCompletionModal"
        class="modal-overlay"
        @click.self="closeLogModal"
    >
      <div class="modal-dialog animate__animated animate__fadeInDown">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Enter Log for Mental Health</h5>
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
                <label for="moodScore" class="form-label">Actual Mood Score</label>
                <input
                    type="number"
                    id="moodScore"
                    v-model="moodScore"
                    class="form-control"
                    placeholder="e.g 1, 2, 3, 4, 5, 6, 7, 8 ..."
                    required
                />
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

import MentalHealthGoalModal from "./MentalHealthGoalModal.vue";
import showToast from "@/utils/ToastManager.js";
import {
  createMentalHealthGoalsAndLogs,
  getMentalHealthGoalsByUserId,
  getMentalHealthLogsByUserId
} from "@/services/mentalhealth.js";

export default {
  name: "GoalsList",
  components: {MentalHealthGoalModal },
  data() {
    return {
      goals: [],
      showModal: false,
      showCompletionModal: false,
      selectedGoal: null,
      moodScore: "",
    };
  },
  async mounted() {
    await this.fetchGoals();
  },
  methods: {
    //FETCHING THE GOALS FOR MENTAL HEALTH FEATURE
    async fetchGoals() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;
      try {
        const scheduleResponse = await getMentalHealthGoalsByUserId(userId);
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
      moodScore: null;
    },

    //ADDING LOG FOR SPECIFIC GOAL
    async AddLog() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;
      const mentalHealthGoalId = this.selectedGoal.id;

      const logData = {
        userId,
        mentalHealthGoalId,
        moodScore: this.moodScore
      };

      try {
        await createMentalHealthGoalsAndLogs(logData);
        this.selectedGoal.completed = true;
        showToast("Mental health log added successfully.");
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
.me-2 {
  margin-right: 0.5rem;
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
