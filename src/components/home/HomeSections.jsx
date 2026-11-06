import { useMemo, useRef, useState } from 'react'
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Columns2,
  Layers,
  MapPin,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Stethoscope,
} from 'lucide-react'
import {
  benefits,
  comparison,
  concerns,
  faqs,
  processSteps,
  results,
  reviews,
  site,
  treatmentOffer,
} from '../../content/site'
import { scrollToId } from '../../lib/scroll'
import { Modal } from '../ui/Modal'
import { PatientForm } from '../forms/PatientForm'

export function TreatmentOffer() {
  return (
    <section className="section" id="treatment">
      <div className="container-site grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="overflow-hidden rounded-[28px] bg-tint min-h-[300px] border border-line shadow-sm">
          <img
            src={treatmentOffer.image}
            alt={treatmentOffer.imageAlt}
            className="w-full h-full object-cover min-h-[340px] hover:scale-102 transition duration-300"
            width="720"
            height="520"
          />
        </div>
        <div>
          <p className="eyebrow">Treatment offer</p>
          <h2 className="mt-3 text-[28px] sm:text-[36px]">{treatmentOffer.title}</h2>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-heading font-bold text-teal">{treatmentOffer.priceLabel}</span>
            <span className="text-xs uppercase tracking-wider text-muted font-bold">All-Inclusive Baseline</span>
          </div>
          <ul className="mt-6 grid gap-3">
            {treatmentOffer.inclusions.map((item) => (
              <li key={item.text} className="flex gap-3 items-start">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tint text-teal">
                  <Check size={16} />
                </span>
                <span className="text-sm sm:text-base">
                  {item.text}
                  {item.pending ? <span className="draft-chip ml-2">Pending confirmation</span> : null}
                  {item.note ? <span className="block text-xs sm:text-sm text-muted mt-0.5">{item.note}</span> : null}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted leading-relaxed">{treatmentOffer.emi}</p>
          <button type="button" className="btn btn-primary mt-6" onClick={() => scrollToId('enquiry')}>
            Request a Scan
          </button>
        </div>
      </div>
    </section>
  )
}

export function Process() {
  return (
    <section className="section bg-near" id="how-it-works">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 text-[28px] sm:text-[36px]">Four steps from enquiry to your Alignaa journey</h2>
          <p className="mt-3 text-muted text-sm sm:text-base leading-relaxed">
            The website action is an enquiry. Home scans, centre visits and shipping details are confirmed by the Alignaa
            team after they contact you.
          </p>
        </div>

        <ol className="mt-12 grid gap-8 lg:grid-cols-4 relative">
          <div className="hidden lg:block absolute top-[86px] left-[8%] right-[8%] h-px timeline-line" aria-hidden="true" />
          {processSteps.map((step) => (
            <li key={step.number} className="relative flex lg:flex-col gap-4 lg:text-center">
              <div className="relative mx-0 lg:mx-auto h-[120px] w-[120px] shrink-0 overflow-hidden rounded-full border-4 border-white shadow-card bg-white">
                <img src={step.image} alt={step.imageAlt} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-teal font-heading font-bold text-lg">{step.number}</p>
                <h3 className="mt-1 text-xl">{step.title}</h3>
                <p className="mt-2 text-sm sm:text-base text-muted leading-relaxed">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Concerns() {
  const [active, setActive] = useState(null)

  return (
    <section className="section" id="concerns">
      <div className="container-site">
        <p className="eyebrow">Teeth concerns</p>
        <h2 className="mt-3 text-[28px] sm:text-[36px]">What would you like to improve?</h2>
        <p className="mt-3 max-w-2xl text-muted text-sm sm:text-base">
          These cards help you describe your concern. They are not a diagnosis or an eligibility assessment.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {concerns.map((item) => (
            <article key={item.id} className="card p-5 flex flex-col hover:border-teal/50 hover:shadow-lg transition">
              <div className="h-40 w-full overflow-hidden rounded-2xl bg-tint flex items-center justify-center p-3">
                <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
              </div>
              <h3 className="mt-4 text-xl">{item.name}</h3>
              <p className="mt-2 text-sm text-muted flex-1 leading-relaxed">{item.short}</p>
              <button type="button" className="btn btn-secondary mt-5 self-start text-xs sm:text-sm py-2 px-4" onClick={() => setActive(item)}>
                Learn more
              </button>
            </article>
          ))}
        </div>
      </div>
      <Modal open={Boolean(active)} title={active?.name || ''} onClose={() => setActive(null)}>
        {active ? (
          <>
            <img src={active.image} alt="" className="h-44 w-full object-contain bg-tint rounded-2xl p-4" />
            <p className="mt-4 text-muted leading-relaxed">{active.details}</p>
            <div className="mt-6 pt-4 border-t border-line flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-muted">Consultation planned with certified doctors</span>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('alignaa:set-concern', { detail: active.formValue }))
                  setActive(null)
                  scrollToId('enquiry')
                }}
              >
                Request a Scan for {active.formValue}
              </button>
            </div>
          </>
        ) : null}
      </Modal>
    </section>
  )
}

function BeforeAfterSlider({ beforeSrc, afterSrc, beforeAlt, afterAlt, duration, showFullArch }) {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef(null)

  const handlePointerMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100))
    setSliderPos(pct)
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-line/80 shadow-md bg-white">
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden select-none cursor-ew-resize ${
          showFullArch ? 'aspect-[3/4] sm:aspect-[600/796] max-h-[620px]' : 'aspect-[4/3] max-h-[520px]'
        }`}
        onMouseMove={(e) => {
          if (e.buttons === 1) handlePointerMove(e)
        }}
        onClick={handlePointerMove}
        onTouchMove={handlePointerMove}
      >
        {/* Before image (Background) */}
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* After image (Clipped foreground overlay) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
        >
          <img
            src={afterSrc}
            alt={afterAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Vertical divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-teal text-white shadow-lg flex items-center justify-center border-2 border-white text-[10px] font-bold tracking-tighter">
            ◀▶
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 bg-[#002024]/85 backdrop-blur-md text-white text-xs font-heading font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm pointer-events-none">
          Before
        </span>
        <span className="absolute top-3 right-3 bg-teal text-white text-xs font-heading font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm pointer-events-none">
          After Result · {duration}
        </span>

        {/* Accessible range input overlay for keyboard / accessibility */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
          aria-label="Comparison slider position"
        />
      </div>

      <div className="p-3 sm:p-4 bg-tint/60 border-t border-line/60 flex items-center justify-between gap-2 text-xs text-muted">
        <span className="font-semibold text-ink">Interactive Slider</span>
        <span>Drag handle left/right or tap anywhere to compare pre-treatment vs finished outcome</span>
      </div>
    </div>
  )
}

export function Results() {
  const categories = useMemo(() => ['All', ...new Set(results.map((item) => item.category))], [])
  const [filter, setFilter] = useState('All')
  const [index, setIndex] = useState(0)
  const [showFullArch, setShowFullArch] = useState(false)
  const [compareMode, setCompareMode] = useState('sideBySide')
  const visible = filter === 'All' ? results : results.filter((item) => item.category === filter)
  const current = visible[index] || visible[0]

  function shift(delta) {
    if (!visible.length) return
    setIndex((value) => (value + delta + visible.length) % visible.length)
  }

  return (
    <section className="section bg-tint" id="results">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Real results</p>
            <h2 className="mt-3 text-[28px] sm:text-[36px]">Examples from Alignaa treatment cases</h2>
            <p className="mt-2 max-w-2xl text-muted text-sm sm:text-base">
              Verified clinical before-and-after photographic records from Alignaa clear-aligner patients.
            </p>
          </div>

          {/* Controls: Mode & Clinical View */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {/* Side-by-Side vs Slider Toggle */}
            <div className="inline-flex p-1 rounded-xl bg-white border border-line shrink-0">
              <button
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  compareMode === 'sideBySide' ? 'bg-teal text-white shadow-xs' : 'text-muted hover:text-ink'
                }`}
                onClick={() => setCompareMode('sideBySide')}
              >
                <Columns2 size={13} />
                Side by Side
              </button>
              <button
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  compareMode === 'slider' ? 'bg-teal text-white shadow-xs' : 'text-muted hover:text-ink'
                }`}
                onClick={() => setCompareMode('slider')}
              >
                <SlidersHorizontal size={13} />
                Compare Slider
              </button>
            </div>

            {/* Toggle between Frontal Smile & Full Dental Arch */}
            <div className="inline-flex p-1 rounded-xl bg-white border border-line shrink-0">
              <button
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  !showFullArch ? 'bg-teal text-white shadow-xs' : 'text-muted hover:text-ink'
                }`}
                onClick={() => setShowFullArch(false)}
              >
                Smile View
              </button>
              <button
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                  showFullArch ? 'bg-teal text-white shadow-xs' : 'text-muted hover:text-ink'
                }`}
                onClick={() => setShowFullArch(true)}
              >
                <Layers size={13} />
                Full Dental Arch
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Result categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={filter === category}
              className={`min-h-10 px-4 rounded-full border text-xs sm:text-sm font-semibold transition cursor-pointer ${
                filter === category
                  ? 'bg-teal text-white border-teal shadow-xs'
                  : 'bg-white border-line text-ink hover:bg-[#f3f9f9]'
              }`}
              onClick={() => {
                setFilter(category)
                setIndex(0)
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {current ? (
          <div className="mt-8 card p-5 sm:p-8 bg-white rounded-3xl shadow-md border border-line">
            {compareMode === 'slider' ? (
              <BeforeAfterSlider
                beforeSrc={showFullArch ? current.beforeFull : current.beforeImage}
                afterSrc={showFullArch ? current.afterFull : current.afterImage}
                beforeAlt={`Before Alignaa clear aligner treatment: ${current.category}`}
                afterAlt={`After Alignaa clear aligner treatment: ${current.category}`}
                duration={current.duration}
                showFullArch={showFullArch}
              />
            ) : (
              /* Real Before and After Images (Side by Side) */
              <div className="grid md:grid-cols-2 gap-6">
                {/* BEFORE CARD */}
                <div className="relative rounded-2xl overflow-hidden border border-line/80 shadow-xs bg-[#f4f7f7] flex flex-col group">
                  <div className={`relative ${showFullArch ? 'aspect-[3/4] sm:aspect-[600/796]' : 'aspect-[4/3]'} bg-ink/5 overflow-hidden flex items-center justify-center`}>
                    <img
                      src={showFullArch ? current.beforeFull : current.beforeImage}
                      alt={`Before Alignaa clear aligner treatment: ${current.category}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-[#002024]/85 backdrop-blur-md text-white text-xs font-heading font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      Before
                    </span>
                    <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-ink text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs">
                      {showFullArch ? 'Pre-treatment dental record' : 'Pre-treatment smile record'}
                    </span>
                  </div>
                  <div className="p-4 bg-white border-t border-line/60">
                    <p className="font-heading font-bold text-sm text-ink">{current.category} · Pre-Treatment</p>
                    <p className="text-xs text-muted mt-0.5">Initial clinical presentation prior to clear aligners</p>
                  </div>
                </div>

                {/* AFTER CARD */}
                <div className="relative rounded-2xl overflow-hidden border border-teal/40 shadow-xs bg-[#f4f7f7] flex flex-col group ring-1 ring-teal/20">
                  <div className={`relative ${showFullArch ? 'aspect-[3/4] sm:aspect-[600/796]' : 'aspect-[4/3]'} bg-ink/5 overflow-hidden flex items-center justify-center`}>
                    <img
                      src={showFullArch ? current.afterFull : current.afterImage}
                      alt={`After Alignaa clear aligner treatment: ${current.category}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-teal text-white text-xs font-heading font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      After Result
                    </span>
                    <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-teal font-heading font-bold text-[11px] px-2.5 py-1 rounded-md shadow-xs">
                      Outcome: {current.duration}
                    </span>
                  </div>
                  <div className="p-4 bg-white border-t border-line/60">
                    <p className="font-heading font-bold text-sm text-teal">Corrected Alignment · Finished Case</p>
                    <p className="text-xs text-muted mt-0.5">Completed in {current.duration} using {current.aligners} precision aligners</p>
                  </div>
                </div>
              </div>
            )}

            {/* Metrics & Navigation Bar */}
            <div className="mt-6 pt-5 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                <div className="p-2.5 rounded-xl bg-tint border border-teal/15">
                  <span className="text-muted block text-[11px] uppercase font-semibold">Teeth Concern</span>
                  <strong className="text-ink font-heading font-bold text-sm">{current.category}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-tint border border-teal/15">
                  <span className="text-muted block text-[11px] uppercase font-semibold">Treatment Duration</span>
                  <strong className="text-ink font-heading font-bold text-sm">{current.duration}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-tint border border-teal/15">
                  <span className="text-muted block text-[11px] uppercase font-semibold">Aligner Trays</span>
                  <strong className="text-ink font-heading font-bold text-sm">{current.aligners} aligners</strong>
                </div>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <button
                  type="button"
                  disabled={visible.length <= 1}
                  className="btn btn-secondary min-h-10 px-3.5 !rounded-full hover:bg-tint disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={() => shift(-1)}
                  aria-label="Previous result"
                >
                  <ChevronLeft size={18} />
                </button>
                <p className="text-xs font-semibold text-muted min-w-[50px] text-center">
                  {visible.length > 0 ? `${index + 1} of ${visible.length}` : '0 of 0'}
                </p>
                <button
                  type="button"
                  disabled={visible.length <= 1}
                  className="btn btn-secondary min-h-10 px-3.5 !rounded-full hover:bg-tint disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={() => shift(1)}
                  aria-label="Next result"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <p className="mt-4 text-xs text-muted leading-relaxed">
              * {current.note} Individual results and wear time depend on your customized treatment plan prescribed by a certified doctor.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="container-site grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
        <div>
          <p className="eyebrow">Pricing</p>
          <h2 className="mt-3 text-[28px] sm:text-[36px]">Starting at ₹39,999</h2>
          <p className="mt-4 max-w-xl text-muted text-sm sm:text-base leading-relaxed">
            This is the launch pricing baseline from the Alignaa offer. Your clinician and the Alignaa team confirm the
            plan that fits your case after your enquiry. Later illustrative ranges are kept for future updates only.
          </p>
          <button type="button" className="btn btn-primary mt-6" onClick={() => scrollToId('enquiry')}>
            Enquire Now
          </button>
        </div>
        <aside className="card p-6 sm:p-8 bg-tint border-0 rounded-3xl">
          <p className="font-heading text-lg font-bold text-ink">What this starting price covers in the draft offer</p>
          <ul className="mt-4 grid gap-3 text-sm sm:text-base text-muted">
            <li className="flex items-center gap-2">
              <Check size={16} className="text-teal shrink-0" />
              <span>Scan coordination after your enquiry</span>
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-teal shrink-0" />
              <span>Professional treatment planning by licensed doctors</span>
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-teal shrink-0" />
              <span>Aligner delivery as agreed</span>
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-teal shrink-0" />
              <span>Free retainers, subject to confirmed package conditions</span>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  )
}

export function Comparison() {
  return (
    <section className="section bg-near" id="comparison">
      <div className="container-site">
        <p className="eyebrow">Comparison</p>
        <h2 className="mt-3 text-[28px] sm:text-[36px]">How aligners can differ from braces</h2>
        <p className="mt-3 max-w-2xl text-muted text-sm sm:text-base">{comparison.disclaimer}</p>
        <div className="mt-8 overflow-x-auto shadow-sm rounded-2xl border border-line">
          <table className="w-full min-w-[640px] border-collapse bg-white">
            <caption className="sr-only">Illustrative comparison of Alignaa aligners and traditional braces</caption>
            <thead className="bg-teal text-white">
              <tr>
                {comparison.headers.map((header) => (
                  <th key={header} className="text-left p-4 font-heading font-semibold text-sm sm:text-base">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row[0]} className="border-t border-line hover:bg-tint/40 transition">
                  {row.map((cell, index) => (
                    <td key={cell} className={`p-4 text-sm sm:text-base ${index === 0 ? 'font-semibold text-ink' : 'text-muted'}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3">
          <span className="draft-chip">Sample comparison</span>
        </p>
      </div>
    </section>
  )
}

export function Benefits() {
  return (
    <section className="section" id="why-alignaa">
      <div className="container-site">
        <p className="eyebrow">Why Alignaa</p>
        <h2 className="mt-3 text-[28px] sm:text-[36px]">Support around a professional plan</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((item) => (
            <article key={item.title} className="card p-6 rounded-2xl hover:border-teal/40 transition shadow-xs">
              <h3 className="text-xl font-heading font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

{/* Request Point 3: Centered Patient Stories Section */}
export function Reviews() {
  const [index, setIndex] = useState(0)
  const review = reviews[index]

  return (
    <section className="section bg-tint" id="reviews">
      <div className="container-site">
        {/* Centered Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow text-teal">Patient stories</p>
          <h2 className="mt-3 text-[28px] sm:text-[38px] font-heading font-semibold text-ink">What people tell us</h2>
          <p className="mt-3 text-muted text-sm sm:text-base leading-relaxed">
            Real feedback from patients on their journey to a confident, healthy smile.
          </p>
        </div>

        {/* Centered Testimonial Card */}
        <div className="mt-10 card p-8 sm:p-12 max-w-3xl mx-auto text-center shadow-lg border border-line bg-white rounded-3xl relative">
          {/* 5-Star Rating Visual */}
          <div className="flex items-center justify-center gap-1.5 text-amber-500 mb-4" aria-label="5 stars rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="#f59e0b" className="text-amber-500" strokeWidth={0} />
            ))}
          </div>

          <span className="draft-chip mb-4">Sample patient feedback</span>

          <blockquote className="mt-3 text-xl sm:text-2xl font-heading leading-relaxed text-ink font-medium max-w-2xl mx-auto">
            “{review.quote}”
          </blockquote>

          <div className="mt-6 pt-6 border-t border-line/60">
            <p className="font-heading font-bold text-lg text-ink">{review.name}</p>
            <p className="text-sm text-teal font-semibold mt-0.5">{review.treatment || 'Clear Aligner Treatment'}</p>
            <p className="text-xs text-muted mt-1">{review.location}</p>
          </div>

          {/* Centered Carousel Controls & Pagination Dots */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              className="btn btn-secondary min-h-11 px-4 !rounded-full hover:bg-tint cursor-pointer"
              onClick={() => setIndex((value) => (value - 1 + reviews.length) % reviews.length)}
              aria-label="Previous review"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    index === i ? 'w-8 bg-teal' : 'w-2.5 bg-line hover:bg-muted'
                  }`}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              className="btn btn-secondary min-h-11 px-4 !rounded-full hover:bg-tint cursor-pointer"
              onClick={() => setIndex((value) => (value + 1) % reviews.length)}
              aria-label="Next review"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section" id="faq">
      <div className="container-site max-w-4xl">
        <p className="eyebrow">FAQs</p>
        <h2 className="mt-3 text-[28px] sm:text-[36px]">Questions patients usually ask</h2>
        <div className="mt-8 grid gap-3">
          {faqs.map((item, index) => {
            const expanded = open === index
            return (
              <div key={item.q} className="card overflow-hidden rounded-2xl border border-line">
                <h3>
                  <button
                    type="button"
                    className="w-full text-left min-h-14 px-5 py-4 flex items-center justify-between gap-4 bg-transparent cursor-pointer"
                    aria-expanded={expanded}
                    onClick={() => setOpen(expanded ? -1 : index)}
                  >
                    <span className="font-heading font-semibold text-sm sm:text-base text-ink">{item.q}</span>
                    <ChevronDown className={`shrink-0 text-teal transition ${expanded ? 'rotate-180' : ''}`} size={20} />
                  </button>
                </h3>
                {expanded ? <p className="px-5 pb-5 text-sm sm:text-base text-muted leading-relaxed">{item.a}</p> : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

{/* Request Point 4: Recreated Professional Enquiry Section */}
export function Enquiry() {
  return (
    <section className="section bg-near relative" id="enquiry">
      <div className="container-site grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Clinical Reassurance & Trust Pillars */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-teal" />
              Start Your Smile Journey
            </div>
            <h2 className="text-[30px] sm:text-[38px] leading-tight font-heading font-semibold text-ink">
              Tell Us How to Reach You
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
              One simple enquiry. The Alignaa support team will contact you to discuss your dental requirements, answer all your questions, and coordinate your 3D digital scan.
            </p>
          </div>

          {/* Pricing Highlight Pill */}
          <div className="p-4 rounded-2xl bg-tint border border-teal/20 flex items-center justify-between shadow-xs">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted font-bold">Transparent Launch Pricing</p>
              <p className="text-2xl font-heading font-bold text-teal mt-0.5">{site.startingPrice}</p>
            </div>
            <span className="text-xs text-teal font-semibold px-2.5 py-1 rounded-full bg-white border border-teal/20">
              Starting Baseline
            </span>
          </div>

          {/* 4 Professional Reassurance Points */}
          <div className="grid gap-3 pt-2">
            <div className="flex gap-3.5 items-start p-3.5 rounded-2xl bg-white border border-line shadow-xs">
              <div className="p-2 rounded-xl bg-tint text-teal shrink-0">
                <Stethoscope size={18} />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm text-ink">Licensed Doctor Prescription</h4>
                <p className="text-xs text-muted mt-0.5">Every treatment plan is reviewed and prescribed by certified orthodontic professionals.</p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-3.5 rounded-2xl bg-white border border-line shadow-xs">
              <div className="p-2 rounded-xl bg-tint text-teal shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm text-ink">At-Home or Clinic Scan</h4>
                <p className="text-xs text-muted mt-0.5">Flexible 3D scan arranged at your home or at an Alignaa partner clinic.</p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-3.5 rounded-2xl bg-white border border-line shadow-xs">
              <div className="p-2 rounded-xl bg-tint text-teal shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm text-ink">No-Spam Confidentiality</h4>
                <p className="text-xs text-muted mt-0.5">We respect your privacy. No spam, no marketing calls, 100% confidential patient data.</p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-3.5 rounded-2xl bg-white border border-line shadow-xs">
              <div className="p-2 rounded-xl bg-tint text-teal shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm text-ink">Personal Follow-Up</h4>
                <p className="text-xs text-muted mt-0.5">Our dedicated support team will reach out personally to guide you through next steps.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recreated Professional Patient Form */}
        <div className="lg:col-span-7">
          <PatientForm />
        </div>
      </div>
    </section>
  )
}
