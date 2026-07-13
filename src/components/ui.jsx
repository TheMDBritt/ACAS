// Small reusable UI pieces (badges, cards) shared by every screen,
// so severity colors and styling stay consistent app-wide.

const severityStyles = {
  Critical: 'bg-purple-600 text-white',
  High: 'bg-red-600 text-white',
  Medium: 'bg-orange-500 text-white',
  Low: 'bg-green-600 text-white',
}

export function SeverityBadge({ severity }) {
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${severityStyles[severity] || 'bg-slate-600'}`}>
      {severity}
    </span>
  )
}

const statusStyles = {
  Online: 'bg-green-900 text-green-300 border-green-700',
  Offline: 'bg-red-900 text-red-300 border-red-700',
  Open: 'bg-sky-900 text-sky-300 border-sky-700',
  'In Progress': 'bg-amber-900 text-amber-300 border-amber-700',
  Closed: 'bg-slate-800 text-slate-400 border-slate-600',
  Remediated: 'bg-green-900 text-green-300 border-green-700',
  'Accepted Risk': 'bg-purple-900 text-purple-300 border-purple-700',
}

export function StatusBadge({ status }) {
  return (
    <span className={`px-2 py-0.5 rounded border text-xs font-medium ${statusStyles[status] || 'bg-slate-800 text-slate-300 border-slate-600'}`}>
      {status}
    </span>
  )
}

export function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-lg ${className}`}>
      {title && (
        <div className="px-4 py-2.5 border-b border-slate-800 text-sm font-semibold text-slate-300">
          {title}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  )
}

export function StatTile({ label, value, accent = 'text-slate-100' }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3">
      <div className={`text-2xl font-bold ${accent}`}>{value}</div>
      <div className="text-xs text-slate-400 mt-0.5">{label}</div>
    </div>
  )
}
