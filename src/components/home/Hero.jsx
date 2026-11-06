import { useEffect, useRef, useState } from 'react'
import { Check, Pause, Play, Sparkles, Stethoscope } from 'lucide-react'
import { hero } from '../../content/site'
import { prefersReducedMotion, scrollToId } from '../../lib/scroll'

export function Hero({ variant = 'video-first' }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined
    if (prefersReducedMotion()) {
      video.pause()
      return undefined
    }
    const start = video.play()
    if (start?.then) {
      start.then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
    return undefined
  }, [])

  async function toggle() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      try {
        await video.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  return (
    <section className="relative min-h-[88svh] flex items-center lg:items-end overflow-hidden bg-[#062b2d] text-white">
      {!failed ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={hero.posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
        >
          <source src={hero.videoSrc} type="video/mp4" />
        </video>
      ) : (
        <img src={hero.posterSrc} alt="" className="absolute inset-0 h-full w-full object-cover" />
      )}
      <div className="hero-overlay absolute inset-0" />

      {/* Option B: Structured Clinical Card */}
      {variant === 'structured' && (
        <div className="relative container-site py-12 sm:py-20 max-w-[1180px] w-full z-10">
          <div className="max-w-2xl bg-[#022326]/90 backdrop-blur-md p-6 sm:p-10 rounded-[28px] border border-white/20 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/30 border border-teal/40 text-xs sm:text-sm font-semibold text-tint">
              <Stethoscope size={14} className="text-[#38d4c9]" />
              Doctor-Prescribed Clear Aligners
            </div>
            <h1 className="mt-4 text-[30px] sm:text-[42px] lg:text-[46px] text-white font-heading font-semibold leading-tight">
              {hero.headline}
            </h1>
            <p className="mt-4 text-white/90 text-base sm:text-lg">{hero.supporting}</p>

            <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 py-3 border-y border-white/15 text-xs text-white/80">
              <div>
                <span className="block text-white font-heading font-bold text-sm sm:text-base">₹39,999</span>
                Starting baseline
              </div>
              <div>
                <span className="block text-white font-heading font-bold text-sm sm:text-base">4 Steps</span>
                Enquiry to treatment
              </div>
              <div>
                <span className="block text-white font-heading font-bold text-sm sm:text-base">Doctor Led</span>
                Prescribed planning
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button type="button" className="btn btn-primary" onClick={() => scrollToId('enquiry')}>
                Request a Scan
              </button>
              <button type="button" className="btn btn-ghost" onClick={toggle} aria-pressed={playing}>
                {playing ? <Pause size={18} /> : <Play size={18} />}
                {playing ? 'Pause video' : 'Play video'}
              </button>
            </div>
            <p className="mt-5 text-[11px] text-white/70">{hero.videoCredit}</p>
          </div>
        </div>
      )}

      {/* Option C: Patient Story Led */}
      {variant === 'patient-story' && (
        <div className="relative container-site py-16 sm:py-24 max-w-[1180px] w-full z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-semibold mb-3">
            <Sparkles size={14} className="text-[#facc15]" />
            Real Smile Journeys · Start Yours Today
          </div>
          <h1 className="max-w-3xl text-[32px] sm:text-[46px] lg:text-[52px] text-white font-heading font-semibold leading-tight">
            {hero.headline}
          </h1>
          <p className="mt-4 max-w-xl text-white/90 text-lg">{hero.supporting}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button type="button" className="btn btn-primary" onClick={() => scrollToId('enquiry')}>
              Request a Scan
            </button>
            <button
              type="button"
              className="btn btn-secondary !bg-white/95 hover:!bg-white text-ink border-0"
              onClick={() => scrollToId('results')}
            >
              See Real Results
            </button>
            <button type="button" className="btn btn-ghost" onClick={toggle} aria-pressed={playing}>
              {playing ? <Pause size={18} /> : <Play size={18} />}
              {playing ? 'Pause video' : 'Play video'}
            </button>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-white/85">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-[#38d4c9]" /> Clear & removable trays
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-[#38d4c9]" /> Doctor-prescribed planning
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-[#38d4c9]" /> Transparent starting price ₹39,999
            </span>
          </div>
          <p className="mt-6 text-xs text-white/70 max-w-xl">{hero.videoCredit}</p>
        </div>
      )}

      {/* Option A: Video First (Default) */}
      {variant === 'video-first' && (
        <div className="relative container-site py-16 sm:py-24 max-w-[1180px] w-full z-10">
          <p className="eyebrow text-white/80">Alignaa clear aligners</p>
          <h1 className="mt-4 max-w-3xl text-[32px] sm:text-[46px] lg:text-[52px] text-white font-heading font-semibold leading-tight">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-white/90 text-lg">{hero.supporting}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button type="button" className="btn btn-primary" onClick={() => scrollToId('enquiry')}>
              Request a Scan
            </button>
            <button type="button" className="btn btn-ghost" onClick={toggle} aria-pressed={playing}>
              {playing ? <Pause size={18} /> : <Play size={18} />}
              {playing ? 'Pause video' : 'Play video'}
            </button>
          </div>
          <p className="mt-6 text-xs text-white/70 max-w-xl">{hero.videoCredit}</p>
        </div>
      )}
    </section>
  )
}
