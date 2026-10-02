'use client'

import { FormEvent, useState } from 'react'
import { CheckCircle2, ClipboardList, Loader2, Send } from 'lucide-react'
import { createRequest } from '@/lib/request-data'

export function RequestForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [date, setDate] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await createRequest({ name: name.trim(), details: details.trim(), date })
      setSubmitted(true)
      setName(''); setDetails(''); setDate('')
    } catch { setError('We could not submit your request. Please try again.') } finally { setLoading(false) }
  }

  return <main className="min-h-screen bg-[#f5faff] text-[#123b68]">
    <header className="bg-[#07549d] text-white"><div className="mx-auto flex max-w-7xl items-center px-6 py-5 sm:px-10"><a href="/" className="flex items-center gap-4" aria-label="Request Tracker home"><span className="flex size-11 items-center justify-center rounded-full bg-white/15"><ClipboardList aria-hidden="true" /></span><span><strong className="block text-lg leading-5">Request Tracker</strong><span className="text-sm text-blue-100">Submit a request and follow its status online</span></span></a></div></header>
    <section className="flex min-h-[calc(100vh-146px)] items-start justify-center px-5 py-12 sm:py-16"><div className="w-full max-w-[540px]">
      <div className="mb-7"><p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#1874c5]">Service request portal</p><h1 className="text-4xl font-bold tracking-tight text-[#0b478a]">New Request</h1><p className="mt-3 text-base leading-7 text-[#52739a]">Fill out the form below to submit a new request for tracking.</p></div>
      <div className="rounded-2xl border border-[#d8e5f0] bg-white p-6 shadow-[0_18px_50px_rgba(20,82,135,0.10)] sm:p-8">{submitted ? <div className="flex flex-col items-center py-8 text-center"><span className="mb-5 flex size-16 items-center justify-center rounded-full bg-[#e7f5ee] text-[#1b8a5a]"><CheckCircle2 className="size-8" /></span><h2 className="text-2xl font-bold text-[#123b68]">Request received</h2><p className="mt-2 max-w-sm leading-7 text-[#52739a]">Your request has been added to the review queue.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-7 rounded-lg bg-[#0759a8] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#064b8d]">Submit another request</button></div> : <form onSubmit={handleSubmit} className="flex flex-col gap-5"><div className="grid gap-5 sm:grid-cols-2"><label className="flex flex-col gap-2 text-sm font-semibold">Submitted by<input required value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-lg border border-[#c9ddeb] bg-white px-4 font-normal outline-none focus:border-[#1874c5] focus:ring-4 focus:ring-[#1874c5]/10" placeholder="Your full name" /></label><label className="flex flex-col gap-2 text-sm font-semibold">Date<input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-12 rounded-lg border border-[#c9ddeb] bg-white px-4 font-normal outline-none focus:border-[#1874c5] focus:ring-4 focus:ring-[#1874c5]/10" /></label></div><label className="flex flex-col gap-2 text-sm font-semibold">Description<textarea required value={details} onChange={(e) => setDetails(e.target.value)} rows={4} className="resize-none rounded-lg border border-[#c9ddeb] bg-white px-4 py-3 font-normal outline-none placeholder:text-[#86a3bf] focus:border-[#1874c5] focus:ring-4 focus:ring-[#1874c5]/10" placeholder="Describe your request..." /></label>{error && <p role="alert" className="text-sm font-medium text-red-600">{error}</p>}<button disabled={loading} type="submit" className="flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0759a8] text-sm font-bold text-white shadow-[0_7px_16px_rgba(7,89,168,0.22)] transition hover:bg-[#064b8d] disabled:cursor-not-allowed disabled:opacity-70">{loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />} {loading ? 'Submitting...' : 'Submit request'}</button></form>}</div>
      <p className="mt-5 text-center text-xs text-[#7897b5]">We usually respond within 1–2 business days. <a href="/admin" className="font-semibold text-[#176db5] hover:underline">Admin view</a></p>
    </div></section><footer className="border-t border-[#dceaf5] bg-[#eaf5fc] px-6 py-5 text-center text-sm text-[#52739a]">Request Tracker · Submissions are reviewed and status is updated here.</footer>
  </main>
}
