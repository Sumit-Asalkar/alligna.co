import { useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Hash,
  LoaderCircle,
  Lock,
  Mail,
  MapPin,
  Phone,
  Stethoscope,
  User,
} from 'lucide-react'
import { messages, partnerRoles, site } from '../../content/site'
import { firstErrorKey, validatePartner } from '../../lib/validation'
import { submitEnquiry } from '../../lib/submitEnquiry'

const ORDER = ['fullName', 'role', 'clinicName', 'mobile', 'email', 'city', 'pin', 'message', 'consent']

const empty = {
  fullName: '',
  role: '',
  clinicName: '',
  mobile: '',
  email: '',
  city: '',
  pin: '',
  message: '',
  consent: false,
  websiteUrl: '',
}

export function PartnerForm() {
  const formId = useId()
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const statusRef = useRef(null)

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
    const nextErrors = validatePartner(values)
    setErrors(nextErrors)
    const first = firstErrorKey(nextErrors, ORDER)
    if (first) {
      document.getElementById(`${formId}-${first}`)?.focus()
      return
    }

    setStatus('sending')
    try {
      const result = await submitEnquiry({
        type: 'partner',
        sourcePage: `${window.location.origin}/become-a-partner`,
        values,
      })
      if (result.pending) {
        setStatus('error')
        setStatusMessage(`${messages.failure} ${messages.pendingDelivery}`)
        return
      }
      setStatus('success')
      setStatusMessage(messages.partnerSuccess)
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
            <p className="eyebrow text-teal text-xs">Partner Enquiry Received</p>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-ink">Thank You!</h3>
          </div>
        </div>

        <p className="mt-4 text-muted text-base leading-relaxed">{statusMessage}</p>

        <div className="mt-8 pt-6 border-t border-line grid gap-3">
          <p className="text-sm text-ink font-semibold">Explore professional clinical materials and workflows:</p>
          <a
            className="btn btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2"
            href={site.parentUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>{site.parentLabel}</span>
            <ExternalLink size={16} />
          </a>
        </div>
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
          Partner With Alignaa
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-muted">
          Dentists and dental clinic owners can enquire about clinical collaboration.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className={`field ${errors.fullName ? 'has-error' : ''}`}>
          <label htmlFor={`${formId}-fullName`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink/80">
            <User size={14} className="text-teal" />
            Full Name <span className="text-error">*</span>
          </label>
          <input
            id={`${formId}-fullName`}
            name="fullName"
            type="text"
            placeholder="Dr. Rajesh Patel"
            autoComplete="name"
            value={values.fullName}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={describedBy('fullName')}
            onChange={(e) => update('fullName', e.target.value)}
            className="mt-1 w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-line bg-white text-ink text-sm focus:border-teal focus:ring-2 focus:ring-teal/15 focus:outline-none transition"
          />
          {errors.fullName ? <p className="field-error mt-1 text-xs text-error">{errors.fullName}</p> : null}
        </div>

        <div className={`field ${errors.role ? 'has-error' : ''}`}>
          <label htmlFor={`${formId}-role`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink/80">
            <Stethoscope size={14} className="text-teal" />
            Professional Role <span className="text-error">*</span>
          </label>
          <div className="relative mt-1">
            <select
              id={`${formId}-role`}
              name="role"
              value={values.role}
              aria-invalid={Boolean(errors.role)}
              onChange={(e) => update('role', e.target.value)}
              className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-line bg-white text-ink text-sm appearance-none pr-10 focus:border-teal focus:ring-2 focus:ring-teal/15 focus:outline-none transition cursor-pointer"
            >
              <option value="">Select your role</option>
              {partnerRoles.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          </div>
          {errors.role ? <p className="field-error mt-1 text-xs text-error">{errors.role}</p> : null}
        </div>
      </div>

      <div className={`field ${errors.clinicName ? 'has-error' : ''}`}>
        <label htmlFor={`${formId}-clinicName`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink/80">
          <Building2 size={14} className="text-teal" />
          Clinic or Practice Name <span className="text-error">*</span>
        </label>
        <input
          id={`${formId}-clinicName`}
          name="clinicName"
          type="text"
          placeholder="e.g. SmileCare Dental Clinic"
          value={values.clinicName}
          aria-invalid={Boolean(errors.clinicName)}
          onChange={(e) => update('clinicName', e.target.value)}
          className="mt-1 w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-line bg-white text-ink text-sm focus:border-teal focus:ring-2 focus:ring-teal/15 focus:outline-none transition"
        />
        {errors.clinicName ? <p className="field-error mt-1 text-xs text-error">{errors.clinicName}</p> : null}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
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
              onChange={(e) => update('mobile', e.target.value)}
              className="w-full min-h-[48px] px-3.5 py-2.5 rounded-r-xl border border-line bg-white text-ink text-sm focus:border-teal focus:ring-2 focus:ring-teal/15 focus:outline-none transition"
            />
          </div>
          {errors.mobile ? <p className="field-error mt-1 text-xs text-error">{errors.mobile}</p> : null}
        </div>

        <div className={`field ${errors.email ? 'has-error' : ''}`}>
          <label htmlFor={`${formId}-email`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink/80">
            <Mail size={14} className="text-teal" />
            Email Address <span className="text-error">*</span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="doctor@clinic.com"
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            onChange={(e) => update('email', e.target.value)}
            className="mt-1 w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-line bg-white text-ink text-sm focus:border-teal focus:ring-2 focus:ring-teal/15 focus:outline-none transition"
          />
          {errors.email ? <p className="field-error mt-1 text-xs text-error">{errors.email}</p> : null}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className={`field ${errors.city ? 'has-error' : ''}`}>
          <label htmlFor={`${formId}-city`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink/80">
            <MapPin size={14} className="text-teal" />
            City <span className="text-error">*</span>
          </label>
          <input
            id={`${formId}-city`}
            name="city"
            type="text"
            placeholder="e.g. Mumbai"
            value={values.city}
            aria-invalid={Boolean(errors.city)}
            onChange={(e) => update('city', e.target.value)}
            className="mt-1 w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-line bg-white text-ink text-sm focus:border-teal focus:ring-2 focus:ring-teal/15 focus:outline-none transition"
          />
          {errors.city ? <p className="field-error mt-1 text-xs text-error">{errors.city}</p> : null}
        </div>

        <div className={`field ${errors.pin ? 'has-error' : ''}`}>
          <label htmlFor={`${formId}-pin`} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink/80">
            <Hash size={14} className="text-teal" />
            PIN Code <span className="text-error">*</span>
          </label>
          <input
            id={`${formId}-pin`}
            name="pin"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="6-digit PIN"
            value={values.pin}
            aria-invalid={Boolean(errors.pin)}
            onChange={(e) => update('pin', e.target.value)}
            className="mt-1 w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-line bg-white text-ink text-sm focus:border-teal focus:ring-2 focus:ring-teal/15 focus:outline-none transition"
          />
          {errors.pin ? <p className="field-error mt-1 text-xs text-error">{errors.pin}</p> : null}
        </div>
      </div>

      <div className={`field ${errors.message ? 'has-error' : ''}`}>
        <label htmlFor={`${formId}-message`} className="text-xs font-bold uppercase tracking-wider text-ink/80">
          Clinic Details or Questions <span className="text-muted font-normal text-[11px] lowercase">(optional)</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={3}
          maxLength={1000}
          placeholder="Tell us about your clinic setup, patient volume, or questions about Alignaa treatment systems…"
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          className="mt-1 w-full p-3.5 rounded-xl border border-line bg-white text-ink text-sm focus:border-teal focus:ring-2 focus:ring-teal/15 focus:outline-none transition resize-y min-h-[90px]"
        />
      </div>

      {/* Honeypot Spam Guard */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-websiteUrl`}>Website</label>
        <input
          id={`${formId}-websiteUrl`}
          tabIndex={-1}
          autoComplete="off"
          value={values.websiteUrl}
          onChange={(e) => update('websiteUrl', e.target.value)}
        />
      </div>

      <div className={`field pt-1 ${errors.consent ? 'has-error' : ''}`}>
        <div className="flex gap-3 items-start">
          <input
            id={`${formId}-consent`}
            type="checkbox"
            className="mt-0.5 h-5 w-5 accent-teal rounded border-line cursor-pointer"
            checked={values.consent}
            onChange={(e) => update('consent', e.target.checked)}
          />
          <label htmlFor={`${formId}-consent`} className="!mb-0 font-normal text-xs sm:text-sm text-ink/90 leading-relaxed cursor-pointer">
            I agree that the Alignaa team may contact me about this partnership enquiry. I have read the{' '}
            <Link to="/privacy" className="text-teal font-semibold underline underline-offset-2">
              Privacy Policy
            </Link>.
          </label>
        </div>
        {errors.consent ? <p className="field-error mt-1 text-xs text-error">{errors.consent}</p> : null}
      </div>

      {status === 'error' ? (
        <div ref={statusRef} tabIndex={-1} role="alert" className="rounded-2xl bg-[#fdecec] text-[#b42318] p-4 text-xs sm:text-sm border border-red-200">
          <p className="font-semibold">Unable to submit partnership enquiry</p>
          <p className="mt-0.5">{statusMessage}</p>
        </div>
      ) : null}

      <div className="pt-2">
        <button
          className="btn btn-primary w-full text-base py-4 shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
          type="submit"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? <LoaderCircle className="animate-spin" size={20} /> : null}
          <span>{status === 'sending' ? 'Sending Enquiry…' : 'Send Partnership Enquiry'}</span>
          {status !== 'sending' ? <ArrowRight size={18} /> : null}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-[11px] text-muted pt-1">
        <Lock size={12} className="text-teal" />
        <span>Confidential Practitioner Data · No Spam Policy</span>
      </div>
    </form>
  )
}
