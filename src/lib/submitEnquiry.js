import { trimValue } from './validation'

function timestamp() {
  const now = new Date()
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  return {
    iso: now.toISOString(),
    local: now.toLocaleString('en-IN', { timeZone: timezone, timeZoneName: 'short' }),
    timezone,
  }
}

function payload({ type, values, sourcePage, subject }) {
  const time = timestamp()
  const fields = Object.fromEntries(
    Object.entries(values)
      .filter(([key]) => key !== 'websiteUrl')
      .map(([key, value]) => [key, typeof value === 'boolean' ? String(value) : trimValue(value)]),
  )

  return {
    subject,
    enquiryType: type,
    sourcePage,
    submittedAtIso: time.iso,
    submittedAt: time.local,
    timezone: time.timezone,
    consent: values.consent ? 'Yes' : 'No',
    ...fields,
  }
}

export async function submitEnquiry({ type, values, sourcePage }) {
  if (trimValue(values.websiteUrl)) {
    return { ok: true, honeypot: true }
  }

  const endpoint = trimValue(import.meta.env.VITE_FORM_ENDPOINT)
  const accessKey = trimValue(import.meta.env.VITE_FORM_ACCESS_KEY)
  const subject = type === 'partner' ? 'Alignaa Partner Enquiry' : 'Alignaa Patient Enquiry'
  const body = payload({ type, values, sourcePage, subject })

  if (!endpoint) {
    return { ok: false, pending: true }
  }

  const replyTo = trimValue(values.email)
  const requestBody = {
    ...body,
    _subject: subject,
    subject,
    replyTo,
    reply_to: replyTo,
    from_name: 'Alignaa Website',
  }
  if (accessKey) requestBody.access_key = accessKey

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })

  if (!response.ok) {
    throw new Error(`Form service responded with ${response.status}`)
  }

  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    const data = await response.json()
    if (data.ok === false || data.success === false) {
      throw new Error(data.message || 'Form service rejected the enquiry')
    }
  }

  return { ok: true }
}
