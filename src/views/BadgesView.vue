<script setup>
import { computed, ref } from 'vue'

const badges = [
  { image: '/images/cy11.png', alt: 'Introduction to Cyber Security badge', title: 'Cyber Security', description: 'Earned the Introduction to Cyber Security badge by learning the basics of online security, cyber threats, and data protection practices.', url: 'https://www.credly.com/users/nhlakanipho-luthuli', action: 'View Badge' },
  { image: '/images/ds12.png', alt: 'Introduction to Data Science badge', title: 'Data Science', description: 'Earned the Introduction to Data Science badge by learning the fundamentals of data analysis and data-driven problem solving.', url: 'https://www.credly.com/users/nhlakanipho-luthuli', action: 'View Badge' },
  { image: '/images/AI Bootcamp completion badge.png', alt: 'Capaciti AI Bootcamp badge', title: 'AI Bootcamp', description: 'Earned the Capaciti AI Bootcamp badge by developing introductory skills in AI, technology, and digital innovation.', url: 'https://coursera.org/share/f1853f5c502a3c46f016deec1e0c9009', action: 'View Badge' },
]

const activeIndex = ref(0)
const activeBadge = computed(() => badges[activeIndex.value])

function showBadge(index) {
  activeIndex.value = (index + badges.length) % badges.length
}

function shuffleBadge() {
  const offset = Math.floor(Math.random() * (badges.length - 1)) + 1
  showBadge(activeIndex.value + offset)
}
</script>

<template>
  <main class="page-content badges-page">
    <h1 class="section-title">Featured Badges</h1>
    <section class="badge-deck" aria-label="Browse earned badges">
      <Transition name="badge-swap" mode="out-in">
        <div :key="activeBadge.title" class="badge-feature">
          <div class="badge-artwork">
            <span class="badge-counter">{{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(badges.length).padStart(2, '0') }}</span>
            <img :src="activeBadge.image" :alt="activeBadge.alt" />
          </div>
          <div class="badge-copy" aria-live="polite">
            <p class="badge-eyebrow">Badge spotlight</p>
            <h2>{{ activeBadge.title }}</h2>
            <p class="badge-description">{{ activeBadge.description }}</p>
            <a class="btn primary-btn badge-link" :href="activeBadge.url" target="_blank" rel="noopener noreferrer">
              {{ activeBadge.action }} <span aria-hidden="true">↗</span>
            </a>
            <div class="badge-controls" aria-label="Badge navigation">
              <button class="badge-arrow" type="button" aria-label="Previous badge" title="Previous badge" @click="showBadge(activeIndex - 1)">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button class="badge-shuffle" type="button" @click="shuffleBadge">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" /></svg>
                Shuffle badges
              </button>
              <button class="badge-arrow" type="button" aria-label="Next badge" title="Next badge" @click="showBadge(activeIndex + 1)">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </div>
          </div>
        </div>
      </Transition>
      <nav class="badge-picker" aria-label="Select a badge">
        <button
          v-for="(badge, index) in badges"
          :key="badge.title"
          type="button"
          :aria-pressed="activeIndex === index"
          :aria-label="`Show ${badge.title} badge`"
          @click="showBadge(index)"
        >
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <span>{{ badge.title }}</span>
        </button>
      </nav>
    </section>
  </main>
</template>

<style scoped>
.badge-deck { max-width: 940px; margin: 0 auto; }
.badge-feature { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: center; gap: clamp(28px, 6vw, 76px); min-height: 340px; }
.badge-artwork { position: relative; display: grid; min-height: 320px; place-items: center; overflow: hidden; background: radial-gradient(ellipse at 50% 50%, rgba(255, 60, 121, 0.12), rgba(118, 224, 208, 0.035) 42%, transparent 72%); }
.badge-artwork::before { position: absolute; inset: 14% 10%; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 50%; content: ''; transform: rotate(-18deg) scaleY(0.36); }
.badge-artwork img { z-index: 1; width: min(74%, 260px); max-height: 260px; object-fit: contain; filter: drop-shadow(0 18px 35px rgba(0, 0, 0, 0.48)); animation: badge-float 4s ease-in-out infinite; }
.badge-counter { position: absolute; top: 20px; left: 20px; z-index: 2; color: #76e0d0; font-size: 10px; font-variant-numeric: tabular-nums; }
.badge-copy { padding: 24px 0; }
.badge-eyebrow { margin-bottom: 10px; color: #76e0d0; font-size: 10px; font-weight: 600; text-transform: uppercase; }
.badge-copy h2 { margin-bottom: 14px; font-size: clamp(24px, 3vw, 34px); line-height: 1.2; }
.badge-description { max-width: 420px; margin-bottom: 24px; color: #c8c4cb; font-size: 13px; line-height: 1.8; }
.badge-link { display: inline-flex; align-items: center; gap: 8px; }
.badge-controls { display: flex; align-items: center; gap: 9px; margin-top: 28px; }
.badge-arrow, .badge-shuffle { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 40px; border: 1px solid rgba(255, 255, 255, 0.13); border-radius: 8px; color: #e8e3ea; background: #151515; cursor: pointer; font: inherit; font-size: 11px; transition: border-color 150ms ease, color 150ms ease, background 150ms ease; }
.badge-arrow { width: 40px; }
.badge-shuffle { padding: 0 13px; border-color: rgba(255, 60, 121, 0.35); color: #ff83a7; }
.badge-arrow:hover, .badge-arrow:focus-visible, .badge-shuffle:hover, .badge-shuffle:focus-visible { border-color: #ff3c79; color: #fff; background: rgba(255, 60, 121, 0.12); }
.badge-arrow svg, .badge-shuffle svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.8; }
.badge-picker { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 18px; border-top: 1px solid rgba(255, 255, 255, 0.12); border-bottom: 1px solid rgba(255, 255, 255, 0.12); }
.badge-picker button { display: flex; align-items: center; gap: 12px; min-width: 0; min-height: 58px; padding: 10px 13px; border: 0; color: #aaa5ad; background: transparent; cursor: pointer; font: inherit; font-size: 11px; text-align: left; transition: color 140ms ease, background 140ms ease; }
.badge-picker button + button { border-left: 1px solid rgba(255, 255, 255, 0.1); }
.badge-picker button:hover, .badge-picker button:focus-visible, .badge-picker button[aria-pressed='true'] { color: white; background: rgba(255, 255, 255, 0.045); }
.badge-picker button > span:first-child { color: #76e0d0; font-size: 10px; font-variant-numeric: tabular-nums; }
.badge-picker button > span:last-child { overflow-wrap: anywhere; }
.badge-swap-enter-active, .badge-swap-leave-active { transition: opacity 150ms ease, transform 150ms ease; }
.badge-swap-enter-from { transform: translateY(8px); opacity: 0; }
.badge-swap-leave-to { transform: translateY(-8px); opacity: 0; }
@keyframes badge-float { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-8px) rotate(2deg); } }

@media (max-width: 700px) {
  .badge-feature { grid-template-columns: 1fr; gap: 0; }
  .badge-artwork { min-height: 250px; }
  .badge-artwork img { width: min(60%, 210px); max-height: 210px; }
  .badge-copy { padding: 8px 4px 24px; }
  .badge-copy h2 { font-size: 25px; }
  .badge-description { margin-bottom: 18px; font-size: 12px; }
  .badge-controls { margin-top: 20px; }
  .badge-picker button { gap: 7px; min-height: 54px; padding: 8px; font-size: 10px; }
}

@media (prefers-reduced-motion: reduce) {
  .badge-artwork img { animation: none; }
  .badge-swap-enter-active, .badge-swap-leave-active, .badge-arrow, .badge-shuffle, .badge-picker button { transition: none; }
}
</style>
