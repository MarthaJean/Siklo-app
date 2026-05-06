const fs = require('fs');

let content = fs.readFileSync('src/pages/LandingPage.vue', 'utf8');

// 1. Add menu open ref
content = content.replace(
  "const isScrolled = ref(false)", 
  "const isScrolled = ref(false)\nconst isMenuOpen = ref(false)\n\nconst toggleMenu = () => {\n  isMenuOpen.value = !isMenuOpen.value\n}"
);

// 2. Modify Navbar for hamburger and mobile menu
const oldNavbar = `<nav :class="['navbar', { 'is-scrolled': isScrolled }]">
      <div class="navbar-container">
        <div class="logo">
          <img src="/assets/logo.png" alt="Siklo Logo" class="nav-logo-img" />
        </div>
        <div class="nav-links">
          <a href="#features" @click.prevent="scrollTo('features')">Features</a>
          <a href="#impact" @click.prevent="scrollTo('impact')">Impact</a>
          <a href="#how-it-works" @click.prevent="scrollTo('how-it-works')">How It Works</a>
        </div>
        <button class="nav-cta" @click="scrollTo('auth')">Get Started &rarr;</button>
      </div>
    </nav>`;

const newNavbar = `<nav :class="['navbar', { 'is-scrolled': isScrolled }]">
      <div class="navbar-container">
        <div class="logo">
          <img src="/assets/logo.png" alt="Siklo Logo" class="nav-logo-img" />
        </div>
        
        <!-- Hamburger Menu Button -->
        <button class="hamburger" @click="toggleMenu" aria-label="Toggle menu">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
            <path v-if="!isMenuOpen" d="M3 12h18M3 6h18M3 18h18" stroke-linecap="round" stroke-linejoin="round"/>
            <path v-else d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="nav-links desktop-only">
          <a href="#features" @click.prevent="scrollTo('features')">Features</a>
          <a href="#impact" @click.prevent="scrollTo('impact')">Impact</a>
          <a href="#how-it-works" @click.prevent="scrollTo('how-it-works')">How It Works</a>
        </div>
        <button class="nav-cta desktop-only" @click="scrollTo('auth')">Get Started &rarr;</button>
      </div>

      <!-- Mobile Menu -->
      <transition name="slide-down">
        <div v-show="isMenuOpen" class="mobile-menu">
          <a href="#features" @click.prevent="scrollTo('features'); toggleMenu()">Features</a>
          <a href="#impact" @click.prevent="scrollTo('impact'); toggleMenu()">Impact</a>
          <a href="#how-it-works" @click.prevent="scrollTo('how-it-works'); toggleMenu()">How It Works</a>
          <button class="nav-cta mobile-cta" @click="scrollTo('auth'); toggleMenu()">Get Started &rarr;</button>
        </div>
      </transition>
    </nav>`;

content = content.replace(oldNavbar, newNavbar);

// 3. Replace styles
const styleStart = content.indexOf('<style scoped>');
if (styleStart !== -1) {
  content = content.substring(0, styleStart);
  content += `<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

:root {
  /* PRIMARY COLORS */
  --color-primary-900: #1B4332;
  --color-primary-700: #2D6A4F;
  --color-primary-500: #52B788;
  --color-primary-300: #95D5B2;

  /* NEUTRAL / BACKGROUND COLORS */
  --color-neutral-100: #FAF7F0;
  --color-neutral-200: #F4F1DE;
  --color-neutral-300: #E8EDDF;
  --color-neutral-800: #4A5859;

  /* ACCENT COLORS */
  --color-accent-tan:    #D4A574;
  --color-accent-gold:   #E9C46A;
  --color-accent-orange: #F4A261;
  --color-accent-brown:  #8B5A3C;

  /* STATUS COLOR */
  --color-error: #C1666B;

  /* SEMANTIC ALIASES */
  --color-bg:           var(--color-neutral-100);
  --color-bg-card:      var(--color-neutral-200);
  --color-bg-section:   var(--color-neutral-300);
  --color-text-dark:    #1A1A1A;
  --color-text-muted:   var(--color-neutral-800);
  --color-text-light:   #FFFFFF;
  --color-border:       #DDD8CC;
  --color-shadow:       rgba(27, 67, 50, 0.08);

  --font-serif: 'Playfair Display', serif;
  --font-sans: 'DM Sans', sans-serif;
}

.siklo-landing {
  font-family: var(--font-sans);
  color: var(--color-text-dark);
  background-color: var(--color-bg);
  line-height: 1.6;
  overflow-x: hidden;
}

/* Base Buttons */
.btn {
  font-family: var(--font-sans);
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  transition: all 0.3s;
  font-size: 16px;
  font-weight: 600;
  min-height: 44px;
  min-width: 44px;
}
.btn-primary {
  background: var(--color-primary-700);
  color: white;
}
.btn-primary:hover {
  background: var(--color-primary-900);
}
.btn-outline {
  background: transparent;
  color: var(--color-primary-700);
  border: 2px solid var(--color-primary-700);
}
.btn-outline:hover {
  background: var(--color-neutral-300);
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
  padding: 15px 5%;
  background: var(--color-primary-900);
  transition: all 0.3s ease;
}
.navbar.is-scrolled {
  background: var(--color-primary-900);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
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
}
.nav-logo-img {
  height: 48px;
  width: auto;
  object-fit: contain;
}
.nav-links {
  display: none;
}
.desktop-only {
  display: none;
}
.hamburger {
  display: block;
  background: none;
  border: none;
  color: var(--color-text-light);
  cursor: pointer;
  padding: 10px;
  min-width: 44px;
  min-height: 44px;
  -webkit-tap-highlight-color: transparent;
}
@media (min-width: 768px) {
  .desktop-only {
    display: flex;
  }
  .nav-links {
    gap: 30px;
  }
  .hamburger {
    display: none;
  }
}
.nav-links a {
  text-decoration: none;
  color: var(--color-text-light);
  font-family: var(--font-sans);
  font-weight: 500;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  min-height: 44px;
}
.nav-links a:hover {
  color: var(--color-primary-300);
}
.nav-cta {
  background: var(--color-accent-gold);
  color: var(--color-primary-900);
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  font-weight: 600;
  font-family: var(--font-sans);
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
  min-height: 44px;
}
.nav-cta:hover {
  transform: translateY(-2px);
  background: #f1cf87;
}

/* Mobile Menu */
.mobile-menu {
  display: flex;
  flex-direction: column;
  background: var(--color-primary-900);
  padding: 20px 5%;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border-top: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
.mobile-menu a {
  color: var(--color-text-light);
  text-decoration: none;
  padding: 15px 0;
  font-weight: 500;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.mobile-cta {
  margin-top: 20px;
  width: 100%;
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Sections Global */
.section-title {
  font-family: var(--font-serif);
  font-size: clamp(28px, 6vw, 42px);
  color: var(--color-primary-700);
  font-weight: 700;
  text-align: center;
  margin-bottom: clamp(30px, 6vw, 50px);
}
section {
  padding: clamp(40px, 8vw, 100px) clamp(16px, 5vw, 80px);
  scroll-margin-top: 80px;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  background: var(--color-bg);
  padding-top: clamp(120px, 15vw, 160px);
}
.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  text-align: center;
}
@media (min-width: 992px) {
  .hero-content {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: left;
  }
  .hero-text {
    flex: 0 0 55%;
  }
  .hero-visual {
    flex: 0 0 40%;
  }
}
.hero-main-logo {
  margin-bottom: 30px;
}
@media (max-width: 991px) {
  .hero-main-logo {
    display: flex;
    justify-content: center;
  }
}
.main-logo-img {
  width: 100%;
  max-width: 450px;
  height: auto;
  object-fit: contain;
}
.hero-tagline {
  font-size: clamp(24px, 4vw, 36px);
  font-family: var(--font-serif);
  font-weight: 700;
  color: var(--color-primary-900);
  margin: 0 0 15px;
  line-height: 1.3;
}
.hero-subtagline {
  font-size: 18px;
  color: var(--color-text-muted);
  margin: 0 0 40px;
  max-width: 500px;
}
@media (max-width: 991px) {
  .hero-subtagline {
    margin-left: auto;
    margin-right: auto;
  }
}
.hero-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
@media (min-width: 768px) {
  .hero-buttons {
    flex-direction: row;
    justify-content: center;
  }
}
@media (min-width: 992px) {
  .hero-buttons {
    justify-content: flex-start;
  }
}
.hero-scroll-indicator {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
}
.hero-scroll-indicator svg {
  stroke: var(--color-primary-500);
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
  40% { transform: translateY(-10px) translateX(-50%); }
  60% { transform: translateY(-5px) translateX(-50%); }
}

/* Features */
.features {
  background: var(--color-bg);
}
.features-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}
.feature-card {
  background: var(--color-bg-card);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 16px var(--color-shadow);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.feature-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: var(--color-accent-gold);
  transform: scaleX(0);
  transition: transform 0.3s ease;
  transform-origin: left;
}
.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px var(--color-shadow);
}
.feature-card:hover::before {
  transform: scaleX(1);
}
.feature-icon {
  font-size: 32px;
  margin-bottom: 20px;
  background: var(--color-bg-section);
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: var(--color-primary-500);
}
.feature-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--color-primary-700);
  font-family: var(--font-sans);
}
.feature-description {
  color: var(--color-text-muted);
  font-size: 15px;
}

/* Impact Section */
.impact {
  background: var(--color-primary-900);
  color: var(--color-text-light);
  text-align: center;
}
.impact-container {
  max-width: 1000px;
  margin: 0 auto;
}
.impact-counters {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 50px;
}
@media (min-width: 768px) {
  .impact-counters {
    flex-direction: row;
    justify-content: space-around;
  }
}
.counter-item {
  flex: 1;
}
.counter-value {
  font-family: var(--font-serif);
  font-size: clamp(36px, 8vw, 64px);
  font-weight: 900;
  color: var(--color-accent-gold);
  line-height: 1;
  margin-bottom: 15px;
}
.counter-label {
  font-size: 16px;
  color: var(--color-primary-300);
}
.impact-subcopy {
  font-size: clamp(18px, 4vw, 22px);
  font-weight: 400;
  max-width: 800px;
  margin: 0 auto;
  color: var(--color-text-light);
}

/* How It Works */
.how-it-works {
  background: var(--color-bg-card);
}
.steps-container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.steps-line {
  position: absolute;
  left: 30px;
  top: 30px;
  bottom: 0;
  width: 2px;
  border-left: 2px dashed var(--color-primary-300);
  z-index: 0;
}
@media (min-width: 768px) {
  .steps-container {
    flex-direction: row;
    justify-content: space-between;
  }
  .steps-line {
    left: 10%; right: 10%;
    top: 30px; height: 2px; bottom: auto; width: auto;
    border-left: none;
    border-top: 2px dashed var(--color-primary-300);
  }
}
.step-item {
  position: relative;
  z-index: 1;
  text-align: left;
  flex: 1;
  padding-left: 80px;
}
@media (min-width: 768px) {
  .step-item {
    text-align: center;
    padding-left: 0;
    padding: 0 20px;
  }
}
.step-number {
  width: 60px;
  height: 60px;
  background: var(--color-accent-gold);
  color: var(--color-primary-900);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans);
  font-size: 24px;
  font-weight: 700;
  box-shadow: 0 0 0 10px var(--color-bg-card);
  position: absolute;
  left: 0;
  top: 0;
}
@media (min-width: 768px) {
  .step-number {
    position: static;
    margin: 0 auto 20px;
  }
}
.step-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  font-family: var(--font-sans);
  color: var(--color-primary-700);
}
.step-description {
  color: var(--color-text-muted);
}

/* Who It's For */
.who-its-for {
  background: var(--color-bg-section);
}
.split-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
@media (min-width: 768px) {
  .split-container {
    flex-direction: row;
  }
}
.split-card {
  background: var(--color-bg-card);
  padding: 30px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 16px var(--color-shadow);
  flex: 1;
  position: relative;
}
.split-card.sellers {
  border-left: 4px solid var(--color-primary-500);
}
.split-card.buyers {
  border-left: 4px solid var(--color-accent-orange);
}
.split-icon {
  font-size: 40px;
  margin-bottom: 15px;
}
.split-title {
  font-family: var(--font-serif);
  font-size: 26px;
  color: var(--color-primary-900);
  margin-bottom: 5px;
}
.split-subtitle {
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 20px;
  font-weight: 500;
}
.split-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.split-list li {
  position: relative;
  padding-left: 24px;
  margin-bottom: 12px;
  color: var(--color-text-dark);
  font-size: 15px;
}
.split-list li::before {
  content: '✓';
  position: absolute;
  left: 0; top: 0;
  color: var(--color-primary-500);
  font-weight: bold;
}
.buyers .split-list li::before {
  color: var(--color-accent-orange);
}
.split-divider {
  display: none;
}
@media (min-width: 768px) {
  .split-divider {
    display: flex;
    width: 60px;
    height: 60px;
    background: var(--color-bg-section);
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    margin: 20px -30px;
    z-index: 2;
    align-self: center;
  }
  .split-divider svg stroke {
    stroke: var(--color-primary-700);
  }
}

/* Footer / CTA Banner */
.footer {
  text-align: center;
  padding: 0;
  background: var(--color-primary-900);
}
.cta-banner {
  background: var(--color-accent-gold);
  padding: clamp(40px, 8vw, 80px) 5%;
  color: var(--color-primary-900);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
@media (min-width: 768px) {
  .cta-banner {
    flex-direction: row;
    justify-content: center;
    gap: 40px;
  }
}
.cta-banner h2 {
  font-family: var(--font-serif);
  font-size: clamp(28px, 5vw, 42px);
  margin: 0;
}
.cta-banner .btn-primary {
  background: var(--color-primary-900);
  color: white;
  width: 100%;
}
@media (min-width: 768px) {
  .cta-banner .btn-primary {
    width: auto;
  }
}
.cta-banner .btn-primary:hover {
  background: #112a20;
}
.footer-content {
  background: var(--color-primary-900);
  padding: 60px 5% 30px;
  color: var(--color-text-light);
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
  filter: brightness(0) invert(1);
}
.footer-tagline {
  color: var(--color-primary-300);
  margin: 10px 0 30px;
}
.footer-links {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
}
@media (min-width: 768px) {
  .footer-links {
    flex-direction: row;
    gap: 30px;
  }
}
.footer-links a {
  color: var(--color-text-light);
  text-decoration: none;
  font-weight: 500;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer-links a:hover {
  color: var(--color-primary-300);
}
.copyright {
  color: var(--color-primary-300);
  font-size: 14px;
  opacity: 0.8;
}

html {
  scroll-behavior: smooth;
}
</style>`
}

fs.writeFileSync('src/pages/LandingPage.vue', content);
console.log("Updated effectively!");
