<template>
  <div v-if="isVisible" class="toaster" :class="type">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "info",
    },
  },
  data() {
    return {
      isVisible: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isVisible = false;
    }, 2500);
  },
};
</script>

<style>
.toaster {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  z-index: 1000;
}
.toaster.info {
  background-color: #17a2b8;
}
.toaster.success {
  background-color: #28a745;
}
.toaster.error {
  background-color: #dc3545;
}
.toaster.warning {
  background-color: #ffc107;
  color: #000;
}
</style>
