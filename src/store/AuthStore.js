import { defineStore } from "pinia";
import { realmApp } from "../realmService";
import { Credentials } from "realm-web";
import router from "./../router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    logoutUser: async () => {
      try {
        await realmApp.currentUser?.logOut();
        console.log("User logged out successfully");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
    loginUser: async (user) => {
      try {
        const credentials = Credentials.emailPassword(
          user.email,
          user.password
        );
        const userLoggedIn = await realmApp.logIn(credentials);
        console.log("User logged in successfully", userLoggedIn);

        // Redirect to the dashboard route
        router.push({ name: "owners" });
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },
    createUser: async (user) => {
      try {
        await realmApp.emailPasswordAuth.registerUser(
          user.email,
          user.password
        );
        console.log("User registered successfully");

        // Log in the user after successful registration
        const credentials = Credentials.emailPassword(
          user.email,
          user.password
        );
        const userLoggedIn = await realmApp.logIn(credentials);
        console.log("User logged in successfully", userLoggedIn);

        // Redirect to the dashboard route
        router.push({ name: "owners" });
      } catch (error) {
        console.error("Error creating user:", error);
      }
    },
    isAuthenticated: () => {
      const user = realmApp.currentUser;
      return user !== null && !user.isAnonymous;
    },
  },
  getters: {
    getCurrentUser: (state) => {
      return state.currentUser;
    },
  },
});
