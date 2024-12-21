<template>
  <div class="container mt-5">
    <Navbar />
    <h1>Welcome, {{ user.name }}</h1>
    <p>Your email: {{ user.email }}</p>
  </div>
</template>

<script>
import Navbar from '../components/common/Navbar.vue';

export default {
  components: { Navbar },
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || {},
    };
  },
};
</script>
