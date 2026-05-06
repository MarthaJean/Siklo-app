<template>
  <div :class="['siklo-landing', { 'dark-mode': isDarkMode }]">
    <!-- Navbar -->
    <nav :class="['navbar', { 'is-scrolled': isScrolled }]">
      <div class="navbar-container">
        <div class="logo">
          <img src="/assets/logo.png" alt="Siklo Logo" class="nav-logo-img" :style="{ filter: isDarkMode ? 'brightness(0) invert(1)' : 'none' }" />
        </div>
        <div class="nav-links">
          <a href="#features" @click.prevent="scrollTo('features')">Features</a>
          <a href="#impact" @click.prevent="scrollTo('impact')">Impact</a>
          <a href="#how-it-works" @click.prevent="scrollTo('how-it-works')">How It Works</a>
        </div>
        <div class="nav-actions">
          <button class="theme-toggle" @click="toggleDarkMode" aria-label="Toggle Dark Mode">
            <v-icon v-if="isDarkMode" size="22" :style="{ color: 'var(--accent-green)' }">mdi-white-balance-sunny</v-icon>
            <v-icon v-else size="22" :style="{ color: 'var(--text-body)' }">mdi-moon-waning-crescent</v-icon>
          </button>
          <button class="nav-cta" @click="scrollTo('auth')">Get Started &rarr;</button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero" id="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            SIKLO<sup class="tm">&trade;</sup>
            <svg class="hero-underline" viewBox="0 0 300 30" preserveAspectRatio="none">
              <path d="M5 20 Q 150 -10 295 25" fill="none" stroke="#5B9F68" stroke-width="6" stroke-linecap="round"/>
            </svg>
          </h1>
          <p class="hero-tagline">Your farm waste has value.<br/>Sell it, don't burn it.</p>
          <p class="hero-subtagline">Turn farm waste into income. Connect with buyers near you.</p>
          
          <div class="hero-buttons">
            <button class="btn btn-primary" @click="scrollTo('features')">Explore Features</button>
            <button class="btn btn-outline" @click="scrollTo('hero')">View Source</button>
          </div>
        </div>
        
        <div class="hero-visual hero-fade-in">
          <div class="hero-image-wrapper">
            <div class="glow-effect"></div>
            <img src="/assets/Pic1.jpg" alt="Sustainability and Bioenergy" class="hero-image" />
          </div>
        </div>

      </div>
      <div class="hero-scroll-indicator">
        <a href="#features" @click.prevent="scrollTo('features')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </a>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features" id="features" ref="featuresRef">
      <h2 class="section-title">What Siklo Does</h2>
      <div class="features-grid">
        <div v-for="(feature, index) in features" :key="index" class="feature-card animate-up">
          <div class="feature-icon"><v-icon size="32" :style="{ color: 'var(--accent-green)' }">{{ feature.icon }}</v-icon></div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Impact Section -->
    <section class="impact" id="impact" ref="impactRef">
      <div class="impact-container">
        <div class="impact-counters">
          <div class="counter-item animate-up">
            <div class="counter-value"><span ref="count1">0</span>+</div>
            <div class="counter-label">Millions of tons PH agricultural waste yearly</div>
          </div>
          <div class="counter-item animate-up">
            <div class="counter-value"><span ref="count2">0</span>%</div>
            <div class="counter-label">Biomass burned without a platform like Siklo</div>
          </div>
          <div class="counter-item animate-up">
            <div class="counter-value">₱<span ref="count3">0</span> &rarr; Income</div>
            <div class="counter-label">What generators earn by selling instead of burning</div>
          </div>
        </div>
        <p class="impact-subcopy animate-up">Siklo turns an environmental burden into an economic opportunity — for farmers, millers, cooperatives, and the planet.</p>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works" id="how-it-works" ref="howItWorksRef">
      <h2 class="section-title">Three steps to your first deal</h2>
      <div class="steps-container">
        <div class="steps-line"></div>
        <div v-for="(step, index) in steps" :key="index" class="step-item animate-up">
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
          <div class="split-icon"><v-icon size="48" :style="{ color: 'var(--accent-green)' }">mdi-account-group</v-icon></div>
          <h3 class="split-title">Sellers</h3>
          <p class="split-subtitle">Farmers, Millers, Coops</p>
          <ul class="split-list">
            <li>Generate additional income from waste</li>
            <li>Connect with reliable buyers easily</li>
            <li>Reduce environmental hazard of burning</li>
          </ul>
        </div>
        
        <div class="split-divider">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
            <path d="M17 12H7M12 7l5 5-5 5"/>
          </svg>
        </div>
        
        <div class="split-card buyers animate-up">
          <div class="split-icon"><v-icon size="48" :style="{ color: 'var(--accent-green)' }">mdi-factory</v-icon></div>
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
    <footer class="footer">
      <div class="cta-banner">
        <h2>Ready to turn waste into income?</h2>
        <button class="btn btn-primary" @click="scrollTo('auth')">Start Selling on Siklo &rarr;</button>
      </div>
      <div class="footer-content">
        <div class="footer-logo">
          <img src="/assets/logo.png" alt="Siklo Logo" class="footer-logo-img" :style="{ filter: isDarkMode ? 'brightness(0) invert(1)' : 'none' }" />
        </div>
        <p class="footer-tagline">Academic Excellence — Caraga State University</p>
        <div class="footer-links">
          <a href="#features" @click.prevent="scrollTo('features')">Features</a>
          <a href="#impact" @click.prevent="scrollTo('impact')">Impact</a>
          <a href="#how-it-works" @click.prevent="scrollTo('how-it-works')">How It Works</a>
        </div>
        <p class="copyright">&copy; {{ new Date().getFullYear() }} Siklo Team. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const isScrolled = ref(false)
const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('siklo-theme', isDarkMode.value ? 'dark' : 'light')
}

const features = [
  { icon: 'mdi-map-marker-radius', title: 'Geolocation Discovery', description: 'Find buyers and sellers near you using GPS-powered map search' },
  { icon: 'mdi-swap-horizontal-circle', title: 'Smart Matching', description: 'Our algorithm connects you with the right buyer based on biomass type, quantity, and distance' },
  { icon: 'mdi-clipboard-text-outline', title: 'Biomass Listings', description: 'Post your rice husks, coconut shells, sugarcane bagasse — any agricultural waste with market value' },
  { icon: 'mdi-map-outline', title: 'Interactive Map', description: 'View biomass sources as map pins. Plan your logistics visually.' },
  { icon: 'mdi-star-outline', title: 'Ratings & Trust', description: 'Rate your transaction partners. Build a verified network.' },
  { icon: 'mdi-chart-bar', title: 'Transaction Logs', description: 'Track your sales and purchases. Know your impact.' }
]

const steps = [
  { title: 'Register', description: 'Create your account as a Seller or Buyer' },
  { title: 'List or Search', description: 'Post your biomass or browse listings near you' },
  { title: 'Connect & Earn', description: 'Negotiate, transact, and rate your partner' }
]

const featuresRef = ref<HTMLElement | null>(null)
const impactRef = ref<HTMLElement | null>(null)
const howItWorksRef = ref<HTMLElement | null>(null)
const whoItsForRef = ref<HTMLElement | null>(null)

const count1 = ref<HTMLElement | null>(null)
const count2 = ref<HTMLElement | null>(null)
const count3 = ref<HTMLElement | null>(null)

let impactAnimated = false

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const animateCounter = (el: HTMLElement | null, target: number, duration = 1500) => {
  if (!el) return
  const start = 0
  const increment = target / (duration / 16)
  let current = start

  const update = () => {
    current += increment
    if (current < target) {
      el.innerText = Math.ceil(current).toString()
      requestAnimationFrame(update)
    } else {
      el.innerText = target.toString()
    }
  }
  update()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  const savedTheme = localStorage.getItem('siklo-theme')
  if (savedTheme === 'dark') {
    isDarkMode.value = true
  } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true
  }

  const observerOptions = { threshold: 0.1 }

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const hiddenElements = entry.target.querySelectorAll('.animate-up')
        hiddenElements.forEach((el, i) => {
          setTimeout(() => {
            el.classList.add('visible')
          }, i * 150)
        })
      }
    })
  }, observerOptions)

  const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !impactAnimated) {
        impactAnimated = true
        animateCounter(count1.value, 16)
        animateCounter(count2.value, 60)
        animateCounter(count3.value, 0) // Represents going to positive income conceptually (so just 0 since 0 -> Income)
        // Adjust third counter if needed
      }
    })
  }, observerOptions)

  if (featuresRef.value) fadeObserver.observe(featuresRef.value)
  if (howItWorksRef.value) fadeObserver.observe(howItWorksRef.value)
  if (whoItsForRef.value) fadeObserver.observe(whoItsForRef.value)
  
  if (impactRef.value) {
    fadeObserver.observe(impactRef.value)
    impactObserver.observe(impactRef.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

.siklo-landing {
  box-sizing: border-box;
  overflow-x: hidden;
  --bg-color: #F7FAF7;
  --primary-green: #2D5035;
  --secondary-green: #588158;
  --accent-green: #5B9F68;
  --soft-green: #A3D4AE;
  
  --accent-yellow: #588158;
  --accent-orange: #6B9B6E;
  
  --text-dark: #2D5035;
  --text-body: #4A5C4E;
  --text-light: #FFFFFF;
  
  --light-tint: #EDF5EF;
  --card-bg: #FFFFFF;
  --nav-bg: rgba(247, 250, 247, 0.92);
  --border-color: #D6E5D9;

  --font-serif: 'Playfair Display', serif;
  --font-sans: 'DM Sans', sans-serif;

  font-family: var(--font-sans);
  color: var(--text-body);
  background-color: var(--bg-color);
  line-height: 1.6;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.siklo-landing *, .siklo-landing *::before, .siklo-landing *::after {
  box-sizing: inherit;
}

.siklo-landing.dark-mode {
  --bg-color: #141E17;
  --primary-green: #8FD49E;
  --secondary-green: #588158;
  --accent-green: #5B9F68;
  --soft-green: #3D6B47;
  
  --accent-yellow: #7AAC7E;
  --accent-orange: #6B9B6E;
  
  --text-dark: #E8F0EA;
  --text-body: #C5D4C8;
  --text-light: #FFFFFF;
  
  --light-tint: #1C2A20;
  --card-bg: #1F2E23;
  --nav-bg: rgba(20, 30, 23, 0.92);
  --border-color: #3D6B47;
}

/* Animations */
.animate-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.animate-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 20px 5%;
  transition: all 0.3s ease;
}
.navbar.is-scrolled {
  background: var(--nav-bg);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  padding: 15px 5%;
}
.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}
.nav-logo-img {
  height: 48px;
  width: auto;
  object-fit: contain;
}
.logo-text {
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: 28px;
  color: var(--primary-green);
}
.logo-icon {
  width: 24px;
  height: 24px;
}
.logo-subtitle {
  font-family: var(--font-sans);
  font-weight: 300;
  font-size: 14px;
  color: var(--text-body);
  margin-left: 5px;
}
.nav-links {
  display: none;
}
@media (min-width: 768px) {
  .nav-links {
    display: flex;
    gap: 30px;
  }
}
.nav-links a {
  text-decoration: none;
  color: var(--text-body);
  font-weight: 500;
  transition: color 0.2s;
}
.nav-links a:hover {
  color: var(--accent-green);
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0 10px;
  display: flex;
  align-items: center;
  transition: transform 0.2s;
}
.theme-toggle:hover {
  transform: scale(1.1);
}
.nav-cta {
  background: var(--accent-yellow);
  color: #FFFFFF;
  border: none;
  padding: 10px 24px;
  border-radius: 50px;
  font-weight: 600;
  font-family: var(--font-sans);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.nav-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(88, 129, 88, 0.4);
}

@media (max-width: 767px) {
  .nav-logo-img {
    height: 36px;
  }
  .nav-cta {
    padding: 8px 16px;
    font-size: 14px;
  }
  .nav-actions {
    gap: 8px;
  }
  .navbar {
    padding: 15px 5%;
  }
  .navbar.is-scrolled {
    padding: 10px 5%;
  }
}

/* Base Buttons */
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
  background: var(--accent-yellow);
  color: #FFFFFF;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(88, 129, 88, 0.4);
}
.btn-outline {
  background: transparent;
  color: var(--primary-green);
  border: 2px solid var(--accent-green);
}
.btn-outline:hover {
  background: var(--light-tint);
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 120px 5% 50px;
  background-image: radial-gradient(var(--border-color) 1px, transparent 1px);
  background-size: 20px 20px;
}
.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
}
.hero-text {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@keyframes floatAnimation {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}
@keyframes heroFadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.hero-fade-in {
  animation: heroFadeIn 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  opacity: 0;
  animation-delay: 0.3s;
}

.hero-visual {
  position: relative;
  width: 100%;
  max-width: 450px;
  margin: 40px auto 0;
  z-index: 1;
}

.hero-image-wrapper {
  position: relative;
  animation: floatAnimation 6s ease-in-out infinite;
}

.hero-image {
  width: 100%;
  height: auto;
  border-radius: 24px;
  box-shadow: 0 25px 50px rgba(91, 159, 104, 0.25);
  object-fit: cover;
  position: relative;
  z-index: 2;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.dark-mode .hero-image {
  border-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 25px 50px rgba(91, 159, 104, 0.15);
}

.hero-image:hover {
  transform: scale(1.02);
  box-shadow: 0 30px 60px rgba(91, 159, 104, 0.4);
}
.dark-mode .hero-image:hover {
  box-shadow: 0 30px 60px rgba(91, 159, 104, 0.25);
}

.glow-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 140%;
  height: 140%;
  background: radial-gradient(circle, rgba(91, 159, 104, 0.35) 0%, rgba(255, 255, 255, 0) 60%);
  transform: translate(-50%, -50%);
  z-index: 0;
  pointer-events: none;
  filter: blur(40px);
}

.dark-mode .glow-effect {
  background: radial-gradient(circle, rgba(91, 159, 104, 0.2) 0%, rgba(0, 0, 0, 0) 60%);
}

@media (min-width: 992px) {
  .hero-content {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .hero-text {
    flex: 0 0 50%;
    text-align: left;
    align-items: flex-start;
  }
  .hero-buttons {
    justify-content: flex-start;
  }
  .hero-visual {
    flex: 0 0 45%;
    margin: 0;
  }
}
.hero-title {
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: clamp(60px, 10vw, 120px);
  line-height: 1;
  color: var(--primary-green);
  letter-spacing: 0.08em;
  margin: 0 0 20px 0;
  position: relative;
  display: inline-block;
  transition: color 0.3s ease;
}
.tm {
  font-family: var(--font-sans);
  font-size: 0.4em;
  font-weight: 400;
  letter-spacing: normal;
  vertical-align: super;
}
.hero-underline {
  position: absolute;
  bottom: -15px;
  left: 0;
  width: 100%;
  height: 30px;
}
.hero-tagline {
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 600;
  margin: 0 0 15px;
  line-height: 1.3;
  color: var(--text-dark);
}
.hero-subtagline {
  font-size: 18px;
  color: var(--text-body);
  margin: 0 0 40px;
  max-width: 500px;
}
.hero-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}
.hero-scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
  40% { transform: translateY(-10px) translateX(-50%); }
  60% { transform: translateY(-5px) translateX(-50%); }
}

/* Sections Global */
.section-title {
  font-family: var(--font-serif);
  font-size: 36px;
  color: var(--primary-green);
  text-align: center;
  margin-bottom: 50px;
}
section {
  padding: 100px 5%;
}

/* Features */
.features-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}
@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
.feature-card {
  background: var(--card-bg);
  padding: 30px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.feature-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: var(--accent-yellow);
  transform: scaleX(0);
  transition: transform 0.3s ease;
  transform-origin: left;
}
.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(45, 106, 79, 0.05);
  border-color: transparent;
}
.feature-card:hover::before {
  transform: scaleX(1);
}
.feature-icon {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: var(--light-tint);
}
.feature-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--text-dark);
}
.feature-description {
  color: var(--text-body);
  font-size: 15px;
}

/* Impact Section */
.impact {
  background: var(--primary-green);
  color: var(--text-light);
  text-align: center;
}
.impact-container {
  max-width: 1000px;
  margin: 0 auto;
}
.impact-counters {
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-bottom: 50px;
}
@media (min-width: 768px) {
  .impact-counters {
    flex-direction: row;
    justify-content: space-around;
  }
}
.counter-value {
  font-family: var(--font-serif);
  font-size: 64px;
  font-weight: 900;
  color: var(--accent-yellow);
  line-height: 1;
  margin-bottom: 15px;
}
.counter-label {
  font-size: 18px;
  opacity: 0.9;
}
.impact-subcopy {
  font-size: 22px;
  font-weight: 300;
  max-width: 800px;
  margin: 0 auto;
  opacity: 0.9;
}

/* How It Works */
.how-it-works {
  background: var(--bg-color);
  overflow: hidden;
}
.steps-container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
@media (min-width: 768px) {
  .steps-container {
    flex-direction: row;
    justify-content: space-between;
  }
  .steps-line {
    position: absolute;
    top: 30px; left: 10%; right: 10%;
    height: 2px;
    border-top: 2px dashed var(--border-color);
    z-index: 0;
  }
}
.step-item {
  position: relative;
  z-index: 1;
  text-align: center;
  flex: 1;
  padding: 0 20px;
}
.step-number {
  width: 60px;
  height: 60px;
  background: var(--accent-yellow);
  color: var(--text-dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 900;
  margin: 0 auto 20px;
  box-shadow: 0 0 0 10px var(--bg-color);
}
.step-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}
.step-description {
  color: var(--text-body);
}

/* Who It's For */
.who-its-for {
  background: var(--light-tint);
}
.split-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
}
@media (min-width: 768px) {
  .split-container {
    flex-direction: row;
    gap: 0;
    justify-content: center;
  }
}
.split-card {
  background: var(--card-bg);
  padding: 50px 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.03);
  flex: 1;
  max-width: 450px;
  width: 100%;
}
.split-icon {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 16px;
  background: var(--light-tint);
}
.split-title {
  font-family: var(--font-serif);
  font-size: 28px;
  color: var(--primary-green);
  margin-bottom: 5px;
}
.split-subtitle {
  font-size: 15px;
  color: var(--text-body);
  opacity: 0.8;
  margin-bottom: 25px;
  font-weight: 500;
}
.split-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.split-list li {
  position: relative;
  padding-left: 30px;
  margin-bottom: 15px;
  color: var(--text-body);
}
.split-list li::before {
  content: '✓';
  position: absolute;
  left: 0; top: 0;
  color: var(--accent-green);
  font-weight: bold;
}
.split-divider {
  width: 60px;
  height: 60px;
  background: var(--light-tint);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  z-index: 2;
}
@media (min-width: 768px) {
  .split-divider {
    margin: 0 -30px;
  }
}

/* Footer / CTA Banner */
.footer {
  text-align: center;
  padding: 0;
}
.cta-banner {
  background: var(--accent-yellow);
  padding: 80px 5%;
  color: #FFFFFF;
}
.cta-banner h2 {
  font-family: var(--font-serif);
  font-size: clamp(32px, 5vw, 48px);
  margin-bottom: 30px;
}
.cta-banner .btn-primary {
  background: var(--primary-green);
  color: white;
}
.cta-banner .btn-primary:hover {
  background: #2D5035;
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
.footer-logo .logo-text {
  font-size: 36px;
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
.footer-links a:hover {
  text-decoration: underline;
}
.copyright {
  color: var(--text-body);
  opacity: 0.7;
  font-size: 14px;
}
</style>