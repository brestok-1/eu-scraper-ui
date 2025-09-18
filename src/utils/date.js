export function formatDateTime(input) {
  if (!input) return ''
  const date = input instanceof Date ? input : new Date(input)
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short', timeZone: tz }).format(date)
}

export function formatDate(input) {
  if (!input) return ''
  const date = input instanceof Date ? input : new Date(input)
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeZone: tz }).format(date)
}

export function formatDateTimeCompact(input) {
  if (!input) return ''
  const d = input instanceof Date ? input : new Date(input)
  const pad = (n) => String(n).padStart(2, '0')
  const y = d.getFullYear()
  const m = pad(d.getMonth() + 1)
  const day = pad(d.getDate())
  const hh = pad(d.getHours())
  const mm = pad(d.getMinutes())
  return `${y}-${m}-${day} ${hh}:${mm}`
}


