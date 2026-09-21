<script setup>
import { RouterLink } from 'vue-router'

const skills = [
  { title: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'] },
  { title: 'Backend', items: ['Node.js', 'Express', 'APIs', 'Database Basics'] },
  { title: 'Tools', items: ['Git & GitHub', 'VS Code', 'Figma', 'Chrome DevTools'] },
]

const journey = [['2024', 'HTML & CSS', 'Completed'], ['2025', 'JavaScript & React', 'In Progress'], ['2026', 'Full Stack Development', 'Growing']]
</script>

<template>
  <main>
    <section class="hero">
      <div class="hero-text">
        <p class="small-title">HELLO 👋</p>
        <h1>I'm <span>Nhlakanipho Luthuli</span><br />Full Stack Developer</h1>
        <p class="hero-description">I build modern, responsive and user-friendly websites using HTML, CSS and JavaScript. Passionate about coding, UI design and solving real-world problems through technology.</p>
        <div class="hero-buttons"><RouterLink to="/projects" class="btn primary-btn">View Projects</RouterLink><RouterLink to="/contact" class="btn secondary-btn">Hire Me</RouterLink></div>
        <div class="social-icons">
          <a href="https://www.linkedin.com/in/nhlakanipho-luthuli-87b30a366/"><img src="/images/linkedin (1).png" alt="LinkedIn" width="30" height="30" /></a>
          <a href="https://www.instagram.com/andileceejay21/"><img src="/images/instagram.png" alt="Instagram" width="30" height="30" /></a>
          <a href="https://github.com/Nhlakanipho2108"><img src="/images/github.png" alt="GitHub" width="30" height="30" /></a>
        </div>
      </div>
      <div class="hero-image"><img src="/images/IMG_1088-removebg-preview.png" alt="Portrait of Andile" /></div>
    </section>
    <section class="skills-section"><h2>My Skills</h2><div class="skills-container"><article v-for="skill in skills" :key="skill.title" class="skill-card"><h3>{{ skill.title }}</h3><ul><li v-for="item in skill.items" :key="item">{{ item }}</li></ul></article></div></section>
    <section class="journey-section"><h2>Learning Journey</h2><table><thead><tr><th>Year</th><th>Focus</th><th>Status</th></tr></thead><tbody><tr v-for="row in journey" :key="row[0]"><td v-for="cell in row" :key="cell">{{ cell }}</td></tr></tbody></table></section>
  </main>
</template>
