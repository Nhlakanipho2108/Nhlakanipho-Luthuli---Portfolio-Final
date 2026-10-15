<script setup>
defineProps({
  certificate: { type: Object, required: true },
})

defineEmits(['open'])
</script>

<template>
  <button class="certificate-card" type="button" :aria-label="`View details for ${certificate.title}`" @click="$emit('open')">
    <span class="certificate-card__corner" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8" /></svg>
    </span>
    <span class="certificate-card__art">
      <img :src="certificate.image" :alt="certificate.alt" loading="lazy" />
      <span class="certificate-card__scan" aria-hidden="true"></span>
    </span>
    <span class="certificate-card__body">
      <span class="certificate-card__meta">{{ certificate.category }} · {{ certificate.completionDate }}</span>
      <strong>{{ certificate.title }}</strong>
      <span class="certificate-card__issuer">{{ certificate.issuer }}</span>
      <span class="certificate-card__action">View Certificate <span aria-hidden="true">↗</span></span>
    </span>
  </button>
</template>

<style scoped>
.certificate-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 390px;
  padding: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 16px;
  color: #f8f6f8;
  background: #151515;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.16);
  cursor: pointer;
  font: inherit;
  text-align: left;
  transition: border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease;
}
.certificate-card::before {
  position: absolute;
  top: 0;
  right: 18%;
  left: 18%;
  z-index: 3;
  height: 2px;
  border-radius: 0 0 4px 4px;
  background: linear-gradient(90deg, #ff3c79, #ff83a7 48%, #76e0d0);
  box-shadow: 0 0 12px rgba(255, 60, 121, 0.28);
  content: '';
  opacity: 0.8;
}
.certificate-card:hover,
.certificate-card:focus-visible {
  border-color: rgba(118, 224, 208, 0.7);
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.3), 0 0 24px rgba(255, 60, 121, 0.1), 0 0 34px rgba(118, 224, 208, 0.08);
  transform: translateY(-5px);
}
.certificate-card:focus-visible { outline: 2px solid #76e0d0; outline-offset: 4px; }
.certificate-card__corner {
  position: absolute;
  top: 13px;
  right: 13px;
  z-index: 2;
  display: grid;
  width: 27px;
  height: 27px;
  place-items: center;
  border: 1px solid rgba(118, 224, 208, 0.4);
  border-radius: 50%;
  color: #76e0d0;
  background: rgba(10, 10, 10, 0.7);
  opacity: 0;
  transform: translateY(-5px) scale(0.8);
  transition: opacity 220ms ease, transform 220ms ease;
}
.certificate-card:hover .certificate-card__corner,
.certificate-card:focus-visible .certificate-card__corner { opacity: 1; transform: translateY(0) scale(1); }
.certificate-card__corner svg { width: 14px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.7; }
.certificate-card__art {
  position: relative;
  display: grid;
  height: 190px;
  flex: 0 0 190px;
  place-items: center;
  overflow: hidden;
  background: radial-gradient(circle at 50% 50%, rgba(118, 224, 208, 0.12), rgba(118, 224, 208, 0.025) 55%, #101010 100%);
}
.certificate-card__art::after {
  position: absolute;
  inset: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  content: '';
}
.certificate-card__art img { width: 82%; height: 155px; object-fit: contain; filter: drop-shadow(0 12px 18px rgba(0, 0, 0, 0.38)); transition: transform 220ms ease; }
.certificate-card:hover .certificate-card__art img,
.certificate-card:focus-visible .certificate-card__art img { transform: scale(1.035); }
.certificate-card__scan { position: absolute; inset: 0; background: linear-gradient(105deg, transparent 30%, rgba(118, 224, 208, 0.18), transparent 70%); opacity: 0; transform: translateX(-110%); }
.certificate-card:hover .certificate-card__scan,
.certificate-card:focus-visible .certificate-card__scan { opacity: 1; animation: card-sweep 700ms ease-out; }
.certificate-card__body { display: flex; flex: 1; flex-direction: column; padding: 18px 18px 16px; }
.certificate-card__meta { margin-bottom: 8px; color: #76e0d0; font-size: 10px; letter-spacing: 0.04em; text-transform: uppercase; }
.certificate-card__body strong { min-height: 42px; font-size: 16px; line-height: 1.3; }
.certificate-card__issuer { margin-top: 6px; color: #aaa5ad; font-size: 11px; }
.certificate-card__action { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 16px; color: #9bded5; font-size: 11px; opacity: 0.72; transition: color 180ms ease, opacity 180ms ease; }
.certificate-card:hover .certificate-card__action,
.certificate-card:focus-visible .certificate-card__action { color: #76e0d0; opacity: 1; }
@keyframes card-sweep { to { transform: translateX(110%); } }
@media (max-width: 600px) { .certificate-card { min-height: 365px; } .certificate-card__art { height: 170px; flex-basis: 170px; } .certificate-card__art img { height: 140px; } }
@media (prefers-reduced-motion: reduce) {
  .certificate-card, .certificate-card__corner, .certificate-card__art img, .certificate-card__action { transition: none; }
  .certificate-card:hover, .certificate-card:focus-visible { transform: none; }
  .certificate-card:hover .certificate-card__scan, .certificate-card:focus-visible .certificate-card__scan { animation: none; opacity: 0; }
}
</style>
