<template>
  <div
    class="min-w-screen min-h-screen bg-gray-300 flex items-center justify-center px-5 py-5"
  >
    <div
      class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
      style="max-width: 1000px"
    >
      <div class="md:flex w-full justify-center">
        <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
          <div class="text-center mb-10">
            <h1 class="font-bold text-3xl text-gray-900">
              <img
                src="https://phxcapitalgroup.com/wp-content/uploads/2023/03/March-2023-Update-Web-2-Tiny.png"
              />
            </h1>
            <p>Enter your information to signup</p>
          </div>
          <form @submit.prevent="handleSubmit">
            <div>
              <div class="flex -mx-3"></div>
              <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                  <label for="email" class="text-xs font-semibold px-1"
                    >Email</label
                  >

                  <div class="flex">
                    <div
                      class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
                    >
                      <i
                        class="mdi mdi-email-outline text-gray-400 text-lg"
                      ></i>
                    </div>
                    <input
                      type="email"
                      id="email"
                      v-model="email"
                      required
                      class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="johnsmith@example.com"
                    />
                  </div>
                </div>
              </div>
              <div class="flex -mx-3">
                <div class="w-full px-3 mb-12">
                  <label for="password" class="text-xs font-semibold px-1"
                    >Password</label
                  >
                  <div class="flex">
                    <div
                      class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
                    >
                      <i class="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type="password"
                      id="password"
                      v-model="password"
                      required
                      class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="************"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex -mx-3">
              <div class="w-full px-3 mb-5">
                <button
                  class="block w-full max-w-s mx-auto bg-blue-600 hover:bg-blue-800 focus:bg-blue-800 text-white rounded-lg px-3 py-3 font-semibold"
                  type="submit"
                >
                  Signup
                </button>
              </div>
            </div>
          </form>
          <button
            class="block w-full max-w-s mx-auto bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 text-blue-900 rounded-lg px-3 py-3 font-semibold"
            @click.stop="$router.push('/')"
          >
            Already have an account? Login!
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- BUY ME A BEER AND HELP SUPPORT OPEN-SOURCE RESOURCES -->
  <div class="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
    <div>
      <a
        title="Buy me a beer"
        href="https://www.buymeacoffee.com/scottwindon"
        target="_blank"
        class="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
      >
        <img
          class="object-cover object-center w-full h-full rounded-full"
          src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg"
        />
      </a>
    </div>
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
