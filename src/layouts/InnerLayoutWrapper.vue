<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useLandingController } from "@/controller/landingController";
import Sidebar1 from "@/components/common/sideBar/Sidebar.vue";

const { data, fetchLandingData } = useLandingController();

const footerConfig = computed(() => data.value?.ui?.footer);
const currentYear = computed(() => new Date().getFullYear());

function openLink(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

onMounted(async () => {
  await fetchLandingData();
});
</script>

<template>
  <v-app>
    <!-- Left Sidebar - Takes full left side -->
    <Sidebar1 :version="data?.version" />

    <!-- Dynamic Navbar Selection - Positioned to the right of sidebar -->
    <InsideNavbar1
      v-if="data?.ui?.navbarComponent === '1'"
      :config="data?.ui"
      class="navbar-with-sidebar"
    />

    <InsideNavbar2
      v-else-if="data?.ui?.navbarComponent === '2'"
      :config="data?.ui"
      class="navbar-with-sidebar"
    />

    <InsideNavbar3
      v-else-if="data?.ui?.navbarComponent === '3'"
      :config="data?.ui"
      class="navbar-with-sidebar"
    />

    <InsideNavbar4
      v-else-if="data?.ui?.navbarComponent === '4'"
      :config="data?.ui"
      class="navbar-with-sidebar"
    />

    <v-main class="main-with-sidebar">
      <slot name="content">
        <router-view />
      </slot>
    </v-main>

    <OuterFooter v-if="data?.ui?.footerComponent === '1'" :config="data?.ui" />
    <v-footer
      v-else-if="data?.ui?.footerComponent === '2' && footerConfig"
      app
      density="compact"
      :color="footerConfig.color"
      class="text-white"
    >
      <v-container class="py-2">
        <v-row align="center" class="text-caption">
          <v-col cols="12" md="6" class="text-center text-md-left">
            <span class="font-weight-medium">
              {{ footerConfig.companyName }}
            </span>
            <span class="text-grey-lighten-1 ms-2">
              {{ footerConfig.tagline }}
            </span>
          </v-col>
          <v-col cols="12" md="6" class="text-center text-md-right">
            <v-btn
              v-for="social in footerConfig.socialLinks"
              :key="social.platform"
              :aria-label="social.label"
              icon
              variant="text"
              size="small"
              class="mx-1"
              @click="openLink(social.url)"
            >
              <v-icon :icon="social.icon" size="18" />
            </v-btn>
          </v-col>
        </v-row>
        <v-divider class="my-2" color="rgba(255, 255, 255, 0.2)" />
        <v-row justify="center">
          <v-col cols="12" class="text-center text-caption text-grey-lighten-1">
            {{ currentYear }} © {{ footerConfig.copyright }}
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style scoped>
/* Navbar positioning - push to the right of sidebar */
.navbar-with-sidebar {
  margin-left: 280px; /* Match sidebar width */
  width: calc(100% - 280px); /* Adjust width to account for sidebar */
}

/* Main content positioning */
.main-with-sidebar {
  padding-left: 280px; /* Match sidebar width */
  padding-top: 64px; /* Account for navbar height */
}

/* Responsive behavior for small screens */
@media (max-width: 960px) {
  .navbar-with-sidebar {
    margin-left: 0;
    width: 100%;
  }

  .main-with-sidebar {
    padding-left: 0;
    padding-top: 64px; /* Keep top padding for mobile navbar */
  }
}

/* Ensure proper spacing and layout */
.v-app {
  position: relative;
}
</style>
