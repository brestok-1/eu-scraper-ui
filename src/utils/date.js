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


