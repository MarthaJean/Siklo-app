import { setupLayouts } from "virtual:generated-layouts";
import { createRouter, createWebHistory } from "vue-router";

import Hero from "@/pages/index.vue";
import Auth from "@/pages/Auth.vue";
import Buyer from "@/pages/BuyerView.vue";
import Seller from "@/pages/SellerView.vue";
import NotFound from "@/pages/NotFound.vue";
import ForbiddenView from "@/pages/ForbiddenView.vue";
import AdminUserRolesView from "@/pages/admin/AdminUserRolesView.vue";
import UserManagementView from "@/pages/admin/UserManagementView.vue";
import AnnouncementsView from "@/pages/admin/AnnouncementsView.vue";
import SettingsView from "@/pages/account/SettingsView.vue";
import SearchView from "@/pages/hometab/SearchView.vue";
import CartView from "@/pages/hometab/CartView.vue";
import ChatView from "@/pages/hometab/ChatView.vue";

/**
 * Route definitions for the application
 */
const routes = setupLayouts([
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
    meta: { requiresAuth: true },
  },
  {
    path: "/buyer",
    component: Buyer,
    meta: { requiresAuth: true },
  },
  {
    path: "/seller",
    component: Seller,
    meta: { requiresAuth: true },
  },
  {
    path: "/search",
    component: SearchView,
  },
  {
    path: "/cart",
    component: CartView,
  },
  {
    path: "/chat",
    component: ChatView,
  },
  {
    path: "/account/settings",
    component: SettingsView,
    meta: { requiresAuth: true },
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
