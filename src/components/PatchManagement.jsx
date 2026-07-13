import { assets, feedStatus, patchItems } from '../data/mockData.js'
import { Card, StatTile } from './ui.jsx'

// Patch/software management view: outdated software per asset, the
// plugin feed's update history, and SC roll version tracking (the
// periodic ACAS software baseline that sites must deploy).
const patchStatusStyles = {
  'Pending Approval': 'bg-sky-900/60 text-sky-300 border-sky-800',
  Scheduled: 'bg-indigo-900/60 text-indigo-300 border-indigo-800',
  'In Testing': 'bg-amber-900/60 text-amber-300 border-amber-800',
  'Deployed - Awaiting Rescan': 'bg-green-900/60 text-green-300 border-green-800',
  'Blocked - Agent Offline': 'bg-red-900/60 text-red-300 border-red-800',
  'Awaiting Hardware Refresh': 'bg-purple-900/60 text-purple-300 border-purple-800',
}

export default function PatchManagement() {
  const hostname = (id) => assets.find((a) => a.id === id)?.hostname || id

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Patch / Software Management</h1>
        <p className="text-sm text-slate-400">Outdated software tracking, plugin feed health, and ACAS roll version status</p>
      </div>

      {/* SC + roll version tracking */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatTile label="Security Center Version" value={feedStatus.scVersion} />
        <StatTile label="ACAS Roll Deployed" value={feedStatus.scRollVersion} accent="text-sky-400" />
        <StatTile label="Active Plugin Set" value={feedStatus.activePluginSet} accent="text-green-400" />
        <StatTile label="Open Patch Actions" value={patchItems.length} accent="text-amber-400" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Roll version details */}
        <Card title="ACAS Roll / Console Baseline">
          <dl className="text-sm space-y-2">
            <div className="flex justify-between">
              <dt className="text-slate-400">Current roll</dt>
              <dd className="text-slate-200 font-medium">{feedStatus.scRollVersion}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Roll released (DISA)</dt>
              <dd className="text-slate-200">{feedStatus.rollReleased}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Deployed on site console</dt>
              <dd className="text-slate-200">{feedStatus.rollDeployed}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">SC console version</dt>
              <dd className="text-slate-200">{feedStatus.scVersion}</dd>
            </div>
          </dl>
          <p className="text-xs text-slate-500 mt-3">
            In the real job: DISA periodically releases an ACAS roll (bundled SC/Nessus versions).
            Sites must deploy within the mandated window and report compliance.
          </p>
        </Card>

        {/* Plugin feed history */}
        <Card title={`Plugin Feed — ${feedStatus.pluginFeedStatus} (last update ${feedStatus.pluginFeedLastUpdate})`}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-slate-800">
                <th className="py-1.5 pr-4">Update Time</th>
                <th className="py-1.5 pr-4">Plugin Set</th>
                <th className="py-1.5">Result</th>
              </tr>
            </thead>
            <tbody>
              {feedStatus.feedHistory.map((h) => (
                <tr key={h.set} className="border-b border-slate-800/60">
                  <td className="py-1.5 pr-4 text-slate-400">{h.date}</td>
                  <td className="py-1.5 pr-4 font-mono text-xs text-slate-300">{h.set}</td>
                  <td className={`py-1.5 text-xs ${h.result === 'Success' ? 'text-green-400' : 'text-red-400'}`}>
                    {h.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-slate-500 mt-3">
            Stale plugin feeds mean scans miss new vulnerabilities — feed health is a daily check.
          </p>
        </Card>
      </div>

      {/* Outdated software per asset */}
      <Card title="Outdated Software / Patch Actions">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-slate-800">
                <th className="py-2 pr-4">Asset</th>
                <th className="py-2 pr-4">Software</th>
                <th className="py-2 pr-4">Installed</th>
                <th className="py-2 pr-4">Available</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Related Finding</th>
              </tr>
            </thead>
            <tbody>
              {patchItems.map((p) => (
                <tr key={p.id} className="border-b border-slate-800/60">
                  <td className="py-2 pr-4 font-medium text-sky-300">{hostname(p.assetId)}</td>
                  <td className="py-2 pr-4 text-slate-200">{p.software}</td>
                  <td className="py-2 pr-4 text-slate-400">{p.installed}</td>
                  <td className="py-2 pr-4 text-green-300">{p.available}</td>
                  <td className="py-2 pr-4">
                    <span className={`text-xs border rounded px-1.5 py-0.5 ${patchStatusStyles[p.status] || 'text-slate-300 border-slate-700'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-2 pr-4 font-mono text-xs text-slate-500">{p.relatedFinding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
