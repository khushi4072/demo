
<script setup lang="ts">
const testimonials = [
  {
    name: 'Aarav Sharma',
    role: 'Farmhouse Buyer',
    quote: 'I had been looking for a peaceful farmhouse location away from the city. The team helped me understand the available options and guided me throughout the process. Overall, it was a smooth experience.',
  },
  {
    name: 'Rohit Verma',
    role: 'Property Investor',
    quote: 'What I liked most was the clarity in communication. The team explained the project details, location advantages and investment aspects properly. It made the decision-making process much easier.',
  },
  {
    name: 'Neha Kapoor',
    role: 'Residential Plot Buyer',
    quote: 'The site visit was well organised, and I got a clear understanding of the project layout. The team was helpful and answered all my questions patiently.',
  },
  {
    name: 'Vikram Singh',
    role: 'Farmhouse Investor',
    quote: 'I was exploring different farmhouse investment opportunities. The project presentation and location details helped me shortlist an option that matched my requirements.',
  },
  {
    name: 'Ankit Mehra',
    role: 'Property Buyer',
    quote: 'The overall experience was professional. From the initial enquiry to the site visit, the team stayed connected and helped me understand every important detail.',
  },
  {
    name: 'Priya Malhotra',
    role: 'Farmhouse Buyer',
    quote: 'I wanted a weekend getaway where my family could spend quality time. The farmhouse concept and peaceful surroundings were exactly what I was looking for.',
  },
  {
    name: 'Siddharth Jain',
    role: 'Real Estate Investor',
    quote: 'The team provided useful information about the project, connectivity and future development around the location. I appreciated their straightforward approach.',
  },
  {
    name: 'Karan Gupta',
    role: 'Residential Plot Investor',
    quote: 'Finding the right property requires patience and proper guidance. The team helped me compare different options and understand the available opportunities.',
  },
  {
    name: 'Megha Arora',
    role: 'Farmhouse Buyer',
    quote: 'I really liked the idea of having a private space surrounded by greenery. The team explained the project features clearly and made the site visit comfortable.',
  },
  {
    name: 'Rahul Bansal',
    role: 'Property Investor',
    quote: 'The project details and location information were presented clearly. I had a good experience interacting with the team and getting answers to my queries.',
  },
  {
    name: 'Amit Chawla',
    role: 'Farmhouse Buyer',
    quote: 'The entire enquiry experience was quite convenient. The team was responsive, shared the necessary information and helped me understand the next steps.',
  },
  {
    name: 'Simran Kaur',
    role: 'Property Buyer',
    quote: 'I was looking for a property that offered a balance of peaceful surroundings and accessibility. The project options gave me a good starting point for my search.',
  },
  {
    name: 'Deepak Agarwal',
    role: 'Real Estate Investor',
    quote: 'I appreciated the time the team took to explain the project planning, available options and documentation process. Clear communication makes a big difference.',
  },
  {
    name: 'Nisha Sethi',
    role: 'Farmhouse Investor',
    quote: 'The farmhouse concept is interesting, especially for people looking for more open space and a relaxed lifestyle. The team helped me explore the available options.',
  },
  {
    name: 'Varun Khanna',
    role: 'Property Buyer',
    quote: 'From the first conversation to the site visit, the experience was organised and informative. I liked that my questions were addressed without unnecessary pressure.',
  },
]

const current = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

function go(i: number) {
  current.value = (i + testimonials.length) % testimonials.length

  if (timer) clearInterval(timer)

  timer = setInterval(() => {
    current.value = (current.value + 1) % testimonials.length
  }, 7000)
}

const initials = (n: string) =>
  n.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase()

onMounted(() => go(0))

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section id="testimonials" class="section reviews">
    <div class="container">
      <div class="head">
        <h2 class="h2">What Our Buyers &amp; Investors Say</h2>
       
      </div>

      <div class="card">
        <svg
          class="qm"
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          aria-hidden="true"
        >
          <path d="M10 7H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3v1a3 3 0 0 1-3 3M20 7h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3v1a3 3 0 0 1-3 3" />
        </svg>

        <div class="viewport">
          <div
            class="slides"
            :style="{ transform: `translateX(-${current * 100}%)` }"
          >
            <figure
              v-for="(t, i) in testimonials"
              :key="i"
              :aria-hidden="i !== current"
            >

              <blockquote>
                “{{ t.quote }}”
              </blockquote>

              <figcaption>
                <span class="avatar">{{ initials(t.name) }}</span>
                <span>
                  <strong>{{ t.name }}</strong>
                  <small>{{ t.role }}</small>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        <div class="foot">
          <button
            class="circle-btn"
            aria-label="Previous review"
            @click="go(current - 1)"
          >
            ‹
          </button>

          <button
            class="circle-btn"
            aria-label="Next review"
            @click="go(current + 1)"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews {
  background: var(--white);
  border-top: 1px solid var(--navy-900);
}

.head {
  text-align: center;
  margin-bottom: 44px;
}

.head .h2 {
  margin-top: 14px;
  font-weight: 700;
}

.review-note {
  margin-top: 10px;
  color: var(--muted);
  font-size: 13px;
}

.card {
  position: relative;
  max-width: 1024px;
  margin: 0 auto;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 36px;
  padding: 40px 64px 34px;
  box-shadow: 0 14px 30px -22px rgba(15,28,46,.4);
}

.qm {
  color: #c9ced6;
  margin-left: -26px;
}

.viewport {
  overflow: hidden;
}

.slides {
  display: flex;
  transition: transform .7s cubic-bezier(.7,0,.3,1);
}

figure {
  flex: 0 0 100%;
  margin: 0;
  padding: 10px 0 0;
}

.sample-label {
  display: inline-block;
  margin-bottom: 12px;
  color: var(--navy-700);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
}

blockquote {
  font-family: var(--serif);
  font-size: clamp(20px, 2.3vw, 27px);
  line-height: 1.5;
  color: var(--navy-900);
  margin: 0 0 30px;
}

figcaption {
  display: flex;
  align-items: center;
  gap: 14px;
}

.avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--navy-900);
  color: var(--gold-light);
  display: grid;
  place-items: center;
  font-weight: 700;
  letter-spacing: .04em;
}

figcaption strong {
  display: block;
  color: var(--navy-900);
  font-size: 16px;
}

figcaption small {
  color: var(--muted);
  font-size: 13.5px;
}

.foot {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  border-top: 1px solid var(--line);
  margin-top: 30px;
  padding-top: 24px;
}

@media (max-width: 640px) {
  .reviews.section {
    padding-bottom: 32px;
  }

  .head {
    margin-bottom: 28px;
  }

  .head .h2 {
    margin-top: 10px;
    font-size: clamp(36px, 9.5vw, 42px);
    line-height: 1.1;
  }

  .review-note {
    font-size: 12.5px;
  }

  .card {
    padding: 24px 20px 22px;
    border-radius: 20px;
  }

  .qm {
    width: 40px;
    height: 40px;
    margin-left: 0;
  }

  blockquote {
    font-size: 19px;
    line-height: 1.5;
    margin-bottom: 22px;
  }
}
</style>
