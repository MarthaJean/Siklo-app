<script lang="ts" setup>
import type { UIConfig, LogoConfig } from "@/controller/landingController";
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import { useTheme } from "@/composables/useTheme";
import { useAuthUserStore } from "@/stores/authUser";
import { useUserPermissions } from "@/composables/useUserPermissions";
import SlugName from "./SlugName.vue";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { type NavigationGroup, type NavigationItem } from "@/utils/navigation";

interface Props {
  config?: UIConfig | null;
}

const props = defineProps<Props>();
const router = useRouter();
const authStore = useAuthUserStore();
const { getFilteredNavigationGroups, isLoading: navLoading } =
  useUserPermissions();

// Vuetify display composable for responsiveness
const { mobile, mdAndUp, lgAndUp, xs, sm, md } = useDisplay();

// Mobile drawer state
const drawer = ref(false);
const isScrolled = ref(false);
const lastScrollY = ref(0);

// Theme management
const {
  toggleTheme: handleToggleTheme,
  getCurrentTheme,
  isLoadingTheme,
} = useTheme();

const navbarConfig = computed(() => props.config?.navbar);
const navigationGroups = computed(() => getFilteredNavigationGroups());

// Positioning logic that accounts for sidebar
const navbarPositioning = computed(() => {
  const sidebarWidth = 280; // Match the sidebar width

  if (lgAndUp.value) {
    // Desktop: Position navbar in the content area (after sidebar)
    const availableWidth = `calc(100vw - ${sidebarWidth}px)`;
    const margin = isScrolled.value ? 10 : 20;
    const navbarWidth = `calc(${availableWidth} - ${margin * 2}px)`;

    return {
      top: isScrolled.value ? "10px" : "20px",
      left: `${sidebarWidth + margin}px`,
      transform: isScrolled.value ? "scale(0.98)" : "scale(1)",
      width: navbarWidth,
      maxWidth: `calc(1200px - ${sidebarWidth}px - ${margin * 2}px)`,
      right: `${margin}px`,
    };
  } else {
    // Mobile: Full width positioning (sidebar is hidden)
    return {
      top: isScrolled.value
        ? xs.value
          ? "4px"
          : "10px"
        : xs.value
          ? "8px"
          : "20px",
      left: "50%",
      transform: `translateX(-50%) ${isScrolled.value ? "scale(0.98)" : "scale(1)"}`,
      width: isScrolled.value
        ? xs.value
          ? "96%"
          : "90%"
        : xs.value
          ? "98%"
          : "95%",
      maxWidth: "1200px",
    };
  }
});

// Theme toggle computed properties
const currentTheme = computed(() => getCurrentTheme());
const themeIcon = computed(() => {
  return currentTheme.value === "dark"
    ? "mdi-white-balance-sunny"
    : "mdi-weather-night";
});
const themeTooltip = computed(() => {
  return `Switch to ${currentTheme.value === "dark" ? "light" : "dark"} theme`;
});

const userEmail = computed(() => authStore.userData?.email || "Not available");
const userRole = computed(
  () => authStore.userData?.user_metadata?.role ?? "Unknown",
);

const drawerScrollRef = ref<HTMLElement | null>(null);
let drawerScrollbar: PerfectScrollbar | null = null;

// Scroll handler for floating effect
const handleScroll = () => {
  const currentScrollY = window.scrollY;
  isScrolled.value = currentScrollY > 20;

  lastScrollY.value = currentScrollY;
};

// Watch for drawer state changes and close on route change
watch(
  () => router.currentRoute.value,
  () => {
    if (drawer.value) {
      drawer.value = false;
    }
  },
);

// Close drawer when switching from mobile to desktop
watch(lgAndUp, (newLgAndUp, oldLgAndUp) => {
  if (!oldLgAndUp && newLgAndUp && drawer.value) {
    drawer.value = false;
  }
});

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  drawerScrollbar?.destroy();
  drawerScrollbar = null;
});

function toggleTheme() {
  handleToggleTheme();
}

function toggleDrawer() {
  drawer.value = !drawer.value;
}

function closeDrawer() {
  drawer.value = false;
}

const initDrawerScrollbar = async () => {
  if (!drawerScrollRef.value) {
    return;
  }

  await nextTick();

  if (drawerScrollbar) {
    drawerScrollbar.update();
    return;
  }

  drawerScrollbar = new PerfectScrollbar(drawerScrollRef.value, {
    suppressScrollX: true,
  });
};

watch(drawer, (isOpen) => {
  if (isOpen) {
    void initDrawerScrollbar();
  }
});

async function handleLogout() {
  try {
    await authStore.signOut();
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
</script>

<template>
  <div v-if="config?.showNavbar && navbarConfig">
    <!-- Floating Navbar using v-app-bar with Vuetify positioning -->
    <v-app-bar
      :elevation="isScrolled ? 12 : 8"
      :height="xs ? 56 : 64"
      rounded="pill"
      position="fixed"
      class="mx-auto px-2"
      :style="{
        top: navbarPositioning.top,
        left: navbarPositioning.left,
        transform: navbarPositioning.transform,
        width: navbarPositioning.width,
        maxWidth: navbarPositioning.maxWidth,
        right: navbarPositioning.right,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }"
    >
      <!-- Logo Section with Badge -->
      <template #prepend>
        <div class="d-flex align-center">
          <v-badge
            content="V3"
            color="success"
            dot
            offset-x="8"
            offset-y="8"
            class="me-2"
          >
            <!-- Logo Image with Icon Fallback -->
            <template v-if="navbarConfig.logo?.src">
              <v-img
                :src="navbarConfig.logo.src"
                :alt="navbarConfig.logo.alt"
                :width="navbarConfig.logo.width || 42"
                :height="navbarConfig.logo.height || 42"
                contain
              >
                <template #error>
                  <!-- Fallback to avatar with icon if image fails to load -->
                  <v-avatar :color="navbarConfig.color" size="42">
                    <v-icon :icon="navbarConfig.icon" size="22" color="white" />
                  </v-avatar>
                </template>
              </v-img>
            </template>
            <template v-else>
              <!-- Default avatar with icon when no logo is configured -->
              <v-avatar :color="navbarConfig.color" size="42">
                <v-icon :icon="navbarConfig.icon" size="22" color="white" />
              </v-avatar>
            </template>
          </v-badge>

          <!-- Hide title on mobile to minimize navbar -->
          <div class="d-flex flex-column ms-2 d-none d-md-flex">
            <span class="text-subtitle-1 font-weight-bold text-primary">
              {{ navbarConfig.title }}
            </span>
            <span class="text-caption text-medium-emphasis">
              Academic Excellence
            </span>
          </div>
        </div>
      </template>

      <v-spacer />

      <!-- Desktop Actions -->
      <template #append>
        <div class="d-flex align-center" v-if="lgAndUp">
          <!-- Theme Toggle Menu -->
          <v-menu location="bottom">
            <template #activator="{ props: menuProps }">
              <v-btn
                v-bind="menuProps"
                :loading="isLoadingTheme"
                variant="outlined"
                rounded="pill"
                size="large"
                :prepend-icon="themeIcon"
              >
                <span>Theme</span>
              </v-btn>
            </template>

            <v-card width="200" class="mt-2">
              <v-list density="compact">
                <v-list-item
                  prepend-icon="mdi-white-balance-sunny"
                  title="Light Mode"
                  :active="currentTheme === 'light'"
                  @click="currentTheme === 'dark' && toggleTheme()"
                />
                <v-list-item
                  prepend-icon="mdi-weather-night"
                  title="Dark Mode"
                  :active="currentTheme === 'dark'"
                  @click="currentTheme === 'light' && toggleTheme()"
                />
              </v-list>
            </v-card>
          </v-menu>

          <!-- User Slug Name Component -->
          <SlugName class="ml-2" />
        </div>

        <!-- Mobile Menu Button -->
        <v-btn
          v-if="!lgAndUp"
          icon="mdi-menu"
          variant="text"
          :size="xs ? 'default' : 'large'"
          @click="toggleDrawer"
        />
      </template>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :temporary="!lgAndUp"
      :permanent="false"
      location="start"
      :width="280"
      :scrim="true"
      :elevation="24"
      absolute
      class="pa-0 d-flex flex-column"
      style="
        position: fixed !important;
        z-index: 9999 !important;
        top: 0 !important;
        left: 0 !important;
        height: 100vh !important;
      "
    >
      <!-- Drawer Header with Logo and Title -->
      <template #prepend>
        <v-card flat class="px-4 py-6">
          <div class="d-flex align-center">
            <v-badge
              content="V3"
              color="success"
              dot
              offset-x="8"
              offset-y="8"
              class="me-3"
            >
              <!-- Logo Image with Icon Fallback -->
              <template v-if="navbarConfig.logo?.src">
                <v-img
                  :src="navbarConfig.logo.src"
                  :alt="navbarConfig.logo.alt"
                  :width="navbarConfig.logo.width || 48"
                  :height="navbarConfig.logo.height || 48"
                  contain
                >
                  <template #error>
                    <!-- Fallback to avatar with icon if image fails to load -->
                    <v-avatar :color="navbarConfig.color" size="48">
                      <v-icon
                        :icon="navbarConfig.icon"
                        size="24"
                        color="white"
                      />
                    </v-avatar>
                  </template>
                </v-img>
              </template>
              <template v-else>
                <!-- Default avatar with icon when no logo is configured -->
                <v-avatar :color="navbarConfig.color" size="48">
                  <v-icon :icon="navbarConfig.icon" size="24" color="white" />
                </v-avatar>
              </template>
            </v-badge>

            <div class="d-flex flex-column">
              <span class="text-h6 font-weight-bold text-primary">
                {{ navbarConfig.title }}
              </span>
              <span class="text-caption text-medium-emphasis">
                Academic Excellence
              </span>
            </div>
          </div>

          <!-- Close Button -->
          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            class="position-absolute"
            style="top: 16px; right: 16px"
            @click="closeDrawer"
          />
        </v-card>
        <v-divider />
      </template>

      <!-- Navigation List -->
      <div ref="drawerScrollRef" class="flex-grow-1 overflow-hidden">
        <v-list nav class="py-0">
          <div v-if="navLoading" class="text-center py-4">
            <v-progress-circular indeterminate color="primary" size="24" />
          </div>
          <template v-else v-for="group in navigationGroups" :key="group.title">
            <!-- Navigation Group -->
            <v-list-group :value="group.title">
              <template #activator="{ props: activatorProps }">
                <v-list-item
                  v-bind="activatorProps"
                  :prepend-icon="group.icon"
                  :title="group.title"
                  rounded="xl"
                  class="ma-2"
                />
              </template>

              <!-- Navigation Items -->
              <v-list-item
                v-for="item in group.children"
                :key="item.route"
                :prepend-icon="item.icon"
                :title="item.title"
                :to="item.route"
                rounded="xl"
                class="ma-2 ms-4"
                @click="closeDrawer"
              />
            </v-list-group>
          </template>
        </v-list>
      </div>

      <v-divider class="my-2 mx-4" />

      <!-- Theme Toggle -->
      <v-list nav class="py-0">
        <v-list-group value="Theme">
          <template #activator="{ props: activatorProps }">
            <v-list-item
              v-bind="activatorProps"
              :prepend-icon="themeIcon"
              title="Theme"
              :subtitle="`Current: ${currentTheme === 'dark' ? 'Dark' : 'Light'} Mode`"
              rounded="xl"
              class="ma-2"
            />
          </template>

          <v-list-item
            prepend-icon="mdi-white-balance-sunny"
            title="Light Mode"
            :active="currentTheme === 'light'"
            rounded="xl"
            class="ma-2 ms-4"
            @click="currentTheme === 'dark' && toggleTheme()"
          />
          <v-list-item
            prepend-icon="mdi-weather-night"
            title="Dark Mode"
            :active="currentTheme === 'dark'"
            rounded="xl"
            class="ma-2 ms-4"
            @click="currentTheme === 'light' && toggleTheme()"
          />
        </v-list-group>

        <v-divider class="my-2 mx-4" />

        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          to="/account/home"
          rounded="xl"
          class="ma-2"
          @click="closeDrawer"
        />
        <v-list-item
          prepend-icon="mdi-cog-outline"
          title="Account Settings"
          to="/account/settings"
          rounded="xl"
          class="ma-2"
          @click="closeDrawer"
        />
      </v-list>

      <v-divider class="my-2 mx-4" />

      <v-card flat class="px-4 py-3">
        <div class="d-flex align-center">
          <SlugName class="me-2" />
          <div class="d-flex flex-column">
            <span class="text-body-2 font-weight-medium">User details</span>
            <span class="text-caption text-medium-emphasis">
              {{ userEmail }}
            </span>
            <span class="text-caption text-medium-emphasis">
              Role: {{ userRole }}
            </span>
          </div>
        </div>
        <v-btn
          class="mt-3"
          color="error"
          variant="tonal"
          size="small"
          prepend-icon="mdi-logout"
          block
          @click="handleLogout"
        >
          Logout
        </v-btn>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<style scoped>
/* All styling handled by Vuetify components and utilities only */
</style>
