import { useState } from 'react'
import { assets, findings, initialPoams } from '../data/mockData.js'
import usePersistentState from '../hooks/usePersistentState.js'
import { Card, SeverityBadge, StatTile, StatusBadge } from './ui.jsx'

// POA&M (Plan of Action & Milestones) tracker. Each entry ties a scan
// finding to an RMF control family. The status dropdown is interactive:
// changing it updates React state, so you can practice working entries
// to closure. (State resets on page refresh — there's no backend.)
const poamStatuses = ['In Progress', 'Remediated', 'Accepted Risk']

export default function PoamTracker() {
  // Persisted in the browser so your practice work survives a refresh.
  const [poams, setPoams] = usePersistentState('sim-poams', initialPoams)
  const [statusFilter, setStatusFilter] = useState('All')

  const setStatus = (id, status) =>
    setPoams((list) => list.map((p) => (p.id === id ? { ...p, status } : p)))

  const counts = poamStatuses.reduce((acc, s) => {
    acc[s] = poams.filter((p) => p.status === s).length
    return acc
  }, {})

  const rows = poams.filter((p) => statusFilter === 'All' || p.status === statusFilter)
  const findingFor = (id) => findings.find((f) => f.id === id)
  const hostFor = (findingId) => {
    const f = findingFor(findingId)
    return assets.find((a) => a.id === f?.assetId)?.hostname || '—'
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-100">POA&M Tracker</h1>
        <p className="text-sm text-slate-400">
          Plan of Action &amp; Milestones — open findings mapped to RMF controls. Change a status to practice working entries.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatTile label="Total POA&Ms" value={poams.length} />
        <StatTile label="In Progress" value={counts['In Progress']} accent="text-amber-400" />
        <StatTile label="Remediated" value={counts['Remediated']} accent="text-green-400" />
        <StatTile label="Accepted Risk" value={counts['Accepted Risk']} accent="text-purple-400" />
      </div>

      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3">
        <label className="text-xs text-slate-400">Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm"
        >
          <option>All</option>
          {poamStatuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <span className="text-xs text-slate-500 ml-auto">{rows.length} entries</span>
      </div>

      <div className="space-y-3">
        {rows.map((p) => {
          const f = findingFor(p.findingId)
          return (
            <Card key={p.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-slate-500">{p.id}</span>
                    {f && <SeverityBadge severity={f.severity} />}
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="text-sm font-medium text-slate-200 mt-1.5">{f?.name}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Host: <span className="text-sky-300">{hostFor(p.findingId)}</span> · Finding {p.findingId} ·
                    RMF Control: <span className="text-slate-300">{p.rmfControl}</span> · POC: {p.pocRole}
                  </div>
                  <div className="text-xs text-slate-400 mt-2">
                    <span className="text-slate-500">Milestones:</span> {p.milestones}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    <span className="text-slate-500">Comments:</span> {p.comments}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="text-xs text-slate-500">
                    Scheduled completion: <span className="text-slate-300">{p.scheduledCompletion}</span>
                  </div>
                  <select
                    value={p.status}
                    onChange={(e) => setStatus(p.id, e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm"
                  >
                    {poamStatuses.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="text-xs text-slate-500">
        In real RMF work, POA&Ms live in eMASS: &quot;Remediated&quot; needs scan evidence, and &quot;Accepted
        Risk&quot; needs a signed risk acceptance from the Authorizing Official.
      </div>
    </div>
  )
}
