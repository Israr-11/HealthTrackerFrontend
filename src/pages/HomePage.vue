<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8 col-sm-10">
        <div class="card shadow-sm border-0 rounded-lg">
          <div class="card-body">
            <h3 class="text-center mb-4">ENTER NAME AND EMAIL TO CONTINUE</h3>
            <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label for="fullName" class="form-label">Full Name</label>
                <input
                    v-model="name"
                    type="text"
                    id="fullName"
                    class="form-control form-control-lg"
                    placeholder="Enter your full name"
                    required
                />
              </div>

              <div class="mb-4">
                <label for="email" class="form-label">Email</label>
                <input
                    v-model="email"
                    type="email"
                    id="email"
                    class="form-control form-control-lg"
                    placeholder="Enter your email"
                    required
                />
              </div>

              <button type="submit" class="btn btn-primary btn-lg w-100 mt-4 py-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserByEmail, createUser } from "../services/user.js";
import showToast from "../utils/ToastManager.js";

export default {
  data() {
    return {
      email: "",
      name: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await getUserByEmail(this.email);
        if (response.status === 200) {
          const user = response.data;
          localStorage.setItem("user", JSON.stringify(user));
          this.$emit("userAuthenticated");
          showToast("User exists! Redirecting to dashboard...", "success");
          setTimeout(() => {
            this.$router.push("/dashboard");
          }, 3000);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          await this.createUser();
        } else {
          console.error("Error:", error);
          showToast("Error occurred while fetching user.", "error");
        }
      }
    },
    async createUser() {
      try {
        const response = await createUser({
          email: this.email,
          name: this.name,
        });

        if (response && response.data) {
          const newUser = response.data;
          localStorage.setItem("user", JSON.stringify(newUser));
          this.$emit("userAuthenticated");

          showToast("New user created! Redirecting to dashboard...", "success");
          setTimeout(() => {
            this.$router.push("/dashboard");
          }, 3000);
        } else {
          console.error("No data returned from createUser API:", response);
          showToast("Error creating new user.", "error");
        }
      } catch (error) {
        if (error.response) {
          console.error("Error creating user:", error.response.data);
        } else if (error.request) {
          console.error("Error with request:", error.request);
        } else {
          console.error("General error:", error.message);
        }
        showToast("Error creating user. Please try again later.", "error");
      }
    },
  },
};
</script>

<style scoped>
body {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  background-size: cover;
  height: 100vh;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

h3 {
  font-size: 1.5rem;
  color: #333;
  font-weight: bold;
}

.form-control {
  border-radius: 0.375rem;
  box-shadow: none;
  background-color: #f7f7f7;
  border: 1px solid #e0e0e0;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #2575fc;
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25);
}

.btn-primary {
  background-color: #5c636a;
  border-color: #5c636a;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #4a5055;
  border-color: #4a5055;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.mt-4 {
  margin-top: 1.5rem;
}

.w-100 {
  width: 100%;
}

.shadow-sm {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

@media (max-width: 992px) {
  .col-lg-6 {
    max-width: 100%;
  }
}
</style>
