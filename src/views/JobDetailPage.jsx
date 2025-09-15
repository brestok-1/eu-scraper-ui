import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams, Link } from 'react-router-dom'
import { fetchJobById } from '../api/jobs.js'
import { formatDateTime } from '../utils/date.js'

export default function JobDetailPage() {
  const { jobId } = useParams()
  const [job, setJob] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      setIsLoading(true)
      try {
        const api = await fetchJobById(jobId)
        if (!mounted) return
        setJob(api?.data || null)
      } catch (e) {
        if (!mounted) return
        setJob(null)
      } finally {
        if (!mounted) return
        setIsLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [jobId])

  if (isLoading) {
    return (
      <div className="glass p-6 mt-10">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="skeleton h-7 w-64"></div>
            <div className="skeleton h-4 w-80 mt-3"></div>
          </div>
          <span className="skeleton h-6 w-16 rounded-full"></span>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="skeleton h-4 w-24"></div>
            <div className="skeleton h-5 w-40 mt-3"></div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="skeleton h-4 w-24"></div>
            <div className="skeleton h-5 w-32 mt-3"></div>
          </div>
        </div>
        <div className="mt-8 space-y-8">
          <div>
            <div className="skeleton h-5 w-36"></div>
            <div className="space-y-2 mt-3">
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-[90%]"></div>
              <div className="skeleton h-4 w-[85%]"></div>
            </div>
          </div>
          <div>
            <div className="skeleton h-5 w-40"></div>
            <div className="space-y-2 mt-3">
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-[92%]"></div>
              <div className="skeleton h-4 w-[70%]"></div>
            </div>
            <div className="mt-6">
              <span className="skeleton h-9 w-32 inline-block rounded-lg"></span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="glass p-6 mt-10">
        <p className="text-white/70">Job not found.</p>
        <Link to="/" className="inline-block mt-4 text-[var(--color-primary)]">Back to jobs</Link>
      </div>
    )
  }

  return (
    <section className="mt-10">
      <div className="glass p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white/90">{job?.title || '—'}</h1>
            <p className="text-white/70 mt-2">{job?.company || '—'} • {job?.location || '—'}</p>
          </div>
          {Boolean(job?.isTop5) && <span className="px-3 py-1 rounded-full text-xs bg-emerald-400/20 text-emerald-300">Top 5</span>}
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:items-start gap-4 md:gap-8 text-sm">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 w-full md:w-[360px]">
            <div className="text-white/60">Salary</div>
            <div className="mt-1 font-semibold">
              {(() => {
                const s = job?.salary
                if (!s || (s.min == null && s.max == null)) return '—'
                const a = typeof s.min === 'number' ? `€${s.min.toLocaleString()}` : null
                const b = typeof s.max === 'number' ? `€${s.max.toLocaleString()}` : null
                if (a && b) return `${a} - ${b}`
                return a || b || '—'
              })()}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 w-full md:w-[360px]">
            <div className="text-white/60">Inserted</div>
            <div className="mt-1 font-semibold">{job?.datetimeInserted ? formatDateTime(job.datetimeInserted) : '—'}</div>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <div>
            <h3 className="text-xl font-semibold">Description</h3>
            {job?.description ? (
              <div className="prose-md mt-2">
                <ReactMarkdown>{job.description}</ReactMarkdown>
              </div>
            ) : (
              <p className="mt-2 text-white/70">—</p>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold">Requirements</h3>
            {job?.requirements ? (
              <div className="prose-md mt-2">
                <ReactMarkdown>{job.requirements}</ReactMarkdown>
              </div>
            ) : (
              <p className="mt-2 text-white/70">—</p>
            )}
            <div className="mt-6">
              {job?.sourceUrl ? (
                <a href={job.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary)] text-black font-semibold">Open Source</a>
              ) : (
                <span className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white/5 border border-white/10 opacity-50">Open Source</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


