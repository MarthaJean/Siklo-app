import { setupLayouts } from "virtual:generated-layouts";
import { createRouter, createWebHistory } from "vue-router";

import Hero from "@/pages/LandingPage.vue";
import Auth from "@/pages/Auth.vue";
import Buyer from "@/pages/BuyerView.vue";
import MyListings from "@/pages/SellerView.vue";
import NotFound from "@/pages/NotFound.vue";
import ForbiddenView from "@/pages/ForbiddenView.vue";
import AdminUserRolesView from "@/pages/admin/AdminUserRolesView.vue";
import UserManagementView from "@/pages/admin/UserManagementView.vue";
import AnnouncementsView from "@/pages/admin/AnnouncementsView.vue";
import SettingsView from "@/pages/account/SettingsView.vue";
import SearchView from "@/pages/hometab/SearchView.vue";
import CartView from "@/pages/hometab/CartView.vue";
import ChatView from "@/pages/hometab/ChatView.vue";
import AddListingsView from "@/pages/AddListingsView.vue";

/**
 * Route definitions for the application
 */
export const routes = setupLayouts([
  {
    path: "/",
    component: Hero,
  },
  {
    path: "/auth",
    component: Auth,
  },

  {
    path: "/account/home",
    component: Buyer,
    meta: { requiresAuth: true,authPublic: true },
  },
  {
    path: "/home",
    component: Buyer,
    meta: { requiresAuth: true, authPublic: true },
  },
  {
    path: "/mylistings",
    component: MyListings,
    meta: { requiresAuth: true, authPublic: true },
  },
  {
    path: "/search",
    component: SearchView,
    meta: { requiresAuth: true, authPublic: true },
  },
  {
    path: "/cart",
    component: CartView,
    meta: { requiresAuth: true, authPublic: true },
  },
  {
    path: "/chat",
    component: ChatView,
    meta: { requiresAuth: true, authPublic: true },
  },
  {
    path: "/add-listings",
    component: AddListingsView,
    meta: { requiresAuth: true, authPublic: true },
  },
  {
    path: "/account/settings",
    component: SettingsView,
    meta: { requiresAuth: true, authPublic: true },
  },
  {
    path: "/admin/user-roles",
    component: AdminUserRolesView,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/user-management",
    component: UserManagementView,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/announcements",
    component: AnnouncementsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/forbidden",
    component: ForbiddenView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
]);

/**
 * Create and configure the router instance
 */
export const createAppRouter = () => {
  return createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });
};
