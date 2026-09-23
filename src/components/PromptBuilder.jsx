import { useState, useMemo } from "react";
import Section from "./Section";
import { SECTION_ORDER, SECTION_DEFINITIONS } from "../data/sectionDefinitions";

const MIN_SECTIONS = 4;

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function getValidationIssues(template, sections) {
  const issues = [];
  const required = template?.requiredSections || [];

  required.forEach((id) => {
    const def = SECTION_DEFINITIONS[id];
    if (!def) return;
    def.fields.filter((f) => f.required).forEach((field) => {
      const val = sections[id]?.fields?.[field.key] || "";
      if (!val.trim()) {
        issues.push({ id: `${id}-${field.key}`, label: `${def.label}: ${field.label} is required`, type: "error" });
      } else if (countWords(val) < field.minWords) {
        issues.push({ id: `${id}-${field.key}-len`, label: `${def.label}: ${field.label} needs ${field.minWords} words`, type: "error" });
      }
    });
  });

  //Suggestions
  const optionals = template?.optionalSections || [];
  optionals.forEach((id) => {
    if (!sections[id]) {
      const def = SECTION_DEFINITIONS[id];
      if (def) issues.push({ id: `suggest-${id}`, label: `Consider adding ${def.label} for better precision`, type: "suggestion" });
    }
  });

  return issues;
}

export default function PromptBuilder({ template, sections, onSectionsChange, onNext }) {
  const [showAdd, setShowAdd] = useState(false);

  const requiredIds = template?.requiredSections || [];
  const optionalIds = template?.optionalSections || [];
  const allOrder = SECTION_ORDER[template?.id] || [];

  const activeSectionIds = useMemo(() => {
    return allOrder.filter((id) => requiredIds.includes(id) || !!sections[id]);
  }, [allOrder, requiredIds, sections]);

  const availableToAdd = optionalIds.filter((id) => !sections[id]);

  function handleChange(sectionId, fields) {
    onSectionsChange({ ...sections, [sectionId]: { fields } });
  }

  function handleAdd(id) {
    onSectionsChange({ ...sections, [id]: { fields: {} } });
    setShowAdd(false);
  }

  function handleRemove(id) {
    const next = { ...sections };
    delete next[id];
    onSectionsChange(next);
  }

  const issues = getValidationIssues(template, sections);
  const errors = issues.filter((i) => i.type === "error");
  const suggestions = issues.filter((i) => i.type === "suggestion");
  const canProceed = errors.length === 0 && activeSectionIds.length >= MIN_SECTIONS;

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Build Your Prompt</h2>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>
        Template: {template?.title} — fill in at least {MIN_SECTIONS} sections to continue.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>
        <div>
          {activeSectionIds.map((id) => (
            <Section
              key={id}
              sectionId={id}
              data={sections[id] || { fields: {} }}
              onChange={handleChange}
              onRemove={handleRemove}
              isRequired={requiredIds.includes(id)}
            />
          ))}

          {availableToAdd.length > 0 && (
            <div>
              {!showAdd ? (
                <button
                  onClick={() => setShowAdd(true)}
                  style={{ width: "100%", background: "none", border: "1px dashed #2d3148", borderRadius: 10, padding: "10px", color: "#64748b", cursor: "pointer", fontSize: 13 }}
                >
                  + Add Optional Section
                </button>
              ) : (
                <div style={{ background: "#151820", border: "1px solid #1e2535", borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 10, display: "flex", justifyContent: "space-between" }}>
                    <span>Select a section to add</span>
                    <button onClick={() => setShowAdd(false)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}>✕</button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {availableToAdd.map((id) => {
                      const def = SECTION_DEFINITIONS[id];
                      if (!def) return null;
                      return (
                        <button
                          key={id}
                          onClick={() => handleAdd(id)}
                          style={{ background: "#0f1117", border: "1px solid #1e2535", borderRadius: 8, padding: "8px 12px", color: "#e2e8f0", fontSize: 13, cursor: "pointer", textAlign: "left" }}
                        >
                          {def.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          <div style={{ marginTop: 20, textAlign: "right" }}>
            <button
              onClick={onNext}
              disabled={!canProceed}
              style={{
                background: canProceed ? "#6366f1" : "#1e2535",
                color: canProceed ? "#fff" : "#4b5563",
                border: "none",
                borderRadius: 8,
                padding: "10px 24px",
                fontSize: 14,
                fontWeight: 600,
                cursor: canProceed ? "pointer" : "not-allowed",
              }}
            >
              Continue →
            </button>
          </div>
        </div>

        <div style={{ background: "#151820", border: "1px solid #1e2535", borderRadius: 10, padding: 16, position: "sticky", top: 20 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#e2e8f0", marginBottom: 12 }}>Validation Summary</div>
          {issues.length === 0 ? (
            <div style={{ color: "#22c55e", fontSize: 13 }}>✓ Prompt looks good</div>
          ) : (
            <div>
              {errors.map((issue) => (
                <div key={issue.id} style={{ background: "#2d1515", border: "1px solid #7f1d1d", borderRadius: 6, padding: "6px 10px", marginBottom: 6, fontSize: 12, color: "#fca5a5" }}>
                  {issue.label}
                </div>
              ))}
              {suggestions.map((issue) => (
                <div key={issue.id} style={{ background: "#1a2535", border: "1px solid #1e3a5f", borderRadius: 6, padding: "6px 10px", marginBottom: 6, fontSize: 12, color: "#93c5fd" }}>
                  {issue.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
