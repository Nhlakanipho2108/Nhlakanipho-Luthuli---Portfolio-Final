<script setup>
import CardGrid from '../components/CardGrid.vue'
const badges = [
  { image: '/images/cy11.png', alt: 'Weather App', title: 'Cyber Security', description: 'Earned the Introduction to Cyber Security badge by learning the basics of online security, cyber threats, and data protection practices.', url: 'https://www.credly.com/users/nhlakanipho-luthuli', action: 'View Badge' },
  { image: '/images/ds12.png', alt: 'Portfolio Website', title: 'Data Science', description: 'Earned the Introduction to Data Science badge by learning the fundamentals of data analysis and data-driven problem solving.', url: 'https://www.credly.com/users/nhlakanipho-luthuli', action: 'view Badge' },
  { image: '/images/AI Bootcamp completion badge.png', alt: 'Task Manager App', title: 'AI Bootcamp', description: 'Earned the Capaciti AI Bootcamp badge by developing introductory skills in AI, technology, and digital innovation.', url: 'https://coursera.org/share/f1853f5c502a3c46f016deec1e0c9009', action: 'View Badge' },
]
</script>
<template><main class="page-content"><h1 class="section-title">Featured Badges</h1><CardGrid :items="badges" /></main></template>
