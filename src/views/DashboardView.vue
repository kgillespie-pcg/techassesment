<template>
  <div>
    <h2>Dashboard</h2>
    <button @click="logout($router)">Logout</button>
    <button @click.stop="$router.push('/owners')">View All Owners</button>
    <button @click.stop="$router.push('/landholdings')">
      View All Land Holdings
    </button>
    <button @click.stop="$router.push('/create-owner')">Create an Owner</button>
  </div>
</template>

<script>
import { useAuthStore } from "../store/AuthStore";

export default {
  name: "DashboardView",
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
