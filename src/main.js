import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import ProjectsView from './views/ProjectsView.vue'
import CertificatesView from './views/CertificatesView.vue'
import BadgesView from './views/BadgesView.vue'
import ContactView from './views/ContactView.vue'
import '../css/style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView, meta: { title: 'Nhlakanipho Luthuli | Software Developer Portfolio' } },
    { path: '/about', component: AboutView, meta: { title: 'About | Nhlakanipho Luthuli' } },
    { path: '/projects', component: ProjectsView, meta: { title: 'Projects | Nhlakanipho Luthuli' } },
    { path: '/certificates', component: CertificatesView, meta: { title: 'Certificates | Nhlakanipho Luthuli' } },
    { path: '/badges', component: BadgesView, meta: { title: 'Badges | Nhlakanipho Luthuli' } },
    { path: '/contact', component: ContactView, meta: { title: 'Contact | Nhlakanipho Luthuli' } },
  ],
})

router.afterEach((to) => { document.title = to.meta.title || 'Nhlakanipho Luthuli' })

createApp(App).use(router).mount('#app')
