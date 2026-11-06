const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PIN = /^\d{6}$/
const INDIAN_MOBILE = /^[6-9]\d{9}$/
const INTL_MOBILE = /^\+[1-9]\d{7,14}$/

export function trimValue(value) {
  return String(value ?? '').trim()
}

export function digitsOnly(value) {
  return trimValue(value).replace(/\D/g, '')
}

export function validateMobile(raw) {
  const value = trimValue(raw).replace(/[\s-]/g, '')
  if (!value) return 'Enter your mobile number.'
  if (value.startsWith('+')) {
    if (!INTL_MOBILE.test(value)) return 'Enter a valid number with country code, or a 10-digit Indian mobile number.'
    return ''
  }
  const local = value.startsWith('91') && value.length === 12 ? value.slice(2) : value
  if (!INDIAN_MOBILE.test(local)) return 'Enter a 10-digit Indian mobile number, or include a country code such as +91.'
  return ''
}

export function validateEmail(raw, required) {
  const value = trimValue(raw)
  if (!value) return required ? 'Enter your email address.' : ''
  if (!EMAIL.test(value)) return 'Enter a valid email address.'
  return ''
}

export function validatePatient(values) {
  const errors = {}
  const name = trimValue(values.fullName)
  if (!name) errors.fullName = 'Enter your full name.'

  const mobileError = validateMobile(values.mobile)
  if (mobileError) errors.mobile = mobileError

  if (!trimValue(values.ageGroup)) errors.ageGroup = 'Select an age group.'
  if (!trimValue(values.city)) errors.city = 'Enter your city.'

  const pin = trimValue(values.pin)
  if (!PIN.test(pin)) errors.pin = 'Enter a 6-digit Indian PIN code.'

  if (!trimValue(values.concern)) errors.concern = 'Select a teeth concern.'

  const emailError = validateEmail(values.email, false)
  if (emailError) errors.email = emailError

  if (trimValue(values.message).length > 1000) {
    errors.message = 'Please keep your message within 1000 characters.'
  }

  if (!values.consent) errors.consent = 'Please confirm that we may contact you about this enquiry.'
  return errors
}

export function validatePartner(values) {
  const errors = {}
  if (!trimValue(values.fullName)) errors.fullName = 'Enter your full name.'
  if (!trimValue(values.role)) errors.role = 'Select your role.'
  if (!trimValue(values.clinicName)) errors.clinicName = 'Enter your clinic or practice name.'

  const mobileError = validateMobile(values.mobile)
  if (mobileError) errors.mobile = mobileError

  const emailError = validateEmail(values.email, true)
  if (emailError) errors.email = emailError

  if (!trimValue(values.city)) errors.city = 'Enter your city.'
  if (!PIN.test(trimValue(values.pin))) errors.pin = 'Enter a 6-digit Indian PIN code.'

  if (trimValue(values.message).length > 1000) {
    errors.message = 'Please keep your message within 1000 characters.'
  }

  if (!values.consent) errors.consent = 'Please confirm that we may contact you about this enquiry.'
  return errors
}

export function firstErrorKey(errors, order) {
  return order.find((key) => errors[key])
}
