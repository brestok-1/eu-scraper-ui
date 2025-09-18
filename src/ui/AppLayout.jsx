import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="min-h-screen display-gradient">
      <header className="flex items-center justify-between px-8 py-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl font-extrabold tracking-tight" style={{fontFamily:'Montserrat'}}>hector</span>
          <span className="w-2 h-2 rounded-sm bg-[var(--color-primary)] block"></span>
        </Link>
      </header>
      <main className="px-8">
        <Hero />
        <div className="mt-12">
          <Outlet />
        </div>
      </main>
      <footer className="px-8 py-10 text-xs text-black/50 text-center">© 2025 EU Job Scraper</footer>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative isolate grid grid-cols-12 items-center rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-white to-[#f0f2f7] border border-black/10">
      <div className="col-span-12 md:col-span-6 px-10 py-16">
        <p className="text-[16px] text-black/70">unleash a new era of</p>
        <h1 className="mt-2 text-[56px] leading-[1.05] font-extrabold" style={{fontFamily:'Montserrat'}}>automation</h1>
        <p className="mt-6 text-black/70 max-w-xl">EU Job Scraper aggregates vacancies across Europe into one searchable platform.</p>
        <div className="mt-8 flex items-center gap-4">
          <Link to="/" className="px-5 py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary)] text-white font-semibold">Explore jobs</Link>
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 relative py-16">
        <div className="absolute inset-0 opacity-30 blur-3xl pointer-events-none" aria-hidden="true"></div>
        <div className="mx-10 glass p-6">
          <div className="h-64 rounded-xl bg-[radial-gradient(circle_at_70%_30%,#93c5fd_0%,transparent_65%),radial-gradient(circle_at_30%_70%,#bfdbfe_0%,transparent_60%)]"></div>
        </div>
      </div>
    </section>
  )
}


