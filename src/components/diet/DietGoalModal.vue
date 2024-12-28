<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-dialog animate__animated animate__fadeInDown">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Diet Goal</h5>
          <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close"></button>
        </div>
        <form @submit.prevent="createGoal">

          <div class="modal-body">
            <div class="mb-3">
              <label for="dietGoalType" class="form-label">Diet Goal Type</label>
              <select
                  id="dietGoalType"
                  v-model="dietGoalType"
                  class="form-control"
                  required
              >
                <option value="" disabled class="text-black-50">Select Diet</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="lowCarb">Low Carb</option>
                <option value="highProtein">High Protein</option>
                <option value="glutenFree">Gluten-Free</option>
                <option value="organic">Organic</option>
                <option value="balancedDiet">Balanced Diet</option>
                <option value="keto">Keto</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="lowFat">Low Fat</option>
                <option value="wholeFoods">Whole Foods</option>
                <option value="dairyFree">Dairy-Free</option>
                <option value="lowSugar">Low Sugar</option>
              </select>
            </div>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label for="targetCalories" class="form-label">Target Calories</label>
              <input
                  type="number"
                  id="targetCalories"
                  v-model="targetCalories"
                  class="form-control"
                  placeholder="e.g., 100, 200, 300..."
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
import { createDietGoal} from "@/services/diet.js";
import showToast from "@/utils/ToastManager.js";

export default {
  name: "DietGoalModal",
  data() {
    return {
      dietGoalType: "",
      targetCalories: "",
    };
  },
  methods: {
    async createGoal() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;
      const newGoal = {
        userId,
        dietGoalType: this.dietGoalType,
        targetCalories:this.targetCalories,
        entryTime: new Date().toISOString(),
      };
      try {
        const response = await createDietGoal(newGoal);
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
.btn-primary {
  background-color: #5c636a;
  border-color: #5c636a;
  transition: all 0.3s ease;
}
</style>
