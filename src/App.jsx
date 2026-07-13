import { useState } from 'react'
import AcasDashboard from './components/AcasDashboard.jsx'
import AssetTreeView from './components/AssetTreeView.jsx'
import EssDashboard from './components/EssDashboard.jsx'
import FieldGuide from './components/FieldGuide.jsx'
import IavmTracker from './components/IavmTracker.jsx'
import PatchManagement from './components/PatchManagement.jsx'
import PoamTracker from './components/PoamTracker.jsx'
import ScanManagement from './components/ScanManagement.jsx'
import TicketQueue from './components/TicketQueue.jsx'

// App.jsx is the "shell": it draws the sidebar and decides which
// screen to show. `view` is a piece of state — when a sidebar button
// changes it, React re-renders and swaps the main panel.
const views = [
  { id: 'acas', label: 'ACAS / Vulnerability Mgmt', icon: '🛡️' },
  { id: 'scans', label: 'Scan Management', icon: '📡' },
  { id: 'tree', label: 'Asset Tree', icon: '🗂️' },
  { id: 'ess', label: 'ESS / Endpoint Security', icon: '🖥️' },
  { id: 'patch', label: 'Patch / Software Mgmt', icon: '📦' },
  { id: 'iavm', label: 'IAVM Compliance', icon: '📣' },
  { id: 'poam', label: 'POA&M Tracker (RMF)', icon: '📋' },
  { id: 'tickets', label: 'Ticket Queue (ITIL)', icon: '🎫' },
  { id: 'guide', label: 'Field Guide (Study)', icon: '📖' },
]

export default function App() {
  const [view, setView] = useState('acas')

  // Wipes saved practice work (tickets, POA&Ms, checklist) and reloads
  // so the simulator returns to its built-in defaults.
  const resetPracticeData = () => {
    if (!window.confirm('Reset all practice work (tickets, POA&Ms, checklist) to defaults?')) return
    ;['sim-tickets', 'sim-poams', 'sim-iavm-ack', 'fieldguide-checklist'].forEach((k) =>
      window.localStorage.removeItem(k),
    )
    window.location.reload()
  }

  return (
    // Stacks vertically on phones (nav becomes a scrollable strip on
    // top); side-by-side layout from the md breakpoint up.
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 shrink-0 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col">
        <div className="px-4 py-4 border-b border-slate-800">
          <div className="text-sm font-bold text-slate-100">ACAS / ESS SME Simulator</div>
          <div className="text-xs text-slate-500 mt-1">Training sandbox — all data is mock</div>
        </div>
        <nav className="p-2 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible">
          {views.map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={`shrink-0 md:w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 transition-colors ${
                view === v.id
                  ? 'bg-sky-900/60 text-sky-200 font-semibold'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span>{v.icon}</span>
              <span className="whitespace-nowrap">{v.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto p-4 text-xs text-slate-600 border-t border-slate-800 hidden md:block">
          <button
            onClick={resetPracticeData}
            className="mb-3 w-full text-left text-slate-500 hover:text-slate-300 border border-slate-800 rounded px-2 py-1.5"
          >
            ↺ Reset practice data
          </button>
          Simulated environment. No real systems, CVEs are illustrative.
        </div>
      </aside>

      {/* Main panel — swaps based on selected view */}
      <main className="flex-1 p-6 overflow-x-auto">
        {view === 'acas' && <AcasDashboard />}
        {view === 'scans' && <ScanManagement />}
        {view === 'tree' && <AssetTreeView />}
        {view === 'ess' && <EssDashboard />}
        {view === 'patch' && <PatchManagement />}
        {view === 'iavm' && <IavmTracker />}
        {view === 'poam' && <PoamTracker />}
        {view === 'tickets' && <TicketQueue />}
        {view === 'guide' && <FieldGuide />}
      </main>
    </div>
  )
}
