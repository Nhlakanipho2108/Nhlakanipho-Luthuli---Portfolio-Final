<script setup>
import { defineAsyncComponent, ref } from 'vue'

const ProjectsScene = defineAsyncComponent(() => import('../components/ProjectsScene.vue'))

const selectedProject = ref(null)
const projects = [
  { image: '/images/telkom clone.PNG', alt: 'Telkom Clone Website', title: 'Telkom Clone Website', description: "Website clone of Telkom's official site built using Html , Css.", url: 'https://telkomclone.netlify.app/home', action: 'Live Demo' },
  { image: '/images/villageboys travels.PNG', alt: 'Village Boys TRAVEL Website', title: 'Village Boys Travel Website', description: 'Responsive website for a travel agency.', url: 'https://villageboytravels20.netlify.app/', action: 'Live Demo' },
  { image: '/images/student directory.PNG', alt: 'Student directory', title: 'Student Directory', description: 'student directory with search and filter features.', url: 'https://studentdirectory21.netlify.app/', action: 'Live Demo' },
  { image: '/images/calculator.PNG', alt: 'Calculator App', title: 'Calculator App', description: 'Responsive weather application using APIs and JavaScript.', url: 'https://calculator2109.netlify.app/', action: 'Live Demo' },
  { image: '/images/EcoAware.jpg', alt: 'Eco Aware Website', title: 'Eco Aware Website', description: 'Recycling website with educational content and interactive features.', url: 'https://dainty-banoffee-54d086.netlify.app/', action: 'Live Demo' },
  { image: '/images/modelhub.jpg', alt: 'S.A Model Hub', title: 'S.A Model Hub', description: 'Productivity application with clean UI and responsive design.', url: 'https://neon-tiramisu-e71795.netlify.app/', action: 'Live Demo' },
  { image: '/images/safe her.jpg', alt: 'Safe Her Website', title: 'Safe Her Website', description: 'Productivity application with clean UI and responsive design.', url: 'https://safeher-e-commerce.onrender.com/', action: 'Live Demo' },
  { image: '/images/moderntech.jpg', alt: 'Modern Tech Website', title: 'Modern Tech Website', description: 'Productivity application with clean UI and responsive design.', url: 'https://khanyamfunda.github.io/Hr-Project-final-repo/', action: 'Live Demo' },
  { image: '/images/webscrapping.jpg', alt: 'Web Scrapping Project', title: 'Web Scrapping Project', description: 'Productivity application with clean UI and responsive design.', url: 'https://team-alpha-1.onrender.com/', action: 'Live Demo' },
]

function showProject(project) {
  selectedProject.value = project
}
</script>

<template>
  <main class="page-content">
    <h1 class="section-title">Featured Projects</h1>
    <ProjectsScene :projects="projects" @select-project="showProject" />
    <Transition name="project-detail">
      <section v-if="selectedProject" class="project-detail" aria-live="polite">
        <div class="project-detail-copy">
          <p class="project-detail-eyebrow">Selected project</p>
          <h2>{{ selectedProject.title }}</h2>
          <p>{{ selectedProject.description }}</p>
        </div>
        <div class="project-detail-actions">
          <a class="btn primary-btn" :href="selectedProject.url" target="_blank" rel="noopener noreferrer">
            {{ selectedProject.action || 'View Project' }} <span aria-hidden="true">↗</span>
          </a>
          <button class="project-detail-close" type="button" aria-label="Close project details" title="Close project details" @click="selectedProject = null">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </div>
      </section>
    </Transition>
  </main>
</template>

<style scoped>
.project-detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin: -12px 0 34px;
  padding: 18px 20px;
  border: 1px solid rgba(255, 60, 121, 0.28);
  border-left: 3px solid #ff3c79;
  border-radius: 9px;
  background: linear-gradient(105deg, rgba(255, 60, 121, 0.09), rgba(21, 21, 21, 0.9) 52%);
}

.project-detail-copy { min-width: 0; }
.project-detail-eyebrow { margin-bottom: 3px; color: #76e0d0; font-size: 10px; text-transform: uppercase; }
.project-detail h2 { margin-bottom: 4px; font-size: 18px; line-height: 1.35; }
.project-detail-copy > p:last-child { color: #c8c4cb; font-size: 12px; line-height: 1.6; }
.project-detail-actions { display: flex; flex: 0 0 auto; align-items: center; gap: 8px; }
.project-detail-actions .btn { white-space: nowrap; }
.project-detail-close { display: grid; width: 38px; height: 38px; place-items: center; border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 8px; color: #c8c4cb; background: transparent; cursor: pointer; }
.project-detail-close:hover, .project-detail-close:focus-visible { color: white; border-color: #ff3c79; }
.project-detail-close svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-width: 1.8; }
.project-detail-enter-active, .project-detail-leave-active { transition: opacity 160ms ease, transform 160ms ease; }
.project-detail-enter-from, .project-detail-leave-to { transform: translateY(7px); opacity: 0; }

@media (max-width: 600px) {
  .project-detail { align-items: flex-start; gap: 12px; padding: 15px; }
  .project-detail-actions { flex-direction: column-reverse; align-items: flex-end; }
  .project-detail-actions .btn { padding: 9px 12px; font-size: 11px; }
}

@media (prefers-reduced-motion: reduce) {
  .project-detail-enter-active, .project-detail-leave-active { transition: none; }
}
</style>
