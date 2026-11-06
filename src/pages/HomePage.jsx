import { useOutletContext, useSearchParams } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import { Hero } from '../components/home/Hero'
import {
  Benefits,
  Comparison,
  Concerns,
  Enquiry,
  Faq,
  Pricing,
  Process,
  Results,
  Reviews,
  TreatmentOffer,
} from '../components/home/HomeSections'

export function HomePage() {
  const context = useOutletContext()
  const [searchParams] = useSearchParams()
  const rawOption = (
    context?.activeOption ||
    searchParams.get('option') ||
    searchParams.get('design') ||
    'a'
  ).toLowerCase()
  const option = ['a', 'b', 'c'].includes(rawOption) ? rawOption : 'a'

  usePageMeta({
    title: 'Alignaa | Clear aligners starting at ₹39,999',
    description:
      'Alignaa clear aligners starting at ₹39,999. Request a scan and the Alignaa support team will guide you through the next steps.',
    path: '/',
  })

  // Option B: Clinical and structured
  if (option === 'b') {
    return (
      <>
        <Hero variant="structured" />
        <Benefits />
        <Process />
        <Results />
        <TreatmentOffer />
        <Concerns />
        <Comparison />
        <Reviews />
        <Faq />
        <Enquiry />
      </>
    )
  }

  // Option C: Patient story led
  if (option === 'c') {
    return (
      <>
        <Hero variant="patient-story" />
        <Results />
        <Reviews />
        <TreatmentOffer />
        <Concerns />
        <Process />
        <Benefits />
        <Pricing />
        <Comparison />
        <Faq />
        <Enquiry />
      </>
    )
  }

  // Option A: Video first (Baseline & Primary Selection)
  return (
    <>
      <Hero variant="video-first" />
      <TreatmentOffer />
      <Process />
      <Concerns />
      <Results />
      <Pricing />
      <Comparison />
      <Benefits />
      <Reviews />
      <Faq />
      <Enquiry />
    </>
  )
}
