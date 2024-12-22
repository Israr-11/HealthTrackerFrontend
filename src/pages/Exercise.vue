<template>
  <div class="custom-container mt-3 text-center">
    <Navbar />
    <ExerciseDashboard/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue';
import Footer from "@/components/common/Footer.vue";
import ExerciseDashboard from "@/components/exercise/ExerciseDashboard.vue";
export default {
  components: {Footer, Navbar,ExerciseDashboard },
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || {},
    };
  },
};
</script>

<style scoped>
.custom-container {
  max-width: 92%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 0;
  padding-right: 0;
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

.welcome-section p {
  margin-top: 0.5rem;
  color: #6c757d;
}
</style>
