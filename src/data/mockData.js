// ============================================================
// MOCK DATA — everything the app displays lives in this file.
// There is no backend or database: edit this file to change
// what appears on every screen. All names, IPs, plugin IDs,
// and findings are fictional training data.
// ============================================================

// ---- Asset tree (mirrors Tenable Security Center's
// Repository > Organizational Unit > Asset Group hierarchy) ----
export const assetTree = [
  {
    repository: 'NIPR_Shore_Repo',
    orgUnits: [
      {
        name: 'NAVSTA Norfolk - Bldg 1400',
        groups: [
          { name: 'Windows Servers', assetIds: ['A-001', 'A-002', 'A-003'] },
          { name: 'Linux Servers', assetIds: ['A-004', 'A-005'] },
        ],
      },
      {
        name: 'NAVSTA Norfolk - Bldg 1425',
        groups: [
          { name: 'Admin Workstations', assetIds: ['A-006', 'A-007', 'A-008'] },
          { name: 'Watchfloor Workstations', assetIds: ['A-009', 'A-010'] },
        ],
      },
    ],
  },
  {
    repository: 'NIPR_Lab_Repo',
    orgUnits: [
      {
        name: 'Test & Integration Lab',
        groups: [
          { name: 'Lab Servers', assetIds: ['A-011'] },
          { name: 'Lab Workstations', assetIds: ['A-012'] },
        ],
      },
    ],
  },
]

// ---- Asset inventory ----
export const assets = [
  { id: 'A-001', hostname: 'NRFK-DC-01', ip: '10.14.20.11', type: 'Server', os: 'Windows Server 2019', role: 'Domain Controller', repository: 'NIPR_Shore_Repo', group: 'Windows Servers', lastScan: '2026-07-11 02:14', stigCompliant: false, agent: { status: 'Online', version: '5.8.2.410', lastCheckIn: '2026-07-13 06:42', outOfDate: false } },
  { id: 'A-002', hostname: 'NRFK-EX-01', ip: '10.14.20.12', type: 'Server', os: 'Windows Server 2019', role: 'Exchange Server', repository: 'NIPR_Shore_Repo', group: 'Windows Servers', lastScan: '2026-07-11 02:31', stigCompliant: false, agent: { status: 'Online', version: '5.8.2.410', lastCheckIn: '2026-07-13 06:40', outOfDate: false } },
  { id: 'A-003', hostname: 'NRFK-SQL-01', ip: '10.14.20.13', type: 'Server', os: 'Windows Server 2022', role: 'SQL Database', repository: 'NIPR_Shore_Repo', group: 'Windows Servers', lastScan: '2026-07-11 02:47', stigCompliant: true, agent: { status: 'Online', version: '5.8.1.390', lastCheckIn: '2026-07-13 05:58', outOfDate: true } },
  { id: 'A-004', hostname: 'NRFK-WEB-01', ip: '10.14.21.21', type: 'Server', os: 'RHEL 8.9', role: 'Web Server (Apache)', repository: 'NIPR_Shore_Repo', group: 'Linux Servers', lastScan: '2026-07-11 03:02', stigCompliant: false, agent: { status: 'Online', version: '5.8.2.410', lastCheckIn: '2026-07-13 06:44', outOfDate: false } },
  { id: 'A-005', hostname: 'NRFK-LOG-01', ip: '10.14.21.22', type: 'Server', os: 'RHEL 9.3', role: 'Syslog Collector', repository: 'NIPR_Shore_Repo', group: 'Linux Servers', lastScan: '2026-07-11 03:15', stigCompliant: true, agent: { status: 'Offline', version: '5.8.0.372', lastCheckIn: '2026-07-08 22:10', outOfDate: true } },
  { id: 'A-006', hostname: 'NRFK-WS-1101', ip: '10.14.30.101', type: 'Workstation', os: 'Windows 11', role: 'Admin Workstation', repository: 'NIPR_Shore_Repo', group: 'Admin Workstations', lastScan: '2026-07-12 09:20', stigCompliant: true, agent: { status: 'Online', version: '5.8.2.410', lastCheckIn: '2026-07-13 06:45', outOfDate: false } },
  { id: 'A-007', hostname: 'NRFK-WS-1102', ip: '10.14.30.102', type: 'Workstation', os: 'Windows 11', role: 'Admin Workstation', repository: 'NIPR_Shore_Repo', group: 'Admin Workstations', lastScan: '2026-07-12 09:26', stigCompliant: false, agent: { status: 'Online', version: '5.8.2.410', lastCheckIn: '2026-07-13 06:41', outOfDate: false } },
  { id: 'A-008', hostname: 'NRFK-WS-1103', ip: '10.14.30.103', type: 'Workstation', os: 'Windows 10', role: 'Admin Workstation', repository: 'NIPR_Shore_Repo', group: 'Admin Workstations', lastScan: '2026-07-12 09:33', stigCompliant: false, agent: { status: 'Offline', version: '5.7.9.301', lastCheckIn: '2026-07-05 14:02', outOfDate: true } },
  { id: 'A-009', hostname: 'NRFK-WS-2201', ip: '10.14.31.201', type: 'Workstation', os: 'Windows 11', role: 'Watchfloor Workstation', repository: 'NIPR_Shore_Repo', group: 'Watchfloor Workstations', lastScan: '2026-07-12 10:05', stigCompliant: true, agent: { status: 'Online', version: '5.8.2.410', lastCheckIn: '2026-07-13 06:43', outOfDate: false } },
  { id: 'A-010', hostname: 'NRFK-WS-2202', ip: '10.14.31.202', type: 'Workstation', os: 'Windows 11', role: 'Watchfloor Workstation', repository: 'NIPR_Shore_Repo', group: 'Watchfloor Workstations', lastScan: '2026-07-12 10:12', stigCompliant: true, agent: { status: 'Online', version: '5.8.2.410', lastCheckIn: '2026-07-13 06:44', outOfDate: false } },
  { id: 'A-011', hostname: 'LAB-APP-01', ip: '10.99.10.31', type: 'Server', os: 'Windows Server 2022', role: 'Lab Application Server', repository: 'NIPR_Lab_Repo', group: 'Lab Servers', lastScan: '2026-07-10 16:40', stigCompliant: false, agent: { status: 'Online', version: '5.8.2.410', lastCheckIn: '2026-07-13 06:38', outOfDate: false } },
  { id: 'A-012', hostname: 'LAB-WS-01', ip: '10.99.10.32', type: 'Workstation', os: 'Windows 11', role: 'Lab Workstation', repository: 'NIPR_Lab_Repo', group: 'Lab Workstations', lastScan: '2026-07-10 16:55', stigCompliant: true, agent: { status: 'Online', version: '5.8.2.410', lastCheckIn: '2026-07-13 06:39', outOfDate: false } },
]

// ---- Vulnerability findings (styled like Tenable.sc plugin output) ----
export const findings = [
  { id: 'F-1001', assetId: 'A-001', pluginId: '193421', name: 'Microsoft Windows Server 2019 Missing Cumulative Update (June 2026)', severity: 'Critical', cvss: 9.8, family: 'Windows : Microsoft Bulletins', stigFinding: true, stigId: 'WN19-00-000010', firstSeen: '2026-06-14', description: 'The remote Windows host is missing security update KB5059991. An unauthenticated attacker could exploit a remote code execution flaw in the Windows TCP/IP stack.', solution: 'Apply the June 2026 cumulative update KB5059991.' },
  { id: 'F-1002', assetId: 'A-001', pluginId: '187550', name: 'SMB Signing Not Required', severity: 'Medium', cvss: 5.3, family: 'Windows', stigFinding: true, stigId: 'WN19-SO-000160', firstSeen: '2026-05-02', description: 'Signing is not required on the remote SMB server. An unauthenticated remote attacker can exploit this to conduct man-in-the-middle attacks.', solution: 'Enforce message signing in the host security policy (Microsoft network server: Digitally sign communications = Always).' },
  { id: 'F-1003', assetId: 'A-002', pluginId: '195102', name: 'Microsoft Exchange Server RCE (CVE-2026-21012)', severity: 'Critical', cvss: 9.9, family: 'Windows : Microsoft Bulletins', stigFinding: false, stigId: null, firstSeen: '2026-06-28', description: 'The Exchange Server build on the remote host is affected by a remote code execution vulnerability exploitable by an authenticated user.', solution: 'Upgrade to Exchange Server 2019 CU15 SU3 or later.' },
  { id: 'F-1004', assetId: 'A-002', pluginId: '183212', name: 'TLS 1.0 Protocol Detected', severity: 'Medium', cvss: 6.5, family: 'Service Detection', stigFinding: true, stigId: 'SRG-OS-000425', firstSeen: '2026-03-19', description: 'The remote service accepts connections encrypted using TLS 1.0, which has known cryptographic weaknesses.', solution: 'Disable TLS 1.0 and enable support for TLS 1.2 or 1.3.' },
  { id: 'F-1005', assetId: 'A-003', pluginId: '190334', name: 'Microsoft SQL Server Elevation of Privilege (CVE-2026-11433)', severity: 'High', cvss: 8.8, family: 'Databases', stigFinding: false, stigId: null, firstSeen: '2026-06-02', description: 'The SQL Server instance is missing a security update that addresses an elevation of privilege vulnerability.', solution: 'Apply SQL Server 2022 CU12 GDR.' },
  { id: 'F-1006', assetId: 'A-004', pluginId: '191877', name: 'Apache HTTP Server 2.4.x < 2.4.62 Multiple Vulnerabilities', severity: 'High', cvss: 8.1, family: 'Web Servers', stigFinding: false, stigId: null, firstSeen: '2026-05-21', description: 'The version of Apache httpd on the remote host is prior to 2.4.62 and affected by multiple vulnerabilities including request smuggling.', solution: 'Upgrade to Apache HTTP Server 2.4.62 or later.' },
  { id: 'F-1007', assetId: 'A-004', pluginId: '182009', name: 'SSH Weak Key Exchange Algorithms Enabled', severity: 'Low', cvss: 3.7, family: 'Misc.', stigFinding: true, stigId: 'RHEL-08-040342', firstSeen: '2026-02-10', description: 'The remote SSH server allows key exchange algorithms considered weak (diffie-hellman-group1-sha1).', solution: 'Remove weak KEX algorithms from /etc/crypto-policies or sshd_config.' },
  { id: 'F-1008', assetId: 'A-005', pluginId: '196001', name: 'RHEL 9 : kernel security update (RHSA-2026:4410)', severity: 'High', cvss: 7.8, family: 'Red Hat Local Security Checks', stigFinding: false, stigId: null, firstSeen: '2026-07-01', description: 'The remote RHEL 9 host has a kernel package affected by a local privilege escalation vulnerability.', solution: 'Update the kernel package per RHSA-2026:4410 and reboot.' },
  { id: 'F-1009', assetId: 'A-006', pluginId: '188420', name: 'Google Chrome < 137.0.7151.55 Multiple Vulnerabilities', severity: 'High', cvss: 8.8, family: 'Windows', stigFinding: false, stigId: null, firstSeen: '2026-06-20', description: 'The version of Google Chrome installed on the remote Windows host is affected by multiple use-after-free vulnerabilities.', solution: 'Upgrade Google Chrome to 137.0.7151.55 or later.' },
  { id: 'F-1010', assetId: 'A-007', pluginId: '194233', name: 'Adobe Acrobat Reader < 25.001.20521 Arbitrary Code Execution', severity: 'Critical', cvss: 9.8, family: 'Windows', stigFinding: false, stigId: null, firstSeen: '2026-06-25', description: 'The Adobe Acrobat Reader version on the remote host is affected by an out-of-bounds write allowing arbitrary code execution via a crafted PDF.', solution: 'Upgrade Adobe Acrobat Reader to 25.001.20521 or later.' },
  { id: 'F-1011', assetId: 'A-007', pluginId: '186340', name: 'Windows 11 STIG: Account Lockout Threshold Not Configured', severity: 'Medium', cvss: 5.5, family: 'Policy Compliance', stigFinding: true, stigId: 'WN11-AC-000010', firstSeen: '2026-04-15', description: 'The account lockout threshold on the remote host does not meet STIG requirements (must be 3 or fewer invalid attempts).', solution: 'Configure Account lockout threshold to 3 invalid logon attempts via GPO.' },
  { id: 'F-1012', assetId: 'A-008', pluginId: '179001', name: 'Microsoft Windows 10 Unsupported Version Detection', severity: 'Critical', cvss: 10.0, family: 'Windows', stigFinding: true, stigId: 'WN10-00-000040', firstSeen: '2026-01-08', description: 'The Windows 10 build on the remote host is past end of servicing and no longer receives security updates.', solution: 'Upgrade to a supported Windows build (Windows 11).' },
  { id: 'F-1013', assetId: 'A-008', pluginId: '188420', name: 'Google Chrome < 137.0.7151.55 Multiple Vulnerabilities', severity: 'High', cvss: 8.8, family: 'Windows', stigFinding: false, stigId: null, firstSeen: '2026-06-20', description: 'The version of Google Chrome installed on the remote Windows host is affected by multiple use-after-free vulnerabilities.', solution: 'Upgrade Google Chrome to 137.0.7151.55 or later.' },
  { id: 'F-1014', assetId: 'A-009', pluginId: '185512', name: 'Mozilla Firefox ESR < 128.11 Multiple Vulnerabilities', severity: 'Medium', cvss: 6.1, family: 'Windows', stigFinding: false, stigId: null, firstSeen: '2026-06-11', description: 'The Firefox ESR version installed is affected by multiple memory safety bugs.', solution: 'Upgrade Firefox ESR to 128.11 or later.' },
  { id: 'F-1015', assetId: 'A-011', pluginId: '193421', name: 'Microsoft Windows Server 2022 Missing Cumulative Update (June 2026)', severity: 'Critical', cvss: 9.8, family: 'Windows : Microsoft Bulletins', stigFinding: true, stigId: 'WN22-00-000010', firstSeen: '2026-06-14', description: 'The remote Windows host is missing security update KB5059992.', solution: 'Apply the June 2026 cumulative update KB5059992.' },
  { id: 'F-1016', assetId: 'A-011', pluginId: '171223', name: 'Microsoft .NET Framework Unsupported Version', severity: 'High', cvss: 7.5, family: 'Windows', stigFinding: false, stigId: null, firstSeen: '2026-03-30', description: 'The remote host has an unsupported version of the .NET Framework installed (4.6.2).', solution: 'Upgrade to .NET Framework 4.8.1 or migrate the application.' },
  { id: 'F-1017', assetId: 'A-012', pluginId: '182115', name: 'WinVerifyTrust Signature Validation (Informational Weakness)', severity: 'Low', cvss: 3.1, family: 'Windows', stigFinding: false, stigId: null, firstSeen: '2026-02-22', description: 'The remote host has not enabled strict WinVerifyTrust signature validation (EnableCertPaddingCheck).', solution: 'Set the EnableCertPaddingCheck registry value per MS13-098.' },
  { id: 'F-1018', assetId: 'A-005', pluginId: '186712', name: 'RHEL 9 STIG: Audit Daemon Not Configured to Halt on Failure', severity: 'Medium', cvss: 5.0, family: 'Policy Compliance', stigFinding: true, stigId: 'RHEL-09-653030', firstSeen: '2026-05-14', description: 'auditd is not configured to take action when the audit storage volume is full, per STIG requirements.', solution: 'Configure disk_full_action in /etc/audit/auditd.conf.' },
]

// ---- Patch management: outdated software per asset ----
export const patchItems = [
  { id: 'P-01', assetId: 'A-001', software: 'Windows Server 2019 CU', installed: 'May 2026 CU (KB5058701)', available: 'June 2026 CU (KB5059991)', status: 'Pending Approval', relatedFinding: 'F-1001' },
  { id: 'P-02', assetId: 'A-002', software: 'Exchange Server 2019', installed: 'CU15 SU1', available: 'CU15 SU3', status: 'Scheduled', relatedFinding: 'F-1003' },
  { id: 'P-03', assetId: 'A-003', software: 'SQL Server 2022', installed: 'CU11', available: 'CU12 GDR', status: 'Pending Approval', relatedFinding: 'F-1005' },
  { id: 'P-04', assetId: 'A-004', software: 'Apache httpd', installed: '2.4.58', available: '2.4.62', status: 'In Testing', relatedFinding: 'F-1006' },
  { id: 'P-05', assetId: 'A-005', software: 'RHEL 9 kernel', installed: '5.14.0-427.13.1', available: '5.14.0-427.42.1 (RHSA-2026:4410)', status: 'Blocked - Agent Offline', relatedFinding: 'F-1008' },
  { id: 'P-06', assetId: 'A-006', software: 'Google Chrome', installed: '136.0.7103.114', available: '137.0.7151.55', status: 'Deployed - Awaiting Rescan', relatedFinding: 'F-1009' },
  { id: 'P-07', assetId: 'A-007', software: 'Adobe Acrobat Reader', installed: '25.001.20432', available: '25.001.20521', status: 'Scheduled', relatedFinding: 'F-1010' },
  { id: 'P-08', assetId: 'A-008', software: 'Windows 10 → 11 Upgrade', installed: 'Win10 22H2 (EOL)', available: 'Windows 11 24H2', status: 'Awaiting Hardware Refresh', relatedFinding: 'F-1012' },
  { id: 'P-09', assetId: 'A-011', software: '.NET Framework', installed: '4.6.2', available: '4.8.1', status: 'In Testing', relatedFinding: 'F-1016' },
]

// ---- Plugin feed + SC roll version tracking ----
export const feedStatus = {
  scVersion: '6.4.5',
  scRollVersion: 'ACAS Roll 26-3',
  rollReleased: '2026-06-18',
  rollDeployed: '2026-06-24',
  activePluginSet: '202607120214',
  pluginFeedLastUpdate: '2026-07-12 02:14',
  pluginFeedStatus: 'Current',
  feedHistory: [
    { date: '2026-07-12 02:14', set: '202607120214', result: 'Success' },
    { date: '2026-07-11 02:11', set: '202607110211', result: 'Success' },
    { date: '2026-07-10 02:09', set: '202607100209', result: 'Success' },
    { date: '2026-07-09 02:12', set: '202607090212', result: 'Failed - retry succeeded 04:30' },
    { date: '2026-07-08 02:10', set: '202607080210', result: 'Success' },
  ],
}

// ---- POA&M entries (tied to findings + RMF control families) ----
export const initialPoams = [
  { id: 'POAM-26-014', findingId: 'F-1001', rmfControl: 'SI-2 (Flaw Remediation)', status: 'In Progress', scheduledCompletion: '2026-07-25', pocRole: 'ACAS SME', milestones: 'CAB approval 7/15, deploy 7/18, rescan 7/20', comments: 'June CU pending CAB approval.' },
  { id: 'POAM-26-015', findingId: 'F-1003', rmfControl: 'SI-2 (Flaw Remediation)', status: 'In Progress', scheduledCompletion: '2026-07-20', pocRole: 'Exchange Admin', milestones: 'SU3 scheduled maintenance window 7/18', comments: 'Critical - tracked at weekly cyber huddle.' },
  { id: 'POAM-26-016', findingId: 'F-1012', rmfControl: 'CM-2 (Baseline Configuration)', status: 'Accepted Risk', scheduledCompletion: '2026-09-30', pocRole: 'ISSM', milestones: 'Hardware refresh Q4; interim isolation VLAN applied', comments: 'Risk acceptance signed by AO 2026-06-30.' },
  { id: 'POAM-26-017', findingId: 'F-1004', rmfControl: 'SC-8 (Transmission Confidentiality)', status: 'In Progress', scheduledCompletion: '2026-08-01', pocRole: 'ESS SME', milestones: 'Registry change tested in lab 7/10', comments: 'Awaiting change ticket approval.' },
  { id: 'POAM-26-018', findingId: 'F-1002', rmfControl: 'AC-17 (Remote Access)', status: 'Remediated', scheduledCompletion: '2026-07-05', pocRole: 'ACAS SME', milestones: 'GPO pushed 7/03, verified by rescan 7/05', comments: 'Closed pending final scan validation.' },
  { id: 'POAM-26-019', findingId: 'F-1011', rmfControl: 'AC-7 (Unsuccessful Logon Attempts)', status: 'In Progress', scheduledCompletion: '2026-07-22', pocRole: 'ESS SME', milestones: 'GPO drafted, testing on lab OU', comments: 'STIG finding from July checklist review.' },
  { id: 'POAM-26-020', findingId: 'F-1018', rmfControl: 'AU-5 (Response to Audit Failures)', status: 'In Progress', scheduledCompletion: '2026-08-10', pocRole: 'Linux Admin', milestones: 'Config change drafted', comments: 'Blocked: host agent offline, see ticket T-2607.' },
]

// ---- Ticket queue (ITIL-style incident records) ----
// SLA hours by priority: P1=4h, P2=8h, P3=24h, P4=72h
export const slaHoursByPriority = { P1: 4, P2: 8, P3: 24, P4: 72 }

export const initialTickets = [
  { id: 'T-2601', title: 'NRFK-EX-01 critical Exchange RCE finding - patch coordination', priority: 'P1', status: 'In Progress', assignee: 'You (ACAS SME)', requester: 'ISSM', category: 'Vulnerability Remediation', createdAt: '2026-07-13 05:30', escalated: false, notes: 'Coordinate SU3 install with Exchange admin during tonight\'s maintenance window.' },
  { id: 'T-2602', title: 'Plugin feed failed overnight on SC console', priority: 'P2', status: 'Closed', assignee: 'You (ACAS SME)', requester: 'Watch Officer', category: 'ACAS Infrastructure', createdAt: '2026-07-09 06:15', escalated: false, notes: 'Retry succeeded at 04:30. Root cause: upstream feed timeout.' },
  { id: 'T-2603', title: 'New workstations in Bldg 1425 need agent install + repo assignment', priority: 'P3', status: 'Open', assignee: 'Unassigned', requester: 'Site Lead', category: 'Asset Onboarding', createdAt: '2026-07-12 14:20', escalated: false, notes: 'Five new Win11 seats. Deploy agents, add to Admin Workstations group, kick off discovery scan.' },
  { id: 'T-2604', title: 'NRFK-WS-1103 agent offline > 7 days', priority: 'P2', status: 'In Progress', assignee: 'You (ESS SME)', requester: 'Automated Alert', category: 'Endpoint Health', createdAt: '2026-07-12 08:00', escalated: true, notes: 'Host unreachable. Escalated to desktop support for physical check.' },
  { id: 'T-2605', title: 'Monthly STIG compliance report for CO brief', priority: 'P3', status: 'Open', assignee: 'You (ACAS SME)', requester: 'ISSM', category: 'Reporting', createdAt: '2026-07-11 09:45', escalated: false, notes: 'Export compliance summary by OU, due before 7/18 brief.' },
  { id: 'T-2606', title: 'Credentialed scan failing on NRFK-SQL-01', priority: 'P3', status: 'In Progress', assignee: 'You (ACAS SME)', requester: 'Automated Alert', category: 'Scan Health', createdAt: '2026-07-10 11:30', escalated: false, notes: 'Auth failure in last scan. Verify scan account password and WMI access.' },
  { id: 'T-2607', title: 'NRFK-LOG-01 agent offline - blocking kernel patch POA&M', priority: 'P2', status: 'Open', assignee: 'Unassigned', requester: 'You (ACAS SME)', category: 'Endpoint Health', createdAt: '2026-07-13 06:50', escalated: false, notes: 'Linked to POAM-26-020. Needs Linux admin to restart agent service.' },
  { id: 'T-2608', title: 'Request: add Lab repo assets to weekly scan schedule', priority: 'P4', status: 'Closed', assignee: 'You (ACAS SME)', requester: 'Lab Lead', category: 'Scan Scheduling', createdAt: '2026-07-07 13:10', escalated: false, notes: 'Added LAB-APP-01 and LAB-WS-01 to Wednesday scan window.' },
]

// ---- Small helpers used by multiple screens ----
export const severityOrder = ['Critical', 'High', 'Medium', 'Low']

export function findingsForAsset(assetId) {
  return findings.filter((f) => f.assetId === assetId)
}

export function severityCounts(list) {
  return severityOrder.reduce((acc, sev) => {
    acc[sev] = list.filter((f) => f.severity === sev).length
    return acc
  }, {})
}
