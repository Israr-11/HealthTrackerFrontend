<template>
  <div id="app">
    <HomePage v-if="!isAuthenticated" @userAuthenticated="handleUserAuthenticated" />
    <router-view v-else />
  </div>
</template>

<script>

import HomePage from "./pages/HomePage.vue";

export default {
  components: {
    HomePage,
  },
  data() {
    return {
      isAuthenticated: false,
    };
  },
  methods: {
    handleUserAuthenticated() {
      this.isAuthenticated = true;
      this.$router.push("/dashboard");
    },
  },
  mounted() {
    // Check if the user is already logged in
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.isAuthenticated = true;
    }
  },
};
</script>
