import React from 'react'

export function Pagination({ pageIndex, pageCount, pageSize, total, onPageChange, onSizeChange, isLoading }) {
  const canPrev = pageIndex > 0
  const canNext = pageIndex < pageCount - 1
  const sizes = [10, 25, 50, 100]

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-2 py-3">
      <div className="text-sm text-white/70">
        {isLoading ? (
          <span className="skeleton h-4 w-40 inline-block"></span>
        ) : (
          `${Math.min(pageIndex * pageSize + 1, total)}–${Math.min((pageIndex + 1) * pageSize, total)} of ${total}`
        )}
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-white/70">Rows per page</label>
        <select value={pageSize} onChange={e => onSizeChange(Number(e.target.value))} disabled={isLoading} className="h-[36px] px-2 rounded-md bg-white/5 border border-white/10 disabled:opacity-60">
          {sizes.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="ml-2 flex items-center gap-2">
          <button onClick={() => onPageChange(0)} disabled={!canPrev || isLoading} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 disabled:opacity-40">«</button>
          <button onClick={() => onPageChange(pageIndex - 1)} disabled={!canPrev || isLoading} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 disabled:opacity-40">‹</button>
          <span className="text-sm text-white/70 px-2">{isLoading ? <span className="skeleton h-4 w-28 inline-block align-middle"></span> : `Page ${pageIndex + 1} / ${pageCount}`}</span>
          <button onClick={() => onPageChange(pageIndex + 1)} disabled={!canNext || isLoading} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 disabled:opacity-40">›</button>
          <button onClick={() => onPageChange(pageCount - 1)} disabled={!canNext || isLoading} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 disabled:opacity-40">»</button>
        </div>
      </div>
    </div>
  )
}



