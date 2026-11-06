# Alignaa D2C Website (alignaa.co)
**Prepared for Asalkar TechWorks Pvt Ltd · Version 1.1 Implementation (November 2026)**

Static, English-language patient-facing website for **alignaa.co**. Visitors can learn about Alignaa clear-aligner treatment and submit an enquiry. The Alignaa support team follows up personally to coordinate dental scans and clinical next steps. Dentists and dental clinic owners have a dedicated partner enquiry route with direct access to the parent brand website (**alignaa.in**).

Both patient and partner forms are architected to deliver to the same owner inbox once the hosted form endpoint is configured.

---

## 1. Quick Start

### Prerequisites
- Node.js 18+ (tested on v22.17.0)
- npm or compatible package manager

### Run Locally
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```
Open the printed local URL (typically `http://localhost:5173`).

### Production Build & Preview
```bash
# Run lint check
npm run lint

# Compile production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 2. Design Options Architecture (Section 10 Brief Specification)

Per Section 10 of the implementation brief, 3 comparable design options have been produced. All 3 options share the exact same functional scope, verified data (`src/content/site.js`), brand tokens, and single patient enquiry form (`#enquiry`).

You can toggle between them live on the website using the **Design Prototype Preview** bar at the top of the page, or by appending `?option=a`, `?option=b`, or `?option=c` to the URL.

### Option A: Video First *(Selected Primary Baseline)*
- **Hero:** Full-bleed wide background-video hero with subtle teal overlay, overlay copy, and integrated play/pause controls.
- **Section Order:**
  1. Video Hero (Full-bleed wide video with overlay text & play/pause)
  2. Treatment Offer (2-column layout: product visual + inclusion checklist + Starting at ₹39,999)
  3. How It Works (4 connected circular step nodes on desktop, vertical sequence on mobile)
  4. Teeth Concerns (6 illustrated concern cards + Learn More modal)
  5. Real Results (Before/after carousel with category filter tabs: All, Gap closure, Forwardly placed, Crowding)
  6. Pricing (₹39,999 baseline offer & inclusions summary card)
  7. Comparison Table (Row-based comparison: Alignaa vs Traditional braces)
  8. Why Alignaa (4-card core benefits grid)
  9. Patient Stories (Review carousel with sample content draft tags)
  10. FAQs (Accordion covering clear aligners, assessment, process, pricing, EMI, care)
  11. Single Patient Enquiry Form (`#enquiry`)
- **Design Rationale:** Implements the SmileSet + Toothsi hybrid layout requested in Version 1.1. Maximises visual engagement through continuous video movement while maintaining an uncluttered, modern aesthetic.

### Option B: Clinical & Structured
- **Hero:** Video background with an elevated, high-contrast clinical card panel on desktop highlighting "Doctor-Prescribed Treatment" and key metrics (₹39,999 starting baseline, 4 steps, doctor-led planning).
- **Section Order:**
  1. Structured Video Hero (Video background with elevated doctor-prescribed copy panel)
  2. Clinical Benefits Grid (4 compact cards elevated upfront: Personalised, Doctor-led, Support, Removable)
  3. Prominent Clinical Process (4-step diagnostic-to-treatment workflow with clear numbered milestones)
  4. Clinical Results Showcase (Case evidence with duration, aligner counts & PDF data)
  5. Treatment Offer & Inclusions (Inclusion checklist + ₹39,999 baseline)
  6. Teeth Concerns (6 illustrated cards with clinical descriptions + Learn More modal)
  7. Clinical Comparison (Detailed table comparing aligners against metal braces)
  8. Patient Experiences (Sample reviews)
  9. Clinical FAQs (Accordion covering clinician oversight, scan types & retainers)
  10. Single Patient Enquiry Form (`#enquiry`)
- **Design Rationale:** Geared toward patients seeking medical reassurance and clinician oversight first. Elevates clinical credentials and the 4-step treatment planning process immediately below the hero to establish immediate trust before presenting commercial details.

### Option C: Patient Story Led
- **Hero:** Video hero highlighting lifestyle and confidence ("Your smile journey starts with Alignaa") with quick reassurance pills and a "See Real Results" quick-scroll button.
- **Section Order:**
  1. Patient Story Video Hero (Lifestyle footage with emotional hook & quick reassurance pills)
  2. Real Results & Transformations (Placed immediately below hero for instant visual proof)
  3. Patient Stories Carousel (Testimonials & peer experiences elevated upfront)
  4. Treatment Offer & Inclusions (Clear ₹39,999 offer + 5 verified inclusions)
  5. Teeth Concerns Selector ("What would you like to improve?" cards + modal)
  6. How It Works (Simple 4-step journey from enquiry to treatment)
  7. Why Alignaa (4 key patient benefits)
  8. Pricing & Comparison Table (Reassuring pricing & aligners vs braces)
  9. Frequently Asked Questions (Accordion)
  10. Single Patient Enquiry Form (`#enquiry`)
- **Design Rationale:** Focuses on patient empathy, relatable transformations, and social proof. By showcasing results and patient experiences upfront, it directly addresses smile anxiety and guides hesitant patients toward requesting a scan with high confidence.

---

## 3. Routes & Pages

| Route | Purpose | Key Content & Components |
|---|---|---|
| `/` | Patient Homepage | Video hero (Option A/B/C), Treatment Offer, Inclusions, Process, Concerns, Results, Pricing, Comparison, Benefits, Reviews, FAQ, Single Patient Form (`#enquiry`) |
| `/become-a-partner` | Dedicated Partner Page | Dentist/Clinic owner partnership intro, benefits, disclaimer, partner form, persistent link to `https://alignaa.in/` |
| `/privacy` | Privacy Policy | Patient data privacy, handling rules, contact information (draft content) |
| `/terms` | Terms of Use | Terms of website use, disclaimer of online diagnosis, clinical assessment notice |
| `/*` | 404 Not Found Page | User-friendly error message with direct link back to home |

*Static host routing:* Configured with `public/_redirects` (Netlify) and `vercel.json` (Vercel) to rewrite all routes to `index.html`.

---

## 4. Brand & Visual Design Tokens

All styles follow the parent brand identity (`alignaa.in`):

| Token | CSS Variable | Hex / Value | Usage |
|---|---|---|---|
| Primary Teal | `--color-teal` | `#007B7F` | Primary buttons, active links, accents, icons |
| Dark Teal | `--color-teal-dark` | `#005A60` | Button hover states, active states |
| Main Ink | `--color-ink` | `#333333` | Headings and primary body copy |
| Muted Grey | `--color-muted` | `#5c6b6b` | Secondary text, hints, notes |
| Line / Border | `--color-line` | `#D9E3E3` | Card borders, form input borders, dividers |
| Soft Teal Tint | `--color-tint` | `#EFF8F8` | Alternate section background, badge fills |
| Near White | `--color-near` | `#FCFCFC` | Subtle secondary background |
| Headings Font | `--font-heading` | `'Montserrat', sans-serif` | Page and section titles |
| Body Font | `--font-body` | `'Open Sans', sans-serif` | Paragraphs, buttons, inputs |

---

## 5. Form Behaviors & Interaction States

### Single Patient Enquiry Form (`#enquiry`)
- **Required Fields:**
  1. Full name (trims whitespace, accepts normal names)
  2. Mobile number (validates 10-digit Indian mobile starting with 6-9, or valid international `+country code`)
  3. Age group (Under 18, 18–24, 25–34, 35–44, 45 and above)
  4. Teeth concern (Spacing, Crowding, Forwardly placed, Crossbite, Open bite, Deep bite, Not sure, General enquiry)
  5. City (text input, no location permissions required)
  6. PIN code (strict 6-digit Indian postal PIN validation)
  7. Contact consent (unchecked checkbox with link to Privacy Policy)
- **Optional Fields:**
  - Email address (format validated when provided)
  - Additional message (max 1000 characters with live limit check)
- **Anti-Spam Control:** Hidden honeypot field (`websiteUrl`). Bots filling this field are silently accepted without sending spam.
- **Interaction States:**
  - *Default/Idle:* Clean bordered fields with clear label and hint text.
  - *Focus:* 2px teal outline with soft teal shadow ring (`rgba(0, 123, 127, 0.15)`).
  - *Error:* Red border (`#B42318`), accessible inline error message, and automatic focus shift to the first invalid field on submit attempt.
  - *Sending:* Submit button disabled, shows spinning loader and "Sending…" label to prevent duplicate clicks.
  - *Success:* Displays confirmed thank-you message: *"Thank you for your enquiry. The Alignaa support team will contact you to discuss your requirements and guide you through the next steps."*
  - *Pending / Error:* Displays graceful error notice. If email endpoint is unconfigured, informs the user without pretending an email was sent. Entered form values are preserved.

### Dedicated Partner Form (`/become-a-partner`)
- Same validation and delivery rules.
- Required: Full name, Role (Dentist, Clinic owner, Other), Clinic or practice name, Mobile number, Email address, City, PIN code, Contact consent.
- On success: Displays confirmation and an explicit button linking to the parent site: `Visit the Alignaa professional website` (`https://alignaa.in/`).

---

## 6. Email Delivery Configuration

Both forms send to the same owner inbox using a lightweight JSON POST endpoint.

### Environment Variables
Copy `.env.example` to `.env` in the root folder:

```bash
VITE_SITE_URL=https://alignaa.co
VITE_DRAFT_MODE=true
VITE_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
VITE_FORM_ACCESS_KEY=
```

### Supported Email Form Services
You can use any standard hosted form service:
1. **Formspree:** Create a form pointing to the owner inbox. Set `VITE_FORM_ENDPOINT=https://formspree.io/f/<form-id>`.
2. **Web3Forms:** Set `VITE_FORM_ENDPOINT=https://api.web3forms.com/submit` and `VITE_FORM_ACCESS_KEY=<access-key>`.
3. **Custom Serverless Function (Vercel / Cloudflare Worker / AWS Lambda):** Endpoint that receives the JSON payload, verifies SPF/DKIM on the sender, and delivers to the owner inbox.

### Payload Structure Sent to Inbox
```json
{
  "subject": "Alignaa Patient Enquiry",
  "enquiryType": "patient",
  "sourcePage": "https://alignaa.co/",
  "submittedAt": "04/11/2026, 5:30:00 pm IST",
  "submittedAtIso": "2026-11-04T12:00:00.000Z",
  "timezone": "Asia/Kolkata",
  "fullName": "Jane Doe",
  "mobile": "9876543210",
  "ageGroup": "25–34",
  "concern": "Spacing",
  "city": "Mumbai",
  "pin": "400001",
  "email": "jane@example.com",
  "message": "Looking forward to learning about treatment.",
  "consent": "Yes"
}
```

*Delivery Rules Followed:*
- `Reply-To` header set to customer's email (never spoofed as From).
- Clear subject distinctions: `Alignaa Patient Enquiry` vs `Alignaa Partner Enquiry`.
- Submission timestamp and timezone included.
- No SMTP credentials or private secrets are exposed on the frontend.

---

## 7. Where to Edit Content & Pricing

All content is centrally decoupled from components:

| Content Area | File Location | Key Details |
|---|---|---|
| Starting Price (`₹39,999`) | `src/content/site.js` (`site.startingPrice`) | Baseline launch price from client PDF |
| Navigation Items | `src/content/site.js` (`navItems`) | Desktop and mobile links |
| Hero Headline & Copy | `src/content/site.js` (`hero`) | Video poster, headline, supporting copy |
| Inclusions & Notes | `src/content/site.js` (`treatmentOffer`) | 5 verified inclusions + pending chips |
| 4 Process Steps | `src/content/site.js` (`processSteps`) | Titles, descriptions, illustrations |
| 6 Teeth Concerns | `src/content/site.js` (`concerns`) | Names, descriptions, modal copy |
| 3 Result Cases | `src/content/site.js` (`results`) | Gap closure, Forwardly placed, Crowding |
| FAQs (8 topics) | `src/content/site.js` (`faqs`) | Clinical answers, pricing, process, EMI |
| Comparison Table | `src/content/site.js` (`comparison`) | Aligners vs Traditional braces |
| Partner Page Content | `src/content/site.js` (`partnerContent`) | Benefits, disclaimer, role options |
| Privacy & Terms | `src/content/policies.js` | Full policy draft text |
| Design Options Spec | `src/content/designOptions.js` | Option A, B, C section orders & rationales |

---

## 8. Remaining Client Inputs Needed Before Public Launch

Per Section 10 of the brief, the following items are marked as pending client confirmation and should be resolved prior to turning off draft mode:

1. **Owner Inbox Configuration:** Supply the production email address to receive enquiries, and configure the hosted endpoint in `VITE_FORM_ENDPOINT`.
2. **Final Approved Footage & Logo:** Client review and approval of the final video footage (`public/assets/hero.mp4`) and high-resolution logo.
3. **High-Resolution Result Images:** Client permission and patient consent checks for production before/after photography for the 3 cases.
4. **Authentic Patient Testimonials:** Replace sample patient reviews with consented real patient feedback.
5. **Support Contact Info:** Supply official support email, contact number, and hours for `site.support`.
6. **EMI Availability Terms:** Confirm partner financing terms and any eligible EMI partners.
7. **Scan Availability & Locations:** Confirm whether home scan visits or designated Alignaa partner centres are live in specific cities.
8. **Clinical FAQ Approvals:** Final sign-off on wear time guidance and retainer replacement policies.

---

## 9. Acceptance Checklist Verification

| Requirement | Status | Verification Details |
|---|---|---|
| **Parent Brand Visuals** | Pass | Official logo, Teal `#007B7F`, Dark Teal `#005A60`, Montserrat + Open Sans fonts. |
| **Video Hero** | Pass | Video hero with autoplay, loop, muted, play/pause toggle button, and poster fallback. |
| **Pricing Baseline** | Pass | Strictly Starting at ₹39,999. Future Lite/Essential/Complete ranges kept for reference only. |
| **Single Patient Form** | Pass | All patient CTAs lead to `#enquiry`. Full validation and spam prevention. |
| **Dedicated Partner Route** | Pass | `/become-a-partner` route with dedicated form and link to `alignaa.in` before & after submit. |
| **Shared Owner Inbox** | Pass | Patient and partner forms configured to deliver structured JSON to the same endpoint. |
| **3 Comparable Options** | Pass | Option A (Video first), Option B (Clinical), Option C (Patient story) live and toggleable. |
| **Responsive Design** | Pass | Tested across 360px, 390px, 768px, 1024px, 1440px without horizontal scroll or overlap. |
| **Accessibility** | Pass | Visible focus rings, keyboard navigability, semantic HTML, ARIA attributes, reduced motion. |
| **Scope Boundary** | Pass | No booking calendar, clinic picker, login, checkout, cart, or AI simulation. |
| **Draft Protection** | Pass | Draft banner enabled by default, `noindex, nofollow` meta tag, sample chips. |
| **Build & Lint** | Pass | Clean production build (`npm run build`) and 0 lint warnings/errors (`npm run lint`). |
