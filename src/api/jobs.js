import http from './http.js'

export async function fetchJobs({ pageIndex = 0, pageSize = 25 } = {}) {
  const res = await http.get('/api/job/all', { params: { pageIndex, pageSize } })
  return res.data
}

export async function fetchJobById(jobId) {
  const res = await http.get(`/api/job/${encodeURIComponent(jobId)}`)
  return res.data
}

export async function searchJobOptions(field, value) {
  const res = await http.post(`/api/job/option/${encodeURIComponent(field)}/search`, { value })
  return res.data
}

  export async function filterJobs({ filter, pageIndex = 0, pageSize = 25 }) {
  const res = await http.post('/api/job/filter', { filter, pageIndex, pageSize })
  return res.data
}


export async function fetchStatistics() {
  const res = await http.get('/api/job/statistics')
  return res.data
}


