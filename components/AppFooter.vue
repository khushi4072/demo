<script setup lang="ts">
import { contact, footer } from '~/data/site'

const year = new Date().getFullYear()
</script>

<template>
  <!-- Layout follows dvayu.co.in footer -->
  <footer class="footer">
    <div class="container cols">
      <div class="brand">
        <BrandLogo dark />
        <p>{{ footer.tagline }}</p>
        <div v-if="contact.socials.length" class="social">
          <a v-for="s in contact.socials" :key="s.name" :href="s.href" target="_blank" rel="noopener" :aria-label="s.name"><SocialIcon :name="s.icon" /></a>
        </div>
      </div>

      <div class="links">
        <h4>Quick Links</h4>
        <a v-for="l in footer.quickLinks" :key="l.label" :href="l.href">{{ l.label }}</a>
      </div>

      <div class="links">
        <h4>Find Us</h4>
        <a v-for="l in footer.findUs" :key="l.label" :href="l.href">{{ l.label }}</a>
      </div>

      <div class="contact">
        <div class="row"><span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg></span><span>{{ contact.address }}</span></div>
        <div class="row"><span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg></span><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></div>
        <div class="row"><span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5 9 3l2 4.7-1.6 1.6a15 15 0 0 0 5.3 5.3l1.6-1.6 4.7 2-.5 2.4a2 2 0 0 1-2 1.6A16.5 16.5 0 0 1 5 5.5a2 2 0 0 1 1.6-2Z" /></svg></span><a :href="`tel:${contact.phoneHref}`">{{ contact.phone }}</a></div>
      </div>
    </div>
    <div class="bottom">
      <div class="container">© {{ year }}, All rights reserved. VD Vanchers</div>
    </div>
  </footer>
</template>

<style scoped>
.footer { background: var(--mint); color: #2c3845; padding-top: 80px; }
.cols { display: grid; grid-template-columns: 1.5fr .75fr .75fr 1.3fr; gap: 48px; padding-bottom: 60px; }
.brand p { margin: 22px 0; max-width: 380px; font-size: 16px; }
.social { display: flex; gap: 8px; }
.social a { width: 42px; height: 42px; border-radius: 50%; border: 1px solid var(--navy-800); color: var(--navy-800); display: grid; place-items: center; transition: .2s; }
.social a:hover { background: var(--navy-800); color: var(--white); }
h4 { font-family: var(--sans); font-size: 20px; font-weight: 600; color: var(--navy-900); margin: 4px 0 18px; }
.links a { display: block; font-size: 14.5px; padding: 8px 0; border-bottom: 1px solid #d6dcd9; transition: color .2s; }
.links a:hover { color: var(--navy-700); }
.row { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; font-size: 16px; }
.ic { width: 42px; height: 42px; flex: none; border-radius: 50%; background: var(--navy-800); color: var(--white); display: grid; place-items: center; }
.ic svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.row a:hover { color: var(--navy-700); }
.bottom { background: var(--mint-2); padding: 22px 0; font-size: 14px; }
@media (max-width: 1000px) { .cols { grid-template-columns: 1fr 1fr; } }
@media (max-width: 560px) {
  .footer { padding-top: 40px; }
  .cols { grid-template-columns: 1fr; gap: 28px; padding-bottom: 36px; }
  .brand p { margin: 16px 0; font-size: 14.5px; }
  h4 { margin-bottom: 12px; font-size: 18px; }
  .bottom { padding: 18px 0; font-size: 12.5px; }
}
</style>
