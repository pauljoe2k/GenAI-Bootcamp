import { useEffect, useMemo, useState } from 'react'

function App() {
  const [emailText, setEmailText] = useState("")
  const [tone, setTone] = useState("Formal")
  const [output, setOutput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showSettings, setShowSettings] = useState(false)
  const [apiBase, setApiBase] = useState("")
  const [demoMode, setDemoMode] = useState(false)
  const [palette, setPalette] = useState("Dark") // Honeydew | Dark
  const [activeTab, setActiveTab] = useState("Rewriter") // Dashboard | History | Rewriter
  const [showProfile, setShowProfile] = useState(false)

  const tones = useMemo(() => ["Formal", "Polite", "Friendly"], [])

  useEffect(() => {
    const saved = localStorage.getItem("clearmail_api_base") || ""
    setApiBase(saved)
    const savedDemo = localStorage.getItem("clearmail_demo_mode") === "true"
    setDemoMode(savedDemo)
  }, [])
  useEffect(() => {
    localStorage.setItem("clearmail_api_base", apiBase || "")
  }, [apiBase])
  useEffect(() => {
    localStorage.setItem("clearmail_demo_mode", demoMode ? "true" : "false")
  }, [demoMode])
  // Fixed brand palette and logo (chosen for clarity and vibrance)
  function getStyles(mode) {
    if (mode === "Dark") {
      return {
        // blobs (cyan + lavender highlights)
        from: "from-[#38BDF8]/20", via: "via-[#A78BFA]/18", to: "to-[#38BDF8]/10",
        ring: "focus:ring-[#38BDF8]",
        ringStrong: "focus:ring-[#38BDF8]",
        button: "from-[#38BDF8] via-[#A78BFA] to-[#38BDF8]",
        container: "text-slate-100 bg-[#0F172A]",
        header: "bg-[#0F172A]/80 border-slate-700",
        label: "text-slate-200",
        input: "border-slate-700 bg-[#1E293B] text-slate-100",
        select: "border-slate-700 bg-[#1E293B] text-slate-100",
        card: "border-slate-700 bg-[#1E293B] text-slate-100",
        helper: "text-slate-400",
        error: "text-red-300 bg-red-900/30 border-red-800",
        nav: {
          bar: "bg-[#0F172A] text-white",
          active: "text-white border-[#38BDF8]",
          inactive: "text-white/80 hover:text-white",
          avatarBg: "bg-[#38BDF8]",
          select: "bg-[#1E293B] text-slate-100 border border-slate-600 focus:outline-none focus:ring-1 focus:ring-[#38BDF8]",
          underline: "bg-[#38BDF8]",
        }
      }
    }
  
    if (mode === "SoftTech") {
      return {
        // brighter background blobs
        from: "from-[#FFD6F0]/80",
        via: "via-[#F1E6FF]/75",
        to: "to-[#AAFFFF]/80",
        // focus and accent colors
        ring: "focus:ring-[#EC4899]",
        ringStrong: "focus:ring-[#8B5CF6]",
        button: "from-[#EC4899] to-[#8B5CF6]",
        container: "text-[#1E293B] bg-gradient-to-br from-[#FDECF9] to-[#DDFBFF]",
        header: "bg-white/85 border-[#E2E8F0]",
        label: "text-[#1E293B]",
        input: "border-[#E2E8F0] bg-white text-[#1E293B]",
        select: "border-[#E2E8F0] bg-white text-[#1E293B]",
        card: "border-[#E2E8F0] bg-white text-[#1E293B]",
        helper: "text-[#94A3B8]",
        error: "text-red-600 bg-red-50 border-red-200",
        nav: {
          bar: "bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white",
          active: "text-white border-[#FFFFFF]",
          inactive: "text-white/90 hover:text-white",
          avatarBg: "bg-white text-[#1E293B]",
          select: "bg-white text-[#1E293B] border border-[#E2E8F0]",
          underline: "bg-white",
        }
      }
    }
    
    
    
  
    // 🍈 Honeydew + Orchid + MediumSlateBlue
    return {
      from: "from-[#66CDAA]/25", via: "via-[#DA70D6]/20", to: "to-[#66CDAA]/15",
      ring: "focus:ring-[#7B68EE]",
      ringStrong: "focus:ring-[#7B68EE]",
      button: "from-[#7B68EE] via-[#DA70D6] to-[#7B68EE]",
      container: "text-[#191970] bg-[#F0FFF0]",
      header: "bg-white/85 border-slate-200",
      label: "text-[#191970]",
      input: "border-slate-300 bg-white text-slate-900",
      select: "border-slate-300 bg-white text-slate-900",
      card: "border-slate-300 bg-white text-slate-900",
      helper: "text-slate-600",
      error: "text-red-700 bg-red-50 border-red-200",
      nav: {
        bar: "bg-[#7B68EE] text-white",
        active: "text-white border-[#66CDAA]",
        inactive: "text-white/90 hover:text-white",
        avatarBg: "bg-[#66CDAA]",
        select: "bg-white text-slate-900 border border-slate-200",
        underline: "bg-[#66CDAA]",
      }
    }
  }
  
  
  const t = getStyles(palette)

  function Logo({ className }) {
    // Feather pen logo to emphasize writing/rewriting
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" className={className}>
        <path d="M20 4c-6 0-10 4-10 10v6l4-4c6 0 10-4 10-10" strokeWidth="1.6" />
      </svg>
    )
  }

  function localRewrite(input, chosenTone) {
    const text = String(input || "").trim()
    if (!text) return ""
    const tonePrefix = {
      Formal: "Subject: \n\n",
      Polite: "Hi,\n\n",
      Friendly: "Hey,\n\n",
    }[chosenTone] || ""
    // Simple cleanup: collapse spaces, capitalize sentences
    const cleaned = text
      .replace(/\s+/g, " ")
      .replace(/\s*([,.!?])\s*/g, "$1 ")
      .trim()
      .replace(/(^\w|[.!?]\s+\w)/g, (m) => m.toUpperCase())
    // Add a courteous closing based on tone
    const closing = {
      Formal: "\n\nKind regards,\n[Your Name]",
      Polite: "\n\nThanks in advance!\n[Your Name]",
      Friendly: "\n\nCheers,\n[Your Name]",
    }[chosenTone] || ""
    return `${tonePrefix}${cleaned}${closing}`
  }

  function saveHistoryRecord(params) {
    try {
      const item = {
        id: `${Date.now()}`,
        createdAt: new Date().toISOString(),
        tone: params.tone,
        input: params.input,
        output: params.output,
      }
      const prev = JSON.parse(localStorage.getItem("clearmail_history") || "[]")
      localStorage.setItem("clearmail_history", JSON.stringify([item, ...prev].slice(0, 50)))
      window.dispatchEvent(new Event("clearmail_history_updated"))
    } catch {}
  }

  async function handleRewrite() {
    setIsLoading(true)
    setError("")
    setOutput("")
    try {
      if (demoMode || !(apiBase || "").trim()) {
        // Frontend-only demo mode
        const rewritten = localRewrite(emailText, tone)
        setOutput(rewritten)
        saveHistoryRecord({ tone, input: emailText, output: rewritten })
      } else {
        const base = (apiBase || "").replace(/\/$/, "")
        const url = `${base}/api/rewrite`
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: emailText, tone })
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data?.error || `Request failed: ${res.status}`)
        }
        const data = await res.json()
        const rewritten = data?.rewritten || ""
        setOutput(rewritten)
        saveHistoryRecord({ tone, input: emailText, output: rewritten })
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const isDisabled = useMemo(() => isLoading || emailText.trim().length === 0, [isLoading, emailText])

  return (
    <div className={`relative min-h-screen ${t.container}`}>
      {/* Colorful background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className={`absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-br ${t.from} ${t.via} ${t.to} blur-3xl opacity-40`} />
        <div className={`absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br ${t.from} ${t.via} ${t.to} blur-3xl opacity-35`} />
      </div>
      {/* Top app nav */}
      <div className={`w-full ${t.nav.bar} px-4 py-2 rounded-b-2xl shadow` }>
        <div className="mx-auto max-w-5xl h-10 flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm">
            <div className="relative">
              <button onClick={()=>setActiveTab("Dashboard")} className={`relative pb-2 ${activeTab==="Dashboard" ? t.nav.active : t.nav.inactive}`}>Dashboard</button>
              {activeTab==="Dashboard" && (<span className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-0.5 w-12 rounded-full ${t.nav.underline}`}></span>)}
            </div>
            <div className="relative">
              <button onClick={()=>setActiveTab("History")} className={`relative pb-2 ${activeTab==="History" ? t.nav.active : t.nav.inactive}`}>History</button>
              {activeTab==="History" && (<span className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-0.5 w-12 rounded-full ${t.nav.underline}`}></span>)}
            </div>
            <div className="relative">
              <button onClick={()=>setActiveTab("Rewriter")} className={`relative pb-2 ${activeTab==="Rewriter" ? t.nav.active : t.nav.inactive}`}>Rewriter</button>
              {activeTab==="Rewriter" && (<span className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-0.5 w-12 rounded-full ${t.nav.underline}`}></span>)}
            </div>
          </nav>
          <div className="ml-auto flex items-center gap-3 relative">
          <select value={palette} onChange={(e)=>setPalette(e.target.value)} className={`px-2 py-1 rounded-md text-xs ${t.nav.select}`}>
               <option value="Honeydew">Honeydew</option>
               <option value="Dark">Dark</option>
               <option value="SoftTech">SoftTech</option>
          </select>
            <button onClick={()=>setShowProfile(v=>!v)} className={`h-8 w-8 rounded-full ${t.nav.avatarBg} grid place-items-center text-[#0B1220] shadow-sm focus:outline-none`} title="Profile">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0B1220" className="h-5 w-5">
                <circle cx="12" cy="8" r="3.2" strokeWidth="1.6" />
                <path d="M4.5 19c1.8-3.2 4.7-5 7.5-5s5.7 1.8 7.5 5" strokeWidth="1.6" />
              </svg>
            </button>
            {showProfile && (
              <div className={`absolute right-0 top-10 w-56 rounded-lg border ${t.card} shadow-xl`}> 
                <div className="p-3 flex items-center gap-3 border-b border-slate-600/30">
                  <div className={`h-8 w-8 rounded-full ${t.nav.avatarBg} grid place-items-center text-[#0B1220]`}>A</div>
                  <div className="text-xs">
                    <div className="font-semibold">Alex Johnson</div>
                    <div className={`${t.helper}`}>alex@example.com</div>
                  </div>
                </div>
                <div className="p-2 text-sm">
                  <button onClick={()=>{ setShowSettings(true); setShowProfile(false) }} className={`w-full text-left px-3 py-2 rounded-md hover:brightness-110`}>Settings</button>
                  <button onClick={()=>{ try { localStorage.removeItem("clearmail_history"); window.dispatchEvent(new Event("clearmail_history_updated")) } catch {}; setShowProfile(false) }} className={`w-full text-left px-3 py-2 rounded-md hover:brightness-110`}>Clear history</button>
                  <button onClick={()=>setShowProfile(false)} className={`w-full text-left px-3 py-2 rounded-md hover:brightness-110`}>Sign out</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-10 backdrop-blur border-b ${t.header}`}>
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${t.button} grid place-items-center shadow-md`}>
              <Logo className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">ClearMail</h1>
          </div>
          <div className="flex items-center gap-3">
            <p className={`hidden sm:block text-sm ${t.helper}`}>AI Email Rewriter</p>
            <button
              onClick={() => setShowSettings(true)}
              className="px-3 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-sm"
            >Settings</button>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      {activeTab === "Dashboard" && (
        <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
          <h2 className={`text-lg font-semibold ${t.label}`}>Dashboard</h2>
          <DashboardView styles={t} />
        </main>
      )}

      {/* History */}
      {activeTab === "History" && (
        <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
          <h2 className={`text-lg font-semibold ${t.label}`}>History</h2>
          <HistoryView styles={t} />
        </main>
      )}

      {/* Rewriter */}
      {activeTab === "Rewriter" && (
      <main className="mx-auto max-w-5xl px-4 py-8 grid lg:grid-cols-2 gap-6">
        <section className="space-y-3">
          <label className={`block text-sm font-medium ${t.label}`}>Your email</label>
          <textarea
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            placeholder="Paste or type your email here..."
            className={`w-full h-80 p-4 rounded-xl border ${t.input} shadow-inner focus:outline-none focus:ring-2 ${t.ringStrong} backdrop-blur-sm resize-none`}
          />

          <div className="flex items-center gap-3">
            <div className="space-y-1">
              <label className={`block text-sm font-medium ${t.label}`}>Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className={`px-3 py-2 rounded-md border ${t.select} shadow-sm focus:outline-none focus:ring-2 ${t.ring}`}
              >
                {tones.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleRewrite}
              disabled={isDisabled}
              className={`ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-medium text-white bg-gradient-to-r ${t.button} hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${t.ringStrong}`}
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 inline-block animate-spin rounded-full border-2 border-white border-r-transparent" />
                  Rewriting...
                </>
              ) : (
                <>Rewrite</>
              )}
            </button>
          </div>

          {error && (
            <div className={`text-sm rounded-md px-3 py-2 border ${t.error}`}>{error}</div>
          )}
        </section>

        <section className="space-y-3">
          <label className={`block text-sm font-medium ${t.label}`}>Improved version</label>
          <div className={`h-80 p-4 rounded-xl border ${t.card} shadow-inner overflow-auto whitespace-pre-wrap backdrop-blur-sm`}>
            {output || <span className="text-slate-400">Your rewritten email will appear here.</span>}
          </div>
          {output && (
            <div className="flex gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                className={`px-3 py-2 rounded-md border ${t.card} hover:brightness-110 shadow-sm`}
              >Copy</button>
              <button
                onClick={() => setOutput("")}
                className={`px-3 py-2 rounded-md border ${t.card} hover:brightness-110 shadow-sm`}
              >Clear</button>
            </div>
          )}
        </section>
      </main>
      )}

      <footer className="mx-auto max-w-5xl px-4 pb-8 text-center text-xs text-slate-500">
        Built with React, Tailwind, and AI
      </footer>

      {showSettings && (
        <div className="fixed inset-0 z-20 grid place-items-center bg-black/40 p-4" onClick={() => setShowSettings(false)}>
          <div className="w-full max-w-lg rounded-xl border border-slate-700 bg-[#0B1220] text-slate-100 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-slate-700 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Settings</h2>
              <button className="text-slate-400 hover:text-slate-200" onClick={() => setShowSettings(false)}>✕</button>
            </div>
            <div className="p-4 space-y-4">
              <label className="block text-sm font-medium text-slate-200">API base URL</label>
              <input
                value={apiBase}
                onChange={(e) => setApiBase(e.target.value)}
                placeholder="e.g. http://localhost:5175"
                className={`w-full px-3 py-2 rounded-md border border-slate-700 bg-[#0B1220] text-slate-100 shadow-sm focus:outline-none focus:ring-2 ${t.ring}`}
              />
              <p className="text-xs text-slate-500">Your requests will be sent to [API base]/api/rewrite</p>

              <div className="flex items-center gap-2 pt-2">
                <input id="demoMode" type="checkbox" className="h-4 w-4" checked={demoMode} onChange={(e) => setDemoMode(e.target.checked)} />
                <label htmlFor="demoMode" className="text-sm text-slate-200">Enable Demo mode (rewrite locally without backend)</label>
              </div>
            </div>
            <div className="p-4 border-t border-slate-700 flex justify-end">
              <button className="px-3 py-2 rounded-md border border-slate-700 bg-[#0B1220] hover:bg-[#111827] text-slate-100 shadow-sm" onClick={() => setShowSettings(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function useHistoryData() {
  const [items, setItems] = useState([])
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("clearmail_history") || "[]")
      setItems(data)
    } catch { setItems([]) }
    const onUpdate = () => {
      try {
        const data = JSON.parse(localStorage.getItem("clearmail_history") || "[]")
        setItems(data)
      } catch {}
    }
    window.addEventListener("clearmail_history_updated", onUpdate)
    return () => window.removeEventListener("clearmail_history_updated", onUpdate)
  }, [])
  return { items, refresh: () => {
    try { const data = JSON.parse(localStorage.getItem("clearmail_history") || "[]"); setItems(data) } catch {}
  } }
}

function DashboardView({ styles }) {
  const { items } = useHistoryData()
  const total = items.length
  const byTone = items.reduce((acc, it) => { acc[it.tone] = (acc[it.tone]||0)+1; return acc }, {})
  const avgDelta = items.length ? Math.round(items.reduce((s,it)=> s + (it.output.length - it.input.length),0)/items.length) : 0
  const lastFive = items.slice(0,5)

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard title="Total rewrites" value={total} styles={styles} />
        <StatCard title="Avg length change" value={(avgDelta>=0? "+":"") + avgDelta + " chars"} styles={styles} />
        <StatCard title="Most used tone" value={Object.entries(byTone).sort((a,b)=>b[1]-a[1])[0]?.[0] || "—"} styles={styles} />
      </div>
      <div className={`rounded-xl border p-4 ${styles.card}`}>
        <h3 className="text-sm font-semibold mb-3">Recent</h3>
        {lastFive.length === 0 ? (
          <p className={"text-sm "+styles.helper}>No items yet. Try a rewrite.</p>
        ) : (
          <ul className="space-y-3">
            {lastFive.map(it => (
              <li key={it.id} className="text-sm">
                <span className="opacity-70 mr-2">[{it.tone}]</span>
                <span className="opacity-90">{it.output.slice(0,80)}{it.output.length>80?"…":""}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function HistoryView({ styles }) {
  const { items, refresh } = useHistoryData()
  return (
    <div className={`rounded-xl border p-4 ${styles.card}`}>
      <div className="flex items-center gap-3 mb-3">
        <button onClick={refresh} className={`px-3 py-1.5 rounded-md text-white bg-gradient-to-r ${styles.button}`}>Refresh</button>
        <span className={styles.helper+" text-xs"}>{items.length} total</span>
      </div>
      {items.length===0 ? (
        <p className={"text-sm "+styles.helper}>No history yet.</p>
      ) : (
        <ul className="space-y-4">
          {items.map(it => (
            <li key={it.id} className="space-y-2">
              <div className="flex items-center gap-2 text-xs opacity-70">
                <span>{new Date(it.createdAt).toLocaleString()}</span>
                <span>•</span>
                <span>{it.tone}</span>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div className={`rounded-lg border p-3 ${styles.card}`}>
                  <div className="text-xs opacity-70 mb-1">Original</div>
                  <div className="whitespace-pre-wrap text-sm opacity-90">{it.input}</div>
                </div>
                <div className={`rounded-lg border p-3 ${styles.card}`}>
                  <div className="text-xs opacity-70 mb-1">Rewritten</div>
                  <div className="whitespace-pre-wrap text-sm opacity-90">{it.output}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>navigator.clipboard.writeText(it.output)} className={`px-3 py-1.5 rounded-md text-white bg-gradient-to-r ${styles.button}`}>Copy</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function StatCard({ title, value, styles }) {
  return (
    <div className={`rounded-xl border p-4 ${styles.card}`}>
      <div className="text-xs opacity-70 mb-1">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}

export default App
