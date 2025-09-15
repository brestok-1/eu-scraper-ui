import { useEffect, useMemo, useState } from 'react'
import { fetchJobs, filterJobs, fetchStatistics } from '../api/jobs.js'
import { formatDateTime } from '../utils/date.js'

export const INITIAL_FILTERS = {
  titles: [],
  companies: [],
  locations: [],
  salaryMin: '',
  salaryMax: '',
  top: false,
  dateFrom: null,
  dateTo: null,
}

export function useJobs() {
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [lastUpdatedAt, setLastUpdatedAt] = useState(formatDateTime(new Date()))
  const [nextPlannedAt, setNextPlannedAt] = useState(formatDateTime(new Date(Date.now() + 6 * 36e5)))
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(25)
  const [totalJobs, setTotalJobs] = useState(0)
  const [serverFilter, setServerFilter] = useState(null)

  async function load() {
    setIsLoading(true)
    try {
      let api
      if (serverFilter) {
        api = await filterJobs({ filter: serverFilter, pageIndex, pageSize })
      } else {
        api = await fetchJobs({ pageIndex, pageSize })
      }
      const payload = api?.data
      const items = payload?.data || []
      const paging = payload?.paging || {}
      setJobs(items)
      setTotalJobs(Number(paging.totalCount) || 0)
      try {
        const stats = await fetchStatistics()
        const last = stats?.data?.lastUpdate
        const next = stats?.data?.nextUpdate
        setLastUpdatedAt(last ? formatDateTime(last) : formatDateTime(new Date()))
        setNextPlannedAt(next ? formatDateTime(next) : formatDateTime(new Date(Date.now() + 6 * 36e5)))
      } catch (_) {
        setLastUpdatedAt(formatDateTime(new Date()))
        setNextPlannedAt(formatDateTime(new Date(Date.now() + 6 * 36e5)))
      }
    } catch (e) {
      setJobs([])
      setTotalJobs(0)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [pageIndex, pageSize, serverFilter])

  const pageCount = useMemo(() => Math.max(1, Math.ceil((totalJobs || 0) / pageSize)), [totalJobs, pageSize])

  function setPage(newIndex) {
    const clamped = Math.max(0, Math.min(newIndex, pageCount - 1))
    setPageIndex(clamped)
  }

  function setSize(newSize) {
    setPageSize(newSize)
    setPageIndex(0)
  }

  function refresh() {
    load()
  }

  function buildServerFilter() {
    const filter = {}
    if (filters.titles && filters.titles.length) filter.titles = filters.titles
    if (filters.companies && filters.companies.length) filter.companies = filters.companies
    if (filters.locations && filters.locations.length) filter.locations = filters.locations
    if (filters.salaryMin !== '' && !Number.isNaN(Number(filters.salaryMin))) filter.minSalary = Number(filters.salaryMin)
    if (filters.salaryMax !== '' && !Number.isNaN(Number(filters.salaryMax))) filter.maxSalary = Number(filters.salaryMax)
    if (filters.top) filter.isTop5 = true
    if (filters.dateFrom) filter.minDate = new Date(filters.dateFrom).toISOString().slice(0, 10)
    if (filters.dateTo) filter.maxDate = new Date(filters.dateTo).toISOString().slice(0, 10)
    return filter
  }

  function submitFilters() {
    const f = buildServerFilter()
    setServerFilter(Object.keys(f).length ? f : null)
    setPageIndex(0)
  }

  const domain = useMemo(() => {
    const unique = (arr) => Array.from(new Set(arr)).sort()
    return {
      titles: unique(jobs.map(j => j.title)),
      companies: unique(jobs.map(j => j.company)),
      locations: unique(jobs.map(j => j.location)),
    }
  }, [jobs])

  function resetFilters() {
    setFilters(INITIAL_FILTERS)
    setServerFilter(null)
    setPageIndex(0)
  }

  return { jobs, totalJobs, pageIndex, pageCount, pageSize, setPage, setSize, isLoading, lastUpdatedAt, nextPlannedAt, refresh, setFilters, filters, domain, resetFilters, submitFilters }
}


