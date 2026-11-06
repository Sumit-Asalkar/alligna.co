import { useState } from 'react'
import { CheckCircle2, ChevronRight, Info, Sparkles, Stethoscope, Video } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { DESIGN_OPTIONS } from '../../content/designOptions'

const ICONS = {
  a: Video,
  b: Stethoscope,
  c: Sparkles,
}

export function DesignSwitcher({ activeOption = 'a', onSelectOption }) {
  const [modalOpen, setModalOpen] = useState(false)
  const activeData = DESIGN_OPTIONS[activeOption] || DESIGN_OPTIONS.a

  return (
    <>
      <div className="bg-[#fff9f0] border-b border-[#f0dec2] text-ink text-xs sm:text-sm py-2 px-3 sm:px-4">
        <div className="container-site flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#8a5a12] flex items-center gap-1.5 shrink-0">
              <span className="inline-block w-2 h-2 rounded-full bg-[#e68a00] animate-pulse" />
              Design Prototype Preview:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {Object.values(DESIGN_OPTIONS).map((opt) => {
                const isSelected = activeOption === opt.id
                const Icon = ICONS[opt.id] || Video
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onSelectOption(opt.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                      isSelected
                        ? 'bg-teal text-white shadow-sm'
                        : 'bg-white border border-[#e0cbb0] text-[#6d4f24] hover:bg-[#faedd8]'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <Icon size={13} />
                    <span>{opt.shortLabel}</span>
                    <span className="hidden lg:inline text-[11px] opacity-90 font-normal">
                      ({opt.id === 'a' ? 'Video First' : opt.id === 'b' ? 'Clinical' : 'Story Led'})
                    </span>
                    {isSelected ? <CheckCircle2 size={12} className="ml-0.5" /> : null}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-[11px] text-muted hidden sm:inline">
              Active: <strong className="text-ink">{activeData.label}</strong>
            </span>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-teal hover:text-teal-dark underline underline-offset-2"
            >
              <Info size={13} />
              Compare 3 Options & Brief Specs
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={modalOpen}
        title="Alignaa Website: 3 Comparable Design Options"
        onClose={() => setModalOpen(false)}
      >
        <div className="space-y-6 text-sm">
          <div className="p-4 rounded-xl bg-tint border border-teal/20 text-ink">
            <p className="font-heading font-semibold text-teal text-base">Section 10 Implementation Note</p>
            <p className="mt-1 text-muted text-xs leading-relaxed">
              All 3 options follow the exact same Alignaa brand identity, teal/white visual tokens, Montserrat + Open
              Sans fonts, starting baseline price of <strong>₹39,999</strong>, central content data (`src/content/site.js`),
              and the single patient enquiry form routed to `#enquiry`. Toggle between them live using the banner buttons.
            </p>
          </div>

          <div className="grid gap-4">
            {Object.values(DESIGN_OPTIONS).map((opt) => {
              const isSelected = activeOption === opt.id
              const Icon = ICONS[opt.id] || Video
              return (
                <div
                  key={opt.id}
                  className={`p-4 rounded-xl border transition ${
                    isSelected ? 'border-teal bg-teal/5 ring-1 ring-teal' : 'border-line bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-teal text-white">
                        <Icon size={16} />
                      </span>
                      <h4 className="font-heading font-bold text-base text-ink">{opt.label}</h4>
                      <span className="draft-chip text-[11px]">{opt.badge}</span>
                    </div>
                    {isSelected ? (
                      <span className="text-xs font-bold text-teal flex items-center gap-1">
                        <CheckCircle2 size={14} /> Currently Active
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          onSelectOption(opt.id)
                          setModalOpen(false)
                        }}
                        className="btn btn-secondary !min-h-[32px] !py-1 !px-3 text-xs"
                      >
                        Switch to this option
                      </button>
                    )}
                  </div>

                  <p className="mt-2 text-xs font-medium text-ink">{opt.tagline}</p>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    <strong>Design Rationale:</strong> {opt.rationale}
                  </p>

                  <div className="mt-3 pt-3 border-t border-line/60">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-teal">Section Flow & Order:</p>
                    <ul className="mt-1.5 grid gap-1 text-xs text-muted">
                      {opt.sectionOrder.map((step) => (
                        <li key={step} className="flex items-start gap-1.5">
                          <ChevronRight size={12} className="shrink-0 mt-0.5 text-teal" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="p-4 rounded-xl bg-near border border-line">
            <h4 className="font-heading font-semibold text-ink text-sm">Key Forms & Routes Summary</h4>
            <ul className="mt-2 grid gap-1.5 text-xs text-muted">
              <li>• <strong>Single Patient Enquiry Form:</strong> Located at `/#enquiry`. Used across all 3 options. Validates full name, mobile (10-digit Indian / +country code), age group, teeth concern, city, 6-digit PIN code, optional email, message, and mandatory contact consent. Anti-spam honeypot included.</li>
              <li>• <strong>Dedicated Partner Page:</strong> Located at `/become-a-partner`. Features practice partnership info, dedicated partner form, and persistent link to `https://alignaa.in/` before & after submission.</li>
              <li>• <strong>Delivery Configuration:</strong> Both forms target the same inbox endpoint configured via `VITE_FORM_ENDPOINT`. When unconfigured, graceful pending notice is presented without claiming delivery.</li>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  )
}
