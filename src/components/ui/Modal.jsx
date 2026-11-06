import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'

export function Modal({ open, title, onClose, children }) {
  const dialogRef = useRef(null)
  const lastFocus = useRef(null)
  const titleId = useId()

  useEffect(() => {
    if (!open) return undefined
    lastFocus.current = document.activeElement
    const node = dialogRef.current
    const focusable = node.querySelectorAll(
      'a[href], button:not(:disabled), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    )
    const first = focusable[0]
    first?.focus()

    function onKey(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
      if (event.key !== 'Tab' || focusable.length === 0) return
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      if (lastFocus.current instanceof HTMLElement) lastFocus.current.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
      <button className="absolute inset-0 bg-[#002024]/55" aria-label="Close dialog" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full sm:max-w-lg max-h-[90svh] overflow-auto bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2 id={titleId} className="text-2xl">
            {title}
          </h2>
          <button type="button" className="btn btn-secondary min-h-11 px-3" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
