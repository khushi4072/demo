<script setup lang="ts">
import { achievers } from '~/data/achievers'
</script>

<template>
  <section class="achievers-preview">
    <div class="container">
      <div class="preview-head">
        <div>
          <span class="eyebrow"><i /> Our Achievers</span>
          <h2>Moments that mark<br /><em>the journey.</em></h2>
        </div>
        <NuxtLink to="/achievers" class="view-all">View all photographs <span aria-hidden="true">↗</span></NuxtLink>
      </div>
      <div class="preview-grid">
        <NuxtLink v-for="photo in achievers.slice(0, 4)" :key="photo.id" to="/achievers" class="preview-photo">
          <img :src="photo.src" :alt="photo.alt" loading="lazy" />
          <span class="photo-number">{{ photo.number }}</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.achievers-preview { padding: clamp(72px, 9vw, 120px) 0; background: var(--mint); color: var(--navy-900); }
.preview-head { display: flex; justify-content: space-between; align-items: end; gap: 30px; margin-bottom: 38px; }
.eyebrow { display: inline-flex; align-items: center; gap: 10px; color: var(--navy-700); font-size: 11px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; }
.eyebrow i { width: 28px; height: 1px; background: var(--gold); }
h2 { margin-top: 16px; font: 400 clamp(36px, 5vw, 62px)/1.05 var(--serif); letter-spacing: -.025em; }
h2 em { color: var(--navy-700); font-weight: 400; }
.view-all { display: inline-flex; gap: 18px; align-items: center; padding-bottom: 8px; border-bottom: 1px solid var(--navy-700); color: var(--navy-900); font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; white-space: nowrap; }
.view-all span { color: var(--navy-700); font-size: 16px; }
.preview-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
.preview-photo { position: relative; display: block; overflow: hidden; aspect-ratio: 4 / 5; background: #e0ddd5; }
.preview-photo img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s ease; }
.preview-photo:hover img { transform: scale(1.045); }
.photo-number { position: absolute; left: 14px; bottom: 12px; color: #fff; font-size: 10px; letter-spacing: .14em; text-shadow: 0 1px 5px #000; }
@media (max-width: 700px) {
  .achievers-preview { padding: 56px 0; }
  .preview-head { align-items: flex-start; flex-direction: column; }
  .preview-head { gap: 18px; margin-bottom: 24px; }
  h2 { margin-top: 12px; font-size: clamp(36px, 9.5vw, 42px); line-height: 1.1; }
  .preview-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
}
@media (max-width: 380px) { .preview-grid { gap: 8px; } }
@media (prefers-reduced-motion: reduce) { .preview-photo img { transition: none; } }
</style>
