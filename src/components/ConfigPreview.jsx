export default function ConfigPreview({ config }) {
  return (
    <div className="p-6 max-w-3xl mx-auto mt-4 bg-gray-50 border rounded">
      <h2 className="text-xl font-bold text-black mb-3">
        Current Configuration
      </h2>

      <pre className="text-black text-sm whitespace-pre-wrap">
        {JSON.stringify(config, null, 2)}
      </pre>
    </div>
  );
}