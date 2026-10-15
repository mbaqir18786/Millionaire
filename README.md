# THE HONEST MILLION — The Arithmetic of ₹1 Crore from an ₹8,000 Baseline

> **ARTEMIS 2026 Frontend Competition Submission**  
> *An Awwwards-caliber interactive web experience illustrating real-world wealth accumulation, compounding mathematics, inflation, market downturns, and career progression for a 19-year-old student starting at ₹8,000/month.*

---

## 🌟 Concept & Mission

Most financial media teaches students either that ₹1 Crore is unattainable or sells get-rich-quick crypto and options trading fantasies. **The Honest Million** replaces speculation with the cold, empowering arithmetic of compounding.

Through an interactive editorial narrative adapted from an Awwwards-winning design system, the site walks Aarav (an illustrative 19-year-old student earning ₹8,000/month) through:
1. **The Starting Reality**: Committing a realistic ₹1,500/month (18.75% of income) without taking reckless loans or neglecting essentials.
2. **The Power of Step-Up**: Showing how graduating, raising skills, and increasing monthly savings by just 10% annually cuts nearly **a decade** (over 7 years) off the timeline.
3. **The Harsh Cost of Pausing**: Visualizing how halting investments for just 6 months in Year 2 delays the entire financial milestone by +5 months due to broken compounding.
4. **Market Reality & Risk**: Dispelling the myth of guaranteed returns by showing sequence-of-returns risk, market corrections, and 6% inflation reality.

---

## 🚀 How to Run the Project Locally

### Prerequisites
- **Node.js**: v18.17.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Execution Commands
```bash
# 1. Clone or navigate to the repository directory
cd Truus.co-Awwward-Website-main

# 2. Install dependencies (Next.js 15, React 19, GSAP 3, Lenis)
npm install

# 3. Start the local development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:3000
```

### Production Build
```bash
# Build the optimized production application
npm run build

# Start the production server
npm run start
```

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Animation System**: [GSAP 3](https://greensock.com/gsap/) (`ScrollTrigger`, `InertiaPlugin`, `quickTo`)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/) smooth scroll integration
- **Styling**: Vanilla CSS Modules & Tokens (`app/styles/base.css`, `app/styles/calculator.css`)
- **Typography**: `Epilogue` (Display & Numbers) & `DM Sans` (Body & Metadata)
- **Mathematics**: Pure ES6 Future-Value Annuity & Step-Up compounding engine (`lib/calc.js`)

---

## 📊 Core Features Implemented

1. **Editorial Hero Section (`VimeoHero`)**:
   - Signature animated typography, fluid SVG underline drawing, and interactive play/pause controls.
2. **Pinned Horizontal Scroll Showcase (`HorizontalWords`)**:
   - Letter-by-letter elastic physics animation telling the story: *"The truth about building one crore."*
3. **Inertia Interactive Cards (`MotionCards`)**:
   - Draggable, interactive physics cards demonstrating Aarav's baseline reality and the 15-year compounding turn.
4. **Interactive Trajectory Calculator (`Showreel`)**:
   - **Accessible Inputs**: Direct numerical steppers (`−`/`+`), smooth sliders, and quick-select presets for student budgets (`₹500` to `₹4,000`) and returns (`10%`, `12%`, `14%`).
   - **Side-by-Side Comparison**: Contrasts Constant Savings vs. 10% Annual Step-Up savings.
   - **Pocket vs. Compounding Breakdown**: Separates actual money invested from wealth earned via compound interest.
   - **Horizon Timeline**: Visual 40-year milestone bar chart.
   - **The Cost of Pausing**: Real-time simulation of emergency contribution pauses.
5. **Interactive Pillar Deck (`ServiceCards`)**:
   - Elastic hover spreading cards detailing the 5 financial laws: *The Baseline*, *Compounding*, *Income Step-Up*, *Market Reality*, and *The Hard Stops*.
6. **Dual Dynamic Marquee (`DoubleMarquee`)**:
   - Two counter-scrolling brand logo tracks highlighting everyday consumer temptations traded off for financial freedom.
7. **Playful Kinetic Footer (`Footer`)**:
   - Proximity cursor velocity physics on sticker badges, animated vector drawings, and transparent methodology links.

---

## 🔍 Quality & Compliance Checklist

- [x] **Strict Visual Identity**: Preserves original typography, color tokens, layout hierarchy, and GSAP animation timelines.
- [x] **No Generic Dashboard Bloat**: All controls and outputs adhere to the editorial dark aesthetic of the site.
- [x] **Honest & Safe Financial Models**: Guards against negative inputs, includes inflation awareness, and provides clear disclaimers that projections are educational estimates.
- [x] **Full Mobile & Desktop Responsiveness**: Tested across mobile viewports (down to 360px) and wide desktop screens.

---

## ⚠️ Known Limitations
- Native browser audio policy requires user interaction before unmuting video audio.
- Development mode server logs may display benign hydration warnings caused by browser extensions modifying DOM attributes.
