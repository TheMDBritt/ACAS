import { useMemo, useState } from 'react'
import { assets, findings, findingsForAsset, severityCounts, severityOrder } from '../data/mockData.js'
import { Card, StatTile } from './ui.jsx'
import AssetDetail from './AssetDetail.jsx'

// The main vulnerability management screen, styled after Tenable
// Security Center: summary tiles up top, filter bar, then the asset
// inventory table. Clicking a row opens AssetDetail for that host.
export default function AcasDashboard() {
  const [selectedAssetId, setSelectedAssetId] = useState(null)
  const [severityFilter, setSeverityFilter] = useState('All')
  const [stigFilter, setStigFilter] = useState('All')

  const totals = severityCounts(findings)

  // Apply the two filters: an asset stays visible if it has at least
  // one finding matching the chosen severity, and matches the chosen
  // STIG compliance status. (This must run before the early return
  // below — React requires hooks to run on every render.)
  const filteredAssets = useMemo(() => {
    return assets.filter((a) => {
      if (stigFilter === 'Compliant' && !a.stigCompliant) return false
      if (stigFilter === 'Non-Compliant' && a.stigCompliant) return false
      if (severityFilter !== 'All') {
        const has = findingsForAsset(a.id).some((f) => f.severity === severityFilter)
        if (!has) return false
      }
      return true
    })
  }, [severityFilter, stigFilter])

  // If a host is selected, show its detail page instead of the table.
  if (selectedAssetId) {
    return <AssetDetail assetId={selectedAssetId} onBack={() => setSelectedAssetId(null)} />
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Vulnerability Management</h1>
        <p className="text-sm text-slate-400">Asset inventory with latest credentialed scan results (mock Tenable.sc view)</p>
      </div>

      {/* Severity summary tiles */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatTile label="Total Findings" value={findings.length} />
        <StatTile label="Critical" value={totals.Critical} accent="text-purple-400" />
        <StatTile label="High" value={totals.High} accent="text-red-400" />
        <StatTile label="Medium" value={totals.Medium} accent="text-orange-400" />
        <StatTile label="Low" value={totals.Low} accent="text-green-400" />
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-4 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3">
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400">Severity:</label>
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
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400">STIG Compliance:</label>
          <select
            value={stigFilter}
            onChange={(e) => setStigFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm"
          >
            <option>All</option>
            <option>Compliant</option>
            <option>Non-Compliant</option>
          </select>
        </div>
        <div className="text-xs text-slate-500 ml-auto">
          {filteredAssets.length} of {assets.length} assets shown
        </div>
      </div>

      {/* Asset inventory table */}
      <Card title="Asset Inventory">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-slate-800">
                <th className="py-2 pr-4">Hostname</th>
                <th className="py-2 pr-4">IP Address</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">OS</th>
                <th className="py-2 pr-4">Last Scan</th>
                <th className="py-2 pr-4">STIG</th>
                <th className="py-2 pr-4">Findings (C/H/M/L)</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((a) => {
                const c = severityCounts(findingsForAsset(a.id))
                return (
                  <tr
                    key={a.id}
                    onClick={() => setSelectedAssetId(a.id)}
                    className="border-b border-slate-800/60 hover:bg-slate-800/60 cursor-pointer"
                  >
                    <td className="py-2 pr-4 font-medium text-sky-300">{a.hostname}</td>
                    <td className="py-2 pr-4 text-slate-400">{a.ip}</td>
                    <td className="py-2 pr-4">{a.type}</td>
                    <td className="py-2 pr-4 text-slate-400">{a.os}</td>
                    <td className="py-2 pr-4 text-slate-400">{a.lastScan}</td>
                    <td className="py-2 pr-4">
                      {a.stigCompliant ? (
                        <span className="text-green-400 text-xs font-medium">Compliant</span>
                      ) : (
                        <span className="text-red-400 text-xs font-medium">Non-Compliant</span>
                      )}
                    </td>
                    <td className="py-2 pr-4">
                      <div className="flex gap-1.5 text-xs font-mono">
                        <span className="text-purple-400">{c.Critical}</span>/
                        <span className="text-red-400">{c.High}</span>/
                        <span className="text-orange-400">{c.Medium}</span>/
                        <span className="text-green-400">{c.Low}</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filteredAssets.length === 0 && (
            <div className="text-center text-sm text-slate-500 py-6">No assets match the current filters.</div>
          )}
        </div>
      </Card>

      <div className="text-xs text-slate-500">
        Tip: click any row to open the asset&apos;s findings, like drilling into a host in Security Center.
      </div>
    </div>
  )
}
