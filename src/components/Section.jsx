import { SECTION_DEFINITIONS } from "../data/sectionDefinitions";

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export default function Section({ sectionId, data, onChange, onRemove, isRequired }) {
  const def = SECTION_DEFINITIONS[sectionId];
  if (!def) return null;

  function handleChange(key, value) {
    onChange(sectionId, { ...data.fields, [key]: value });
  }

  return (
    <div style={{ background: "#151820", border: "1px solid #1e2535", borderRadius: 10, marginBottom: 12, overflow: "hidden" }}>
      <div style={{ padding: "10px 16px", borderBottom: "1px solid #1e2535", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: "#e2e8f0" }}>{def.label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!isRequired && (
            <button
              onClick={() => onRemove(sectionId)}
              style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 12, padding: "2px 6px" }}
            >
              Remove
            </button>
          )}
          {isRequired && <span style={{ fontSize: 11, color: "#64748b" }}>Required</span>}
        </div>
      </div>

      <div style={{ padding: "14px 16px" }}>
        {def.fields.map((field) => {
          const value = data?.fields?.[field.key] || "";
          const words = countWords(value);
          const meetsMin = words >= field.minWords;

          return (
            <div key={field.key} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <label style={{ fontSize: 12, color: "#94a3b8" }}>{field.label}</label>
                {value && (
                  <span style={{ fontSize: 11, color: meetsMin ? "#22c55e" : "#ef4444" }}>
                    {words}/{field.minWords} words
                  </span>
                )}
              </div>
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                style={{
                  width: "100%",
                  background: "#0f1117",
                  border: "1px solid #1e2535",
                  borderRadius: 6,
                  padding: "8px 12px",
                  color: "#e2e8f0",
                  fontSize: 13,
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                onBlur={(e) => (e.target.style.borderColor = "#1e2535")}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
