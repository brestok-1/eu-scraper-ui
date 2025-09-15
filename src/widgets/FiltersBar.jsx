import React, {useMemo, useRef, useState} from 'react'
import Select from 'react-select'
import {DayPicker} from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import {searchJobOptions} from '../api/jobs.js'
import { formatDate } from '../utils/date.js'

export function FiltersBar({value, onChange, domain, onRefresh, lastUpdatedAt, nextPlannedAt, onSubmit, onClear, isLoading}) {
    function set(partial) {
        onChange({...value, ...partial})
    }

    const hasAny = useMemo(() => {
        return Boolean(
            value.titles.length || value.companies.length || value.locations.length ||
            value.salaryMin !== '' || value.salaryMax !== '' || value.top || value.dateFrom || value.dateTo
        )
    }, [value])
    const [openCalendar, setOpenCalendar] = useState(false)

    const selectStyles = {
        control: (base) => ({
            ...base,
            minHeight: 44,
            backgroundColor: 'rgba(255,255,255,0.06)',
            borderColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            boxShadow: 'none',
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: '#171d28',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.12)'
        }),
        menuPortal: (base) => ({...base, zIndex: 60}),
        singleValue: (base) => ({...base, color: 'white'}),
        input: (base) => ({...base, color: 'white'}),
        multiValue: (base) => ({...base, backgroundColor: 'rgba(183,116,255,0.25)'}),
        multiValueLabel: (base) => ({...base, color: 'white'}),
        multiValueRemove: (base) => ({
            ...base,
            color: 'white',
            ':hover': {backgroundColor: 'rgba(183,116,255,0.4)', color: '#0b0c10'}
        }),
        option: (base, s) => ({
            ...base,
            background: s.isSelected ? 'rgba(183,116,255,0.25)' : s.isFocused ? 'rgba(255,255,255,0.08)' : 'transparent',
            color: 'white'
        }),
    }

    const [titleOptions, setTitleOptions] = useState([])
    const [companyOptions, setCompanyOptions] = useState([])
    const [locationOptions, setLocationOptions] = useState([])
    const debounceIdRef = useRef(null)

    async function loadOptions(field, query, setter) {
        try {
            const api = await searchJobOptions(field, query)
            const arr = api?.data?.data || []
            setter(arr.map(v => ({value: v, label: v})))
        } catch (e) {
            setter([])
        }
    }

    function handleMenuOpen(field, setter) {
        loadOptions(field, '', setter)
    }

    function handleInputChange(field, setter) {
        return (inputValue, meta) => {
            if (meta.action === 'input-change') {
                if (debounceIdRef.current) clearTimeout(debounceIdRef.current)
                debounceIdRef.current = setTimeout(() => {
                    loadOptions(field, inputValue || '', setter)
                }, 500)
            }
            return inputValue
        }
    }

    return (
        <div className="glass p-4 relative z-20">
            <div className="flex flex-wrap items-center gap-4 justify-between text-xs text-white/60">
                <div>Last update: <span className="text-white">{isLoading ? <span className="skeleton h-3 w-28 inline-block align-middle"></span> : lastUpdatedAt}</span></div>
                <div>Next planned: <span className="text-white">{isLoading ? <span className="skeleton h-3 w-28 inline-block align-middle"></span> : nextPlannedAt}</span></div>
                <div className="flex-1"></div>
                {hasAny && (
                    <div className="flex items-center gap-2 order-2 sm:order-none">
                        <button onClick={onSubmit} disabled={isLoading}
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary)] text-black font-semibold disabled:opacity-60">Submit
                        </button>
                        <button onClick={onClear} disabled={isLoading}
                                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 disabled:opacity-60">Clear
                            All
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-4 grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4">
                    <label className="text-xs text-white/60">Title</label>
                    <div className="mt-1">
                        <Select isMulti isDisabled={isLoading} isLoading={isLoading} options={titleOptions} value={value.titles.map(v => ({value: v, label: v}))}
                                onChange={vals => set({titles: vals.map(v => v.value)})}
                                onMenuOpen={() => handleMenuOpen('title', setTitleOptions)}
                                onInputChange={handleInputChange('title', setTitleOptions)} styles={selectStyles}
                                classNamePrefix="rs" menuPortalTarget={document.body}/>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                    <label className="text-xs text-white/60">Company</label>
                    <div className="mt-1">
                        <Select isMulti isDisabled={isLoading} isLoading={isLoading} options={companyOptions}
                                value={value.companies.map(v => ({value: v, label: v}))}
                                onChange={vals => set({companies: vals.map(v => v.value)})}
                                onMenuOpen={() => handleMenuOpen('company', setCompanyOptions)}
                                onInputChange={handleInputChange('company', setCompanyOptions)} styles={selectStyles}
                                classNamePrefix="rs" menuPortalTarget={document.body}/>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                    <label className="text-xs text-white/60">Location</label>
                    <div className="mt-1">
                        <Select isMulti isDisabled={isLoading} isLoading={isLoading} options={locationOptions}
                                value={value.locations.map(v => ({value: v, label: v}))}
                                onChange={vals => set({locations: vals.map(v => v.value)})}
                                onMenuOpen={() => handleMenuOpen('location', setLocationOptions)}
                                onInputChange={handleInputChange('location', setLocationOptions)} styles={selectStyles}
                                classNamePrefix="rs" menuPortalTarget={document.body}/>
                    </div>
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div>
                        <label className="text-xs text-white/60">Salary from</label>
                        <input type="number" value={value.salaryMin} onChange={e => set({salaryMin: e.target.value})} disabled={isLoading}
                               className="mt-1 h-[44px] w-full px-3 rounded-lg bg-white/5 border border-white/10 outline-none focus:border-[var(--color-primary)] disabled:opacity-60"/>
                    </div>
                </div>
                <div className="col-span-6 md:col-span-3">
                    <div>
                        <label className="text-xs text-white/60">Salary to</label>
                        <input type="number" value={value.salaryMax} onChange={e => set({salaryMax: e.target.value})} disabled={isLoading}
                               className="mt-1 h-[44px] w-full px-3 rounded-lg bg-white/5 border border-white/10 outline-none focus:border-[var(--color-primary)] disabled:opacity-60"/>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-2">
                    <label className="text-xs text-white/60">Top 5</label>
                    <div
                        className="mt-1 h-[44px] w-full rounded-lg bg-white/5 border border-white/10 flex items-center px-3 gap-2">
                        <input type="checkbox" checked={value.top} onChange={e => set({top: e.target.checked})} disabled={isLoading}
                               className="size-5 accent-[var(--color-primary-600)]"/>
                        <span className="text-sm">Only top 5</span>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                    <label className="text-xs text-white/60">Date inserted (range)</label>
                    <button type="button" onClick={() => setOpenCalendar(v => !v)} disabled={isLoading}
                            className="mt-1 h-[44px] w-full text-left px-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between disabled:opacity-60">
                        <span
                            className="text-white/80 text-sm">{value.dateFrom ? formatDate(value.dateFrom) : 'Start'} — {value.dateTo ? formatDate(value.dateTo) : 'End'}</span>
                        <span className="text-white/50">▾</span>
                    </button>
                    {openCalendar && (
                        <div
                            className="absolute z-50 mt-2 bg-[#0f1117] border border-white/10 rounded-xl shadow-2xl p-2">
                            <DayPicker
                                mode="range"
                                selected={{
                                    from: value.dateFrom ? new Date(value.dateFrom) : undefined,
                                    to: value.dateTo ? new Date(value.dateTo) : undefined
                                }}
                                onSelect={(range) => {
                                    let from = range?.from ?? null
                                    let to = range?.to ?? null
                                    const isSameDay = from && to && from.toDateString() === to.toDateString()
                                    if (isSameDay) {
                                        to = null
                                    }
                                    set({dateFrom: from, dateTo: to})
                                    if (from && to && !isSameDay) setOpenCalendar(false)
                                }}
                                styles={{
                                    caption: {color: 'white'},
                                    day: {color: 'white'},
                                    day_selected: {backgroundColor: '#8f8cf8', color: '#0b0c10'},
                                    day_range_start: {backgroundColor: '#7a76f2', color: '#0b0c10'},
                                    day_range_end: {backgroundColor: '#7a76f2', color: '#0b0c10'},
                                    day_range_middle: {backgroundColor: 'rgba(143,140,248,0.4)', color: 'white'},
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


