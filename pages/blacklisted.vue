<script setup lang="ts">
import { contact } from '~/data/site'

const blacklistedPartners = [
  {
    name: 'Mehmood Hassan',
    role: '',
    code: '',
    terminated: '20 August 2025',
    file: 'bdad78_75ed11045c3d4398ada0f703aa043731~mv2.jpeg',
  },
  {
    name: 'Gaurav Negi',
    role: '',
    code: '',
    terminated: '20 August 2025',
    file: 'bdad78_8b097b64b4d546b9915c140885f30268~mv2.jpeg',
  },
  {
    name: 'Ashish Chaudhary',
    role: 'General Manager',
    code: 'VD/10173',
    terminated: '13 September 2026',
    file: 'bdad78_51ebb3ab3d7548e8a6bb16d08198a282~mv2.jpeg',
  },
  {
    name: 'Rashmi Kumari',
    role: 'General Manager',
    code: 'VD/10174',
    terminated: '13 September 2026',
    file: 'bdad78_981e7d01e6aa47d38c222043ebacc348~mv2.jpeg',
  },
]

const partnerPhoto = (file: string) =>
  `https://static.wixstatic.com/media/${file}/v1/fit/w_900,h_1100,q_85/${file}`

useHead({
  title: 'Blacklisted & Unauthorised Representatives | VD Vanchers',
  meta: [{
    name: 'description',
    content: 'Important notice: verify that property representatives and payment instructions are authorised by VD Vanchers before making commitments.',
  }],
})
</script>

<template>
  <main class="notice-page">
    <section class="notice-hero">
      <div class="container hero-content">
        <nav class="breadcrumbs" aria-label="Breadcrumb"><NuxtLink to="/">Home</NuxtLink><span>/</span><span>Blacklisted</span></nav>
        <span class="eyebrow"><i /> Important customer notice</span>
        <h1>Blacklisted<br /><em>Channel Partners.</em></h1>
        <p>Stay alert and confirm a representative’s identity and authority with VD Vanchers before sharing documents, making payments, or relying on any property commitment.</p>
      </div>
    </section>

    <section class="notice-content">
      <div class="container notice-grid">
        <div class="notice-mark" aria-hidden="true">!</div>
        <article class="notice-copy">
          <span class="label">Official advisory</span>
          <h2>Verify before you proceed.</h2>
          <p>VD Vanchers advises customers not to engage with anyone claiming to represent the group unless their authorisation has been confirmed through our official contact details.</p>
          <p>Do not rely on verbal assurances or transfer funds to personal accounts. Confirm the project, payment instructions, and any written commitment directly with our team before taking action.</p>
          <div class="callout">
            <strong>Check before engaging</strong>
            <span>The records below show the details and termination dates supplied for these former channel partners. Please verify any representative's current authorisation directly with VD Vanchers.</span>
          </div>
          <div class="official-links">
            <a :href="`tel:${contact.phoneHref}`"><span>Call our team</span><strong>{{ contact.phone }}</strong></a>
            <a :href="`mailto:${contact.email}`"><span>Email us</span><strong>{{ contact.email }}</strong></a>
          </div>
          <NuxtLink to="/contact" class="contact-button">Contact VD Vanchers <span aria-hidden="true">↗</span></NuxtLink>
        </article>
      </div>
    </section>

    <section class="partner-section">
      <div class="container">
        <header class="partner-heading">
          <span class="label">Channel partner notice</span>
          <h2>Former channel partners</h2>
          <p>These individuals are no longer authorised to represent VD Vanchers from the dates shown.</p>
        </header>
        <div class="partner-grid">
          <article v-for="partner in blacklistedPartners" :key="partner.code || partner.name" class="partner-card">
            <div class="partner-photo">
              <img :src="partnerPhoto(partner.file)" :alt="`Photograph of ${partner.name}`" loading="lazy" />
              <span class="status">Not authorised</span>
            </div>
            <div class="partner-details">
              <h3>{{ partner.name }}</h3>
              <p v-if="partner.role" class="partner-role">{{ partner.role }}</p>
              <p v-if="partner.code" class="partner-code">Partner code <strong>{{ partner.code }}</strong></p>
              <p class="termination"><span>Terminated</span><strong>{{ partner.terminated }}</strong></p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="bottom-note">
      <div class="container">
        <span class="eyebrow"><i /> Your safety matters</span>
        <p>If anything feels uncertain, pause and verify it with us using the contact details above.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.notice-page { --ink: #123b2a; --gold: #2d6a4f; background: #f2f7f3; color: var(--ink); }
.notice-hero { position: relative; overflow: hidden; color: #fff; background: radial-gradient(ellipse at 86% 16%, rgba(109,166,121,.22), transparent 34%), linear-gradient(120deg, #0c2d20, #1b5138); }
.notice-hero::after { content: ''; position: absolute; width: min(42vw, 560px); aspect-ratio: 1; right: -9%; bottom: -55%; border: 1px solid rgba(109,166,121,.2); border-radius: 50%; box-shadow: 0 0 0 40px rgba(109,166,121,.03), 0 0 0 80px rgba(109,166,121,.025); }
.hero-content { position: relative; z-index: 1; padding-top: 56px; padding-bottom: 82px; }
.breadcrumbs { display: flex; gap: 10px; margin-bottom: 62px; color: rgba(255,255,255,.62); font-size: 12px; }
.breadcrumbs a:hover { color: #fff; }
.eyebrow { display: flex; align-items: center; gap: 11px; color: #dcebdd; font-size: 10px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; }
.eyebrow i { width: 28px; height: 1px; background: var(--gold); }
h1 { max-width: 850px; margin-top: 22px; font: 400 clamp(46px, 7vw, 88px)/1.02 var(--serif); letter-spacing: -.03em; }
h1 em { color: #dcebdd; font-weight: 400; }
.hero-content > p:last-child { max-width: 610px; margin-top: 24px; color: rgba(255,255,255,.72); font-size: 16px; line-height: 1.8; }
.notice-content { padding: clamp(62px, 9vw, 110px) 0; }
.notice-grid { display: grid; grid-template-columns: 90px minmax(0, 760px); justify-content: center; gap: 42px; }
.notice-mark { display: grid; place-items: center; width: 72px; height: 72px; border: 1px solid rgba(45,106,79,.28); border-radius: 50%; color: #1b5138; font: 400 42px var(--serif); }
.label { color: #1b5138; font-size: 10px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; }
.notice-copy h2 { margin-top: 14px; font: 400 clamp(34px, 5vw, 54px)/1.12 var(--serif); }
.notice-copy > p { margin-top: 18px; color: #626d77; font-size: 15px; line-height: 1.85; }
.callout { display: grid; gap: 8px; margin-top: 28px; padding: 20px 22px; border-left: 2px solid var(--gold); background: #e6f0e8; }
.callout strong { font: 500 18px var(--serif); }
.callout span { color: #626d77; font-size: 13px; line-height: 1.7; }
.official-links { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 26px; }
.official-links a { display: grid; gap: 4px; padding: 17px 18px; border: 1px solid #ddd8cf; background: rgba(255,255,255,.56); }
.official-links a:hover { border-color: var(--gold); }
.official-links span { color: #78818a; font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
.official-links strong { overflow-wrap: anywhere; font-size: 14px; font-weight: 600; }
.contact-button { display: inline-flex; gap: 22px; align-items: center; margin-top: 24px; padding: 15px 20px; background: var(--ink); color: #fff; font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.contact-button span { color: #dcebdd; }
.partner-section { padding: clamp(58px, 8vw, 96px) 0; background: #fff; }
.partner-heading { max-width: 650px; margin-bottom: 32px; }
.partner-heading h2 { margin-top: 12px; font: 400 clamp(34px, 4vw, 48px)/1.1 var(--serif); }
.partner-heading > p { margin-top: 12px; color: #626d77; font-size: 14px; line-height: 1.7; }
.partner-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
.partner-card { min-width: 0; overflow: hidden; border: 1px solid #d7e4d9; background: #f8fbf8; }
.partner-photo { position: relative; aspect-ratio: 4 / 4.7; overflow: hidden; background: #e5e0d7; }
.partner-photo img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; }
.status { position: absolute; left: 12px; bottom: 12px; padding: 7px 10px; background: rgba(18,59,42,.94); color: #fff; font-size: 9px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.partner-details { padding: 18px; }
.partner-details h3 { font: 500 21px/1.2 var(--serif); }
.partner-role { margin-top: 6px; color: #68727a; font-size: 12px; }
.partner-code { margin-top: 12px; color: #68727a; font-size: 11px; }
.partner-code strong { margin-left: 5px; color: var(--ink); }
.termination { display: grid; gap: 3px; margin-top: 14px; padding-top: 12px; border-top: 1px solid #ded9cf; }
.termination span { color: #78818a; font-size: 9px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }
.termination strong { font-size: 12px; font-weight: 600; }
.bottom-note { padding: 32px 0; background: #e6f0e8; }
.bottom-note p { margin-top: 9px; color: #56616b; font-size: 14px; }
@media (max-width: 650px) {
  .hero-content { padding-top: 36px; padding-bottom: 58px; }
  .breadcrumbs { margin-bottom: 48px; }
  .notice-grid { grid-template-columns: 1fr; gap: 22px; }
  .notice-mark { width: 58px; height: 58px; font-size: 34px; }
  .official-links { grid-template-columns: 1fr; }
  .partner-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
  .partner-details { padding: 14px 12px; }
  .partner-details h3 { font-size: 18px; }
}
@media (max-width: 380px) {
  .partner-grid { grid-template-columns: 1fr; }
  .partner-photo { aspect-ratio: 4 / 3; }
}
</style>
