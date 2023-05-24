<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <button type="submit" class="button">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from "../store/AuthStore";
//import { createUser } from "../realmService";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      const user = {
        email: this.email,
        password: this.password,
      };

      // Save user to MongoDB

      // Store user in the Pinia store
      const authStore = useAuthStore();
      authStore.createUser(user);
      authStore.setUser(user);

      // Reset the form fields
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: bold;
}

button {
  padding: 0.5rem 1rem;
}
</style>
