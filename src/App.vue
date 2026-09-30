<script setup>
import { RouterLink, RouterView } from 'vue-router'
import PortfolioAssistant from './components/PortfolioAssistant.vue'

const links = [
  { label: 'Home', to: '/' }, { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' }, { label: 'Certificates', to: '/certificates' },
  { label: 'Badges', to: '/badges' }, { label: 'Contact', to: '/contact' },
]
</script>

<template>
  <header class="header">
    <div class="logo"><span>Nhlakanipho</span> Luthuli</div>
    <nav class="navbar" aria-label="Main navigation">
      <RouterLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</RouterLink>
    </nav>
  </header>
  <RouterView />
  <footer class="footer"><p>2026 Nhlakanipho Luthuli | Built with HTML , CSS &amp; Vue.js</p></footer>
  <PortfolioAssistant />
</template>
