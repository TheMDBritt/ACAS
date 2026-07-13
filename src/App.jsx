import { useState } from 'react'
import AcasDashboard from './components/AcasDashboard.jsx'
import AssetTreeView from './components/AssetTreeView.jsx'
import EssDashboard from './components/EssDashboard.jsx'
import PatchManagement from './components/PatchManagement.jsx'
import PoamTracker from './components/PoamTracker.jsx'
import TicketQueue from './components/TicketQueue.jsx'

// App.jsx is the "shell": it draws the sidebar and decides which
// screen to show. `view` is a piece of state — when a sidebar button
// changes it, React re-renders and swaps the main panel.
const views = [
  { id: 'acas', label: 'ACAS / Vulnerability Mgmt', icon: '🛡️' },
  { id: 'tree', label: 'Asset Tree', icon: '🗂️' },
  { id: 'ess', label: 'ESS / Endpoint Security', icon: '🖥️' },
  { id: 'patch', label: 'Patch / Software Mgmt', icon: '📦' },
  { id: 'poam', label: 'POA&M Tracker (RMF)', icon: '📋' },
  { id: 'tickets', label: 'Ticket Queue (ITIL)', icon: '🎫' },
]

export default function App() {
  const [view, setView] = useState('acas')

  return (
    <div className="min-h-screen flex">
      {/* Sidebar navigation */}
      <aside className="w-64 shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="px-4 py-4 border-b border-slate-800">
          <div className="text-sm font-bold text-slate-100">ACAS / ESS SME Simulator</div>
          <div className="text-xs text-slate-500 mt-1">Training sandbox — all data is mock</div>
        </div>
        <nav className="p-2 space-y-1">
          {views.map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 transition-colors ${
                view === v.id
                  ? 'bg-sky-900/60 text-sky-200 font-semibold'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span>{v.icon}</span>
              <span>{v.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto p-4 text-xs text-slate-600 border-t border-slate-800">
          Simulated environment. No real systems, CVEs are illustrative.
        </div>
      </aside>

      {/* Main panel — swaps based on selected view */}
      <main className="flex-1 p-6 overflow-x-auto">
        {view === 'acas' && <AcasDashboard />}
        {view === 'tree' && <AssetTreeView />}
        {view === 'ess' && <EssDashboard />}
        {view === 'patch' && <PatchManagement />}
        {view === 'poam' && <PoamTracker />}
        {view === 'tickets' && <TicketQueue />}
      </main>
    </div>
  )
}
