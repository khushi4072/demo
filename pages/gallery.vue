<script setup lang="ts">
useHead({
  title: 'Gallery | VD Vanchers',
  meta: [{ name: 'description', content: 'Moments from the VD Vanchers family: awards, events, celebrations and team trips.' }],
})

type Shot = { src: string; w: number; h: number; cat: string; caption: string; alt: string }

const BASE = '/images/gallery'
const shots: Shot[] = [
  { src: '01', w: 1280, h: 853, cat: 'Awards', caption: 'Award presentation at a team event', alt: 'Two colleagues holding a star-shaped award trophy' },
  { src: '10', w: 1200, h: 1600, cat: 'Celebrations', caption: 'Birthday celebration at the office', alt: 'Team members smiling around a colleague covered in cake' },
  { src: '15', w: 960, h: 1280, cat: 'Events', caption: 'Team outside the office entrance', alt: 'Six colleagues posing in front of an office door' },
  { src: '03', w: 1280, h: 847, cat: 'Trips', caption: 'Team trip in the mountains', alt: 'Team jumping with raised hands on a hill meadow' },
  { src: '29', w: 960, h: 1280, cat: 'Awards', caption: 'Golden Bravo award for highest selling', alt: 'Three colleagues holding a framed Golden Bravo certificate' },
  { src: '14', w: 1200, h: 1600, cat: 'Celebrations', caption: 'Team photo after the celebration', alt: 'Office team posing together after a birthday celebration' },
  { src: '17', w: 960, h: 1280, cat: 'Events', caption: 'Ribbon-cutting ceremony', alt: 'A man cutting a red ribbon at an office doorway with colleagues behind' },
  { src: '05', w: 576, h: 1280, cat: 'Trips', caption: 'Boating day by the water', alt: 'Four colleagues in life jackets on a floating dock' },
  { src: '19', w: 1200, h: 1600, cat: 'Awards', caption: 'Monthly sales champion award', alt: 'A framed certificate being presented at an award ceremony' },
  { src: '13', w: 1600, h: 1200, cat: 'Celebrations', caption: 'Cake time at the office', alt: 'Team standing with a birthday cake and party decorations' },
  { src: '27', w: 1280, h: 853, cat: 'Events', caption: 'Evening event with guests', alt: 'Group of men in formal wear posing at an evening venue' },
  { src: '06', w: 1280, h: 960, cat: 'Trips', caption: 'Travel day with the team', alt: 'Group selfie of team members in winter wear' },
  { src: '25', w: 1333, h: 1600, cat: 'Celebrations', caption: 'Sharing cake with colleagues', alt: 'A colleague being fed cake in an office decorated with flags and balloons' },
  { src: '11', w: 933, h: 1555, cat: 'Celebrations', caption: 'The whole office joins in', alt: 'Large group of colleagues posing in the office' },
  { src: '16', w: 960, h: 1280, cat: 'Events', caption: 'A warm welcome', alt: 'Colleagues welcoming a guest with orange scarves' },
  { src: '22', w: 1200, h: 1600, cat: 'Awards', caption: 'Monthly excellence in sales award', alt: 'A framed award being presented in front of the team' },
  { src: '07', w: 960, h: 1280, cat: 'Trips', caption: 'Late-night highway stop', alt: 'Three friends posing in front of a car on a night highway' },
  { src: '30', w: 1280, h: 960, cat: 'Awards', caption: 'Team celebrates award certificates', alt: 'Large office team cheering with two framed certificates' },
  { src: '12', w: 1156, h: 520, cat: 'Celebrations', caption: 'Cheers and applause', alt: 'Colleagues clapping as a teammate cuts a cake' },
  { src: '28', w: 1280, h: 853, cat: 'Awards', caption: 'Trophy presentation', alt: 'Two colleagues holding a gold and blue trophy' },
  { src: '09', w: 1280, h: 960, cat: 'Trips', caption: 'Team selfie before the trip', alt: 'Five colleagues taking a selfie in a hotel lobby' },
  { src: '26', w: 1333, h: 1600, cat: 'Celebrations', caption: 'Cheers at the cake cutting', alt: 'A colleague cutting a small cake while teammates applaud' },
  { src: '18', w: 1200, h: 1600, cat: 'Events', caption: 'Group photo in the office', alt: 'Seven people posing together in a wood-panelled office' },
  { src: '23', w: 1200, h: 1600, cat: 'Awards', caption: 'Award for outstanding sales performance', alt: 'Three colleagues holding a framed award certificate' },
  { src: '02', w: 1200, h: 1600, cat: 'Trips', caption: 'A drive through the hills', alt: 'Man in a blue jacket standing in front of an SUV on a hill road' },
  { src: '31', w: 1600, h: 1200, cat: 'Celebrations', caption: 'Smiles after the celebration', alt: 'Office team with cake on their faces posing together' },
  { src: '20', w: 960, h: 1280, cat: 'Events', caption: 'Welcome with a bouquet', alt: 'A man receiving a bouquet of flowers in an office' },
  { src: '32', w: 960, h: 1280, cat: 'Awards', caption: 'Certificate presentation', alt: 'Four colleagues presenting a framed certificate' },
  { src: '08', w: 960, h: 1280, cat: 'Trips', caption: 'Road trip pose', alt: 'Three friends leaning on a car at night' },
  { src: '21', w: 1200, h: 1600, cat: 'Awards', caption: 'Presenting the monthly sales award', alt: 'A framed certificate handed over during an award ceremony' },
  { src: '04', w: 960, h: 1280, cat: 'Trips', caption: 'Colleagues at the hotel lobby', alt: 'Two colleagues taking a selfie in a hotel lobby' },
  { src: '33', w: 960, h: 1280, cat: 'Awards', caption: 'Certificate of sales excellence', alt: 'A colleague receiving a framed certificate with the team applauding' },
  { src: '24', w: 1200, h: 1600, cat: 'Awards', caption: 'Monthly excellence in sales', alt: 'A colleague holding a gold-framed award with the director' },
]

const cats = ['All', 'Awards', 'Events', 'Celebrations', 'Trips']
const current = ref('All')
const list = computed(() => current.value === 'All' ? shots : shots.filter((shot) => shot.cat === current.value))
const countFor = (category: string) => category === 'All' ? shots.length : shots.filter((shot) => shot.cat === category).length
const url = (shot: Shot) => `${BASE}/gallery-${shot.src}.jpg`

const active = ref<number | null>(null)
const closeBtn = ref<HTMLButtonElement | null>(null)
const open = (index: number) => { active.value = index }
const close = () => { active.value = null }
const move = (direction: number) => {
  if (active.value === null || !list.value.length) return
  active.value = (active.value + direction + list.value.length) % list.value.length
}
const onKey = (event: KeyboardEvent) => {
  if (active.value === null) return
  if (event.key === 'Escape') close()
  if (event.key === 'ArrowRight') move(1)
  if (event.key === 'ArrowLeft') move(-1)
}
let startX = 0
const onTouchStart = (event: TouchEvent) => { startX = event.touches[0]?.clientX ?? 0 }
const onTouchEnd = (event: TouchEvent) => {
  const delta = (event.changedTouches[0]?.clientX ?? startX) - startX
  if (Math.abs(delta) > 50) move(delta < 0 ? 1 : -1)
}

watch(active, async (value) => {
  document.body.style.overflow = value === null ? '' : 'hidden'
  if (value !== null) { await nextTick(); closeBtn.value?.focus() }
})
watch(current, close)
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <main class="gallery-page">
    <section class="g-hero">
      <div class="container g-hero-inner">
        <nav class="crumbs" aria-label="Breadcrumb"><NuxtLink to="/">Home</NuxtLink><span>/</span><span class="current">Gallery</span></nav>
        <div class="g-hero-grid">
          <h1>Life at<br />VD Vanchers</h1>
          <p>Awards, events, celebrations and team trips. A look at the people and the moments behind the work.</p>
        </div>
      </div>
    </section>

    <section class="g-wall">
      <div class="container">
        <div class="filters" role="tablist" aria-label="Filter photos">
          <button v-for="category in cats" :key="category" type="button" role="tab" class="chip" :class="{ on: current === category }" :aria-selected="current === category" @click="current = category">
            {{ category }} <small>{{ countFor(category) }}</small>
          </button>
        </div>

        <div class="masonry">
          <button v-for="(shot, index) in list" :key="shot.src" type="button" class="tile" :aria-label="`Open photo: ${shot.caption}`" @click="open(index)">
            <img :src="url(shot)" :alt="shot.alt" :width="shot.w" :height="shot.h" :loading="index < 4 ? 'eager' : 'lazy'" decoding="async" />
            <span class="cap">{{ shot.caption }}</span>
          </button>
        </div>
      </div>
    </section>

    <section class="g-cta">
      <div class="container g-cta-inner">
        <h2>Want to be part of the family?</h2>
        <NuxtLink to="/contact" class="g-btn">Talk to our team</NuxtLink>
      </div>
    </section>

    <div v-if="active !== null && list[active]" class="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" @click.self="close" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd">
      <button ref="closeBtn" class="lb-close" type="button" aria-label="Close" @click="close">&times;</button>
      <button class="lb-nav prev" type="button" aria-label="Previous photo" @click="move(-1)">&lsaquo;</button>
      <figure :key="list[active].src">
        <img :src="url(list[active])" :alt="list[active].alt" />
        <figcaption><span>{{ list[active].caption }}</span><small>{{ active + 1 }} / {{ list.length }}</small></figcaption>
      </figure>
      <button class="lb-nav next" type="button" aria-label="Next photo" @click="move(1)">&rsaquo;</button>
    </div>
  </main>
</template>

<style scoped>
.gallery-page { --cream: #f5f2eb; --deep: #101d2e; --gold: #c5a36a; --line: #dcd8cf; background: var(--cream); color: var(--deep); overflow-x: clip; }
.g-hero { padding: clamp(40px, 6vw, 80px) 0 clamp(44px, 6vw, 84px); background: var(--deep); color: #fff; }
.crumbs { display: flex; gap: 8px; color: rgba(255,255,255,.65); font-size: 13px; }
.crumbs a { color: inherit; }
.crumbs a:hover, .crumbs .current { color: #fff; }
.g-hero-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: clamp(24px, 6vw, 72px); align-items: end; margin-top: clamp(32px, 6vw, 72px); }
.g-hero h1 { font: 400 clamp(46px, 8vw, 112px)/.95 var(--serif); letter-spacing: -.035em; }
.g-hero p { max-width: 42ch; padding-bottom: 8px; color: rgba(255,255,255,.74); font-size: 17px; line-height: 1.75; }
.g-wall { padding: clamp(36px, 5vw, 64px) 0 clamp(60px, 8vw, 110px); }
.filters { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: clamp(24px, 4vw, 40px); }
.chip { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 20px; border: 1px solid var(--line); border-radius: 999px; background: transparent; color: var(--deep); font: 600 14px var(--sans); cursor: pointer; transition: background .2s, color .2s, border-color .2s; }
.chip small { font-size: 12px; font-weight: 500; opacity: .6; }
.chip:hover { border-color: var(--deep); }
.chip.on { border-color: var(--deep); background: var(--deep); color: #fff; }
.chip.on small { opacity: .75; }
.masonry { columns: 4; column-gap: 18px; }
.tile { position: relative; display: block; width: 100%; margin: 0 0 18px; padding: 0; border: 0; overflow: hidden; background: #e6e1d6; cursor: zoom-in; break-inside: avoid; }
.tile img { display: block; width: 100%; height: auto; transition: transform .6s ease; }
.tile:hover img { transform: scale(1.04); }
.cap { position: absolute; right: 0; bottom: 0; left: 0; padding: 38px 16px 14px; background: linear-gradient(0deg, rgba(10,18,29,.82), transparent); color: #fff; font-size: 13.5px; line-height: 1.4; text-align: left; opacity: 0; transform: translateY(6px); transition: opacity .3s, transform .3s; }
.tile:hover .cap, .tile:focus-visible .cap { opacity: 1; transform: none; }
.g-cta { padding: clamp(56px, 8vw, 88px) 0; background: var(--deep); color: #fff; }
.g-cta-inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 28px; }
.g-cta h2 { max-width: 20ch; font: 400 clamp(30px, 4vw, 52px)/1.1 var(--serif); }
.g-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 54px; padding: 0 34px; background: var(--gold); color: #fff; font: 700 13px var(--sans); letter-spacing: .06em; text-transform: uppercase; transition: filter .2s; }
.g-btn:hover { filter: brightness(1.08); }
a:focus-visible, button:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }
.lightbox { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 56px 16px 24px; background: rgba(10,14,20,.96); animation: fade .2s ease; }
.lightbox figure { display: grid; gap: 14px; justify-items: center; margin: 0; max-width: min(1000px, 90vw); animation: pop .3s ease; }
.lightbox img { display: block; max-width: 100%; max-height: calc(100dvh - 150px); width: auto; height: auto; object-fit: contain; }
.lightbox figcaption { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 16px; color: rgba(255,255,255,.82); font-size: 15px; text-align: center; }
.lightbox figcaption small { color: var(--gold); font-size: 13px; }
.lb-close, .lb-nav { position: absolute; border: 0; background: none; color: #fff; cursor: pointer; line-height: 1; }
.lb-close { top: 10px; right: 18px; padding: 6px 12px; font-size: 44px; }
.lb-nav { top: 50%; transform: translateY(-50%); padding: 10px 16px; font-size: 60px; opacity: .85; }
.lb-nav:hover, .lb-close:hover { color: var(--gold); opacity: 1; }
.lb-nav.prev { left: 6px; }
.lb-nav.next { right: 6px; }
@keyframes fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes pop { from { opacity: 0; transform: scale(.97); } to { opacity: 1; transform: none; } }
@media (max-width: 1100px) { .masonry { columns: 3; column-gap: 16px; } .tile { margin-bottom: 16px; } }
@media (max-width: 800px) { .g-hero-grid { grid-template-columns: 1fr; gap: 18px; } .g-hero p { padding-bottom: 0; font-size: 16px; } .lb-nav { font-size: 48px; padding: 8px 10px; } }
@media (max-width: 640px) {
  .masonry { columns: 2; column-gap: 10px; }
  .tile { margin-bottom: 10px; }
  .cap { opacity: 1; transform: none; padding: 28px 10px 10px; font-size: 12px; }
  .filters { flex-wrap: nowrap; overflow-x: auto; margin-inline: -16px; padding: 0 16px 6px; scrollbar-width: none; }
  .filters::-webkit-scrollbar { display: none; }
  .chip { flex: none; padding: 0 16px; }
  .g-btn { width: 100%; }
  .lightbox { padding: 52px 8px 16px; }
  .lb-nav.prev { left: 0; }
  .lb-nav.next { right: 0; }
}
@media (max-width: 380px) { .masonry { column-gap: 8px; } .tile { margin-bottom: 8px; } }
@media (prefers-reduced-motion: reduce) { .tile img, .cap, .chip { transition: none; } .lightbox, .lightbox figure { animation: none; } }
</style>
