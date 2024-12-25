<template>
  <div>
    <div class="welcome-section py-1">
      <h4 class="display-4 fw-bold">Walk Management</h4>
    </div>
<section>
  <GoalsList/>
</section>
    <section>
      <LogList/>
      </section>
    <section>
      <PerformanceLineChart/>
    </section>
    <section>
      <PerformanceBarChart/>
    </section>
  </div>
</template>

<script>
import GoalsList from "./GoalsList.vue";
import LogList from "./LogList.vue";
import PerformanceBarChart from "./PerformanceBarChart.vue";
import PerformanceLineChart from "./PerformanceLineChart.vue";
export default {
  name: "WalkDashboard",
  components: {
    PerformanceBarChart,
    PerformanceLineChart,
    LogList,
   GoalsList,
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
section {
  margin: 20px 0;
}
.welcome-section {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.welcome-section h4 {
  color: #343a40;
  font-size: 2.2rem;
}
</style>
