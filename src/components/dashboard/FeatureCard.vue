<template>
  <div class="card feature-card shadow-lg">
    <div class="card-body text-center">
      <i :class="icon" class="feature-icon mb-4"></i>
      <h5 class="card-title text-dark">{{ title }}</h5>
      <p class="card-text text-muted">{{ description }}</p>
      <router-link :to="link" class="btn btn-custom">Go to {{ title }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    icon: String,
    link: String,
  },
};
</script>

<style scoped>
.feature-card {
  width: 20rem;
  margin: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.feature-icon {
  font-size: 3rem;
  color: #007bff;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
}

.card-text {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 1.5rem;
}

.btn-custom {
  background-color: #5c636a;
  color: white;
  border-radius: 5px;
  padding: 0.6rem 1.2rem;
  text-decoration: none;
}

.btn-custom:hover {
  background-color: #4b535a;
  text-decoration: none;
}
</style>
