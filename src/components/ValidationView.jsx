import { useMemo } from "react";
import { runValidation } from "../data/validationRules";

export default function ValidationView({ templateId, sections, config }) {
  const issues = useMemo(() => {
    return runValidation(templateId, sections, config);
  }, [templateId, sections, config]);

  const errors = issues.filter((i) => i.type === "error");
  const warnings = issues.filter((i) => i.type === "warning");
  const suggestions = issues.filter((i) => i.type === "suggestion");

  function Section({ title, items, color }) {
    return (
      <div className="mb-5">
        <h2 className="text-black font-bold mb-2 border-b pb-1">
          {title}
        </h2>

        {items.length === 0 ? (
          <p className="text-gray-500">No issues</p>
        ) : (
          <ul className="list-disc ml-5 space-y-1">
            {items.map((item, idx) => (
              <li key={idx} className={color + " text-black"}>
                {item.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white border rounded">
      <h1 className="text-2xl font-bold text-black mb-6">
        Validation Report
      </h1>

      <Section title=" Errors" items={errors} color="text-red-600" />
      <Section title=" Warnings" items={warnings} color="text-yellow-600" />
      <Section title=" Suggestions" items={suggestions} color="text-blue-600" />
    </div>
  );
}