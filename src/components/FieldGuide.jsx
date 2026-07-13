import { useState } from 'react'
import { dailyChecklist, glossary, rmfSteps, scenarios } from '../data/mockData.js'
import usePersistentState from '../hooks/usePersistentState.js'
import { Card } from './ui.jsx'

// Study material for the role, in four sections:
//  - Daily Checklist: the morning routine (ticks persist in your browser)
//  - Glossary: searchable acronym decoder
//  - RMF: the 6-step framework at a glance
//  - Scenario Drills: think first, then click to reveal the answer
const sections = ['Daily Checklist', 'Glossary', 'RMF Quick Reference', 'Scenario Drills']

export default function FieldGuide() {
  const [section, setSection] = useState('Daily Checklist')
  const [checked, setChecked] = usePersistentState('fieldguide-checklist', [])
  const [search, setSearch] = useState('')
  const [revealed, setRevealed] = useState({})

  const toggleCheck = (i) =>
    setChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]))

  const filteredGlossary = glossary.filter(
    (g) =>
      g.term.toLowerCase().includes(search.toLowerCase()) ||
      g.def.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Field Guide</h1>
        <p className="text-sm text-slate-400">Study material for the ESS/ACAS SME role — no scan data here, just knowledge</p>
      </div>

      {/* Section tabs */}
      <div className="flex flex-wrap gap-2">
        {sections.map((s) => (
          <button
            key={s}
            onClick={() => setSection(s)}
            className={`px-3 py-1.5 rounded text-sm ${
              section === s
                ? 'bg-sky-900/60 text-sky-200 font-semibold border border-sky-800'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {section === 'Daily Checklist' && (
        <Card title={`Morning Routine — ${checked.length}/${dailyChecklist.length} done (saved in your browser)`}>
          <ul className="space-y-2">
            {dailyChecklist.map((item, i) => (
              <li key={i}>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={checked.includes(i)}
                    onChange={() => toggleCheck(i)}
                    className="mt-0.5 accent-sky-500"
                  />
                  <span className={`text-sm ${checked.includes(i) ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                    {item}
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setChecked([])}
            className="mt-4 text-xs text-slate-500 hover:text-slate-300 border border-slate-700 rounded px-2 py-1"
          >
            Reset checklist
          </button>
        </Card>
      )}

      {section === 'Glossary' && (
        <Card title="Acronym Decoder">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search terms (e.g. IAVA, POA&M, roll)..."
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm mb-4 placeholder:text-slate-600"
          />
          <dl className="space-y-3">
            {filteredGlossary.map((g) => (
              <div key={g.term} className="border-b border-slate-800/60 pb-3">
                <dt className="text-sm font-semibold text-sky-300">{g.term}</dt>
                <dd className="text-sm text-slate-400 mt-0.5">{g.def}</dd>
              </div>
            ))}
            {filteredGlossary.length === 0 && (
              <div className="text-sm text-slate-500">No terms match &quot;{search}&quot;.</div>
            )}
          </dl>
        </Card>
      )}

      {section === 'RMF Quick Reference' && (
        <Card title="Risk Management Framework — 6 Steps">
          <ol className="space-y-3">
            {rmfSteps.map((r) => (
              <li key={r.step} className="flex gap-3">
                <span className="text-sm font-semibold text-sky-300 w-32 shrink-0">{r.step}</span>
                <span className="text-sm text-slate-400">{r.desc}</span>
              </li>
            ))}
          </ol>
          <p className="text-xs text-slate-500 mt-4">
            Everything in this simulator — scans, POA&Ms, IAVM tracking, agent health — is Step 6
            (Continuous Monitoring) in action. When someone says &quot;this feeds the RMF package,&quot;
            they mean the evidence goes into eMASS to keep the system&apos;s ATO alive.
          </p>
        </Card>
      )}

      {section === 'Scenario Drills' && (
        <div className="space-y-3">
          <p className="text-sm text-slate-400">
            Read the situation, decide what you&apos;d do, <em>then</em> reveal the answer.
          </p>
          {scenarios.map((s) => (
            <Card key={s.id}>
              <div className="text-sm text-slate-200 font-medium">{s.situation}</div>
              {revealed[s.id] ? (
                <div className="mt-3 text-sm text-green-300 bg-green-950/40 border border-green-900 rounded p-3">
                  {s.answer}
                </div>
              ) : (
                <button
                  onClick={() => setRevealed((r) => ({ ...r, [s.id]: true }))}
                  className="mt-3 text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded px-2.5 py-1"
                >
                  Reveal answer
                </button>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
