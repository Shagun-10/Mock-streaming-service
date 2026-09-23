export default function TemplateCard({ template, isHovered, onHover, onSelect }) {
  return (
    <button
      className={`text-left group relative border rounded-2xl p-6 transition-all duration-200 cursor-pointer w-full ${
        isHovered
          ? "border-amber-400/60 bg-amber-400/5"
          : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
      }`}
      onMouseEnter={() => onHover(template.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(template)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3 flex-1">
          <div className="text-3xl">{template.icon}</div>
          <div>
            <h3 className="font-bold text-white text-lg leading-tight">{template.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mt-1">{template.description}</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-slate-600 uppercase tracking-wider">Required sections</div>
            <div className="flex flex-wrap gap-1.5">
              {template.requiredSections.map((s) => (
                <span
                  key={s}
                  className="text-[11px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md capitalize"
                >
                  {s.replace(/-/g, " ")}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isHovered ? "bg-amber-400 text-black" : "bg-slate-800 text-slate-500"
          }`}
        >
          →
        </div>
      </div>
    </button>
  );
}
