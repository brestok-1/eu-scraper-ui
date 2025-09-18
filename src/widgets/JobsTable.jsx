import React from 'react'
import { formatDateTime, formatDateTimeCompact } from '../utils/date.js'
import { Link } from 'react-router-dom'

export function JobsTable({ jobs, isLoading }) {
  if (isLoading) {
    const skeletonRows = Array.from({ length: 8 })
    return (
      <div className="overflow-x-auto w-full relative z-10">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-black/70">
              <th className="p-3">Title</th>
              <th className="p-3">Company</th>
              <th className="p-3">Location</th>
              <th className="p-3">Salary</th>
              <th className="p-3">Inserted</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {skeletonRows.map((_, idx) => (
              <tr key={idx} className={`border-t border-black/10 ${idx % 2 === 0 ? 'bg-black/[0.02]' : ''}`}>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="skeleton h-4 w-48"></span>
                  </div>
                </td>
                <td className="p-3"><span className="skeleton h-4 w-32"></span></td>
                <td className="p-3"><span className="skeleton h-4 w-24"></span></td>
                <td className="p-3"><span className="skeleton h-4 w-28"></span></td>
                <td className="p-3"><span className="skeleton h-4 w-36"></span></td>
                <td className="p-3 text-right"><span className="skeleton h-7 w-16 inline-block"></span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  function formatSalary(salary) {
    if (!salary || (salary.min == null && salary.max == null)) return '—'
    const a = typeof salary.min === 'number' ? `€${salary.min.toLocaleString()}` : null
    const b = typeof salary.max === 'number' ? `€${salary.max.toLocaleString()}` : null
    if (a && b) return `${a} - ${b}`
    return a || b || '—'
  }

  return (
    <div className="overflow-x-auto w-full relative z-10">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-black/70">
            <th className="p-3">Title</th>
            <th className="p-3">Company</th>
            <th className="p-3">Location</th>
            <th className="p-3">Salary</th>
            <th className="p-3">Inserted</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((j, idx) => (
            <tr key={j?.id ?? idx} className={`border-t border-black/10 ${idx % 2 === 0 ? 'bg-black/[0.02]' : ''} hover:bg-black/[0.05]`}>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  {Boolean(j?.isTop5) && <span className="size-2 rounded-full bg-emerald-400"></span>}
                  <span className="font-medium text-black/90">{j?.title || '—'}</span>
                </div>
              </td>
              <td className="p-3">{j?.company || '—'}</td>
              <td className="p-3">{j?.location || '—'}</td>
              <td className="p-3">{formatSalary(j?.salary)}</td>
              <td className="p-3">{j?.datetimeInserted ? (
                <time dateTime={new Date(j.datetimeInserted).toISOString()} title={formatDateTime(j.datetimeInserted)}>
                  {formatDateTimeCompact(j.datetimeInserted)}
                </time>
              ) : '—'}</td>
              <td className="p-3 text-right">
                {j?.id ? (
                  <Link to={`/job/${j.id}`} className="px-3 py-1 rounded-lg bg-black/5 border border-black/10 hover:border-[var(--color-primary)]">View</Link>
                ) : (
                  <span className="px-3 py-1 rounded-lg bg-black/5 border border-black/10 opacity-50">View</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


