<script lang="ts" setup>
interface Props {
  isDarkMode?: boolean;
}

const props = defineProps<Props>();

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <footer class="footer">
    <div class="cta-banner" :class="{ 'cta-banner-dark': props.isDarkMode }">
      <h2>Ready to turn waste into income?</h2>
      <button class="btn btn-primary" @click="scrollTo('auth')">
        Start Selling on Siklo &rarr;
      </button>
    </div>
    <div class="footer-content">
      <div class="footer-logo">
        <img
          src="/assets/logo.png"
          alt="Siklo Logo"
          class="footer-logo-img"
          :style="{
            filter: props.isDarkMode ? 'brightness(0) invert(1)' : 'none',
          }"
        />
      </div>
      <p class="footer-tagline">
        Academic Excellence — Caraga State University
      </p>
      <div class="footer-links">
        <a href="#features" @click.prevent="scrollTo('features')">Features</a>
        <a href="#impact" @click.prevent="scrollTo('impact')">Impact</a>
        <a href="#how-it-works" @click.prevent="scrollTo('how-it-works')">
          How It Works
        </a>
      </div>
      <p class="copyright">
        &copy; {{ new Date().getFullYear() }} Siklo Team. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  text-align: center;
  padding: 0;
}

.cta-banner {
  background: var(--accent-yellow);
  padding: 80px 5%;
  color: #ffffff;
}

.cta-banner-dark {
  color: #141e17;
}

.cta-banner h2 {
  font-family: var(--font-serif);
  font-size: clamp(32px, 5vw, 48px);
  margin-bottom: 30px;
}

.btn {
  font-family: var(--font-sans);
  font-weight: 600;
  padding: 14px 32px;
  border-radius: 50px;
  cursor: pointer;
  border: none;
  transition: all 0.3s;
  font-size: 16px;
}

.btn-primary {
  background: var(--primary-green);
  color: white;
}

.btn-primary:hover {
  background: #2d5035;
  box-shadow: 0 8px 20px rgba(91, 159, 104, 0.4);
}

.footer-content {
  background: var(--card-bg);
  padding: 60px 5% 30px;
}

.footer-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.footer-logo-img {
  height: 64px;
  width: auto;
  object-fit: contain;
}

.footer-tagline {
  color: var(--text-body);
  margin: 10px 0 30px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.footer-links a {
  color: var(--text-dark);
  text-decoration: none;
  font-weight: 500;
}

.copyright {
  color: var(--text-body);
  opacity: 0.7;
  font-size: 14px;
}
</style>
