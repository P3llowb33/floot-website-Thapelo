import { useMemo, useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, Check, ChevronRight, FileText, Lightbulb, Mail, Menu, MessageSquare, Search, ShieldCheck, Sparkles, Target, Wand2, X } from "lucide-react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { Badge } from "../components/Badge";
import { Progress } from "../components/Progress";
import { ThemeModeSwitch } from "../components/ThemeModeSwitch";
import styles from "./_index.module.css";

type Mode = "resume" | "email" | "research" | "chat";
type ChatMessage = { role: "user" | "assistant"; content: string };

const modeMeta: Record<Mode, { label: string; icon: typeof BriefcaseBusiness; kicker: string; title: string; description: string }> = {
  resume: { label: "Resume & Career", icon: FileText, kicker: "CAREER COMMAND CENTER", title: "Turn your experience into a sharper application.", description: "Build grounded resume content, compare it to a job description, and keep every claim under your control." },
  email: { label: "Smart Email", icon: Mail, kicker: "SMART EMAIL", title: "Write the message. Keep the meaning.", description: "Create professional workplace emails that fit your audience, purpose and chosen tone without inventing facts." },
  research: { label: "Research", icon: Search, kicker: "AI RESEARCH", title: "Make long information useful faster.", description: "Summarize supplied reports or articles into key findings, insights and verification points." },
  chat: { label: "AI Assistant", icon: MessageSquare, kicker: "GENERAL AI ASSISTANT", title: "Ask questions. Calculate. Research. Create.", description: "Use Workmate like a normal AI assistant for questions, calculations, writing, planning, current information and workplace tasks." },
};

export default function HomePage() {
  const [mode, setMode] = useState<Mode>("chat");
  const [profile, setProfile] = useState({ name: "", role: "", skills: "", target: "" });
  const [jobDescription, setJobDescription] = useState("");
  const [email, setEmail] = useState({ audience: "", purpose: "", tone: "" });
  const [research, setResearch] = useState({ topic: "", source: "" });
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [generated, setGenerated] = useState<string | null>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");

  const meta = modeMeta[mode];
  const Icon = meta.icon;
  const readiness = useMemo(() => Math.round((Object.values(profile).filter(Boolean).length / 4) * 100), [profile]);

  const runAI = async () => {
    setBusy(true); setGenerated(null); setSources([]);
    let input = "";
    if (mode === "resume") input = `Candidate profile: ${JSON.stringify(profile)}\nTarget job description: ${jobDescription}`;
    else if (mode === "email") input = `Audience: ${email.audience}\nTone: ${email.tone}\nPurpose/context: ${email.purpose}`;
    else if (mode === "research") input = `Topic: ${research.topic}\nSource material: ${research.source}`;
    else input = chatMessage;
    try {
      const response = await fetch("/_api/generateAI", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode, input, history: mode === "chat" ? chatHistory : undefined }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? "AI request failed.");
      setGenerated(data.text); setSources(Array.isArray(data.sources) ? data.sources : []);
      if (mode === "chat") {
        setChatHistory((current) => [...current, { role: "user", content: input }, { role: "assistant", content: String(data.text) }].slice(-20));
        setChatMessage("");
      }
      setToast(`Generated with ${data.provider}. Review the result before use.`);
    } catch (error) { setToast(error instanceof Error ? error.message : "The AI request failed."); }
    finally { setBusy(false); window.setTimeout(() => setToast(""), 4200); }
  };

  const renderWorkspace = () => {
    if (mode === "resume") return <ResumeWorkspace profile={profile} setProfile={setProfile} jobDescription={jobDescription} setJobDescription={setJobDescription} />;
    if (mode === "email") return <EmailWorkspace email={email} setEmail={setEmail} />;
    if (mode === "research") return <ResearchWorkspace research={research} setResearch={setResearch} />;
    return <ChatWorkspace chatMessage={chatMessage} setChatMessage={setChatMessage} chatHistory={chatHistory} />;
  };

  return (
    <div className={styles.appShell}>
      <aside className={styles.sidebar}>
        <div className={styles.brandRow}><div className={styles.brandMark}><Sparkles size={17} /></div><div><strong>Workmate AI</strong><span>CAPACITI project</span></div></div>
        <div className={styles.sideLabel}>WORKFLOWS</div>
        <nav className={styles.nav} aria-label="AI workflows">
          {(Object.keys(modeMeta) as Mode[]).map((key) => { const item = modeMeta[key]; const ItemIcon = item.icon; return <Button key={key} variant={mode === key ? "secondary" : "ghost"} className={styles.navButton} onClick={() => { setMode(key); setGenerated(null); setSources([]); }}><ItemIcon size={17} /><span>{item.label}</span>{mode === key && <ChevronRight size={15} className={styles.navChevron} />}</Button>; })}
        </nav>
        <div className={styles.sideSpacer} />
        <div className={styles.sidebarCard}><ShieldCheck size={17} /><div><strong>Responsible by design</strong><p>AI suggestions stay reviewable. Unsupported claims are flagged.</p></div></div>
        <div className={styles.sidebarFooter}><span>ASA 18</span><span>v1.0 demo</span></div>
      </aside>
      <main className={styles.main}>
        <header className={styles.topbar}><div className={styles.mobileBrand}><Menu size={18} /><span>Workmate AI</span></div><div className={styles.topActions}><Badge variant="success"><span className={styles.dot} /> Published workspace</Badge><ThemeModeSwitch /></div></header>
        <section className={styles.hero}>
          <div className={styles.heroText}><Badge variant="outline">{meta.kicker}</Badge><h1>{meta.title}</h1><p>{meta.description}</p><div className={styles.heroMeta}><span><Check size={14} /> Human review built in</span><span><Check size={14} /> Source-grounded outputs</span><span><Check size={14} /> Prompt evaluation ready</span></div></div>
          <div className={styles.readinessCard}><div className={styles.readinessTop}><div><span>CAREER READINESS</span><strong>{readiness}%</strong></div><Target size={20} /></div><Progress value={readiness} /><p>Complete your profile to improve the quality of grounded suggestions.</p><Button size="sm" variant="ghost" onClick={() => setMode("resume")}>Open profile <ArrowUpRight size={14} /></Button></div>
        </section>
        <section className={styles.workspaceGrid}>
          <div className={styles.workspaceCard}>{renderWorkspace()}<div className={styles.generateRow}><Button size="lg" onClick={runAI} disabled={busy}><Wand2 size={17} />{busy ? "Thinking…" : mode === "chat" ? "Ask Workmate" : `Generate ${meta.label}`}</Button><span>{mode === "chat" ? "General AI assistant with calculation, research, writing and planning support." : "AI output is reviewable and source-aware."}</span></div></div>
          <aside className={styles.resultCard}><div className={styles.cardHeader}><div><span className={styles.eyebrow}>AI OUTPUT</span><h2>{mode === "chat" ? "Assistant response" : "Review before use"}</h2></div><Badge variant={generated ? "success" : "secondary"}>{generated ? "Ready" : "Waiting"}</Badge></div>{generated ? <div className={styles.outputBody}><pre>{generated}</pre>{sources.length > 0 && <div className={styles.sources}><strong>Sources</strong>{sources.map(source => <a key={source} href={source} target="_blank" rel="noreferrer">{source}</a>)}</div>}<div className={styles.checkList}><div><Check size={15} /> Grounding and uncertainty guidance</div><div><Check size={15} /> Human review reminder</div><div><Check size={15} /> No invented facts or actions</div></div><div className={styles.resultActions}><Button variant="outline" size="sm" onClick={() => { setGenerated(null); setSources([]); }}><X size={14} /> Clear</Button><Button size="sm" onClick={() => setToast("Saved locally for this demo session.")}>Keep result</Button></div></div> : <div className={styles.emptyOutput}><div className={styles.emptyIcon}><Sparkles size={19} /></div><strong>Your answer will appear here.</strong><p>Ask a question, request a calculation, or ask Workmate to research, write, plan or explain something.</p><div className={styles.pipeline}><span>Understand</span><i>→</i><span>Use tools</span><i>→</i><span>Answer</span></div></div>}</aside>
        </section>
        <section className={styles.evidenceStrip}><div><span className={styles.eyebrow}>ASSESSMENT EVIDENCE</span><strong>Prompt → evaluate → revise → review</strong></div><div className={styles.metrics}><Metric value="4" label="core workflows" /><Metric value="0" label="fabricated results" /><Metric value="2" label="review loops max" /></div><Button variant="outline" onClick={() => setMode("chat")}>Try the assistant <MessageSquare size={15} /></Button></section>
        {toast && <div className={styles.toast} role="status">{toast}</div>}
      </main>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) { return <div className={styles.metric}><strong>{value}</strong><span>{label}</span></div>; }
function ResumeWorkspace({ profile, setProfile, jobDescription, setJobDescription }: any) { return <div><div className={styles.formHeader}><div><span className={styles.eyebrow}>RESUME BUILDER</span><h2>Career profile</h2></div><Badge variant="primary">Grounded</Badge></div><div className={styles.formGrid}><label className={styles.formField}>Full name<Input placeholder="e.g. Your name" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} /></label><label className={styles.formField}>Current role<Input placeholder="e.g. AI Skills Trainee" value={profile.role} onChange={e => setProfile(p => ({ ...p, role: e.target.value }))} /></label><label className={styles.formField}>Target role<Input placeholder="e.g. AI / Business Analyst" value={profile.target} onChange={e => setProfile(p => ({ ...p, target: e.target.value }))} /></label><label className={styles.formField}>Key skills<Input placeholder="e.g. Prompt engineering, research, communication" value={profile.skills} onChange={e => setProfile(p => ({ ...p, skills: e.target.value }))} /></label></div><label className={styles.fullLabel}>Job description<Textarea placeholder="Paste the target job description here…" value={jobDescription} onChange={e => setJobDescription(e.target.value)} rows={6} /></label><div className={styles.helperNote}><ShieldCheck size={15} /><span>Keywords marked as “missing” are not treated as skills you own. The system only recommends what is supported by your supplied evidence.</span></div></div>; }
function EmailWorkspace({ email, setEmail }: any) { return <div><div className={styles.formHeader}><div><span className={styles.eyebrow}>EMAIL COMPOSER</span><h2>Professional message</h2></div><Badge variant="outline">Tone-aware</Badge></div><div className={styles.formGrid}><label className={styles.formField}>Audience<Input placeholder="e.g. Hiring manager, client, colleague" value={email.audience} onChange={e => setEmail((p: any) => ({ ...p, audience: e.target.value }))} /></label><label className={styles.formField}>Tone<Input placeholder="e.g. Formal, informal, persuasive" value={email.tone} onChange={e => setEmail((p: any) => ({ ...p, tone: e.target.value }))} /></label></div><label className={styles.fullLabel}>Purpose<Textarea placeholder="e.g. Follow up after an interview…" value={email.purpose} onChange={e => setEmail((p: any) => ({ ...p, purpose: e.target.value }))} rows={7} /></label><div className={styles.helperNote}><Mail size={15} /><span>Workmate preserves your intended meaning and does not invent dates, commitments or context.</span></div></div>; }
function ResearchWorkspace({ research, setResearch }: any) { return <div><div className={styles.formHeader}><div><span className={styles.eyebrow}>SOURCE-GROUNDED RESEARCH</span><h2>Summarize supplied material</h2></div><Badge variant="warning">Verify external claims</Badge></div><label className={styles.formField}>Research topic<Input placeholder="e.g. AI productivity in the workplace" value={research.topic} onChange={e => setResearch((p: any) => ({ ...p, topic: e.target.value }))} /></label><label className={styles.fullLabel}>Source material<Textarea placeholder="Paste a report, article, meeting transcript or internal notes here…" value={research.source} onChange={e => setResearch((p: any) => ({ ...p, source: e.target.value }))} rows={11} /></label><div className={styles.helperNote}><Lightbulb size={15} /><span>Outputs separate source summary from interpretation and clearly state limitations.</span></div></div>; }
function ChatWorkspace({ chatMessage, setChatMessage, chatHistory }: { chatMessage: string; setChatMessage: (v: string) => void; chatHistory: ChatMessage[] }) { return <div><div className={styles.formHeader}><div><span className={styles.eyebrow}>GENERAL AI ASSISTANT</span><h2>Ask Workmate</h2></div><Badge variant="primary">Multi-purpose</Badge></div>{chatHistory.length > 0 && <div className={styles.chatHistory}>{chatHistory.slice(-6).map((message, index) => <div key={`${message.role}-${index}`} className={message.role === "user" ? styles.userMessage : styles.assistantMessage}><span>{message.role === "user" ? "You" : "Workmate"}</span><p>{message.content}</p></div>)}</div>}<div className={styles.chatIntro}><div className={styles.avatar}>W</div><div><strong>Ask a normal AI question</strong><p>I can answer questions, calculate, explain concepts, draft content, plan work and research current information when web search is available.</p></div></div><label className={styles.fullLabel}>Your request<Textarea value={chatMessage} onChange={e => setChatMessage(e.target.value)} rows={10} placeholder="Ask anything — e.g. calculate 18% of 2,450 or explain AI agents…" /></label><div className={styles.suggestionRow}><span>Try:</span><button onClick={() => setChatMessage("Calculate 18% of 2,450 and show the working")}>Calculate</button><button onClick={() => setChatMessage("What are the latest developments in AI workplace productivity?")}>Current info</button><button onClick={() => setChatMessage("Explain AI agents in simple terms with a workplace example")}>Explain</button><button onClick={() => setChatMessage("Create a practical plan for finishing my project this week")}>Plan</button></div></div>; }
