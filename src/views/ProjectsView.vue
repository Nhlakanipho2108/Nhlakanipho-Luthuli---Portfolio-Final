<script setup>
import CardGrid from '../components/CardGrid.vue'

const projects = [
  { image: '/images/telkom clone.PNG', alt: 'Telkom Clone Website', title: 'Telkom Clone Website', description: "Website clone of Telkom's official site built using Html , Css.", url: 'https://telkomclone.netlify.app/home', action: 'Live Demo' },
  { image: '/images/villageboys travels.PNG', alt: 'Village Boys TRAVEL Website', title: 'Village Boys Travel Website', description: 'Responsive website for a travel agency.', url: 'https://villageboytravels20.netlify.app/', action: 'Live Demo' },
  { image: '/images/student directory.PNG', alt: 'Student directory', title: 'Student Directory', description: 'student directory with search and filter features.', url: 'https://studentdirectory21.netlify.app/', action: 'Live Demo' },
  { image: '/images/calculator.PNG', alt: 'Calculator App', title: 'Calculator App', description: 'Responsive weather application using APIs and JavaScript.', url: 'https://calculator2109.netlify.app/', action: 'Live Demo' },
  { image: '/images/EcoAware.jpg', alt: 'Eco Aware Website', title: 'Eco Aware Website', description: 'Recycling website with educational content and interactive features.', url: 'https://dainty-banoffee-54d086.netlify.app/', action: 'Live Demo' },
  { image: '/images/modelhub.jpg', alt: 'S.A Model Hub', title: 'S.A Model Hub', description: 'Productivity application with clean UI and responsive design.', url: 'https://neon-tiramisu-e71795.netlify.app/', action: 'Live Demo' },
]
</script>

<template><main class="page-content"><h1 class="section-title">Featured Projects</h1><CardGrid :items="projects" /></main></template>
