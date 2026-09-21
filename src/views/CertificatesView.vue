<script setup>
import CardGrid from '../components/CardGrid.vue'
const certificates = [
  { image: '/images/udemy.jpg', alt: 'Weather App', title: 'Udemy Certificate', description: 'Learned to build responsive and modern websites using HTML and CSS.' },
  { image: '/images/WE think code.PNG', alt: 'Portfolio Website', title: 'We Think Code Certificate', description: 'Gained foundational skills in Generative AI and AI-powered coding tools.' },
  { image: '/images/cousera 2.PNG', alt: 'Task Manager App', title: 'iBM Coursera Certificate', description: 'Learned the fundamentals of Generative AI and its real-world applications through IBM.' },
  { image: '/images/cousera 1.PNG', alt: 'Weather App', title: 'B.M Cousera Certificate', description: 'Completed the Guide to Coding certificate, gaining foundational programming skills and coding basics.' },
  { image: '/images/skills global.jfif', alt: 'Portfolio Website', title: 'Skills Global Cyber Security Certificate', description: 'Gainined foundational knowledge in cybersecurity  and online protection.' },
  { image: '/images/cousera 3.PNG', alt: 'Task Manager App', title: 'Vibe Coding Certificate', description: 'Completed the Vibe Coding Fundamentals certificate, gaining foundational coding skills and understanding  programming concepts.' },
  { image: '/images/Data science.PNG', alt: 'Weather App', title: 'Data Science Certificate', description: 'Completed the Introduction to Data Science certificate, gaining foundational skills in data analysis and interpretation.' },
  { image: '/images/risk', alt: 'Portfolio Website', title: 'Risk Assessment Certificate', description: 'Completed a Risk Assessment and Management certificate, focusing on identifying and controlling risks.' },
  { image: '/images/cybersecurity.PNG', alt: 'Task Manager App', title: 'Cyber Security Certificate', description: 'Completed an Introduction to Cyber Security certificate, gaining basic skills in protecting systems and understanding cyber threats.' },
]
</script>
<template><main class="page-content"><h1 class="section-title">Featured Certificates</h1><CardGrid :items="certificates" /></main></template>
