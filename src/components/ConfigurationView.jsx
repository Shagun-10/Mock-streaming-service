import { useState } from "react";

export default function ConfigurationView({ config, setConfig }) {
  function update(key, value) {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white border rounded">
      <h1 className="text-2xl font-bold text-black mb-6">
        Configuration Settings
      </h1>

      <div className="mb-5">
        <label className="block text-black font-medium mb-1">
          Tone
        </label>
        <select
          className="w-full border p-2 rounded text-black bg-white"
          value={config.tone || "neutral"}
          onChange={(e) => update("tone", e.target.value)}
        >
          <option value="neutral">Neutral</option>
          <option value="formal">Formal</option>
          <option value="casual">Casual</option>
        </select>
      </div>

      <div className="mb-5">
        <label className="block text-black font-medium mb-1">
          Verbosity
        </label>
        <select
          className="w-full border p-2 rounded text-black bg-white"
          value={config.verbosity || "balanced"}
          onChange={(e) => update("verbosity", e.target.value)}
        >
          <option value="concise">Concise</option>
          <option value="balanced">Balanced</option>
          <option value="detailed">Detailed</option>
        </select>
      </div>

      <div className="mb-5">
        <label className="block text-black font-medium mb-1">
          Output Format
        </label>
        <select
          className="w-full border p-2 rounded text-black bg-white"
          value={config.outputFormat || "structured"}
          onChange={(e) => update("outputFormat", e.target.value)}
        >
          <option value="structured">Structured</option>
          <option value="bullet">Bullet Points</option>
          <option value="paragraph">Paragraph</option>
        </select>
      </div>

      <div className="mb-5">
        <label className="block text-black font-medium mb-1">
          Strictness Level
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={config.strictness || 3}
          onChange={(e) => update("strictness", e.target.value)}
          className="w-full"
        />
        <p className="text-sm text-gray-600 mt-1">
          Level: {config.strictness || 3}
        </p>
      </div>
    </div>
  );
}