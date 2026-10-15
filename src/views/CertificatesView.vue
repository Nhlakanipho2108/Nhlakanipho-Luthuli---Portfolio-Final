<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import CertificateCard from '../components/CertificateCard.vue'

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
  { image: '/images/udemy.jpg', alt: 'Udemy web development certificate', title: 'Udemy Certificate', issuer: 'Udemy', category: 'Web & Code', completionDate: 'Date not listed', description: 'Learned to build responsive and modern websites using HTML and CSS.', skills: ['HTML', 'CSS', 'Responsive design'] },
  { image: '/images/WE think code.PNG', alt: 'We Think Code certificate', title: 'We Think Code Certificate', issuer: 'We Think Code', category: 'AI & Data', completionDate: 'Date not listed', description: 'Gained foundational skills in Generative AI and AI-powered coding tools.', skills: ['Generative AI', 'AI-assisted coding'] },
  { image: '/images/cousera 2.PNG', alt: 'IBM Coursera certificate', title: 'iBM Coursera Certificate', issuer: 'IBM / Coursera', category: 'AI & Data', completionDate: 'Date not listed', description: 'Learned the fundamentals of Generative AI and its real-world applications through IBM.', skills: ['Generative AI', 'AI applications'] },
  { image: '/images/cousera 1.PNG', alt: 'Coursera Guide to Coding certificate', title: 'B.M Cousera Certificate', issuer: 'Coursera', category: 'Web & Code', completionDate: 'Date not listed', description: 'Completed the Guide to Coding certificate, gaining foundational programming skills and coding basics.', skills: ['Programming fundamentals', 'Coding basics'] },
  { image: '/images/skills global.jfif', alt: 'Skills Global Cyber Security certificate', title: 'Skills Global Cyber Security Certificate', issuer: 'Skills Global', category: 'Cybersecurity', completionDate: 'Date not listed', description: 'Gainined foundational knowledge in cybersecurity  and online protection.', skills: ['Cybersecurity', 'Online protection'] },
  { image: '/images/cousera 3.PNG', alt: 'Vibe Coding certificate', title: 'Vibe Coding Certificate', issuer: 'Coursera', category: 'Web & Code', completionDate: 'Date not listed', description: 'Completed the Vibe Coding Fundamentals certificate, gaining foundational coding skills and understanding  programming concepts.', skills: ['Coding fundamentals', 'Programming concepts'] },
  { image: '/images/Data science.PNG', alt: 'Introduction to Data Science certificate', title: 'Data Science Certificate', issuer: 'Issuing organisation not listed', category: 'AI & Data', completionDate: 'Date not listed', description: 'Completed the Introduction to Data Science certificate, gaining foundational skills in data analysis and interpretation.', skills: ['Data analysis', 'Data interpretation'] },
  { image: '/images/risk', alt: 'Risk Assessment and Management certificate', title: 'Risk Assessment Certificate', issuer: 'Issuing organisation not listed', category: 'Cybersecurity', completionDate: 'Date not listed', description: 'Completed a Risk Assessment and Management certificate, focusing on identifying and controlling risks.', skills: ['Risk assessment', 'Risk management'] },
  { image: '/images/cybersecurity.PNG', alt: 'Introduction to Cyber Security certificate', title: 'Cyber Security Certificate', issuer: 'Issuing organisation not listed', category: 'Cybersecurity', completionDate: 'Date not listed', description: 'Completed an Introduction to Cyber Security certificate, gaining basic skills in protecting systems and understanding cyber threats.', skills: ['Cybersecurity', 'Threat awareness'] },
  { image: '/images/AWS1.JPG', alt: 'AWS introduction certificate', title: 'Machine Learning & A.I Certificate', issuer: 'AWS', category: 'Cloud', completionDate: 'Date not listed', description: 'Completed an Introduction to AWS certificate, gaining basic skills in cloud computing and understanding AWS services.', skills: ['Machine learning', 'Cloud computing'] },
  { image: '/images/AWS2.JPG', alt: 'AWS advanced certificate', title: 'Prompt Engineering Certificate', issuer: 'AWS', category: 'Cloud', completionDate: 'Date not listed', description: 'Completed an Advanced AWS certificate, gaining deeper skills in cloud computing and advanced AWS services.', skills: ['Prompt engineering', 'Cloud services'] },
  { image: '/images/AWS3.JPG', alt: 'AWS expert certificate', title: 'A.i Practices Certificate', issuer: 'AWS', category: 'Cloud', completionDate: 'Date not listed', description: 'Completed an Expert AWS certificate, gaining advanced skills in cloud computing and expert-level AWS services.', skills: ['AI practices', 'Cloud computing'] },
]

const visibleCertificates = computed(() => activeCategory.value === 'All'
  ? certificates
  : certificates.filter((certificate) => certificate.category === activeCategory.value))

const activeCertificateIndex = ref(0)
const isModalOpen = ref(false)
const modalCloseButton = ref(null)
const modalPanel = ref(null)
const lastFocusedElement = ref(null)
const activeCertificate = computed(() => visibleCertificates.value[activeCertificateIndex.value])

function openCertificate(certificate) {
  activeCertificateIndex.value = visibleCertificates.value.indexOf(certificate)
  lastFocusedElement.value = document.activeElement
  isModalOpen.value = true
  nextTick(() => modalCloseButton.value?.focus())
}

function closeCertificate() {
  isModalOpen.value = false
  nextTick(() => lastFocusedElement.value?.focus())
}

function changeCertificate(offset) {
  const total = visibleCertificates.value.length
  activeCertificateIndex.value = (activeCertificateIndex.value + offset + total) % total
}

function handleModalKeydown(event) {
  if (event.key === 'Escape') closeCertificate()
  if (event.key === 'ArrowLeft') changeCertificate(-1)
  if (event.key === 'ArrowRight') changeCertificate(1)
  if (event.key === 'Tab' && modalPanel.value) {
    const focusable = [...modalPanel.value.querySelectorAll('button, a[href]')]
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
}

watch(isModalOpen, (open) => { document.body.style.overflow = open ? 'hidden' : '' })
watch(activeCategory, () => { activeCertificateIndex.value = 0; if (isModalOpen.value) closeCertificate() })
onMounted(() => document.addEventListener('keydown', handleModalKeydown))
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleModalKeydown)
  document.body.style.overflow = ''
})

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
      <section class="certificate-grid" aria-label="Certificates">
        <CertificateCard v-for="certificate in visibleCertificates" :key="certificate.title" :certificate="certificate" @open="openCertificate(certificate)" />
      </section>
    </div>
  </main>
  <Transition name="certificate-modal">
    <div v-if="isModalOpen && activeCertificate" class="certificate-modal" role="dialog" aria-modal="true" :aria-label="activeCertificate.title" @click.self="closeCertificate">
      <div ref="modalPanel" class="certificate-modal__panel">
        <button ref="modalCloseButton" class="certificate-modal__close" type="button" aria-label="Close certificate details" @click="closeCertificate">×</button>
        <div class="certificate-modal__visual">
          <span class="certificate-modal__line" aria-hidden="true"></span>
          <img :src="activeCertificate.image" :alt="activeCertificate.alt" />
        </div>
        <div class="certificate-modal__details">
          <p class="certificate-eyebrow">Credential vault · {{ String(activeCertificateIndex + 1).padStart(2, '0') }} / {{ String(visibleCertificates.length).padStart(2, '0') }}</p>
          <h2>{{ activeCertificate.title }}</h2>
          <dl>
            <div><dt>Issued by</dt><dd>{{ activeCertificate.issuer }}</dd></div>
            <div><dt>Completed</dt><dd>{{ activeCertificate.completionDate }}</dd></div>
          </dl>
          <p class="certificate-modal__description">{{ activeCertificate.description }}</p>
          <div class="certificate-skills"><span v-for="skill in activeCertificate.skills" :key="skill">{{ skill }}</span></div>
          <a v-if="activeCertificate.url" class="btn primary-btn" :href="activeCertificate.url" target="_blank" rel="noopener noreferrer">Verify Certificate <span aria-hidden="true">↗</span></a>
          <p v-else class="certificate-modal__note">No verification link has been added for this credential.</p>
          <div class="certificate-modal__controls">
            <button type="button" aria-label="Previous certificate" @click="changeCertificate(-1)">← <span>Previous</span></button>
            <button type="button" aria-label="Next certificate" @click="changeCertificate(1)"><span>Next</span> →</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
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
.certificate-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; max-width: 1040px; margin: 0 auto; }
.certificate-modal { position: fixed; inset: 0; z-index: 20; display: grid; place-items: center; padding: 24px; background: rgba(5, 5, 5, 0.84); backdrop-filter: blur(10px); }
.certificate-modal__panel { position: relative; display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr); width: min(920px, 100%); max-height: min(720px, calc(100vh - 48px)); overflow: auto; border: 1px solid rgba(118, 224, 208, 0.28); border-radius: 18px; background: #151515; box-shadow: 0 28px 80px rgba(0, 0, 0, 0.55); }
.certificate-modal__close { position: absolute; top: 16px; right: 16px; z-index: 2; display: grid; width: 36px; height: 36px; place-items: center; border: 1px solid rgba(255, 255, 255, 0.17); border-radius: 50%; color: #fff; background: rgba(10, 10, 10, 0.68); cursor: pointer; font-size: 25px; line-height: 1; transition: border-color 160ms ease, color 160ms ease, background 160ms ease; }
.certificate-modal__close:hover, .certificate-modal__close:focus-visible { border-color: #76e0d0; color: #76e0d0; background: #101010; }
.certificate-modal__close:focus-visible, .certificate-modal__controls button:focus-visible, .certificate-modal__details .btn:focus-visible { outline: 2px solid #76e0d0; outline-offset: 3px; }
.certificate-modal__visual { position: relative; display: grid; min-height: 440px; place-items: center; overflow: hidden; background: radial-gradient(circle at 50% 45%, rgba(118, 224, 208, 0.14), rgba(255, 60, 121, 0.04) 52%, #0d0d0d 100%); }
.certificate-modal__visual::before { position: absolute; inset: 9%; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; content: ''; }
.certificate-modal__visual img { z-index: 1; width: 82%; max-height: 400px; object-fit: contain; filter: drop-shadow(0 18px 24px rgba(0, 0, 0, 0.5)); animation: certificate-reveal 600ms ease both; }
.certificate-modal__line { position: absolute; inset: 8% 9%; z-index: 2; height: 1px; background: linear-gradient(90deg, transparent, rgba(118, 224, 208, 0.8), transparent); box-shadow: 0 0 12px rgba(118, 224, 208, 0.5); animation: credential-scan 700ms 100ms ease-out both; }
.certificate-modal__details { padding: 58px 42px 34px; }
.certificate-modal__details h2 { max-width: 390px; margin: 10px 0 24px; font-size: clamp(24px, 3vw, 34px); line-height: 1.18; }
.certificate-modal__details dl { display: grid; gap: 13px; margin-bottom: 22px; }
.certificate-modal__details dl div { display: flex; justify-content: space-between; gap: 15px; padding-bottom: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); font-size: 12px; }
.certificate-modal__details dt { color: #aaa5ad; }
.certificate-modal__details dd { margin: 0; color: #f8f6f8; text-align: right; }
.certificate-modal__description { color: #c8c4cb; font-size: 13px; line-height: 1.75; }
.certificate-skills { display: flex; flex-wrap: wrap; gap: 7px; margin: 22px 0; }
.certificate-skills span { padding: 6px 9px; border: 1px solid rgba(118, 224, 208, 0.25); border-radius: 5px; color: #76e0d0; font-size: 10px; }
.certificate-modal__details .btn { display: inline-flex; align-items: center; gap: 8px; }
.certificate-modal__note { color: #8f8a92; font-size: 10px; }
.certificate-modal__controls { display: flex; justify-content: space-between; gap: 10px; margin-top: 30px; }
.certificate-modal__controls button { border: 0; color: #aaa5ad; background: transparent; cursor: pointer; font: inherit; font-size: 11px; transition: color 160ms ease; }
.certificate-modal__controls button:hover, .certificate-modal__controls button:focus-visible { color: #76e0d0; }
.certificate-modal-enter-active, .certificate-modal-leave-active { transition: opacity 220ms ease; }
.certificate-modal-enter-active .certificate-modal__panel, .certificate-modal-leave-active .certificate-modal__panel { transition: transform 260ms ease, opacity 220ms ease; }
.certificate-modal-enter-from, .certificate-modal-leave-to { opacity: 0; }
.certificate-modal-enter-from .certificate-modal__panel, .certificate-modal-leave-to .certificate-modal__panel { opacity: 0; transform: translateY(14px) scale(0.97); }
@keyframes certificate-reveal { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
@keyframes credential-scan { from { opacity: 0; transform: translateY(-260px); } 18% { opacity: 1; } to { opacity: 0; transform: translateY(260px); } }
@keyframes results-enter { from { transform: translateY(7px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

@media (max-width: 600px) {
  .certificate-summary { align-items: flex-start; }
  .certificate-summary h2 { font-size: 17px; }
  .certificate-count { padding-top: 15px; font-size: 11px; }
  .certificate-filters { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .certificate-filters button { justify-content: flex-start; min-width: 0; }
  .certificate-filters button:first-child { grid-column: 1 / -1; }
  .filter-count { margin-left: auto; }
  .certificate-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
  .certificate-modal { align-items: end; padding: 10px; }
  .certificate-modal__panel { grid-template-columns: 1fr; max-height: calc(100vh - 20px); border-radius: 15px; }
  .certificate-modal__visual { min-height: 240px; }
  .certificate-modal__visual img { max-height: 220px; }
  .certificate-modal__details { padding: 30px 22px 22px; }
  .certificate-modal__details h2 { margin-bottom: 18px; font-size: 24px; }
}

@media (prefers-reduced-motion: reduce) {
  .certificate-results { animation: none; }
  .certificate-filters button { transition: none; }
  .certificate-modal, .certificate-modal__panel, .certificate-modal__close, .certificate-modal__controls button { transition: none; }
  .certificate-modal__visual img, .certificate-modal__line { animation: none; }
}
</style>
