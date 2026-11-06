export function Field({ id, label, error, hint, children, className = '' }) {
  return (
    <div className={`field ${error ? 'has-error' : ''} ${className}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && !error ? <p className="mt-1 text-sm text-muted">{hint}</p> : null}
      {error ? (
        <p className="field-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function ConsentField({ id, error, children }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <div className="flex gap-3 items-start">
        {children}
        <label htmlFor={id} className="!mb-0 font-normal leading-6">
          {null}
        </label>
      </div>
      {error ? (
        <p className="field-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
