# ACAS / ESS SME Simulator

A training sandbox that simulates the day-to-day screens of an ESS/ACAS Software Management
SME role in a Navy environment. **All data is mock** — hostnames, IPs, plugin IDs, CVEs, and
findings are fictional and exist only for practice. There is no backend: everything lives in
`src/data/mockData.js`.

## What's inside

| Screen | Simulates | What to practice |
|---|---|---|
| ACAS / Vulnerability Mgmt | Tenable Security Center asset + scan view | Reading severity/CVSS, filtering by severity and STIG compliance, drilling into a host's findings |
| Asset Tree | SC's Repository → OU → Asset Group hierarchy | How scan data and assets are organized |
| ESS / Endpoint Security | McAfee ePO-style system tree | Agent online/offline, versions, last check-in, out-of-date flags |
| Patch / Software Mgmt | Patch pipeline + feed health | Outdated software per asset, plugin feed history, ACAS roll version tracking |
| POA&M Tracker | RMF/eMASS-style POA&M workflow | Marking findings remediated / in-progress / accepted risk, RMF control mapping |
| Ticket Queue | ITIL incident management | P1–P4 priorities, SLA timers, escalation, assignment, open→closed workflow |

## How the code is organized (plain language)

- `index.html` — the single web page; React draws everything into it.
- `src/main.jsx` — the "on switch" that starts React.
- `src/App.jsx` — the shell: sidebar navigation that swaps which screen is shown.
- `src/data/mockData.js` — **all the fake data**. Edit this file to add assets, findings,
  tickets, etc. Every screen reads from here.
- `src/components/` — one file per screen, plus `ui.jsx` for shared badges/cards so
  severity colors look the same everywhere.
- Screens with dropdowns (POA&M status, ticket status/assign/escalate) use React *state*:
  your clicks update the page instantly, but reset on refresh because nothing is saved to
  a server.

## Run it locally

```bash
npm install   # download the parts list in package.json (one time)
npm run dev   # start the dev server, open the printed localhost URL
```

## Deploy on Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New Project → Import** this repo.
3. Vercel auto-detects Vite. Accept the defaults (build command `npm run build`,
   output directory `dist`) and click **Deploy**.

No environment variables or configuration needed.
