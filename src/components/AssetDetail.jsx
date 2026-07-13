import { useState } from 'react'
import { assets, findingsForAsset, severityOrder } from '../data/mockData.js'
import { Card, SeverityBadge, StatusBadge } from './ui.jsx'

// Per-host drill-down: header with asset facts, then the finding list
// styled like Tenable.sc plugin output. Clicking a finding expands it
// to show the full description, solution, and STIG mapping.
export default function AssetDetail({ assetId, onBack }) {
  const asset = assets.find((a) => a.id === assetId)
  const [expandedId, setExpandedId] = useState(null)
  const [severityFilter, setSeverityFilter] = useState('All')

  const list = findingsForAsset(assetId)
    .filter((f) => severityFilter === 'All' || f.severity === severityFilter)
    .sort((a, b) => severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity))

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-sm text-sky-400 hover:text-sky-300">
        ← Back to Asset Inventory
      </button>

      {/* Asset header */}
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-100">{asset.hostname}</h1>
            <div className="text-sm text-slate-400 mt-1">
              {asset.ip} · {asset.os} · {asset.role}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Repository: {asset.repository} · Group: {asset.group} · Last scan: {asset.lastScan}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={asset.agent.status} />
            {asset.stigCompliant ? (
              <span className="text-green-400 text-sm font-medium">STIG Compliant</span>
            ) : (
              <span className="text-red-400 text-sm font-medium">STIG Non-Compliant</span>
            )}
          </div>
        </div>
      </Card>

      {/* Severity filter for this host's findings */}
      <div className="flex items-center gap-2">
        <label className="text-xs text-slate-400">Filter severity:</label>
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm"
        >
          <option>All</option>
          {severityOrder.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <span className="text-xs text-slate-500">{list.length} findings</span>
      </div>

      {/* Findings list, Tenable.sc plugin-output style */}
      <div className="space-y-2">
        {list.map((f) => (
          <div key={f.id} className="bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setExpandedId(expandedId === f.id ? null : f.id)}
              className="w-full text-left px-4 py-3 flex flex-wrap items-center gap-3 hover:bg-slate-800/50"
            >
              <SeverityBadge severity={f.severity} />
              <span className="font-mono text-xs text-slate-500">Plugin {f.pluginId}</span>
              <span className="text-sm font-medium text-slate-200 flex-1">{f.name}</span>
              <span className="text-xs text-slate-400">CVSS {f.cvss.toFixed(1)}</span>
              {f.stigFinding && (
                <span className="text-xs bg-yellow-900/60 text-yellow-300 border border-yellow-800 rounded px-1.5 py-0.5">
                  STIG {f.stigId}
                </span>
              )}
            </button>
            {expandedId === f.id && (
              <div className="px-4 pb-4 pt-1 border-t border-slate-800 text-sm space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <div className="text-slate-500">Plugin Family</div>
                    <div className="text-slate-300">{f.family}</div>
                  </div>
                  <div>
                    <div className="text-slate-500">CVSS v3 Base Score</div>
                    <div className="text-slate-300">{f.cvss.toFixed(1)}</div>
                  </div>
                  <div>
                    <div className="text-slate-500">First Seen</div>
                    <div className="text-slate-300">{f.firstSeen}</div>
                  </div>
                  <div>
                    <div className="text-slate-500">STIG Mapping</div>
                    <div className="text-slate-300">{f.stigId || '—'}</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Description</div>
                  <p className="text-slate-300">{f.description}</p>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Solution</div>
                  <p className="text-green-300">{f.solution}</p>
                </div>
              </div>
            )}
          </div>
        ))}
        {list.length === 0 && (
          <div className="text-center text-sm text-slate-500 py-6">No findings at this severity.</div>
        )}
      </div>
    </div>
  )
}
