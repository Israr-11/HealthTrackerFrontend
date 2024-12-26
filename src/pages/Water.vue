<template>
  <div class="custom-container mt-3 text-center">
    <Navbar />
    <WaterDashboard/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue';
import Footer from "@/components/common/Footer.vue";
import WaterDashboard from "@/components/water/WaterDashboard.vue";
export default {
  components: {Footer, Navbar,WaterDashboard },
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
.welcome-section h4 {
  color: #343a40;
  font-size: 2.2rem;
}

.welcome-section p {
  margin-top: 0.5rem;
  color: #6c757d;
}

</style>

