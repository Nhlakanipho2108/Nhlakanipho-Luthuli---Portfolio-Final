<script setup>
import { computed, ref } from 'vue'
import CardGrid from '../components/CardGrid.vue'

const activeCategory = ref('All')
const filters = [
  { label: 'All', icon: 'all', color: '#ff3c79' },
  { label: 'Web & Code', icon: 'code', color: '#76e0d0' },
  { label: 'AI & Data', icon: 'robot', color: '#f6bd60' },
  { label: 'Cybersecurity', icon: 'shield', color: '#ff866b' },
  { label: 'Cloud', icon: 'cloud', color: '#8ab4f8' },
]
const iconPaths = {
  all: ['M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z'],
  code: ['m8 8-4 4 4 4', 'm16 8 4 4-4 4', 'm14 5-4 14'],
  robot: ['M8 9h8a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3Z', 'M12 5v4', 'M10 14v.01', 'M14 14v.01', 'M10 17h4', 'M3 12h2M19 12h2'],
  shield: ['M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z', 'm9 12 2 2 4-4'],
  cloud: ['M20 16.2A4.5 4.5 0 0 0 18 7.7a6 6 0 0 0-11.5 1.6A4 4 0 0 0 7 17h12'],
}

const certificates = [
  { image: '/images/udemy.jpg', alt: 'Udemy web development certificate', title: 'Udemy Certificate', category: 'Web & Code', description: 'Learned to build responsive and modern websites using HTML and CSS.' },
  { image: '/images/WE think code.PNG', alt: 'We Think Code certificate', title: 'We Think Code Certificate', category: 'AI & Data', description: 'Gained foundational skills in Generative AI and AI-powered coding tools.' },
  { image: '/images/cousera 2.PNG', alt: 'IBM Coursera certificate', title: 'iBM Coursera Certificate', category: 'AI & Data', description: 'Learned the fundamentals of Generative AI and its real-world applications through IBM.' },
  { image: '/images/cousera 1.PNG', alt: 'Coursera Guide to Coding certificate', title: 'B.M Cousera Certificate', category: 'Web & Code', description: 'Completed the Guide to Coding certificate, gaining foundational programming skills and coding basics.' },
  { image: '/images/skills global.jfif', alt: 'Skills Global Cyber Security certificate', title: 'Skills Global Cyber Security Certificate', category: 'Cybersecurity', description: 'Gainined foundational knowledge in cybersecurity  and online protection.' },
  { image: '/images/cousera 3.PNG', alt: 'Vibe Coding certificate', title: 'Vibe Coding Certificate', category: 'Web & Code', description: 'Completed the Vibe Coding Fundamentals certificate, gaining foundational coding skills and understanding  programming concepts.' },
  { image: '/images/Data science.PNG', alt: 'Introduction to Data Science certificate', title: 'Data Science Certificate', category: 'AI & Data', description: 'Completed the Introduction to Data Science certificate, gaining foundational skills in data analysis and interpretation.' },
  { image: '/images/risk', alt: 'Risk Assessment and Management certificate', title: 'Risk Assessment Certificate', category: 'Cybersecurity', description: 'Completed a Risk Assessment and Management certificate, focusing on identifying and controlling risks.' },
  { image: '/images/cybersecurity.PNG', alt: 'Introduction to Cyber Security certificate', title: 'Cyber Security Certificate', category: 'Cybersecurity', description: 'Completed an Introduction to Cyber Security certificate, gaining basic skills in protecting systems and understanding cyber threats.' },
  { image: '/images/AWS1.JPG', alt: 'AWS introduction certificate', title: 'Machine Learning & A.I Certificate', category: 'Cloud', description: 'Completed an Introduction to AWS certificate, gaining basic skills in cloud computing and understanding AWS services.' },
  { image: '/images/AWS2.JPG', alt: 'AWS advanced certificate', title: 'Prompt Engineering Certificate', category: 'Cloud', description: 'Completed an Advanced AWS certificate, gaining deeper skills in cloud computing and advanced AWS services.' },
  { image: '/images/AWS3.JPG', alt: 'AWS expert certificate', title: 'A.i Practices Certificate', category: 'Cloud', description: 'Completed an Expert AWS certificate, gaining advanced skills in cloud computing and expert-level AWS services.' },
]

const visibleCertificates = computed(() => activeCategory.value === 'All'
  ? certificates
  : certificates.filter((certificate) => certificate.category === activeCategory.value))

function countFor(category) {
  return category === 'All'
    ? certificates.length
    : certificates.filter((certificate) => certificate.category === category).length
}
</script>

<template>
  <main class="page-content certificates-page">
    <h1 class="section-title">Featured Certificates</h1>
    <section class="certificate-explorer" aria-label="Certificate topics">
      <div class="certificate-summary" aria-live="polite">
        <div>
          <p class="certificate-eyebrow">Credential explorer</p>
          <h2>{{ activeCategory === 'All' ? 'Learning, in color.' : activeCategory }}</h2>
        </div>
        <p class="certificate-count"><strong>{{ visibleCertificates.length }}</strong><span> / {{ certificates.length }} credentials</span></p>
      </div>
      <div class="certificate-filters" role="group" aria-label="Filter certificates by topic">
        <button
          v-for="filter in filters"
          :key="filter.label"
          type="button"
          :aria-pressed="activeCategory === filter.label"
          :style="{ '--filter-color': filter.color }"
          @click="activeCategory = filter.label"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path v-for="path in iconPaths[filter.icon]" :key="path" :d="path" /></svg>
          <span>{{ filter.label }}</span>
          <span class="filter-count">{{ countFor(filter.label) }}</span>
        </button>
      </div>
    </section>
    <div :key="activeCategory" class="certificate-results">
      <CardGrid :items="visibleCertificates" />
    </div>
  </main>
</template>

<style scoped>
.certificate-explorer { max-width: 1040px; margin: -18px auto 38px; }
.certificate-summary { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 16px; }
.certificate-eyebrow { margin-bottom: 3px; color: #76e0d0; font-size: 10px; font-weight: 600; text-transform: uppercase; }
.certificate-summary h2 { font-size: 20px; line-height: 1.35; }
.certificate-count { flex: 0 0 auto; color: #aaa5ad; font-size: 12px; }
.certificate-count strong { color: #f8f6f8; font-size: 19px; font-variant-numeric: tabular-nums; }
.certificate-filters { display: flex; flex-wrap: wrap; gap: 8px; }
.certificate-filters button { display: inline-flex; align-items: center; gap: 8px; min-height: 40px; padding: 7px 10px; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; color: #ccc8d0; background: #151515; cursor: pointer; font: inherit; font-size: 11px; transition: border-color 150ms ease, background 150ms ease, color 150ms ease; }
.certificate-filters button:hover, .certificate-filters button:focus-visible, .certificate-filters button[aria-pressed='true'] { border-color: var(--filter-color); color: #fff; background: color-mix(in srgb, var(--filter-color) 11%, #151515); }
.certificate-filters svg { width: 15px; height: 15px; fill: none; stroke: var(--filter-color); stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.7; }
.filter-count { display: grid; min-width: 20px; height: 20px; place-items: center; border-radius: 5px; color: var(--filter-color); background: color-mix(in srgb, var(--filter-color) 12%, transparent); font-size: 10px; font-variant-numeric: tabular-nums; }
.certificate-results { animation: results-enter 240ms ease both; }
@keyframes results-enter { from { transform: translateY(7px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

@media (max-width: 600px) {
  .certificate-summary { align-items: flex-start; }
  .certificate-summary h2 { font-size: 17px; }
  .certificate-count { padding-top: 15px; font-size: 11px; }
  .certificate-filters { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .certificate-filters button { justify-content: flex-start; min-width: 0; }
  .certificate-filters button:first-child { grid-column: 1 / -1; }
  .filter-count { margin-left: auto; }
}

@media (prefers-reduced-motion: reduce) {
  .certificate-results { animation: none; }
  .certificate-filters button { transition: none; }
}
</style>
