import { useState } from 'react'
import { assetTree, assets, findingsForAsset, severityCounts } from '../data/mockData.js'
import { Card } from './ui.jsx'

// Mirrors how Security Center organizes assets:
// Repository → Organizational Unit → Asset Group → hosts.
// Each level is a collapsible section (click to expand/collapse).
export default function AssetTreeView() {
  // Track which tree nodes are open. Keys are unique strings per node.
  const [open, setOpen] = useState({})
  const toggle = (key) => setOpen((o) => ({ ...o, [key]: !o[key] }))

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Asset Tree</h1>
        <p className="text-sm text-slate-400">
          Repository → Organizational Unit → Asset Group hierarchy (mock Security Center structure)
        </p>
      </div>

      {assetTree.map((repo) => {
        const repoKey = repo.repository
        return (
          <Card key={repoKey}>
            <button
              onClick={() => toggle(repoKey)}
              className="w-full text-left flex items-center gap-2 font-semibold text-slate-200"
            >
              <span className="text-slate-500">{open[repoKey] ? '▾' : '▸'}</span>
              <span>🗄️ {repo.repository}</span>
              <span className="text-xs text-slate-500 font-normal ml-2">
                {repo.orgUnits.reduce((n, ou) => n + ou.groups.reduce((m, g) => m + g.assetIds.length, 0), 0)} assets
              </span>
            </button>

            {open[repoKey] && (
              <div className="mt-3 ml-4 space-y-3">
                {repo.orgUnits.map((ou) => {
                  const ouKey = `${repoKey}/${ou.name}`
                  return (
                    <div key={ouKey}>
                      <button
                        onClick={() => toggle(ouKey)}
                        className="text-left flex items-center gap-2 text-sm font-medium text-slate-300"
                      >
                        <span className="text-slate-500">{open[ouKey] ? '▾' : '▸'}</span>
                        <span>🏢 {ou.name}</span>
                      </button>

                      {open[ouKey] && (
                        <div className="mt-2 ml-6 space-y-2">
                          {ou.groups.map((g) => {
                            const gKey = `${ouKey}/${g.name}`
                            return (
                              <div key={gKey}>
                                <button
                                  onClick={() => toggle(gKey)}
                                  className="text-left flex items-center gap-2 text-sm text-slate-400"
                                >
                                  <span className="text-slate-500">{open[gKey] ? '▾' : '▸'}</span>
                                  <span>📁 {g.name}</span>
                                  <span className="text-xs text-slate-600">({g.assetIds.length})</span>
                                </button>

                                {open[gKey] && (
                                  <div className="mt-1 ml-6 space-y-1">
                                    {g.assetIds.map((id) => {
                                      const a = assets.find((x) => x.id === id)
                                      const c = severityCounts(findingsForAsset(id))
                                      return (
                                        <div
                                          key={id}
                                          className="flex flex-wrap items-center gap-3 text-sm bg-slate-800/50 rounded px-3 py-1.5"
                                        >
                                          <span className="text-sky-300 font-medium">{a.hostname}</span>
                                          <span className="text-xs text-slate-500">{a.ip}</span>
                                          <span className="text-xs text-slate-500">{a.os}</span>
                                          <span className="ml-auto text-xs font-mono">
                                            <span className="text-purple-400">{c.Critical}</span>/
                                            <span className="text-red-400">{c.High}</span>/
                                            <span className="text-orange-400">{c.Medium}</span>/
                                            <span className="text-green-400">{c.Low}</span>
                                          </span>
                                        </div>
                                      )
                                    })}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </Card>
        )
      })}

      <div className="text-xs text-slate-500">
        In real Security Center, repositories segment scan data, and asset groups/dynamic lists drive
        scan targeting, dashboards, and report scoping.
      </div>
    </div>
  )
}
