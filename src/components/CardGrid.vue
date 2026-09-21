<script setup>
defineProps({ items: { type: Array, required: true } })
</script>

<template>
  <section class="projects-grid"><article v-for="item in items" :key="item.title" class="project-card"><img :src="item.image" :alt="item.alt" /><h3>{{ item.title }}</h3><p>{{ item.description }}</p><a v-if="item.url" :href="item.url" class="btn primary-btn">{{ item.action }}</a></article></section>
</template>
