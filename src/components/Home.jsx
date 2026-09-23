import templates from "../data/templates.json";

export default function Home({ onSelectTemplate }) {
  return (
    <div>
      <div style={{ textAlign: "center", padding: "48px 0 40px" }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#fff", margin: "0 0 16px" }}>
          AI Prompt Engineering Studio
        </h1>
        <p style={{ color: "#94a3b8", maxWidth: 520, margin: "0 auto 10px", lineHeight: 1.6, fontSize: 15 }}>
          Design powerful, structured prompts using a guided workflow that enforces clarity, logical
          consistency, and real-world prompt engineering practices.
        </p>
        <p style={{ color: "#64748b", maxWidth: 480, margin: "0 auto", fontSize: 13, lineHeight: 1.6 }}>
          Inspired by modern AI systems, this platform helps you build prompts the way professionals do —
          structured, validated, and optimized for high-quality outputs.
        </p>
      </div>

      {/* Problem */}
      <div style={{ textAlign: "center", padding: "32px 0 24px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 14 }}>The Problem</h2>
        <p style={{ color: "#94a3b8", maxWidth: 480, margin: "0 auto 10px", fontSize: 14, lineHeight: 1.6 }}>
          Most users write prompts as free-form text without structure, which leads to inconsistent, vague, and
          low-quality results.
        </p>
        <p style={{ color: "#94a3b8", maxWidth: 480, margin: "0 auto", fontSize: 14, lineHeight: 1.6 }}>
          Without clearly defined roles, instructions, and constraints, AI systems struggle to produce reliable
          outputs and meaningful results.
        </p>
      </div>

      <div style={{ textAlign: "center", padding: "24px 0 32px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Our Solution</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, maxWidth: 700, margin: "0 auto" }}>
          {[
            { title: "Structured Sections", desc: "Build prompts using clearly defined sections like Role, Context, and Instructions instead of unstructured text." },
            { title: "Real-Time Validation", desc: "Instantly detect missing sections, weak inputs, and logical issues as you build your prompt." },
            { title: "Config-Driven Logic", desc: "Control tone, verbosity, and output structure through smart configuration options." },
          ].map((item) => (
            <div key={item.title} style={{ background: "#151820", border: "1px solid #1e2535", borderRadius: 10, padding: "18px 16px" }}>
              <div style={{ color: "#6366f1", fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{item.title}</div>
              <div style={{ color: "#64748b", fontSize: 12, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "24px 0 32px", borderTop: "1px solid #1e2130" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 14 }}>About Prompt Confluence</h2>
        <p style={{ color: "#94a3b8", maxWidth: 520, margin: "0 auto 10px", fontSize: 14, lineHeight: 1.6 }}>
          Prompt Confluence is an AI tools initiative focused on improving the reliability and usability of
          prompt-based systems through structured design and validation-driven workflows.
        </p>
        <p style={{ color: "#94a3b8", maxWidth: 520, margin: "0 auto", fontSize: 14, lineHeight: 1.6 }}>
          It simulates how modern AI systems benefit from well-structured prompts, helping users understand best
          practices through an interactive experience.
        </p>
      </div>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Choose a Template</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelectTemplate(t)}
            style={{
              background: "#151820",
              border: "1px solid #1e2535",
              borderRadius: 10,
              padding: "18px 14px",
              cursor: "pointer",
              textAlign: "left",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#6366f1")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1e2535")}
          >
            <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{t.title}</div>
            <div style={{ color: "#64748b", fontSize: 11 }}>{t.requiredSections.length} sections</div>
          </button>
        ))}
      </div>
    </div>
  );
}
