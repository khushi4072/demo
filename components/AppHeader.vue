<script setup lang="ts">
import { navLinks, contact } from '~/data/site'

const route = useRoute()
const open = ref(false)
const scrolled = ref(false)

const onScroll = () => { scrolled.value = window.scrollY > 40 }
const close = () => { open.value = false }
const toggle = () => { open.value = !open.value }
const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
const onResize = () => { if (window.innerWidth > 1100) close() }

/* Page change hote hi menu band, aur menu khula ho to page scroll lock */
watch(() => route.fullPath, close)
watch(open, (v) => { document.body.style.overflow = v ? 'hidden' : '' })

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
  window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('resize', onResize)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="header" :class="{ scrolled, open }">
    <!-- Top strip: sirf desktop par -->
    <div class="topbar">
      <div class="container tb">
        <div class="tb-info">
          <a :href="`mailto:${contact.email}`" class="tb-mail"><span class="ic">✉</span><span class="txt">{{ contact.email }}</span></a>
          <span class="addr"><span class="ic">➤</span><span class="txt">{{ contact.shortAddress }}</span></span>
        </div>
        <div v-if="contact.socials.length" class="tb-social">
          <a v-for="s in contact.socials" :key="s.name" :href="s.href" target="_blank" rel="noopener" :aria-label="s.name">
            <SocialIcon :name="s.icon" />
          </a>
        </div>
        <a v-else :href="`tel:${contact.phoneHref}`" class="tb-phone">{{ contact.phone }}</a>
      </div>
    </div>

    <div class="container bar">
      <BrandLogo dark class="logo" @click="close" />

      <nav id="site-nav" class="nav" aria-label="Main">
        <NuxtLink v-for="l in navLinks" :key="l.href" :to="l.href" class="nav-link" @click="close">
          <span>{{ l.label }}</span><i aria-hidden="true">›</i>
        </NuxtLink>
        <a :href="`tel:${contact.phoneHref}`" class="call" @click="close">Call Now</a>

        <!-- Sirf mobile menu me dikhega (topbar ki info yahin aa jati hai) -->
        <div class="menu-contact">
          <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
          <span>{{ contact.shortAddress }}</span>
          <div v-if="contact.socials.length" class="menu-social">
            <a v-for="s in contact.socials" :key="s.name" :href="s.href" target="_blank" rel="noopener" :aria-label="s.name">
              <SocialIcon :name="s.icon" />
            </a>
          </div>
        </div>
      </nav>

      <a :href="`tel:${contact.phoneHref}`" class="mini-call" aria-label="Call now">✆</a>
      <button class="burger" type="button" :aria-expanded="open" aria-controls="site-nav" aria-label="Toggle menu" @click="toggle">
        <span /><span /><span />
      </button>
    </div>

    <div class="scrim" aria-hidden="true" @click="close" />
  </header>
</template>

<style scoped>
.header { position: sticky; top: 0; z-index: 50; background: #fff; border-bottom: 1px solid var(--line); transition: box-shadow .3s; }
.header.scrolled { box-shadow: 0 6px 20px -12px rgba(15,28,46,.35); }

/* ---------- Topbar (desktop) ---------- */
.topbar { background: var(--mint-2); font-size: 14px; color: #3d4a57; max-height: 48px; overflow: hidden; transition: max-height .3s ease; }
.scrolled .topbar { max-height: 0; }
.tb { height: 48px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.tb-info { display: flex; gap: 26px; align-items: center; min-width: 0; }
.tb-info > * { display: inline-flex; align-items: center; gap: 10px; min-width: 0; }
.txt { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ic { flex: none; width: 28px; height: 28px; border-radius: 50%; background: var(--navy-800); color: var(--white); display: grid; place-items: center; font-size: 12px; }
.tb-social { display: flex; gap: 8px; flex: none; }
.tb-social a { width: 28px; height: 28px; border-radius: 50%; background: var(--navy-800); color: var(--white); display: grid; place-items: center; }
.tb-social a :deep(svg) { width: 14px; height: 14px; }
.tb-phone { flex: none; font-weight: 600; color: var(--navy-800); }

/* ---------- Main bar ---------- */
.bar { display: flex; align-items: center; justify-content: space-between; gap: clamp(14px, 2vw, 28px); height: 100px; transition: height .3s; }
.scrolled .bar { height: 80px; }
/* Logo: saaf white background par, fixed size, koi blend/filter nahi */
.logo { flex: none; display: flex; align-items: center; background: #fff; isolation: isolate; }
.logo :deep(img), .logo :deep(svg) { display: block; width: auto; max-width: none; height: clamp(46px, 5vw, 66px); object-fit: contain; opacity: 1; filter: none; mix-blend-mode: normal; transition: height .3s; }
.scrolled .logo :deep(img), .scrolled .logo :deep(svg) { height: clamp(40px, 4.2vw, 54px); }
.nav { display: flex; align-items: center; justify-content: flex-end; gap: clamp(16px, 2vw, 34px); min-width: 0; }
.nav-link { position: relative; padding: 6px 0; font-size: 13.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; white-space: nowrap; color: var(--navy-900); }
.nav-link i { display: none; }
.nav-link::after { content: ''; position: absolute; left: 0; bottom: 0; height: 2px; width: 0; background: var(--gold); transition: width .25s; }
.nav-link:hover::after, .nav-link.router-link-exact-active::after { width: 100%; }
.call { flex: none; background: var(--navy-800); color: var(--white); padding: 12px 24px; border-radius: 6px; font-size: 13.5px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; white-space: nowrap; transition: .2s; }
.call:hover { background: var(--gold); color: var(--white); }
.menu-contact, .mini-call, .burger, .scrim { display: none; }

/* Laptop: thoda tight, taaki zyada links bhi fit ho jayein */
@media (max-width: 1280px) {
  .nav-link { font-size: 12.5px; letter-spacing: .06em; }
  .call { padding: 11px 18px; font-size: 12.5px; }
}

/* ---------- Tablet + Mobile: slide-down menu ---------- */
@media (max-width: 1100px) {
  .topbar { display: none; }
  .bar, .scrolled .bar { height: 72px; }

  .mini-call { display: grid; place-items: center; width: 42px; height: 42px; margin-left: auto; border-radius: 50%; background: var(--navy-800); color: var(--white); font-size: 18px; }
  .burger { display: block; flex: none; padding: 10px; border: 0; background: none; cursor: pointer; }
  .burger span { display: block; width: 26px; height: 2px; margin: 6px 0; background: var(--navy-900); transition: .3s; }
  .open .burger span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
  .open .burger span:nth-child(2) { opacity: 0; }
  .open .burger span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

  .nav {
    position: absolute; top: 100%; left: 0; right: 0; z-index: 2;
    display: flex; flex-direction: column; align-items: stretch; gap: 0;
    max-height: calc(100dvh - 72px); overflow-y: auto; overscroll-behavior: contain;
    padding: 4px max(20px, 5vw) 28px; background: #fff;
    box-shadow: 0 18px 30px -18px rgba(0,0,0,.4);
    visibility: hidden; opacity: 0; transform: translateY(-10px);
    transition: opacity .25s ease, transform .25s ease, visibility 0s linear .25s;
  }
  .open .nav { visibility: visible; opacity: 1; transform: none; transition-delay: 0s; }

  .nav-link { display: flex; align-items: center; justify-content: space-between; padding: 17px 2px; border-bottom: 1px solid var(--line); font-size: 15px; letter-spacing: .08em; }
  .nav-link::after { display: none; }
  .nav-link i { display: block; font-style: normal; font-size: 22px; line-height: 1; color: var(--gold); }
  .nav-link.router-link-exact-active { color: var(--gold); }
  .call { margin-top: 20px; padding: 16px; text-align: center; font-size: 14px; }

  .menu-contact { display: grid; gap: 8px; margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--line); font-size: 13.5px; color: #3d4a57; overflow-wrap: anywhere; }
  .menu-social { display: flex; gap: 8px; margin-top: 6px; }
  .menu-social a { width: 34px; height: 34px; border-radius: 50%; background: var(--navy-800); color: var(--white); display: grid; place-items: center; }
  .menu-social a :deep(svg) { width: 16px; height: 16px; }

  .scrim { display: block; position: absolute; top: 100%; left: 0; right: 0; z-index: 1; height: 100dvh; background: rgba(15,28,46,.45); opacity: 0; visibility: hidden; transition: opacity .25s, visibility .25s; }
  .open .scrim { opacity: 1; visibility: visible; }
}

/* Chhote phones */
@media (max-width: 480px) {
  .bar, .scrolled .bar { height: 64px; gap: 10px; }
  .nav { max-height: calc(100dvh - 64px); }
  .mini-call { width: 38px; height: 38px; font-size: 16px; }
}

@media (prefers-reduced-motion: reduce) {
  .nav, .scrim, .topbar, .bar, .burger span { transition: none; }
}
</style>