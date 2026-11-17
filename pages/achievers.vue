<script setup lang="ts">
import achievers from '~/data/achievers.json'

useHead({
  title: 'Our Achievers | VD Vanchers',
  meta: [{ name: 'description', content: 'Meet the top performers and achievers of the VD Vanchers family.' }],
})

const BASE = 'https://static.wixstatic.com/media'

/* Photo na khule to: 1) resized link  2) original link  3) tile hide */
const stage = reactive<Record<string, number>>({})
const srcFor = (file: string, w: number) =>
  stage[file] ? `${BASE}/${file}` : `${BASE}/${file}/v1/fit/w_${w},h_${w},q_80/${file}`
const onError = (file: string) => { stage[file] = (stage[file] || 0) + 1 }

const photos = computed(() => achievers.filter((a) => (stage[a.file] || 0) < 2))

/* Banner ke peeche sliding photos (loop ke liye 2 baar) */
const bannerPhotos = computed(() => {
  const list = photos.value.slice(0, 8)
  return [...list, ...list]
})

const active = ref<number | null>(null)
const close = () => (active.value = null)
const move = (d: number) => {
  if (active.value === null) return
  active.value = (active.value + d + photos.value.length) % photos.value.length
}
const onKey = (e: KeyboardEvent) => {
  if (active.value === null) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') move(1)
  if (e.key === 'ArrowLeft') move(-1)
}
const scrollToWall = () => document.getElementById('wall')?.scrollIntoView({ behavior: 'smooth' })

const root = ref<HTMLElement | null>(null)
const ready = ref(false)
let io: IntersectionObserver | undefined

onMounted(() => {
  window.addEventListener('keydown', onKey)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || !('IntersectionObserver' in window)) return
  ready.value = true
  io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io?.unobserve(e.target) }
    }),
    { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
  )
  root.value?.querySelectorAll('.frame, .reveal').forEach((el, i) => {
    const col = (el as HTMLElement).classList.contains('frame') ? i % 4 : 0
    ;(el as HTMLElement).style.setProperty('--d', `${col * 90}ms`)
    io?.observe(el)
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  io?.disconnect()
})
</script>

<template>
  <main ref="root" class="achievers" :class="{ ready }">
    <!-- ============ BIG BANNER ============ -->
    <section class="hero">
      <div class="hero-bg" aria-hidden="true">
        <div class="track">
          <img
            v-for="(a, i) in bannerPhotos"
            :key="`${a.file}-${i}`"
            :src="srcFor(a.file, 500)"
            alt=""
            referrerpolicy="no-referrer"
            @error="onError(a.file)"
          />
        </div>
      </div>
      <div class="hero-shade" aria-hidden="true"></div>

      <div class="container hero-content">
        <nav class="crumbs" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span><span class="current">Our Achievers</span>
        </nav>

        <div class="hero-main">
          <p class="eyebrow">VD Vanchers Family</p>
          <h1>Our <em>achievers</em></h1>
          <p class="lead">
            The people behind every registry, mutation and possession. Moments from the VD Vanchers
            family that celebrate effort, trust and growth.
          </p>
          <ul class="chips">
            <li>Registry</li>
            <li>Mutation</li>
            <li>Possession</li>
          </ul>
        </div>

        <div class="hero-foot">
          <div class="rule"><span>{{ String(photos.length).padStart(2, '0') }} photographs</span></div>
          <button type="button" class="scroll" @click="scrollToWall">
            <span>Scroll</span><i aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </section>

    <section id="wall" class="wall">
      <div class="container">
        <div class="grid">
          <button
            v-for="(a, i) in photos"
            :key="a.file"
            type="button"
            class="frame"
            :aria-label="`Open photograph ${i + 1}`"
            @click="active = i"
          >
            <img
              :src="srcFor(a.file, 700)"
              :alt="a.name || `VD Vanchers achiever ${i + 1}`"
              :loading="i < 4 ? 'eager' : 'lazy'"
              referrerpolicy="no-referrer"
              @error="onError(a.file)"
            />
            <span class="no">{{ String(i + 1).padStart(2, '0') }}</span>
          </button>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="container cta-inner reveal">
        <h2>Build your career with VD Vanchers.</h2>
        <NuxtLink to="/contact" class="btn">Talk to our team</NuxtLink>
      </div>
    </section>

    <div v-if="active !== null && photos[active]" class="lightbox" role="dialog" aria-modal="true" @click.self="close">
      <button class="lb-close" aria-label="Close" @click="close">&times;</button>
      <button class="lb-nav prev" aria-label="Previous" @click="move(-1)">&lsaquo;</button>
      <figure :key="active">
        <img :src="srcFor(photos[active].file, 1400)" :alt="photos[active].name || 'VD Vanchers achiever'" referrerpolicy="no-referrer" @error="onError(photos[active].file)" />
        <figcaption>{{ active + 1 }} / {{ photos.length }}</figcaption>
      </figure>
      <button class="lb-nav next" aria-label="Next" @click="move(1)">&rsaquo;</button>
    </div>
  </main>
</template>

<style scoped>
.achievers { --ivory: #f5f2ec; --ink: #1d1b18; --stone: #6f6a62; --hair: #ddd6c8; background: var(--ivory); color: var(--ink); }

/* ---------- BIG BANNER ---------- */
.hero { position: relative; display: flex; min-height: min(74vh, 620px); overflow: hidden; background: var(--ink); color: #fff; }
.hero-bg { position: absolute; inset: 0; }
.track { display: flex; width: max-content; height: 100%; animation: drift 60s linear infinite; }
.track img { flex: none; width: clamp(200px, 22vw, 340px); height: 100%; object-fit: cover; filter: grayscale(.35) contrast(1.05); opacity: .55; }
.hero-shade {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 20% 60%, rgba(29,27,24,.92) 0%, rgba(29,27,24,.55) 55%, rgba(29,27,24,.35) 100%),
    linear-gradient(to bottom, rgba(29,27,24,.7) 0%, rgba(29,27,24,0) 30%, rgba(29,27,24,.95) 100%);
}
.hero-content { position: relative; z-index: 1; display: flex; flex-direction: column; justify-content: space-between; width: 100%; padding-top: 120px; padding-bottom: 32px; padding-left: clamp(24px, 6vw, 96px); padding-right: clamp(24px, 6vw, 96px); }
.crumbs { display: flex; gap: 8px; font-size: 13px; color: rgba(255,255,255,.65); }
.crumbs a { color: inherit; text-decoration: none; }
.crumbs a:hover, .crumbs .current { color: #fff; }

.hero-main { max-width: 900px; padding: 32px 0; }
.eyebrow { display: inline-flex; align-items: center; gap: 14px; margin-bottom: 22px; font-size: 13px; font-weight: 600; letter-spacing: .24em; text-transform: uppercase; color: var(--gold-light); }
.eyebrow::before { content: ''; width: 44px; height: 1px; background: var(--gold); }
.hero h1 { font: 400 clamp(56px, 9vw, 120px) / .92 var(--serif); letter-spacing: -.035em; }
.hero h1 em { display: block; font-style: italic; color: var(--gold-light); }
.lead { max-width: 50ch; margin-top: 22px; font-size: 18px; line-height: 1.8; color: rgba(255,255,255,.78); }
.chips { display: flex; flex-wrap: wrap; gap: 10px; margin: 22px 0 0; padding: 0; list-style: none; }
.chips li { padding: 9px 20px; border: 1px solid rgba(255,255,255,.28); border-radius: 999px; font-size: 13px; letter-spacing: .06em; background: rgba(255,255,255,.06); backdrop-filter: blur(6px); }

.hero-foot { display: flex; align-items: center; gap: 32px; }
.rule { flex: 1; display: flex; align-items: center; gap: 20px; font-size: 13px; letter-spacing: .08em; color: var(--gold-light); }
.rule::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,.25); }
.scroll { display: inline-flex; align-items: center; gap: 12px; padding: 0; border: 0; background: none; color: rgba(255,255,255,.8); font: 600 12px var(--sans); letter-spacing: .2em; text-transform: uppercase; cursor: pointer; }
.scroll:hover { color: #fff; }
.scroll i { position: relative; width: 1px; height: 44px; background: rgba(255,255,255,.3); overflow: hidden; }
.scroll i::after { content: ''; position: absolute; left: 0; top: 0; width: 1px; height: 18px; background: var(--gold); animation: drop 1.8s ease-in-out infinite; }

/* ---------- WALL ---------- */
.wall { padding: 90px 0 110px; }
.grid { columns: 4; column-gap: 28px; }
.frame {
  position: relative; display: block; width: 100%; margin: 0 0 28px; padding: 10px;
  border: 0; background: #fff; cursor: zoom-in; break-inside: avoid;
  box-shadow: 0 1px 2px rgba(29,27,24,.06), 0 18px 36px -22px rgba(29,27,24,.35);
  transition: transform .35s ease, box-shadow .35s ease;
}
.frame:hover { transform: translateY(-6px); box-shadow: 0 1px 2px rgba(29,27,24,.06), 0 30px 48px -22px rgba(29,27,24,.45); }
.frame img { display: block; width: 100%; height: auto; min-height: 120px; background: var(--hair); }
.no { display: block; padding: 10px 2px 2px; font: italic 15px var(--serif); color: var(--stone); }

.cta { padding: 80px 0; background: var(--ink); color: #fff; }
.cta-inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 28px; }
.cta h2 { max-width: 18ch; font: 400 clamp(32px, 4vw, 54px) / 1.05 var(--serif); letter-spacing: -.01em; }
.btn { display: inline-flex; align-items: center; justify-content: center; min-height: 56px; padding: 0 38px; background: var(--gold); color: #fff; font: 600 14px var(--sans); letter-spacing: .03em; text-decoration: none; transition: filter .2s ease; }
.btn:hover { filter: brightness(1.08); }
a:focus-visible, button:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }

.lightbox { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 24px; background: rgba(14,12,9,.96); }
.lightbox figure { margin: 0; max-width: min(900px, 86vw); }
.lightbox img { display: block; max-width: 100%; max-height: 80vh; margin: 0 auto; }
.lightbox figcaption { margin-top: 14px; text-align: center; font: italic 16px var(--serif); color: rgba(255,255,255,.75); }
.lb-close, .lb-nav { position: absolute; border: 0; background: none; color: #fff; cursor: pointer; line-height: 1; }
.lb-close { top: 18px; right: 26px; font-size: 44px; }
.lb-nav { top: 50%; transform: translateY(-50%); padding: 10px 18px; font-size: 64px; }
.lb-nav.prev { left: 10px; }
.lb-nav.next { right: 10px; }

/* ---------- ANIMATION ---------- */
@keyframes rise { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
@keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes pop { from { opacity: 0; transform: scale(.96) translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes drift { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes drop { 0% { transform: translateY(-20px); } 100% { transform: translateY(46px); } }

.crumbs { animation: rise .7s cubic-bezier(.2,.7,.2,1) backwards; }
.eyebrow { animation: rise .8s cubic-bezier(.2,.7,.2,1) .1s backwards; }
.hero h1 { animation: rise .9s cubic-bezier(.2,.7,.2,1) .2s backwards; }
.lead { animation: rise .9s cubic-bezier(.2,.7,.2,1) .34s backwards; }
.chips { animation: rise .9s cubic-bezier(.2,.7,.2,1) .46s backwards; }
.hero-foot { animation: rise .8s cubic-bezier(.2,.7,.2,1) .6s backwards; }
.rule::after { transform-origin: left; animation: grow 1.4s cubic-bezier(.2,.7,.2,1) .75s backwards; }

.ready .frame, .ready .reveal { opacity: 1; }
.ready .frame.in, .ready .reveal.in { opacity: 1; animation: rise .85s cubic-bezier(.2,.7,.2,1) var(--d, 0s) backwards; }
.frame img { transition: transform .8s ease; }
.frame:hover img { transform: scale(1.03); }
.frame { overflow: hidden; }

.lightbox { animation: fade .25s ease; }
.lightbox figure { animation: pop .4s cubic-bezier(.2,.7,.2,1); }

@media (max-width: 1100px) { .grid { columns: 3; column-gap: 22px; } .frame { margin-bottom: 22px; } }
@media (max-width: 800px) {
  .hero { min-height: 64vh; }
  .hero-content { padding-top: 110px; }
  .hero-main { padding: 28px 0; }
  .lead { font-size: 16px; }
}
@media (max-width: 640px) {
  .hero { min-height: 68vh; }
  .hero-content { padding-top: 88px; padding-bottom: 24px; padding-left: 22px; padding-right: 22px; }
  .crumbs { font-size: 12px; }
  .eyebrow { margin-bottom: 14px; font-size: 11px; letter-spacing: .2em; }
  .eyebrow::before { width: 28px; }
  .hero h1 { font-size: clamp(52px, 17vw, 78px); line-height: .95; }
  .lead { margin-top: 18px; font-size: 15px; line-height: 1.6; }
  .chips { margin-top: 20px; gap: 8px; }
  .chips li { padding: 7px 14px; font-size: 12px; }
  .hero-foot { gap: 16px; }
  .rule { font-size: 12px; gap: 14px; }
  .scroll span { display: none; }
  .track img { width: 150px; }
  .wall { padding: 56px 0 72px; }
  .grid { columns: 2; column-gap: 12px; }
  .frame { margin-bottom: 12px; padding: 6px; }
  .no { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .crumbs, .eyebrow, .hero h1, .lead, .chips, .hero-foot, .rule::after, .lightbox, .lightbox figure, .track, .scroll i::after { animation: none; }
  .frame, .frame img { transition: none; }
  .frame:hover, .frame:hover img { transform: none; }
}
</style>