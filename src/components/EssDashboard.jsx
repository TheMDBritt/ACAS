import { useMemo, useState } from 'react'
import { assets } from '../data/mockData.js'
import { Card, StatTile, StatusBadge } from './ui.jsx'

// ESS / endpoint security view (McAfee ePO style): one row per asset
// showing its agent health — online/offline, agent version, last
// check-in, and whether the agent build is out of date.
export default function EssDashboard() {
  const [statusFilter, setStatusFilter] = useState('All')

  const online = assets.filter((a) => a.agent.status === 'Online').length
  const offline = assets.length - online
  const outdated = assets.filter((a) => a.agent.outOfDate).length

  const rows = useMemo(() => {
    return assets.filter((a) => {
      if (statusFilter === 'Online') return a.agent.status === 'Online'
      if (statusFilter === 'Offline') return a.agent.status === 'Offline'
      if (statusFilter === 'Out-of-Date Agent') return a.agent.outOfDate
      return true
    })
  }, [statusFilter])

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Endpoint Security — Agent Status</h1>
        <p className="text-sm text-slate-400">Mock ePO-style system tree view of agent health per managed endpoint</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatTile label="Managed Endpoints" value={assets.length} />
        <StatTile label="Agents Online" value={online} accent="text-green-400" />
        <StatTile label="Agents Offline" value={offline} accent="text-red-400" />
        <StatTile label="Out-of-Date Agents" value={outdated} accent="text-amber-400" />
      </div>

      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3">
        <label className="text-xs text-slate-400">Show:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm"
        >
          <option>All</option>
          <option>Online</option>
          <option>Offline</option>
          <option>Out-of-Date Agent</option>
        </select>
        <span className="text-xs text-slate-500 ml-auto">{rows.length} endpoints</span>
      </div>

      <Card title="Managed Systems">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-slate-800">
                <th className="py-2 pr-4">System Name</th>
                <th className="py-2 pr-4">IP Address</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Agent Status</th>
                <th className="py-2 pr-4">Agent Version</th>
                <th className="py-2 pr-4">Last Check-In</th>
                <th className="py-2 pr-4">Flag</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.id} className="border-b border-slate-800/60">
                  <td className="py-2 pr-4 font-medium text-slate-200">{a.hostname}</td>
                  <td className="py-2 pr-4 text-slate-400">{a.ip}</td>
                  <td className="py-2 pr-4 text-slate-400">{a.type}</td>
                  <td className="py-2 pr-4">
                    <StatusBadge status={a.agent.status} />
                  </td>
                  <td className="py-2 pr-4 font-mono text-xs text-slate-300">{a.agent.version}</td>
                  <td className="py-2 pr-4 text-slate-400">{a.agent.lastCheckIn}</td>
                  <td className="py-2 pr-4">
                    {a.agent.outOfDate && (
                      <span className="text-xs bg-amber-900/60 text-amber-300 border border-amber-800 rounded px-1.5 py-0.5">
                        Agent Out of Date
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="text-xs text-slate-500">
        SME habit: agents offline more than a few days mean no policy enforcement, no AV updates, and
        stale scan data — chase those first (see NRFK-WS-1103 and NRFK-LOG-01).
      </div>
    </div>
  )
}
