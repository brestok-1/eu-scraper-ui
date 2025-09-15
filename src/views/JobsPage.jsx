import React from 'react'
import { FiltersBar } from '../widgets/FiltersBar.jsx'
import { JobsTable } from '../widgets/JobsTable.jsx'
import { Pagination } from '../widgets/Pagination.jsx'
import { useJobs } from '../widgets/useJobs.js'

export default function JobsPage() {
  const { jobs, totalJobs, pageIndex, pageCount, pageSize, setPage, setSize, isLoading, lastUpdatedAt, nextPlannedAt, refresh, setFilters, filters, domain, resetFilters, submitFilters } = useJobs()

  return (
    <section id="jobs" className="mt-10">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-semibold">All EU Vacancies</h2>
          <p className="text-sm text-white/70">Advanced scraping for ATS platforms and hyperscalers</p>
        </div>
        <button onClick={refresh} disabled={isLoading} className="px-5 py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary)] text-black font-semibold disabled:opacity-60">Refresh</button>
      </div>

      <div className="mt-6">
        <FiltersBar value={filters} onChange={setFilters} domain={domain} onRefresh={refresh} lastUpdatedAt={lastUpdatedAt} nextPlannedAt={nextPlannedAt} onSubmit={submitFilters} onClear={resetFilters} isLoading={isLoading} />
      </div>

      <div className="mt-6">
        <div className="glass p-2">
          <JobsTable jobs={jobs} isLoading={isLoading} />
          <Pagination pageIndex={pageIndex} pageCount={pageCount} pageSize={pageSize} total={totalJobs} onPageChange={setPage} onSizeChange={setSize} isLoading={isLoading} />
        </div>
      </div>
    </section>
  )
}


