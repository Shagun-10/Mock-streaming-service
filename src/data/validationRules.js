import { SECTION_DEFINITIONS } from "./sectionDefinitions";

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function checkRequired(sections, requiredIds) {
  const issues = [];
  requiredIds.forEach((id) => {
    const def = SECTION_DEFINITIONS[id];
    if (!def) return;
    def.fields.filter((f) => f.required).forEach((field) => {
      const val = sections[id]?.fields?.[field.key] || "";
      if (!val.trim()) {
        issues.push({ type: "error", message: `${def.label}: ${field.label} is required.` });
      } else if (countWords(val) < field.minWords) {
        issues.push({ type: "error", message: `${def.label}: ${field.label} needs at least ${field.minWords} words.` });
      }
    });
  });
  return issues;
}

function validateConversationalAssistant(sections, config) {
  const issues = [];
  issues.push(...checkRequired(sections, ["persona", "context", "objective", "constraints"]));

  const hardLimits = sections?.constraints?.fields?.hard_limits || "";
  if (hardLimits && !/(never|always|must|do not)/i.test(hardLimits)) {
    issues.push({ type: "warning", message: "Constraints should use directive language like 'never', 'always', or 'must'." });
  }

  const personality = sections?.persona?.fields?.personality || "";
  if (config?.tone === "formal" && /(casual|playful|informal)/i.test(personality)) {
    issues.push({ type: "warning", message: "Tone is set to Formal but persona mentions casual/playful traits." });
  }

  if (!sections["fallback-behavior"]) {
    issues.push({ type: "suggestion", message: "Consider adding a Fallback Behavior section to handle uncertainty." });
  }
  if (!sections["examples"]) {
    issues.push({ type: "suggestion", message: "Adding Examples helps the AI calibrate the desired response style." });
  }
  return issues;
}

function validateStudyTutor(sections, config) {
  const issues = [];
  issues.push(...checkRequired(sections, ["subject", "learner-profile", "learning-objective", "teaching-approach"]));

  const outcome = sections?.["learning-objective"]?.fields?.target_outcome || "";
  const actionVerbs = ["solve", "explain", "identify", "apply", "analyze", "create", "evaluate", "demonstrate", "describe", "compare"];
  if (outcome && !actionVerbs.some((v) => outcome.toLowerCase().includes(v))) {
    issues.push({ type: "warning", message: "Learning objective should include a measurable action verb (e.g. solve, explain, identify)." });
  }

  const pedagogy = sections?.["teaching-approach"]?.fields?.pedagogy || "";
  const methods = ["scaffold", "example", "practice", "model", "guided", "inquiry", "direct", "demonstrate"];
  if (pedagogy && !methods.some((k) => pedagogy.toLowerCase().includes(k))) {
    issues.push({ type: "warning", message: "Teaching approach should reference a specific strategy such as scaffolding or worked examples." });
  }

  if (config?.verbosity === "concise" && config?.difficultyLevel === "advanced") {
    issues.push({ type: "warning", message: "Concise verbosity with Advanced difficulty may produce incomplete explanations." });
  }

  if (!sections["assessment-style"]) {
    issues.push({ type: "suggestion", message: "Consider adding an Assessment Style section for comprehension checks." });
  }
  if (!sections["pacing-instructions"]) {
    issues.push({ type: "suggestion", message: "Pacing Instructions help the tutor avoid cognitive overload." });
  }
  return issues;
}


function validateResumeReviewer(sections) {
  const issues = [];

  const countWords = (str) =>
    (str || "").trim().split(/\s+/).filter(Boolean).length;

  const job = sections?.["job-description"]?.fields?.description || "";
  const criteria = sections?.["evaluation-criteria"]?.fields?.criteria || "";
  const format = sections?.["feedback-format"]?.fields?.format || "";
  const audience = sections?.["target-audience"]?.fields?.audience || "";

  if (countWords(job) < 20) {
    issues.push({
      type: "error",
      message: "Job Description must be at least 20 words."
    });
  }

  if (countWords(criteria) < 20) {
    issues.push({
      type: "error",
      message: "Evaluation Criteria must be at least 20 words."
    });
  }

  if (countWords(format) < 20) {
    issues.push({
      type: "error",
      message: "Feedback Format must be at least 20 words."
    });
  }

  if (countWords(audience) < 20) {
    issues.push({
      type: "error",
      message: "Target Audience must be at least 20 words."
    });
  }

  return issues;
}

export function runValidation(templateId, sections, config) {
  switch (templateId) {
    case "conversational-assistant":
      return validateConversationalAssistant(sections, config);
    case "study-tutor":
      return validateStudyTutor(sections, config);
    case "resume-reviewer":
      return validateResumeReviewer(sections);
    default:
      return [{ type: "suggestion", message: "Validation for this category will be added by Person 2." }];
  }
}
