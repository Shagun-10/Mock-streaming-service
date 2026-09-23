import { useState } from "react";
import { SECTION_DEFINITIONS } from "../data/sectionDefinitions";

function compilePrompt(template, sections, config) {
  const lines = [];

  // Instructions from config
  if (config.tone || config.verbosity || config.outputFormat) {
    lines.push("### INSTRUCTIONS");
    if (config.tone) lines.push(`- Use a ${config.tone} tone.`);
    if (config.verbosity === "detailed") lines.push("- Provide a detailed and thorough explanation.");
    if (config.verbosity === "concise") lines.push("- Keep responses brief and to the point.");
    if (config.verbosity === "balanced") lines.push("- Provide a balanced level of detail.");
    if (config.outputFormat === "paragraph") lines.push("- Write the output in paragraph form.");
    if (config.outputFormat === "bullet-list") lines.push("- Write the output in bullet point form.");
    if (config.outputFormat === "numbered-list") lines.push("- Write the output as a numbered list.");
    lines.push("");
  }

  lines.push("### PROMPT");

  Object.entries(sections).forEach(([id, data]) => {
    const def = SECTION_DEFINITIONS[id];
    if (!def) return;
    const hasContent = def.fields.some((f) => data?.fields?.[f.key]?.trim());
    if (!hasContent) return;

    lines.push(`## ${def.label}`);
    def.fields.forEach((field) => {
      const val = data?.fields?.[field.key];
      if (!val?.trim()) return;
      lines.push(`${field.key}: ${val.trim()}`);
    });
    lines.push("");
  });

  return lines.join("\n");
}

export default function FinalOutput({ template, sections, config, onReset, onBack }) {
  const [copied, setCopied] = useState(false);
  const compiled = compilePrompt(template, sections, config);

  function handleCopy() {
    navigator.clipboard.writeText(compiled).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Final Prompt</h2>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>
        Your structured prompt is ready. Copy it and use it with any AI system.
      </p>

      <div style={{ background: "#151820", border: "1px solid #1e2535", borderRadius: 10, padding: 20, marginBottom: 16 }}>
        <pre style={{ color: "#e2e8f0", fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0, fontFamily: "monospace" }}>
          {compiled}
        </pre>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "1px solid #2d3148", color: "#94a3b8", borderRadius: 8, padding: "9px 20px", fontSize: 13, cursor: "pointer" }}
        >
          ← Back
        </button>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={handleCopy}
            style={{ background: copied ? "#14532d" : "#151820", border: "1px solid #1e2535", color: copied ? "#22c55e" : "#94a3b8", borderRadius: 8, padding: "9px 20px", fontSize: 13, cursor: "pointer" }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={onReset}
            style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, padding: "9px 24px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
