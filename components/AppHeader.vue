<script setup lang="ts">
import { navLinks, moreNavLinks, contact } from '~/data/site'

const route = useRoute()
const open = ref(false)
const moreOpen = ref(false)
const scrolled = ref(false)

const onScroll = () => { scrolled.value = window.scrollY > 40 }
const close = () => { open.value = false; moreOpen.value = false }
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
        <div class="nav-more" :class="{ expanded: moreOpen, active: moreNavLinks.some((l) => route.path === l.href) }">
          <button
            class="nav-link more-toggle"
            type="button"
            aria-controls="more-nav-links"
            :aria-expanded="moreOpen"
            @click="moreOpen = !moreOpen"
          >
            <span>More</span><i aria-hidden="true">⌄</i>
          </button>
          <div id="more-nav-links" class="more-links">
            <NuxtLink v-for="l in moreNavLinks" :key="l.href" :to="l.href" class="nav-link more-link" @click="close">
              <span>{{ l.label }}</span><i aria-hidden="true">›</i>
            </NuxtLink>
          </div>
        </div>
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

      <a :href="`tel:${contact.phoneHref}`" class="mini-call" aria-label="Call now">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5 9 3l2 4.7-1.6 1.6a15 15 0 0 0 5.3 5.3l1.6-1.6 4.7 2-.5 2.4a2 2 0 0 1-2 1.6A16.5 16.5 0 0 1 5 5.5a2 2 0 0 1 1.6-2Z" /></svg>
      </a>
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
.nav-more { position: relative; }
.more-toggle { border: 0; background: none; cursor: pointer; font-family: inherit; }
.more-toggle i { display: inline-block; margin-left: 6px; font-size: 13px; font-style: normal; transition: transform .2s; }
.nav-more.expanded .more-toggle i { transform: rotate(180deg); }
.more-links {
  position: absolute; top: calc(100% + 14px); right: 0; z-index: 4; display: grid; min-width: 190px;
  padding: 8px; background: #fff; border: 1px solid var(--line); border-radius: 10px;
  box-shadow: 0 16px 34px -18px rgba(15,28,46,.35); opacity: 0; visibility: hidden;
  transform: translateY(6px); transition: opacity .2s, transform .2s, visibility .2s;
}
.nav-more:hover .more-links, .nav-more:focus-within .more-links, .nav-more.expanded .more-links { opacity: 1; visibility: visible; transform: none; }
.more-link { display: flex; padding: 11px 12px; border-radius: 6px; font-size: 12px; letter-spacing: .06em; }
.more-link:hover { background: var(--mint); }
.more-link i { display: none; }
.nav-more.active > .more-toggle { color: var(--navy-700); }
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

  .mini-call { display: grid; place-items: center; width: 48px; height: 48px; margin-left: auto; border-radius: 50%; background: var(--navy-800); color: var(--white); flex: none; }
  .mini-call svg { width: 23px; height: 23px; fill: currentColor; }
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
  .nav-more { width: 100%; }
  .more-toggle { width: 100%; text-align: left; }
  .more-toggle i { font-size: 22px; }
  .more-links { position: static; display: none; min-width: 0; padding: 0 0 4px 14px; border: 0; border-radius: 0; box-shadow: none; opacity: 1; visibility: visible; transform: none; }
  .nav-more.expanded .more-links { display: grid; }
  .more-link { padding: 13px 2px; font-size: 14px; }
  .more-link i { display: block; }
  .nav-more.active > .more-toggle { color: var(--navy-700); }
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
  .bar, .scrolled .bar { height: 68px; gap: 10px; }
  .nav { max-height: calc(100dvh - 68px); }
  .mini-call { width: 48px; height: 48px; }
}

@media (prefers-reduced-motion: reduce) {
  .nav, .scrim, .topbar, .bar, .burger span { transition: none; }
}
</style>