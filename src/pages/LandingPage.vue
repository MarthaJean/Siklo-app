<template>
  <div :class="['siklo-landing', { 'dark-mode': isDarkMode }]">
    <!-- Navbar -->
    <nav :class="['navbar', { 'is-scrolled': isScrolled }]">
      <div class="navbar-container">
        <div class="logo">
          <img
            src="/assets/logo.png"
            alt="Siklo Logo"
            class="nav-logo-img"
            :style="{ filter: isDarkMode ? 'brightness(0) invert(1)' : 'none' }"
          />
        </div>
        <div class="nav-links">
          <a href="#features" @click.prevent="scrollTo('features')">Features</a>
          <a href="#impact" @click.prevent="scrollTo('impact')">Impact</a>
          <a href="#how-it-works" @click.prevent="scrollTo('how-it-works')"
            >How It Works</a
          >
        </div>
        <div class="nav-actions">
          <button
            class="theme-toggle"
            @click="toggleDarkMode"
            aria-label="Toggle Dark Mode"
          >
            <v-icon
              v-if="isDarkMode"
              size="22"
              :style="{ color: 'var(--accent-green)' }"
              >mdi-white-balance-sunny</v-icon
            >
            <v-icon v-else size="22" :style="{ color: 'var(--text-body)' }"
              >mdi-moon-waning-crescent</v-icon
            >
          </button>
          <button class="nav-cta" @click="navigateToAuth">
            Get Started &rarr;
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero" id="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            SIKLO<sup class="tm">&trade;</sup>
            <svg
              class="hero-underline"
              viewBox="0 0 300 30"
              preserveAspectRatio="none"
            >
              <path
                d="M5 20 Q 150 -10 295 25"
                fill="none"
                stroke="#5B9F68"
                stroke-width="6"
                stroke-linecap="round"
              />
            </svg>
          </h1>
          <p class="hero-tagline">
            Your farm waste has value.<br />Sell it, don't burn it.
          </p>
          <p class="hero-subtagline">
            Turn farm waste into income. Connect with buyers near you.
          </p>

          <div class="hero-buttons">
            <button class="btn btn-primary" @click="scrollTo('features')">
              Explore Features
            </button>
            <button class="btn btn-outline" @click="scrollTo('hero')">
              View Source
            </button>
          </div>
        </div>

        <div class="hero-visual hero-fade-in">
          <div class="hero-image-wrapper">
            <div class="glow-effect"></div>
            <img
              src="/assets/Pic1.jpg"
              alt="Sustainability and Bioenergy"
              class="hero-image"
            />
          </div>
        </div>
      </div>
      <div class="hero-scroll-indicator">
        <a href="#features" @click.prevent="scrollTo('features')">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--primary-green)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features" id="features" ref="featuresRef">
      <h2 class="section-title">What Siklo Does</h2>
      <div class="features-grid">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-card animate-up"
        >
          <div class="feature-icon">
            <v-icon size="32" :style="{ color: 'var(--accent-green)' }">{{
              feature.icon
            }}</v-icon>
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Impact Section -->
    <section
      class="impact"
      :class="{ 'impact-dark': isDarkMode, 'impact-light': !isDarkMode }"
      id="impact"
      ref="impactRef"
    >
      <div class="impact-container">
        <div class="impact-counters">
          <div class="counter-item animate-up">
            <div class="counter-value"><span ref="count1">0</span>+</div>
            <div class="counter-label">
              Millions of tons PH agricultural waste yearly
            </div>
          </div>
          <div class="counter-item animate-up">
            <div class="counter-value"><span ref="count2">0</span>%</div>
            <div class="counter-label">
              Biomass burned without a platform like Siklo
            </div>
          </div>
          <div class="counter-item animate-up">
            <div class="counter-value">
              ₱<span ref="count3">0</span> &rarr; Income
            </div>
            <div class="counter-label">
              What generators earn by selling instead of burning
            </div>
          </div>
        </div>
        <p class="impact-subcopy animate-up">
          Siklo turns an environmental burden into an economic opportunity — for
          farmers, millers, cooperatives, and the planet.
        </p>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works" id="how-it-works" ref="howItWorksRef">
      <h2 class="section-title">Three steps to your first deal</h2>
      <div class="steps-container">
        <div class="steps-line"></div>
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="step-item animate-up"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
        </div>
      </div>
    </section>

    <!-- Who It's For Section -->
    <section class="who-its-for" ref="whoItsForRef">
      <div class="split-container">
        <div class="split-card sellers animate-up">
          <div class="split-icon">
            <v-icon size="48" :style="{ color: 'var(--accent-green)' }"
              >mdi-account-group</v-icon
            >
          </div>
          <h3 class="split-title">Sellers</h3>
          <p class="split-subtitle">Farmers, Millers, Coops</p>
          <ul class="split-list">
            <li>Generate additional income from waste</li>
            <li>Connect with reliable buyers easily</li>
            <li>Reduce environmental hazard of burning</li>
          </ul>
        </div>

        <div class="split-divider">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--primary-green)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            />
            <path d="M17 12H7M12 7l5 5-5 5" />
          </svg>
        </div>

        <div class="split-card buyers animate-up">
          <div class="split-icon">
            <v-icon size="48" :style="{ color: 'var(--accent-green)' }"
              >mdi-factory</v-icon
            >
          </div>
          <h3 class="split-title">Buyers</h3>
          <p class="split-subtitle">Bioenergy, Feed Mills, Fertilizer Plants</p>
          <ul class="split-list">
            <li>Source biomass directly and reliably</li>
            <li>Locate nearest suppliers via map</li>
            <li>Streamline procurement and logistics</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- CTA Banner & Footer -->
    <OuterFooter2 :is-dark-mode="isDarkMode" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import OuterFooter2 from "@/components/common/outerFooters/OuterFooter2.vue";
import "@/pages/css/landingPage.css";
import { useTheme } from "@/composables/useTheme";

const isScrolled = ref(false);
const router = useRouter();
const { toggleTheme, setTheme, getCurrentTheme } = useTheme();

const isDarkMode = computed(() => getCurrentTheme() === "dark");

const toggleDarkMode = () => {
  const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  localStorage.setItem("siklo-theme", nextTheme);
};

const navigateToAuth = () => {
  router.push("/auth");
};

const features = [
  {
    icon: "mdi-map-marker-radius",
    title: "Geolocation Discovery",
    description:
      "Find buyers and sellers near you using GPS-powered map search",
  },
  {
    icon: "mdi-swap-horizontal-circle",
    title: "Smart Matching",
    description:
      "Our algorithm connects you with the right buyer based on biomass type, quantity, and distance",
  },
  {
    icon: "mdi-clipboard-text-outline",
    title: "Biomass Listings",
    description:
      "Post your rice husks, coconut shells, sugarcane bagasse — any agricultural waste with market value",
  },
  {
    icon: "mdi-map-outline",
    title: "Interactive Map",
    description:
      "View biomass sources as map pins. Plan your logistics visually.",
  },
  {
    icon: "mdi-star-outline",
    title: "Ratings & Trust",
    description: "Rate your transaction partners. Build a verified network.",
  },
  {
    icon: "mdi-chart-bar",
    title: "Transaction Logs",
    description: "Track your sales and purchases. Know your impact.",
  },
];

const steps = [
  {
    title: "Register",
    description: "Create your account as a Seller or Buyer",
  },
  {
    title: "List or Search",
    description: "Post your biomass or browse listings near you",
  },
  {
    title: "Connect & Earn",
    description: "Negotiate, transact, and rate your partner",
  },
];

const featuresRef = ref<HTMLElement | null>(null);
const impactRef = ref<HTMLElement | null>(null);
const howItWorksRef = ref<HTMLElement | null>(null);
const whoItsForRef = ref<HTMLElement | null>(null);

const count1 = ref<HTMLElement | null>(null);
const count2 = ref<HTMLElement | null>(null);
const count3 = ref<HTMLElement | null>(null);

let impactAnimated = false;

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const animateCounter = (
  el: HTMLElement | null,
  target: number,
  duration = 1500,
) => {
  if (!el) return;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const update = () => {
    current += increment;
    if (current < target) {
      el.innerText = Math.ceil(current).toString();
      requestAnimationFrame(update);
    } else {
      el.innerText = target.toString();
    }
  };
  update();
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  const savedTheme = localStorage.getItem("siklo-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    setTheme(savedTheme);
  }

  const observerOptions = { threshold: 0.1 };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const hiddenElements = entry.target.querySelectorAll(".animate-up");
        hiddenElements.forEach((el, i) => {
          setTimeout(() => {
            el.classList.add("visible");
          }, i * 150);
        });
      }
    });
  }, observerOptions);

  const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !impactAnimated) {
        impactAnimated = true;
        animateCounter(count1.value, 16);
        animateCounter(count2.value, 60);
        animateCounter(count3.value, 0); // Represents going to positive income conceptually (so just 0 since 0 -> Income)
        // Adjust third counter if needed
      }
    });
  }, observerOptions);

  if (featuresRef.value) fadeObserver.observe(featuresRef.value);
  if (howItWorksRef.value) fadeObserver.observe(howItWorksRef.value);
  if (whoItsForRef.value) fadeObserver.observe(whoItsForRef.value);

  if (impactRef.value) {
    fadeObserver.observe(impactRef.value);
    impactObserver.observe(impactRef.value);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
