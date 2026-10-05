import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgStudio, AgStudioProvider } from 'ag-studio-react';
import { AgStudioAiModule, enableStudioDevValidations } from 'ag-studio';
import './styles.css';

if (import.meta.env.DEV) enableStudioDevValidations();

const classroomRequests = [
  { request: 'Sensory Learning Kits', teacher: 'Ms. Fatima', school: 'Northview Academy', subject: 'Special education', accessibilityNeed: 'Sensory supports', urgency: 'Urgent', status: 'Funding', goal: 5000, funded: 3480, evidence: 'Verified', milestone: 'Purchase kits' },
  { request: 'Robotics for Every Learner', teacher: 'Mr. Chen', school: 'Harbor STEM', subject: 'STEM', accessibilityNeed: 'Adaptive controls', urgency: 'High', status: 'Funding', goal: 7500, funded: 6900, evidence: 'Verified', milestone: 'Order components' },
  { request: 'Accessible Reading Library', teacher: 'Ms. Amina', school: 'Maple Ridge School', subject: 'Literacy', accessibilityNeed: 'Large-print + audio', urgency: 'Urgent', status: 'Evidence review', goal: 4200, funded: 1720, evidence: 'Pending', milestone: 'Upload book list' },
  { request: 'Climate Data Field Lab', teacher: 'Mr. Patel', school: 'Northview Academy', subject: 'Science', accessibilityNeed: '—', urgency: 'Standard', status: 'Funding', goal: 4000, funded: 3540, evidence: 'Verified', milestone: 'Book field lab' },
  { request: 'Art Supplies for Newcomers', teacher: 'Ms. Ruiz', school: 'Maple Ridge School', subject: 'Arts', accessibilityNeed: 'Multilingual guides', urgency: 'High', status: 'Funding', goal: 3600, funded: 2860, evidence: 'Verified', milestone: 'Confirm supplier' }
];

const paymentRecords = [
  { paymentId: 'SANDBOX-8F3A', campaign: 'Sensory Learning Kits', donorType: 'Monthly donor', amount: 120, currency: 'USD', paymentStatus: 'Completed', receivedAt: '2026-10-05 10:42', confirmation: 'Captured' },
  { paymentId: 'SANDBOX-8F39', campaign: 'Robotics for Every Learner', donorType: 'Alumni network', amount: 850, currency: 'USD', paymentStatus: 'Completed', receivedAt: '2026-10-05 09:18', confirmation: 'Captured' },
  { paymentId: 'SANDBOX-8F31', campaign: 'Climate Data Field Lab', donorType: 'Parent group', amount: 220, currency: 'USD', paymentStatus: 'Completed', receivedAt: '2026-10-04 17:07', confirmation: 'Captured' },
  { paymentId: 'SANDBOX-8F23', campaign: 'Accessible Reading Library', donorType: 'Community donor', amount: 75, currency: 'USD', paymentStatus: 'Pending', receivedAt: '2026-10-04 13:31', confirmation: 'Awaiting capture' }
];

const impactMilestones = classroomRequests.map(({ request, school, funded, goal, evidence, milestone, status }) => ({
  campaign: request, school, fundingGap: goal - funded, evidenceStatus: evidence, nextMilestone: milestone, campaignStatus: status
}));

function App() {
  const [showStudio, setShowStudio] = useState(true);
  const [reportNotice, setReportNotice] = useState('');
  const studioData = useMemo(() => ({
    sources: [
      { id: 'classroomRequests', data: classroomRequests },
      { id: 'paymentRecords', data: paymentRecords },
      { id: 'impactMilestones', data: impactMilestones }
    ]
  }), []);
  const licenseKey = import.meta.env.VITE_AG_STUDIO_LICENSE_KEY;

  const exportSummary = () => {
    const text = ['ClassFund AI impact report', 'Students reached: 1,284', 'Verified evidence: 89%', 'PayPal Sandbox donations: $8,460', 'Urgent accessibility requests: 2'].join('\n');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
    link.download = 'classfund-impact-report.txt';
    link.click();
    setReportNotice('Impact summary downloaded. Use Studio’s export controls for dashboard-level reports.');
  };

  return <main className="app-shell">
    <header className="topbar">
      <div className="brand"><span className="brand-mark">C</span><span><strong>ClassFund AI</strong><small>Impact operations · PayPal + AI + AG Studio</small></span></div>
      <div className="top-actions"><button className="quiet" onClick={exportSummary}>Export impact summary</button><button className="primary" onClick={() => setShowStudio((value) => !value)}>{showStudio ? 'Focus payments' : 'Open Studio'}</button><span className="avatar">RB</span></div>
    </header>

    <section className="hero">
      <div><span className="eyebrow">Evidence-driven classroom funding</span><h1>Make every classroom dollar visible, accountable, and actionable.</h1><p>ClassFund AI connects PayPal Sandbox payments with evidence, funding gaps, and teacher milestones.</p></div>
      <div className="portfolio"><span>Portfolio funding</span><strong>$42,680 <em>/ $59,350</em></strong><div className="meter"><i /></div><small>72% funded across 18 classrooms</small></div>
    </section>

    <section className="metrics">
      <Metric label="PayPal Sandbox donations" value="$8,460" note="↑ 18.4% this week" />
      <Metric label="Urgent requests" value="4" note="2 accessibility-related" warning />
      <Metric label="Evidence verified" value="89%" note="↑ 6% this month" />
      <Metric label="Students reached" value="1,284" note="Across 7 schools" />
    </section>

    <section className="studio-panel">
      <div className="studio-heading"><div><span className="eyebrow dark">AG Studio embedded analytics</span><h2>Impact Operations Dashboard</h2><p>Build, filter, group, edit, and export dashboards from live-shaped funding, payment, and impact sources.</p></div><div className="chips"><span>3 data sources</span><span>{licenseKey ? 'Trial key configured' : 'Trial key pending'}</span><span>AI module registered</span></div></div>
      {showStudio ? <div className="studio-canvas"><AgStudioProvider licenseKey={licenseKey} modules={[AgStudioAiModule]}><AgStudio data={studioData} mode="edit" /></AgStudioProvider></div> : <div className="payment-focus"><h3>Payment confirmation view</h3><p>Return to Studio to create your own payment-progress, evidence, accessibility, and funding-gap widgets.</p><ul>{paymentRecords.map((payment) => <li key={payment.paymentId}><b>{payment.paymentId}</b><span>{payment.campaign} · ${payment.amount} · {payment.confirmation}</span></li>)}</ul></div>}
      <div className="studio-footer">Tip: start by creating a table widget from <b>classroomRequests</b>, then add a grouped payment-progress chart and a funding-gap KPI.</div>
    </section>

    <section className="bottom-grid"><article><span className="eyebrow dark">PayPal Sandbox</span><h2>Payment transparency</h2><p>Donation records expose confirmation state, campaign destination, and progress context for donors and teachers.</p><button className="primary" onClick={() => setShowStudio(true)}>Explore payment data</button></article><article><span className="eyebrow dark">Studio Agent Framework</span><h2>Ready for the impact agent</h2><p>The AG Studio AI module is registered. Connect your approved model harness next to ask questions such as “Which urgent accessibility requests need funding this week?”</p><a href="https://www.ag-grid.com/studio/react/ai-agents/" target="_blank" rel="noreferrer">Open agent setup guide</a></article></section>
    {reportNotice && <p className="notice" role="status">{reportNotice}</p>}
  </main>;
}

function Metric({ label, value, note, warning }) { return <article className="metric"><small>{label}</small><strong>{value}</strong><span className={warning ? 'warning' : ''}>{note}</span></article>; }

createRoot(document.getElementById('root')).render(<App />);
