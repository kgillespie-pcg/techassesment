//import necessary stores, components, views, and the router
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import DashboardView from "../views/DashboardView.vue";
import OwnersView from "../views/OwnersView.vue";
import OwnerAboutView from "../views/OwnerAboutView.vue";
import LandHoldingsView from "../views/LandHoldingsView.vue";
import LandHoldingAboutView from "../views/LandHoldingAboutView.vue";
import CreateOwnerView from "../views/CreateOwnerView.vue";
import CreateLandHoldingView from "../views/CreateLandHoldingView.vue";
import UpdateOwnerView from "../views/UpdateOwnerView.vue";
import UpdateLandHoldingView from "../views/UpdateLandHoldingView.vue";
import { useAuthStore } from "@/store/AuthStore";

//Establish routes
const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "/owners",
    name: "owners",
    component: OwnersView,
    meta: { requiresAuth: true },
  },
  {
    path: "/owner/:id",
    name: "OwnerAboutView",
    component: OwnerAboutView,
    meta: { requiresAuth: true },
  },
  {
    path: "/update-owner/:id",
    name: "UpdateOwnerView",
    component: UpdateOwnerView,
    meta: { requiresAuth: true },
  },
  {
    path: "/update-landholding/:id",
    name: "UpdateLandHoldingView",
    component: UpdateLandHoldingView,
    meta: { requiresAuth: true },
  },
  {
    path: "/landholdings",
    name: "landholdings",
    component: LandHoldingsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/landholdings/:id",
    name: "landholding-about",
    component: LandHoldingAboutView,
    meta: { requiresAuth: true },
  },
  {
    path: "/create-owner",
    name: "create-owner",
    component: CreateOwnerView,
    meta: { requiresAuth: true },
  },
  {
    path: "/owners/:id/create-landholding",
    name: "create-landholding",
    component: CreateLandHoldingView,
    meta: { requiresAuth: true },
  },
];

// initializes a Vue Router instance using the createRouter function.
const router = createRouter({
  //The createRouter function takes an object with configuration options as its argument.

  //history: This property is set to createWebHistory(process.env.BASE_URL). It creates a history object for the router, specifically using the browser's History API. It is configured to use the BASE_URL value from the environment variables.

  //routes: contains an array of route configurations.
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//This code attaches a navigation guard using the beforeEach method of the router instance. The navigation guard is a function that will be called before each navigation.
//parameters represent the target route, the current route, and a function to control the navigation
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  //checks to see if that route has the meta set to requireauth
  const authenticatedCheck = useAuthStore().isAuthenticated();
  //returns a boolean value of true of false from the isAuthenticated function in the auth store
  if (requiresAuth && !authenticatedCheck) {
    //if the route requires auth but the authenticatedCheck is fals, the user is routed to the login page(the user needs to be logged in to access most of these routes)
    next({ path: "/", replace: true });
  } else {
    next();
  }
});

export default router;
