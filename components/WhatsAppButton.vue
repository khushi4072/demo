<script setup lang="ts">
const route = useRoute()
const message = encodeURIComponent('Hello VD Vanchers, I would like to know more about your projects.')
const href = `https://wa.me/919289245099?text=${message}`
</script>

<template>
  <a class="whatsapp" :class="{ 'on-contact': route.path === '/contact' }" :href="href" target="_blank" rel="noopener noreferrer" aria-label="Chat with VD Vanchers on WhatsApp">
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="currentColor" d="M16 .8A15 15 0 0 0 3.1 23.5L1 31l7.7-2A15.1 15.1 0 1 0 16 .8Zm0 27.5c-2.4 0-4.7-.7-6.7-2l-.5-.3-4.6 1.2 1.2-4.5-.3-.5A12.4 12.4 0 1 1 16 28.3Zm6.8-9.3c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.3.4-1 1.2-1.2 1.4-.2.3-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7.4-.6c.1-.2 0-.5 0-.7-.1-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.5 1.5 3.7c.2.3 2.6 4 6.2 5.5.9.4 1.6.7 2.1.8.9.3 1.7.3 2.3.2.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.8-.5Z" />
    </svg>
  </a>
</template>

<style scoped>
.whatsapp {
  position: fixed;
  right: max(22px, env(safe-area-inset-right));
  bottom: max(22px, env(safe-area-inset-bottom));
  z-index: 60;
  display: grid;
  width: 58px;
  height: 58px;
  place-items: center;
  border: 2px solid rgba(255,255,255,.9);
  border-radius: 50%;
  background: #25d366;
  color: #fff;
  box-shadow: 0 8px 26px rgba(0,0,0,.24);
  transition: transform .2s ease, box-shadow .2s ease;
}
.whatsapp:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,.3); }
.whatsapp.on-contact { right: auto; left: max(22px, env(safe-area-inset-left)); }
.whatsapp svg { width: 30px; height: 30px; }
.whatsapp:focus-visible { outline: 3px solid #128c7e; outline-offset: 4px; }
@media (max-width: 600px) {
  .whatsapp { right: max(14px, env(safe-area-inset-right)); bottom: max(72px, calc(env(safe-area-inset-bottom) + 72px)); width: 54px; height: 54px; }
  .whatsapp.on-contact { right: auto; left: max(14px, env(safe-area-inset-left)); }
}
@media (prefers-reduced-motion: reduce) { .whatsapp { transition: none; } }
</style>
