import { SIM_NOW, assets, findings, iavms } from '../data/mockData.js'
import { Card, StatTile } from './ui.jsx'

// IAVM compliance view. Navy vulnerability work is deadline-driven:
// each IAVA/IAVB maps to scanner plugins, so "who's affected" comes
// straight from scan results. Days-remaining is computed against the
// simulated clock; overdue items are flagged.
function affectedHosts(iavm) {
  const assetIds = new Set(
    findings.filter((f) => iavm.pluginIds.includes(f.pluginId)).map((f) => f.assetId),
  )
  return assets.filter((a) => assetIds.has(a.id))
}

function deadlineInfo(iavm) {
  const due = new Date(iavm.due + 'T23:59:59')
  const days = Math.floor((due - SIM_NOW) / 864e5)
  if (days < 0) return { label: `OVERDUE by ${Math.abs(days)}d`, tone: 'text-red-400 font-semibold' }
  if (days <= 5) return { label: `${days}d remaining`, tone: 'text-amber-400 font-medium' }
  return { label: `${days}d remaining`, tone: 'text-green-400' }
}

export default function IavmTracker() {
  const overdue = iavms.filter((i) => new Date(i.due + 'T23:59:59') < SIM_NOW).length
  const unacked = iavms.filter((i) => !i.acknowledged).length

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-100">IAVM Compliance</h1>
        <p className="text-sm text-slate-400">
          Open IAVAs/IAVBs mapped to scan plugins and affected hosts. Simulated date: {SIM_NOW.toISOString().slice(0, 10)}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatTile label="Open IAVMs" value={iavms.length} />
        <StatTile label="Overdue" value={overdue} accent="text-red-400" />
        <StatTile label="Not Yet Acknowledged" value={unacked} accent="text-amber-400" />
        <StatTile label="Acknowledged" value={iavms.length - unacked} accent="text-green-400" />
      </div>

      <div className="space-y-3">
        {iavms.map((iavm) => {
          const hosts = affectedHosts(iavm)
          const dl = deadlineInfo(iavm)
          return (
            <Card key={iavm.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 text-sky-300">
                      {iavm.id}
                    </span>
                    {!iavm.acknowledged && (
                      <span className="text-xs bg-amber-900/60 text-amber-300 border border-amber-800 rounded px-1.5 py-0.5">
                        Needs VRAM Acknowledgement
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-slate-200 mt-1.5">{iavm.title}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Released {iavm.released} · Due {iavm.due} · Plugins:{' '}
                    <span className="font-mono">{iavm.pluginIds.join(', ')}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-2">{iavm.notes}</div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {hosts.length > 0 ? (
                      hosts.map((h) => (
                        <span key={h.id} className="text-xs bg-slate-800 rounded px-1.5 py-0.5 text-slate-300">
                          {h.hostname}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-green-400">No affected hosts in current scan data</span>
                    )}
                  </div>
                </div>
                <div className={`text-sm shrink-0 ${dl.tone}`}>{dl.label}</div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="text-xs text-slate-500">
        Real-world flow: IAVM released → acknowledge in VRAM → find affected assets via the mapped
        plugins → patch and rescan → report compliance. Can&apos;t make the deadline? Open a POA&M
        <em> before</em> it goes overdue, not after.
      </div>
    </div>
  )
}
