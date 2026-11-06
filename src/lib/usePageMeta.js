import { useEffect } from 'react'

export function usePageMeta({ title, description, path }) {
  useEffect(() => {
    document.title = title
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', `https://alignaa.co${path}`)
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)
  }, [title, description, path])
}
