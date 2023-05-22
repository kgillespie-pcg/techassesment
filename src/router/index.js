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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const authenticatedCheck = useAuthStore().isAuthenticated();

  if (requiresAuth && !authenticatedCheck) {
    next({ path: "/", replace: true });
  } else {
    next();
  }
});

export default router;
