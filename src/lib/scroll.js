export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollToId(id) {
  if (typeof document === 'undefined') return
  const node = document.getElementById(id)
  if (!node) return

  const headerOffset = 84
  const elementPosition = node.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset

  window.scrollTo({
    top: Math.max(0, offsetPosition),
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}
