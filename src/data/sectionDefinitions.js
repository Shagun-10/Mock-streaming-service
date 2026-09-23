export const SECTION_DEFINITIONS = {
//Conversational Assistant
  persona: {
    id: "persona",
    label: "Persona",
    required: true,
    fields: [
      { key: "role", label: "Role", placeholder: "e.g. A friendly customer support agent for a SaaS company...", minWords: 20, required: true },
      { key: "personality", label: "Personality Traits", placeholder: "e.g. Empathetic, patient, solution-oriented, concise while prioritizing user clarity...", minWords: 20, required: true },
    ],
  },
  context: {
    id: "context",
    label: "Context",
    required: true,
    fields: [
      { key: "situation", label: "Situation", placeholder: "e.g. Users are small business owners encountering the platform for the first time...", minWords: 20, required: true },
      { key: "user_background", label: "User Background", placeholder: "e.g. Non-technical users aged 30–55 who value simplicity and step-by-step explanations...", minWords: 20, required: true },
    ],
  },
  objective: {
    id: "objective",
    label: "Objective",
    required: true,
    fields: [
      { key: "primary_goal", label: "Primary Goal", placeholder: "e.g. Resolve the user's question fully within three exchanges, leaving them confident...", minWords: 20, required: true },
      { key: "success_criteria", label: "Success Criteria", placeholder: "e.g. The user confirms their issue is resolved and rates the interaction as helpful...", minWords: 20, required: true },
    ],
  },
  constraints: {
    id: "constraints",
    label: "Constraints",
    required: true,
    fields: [
      { key: "hard_limits", label: "Hard Limits", placeholder: "e.g. Never speculate about account charges, never promise feature timelines...", minWords: 20, required: true },
      { key: "scope_boundaries", label: "Scope Boundaries", placeholder: "e.g. Redirect questions about competitor products or legal disputes to a human specialist...", minWords: 20, required: false },
    ],
  },
  examples: {
    id: "examples",
    label: "Examples",
    required: false,
    fields: [
      { key: "sample_exchange", label: "Sample Exchange", placeholder: "e.g. User asks about resetting a password; AI acknowledges, provides steps, confirms completion...", minWords: 20, required: false },
    ],
  },
  "tone-guidance": {
    id: "tone-guidance",
    label: "Tone Guidance",
    required: false,
    fields: [
      { key: "tone_details", label: "Tone Details", placeholder: "e.g. Shift to a more formal tone when the user expresses frustration, lighter when going smoothly...", minWords: 20, required: false },
    ],
  },
  "fallback-behavior": {
    id: "fallback-behavior",
    label: "Fallback Behavior",
    required: false,
    fields: [
      { key: "fallback", label: "Fallback Instructions", placeholder: "e.g. If unsure, acknowledge honestly, escalate to a human agent, provide an estimated response time...", minWords: 20, required: false },
    ],
  },

//Study Tutor
  subject: {
    id: "subject",
    label: "Subject",
    required: true,
    fields: [
      { key: "subject_area", label: "Subject Area", placeholder: "e.g. High school mathematics, specifically quadratic equations including factoring and graphing...", minWords: 20, required: true },
      { key: "curriculum_context", label: "Curriculum Context", placeholder: "e.g. This topic follows linear equations and precedes polynomial functions in the curriculum...", minWords: 20, required: false },
    ],
  },
  "learner-profile": {
    id: "learner-profile",
    label: "Learner Profile",
    required: true,
    fields: [
      { key: "level", label: "Academic Level & Background", placeholder: "e.g. A 10th-grade student who understands basic algebra but struggles with abstract notation...", minWords: 20, required: true },
      { key: "learning_style", label: "Learning Style", placeholder: "e.g. Responds well to visual diagrams and real-world analogies before solving independently...", minWords: 20, required: true },
    ],
  },
  "learning-objective": {
    id: "learning-objective",
    label: "Learning Objective",
    required: true,
    fields: [
      { key: "target_outcome", label: "Target Outcome", placeholder: "e.g. By the end of the session the student should be able to solve any quadratic equation using two methods...", minWords: 20, required: true },
      { key: "mastery_indicators", label: "Mastery Indicators", placeholder: "e.g. The student can explain their reasoning aloud and identify which method is most efficient...", minWords: 20, required: true },
    ],
  },
  "teaching-approach": {
    id: "teaching-approach",
    label: "Teaching Approach",
    required: true,
    fields: [
      { key: "pedagogy", label: "Pedagogical Strategy", placeholder: "e.g. Use scaffolded instruction — begin with a fully-worked example, then partially-worked with hints...", minWords: 20, required: true },
      { key: "feedback_style", label: "Feedback Style", placeholder: "e.g. Never reveal the error outright; ask guiding questions that lead the student to discover it themselves...", minWords: 20, required: true },
    ],
  },
  "assessment-style": {
    id: "assessment-style",
    label: "Assessment Style",
    required: false,
    fields: [
      { key: "check_understanding", label: "Comprehension Checks", placeholder: "e.g. Pose a low-stakes practice problem every five minutes using open-ended questions...", minWords: 20, required: false },
    ],
  },
  "pacing-instructions": {
    id: "pacing-instructions",
    label: "Pacing Instructions",
    required: false,
    fields: [
      { key: "pacing", label: "Pacing Guidelines", placeholder: "e.g. Slow down when introducing a new concept and never advance before confirming mastery...", minWords: 20, required: false },
    ],
  },
};

export const SECTION_ORDER = {
  "conversational-assistant": ["persona", "context", "objective", "constraints", "examples", "tone-guidance", "fallback-behavior"],
  "study-tutor": ["subject", "learner-profile", "learning-objective", "teaching-approach", "assessment-style", "examples", "pacing-instructions"],
  "code-generator": [],
  "resume-reviewer": [],
};
