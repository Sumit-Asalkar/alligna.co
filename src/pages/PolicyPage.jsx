import { usePageMeta } from '../lib/usePageMeta'

export function PolicyPage({ document, path }) {
  usePageMeta({
    title: `${document.title} | Alignaa`,
    description: `${document.title} for the Alignaa patient website.`,
    path,
  })
  return (
    <article className="section">
      <div className="container-site max-w-3xl">
        <p className="eyebrow">{document.updated}</p>
        <h1 className="mt-3 text-[32px] sm:text-[40px]">{document.title}</h1>
        {document.sections.map((section) => (
          <section key={section.heading} className="mt-8">
            <h2 className="text-2xl">{section.heading}</h2>
            <p className="mt-3 text-muted">{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
