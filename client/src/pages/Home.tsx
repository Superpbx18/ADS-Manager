import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Boxes,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  Code2,
  Database,
  Download,
  ExternalLink,
  Filter,
  Gauge,
  GitBranch,
  Inbox,
  Layers3,
  Link2,
  ListFilter,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  Network,
  Plus,
  RefreshCw,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UploadCloud,
  Users,
  X,
  Zap,
} from "lucide-react";


type Section = "ภาพรวม" | "Event Stream" | "Segments" | "Meta Sync" | "Integrations" | "Settings";
type EventStatus = "ส่งแล้ว" | "รอส่ง" | "ถูกกรอง";

type NavItem = {
  label: Section;
  caption: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { label: "ภาพรวม", caption: "Control room", icon: Gauge },
  { label: "Event Stream", caption: "Live activity", icon: Activity },
  { label: "Segments", caption: "Customer groups", icon: Layers3 },
  { label: "Meta Sync", caption: "Audience delivery", icon: Send },
];

const setupItems: NavItem[] = [
  { label: "Integrations", caption: "Sources & destinations", icon: Network },
  { label: "Settings", caption: "Workspace controls", icon: Settings2 },
];

const events = [
  { name: "Purchase", customer: "ariya.s•••@mail.com", source: "Website", value: "฿4,290", status: "ส่งแล้ว" as EventStatus, time: "เมื่อ 12 วินาทีที่แล้ว", tone: "green" },
  { name: "Lead", customer: "narin.p•••@gmail.com", source: "Landing page", value: "—", status: "รอส่ง" as EventStatus, time: "เมื่อ 29 วินาทีที่แล้ว", tone: "amber" },
  { name: "ViewContent", customer: "anonymous_8f31•••", source: "Website", value: "—", status: "ส่งแล้ว" as EventStatus, time: "เมื่อ 1 นาทีที่แล้ว", tone: "blue" },
  { name: "AddToCart", customer: "kanya.r•••@mail.com", source: "Website", value: "฿1,590", status: "ส่งแล้ว" as EventStatus, time: "เมื่อ 2 นาทีที่แล้ว", tone: "blue" },
  { name: "Purchase", customer: "thanawat.k•••@mail.com", source: "CRM import", value: "฿8,990", status: "ถูกกรอง" as EventStatus, time: "เมื่อ 3 นาทีที่แล้ว", tone: "red" },
  { name: "Lead", customer: "pimchanok.s•••@gmail.com", source: "Landing page", value: "—", status: "ส่งแล้ว" as EventStatus, time: "เมื่อ 4 นาทีที่แล้ว", tone: "green" },
];

const initialSegments = [
  { name: "High-value customers", note: "ซื้อสะสม 90 วัน > ฿10,000", members: "8,426", change: "+18.4%", sync: "อัปเดตแล้ว", color: "coral", label: "HIGH VALUE" },
  { name: "Repeat buyers", note: "ซื้ออย่างน้อย 2 ครั้งใน 90 วัน", members: "5,104", change: "+7.2%", sync: "อัปเดตแล้ว", color: "cyan", label: "REPEAT" },
  { name: "Qualified leads", note: "Lead score ≥ 70 และมี consent", members: "2,980", change: "+12.8%", sync: "กำลัง sync", color: "violet", label: "QUALIFIED" },
  { name: "At-risk customers", note: "ไม่มีการซื้อซ้ำเกิน 120 วัน", members: "12,643", change: "-3.1%", sync: "อัปเดตเมื่อวาน", color: "amber", label: "RETENTION" },
];

const weekBars = [42, 56, 48, 78, 64, 88, 72, 92, 80, 96, 83, 90, 74, 86, 95, 82, 88, 98, 90, 96, 84, 91, 78, 94];
const channelBars = [38, 52, 44, 68, 60, 74, 64, 78, 69, 82, 72, 80, 76, 88, 82, 92, 86, 94, 89, 96, 88, 92, 84, 90];

function StatusPill({ status }: { status: string }) {
  const style = status.includes("แล้ว") ? "success" : status.includes("กำลัง") || status.includes("รอ") ? "warning" : status.includes("กรอง") ? "danger" : "neutral";
  return <span className={`status-pill ${style}`}><span className="status-dot" />{status}</span>;
}

function Sparkline({ points, color = "#ff735d" }: { points: number[]; color?: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const coords = points.map((point, index) => {
    const x = (index / (points.length - 1)) * 100;
    const y = 34 - ((point - min) / Math.max(1, max - min)) * 28;
    return `${x},${y}`;
  }).join(" ");
  return <svg className="sparkline" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><polyline points={coords} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function NavButton({ item, active, onClick }: { item: NavItem; active: boolean; onClick: () => void }) {
  const Icon = item.icon;
  return <button className={`nav-button ${active ? "active" : ""}`} onClick={onClick}>
    <span className="nav-icon"><Icon size={17} strokeWidth={active ? 2.3 : 1.8} /></span>
    <span className="nav-copy"><strong>{item.label}</strong><small>{item.caption}</small></span>
    {active && <span className="active-rail" />}
  </button>;
}

function Sidebar({ activeSection, setActiveSection, open, close }: { activeSection: Section; setActiveSection: (section: Section) => void; open: boolean; close: () => void }) {
  return <aside className={`sidebar ${open ? "mobile-open" : ""}`}>
    <div className="brand-row">
      <div className="brand-mark"><span /><span /><i /></div>
      <div><strong>signal<span>room</span></strong><small>customer data ops</small></div>
      <button className="mobile-close" onClick={close} aria-label="ปิดเมนู"><X size={18} /></button>
    </div>
    <div className="workspace-switcher">
      <div className="workspace-avatar">N</div>
      <div><small>WORKSPACE</small><strong>Northstar Commerce</strong></div>
      <ChevronDown size={15} />
    </div>
    <div className="nav-section-label">OPERATIONS</div>
    <nav className="nav-stack">
      {navItems.map(item => <NavButton key={item.label} item={item} active={activeSection === item.label} onClick={() => { setActiveSection(item.label); close(); }} />)}
    </nav>
    <div className="nav-section-label setup-label">CONFIGURATION</div>
    <nav className="nav-stack">
      {setupItems.map(item => <NavButton key={item.label} item={item} active={activeSection === item.label} onClick={() => { setActiveSection(item.label); close(); }} />)}
    </nav>
    <div className="sidebar-spacer" />
    <div className="connection-card">
      <div className="connection-title"><span className="pulse-dot" /> META CONNECTION <span className="live-label">LIVE</span></div>
      <strong>Pixel + CAPI</strong>
      <p>รับ Event ปกติ · Match rate 86.4%</p>
      <div className="connection-progress"><span /></div>
      <button onClick={() => setActiveSection("Meta Sync")}>ดูสถานะการ sync <ArrowUpRight size={14} /></button>
    </div>
    <div className="sidebar-footer"><span><LockKeyhole size={13} /> PDPA controls on</span><button aria-label="ช่วยเหลือ"><CircleHelp size={15} /></button></div>
  </aside>;
}

function Topbar({ activeSection, onMenu, onRefresh }: { activeSection: Section; onMenu: () => void; onRefresh: () => void }) {
  const [noticeOpen, setNoticeOpen] = useState(false);
  return <header className="topbar">
    <button className="menu-button" onClick={onMenu} aria-label="เปิดเมนู"><Menu size={20} /></button>
    <div className="breadcrumbs"><span>Workspace</span><b>/</b><strong>{activeSection}</strong></div>
    <div className="topbar-actions">
      <div className="live-clock"><span className="pulse-dot" /> LIVE <em>ข้อมูลอัปเดตทุก 30 วินาที</em></div>
      <button className="icon-button" onClick={onRefresh} aria-label="รีเฟรชข้อมูล"><RefreshCw size={17} /></button>
      <div className="notice-wrap">
        <button className="icon-button" onClick={() => setNoticeOpen(!noticeOpen)} aria-label="การแจ้งเตือน"><Bell size={17} /><i className="notification-badge">2</i></button>
        {noticeOpen && <div className="notice-popover"><strong>การแจ้งเตือน</strong><p><span className="notice-dot green" /> Meta sync สำเร็จ 3 segments</p><p><span className="notice-dot amber" /> มี 14 events รอส่ง</p></div>}
      </div>
      <div className="user-avatar">PS</div>
    </div>
  </header>;
}

function KpiCard({ label, value, delta, compare, icon: Icon, color, points }: { label: string; value: string; delta: string; compare: string; icon: LucideIcon; color: string; points: number[] }) {
  const up = !delta.startsWith("-");
  return <div className="kpi-card">
    <div className="kpi-head"><span className={`kpi-icon ${color}`}><Icon size={17} /></span><button className="more-button" aria-label="ดูตัวเลือก"><MoreHorizontal size={16} /></button></div>
    <div className="kpi-label">{label}</div>
    <div className="kpi-value-row"><strong>{value}</strong><span className={`delta ${up ? "up" : "down"}`}>{up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{delta}</span></div>
    <div className="kpi-bottom"><small>{compare}</small><Sparkline points={points} color={color === "coral" ? "#ff735d" : color === "cyan" ? "#38d6d1" : color === "violet" ? "#a78bfa" : "#f4b860"} /></div>
  </div>;
}

function PipelineChart() {
  return <div className="pipeline-chart">
    <div className="chart-y-axis"><span>24k</span><span>18k</span><span>12k</span><span>6k</span><span>0</span></div>
    <div className="chart-body">
      <div className="chart-grid"><i /><i /><i /><i /><i /></div>
      <div className="bars">{weekBars.map((height, index) => <div className="bar-group" key={index}><span className="bar event-bar" style={{ height: `${height}%` }} /><span className="bar matched-bar" style={{ height: `${Math.max(12, height - 18)}%` }} /></div>)}</div>
      <div className="chart-x-axis"><span>09 ก.ย.</span><span>10 ก.ย.</span><span>11 ก.ย.</span><span>12 ก.ย.</span><span>13 ก.ย.</span><span>14 ก.ย.</span><span>วันนี้</span></div>
    </div>
  </div>;
}

function Overview({ setActiveSection, lastUpdated, onSync }: { setActiveSection: (section: Section) => void; lastUpdated: string; onSync: () => void }) {
  return <>
    <section className="hero-row">
      <div><div className="eyebrow"><span className="eyebrow-line" /> CONTROL ROOM <span className="eyebrow-date">· 16 SEP 2026</span></div><h1>รู้จักลูกค้าให้เร็วกว่า<br /><em>คู่แข่งหนึ่งก้าว</em></h1><p>ติดตามทุกสัญญาณจากเว็บไซต์ คัดกลุ่มลูกค้าที่มีคุณค่า และส่งกลับ Meta ใน flow เดียว</p></div>
      <div className="hero-actions"><button className="date-selector">16 ก.ย. — 22 ก.ย. <ChevronDown size={15} /></button><button className="secondary-button" onClick={() => setActiveSection("Event Stream")}><Activity size={16} /> ดู Event ทั้งหมด</button></div>
    </section>
    <div className="kpi-grid">
      <KpiCard label="Events received" value="184,294" delta="12.8%" compare="เทียบกับ 7 วันก่อน" icon={Inbox} color="coral" points={[28, 34, 31, 45, 40, 56, 51, 72, 68, 84]} />
      <KpiCard label="Matched profiles" value="86.4%" delta="4.2%" compare="Event Match Quality" icon={Users} color="cyan" points={[32, 38, 36, 42, 48, 46, 58, 63, 60, 76]} />
      <KpiCard label="Qualified customers" value="14,827" delta="18.4%" compare="ผ่านเกณฑ์ segment" icon={Target} color="violet" points={[25, 29, 38, 34, 48, 52, 61, 58, 76, 86]} />
      <KpiCard label="Meta audiences" value="08" delta="2 ใหม่" compare="sync สำเร็จ 100%" icon={Send} color="amber" points={[48, 44, 44, 58, 58, 67, 67, 76, 76, 88]} />
    </div>
    <div className="overview-grid">
      <section className="panel pipeline-panel">
        <div className="panel-heading"><div><div className="section-kicker">EVENT PIPELINE <span className="live-label">LIVE</span></div><h2>สัญญาณกำลังไหลเข้า</h2></div><button className="ghost-button">7 วันที่ผ่านมา <ChevronDown size={14} /></button></div>
        <div className="pipeline-summary"><div><strong>184,294</strong><span>events ทั้งหมด</span></div><div className="summary-divider" /><div><strong className="cyan-text">159,176</strong><span>matched profiles</span></div><div className="summary-note"><TrendingUp size={14} /> +12.8% <small>vs. previous period</small></div></div>
        <PipelineChart />
        <div className="chart-legend"><span><i className="legend-dot coral" /> All events</span><span><i className="legend-dot cyan" /> Matched profiles</span><span className="chart-updated"><Clock3 size={13} /> อัปเดตล่าสุด {lastUpdated}</span></div>
      </section>
      <section className="panel quality-panel">
        <div className="panel-heading"><div><div className="section-kicker">CUSTOMER QUALITY</div><h2>คุณภาพของฐานลูกค้า</h2></div><button className="more-button"><MoreHorizontal size={17} /></button></div>
        <div className="donut-wrap"><div className="donut"><div className="donut-hole"><strong>86.4%</strong><span>match rate</span></div></div><div className="donut-center-label"><Sparkles size={14} /> healthy</div></div>
        <div className="quality-legend"><div><span><i className="legend-dot coral" /> High-value</span><strong>24.8%</strong></div><div><span><i className="legend-dot cyan" /> Repeat buyers</span><strong>31.6%</strong></div><div><span><i className="legend-dot violet" /> Qualified leads</span><strong>18.2%</strong></div><div><span><i className="legend-dot muted" /> Others</span><strong>25.4%</strong></div></div>
        <button className="full-link" onClick={() => setActiveSection("Segments")}>ดูรายละเอียด segments <ArrowUpRight size={14} /></button>
      </section>
    </div>
    <section className="panel activity-panel">
      <div className="panel-heading"><div><div className="section-kicker">RECENT ACTIVITY</div><h2>Event stream ล่าสุด</h2></div><div className="heading-actions"><button className="ghost-button" onClick={() => setActiveSection("Event Stream")}>ดูทั้งหมด <ArrowUpRight size={14} /></button><button className="more-button"><MoreHorizontal size={17} /></button></div></div>
      <EventTable compact />
    </section>
    <div className="bottom-grid">
      <section className="panel segment-preview"><div className="panel-heading"><div><div className="section-kicker">TOP SEGMENTS</div><h2>กลุ่มที่กำลังโต</h2></div><button className="ghost-button" onClick={() => setActiveSection("Segments")}>จัดการ <ArrowUpRight size={14} /></button></div>{initialSegments.slice(0, 3).map(segment => <SegmentRow key={segment.name} segment={segment} />)}</section>
      <section className="panel sync-preview"><div className="panel-heading"><div><div className="section-kicker">META SYNC HEALTH</div><h2>การส่งข้อมูลวันนี้</h2></div><button className="more-button"><MoreHorizontal size={17} /></button></div><div className="sync-score"><div className="score-ring"><strong>94</strong><span>/ 100</span></div><div><strong>ระบบทำงานปกติ</strong><p>ไม่มี error สำคัญใน 24 ชั่วโมง</p></div></div><div className="sync-list"><div><span className="sync-label"><i className="mini-status green" /> Conversions API</span><strong>98.2%</strong></div><div><span className="sync-label"><i className="mini-status cyan" /> Custom Audiences</span><strong>100%</strong></div><div><span className="sync-label"><i className="mini-status amber" /> Event deduplication</span><strong>86.4%</strong></div></div><button className="primary-button full" onClick={onSync}><Send size={15} /> Sync segments ตอนนี้</button></section>
    </div>
  </>;
}

function EventTable({ compact = false }: { compact?: boolean }) {
  const visibleEvents = compact ? events.slice(0, 4) : events;
  return <div className="table-wrap"><table><thead><tr><th>EVENT</th><th>PROFILE</th><th>SOURCE</th><th>VALUE</th><th>STATUS</th><th>TIME</th><th /></tr></thead><tbody>{visibleEvents.map((event, index) => <tr key={`${event.name}-${index}`}><td><span className={`event-symbol ${event.tone}`}><Zap size={13} /></span><strong>{event.name}</strong></td><td><span className="profile-cell"><span className="tiny-avatar">{event.customer.includes("anonymous") ? "A" : event.customer.charAt(0).toUpperCase()}</span>{event.customer}</span></td><td><span className="source-chip">{event.source}</span></td><td className="value-cell">{event.value}</td><td><StatusPill status={event.status} /></td><td className="time-cell">{event.time}</td><td><button className="more-button"><MoreHorizontal size={16} /></button></td></tr>)}</tbody></table></div>;
}

function SegmentRow({ segment }: { segment: typeof initialSegments[number] }) {
  return <div className="segment-row"><span className={`segment-mark ${segment.color}`}><Target size={15} /></span><div className="segment-copy"><strong>{segment.name}</strong><small>{segment.note}</small></div><div className="segment-members"><strong>{segment.members}</strong><small>profiles</small></div><span className={`segment-change ${segment.change.startsWith("-") ? "negative" : ""}`}>{segment.change}</span><StatusPill status={segment.sync} /></div>;
}

function EventStreamPage() {
  const [filter, setFilter] = useState("ทั้งหมด");
  const filters = ["ทั้งหมด", "Purchase", "Lead", "ViewContent", "AddToCart"];
  const filteredEvents = filter === "ทั้งหมด" ? events : events.filter(event => event.name === filter);
  return <PageShell eyebrow="EVENT STREAM" title="ทุกสัญญาณในที่เดียว" description="ดู Event ที่กำลังไหลเข้า ตรวจสอบคุณภาพข้อมูล และติดตามสถานะก่อนส่งต่อไปยัง Meta."><div className="page-toolbar"><div className="filter-pills">{filters.map(item => <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)}>{item}{item === "ทั้งหมด" && <span>184k</span>}</button>)}</div><div className="toolbar-actions"><button className="secondary-button"><Download size={15} /> Export CSV</button><button className="primary-button"><Filter size={15} /> ตัวกรอง <span className="filter-count">3</span></button></div></div><section className="panel"><div className="table-title-row"><div><div className="section-kicker">LIVE INGESTION</div><h2>{filteredEvents.length} events ที่ตรงกับตัวกรอง</h2></div><span className="last-ingested"><i className="pulse-dot" /> รับข้อมูลล่าสุดเมื่อ 12 วินาทีที่แล้ว</span></div><EventTableRows rows={filteredEvents} /></section><div className="event-info-grid"><div className="info-card"><span className="kpi-icon cyan"><Code2 size={17} /></span><strong>7 event types</strong><p>ระบบรู้จัก Standard Events และ Custom Events แล้ว</p></div><div className="info-card"><span className="kpi-icon violet"><ShieldCheck size={17} /></span><strong>Consent-aware</strong><p>ตัดข้อมูลที่ไม่มีสิทธิ์ใช้งานก่อนส่งออกอัตโนมัติ</p></div><div className="info-card"><span className="kpi-icon coral"><GitBranch size={17} /></span><strong>Dedup ready</strong><p>ใช้ event_id เดียวกันระหว่าง Pixel และ CAPI</p></div></div></PageShell>;
}

function EventTableRows({ rows }: { rows: typeof events }) {
  return <div className="table-wrap"><table><thead><tr><th>EVENT</th><th>PROFILE</th><th>SOURCE</th><th>VALUE</th><th>STATUS</th><th>TIME</th><th /></tr></thead><tbody>{rows.map((event, index) => <tr key={`${event.name}-${index}`}><td><span className={`event-symbol ${event.tone}`}><Zap size={13} /></span><strong>{event.name}</strong></td><td><span className="profile-cell"><span className="tiny-avatar">{event.customer.includes("anonymous") ? "A" : event.customer.charAt(0).toUpperCase()}</span>{event.customer}</span></td><td><span className="source-chip">{event.source}</span></td><td className="value-cell">{event.value}</td><td><StatusPill status={event.status} /></td><td className="time-cell">{event.time}</td><td><button className="more-button"><MoreHorizontal size={16} /></button></td></tr>)}</tbody></table></div>;
}

function SegmentsPage({ segments, openCreate }: { segments: typeof initialSegments; openCreate: () => void }) {
  const total = useMemo(() => segments.reduce((sum, segment) => sum + Number(segment.members.replace(",", "")), 0), [segments]);
  return <PageShell eyebrow="CUSTOMER SEGMENTS" title="จัดกลุ่มลูกค้าที่มีความหมาย" description="เปลี่ยนพฤติกรรมให้เป็น audience ที่ทีมการตลาดนำไปใช้ได้ทันที โดยไม่ต้อง export ไฟล์มือ."><div className="segment-hero-stat"><div><span className="section-kicker">TOTAL QUALIFIED PROFILES</span><strong>{total.toLocaleString()}</strong><p>profiles ที่ผ่านกฎ segment และมี marketing consent</p></div><button className="primary-button" onClick={openCreate}><Plus size={16} /> สร้าง Segment ใหม่</button></div><div className="segment-grid">{segments.map(segment => <div className={`segment-card ${segment.color}`} key={segment.name}><div className="segment-card-head"><span className="segment-mark"><Target size={15} /></span><span className="segment-tag">{segment.label}</span><button className="more-button"><MoreHorizontal size={16} /></button></div><h3>{segment.name}</h3><p>{segment.note}</p><div className="segment-card-value"><strong>{segment.members}</strong><span>profiles</span><em className={segment.change.startsWith("-") ? "negative" : ""}>{segment.change}</em></div><div className="segment-card-foot"><StatusPill status={segment.sync} /><button>เปิดรายละเอียด <ArrowUpRight size={13} /></button></div></div>)}</div><section className="panel rules-panel"><div className="panel-heading"><div><div className="section-kicker">SEGMENT LOGIC</div><h2>กฎที่ทำงานอยู่</h2></div><button className="ghost-button" onClick={openCreate}><Plus size={14} /> เพิ่มกฎ</button></div><div className="logic-row"><span className="logic-number">01</span><div><strong>High-value customers</strong><p>ยอดซื้อสะสม 90 วัน <b>≥ ฿10,000</b> และ refund rate <b>&lt; 20%</b></p></div><span className="logic-when">อัปเดตทุก 6 ชั่วโมง</span><span className="toggle on"><i /></span></div><div className="logic-row"><span className="logic-number">02</span><div><strong>Qualified leads</strong><p>Lead score <b>≥ 70</b> และ <b>marketing_consent = true</b></p></div><span className="logic-when">อัปเดตทุก 30 นาที</span><span className="toggle on"><i /></span></div><div className="logic-row"><span className="logic-number">03</span><div><strong>At-risk customers</strong><p>วันตั้งแต่การซื้อครั้งล่าสุด <b>&gt; 120 วัน</b></p></div><span className="logic-when">อัปเดตทุกวัน</span><span className="toggle"><i /></span></div></section></PageShell>;
}

function MetaMetric({ label, value, detail, tone, icon: Icon, trend }: { label: string; value: string; detail: string; tone: string; icon: LucideIcon; trend?: string }) {
  return <div className="api-metric"><div className={`api-metric-icon ${tone}`}><Icon size={16} /></div><div className="api-metric-copy"><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>{trend && <em className={trend.startsWith("-") ? "negative" : "positive"}>{trend}</em>}</div>;
}

const metaConnectionSteps = [
  { title: "เตรียม Meta Business", short: "Business setup", description: "ตรวจว่ามี Business Manager, Ad Account และสิทธิ์ Admin พร้อมแล้ว", icon: Boxes, facebook: "เปิด Business Settings", href: "https://business.facebook.com/settings" },
  { title: "สร้าง Pixel / Dataset", short: "Data source", description: "เลือก Dataset ที่จะรับ Event จากระบบกลาง และคัดลอก Dataset ID", icon: Database, facebook: "เปิด Events Manager", href: "https://business.facebook.com/events_manager2" },
  { title: "สร้าง Access Token", short: "API access", description: "สร้าง Token สำหรับ Conversions API และกำหนดสิทธิ์ให้เฉพาะที่จำเป็น", icon: LockKeyhole, facebook: "เปิด Developer Tools", href: "https://developers.facebook.com/tools" },
  { title: "ตั้งค่าระบบกลาง", short: "Connect here", description: "นำ Dataset ID และ Access Token มาใส่ในระบบกลาง โดย Token จะถูกเก็บแบบเข้ารหัส", icon: Link2, facebook: "ดู Meta API Docs", href: "https://developers.facebook.com/docs/marketing-api/conversions-api" },
  { title: "ส่ง Test Event", short: "Verify", description: "ส่ง Event ตัวอย่าง ตรวจ Event Match Quality และแก้ข้อผิดพลาดก่อนใช้งานจริง", icon: ShieldCheck, facebook: "เปิด Test Events", href: "https://business.facebook.com/events_manager2" },
  { title: "เปิดใช้งาน", short: "Activate", description: "ยืนยันการตั้งค่า แล้วเริ่มส่ง Purchase และ Customer Audience จากระบบกลาง", icon: CheckCircle2, facebook: "เปิด Events Manager", href: "https://business.facebook.com/events_manager2" },
];

function MetaConnectionWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const current = metaConnectionSteps[step];
  const Icon = current.icon;
  const copyPlaceholder = () => { navigator.clipboard?.writeText("dataset_443021•••"); setCopied(true); window.setTimeout(() => setCopied(false), 1600); };
  return <div className="wizard-backdrop" onClick={onClose}><div className="connection-wizard" onClick={event => event.stopPropagation()}>
    <div className="wizard-head"><div><div className="section-kicker">META CONNECTION WIZARD</div><h2>เชื่อมต่อ Meta API</h2><p>ทำตามขั้นตอนเพื่อให้ระบบกลางส่งข้อมูลเข้า Meta ได้อย่างถูกต้องและตรวจสอบได้</p></div><button className="icon-button" onClick={onClose}><X size={17} /></button></div>
    <div className="wizard-progress">{metaConnectionSteps.map((item, index) => <button key={item.short} className={`wizard-step ${index === step ? "active" : ""} ${index < step ? "done" : ""}`} onClick={() => setStep(index)}><span>{index < step ? <Check size={12} /> : index + 1}</span><small>{item.short}</small></button>)}</div>
    <div className="wizard-body"><div className="wizard-stage-icon"><Icon size={25} /></div><div className="wizard-stage-copy"><span>STEP {String(step + 1).padStart(2, "0")} / 06</span><h3>{current.title}</h3><p>{current.description}</p></div><div className="wizard-status"><i /> {step < 3 ? "รอการตั้งค่า" : step === 4 ? "พร้อมทดสอบ" : "ยังไม่เปิดใช้งาน"}</div></div>
    {step === 0 && <div className="wizard-checklist"><div className="wizard-check"><CheckCircle2 size={16} /><div><strong>Business Manager</strong><small>มีสิทธิ์ Admin ใน Business ที่จะใช้งาน</small></div><span className="check-badge">ตรวจได้ใน Facebook</span></div><div className="wizard-check"><CheckCircle2 size={16} /><div><strong>Ad Account</strong><small>ผูก Ad Account กับ Business Manager แล้ว</small></div><span className="check-badge">จำเป็น</span></div><div className="wizard-check"><CheckCircle2 size={16} /><div><strong>Domain & data policy</strong><small>เว็บไซต์และนโยบายข้อมูลพร้อมตรวจสอบ</small></div><span className="check-badge">แนะนำ</span></div></div>}
    {step === 1 && <div className="wizard-form"><label>Dataset / Pixel ID<input defaultValue="443021•••" readOnly /></label><button className="copy-id" onClick={copyPlaceholder}>{copied ? <><Check size={14} /> คัดลอกแล้ว</> : <><Code2 size={14} /> คัดลอก Dataset ID</>}</button><div className="wizard-tip"><CircleHelp size={15} /><span>ระบบกลางจะใช้ ID นี้ระบุปลายทางของ Conversions API โดยไม่เก็บข้อมูล Login ของ Facebook</span></div></div>}
    {step === 2 && <div className="wizard-form"><div className="permission-list"><strong>สิทธิ์ที่ต้องใช้</strong><span><Check size={13} /> ads_management</span><span><Check size={13} /> business_management</span><span><Check size={13} /> catalog_management <em>ถ้าใช้ Catalog</em></span></div><div className="wizard-tip amber-tip"><LockKeyhole size={15} /><span>Access Token เป็นความลับ ห้ามวางในหน้าเว็บหรือส่งกลับไปที่ระบบที่ 1</span></div></div>}
    {step === 3 && <div className="wizard-form"><label>Dataset ID<input defaultValue="443021•••" /></label><label>Access Token<input type="password" placeholder="วาง Token ที่สร้างจาก Meta ที่นี่" /></label><div className="wizard-tip"><ShieldCheck size={15} /><span>ค่าจะถูกเข้ารหัสและใช้เฉพาะ Server-side delivery เท่านั้น</span></div></div>}
    {step === 4 && <div className="test-event-box"><div className="test-event-head"><span className="status-pill warning"><span className="status-dot" /> ยังไม่ส่ง Test</span><button className="secondary-button"><Send size={14} /> ส่ง Test Event</button></div><div className="test-payload"><span>event_name</span><strong>Purchase</strong><span>event_id</span><strong>test_deposit_001</strong><span>value</span><strong>฿1,500 THB</strong><span>user_data</span><strong>phone_hash + fbp + fbc</strong></div></div>}
    {step === 5 && <div className="activation-box"><div className="activation-icon"><CheckCircle2 size={25} /></div><div><strong>พร้อมเปิดใช้งาน Meta API</strong><p>ระบบจะส่งเฉพาะ Event ที่ผ่าน Validation, Consent และ Deduplication แล้ว</p></div></div>}
    <div className="wizard-foot"><a href={current.href} target="_blank" rel="noreferrer" className="facebook-link"><ExternalLink size={14} /> {current.facebook}</a><div className="wizard-actions"><button className="secondary-button" onClick={step === 0 ? onClose : () => setStep(step - 1)}>{step === 0 ? "ยกเลิก" : "ย้อนกลับ"}</button>{step < metaConnectionSteps.length - 1 ? <button className="primary-button" onClick={() => setStep(step + 1)}>ถัดไป <ArrowUpRight size={14} /></button> : <button className="primary-button" onClick={onClose}><Check size={14} /> เปิดใช้งาน</button>}</div></div>
  </div></div>;
}

function MetaSyncPage({ onSync, syncing }: { onSync: () => void; syncing: boolean }) {
  const [wizardOpen, setWizardOpen] = useState(false);
  return <PageShell eyebrow="META API DELIVERY" title="Meta API Delivery Dashboard" description="ดูสุขภาพการส่งข้อมูลจากระบบกลางเข้า Meta ตั้งแต่รับ Event, ตรวจคุณภาพ, เข้าคิว, Retry จนถึง API response ในหน้าจอเดียว.">
    <div className="sync-banner"><div className="sync-banner-icon"><CheckCircle2 size={24} /></div><div><strong>Meta API ทำงานปกติ</strong><p>Last successful delivery · วันนี้ 14:28 น. · ทุกปลายทางตอบสนองปกติ</p></div><span className="api-latency"><Activity size={13} /> 412 ms avg</span><button className="primary-button" onClick={onSync} disabled={syncing}>{syncing ? <><RefreshCw size={15} className="spin" /> กำลัง sync...</> : <><Send size={15} /> Sync ตอนนี้</>}</button></div>
    <div className="connection-cta"><div className="connection-cta-icon"><Link2 size={20} /></div><div><strong>ยังไม่ได้เชื่อมต่อ Meta API จริงใช่ไหม?</strong><p>ใช้ตัวช่วย 6 ขั้นตอนเพื่อเตรียมค่าทั้งในระบบกลางและ Facebook ให้พร้อมก่อนส่ง Test Event</p></div><button className="secondary-button" onClick={() => setWizardOpen(true)}>เริ่มตั้งค่าการเชื่อมต่อ <ArrowUpRight size={14} /></button></div>
    <div className="api-metrics-grid"><MetaMetric label="Events received" value="184,294" detail="จากระบบที่ 1 · วันนี้" tone="coral" icon={Inbox} trend="+12.8%" /><MetaMetric label="Delivered to Meta" value="181,842" detail="success rate 98.7%" tone="cyan" icon={CheckCircle2} trend="+2.4%" /><MetaMetric label="In retry queue" value="247" detail="รอส่งซ้ำอัตโนมัติ" tone="amber" icon={RefreshCw} trend="-18.2%" /><MetaMetric label="Event Match Quality" value="86.4%" detail="phone + fbp + fbc" tone="violet" icon={Users} trend="+4.2%" /></div>
    <div className="delivery-funnel"><div className="funnel-step"><span className="funnel-number">01</span><div><strong>Received</strong><small>184,294 events</small></div><b>100%</b></div><div className="funnel-connector" /><div className="funnel-step"><span className="funnel-number">02</span><div><strong>Validated</strong><small>183,406 events</small></div><b>99.5%</b></div><div className="funnel-connector" /><div className="funnel-step"><span className="funnel-number">03</span><div><strong>Queued</strong><small>182,771 events</small></div><b>99.2%</b></div><div className="funnel-connector" /><div className="funnel-step highlight"><span className="funnel-number">04</span><div><strong>Delivered</strong><small>181,842 events</small></div><b>98.7%</b></div></div>
    <div className="sync-overview-grid"><div className="panel delivery-panel"><div className="panel-heading"><div><div className="section-kicker">DELIVERY PERFORMANCE <span className="live-label">LIVE</span></div><h2>อัตราส่งสำเร็จไปยัง Meta</h2></div><button className="ghost-button">24 ชั่วโมงที่ผ่านมา <ChevronDown size={14} /></button></div><div className="delivery-summary"><div><strong>98.7%</strong><span>delivery success rate</span></div><div><strong className="cyan-text">412 ms</strong><span>average API latency</span></div><div><strong>0.03%</strong><span>hard failure rate</span></div></div><div className="delivery-chart"><div className="delivery-y"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div className="delivery-main"><div className="delivery-grid"><i /><i /><i /><i /><i /></div><div className="delivery-bars">{channelBars.map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}</div><div className="delivery-x"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>ตอนนี้</span></div></div></div><div className="chart-legend"><span><i className="legend-dot cyan" /> Success rate</span><span><i className="legend-dot amber" /> Retry rate</span><span className="chart-updated">อัปเดตทุก 30 วินาที</span></div></div><div className="panel connection-panel"><div className="panel-heading"><div><div className="section-kicker">API DESTINATIONS</div><h2>ปลายทางที่เชื่อมต่อ</h2></div><button className="more-button"><MoreHorizontal size={17} /></button></div><DestinationRow icon={Send} name="Conversions API" detail="Dataset · 443021•••" status="Healthy · 98.7%" color="cyan" /><DestinationRow icon={Users} name="Customer File Audience" detail="Ad account · 17841•••" status="Healthy · 100%" color="coral" /><DestinationRow icon={Target} name="Exclusion Audiences" detail="3 audiences active" status="Healthy · 100%" color="violet" /><div className="destination-health"><span><i className="mini-status green" /> Last heartbeat</span><strong>12 sec ago</strong></div><button className="secondary-button full" onClick={() => setWizardOpen(true)}><Link2 size={15} /> จัดการ API connection</button></div></div>
    <section className="panel sync-log"><div className="panel-heading"><div><div className="section-kicker">DELIVERY LOG</div><h2>รายการส่งข้อมูลล่าสุด</h2></div><div className="log-filters"><button className="selected">ทั้งหมด</button><button>สำเร็จ</button><button>Retry</button><button className="ghost-button"><Download size={14} /> Export</button></div></div><div className="sync-log-row"><span className="log-status success"><Check size={13} /></span><div><strong>Purchase · deposit_success</strong><small>evt_01JXYZ123 · User usr_123456 · ฿1,500 · event_id deduplicated</small></div><span className="log-channel">CAPI</span><span className="log-time">12 วินาทีที่แล้ว</span><StatusPill status="สำเร็จ" /></div><div className="sync-log-row"><span className="log-status success"><Check size={13} /></span><div><strong>High-value customers</strong><small>Replace · 8,426 profiles · Audience ID 120•••</small></div><span className="log-channel audience">AUDIENCE</span><span className="log-time">วันนี้ 14:28</span><StatusPill status="สำเร็จ" /></div><div className="sync-log-row"><span className="log-status warning"><Clock3 size={13} /></span><div><strong>CompleteRegistration</strong><small>evt_01JXYA991 · รอ Retry เนื่องจาก API rate limit</small></div><span className="log-channel">CAPI</span><span className="log-time">วันนี้ 14:20</span><StatusPill status="กำลัง sync" /></div><div className="sync-log-row"><span className="log-status danger"><X size={13} /></span><div><strong>Purchase · deposit_success</strong><small>evt_01JXX8212 · ไม่มี transaction_id · ถูกบล็อกก่อนส่ง</small></div><span className="log-channel">VALIDATION</span><span className="log-time">วันนี้ 14:18</span><StatusPill status="ถูกกรอง" /></div></section>
    <div className="api-bottom-grid"><div className="panel"><div className="section-kicker">TOP ERROR REASONS</div><h2>สาเหตุที่ต้องตรวจสอบ</h2><div className="error-row"><span className="error-code">422</span><div><strong>Missing transaction_id</strong><small>89 events · deposit_success</small></div><b>36%</b></div><div className="error-row"><span className="error-code amber">429</span><div><strong>Rate limit exceeded</strong><small>61 events · auto retry enabled</small></div><b>25%</b></div><div className="error-row"><span className="error-code violet">MATCH</span><div><strong>Low match identifiers</strong><small>42 events · missing fbc/fbp</small></div><b>17%</b></div></div><div className="panel"><div className="section-kicker">DATA QUALITY GUARDRAILS</div><h2>ก่อนส่งเข้า Meta</h2><div className="guardrail-row"><CheckCircle2 size={15} /><span>Deduplication by event_id</span><strong>99.9%</strong></div><div className="guardrail-row"><CheckCircle2 size={15} /><span>Consent validation</span><strong>100%</strong></div><div className="guardrail-row"><CheckCircle2 size={15} /><span>Phone normalized + hashed</span><strong>98.2%</strong></div><button className="full-link">ดู Data Quality Center <ArrowUpRight size={14} /></button></div></div>
    {wizardOpen && <MetaConnectionWizard onClose={() => setWizardOpen(false)} />}
  </PageShell>;
}

function DestinationRow({ icon: Icon, name, detail, status, color }: { icon: LucideIcon; name: string; detail: string; status: string; color: string }) {
  return <div className="destination-row"><span className={`destination-icon ${color}`}><Icon size={16} /></span><div><strong>{name}</strong><small>{detail}</small></div><span className="connected-label"><i /> {status}</span></div>;
}

function IntegrationsPage() {
  return <PageShell eyebrow="INTEGRATIONS" title="เชื่อมต่อแหล่งข้อมูลของคุณ" description="ตั้งค่า source และ destination ให้ signalroom เป็นชั้นกลางที่เชื่อถือได้ระหว่างเว็บไซต์กับ Meta."><div className="integration-grid"><div className="panel integration-card active-integration"><div className="integration-card-top"><span className="integration-logo browser-logo"><Code2 size={20} /></span><StatusPill status="กำลังทำงาน" /></div><h3>Website Event Collector</h3><p>รับ event จาก Pixel และ server-side collector พร้อมตรวจสอบ consent และ event_id</p><div className="integration-meta"><span><Activity size={13} /> 184k events / 7 days</span><span><CheckCircle2 size={13} /> 99.98% uptime</span></div><button className="secondary-button full">จัดการ source <ArrowUpRight size={14} /></button></div><div className="panel integration-card active-integration"><div className="integration-card-top"><span className="integration-logo meta-logo">f</span><StatusPill status="Connected" /></div><h3>Meta Marketing API</h3><p>ส่ง event และ customer audiences ด้วย Conversions API และ Custom Audience API</p><div className="integration-meta"><span><ShieldCheck size={13} /> Token secured</span><span><Clock3 size={13} /> Sync ทุก 30 นาที</span></div><button className="secondary-button full">จัดการ destination <ArrowUpRight size={14} /></button></div><div className="panel integration-card add-integration"><span className="add-icon"><Plus size={20} /></span><h3>เพิ่ม Integration</h3><p>เชื่อม CRM, Shopify, data warehouse หรือ marketing tools อื่น ๆ</p><button className="ghost-button">ดู catalog <ArrowUpRight size={14} /></button></div></div><div className="security-note"><ShieldCheck size={17} /><div><strong>ข้อมูลถูกออกแบบให้ privacy-first</strong><p>ระบบ mask ข้อมูลส่วนตัวในหน้า UI, hash identifiers ก่อนส่ง Meta และเก็บ access token ไว้ใน secure environment เท่านั้น</p></div><LockKeyhole size={17} /></div></PageShell>;
}

function SettingsPage() {
  return <PageShell eyebrow="WORKSPACE SETTINGS" title="ตั้งค่าพื้นที่ทำงาน" description="ควบคุมข้อมูล การแจ้งเตือน และนโยบาย privacy ของทีม Northstar Commerce."><div className="settings-layout"><div className="settings-nav"><button className="selected"><Settings2 size={15} /> General</button><button><ShieldCheck size={15} /> Privacy & consent</button><button><Bell size={15} /> Notifications</button><button><Users size={15} /> Team access</button></div><div className="panel settings-panel"><div className="settings-section"><div><div className="section-kicker">GENERAL</div><h2>Workspace identity</h2><p>ข้อมูลนี้ใช้แสดงในรายงานและกิจกรรมของทีม</p></div><div className="settings-fields"><label>Workspace name<input defaultValue="Northstar Commerce" /></label><label>Timezone<select defaultValue="Asia/Bangkok"><option value="Asia/Bangkok">Asia/Bangkok (GMT+7)</option></select></label><label>Data retention<select defaultValue="12 months"><option value="12 months">12 months</option></select></label></div></div><div className="settings-section"><div><div className="section-kicker">PRIVACY</div><h2>Data controls</h2><p>นโยบายที่ใช้ก่อนส่งข้อมูลไปยังปลายทาง</p></div><div className="setting-toggles"><div><span><strong>Require marketing consent</strong><small>ส่งเฉพาะ profiles ที่ให้ความยินยอม</small></span><span className="toggle on"><i /></span></div><div><span><strong>Hash customer identifiers</strong><small>Normalize และ SHA-256 ก่อนส่งออก</small></span><span className="toggle on"><i /></span></div><div><span><strong>Keep raw event payload</strong><small>เก็บ raw payload ไว้ 30 วันเพื่อ debug</small></span><span className="toggle"><i /></span></div></div></div><button className="primary-button">บันทึกการตั้งค่า <Check size={15} /></button></div></div></PageShell>;
}

function PageShell({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  return <><section className="page-intro"><div><div className="eyebrow"><span className="eyebrow-line" /> {eyebrow}</div><h1>{title}</h1><p>{description}</p></div></section>{children}</>;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("Meta Sync");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("เมื่อสักครู่");
  const [syncing, setSyncing] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [segments, setSegments] = useState(initialSegments);
  const [segmentName, setSegmentName] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const refresh = () => { setLastUpdated("เมื่อสักครู่"); showToast("ข้อมูลถูกรีเฟรชแล้ว"); };
  const runSync = () => { if (syncing) return; setSyncing(true); window.setTimeout(() => { setSyncing(false); showToast("Sync สำเร็จ · 3 audiences อัปเดตแล้ว"); }, 1500); };
  const createSegment = (event: React.FormEvent) => { event.preventDefault(); if (!segmentName.trim()) return; setSegments([{ name: segmentName, note: "กำหนดเงื่อนไขใหม่โดยทีม Growth", members: "0", change: "ใหม่", sync: "ยังไม่ sync", color: "cyan", label: "NEW SEGMENT" }, ...segments]); setSegmentName(""); setCreateOpen(false); showToast(`สร้าง segment “${segmentName}” แล้ว`); };

  return <div className="app-shell">
    <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} open={sidebarOpen} close={() => setSidebarOpen(false)} />
    {sidebarOpen && <button className="mobile-backdrop" onClick={() => setSidebarOpen(false)} aria-label="ปิดเมนู" />}
    <main className="main-area"><Topbar activeSection={activeSection} onMenu={() => setSidebarOpen(true)} onRefresh={refresh} /><div className="content">
      {activeSection === "ภาพรวม" && <Overview setActiveSection={setActiveSection} lastUpdated={lastUpdated} onSync={runSync} />}
      {activeSection === "Event Stream" && <EventStreamPage />}
      {activeSection === "Segments" && <SegmentsPage segments={segments} openCreate={() => setCreateOpen(true)} />}
      {activeSection === "Meta Sync" && <MetaSyncPage onSync={runSync} syncing={syncing} />}
      {activeSection === "Integrations" && <IntegrationsPage />}
      {activeSection === "Settings" && <SettingsPage />}
    </div></main>
    {createOpen && <div className="modal-backdrop" onClick={() => setCreateOpen(false)}><div className="modal" onClick={event => event.stopPropagation()}><div className="modal-head"><div><div className="section-kicker">NEW SEGMENT</div><h2>สร้างกลุ่มลูกค้าใหม่</h2></div><button className="icon-button" onClick={() => setCreateOpen(false)}><X size={17} /></button></div><p className="modal-desc">เริ่มจากชื่อที่ทีมเข้าใจตรงกัน แล้วค่อยเติมเงื่อนไขจากข้อมูลจริง</p><form onSubmit={createSegment}><label>ชื่อ Segment<input autoFocus value={segmentName} onChange={event => setSegmentName(event.target.value)} placeholder="เช่น VIP customers Q4" /></label><label>เกณฑ์หลัก<select defaultValue="purchase"><option value="purchase">Purchase value / frequency</option><option value="lead">Lead quality score</option><option value="engagement">Website engagement</option></select></label><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setCreateOpen(false)}>ยกเลิก</button><button type="submit" className="primary-button"><Plus size={15} /> สร้าง Segment</button></div></form></div></div>}
    {toast && <div className="toast"><CheckCircle2 size={17} /><span>{toast}</span><button onClick={() => setToast("")}><X size={14} /></button></div>}
  </div>;
}

