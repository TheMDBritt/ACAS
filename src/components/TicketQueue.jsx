import { useState } from 'react'
import { SIM_NOW, initialTickets, slaHoursByPriority } from '../data/mockData.js'
import usePersistentState from '../hooks/usePersistentState.js'
import { Card, StatTile, StatusBadge } from './ui.jsx'

// ITIL-style incident queue: priority levels (P1–P4), SLA timers,
// escalation flags, assignment, and open/in-progress/closed status.
// Your changes persist in the browser via usePersistentState.

const priorityStyles = {
  P1: 'bg-purple-600 text-white',
  P2: 'bg-red-600 text-white',
  P3: 'bg-orange-500 text-white',
  P4: 'bg-slate-600 text-white',
}

// Given a ticket, compute hours elapsed and whether the SLA is breached.
// Closed tickets stop the clock (shown as met, since this mock has no
// close timestamps to compare against).
function slaInfo(ticket) {
  const created = new Date(ticket.createdAt.replace(' ', 'T'))
  const elapsedHrs = (SIM_NOW - created) / 36e5
  const slaHrs = slaHoursByPriority[ticket.priority]
  if (ticket.status === 'Closed') return { label: 'SLA Met (Closed)', tone: 'text-slate-500', pct: 100 }
  const remaining = slaHrs - elapsedHrs
  if (remaining <= 0) return { label: `SLA BREACHED (${Math.abs(remaining).toFixed(0)}h over)`, tone: 'text-red-400 font-semibold', pct: 100 }
  return {
    label: `${remaining.toFixed(1)}h remaining of ${slaHrs}h SLA`,
    tone: remaining < slaHrs * 0.25 ? 'text-amber-400' : 'text-green-400',
    pct: Math.min(100, (elapsedHrs / slaHrs) * 100),
  }
}

const ticketStatuses = ['Open', 'In Progress', 'Closed']

export default function TicketQueue() {
  // Persisted in the browser so worked tickets survive a refresh.
  const [tickets, setTickets] = usePersistentState('sim-tickets', initialTickets)
  const [statusFilter, setStatusFilter] = useState('All')

  const update = (id, patch) =>
    setTickets((list) => list.map((t) => (t.id === id ? { ...t, ...patch } : t)))

  const counts = ticketStatuses.reduce((acc, s) => {
    acc[s] = tickets.filter((t) => t.status === s).length
    return acc
  }, {})
  const breached = tickets.filter((t) => t.status !== 'Closed' && slaInfo(t).label.startsWith('SLA BREACHED')).length

  const rows = tickets
    .filter((t) => statusFilter === 'All' || t.status === statusFilter)
    .sort((a, b) => a.priority.localeCompare(b.priority))

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Ticket Queue</h1>
        <p className="text-sm text-slate-400">
          ITIL-style incident intake: priorities P1–P4, SLA timers, escalation, and assignment.
          Simulated clock: {SIM_NOW.toISOString().slice(0, 16).replace('T', ' ')}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatTile label="Open" value={counts['Open']} accent="text-sky-400" />
        <StatTile label="In Progress" value={counts['In Progress']} accent="text-amber-400" />
        <StatTile label="Closed" value={counts['Closed']} accent="text-slate-400" />
        <StatTile label="SLA Breaches (active)" value={breached} accent="text-red-400" />
      </div>

      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3">
        <label className="text-xs text-slate-400">Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm"
        >
          <option>All</option>
          {ticketStatuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <span className="text-xs text-slate-500 ml-auto">
          {rows.length} tickets · SLA targets: P1 {slaHoursByPriority.P1}h · P2 {slaHoursByPriority.P2}h · P3 {slaHoursByPriority.P3}h · P4 {slaHoursByPriority.P4}h
        </span>
      </div>

      <div className="space-y-3">
        {rows.map((t) => {
          const sla = slaInfo(t)
          return (
            <Card key={t.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${priorityStyles[t.priority]}`}>
                      {t.priority}
                    </span>
                    <span className="font-mono text-xs text-slate-500">{t.id}</span>
                    <StatusBadge status={t.status} />
                    {t.escalated && (
                      <span className="text-xs bg-red-900/60 text-red-300 border border-red-800 rounded px-1.5 py-0.5">
                        ⬆ Escalated
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-slate-200 mt-1.5">{t.title}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Category: {t.category} · Requester: {t.requester} · Opened: {t.createdAt}
                  </div>
                  <div className="text-xs text-slate-400 mt-2">{t.notes}</div>

                  {/* SLA progress bar */}
                  <div className="mt-3 max-w-md">
                    <div className={`text-xs ${sla.tone}`}>{sla.label}</div>
                    <div className="h-1.5 bg-slate-800 rounded mt-1">
                      <div
                        className={`h-1.5 rounded ${sla.pct >= 100 ? 'bg-red-500' : sla.pct > 75 ? 'bg-amber-500' : 'bg-green-500'}`}
                        style={{ width: `${sla.pct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Work-the-ticket controls */}
                <div className="flex flex-col items-end gap-2 shrink-0 text-xs">
                  <div className="text-slate-500">
                    Assignee: <span className="text-slate-300">{t.assignee}</span>
                  </div>
                  {t.assignee === 'Unassigned' && (
                    <button
                      onClick={() => update(t.id, { assignee: 'You (ACAS SME)', status: 'In Progress' })}
                      className="bg-sky-800 hover:bg-sky-700 text-sky-100 rounded px-2.5 py-1"
                    >
                      Assign to me
                    </button>
                  )}
                  <select
                    value={t.status}
                    onChange={(e) => update(t.id, { status: e.target.value })}
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm"
                  >
                    {ticketStatuses.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  {!t.escalated && t.status !== 'Closed' && (
                    <button
                      onClick={() => update(t.id, { escalated: true })}
                      className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded px-2.5 py-1"
                    >
                      Escalate
                    </button>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="text-xs text-slate-500">
        ITIL basics baked in: priority drives the SLA clock; breaching (or nearly breaching) an SLA is
        the trigger to escalate; every ticket needs an owner before it can move to In Progress.
      </div>
    </div>
  )
}
