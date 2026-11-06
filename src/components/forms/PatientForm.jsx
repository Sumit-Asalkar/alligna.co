import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Hash,
  LoaderCircle,
  Lock,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  User,
} from 'lucide-react'
import { messages, patientAgeGroups, site, teethConcernOptions } from '../../content/site'
import { firstErrorKey, validatePatient } from '../../lib/validation'
import { submitEnquiry } from '../../lib/submitEnquiry'

const ORDER = ['fullName', 'mobile', 'ageGroup', 'city', 'pin', 'concern', 'email', 'message', 'consent']

const empty = {
  fullName: '',
  mobile: '',
  ageGroup: '',
  city: '',
  pin: '',
  concern: '',
  email: '',
  message: '',
  consent: false,
  websiteUrl: '',
}

export function PatientForm({ initialConcern = '', planInterest = '' }) {
  const formId = useId()
  const [values, setValues] = useState({ ...empty, concern: initialConcern })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const statusRef = useRef(null)

  useEffect(() => {
    function onConcern(event) {
      const next = event.detail
      if (!next) return
      setValues((current) => ({ ...current, concern: next }))
    }
    window.addEventListener('alignaa:set-concern', onConcern)
    return () => window.removeEventListener('alignaa:set-concern', onConcern)
  }, [])

  function update(name, value) {
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  function describedBy(name) {
    return errors[name] ? `${formId}-${name}-error` : undefined
  }

  async function onSubmit(event) {
    event.preventDefault()
    const nextErrors = validatePatient(values)
    setErrors(nextErrors)
    const first = firstErrorKey(nextErrors, ORDER)
    if (first) {
      document.getElementById(`${formId}-${first}`)?.focus()
      return
    }

    setStatus('sending')
    setStatusMessage('Sending your enquiry…')
    try {
      const result = await submitEnquiry({
        type: 'patient',
        sourcePage: `${window.location.origin}${window.location.pathname}`,
        values: { ...values, planInterest },
      })
      if (result.pending) {
        setStatus('error')
        setStatusMessage(`${messages.failure} ${messages.pendingDelivery}`)
        return
      }
      setStatus('success')
      setStatusMessage(messages.patientSuccess)
      setValues(empty)
      setErrors({})
    } catch {
      setStatus('error')
      setStatusMessage(messages.failure)
    } finally {
      requestAnimationFrame(() => statusRef.current?.focus())
    }
  }

  if (status === 'success') {
    return (
      <div
        className="card p-8 sm:p-10 shadow-xl border border-teal/30 bg-white rounded-3xl animate-in fade-in"
        role="status"
        tabIndex={-1}
        ref={statusRef}
      >
        <div className="flex items-center gap-3 text-teal">
          <div className="p-3 rounded-2xl bg-tint text-teal">
            <CheckCircle2 size={32} />
          </div>
          <div>
            <p className="eyebrow text-teal text-xs">Enquiry Received</p>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-ink">Thank You!</h3>
          </div>
        </div>

        <p className="mt-4 text-muted text-base leading-relaxed">{statusMessage}</p>

        <div className="mt-8 pt-6 border-t border-line grid gap-4">
          <h4 className="font-heading font-semibold text-sm text-ink uppercase tracking-wider">
            What Happens Next:
          </h4>
          <ol className="grid gap-3 text-sm text-muted">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal text-white font-bold text-xs">
                1
              </span>
              <span>Our clinical coordinator reviews your submitted teeth concern.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal text-white font-bold text-xs">
                2
              </span>
              <span>We contact you via call or WhatsApp to confirm your scan appointment.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal text-white font-bold text-xs">
                3
              </span>
              <span>A licensed orthodontist prepares your personalized 3D treatment plan.</span>
            </li>
          </ol>
        </div>

        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="btn btn-secondary mt-8 w-full sm:w-auto"
        >
          Submit another enquiry
        </button>
      </div>
    )
  }

  return (
    <form
      className="card p-6 sm:p-10 shadow-xl border border-line bg-white rounded-3xl grid gap-5 relative"
      onSubmit={onSubmit}
      noValidate
    >
      <div className="border-b border-line pb-4">
        <h3 className="text-xl sm:text-2xl font-heading font-bold text-ink">
          Request a Scan & Consultation
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-muted">
          Fill in your details below. Starting at <strong className="text-teal font-heading font-bold">{site.startingPrice}</strong>.
        </p>
      </div>

      {/* Row 1: Full Name & Mobile Number */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className={`field ${errors.fullName ? 'has-error' : ''}`}>
          <label htmlFor={`${formId}-fullName`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink/80">
            <User size={14} className="text-teal" />
            Full Name <span className="text-error">*</span>
          </label>
          <div className="relative mt-1">
            <input
              id={`${formId}-fullName`}
              name="fullName"
              type="text"
              placeholder="e.g. Rahul Sharma"
              autoComplete="name"
              value={values.fullName}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={describedBy('fullName')}
              onChange={(e) => update('fullName', e.target.value)}
              className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-line bg-white text-ink text-sm focus:border-teal focus:ring-2 focus:ring-teal/15 focus:outline-none transition"
            />
          </div>
          {errors.fullName ? (
            <p className="field-error mt-1 text-xs text-error" id={`${formId}-fullName-error`} role="alert">
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <div className={`field ${errors.mobile ? 'has-error' : ''}`}>
          <label htmlFor={`${formId}-mobile`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink/80">
            <Phone size={14} className="text-teal" />
            Mobile Number <span className="text-error">*</span>
          </label>
          <div className="relative mt-1 flex">
            <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-line bg-tint text-teal font-semibold text-xs shrink-0">
              🇮🇳 +91
            </span>
            <input
              id={`${formId}-mobile`}
              name="mobile"
              type="tel"
              inputMode="tel"
              placeholder="9876543210"
              autoComplete="tel"
              value={values.mobile}
              aria-invalid={Boolean(errors.mobile)}
              aria-describedby={describedBy('mobile')}
              onChange={(e) => update('mobile', e.target.value)}
              className="w-full min-h-[48px] px-3.5 py-2.5 rounded-r-xl border border-line bg-white text-ink text-sm focus:border-teal focus:ring-2 focus:ring-teal/15 focus:outline-none transition"
            />
          </div>
          {errors.mobile ? (
            <p className="field-error mt-1 text-xs text-error" id={`${formId}-mobile-error`} role="alert">
              {errors.mobile}
            </p>
          ) : (
            <p className="mt-1 text-[11px] text-muted">10-digit mobile or international code.</p>
          )}
        </div>
      </div>

      {/* Row 2: Age Group & Teeth Concern */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className={`field ${errors.ageGroup ? 'has-error' : ''}`}>
          <label htmlFor={`${formId}-ageGroup`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink/80">
            <Clock size={14} className="text-teal" />
            Age Group <span className="text-error">*</span>
          </label>
          <div className="relative mt-1">
            <select
              id={`${formId}-ageGroup`}
              name="ageGroup"
              value={values.ageGroup}
              aria-invalid={Boolean(errors.ageGroup)}
              onChange={(e) => update('ageGroup', e.target.value)}
              className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-line bg-white text-ink text-sm appearance-none pr-10 focus:border-teal focus:ring-2 focus:ring-teal/15 focus:outline-none transition cursor-pointer"
            >
              <option value="">Select your age group</option>
              {patientAgeGroups.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          </div>
          {errors.ageGroup ? (
            <p className="field-error mt-1 text-xs text-error" id={`${formId}-ageGroup-error`} role="alert">
              {errors.ageGroup}
            </p>
          ) : null}
        </div>

        <div className={`field ${errors.concern ? 'has-error' : ''}`}>
          <label htmlFor={`${formId}-concern`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink/80">
            <Sparkles size={14} className="text-teal" />
            Teeth Concern <span className="text-error">*</span>
          </label>
          <div className="relative mt-1">
            <select
              id={`${formId}-concern`}
              name="concern"
              value={values.concern}
              aria-invalid={Boolean(errors.concern)}
              onChange={(e) => update('concern', e.target.value)}
              className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-line bg-white text-ink text-sm appearance-none pr-10 focus:border-teal focus:ring-2 focus:ring-teal/15 focus:outline-none transition cursor-pointer"
            >
              <option value="">Select your concern</option>
              {teethConcernOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          </div>
          {errors.concern ? (
            <p className="field-error mt-1 text-xs text-error" id={`${formId}-concern-error`} role="alert">
              {errors.concern}
            </p>
          ) : null}
        </div>
      </div>

      {/* Row 3: City & PIN Code */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className={`field ${errors.city ? 'has-error' : ''}`}>
          <label htmlFor={`${formId}-city`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink/80">
            <MapPin size={14} className="text-teal" />
            City <span className="text-error">*</span>
          </label>
          <div className="relative mt-1">
            <input
              id={`${formId}-city`}
              name="city"
              type="text"
              placeholder="e.g. Pune"
              autoComplete="address-level2"
              value={values.city}
              aria-invalid={Boolean(errors.city)}
              onChange={(e) => update('city', e.target.value)}
              className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-line bg-white text-ink text-sm focus:border-teal focus:ring-2 focus:ring-teal/15 focus:outline-none transition"
            />
          </div>
          {errors.city ? (
            <p className="field-error mt-1 text-xs text-error" id={`${formId}-city-error`} role="alert">
              {errors.city}
            </p>
          ) : null}
        </div>

        <div className={`field ${errors.pin ? 'has-error' : ''}`}>
          <label htmlFor={`${formId}-pin`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink/80">
            <Hash size={14} className="text-teal" />
            PIN Code <span className="text-error">*</span>
          </label>
          <div className="relative mt-1">
            <input
              id={`${formId}-pin`}
              name="pin"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="6-digit PIN (e.g. 411001)"
              autoComplete="postal-code"
              value={values.pin}
              aria-invalid={Boolean(errors.pin)}
              onChange={(e) => update('pin', e.target.value)}
              className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-line bg-white text-ink text-sm focus:border-teal focus:ring-2 focus:ring-teal/15 focus:outline-none transition"
            />
          </div>
          {errors.pin ? (
            <p className="field-error mt-1 text-xs text-error" id={`${formId}-pin-error`} role="alert">
              {errors.pin}
            </p>
          ) : null}
        </div>
      </div>

      {/* Row 4: Email (Optional) */}
      <div className={`field ${errors.email ? 'has-error' : ''}`}>
        <label htmlFor={`${formId}-email`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink/80">
          <Mail size={14} className="text-teal" />
          Email Address <span className="text-muted font-normal text-[11px] lowercase">(optional)</span>
        </label>
        <div className="relative mt-1">
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            onChange={(e) => update('email', e.target.value)}
            className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-line bg-white text-ink text-sm focus:border-teal focus:ring-2 focus:ring-teal/15 focus:outline-none transition"
          />
        </div>
        {errors.email ? (
          <p className="field-error mt-1 text-xs text-error" id={`${formId}-email-error`} role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      {/* Row 5: Message (Optional) */}
      <div className={`field ${errors.message ? 'has-error' : ''}`}>
        <div className="flex items-center justify-between">
          <label htmlFor={`${formId}-message`} className="text-xs font-bold uppercase tracking-wider text-ink/80">
            Additional Notes or Questions <span className="text-muted font-normal text-[11px] lowercase">(optional)</span>
          </label>
          <span className="text-[11px] text-muted">{values.message.length}/1000</span>
        </div>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={3}
          maxLength={1000}
          placeholder="Tell us any specific concerns or questions you would like our doctors to know…"
          value={values.message}
          aria-invalid={Boolean(errors.message)}
          onChange={(e) => update('message', e.target.value)}
          className="mt-1 w-full p-3.5 rounded-xl border border-line bg-white text-ink text-sm focus:border-teal focus:ring-2 focus:ring-teal/15 focus:outline-none transition resize-y min-h-[90px]"
        />
        {errors.message ? (
          <p className="field-error mt-1 text-xs text-error" id={`${formId}-message-error`} role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot Spam Guard */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-websiteUrl`}>Website</label>
        <input
          id={`${formId}-websiteUrl`}
          name="websiteUrl"
          tabIndex={-1}
          autoComplete="off"
          value={values.websiteUrl}
          onChange={(e) => update('websiteUrl', e.target.value)}
        />
      </div>

      {/* Row 6: Consent Checkbox */}
      <div className={`field pt-1 ${errors.consent ? 'has-error' : ''}`}>
        <div className="flex gap-3 items-start">
          <input
            id={`${formId}-consent`}
            name="consent"
            type="checkbox"
            className="mt-0.5 h-5 w-5 accent-teal rounded border-line cursor-pointer"
            checked={values.consent}
            aria-invalid={Boolean(errors.consent)}
            onChange={(e) => update('consent', e.target.checked)}
          />
          <label htmlFor={`${formId}-consent`} className="!mb-0 font-normal text-xs sm:text-sm text-ink/90 leading-relaxed cursor-pointer">
            I agree that the Alignaa team may contact me via phone, WhatsApp, or email about this enquiry. I have read and agree to the{' '}
            <Link to="/privacy" className="text-teal font-semibold underline underline-offset-2">
              Privacy Policy
            </Link>.
          </label>
        </div>
        {errors.consent ? (
          <p className="field-error mt-1.5 text-xs text-error font-medium" role="alert">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {/* Status Alert */}
      {status === 'error' ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="rounded-2xl bg-[#fdecec] text-[#b42318] p-4 text-xs sm:text-sm border border-red-200"
        >
          <p className="font-semibold">Unable to submit enquiry</p>
          <p className="mt-0.5">{statusMessage}</p>
        </div>
      ) : null}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          className="btn btn-primary w-full text-base py-4 shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
          type="submit"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? <LoaderCircle className="animate-spin" size={20} /> : null}
          <span>{status === 'sending' ? 'Submitting Enquiry…' : 'Request a Scan Now'}</span>
          {status !== 'sending' ? <ArrowRight size={18} /> : null}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-[11px] text-muted pt-1">
        <Lock size={12} className="text-teal" />
        <span>100% Secure & Confidential · No Payment Required to Enquire</span>
      </div>
    </form>
  )
}
