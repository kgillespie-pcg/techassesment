<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="button">Login</button>
    </form>
  </div>
</template>

<script>
//import { loginUser } from "../realmService";
import { useAuthStore } from "@/store/AuthStore";

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
      useAuthStore().loginUser(user);
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
