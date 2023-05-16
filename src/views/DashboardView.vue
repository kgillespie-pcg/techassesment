<template>
  <div>
    <h2>Dashboard</h2>
    <button @click="logout($router)">Logout</button>
  </div>
</template>

<script>
import { useAuthStore } from "../store/AuthStore";

export default {
  methods: {
    logout(router) {
      const authStore = useAuthStore();
      authStore.logoutUser(); // Call the logoutUser action from the authStore
      // Perform any additional cleanup or logout logic
      // For example, clearing local storage, resetting state, etc.

      router.push("/"); // Redirect to the home page ("/") after logout
    },
  },
};
</script>
