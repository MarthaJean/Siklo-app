const fs = require('fs');

let content = fs.readFileSync('src/pages/LandingPage.vue', 'utf8');

const navStart = content.indexOf('<nav :class="[\'navbar\', { \'is-scrolled\': isScrolled }]">');
const navEnd = content.indexOf('</nav>') + 6;

if (navStart !== -1 && navEnd !== -1) {
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
          <button class="btn btn-primary mobile-cta" @click="scrollTo('auth'); toggleMenu()">Get Started &rarr;</button>
        </div>
      </transition>
    </nav>`;

  content = content.substring(0, navStart) + newNavbar + content.substring(navEnd);
  fs.writeFileSync('src/pages/LandingPage.vue', content);
}
