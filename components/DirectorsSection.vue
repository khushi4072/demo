<script setup lang="ts">
import { directors, brand } from '~/data/site'
const root = ref<HTMLElement | null>(null)
useReveal(root)

// tap/click/Enter se details open-close (desktop touch / tablet ke liye)
// mobile (<=640px) par CSS se bio hamesha khuli rehti hai
const openIdx = ref<number | null>(null)
const toggle = (i: number, has: boolean) => {
  if (!has) return
  openIdx.value = openIdx.value === i ? null : i
}
</script>

<template>
  <section id="directors" ref="root" class="directors">
    <img class="watermark" :src="brand.logo" alt="" aria-hidden="true" loading="lazy" />

    <div class="container">
      <header class="head reveal">
        <span class="kick"><i />{{ directors.kicker }}<i /></span>
        <h2>{{ directors.title }} <em>{{ directors.accent }}</em></h2>
        <p>{{ directors.intro }}</p>
      </header>

      <div class="cards">
        <article
          v-for="(d, i) in directors.people"
          :key="d.name"
          class="card reveal"
          :class="{ 'is-open': openIdx === i, 'has-bio': !!d.bio }"
          tabindex="0"
          :aria-expanded="d.bio ? openIdx === i : undefined"
          :style="{ transitionDelay: `${i * 140}ms` }"
          @click="toggle(i, !!d.bio)"
          @keydown.enter.prevent="toggle(i, !!d.bio)"
          @keydown.esc="openIdx = null"
        >
          <div class="portrait">
            <picture v-if="d.photo">
              <source :srcset="d.photo.replace(/\.jpg$/, '.avif')" type="image/avif" />
              <img :src="d.photo" :alt="d.name" loading="lazy" decoding="async" />
            </picture>
            <div v-else class="monogram" aria-hidden="true">
              <span>{{ d.initials }}</span>
            </div>
            <span class="corner tl" /><span class="corner br" />
            <span class="index">{{ String(i + 1).padStart(2, '0') }}</span>
            <span v-if="d.bio" class="tap" aria-hidden="true">Details <b>+</b></span>
          </div>

          <div class="body">
            <span class="role">{{ d.role }}</span>
            <h3>{{ d.name }}</h3>
            <span class="rule" />
            <blockquote>{{ d.quote }}</blockquote>
            <span class="sign">{{ d.name }}</span>
          </div>

          <!-- desktop: glass overlay (hover) | mobile: card ke andar seedhi dikhti hai -->
          <div v-if="d.bio" class="bio" role="region" :aria-label="`${d.name} details`">
            <span class="close" aria-hidden="true">×</span>
            <div class="bio-in">
              <span class="b-role">{{ d.role }}</span>
              <h4>{{ d.name }}</h4>
              <span class="b-rule" />
              <p>{{ d.bio }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.directors {
  position: relative; overflow: hidden; isolation: isolate;
  padding: 130px 0 140px; color: #d9dee6;
  background:
    radial-gradient(900px 500px at 85% -10%, rgba(197, 163, 106, .16), transparent 60%),
    radial-gradient(700px 500px at -10% 110%, rgba(47, 95, 143, .28), transparent 60%),
    linear-gradient(180deg, #0b1625 0%, var(--navy-900) 100%);
}
/* faint architectural grid */
.directors::before {
  content: ''; position: absolute; inset: 0; z-index: -1; opacity: .5;
  background-image:
    linear-gradient(rgba(226, 205, 167, .05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(226, 205, 167, .05) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
}
.watermark {
  position: absolute; right: -120px; bottom: -140px; width: 560px; z-index: -1;
  opacity: .05; filter: grayscale(1) brightness(2.2); pointer-events: none;
}

/* Heading */
.head { max-width: 720px; margin: 0 auto 80px; text-align: center; }
.kick {
  display: inline-flex; align-items: center; gap: 16px;
  font: 600 12px/1 var(--sans); letter-spacing: .38em; text-transform: uppercase; color: var(--gold);
}
.kick i { width: 42px; height: 1px; background: linear-gradient(90deg, transparent, var(--gold)); }
.kick i:last-child { transform: scaleX(-1); }
.head h2 { margin: 26px 0 22px; font-size: clamp(36px, 5vw, 60px); font-weight: 500; color: var(--white); letter-spacing: -.01em; }
.head h2 em {
  font-style: italic; display: block;
  background: linear-gradient(100deg, var(--gold-light) 10%, var(--gold) 50%, #f3e6cc 90%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.head p { font-size: 17px; line-height: 1.8; color: #9fabba; }

/* Cards */
.cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 40px; max-width: 1080px; margin: 0 auto; }
.card {
  position: relative; display: grid; grid-template-columns: 0.9fr 1fr; align-items: stretch;
  border-radius: 4px; overflow: hidden; outline: none;
  background: linear-gradient(160deg, rgba(255,255,255,.06), rgba(255,255,255,.015));
  border: 1px solid rgba(226, 205, 167, .16);
  box-shadow: 0 40px 80px -40px rgba(0, 0, 0, .7);
  backdrop-filter: blur(6px);
  -webkit-tap-highlight-color: transparent;
  transition: opacity .9s ease, transform .9s cubic-bezier(.2,.7,.2,1), border-color .4s, box-shadow .4s;
}
.card.has-bio { cursor: pointer; }
.card:hover, .card.is-open, .card:focus-visible {
  border-color: rgba(197, 163, 106, .55);
  box-shadow: 0 50px 90px -40px rgba(0, 0, 0, .8), 0 0 0 1px rgba(197, 163, 106, .15);
}
.card.is-visible:hover { transform: translateY(-6px); }

/* Portrait / monogram */
.portrait { position: relative; min-height: 360px; overflow: hidden; background: #0a1422; }
.portrait img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 20%; filter: grayscale(.25) contrast(1.05); transition: transform 1.2s ease; }
.card:hover .portrait img { transform: scale(1.05); }
.monogram {
  position: absolute; inset: 0; display: grid; place-items: center;
  background:
    radial-gradient(circle at 50% 40%, rgba(197, 163, 106, .22), transparent 62%),
    repeating-linear-gradient(135deg, rgba(226,205,167,.035) 0 1px, transparent 1px 14px),
    linear-gradient(180deg, #13243a, #0a1422);
}
.monogram span {
  font-family: var(--serif); font-style: italic; font-weight: 500; font-size: 96px; letter-spacing: .02em;
  background: linear-gradient(160deg, #f6ead2 0%, var(--gold) 55%, #8d6d3c 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,.45));
  transition: transform .8s ease;
}
.card:hover .monogram span { transform: scale(1.06); }
/* sheen sweep */
.portrait::after {
  content: ''; position: absolute; inset: -20%; pointer-events: none;
  background: linear-gradient(115deg, transparent 40%, rgba(255,255,255,.12) 50%, transparent 60%);
  transform: translateX(-100%); transition: transform 1.1s ease;
}
.card:hover .portrait::after { transform: translateX(100%); }
.corner { position: absolute; width: 26px; height: 26px; border: 0 solid var(--gold); opacity: .8; }
.corner.tl { top: 18px; left: 18px; border-top-width: 1px; border-left-width: 1px; }
.corner.br { bottom: 18px; right: 18px; border-bottom-width: 1px; border-right-width: 1px; }
.index {
  position: absolute; left: 22px; bottom: 16px;
  font: 500 13px/1 var(--sans); letter-spacing: .3em; color: rgba(226, 205, 167, .7);
}
/* "Details +" pill: sirf touch devices par (tablet) */
.tap {
  display: none; position: absolute; z-index: 2; right: 18px; bottom: 14px;
  align-items: center; gap: 8px; padding: 8px 14px; border-radius: 999px;
  font: 600 11px/1 var(--sans); letter-spacing: .2em; text-transform: uppercase; color: var(--white);
  background: rgba(11, 22, 37, .55); border: 1px solid rgba(226, 205, 167, .45);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
}
.tap b { font-weight: 500; font-size: 15px; line-height: 1; color: var(--gold); }

/* Text */
.body { position: relative; padding: 44px 36px 40px; display: flex; flex-direction: column; justify-content: center; }
.role { font: 600 11px/1.4 var(--sans); letter-spacing: .3em; text-transform: uppercase; color: var(--gold); }
.body h3 { margin: 14px 0 0; font-size: 30px; font-weight: 500; color: var(--white); line-height: 1.15; }
.rule { display: block; width: 48px; height: 1px; margin: 24px 0; background: var(--gold); transition: width .5s ease; }
.card:hover .rule { width: 88px; }
blockquote {
  position: relative; margin: 0; padding-left: 0;
  font-family: var(--serif); font-style: italic; font-size: 18px; line-height: 1.6; color: #c6cfdb;
}
blockquote::before {
  content: '\201C'; display: block; height: 30px; margin-bottom: 4px;
  font-size: 64px; line-height: 1; color: var(--gold); opacity: .55;
}
.sign {
  margin-top: 26px; font-family: var(--serif); font-style: italic; font-size: 15px;
  color: rgba(226, 205, 167, .55); letter-spacing: .04em;
}

/* ===== Glass details overlay (desktop / tablet) ===== */
.bio {
  position: absolute; inset: 0; z-index: 5;
  display: flex; align-items: center; justify-content: center;
  padding: 28px 40px;
  background:
    radial-gradient(500px 300px at 50% 0%, rgba(197, 163, 106, .14), transparent 70%),
    linear-gradient(160deg, rgba(11, 22, 37, .74), rgba(11, 22, 37, .58));
  backdrop-filter: blur(14px) saturate(1.1);
  -webkit-backdrop-filter: blur(14px) saturate(1.1);
  opacity: 0; visibility: hidden; pointer-events: none;
  transition: opacity .35s ease, visibility .35s ease;
}
.bio-in {
  max-width: 440px; max-height: 100%; overflow: auto; text-align: center;
  transform: translateY(14px); transition: transform .5s cubic-bezier(.2,.7,.2,1);
  scrollbar-width: thin; scrollbar-color: rgba(197,163,106,.5) transparent;
}
.b-role { font: 600 11px/1.4 var(--sans); letter-spacing: .3em; text-transform: uppercase; color: var(--gold); }
.bio h4 { margin: 10px 0 0; font-family: var(--serif); font-size: 26px; font-weight: 500; color: var(--white); line-height: 1.2; }
.b-rule { display: block; width: 56px; height: 1px; margin: 18px auto; background: var(--gold); }
.bio p { margin: 0; font-size: 14.5px; line-height: 1.85; color: #e8edf3; }
.close {
  display: none; position: absolute; top: 12px; right: 14px; width: 32px; height: 32px;
  align-items: center; justify-content: center; border-radius: 50%;
  font-size: 22px; line-height: 1; color: var(--gold);
  border: 1px solid rgba(226, 205, 167, .35);
}

/* show: desktop hover / keyboard focus / tap open */
.card.is-open .bio,
.card:focus-visible .bio { opacity: 1; visibility: visible; pointer-events: auto; }
.card.is-open .bio-in,
.card:focus-visible .bio-in { transform: none; }
@media (hover: hover) {
  .card:hover .bio { opacity: 1; visibility: visible; pointer-events: auto; }
  .card:hover .bio-in { transform: none; }
}

@media (max-width: 1024px) {
  .cards { grid-template-columns: 1fr; max-width: 640px; }
}
@media (max-width: 640px) {
  .directors { padding: 80px 0 90px; }
  .head { margin-bottom: 44px; }
  .head h2 { margin: 20px 0 16px; }
  .head p { font-size: 15.5px; line-height: 1.7; }
  .kick { gap: 12px; letter-spacing: .3em; }
  .kick i { width: 28px; }

  .cards { gap: 28px; max-width: 420px; }
  .card { grid-template-columns: minmax(0, 1fr); border-radius: 6px; }

  /* tall portrait so the face is never cropped */
  /* padding-top gives a 4:5 box in every browser (aspect-ratio collapses on older iOS Safari) */
  .portrait { min-height: 0; height: 0; padding-top: 125%; }
  .portrait img { object-position: center 15%; }
  /* blend the photo into the text panel */
  .portrait::before {
    content: ''; position: absolute; inset: auto 0 0 0; height: 45%; z-index: 1; pointer-events: none;
    background: linear-gradient(180deg, transparent, rgba(11, 22, 37, .92));
  }
  .corner, .index { z-index: 2; }
  .corner { width: 22px; height: 22px; }
  .corner.tl { top: 14px; left: 14px; }
  .corner.br { bottom: 14px; right: 14px; }
  .index { left: 18px; bottom: 14px; }
  .monogram span { font-size: 80px; }

  .body { padding: 28px 24px 24px; text-align: center; align-items: center; }
  .body h3 { font-size: 26px; margin-top: 10px; }
  .rule { margin: 18px auto; }
  blockquote { font-size: 17px; line-height: 1.55; }
  blockquote::before { height: 24px; font-size: 54px; }
  .sign { margin-top: 18px; }
  .watermark { width: 320px; right: -100px; bottom: -80px; }
}

/* touch screens: no sticky hover effects, tap hint + close button dikhao */
@media (hover: none) {
  .card.is-visible:hover { transform: none; }
  .card:hover .portrait img, .card:hover .monogram span { transform: none; }
  .card:hover .portrait::after { transform: translateX(-100%); }
  .card:hover .rule { width: 48px; }
  .has-bio .tap { display: inline-flex; }
  .close { display: inline-flex; }
}

/* ===== MOBILE: bio hamesha card ke andar dikhti hai (no tap needed) ===== */
@media (max-width: 640px) {
  .card.has-bio { cursor: default; }
  .has-bio .tap, .close { display: none; }

  .bio,
  .card.is-open .bio,
  .card:hover .bio {
    position: static; inset: auto; z-index: auto;
    display: block; padding: 0 20px 24px;
    background: none; backdrop-filter: none; -webkit-backdrop-filter: none;
    opacity: 1; visibility: visible; pointer-events: auto; transition: none;
  }
  /* upar gold divider line */
  .bio::before {
    content: ''; display: block; height: 1px; margin: 0 4px 20px;
    background: linear-gradient(90deg, transparent, rgba(197, 163, 106, .7), transparent);
  }
  .bio-in,
  .card.is-open .bio-in,
  .card:hover .bio-in {
    position: relative; max-width: none; max-height: none; overflow: visible; transform: none;
    padding: 26px 20px 22px; text-align: left; border-radius: 6px;
    background: linear-gradient(160deg, rgba(255, 255, 255, .06), rgba(255, 255, 255, .02));
    border: 1px solid rgba(226, 205, 167, .2);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05);
  }
  /* chhota "Profile" label gold pill me */
  .bio-in::before {
    content: 'Profile'; position: absolute; top: -10px; left: 18px; padding: 4px 12px;
    font: 600 10px/1 var(--sans); letter-spacing: .28em; text-transform: uppercase; color: var(--gold);
    background: #0f1d31; border: 1px solid rgba(226, 205, 167, .4); border-radius: 999px;
  }
  /* role + naam upar card me pehle se hai, dobara nahi dikhana */
  .b-role, .bio h4, .b-rule { display: none; }
  .bio p { font-size: 14.5px; line-height: 1.85; color: #cfd7e2; }
}

@media (prefers-reduced-motion: reduce) {
  .card, .portrait img, .monogram span, .portrait::after, .rule, .bio, .bio-in { transition: none; }
}
</style>