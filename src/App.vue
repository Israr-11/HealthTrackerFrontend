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
    // CHECK IF USER IS ALREADY LOGIN
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.isAuthenticated = true;
    }
  },
};
</script>
