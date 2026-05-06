const fs = require('fs');
let css = fs.readFileSync('src/pages/LandingPage.vue', 'utf8');

// 1. Navbar text
css = css.replace(
  '<div class="logo">\n          <img src="/assets/logo.png" alt="Siklo Logo" class="nav-logo-img" />\n        </div>',
  '<div class="logo">\n          <span class="nav-logo-text">SIKLO</span>\n        </div>'
);

// Navbar alignment
css = css.replace(
  '.navbar-container {\n  max-width: 1200px;\n  margin: 0 auto;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
  '.navbar-container {\n  max-width: 1200px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n}\n.logo {\n  flex: 1;\n  display: flex;\n  align-items: center;\n}\n.navbar-right {\n  display: flex;\n  flex: 1;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 15px;\n}'
);

css = css.replace(
  '<button class="nav-cta desktop-only" @click="scrollTo(\'auth\')">Get Started &rarr;</button>\n      </div>',
  '<!-- desktop only container is handled via flex inline -->\n\n        <button class="nav-cta desktop-only" @click="scrollTo(\'auth\')">Get Started &rarr;</button>\n      </div>'
);

// I'll rewrite the navbar markup 
const oldNav = `<nav :class="['navbar', { 'is-scrolled': isScrolled }]">
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
      </div>`;

const newNav = `<nav :class="['navbar', { 'is-scrolled': isScrolled }]">
      <div class="navbar-container">
        <div class="logo">
          <span class="nav-logo-text">SIKLO</span>
        </div>
        
        <div class="nav-links desktop-only">
          <a href="#features" @click.prevent="scrollTo('features')">Features</a>
          <a href="#impact" @click.prevent="scrollTo('impact')">Impact</a>
          <a href="#how-it-works" @click.prevent="scrollTo('how-it-works')">How It Works</a>
        </div>
        
        <div class="nav-right">
            <!-- Hamburger Menu Button -->
            <button class="hamburger" @click="toggleMenu" aria-label="Toggle menu">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                <path v-if="!isMenuOpen" d="M3 12h18M3 6h18M3 18h18" stroke-linecap="round" stroke-linejoin="round"/>
                <path v-else d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="nav-cta desktop-only" @click="scrollTo('auth')">Get Started &rarr;</button>
        </div>
      </div>`;
css = css.replace(oldNav, newNav);

// 2. Add unscoped style for body, html, #app
const globalStyle = `
<style>
/* Global Reset Overrides */
html, body, #app {
  background-color: #FAF7F0 !important;
  margin: 0;
  padding: 0;
}
* {
  background-color: inherit;
}
</style>
<style scoped>`;
css = css.replace('<style scoped>', globalStyle);

// 3. Navbar Logo CSS overrides
css = css.replace('.nav-logo-img {\n  height: 48px;\n  width: auto;\n  object-fit: contain;\n}', 
`.nav-logo-text {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: 1px;
}
.nav-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}`);

// Navbar container layout
css = css.replace('.navbar-container {\n  max-width: 1200px;\n  margin: 0 auto;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
`.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}
.nav-links {
  flex: 2;
  display: none;
  justify-content: center;
}
.nav-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}`);

// Hero Layout
css = css.replace(`.hero-content {
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
}`, 
`.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  text-align: center;
}
.hero-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media (min-width: 768px) {
    .hero-content {
        flex-direction: row;
        text-align: left;
        align-items: center;
        justify-content: space-between;
    }
    .hero-text {
        flex: 0 0 55%;
        align-items: flex-start;
    }
    .hero-visual {
        flex: 0 0 40%;
    }
}`);

css = css.replace('<img src="/assets/logo.png" alt="Siklo Logo" class="main-logo-img" />', '<h1 class="siklo-wordmark">SIKLO</h1>');

css = css.replace('.main-logo-img {\n  width: 100%;\n  max-width: clamp(200px, 50vw, 450px);\n  height: auto;\n  object-fit: contain;\n}', 
`.siklo-wordmark {
  font-family: var(--font-serif);
  font-size: clamp(48px, 8vw, 84px);
  font-weight: 900;
  color: var(--color-primary-900);
  margin: 0;
  line-height: 1;
}`);

// Remove inherit background from global style that might cause bugs
css = css.replace('* {\n  background-color: inherit;\n}', '');

fs.writeFileSync('src/pages/LandingPage.vue', css);
