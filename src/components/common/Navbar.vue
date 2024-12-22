<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand fw-bold ms-3" to="/dashboard">
          <i>Health Tracker</i>
        </router-link>

        <button
            class="navbar-toggler"
            type="button"
            @click="toggleMenu"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
            class="collapse navbar-collapse"
            :class="{ show: isOpen }"
            id="navbarNav"
        >
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <button
                  class="btn btn-primary ms-3"
                  @click="logout"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    scrollToPlans(e) {
      e.preventDefault();
      const plansSection = document.getElementById("plans");
      if (plansSection) {
        plansSection.scrollIntoView({ behavior: "smooth" });
      }
    },
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.btn-primary {
  background-color: #5c636a;
  border-color: #5c636a;
  transition: all 0.3s ease;
}
</style>
