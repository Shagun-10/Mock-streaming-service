import { useState } from "react";
import ResumeReviewer from "./components/ResumeReviewer";
import ConfigurationView from "./components/ConfigurationView";
import ValidationView from "./components/ValidationView";

export default function App() {
  const [sections, setSections] = useState({});
   const [config, setConfig] = useState({});  

  const templateId = "home";
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100">
      <h1 className="text-center pt-20 text-2xl font-bold text-amber-400">
        AI Prompt Engineering Studio
      </h1>

      <ResumeReviewer />
      <ConfigurationView config={config} setConfig={setConfig} />
      <ValidationView
        templateId={templateId}
        sections={sections}
        config={config}
      />

    </div>
  );
}
