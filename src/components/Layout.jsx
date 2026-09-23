export default function Layout({ children, currentView, onNavigate, template, onReset }) {
  const steps = [
    { id: "home", label: "Home" },
    { id: "builder", label: "Build" },
    { id: "config", label: "Configure" },
    { id: "output", label: "Output" },
  ];
  const activeIdx = steps.findIndex((s) => s.id === currentView);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 font-sans">
      <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0a0a0f]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={onReset}
            className="flex items-center gap-2 group"
          >
            <span className="text-lg font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
              Prompt<span className="text-amber-400">Confluence</span>
            </span>
          </button>

          {currentView !== "home" && (
            <nav className="flex items-center gap-1">
              {steps.slice(1).map((step, i) => {
                const realIdx = i + 1;
                const isDone = activeIdx > realIdx;
                const isActive = activeIdx === realIdx;
                return (
                  <div key={step.id} className="flex items-center gap-1">
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-amber-400 text-black"
                          : isDone
                          ? "bg-slate-700 text-slate-300"
                          : "text-slate-600"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                          isActive ? "bg-black/20" : isDone ? "bg-slate-500" : "bg-slate-800"
                        }`}
                      >
                        {isDone ? "✓" : realIdx}
                      </span>
                      <span className="hidden sm:inline">{step.label}</span>
                    </div>
                    {i < 2 && (
                      <div className={`w-6 h-px ${isDone ? "bg-slate-600" : "bg-slate-800"}`} />
                    )}
                  </div>
                );
              })}
            </nav>
          )}

          {template && currentView !== "home" && (
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-full">
              <span>{template.icon}</span>
              <span>{template.title}</span>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
