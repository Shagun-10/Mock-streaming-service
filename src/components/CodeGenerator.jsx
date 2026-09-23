import { useState } from "react";

export default function CodeGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const generateCode = () => {
    setOutput(`// Generated code based on: ${input}`);
  };

  return (
    <div>
      <h2>Code Generator</h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter prompt..."
      />

      <button onClick={generateCode}>Generate</button>

      <pre>{output}</pre>
    </div>
  );
}