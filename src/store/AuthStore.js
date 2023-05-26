import { defineStore } from "pinia";
import { realmApp } from "../realmService";
import { Credentials } from "realm-web";
import router from "./../router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    // Action to set the user in the state
    setUser(user) {
      this.user = user;
    },
    // Action to log out the user
    logoutUser: async () => {
      try {
        // Log out the current user using the realmApp
        await realmApp.currentUser?.logOut();
        console.log("User logged out successfully");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
    // Action to log in the user
    loginUser: async (user) => {
      try {
        // Create credentials using the user's email and password
        const credentials = Credentials.emailPassword(
          user.email,
          user.password
        );
        // Log in the user using realmApp and the credentials
        const userLoggedIn = await realmApp.logIn(credentials);
        console.log("User logged in successfully", userLoggedIn);

        // Redirect to the dashboard route
        router.push({ name: "owners" });
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },
    // Action to create a new user
    createUser: async (user) => {
      try {
        // Register the user with the provided email and password
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
    // Action to check if the user is authenticated
    isAuthenticated: () => {
      // Get the current user from realmApp
      const user = realmApp.currentUser;
      // Check if the user exists and is not anonymous
      return user !== null && !user.isAnonymous;
    },
  },
  getters: {
    // Getter to retrieve the current user from the state
    getCurrentUser: (state) => {
      return state.currentUser;
    },
  },
});
