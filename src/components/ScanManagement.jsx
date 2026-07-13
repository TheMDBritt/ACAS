import { scanCredentials, scans, scanZones } from '../data/mockData.js'
import { Card, StatTile } from './ui.jsx'

// Scan management — the core daily ACAS task the other screens assume
// already happened. Shows the scan schedule with per-scan status,
// scan zones (which scanner covers which network), and credential
// health (auth failures silently produce false-clean results).
const scanStatusStyles = {
  Completed: 'bg-green-900/60 text-green-300 border-green-800',
  Running: 'bg-sky-900/60 text-sky-300 border-sky-800',
  Failed: 'bg-red-900/60 text-red-300 border-red-800',
}

export default function ScanManagement() {
  const failed = scans.filter((s) => s.status === 'Failed').length
  const running = scans.filter((s) => s.status === 'Running').length
  const credIssues = scanCredentials.filter((c) => c.status !== 'OK').length

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Scan Management</h1>
        <p className="text-sm text-slate-400">
          Scan schedules, zones, and credential health (mock Security Center scan console)
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatTile label="Scheduled Scans" value={scans.length} />
        <StatTile label="Running Now" value={running} accent="text-sky-400" />
        <StatTile label="Failed Last Run" value={failed} accent="text-red-400" />
        <StatTile label="Credential Issues" value={credIssues} accent="text-amber-400" />
      </div>

      <Card title="Scan Schedule">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-slate-800">
                <th className="py-2 pr-4">Scan Name</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Targets</th>
                <th className="py-2 pr-4">Schedule</th>
                <th className="py-2 pr-4">Last Run</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((s) => (
                <tr key={s.id} className="border-b border-slate-800/60 align-top">
                  <td className="py-2 pr-4">
                    <div className="font-medium text-slate-200">{s.name}</div>
                    {s.note && <div className="text-xs text-amber-400/90 mt-0.5">{s.note}</div>}
                  </td>
                  <td className="py-2 pr-4 text-slate-400">{s.type}</td>
                  <td className="py-2 pr-4 text-slate-400">{s.targets}</td>
                  <td className="py-2 pr-4 text-slate-400">{s.schedule}</td>
                  <td className="py-2 pr-4 text-slate-400">{s.lastRun}</td>
                  <td className="py-2 pr-4">
                    <span className={`text-xs border rounded px-1.5 py-0.5 ${scanStatusStyles[s.status]}`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Scan Zones">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-slate-800">
                <th className="py-1.5 pr-4">Zone</th>
                <th className="py-1.5 pr-4">IP Ranges</th>
                <th className="py-1.5 pr-4">Scanner</th>
                <th className="py-1.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {scanZones.map((z) => (
                <tr key={z.name} className="border-b border-slate-800/60">
                  <td className="py-1.5 pr-4 text-slate-200">{z.name}</td>
                  <td className="py-1.5 pr-4 font-mono text-xs text-slate-400">{z.ranges}</td>
                  <td className="py-1.5 pr-4 text-slate-400">{z.scanner}</td>
                  <td className={`py-1.5 text-xs ${z.scannerStatus === 'Online' ? 'text-green-400' : 'text-red-400'}`}>
                    {z.scannerStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-slate-500 mt-3">
            Zones map IP ranges to scanners so SC knows which Nessus engine can reach which network.
            A scan that targets IPs outside every zone simply won&apos;t run.
          </p>
        </Card>

        <Card title="Scan Credentials">
          <div className="space-y-3">
            {scanCredentials.map((c) => (
              <div key={c.name} className="bg-slate-800/50 rounded p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-slate-200">{c.name}</span>
                  <span
                    className={`text-xs border rounded px-1.5 py-0.5 ${
                      c.status === 'OK'
                        ? 'bg-green-900/60 text-green-300 border-green-800'
                        : 'bg-red-900/60 text-red-300 border-red-800'
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {c.type} · {c.usedBy} · Last verified {c.lastVerified}
                </div>
                <div className="text-xs text-slate-400 mt-1">{c.detail}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-3">
            SME habit: a host whose credentials stopped working looks <em>cleaner</em> on the dashboard,
            not dirtier — auth failures are the first thing to check every scan cycle.
          </p>
        </Card>
      </div>
    </div>
  )
}
