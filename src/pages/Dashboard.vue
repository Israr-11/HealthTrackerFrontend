<template>
  <div class="custom-container mt-3 text-center">
    <Navbar />
    <div class="welcome-section py-0">
      <h4 class="display-4 fw-bold">Welcome, <span class="text-primary">{{ user.name }}</span></h4>
      <p class="lead text-muted">We're glad to have you here! Explore your dashboard and manage health goals in a super easy way.</p>
    </div>
    <FeatureGrid/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue';
import Footer from "@/components/common/Footer.vue";
import FeatureGrid from "@/components/dashboard/FeatureGrid.vue";

export default {
  components: {Footer, Navbar,FeatureGrid },
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
