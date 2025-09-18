import React from 'react'

export function JobsFilters({ value, onChange }) {
  const companies = ['all', 'Meta', 'AWS']
  const locations = ['all', 'Dublin, IE', 'Amsterdam, NL', 'Frankfurt, DE', 'Warsaw, PL']

  function set(partial) { onChange({ ...value, ...partial }) }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-black/60">Search</label>
        <input value={value.query} onChange={e => set({ query: e.target.value })} placeholder="Title, company, location" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/5 border border-black/10 outline-none focus:border-[var(--color-primary)]" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-black/60">Company</label>
          <select value={value.company} onChange={e => set({ company: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-lg bg-black/5 border border-black/10">
            {companies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-black/60">Location</label>
          <select value={value.location} onChange={e => set({ location: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-lg bg-black/5 border border-black/10">
            {locations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input id="top5" type="checkbox" checked={value.top} onChange={e => set({ top: e.target.checked })} className="size-4" />
        <label htmlFor="top5" className="text-sm">Top 5</label>
      </div>
    </div>
  )
}



