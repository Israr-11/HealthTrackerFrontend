<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Health Tracker</a>
      <button class="btn btn-danger ms-auto" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.$router.push('/');
      },
  },
};
</script>
