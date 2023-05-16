import { defineStore } from 'pinia';
import { realmApp } from '../realmService'; // Import the `app` from realmService.js

export const useAuthStore = defineStore('auth', {
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
        console.log('User logged out successfully');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
  },
  getters: {
    getCurrentUser: (state) => {
      return state.currentUser;
    },
  },
});

