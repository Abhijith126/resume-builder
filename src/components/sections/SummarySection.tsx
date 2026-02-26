interface Props {
  data: string;
  onChange: (data: string) => void;
}

export default function SummarySection({ data, onChange }: Props) {
  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3 text-blue-400">Professional Summary</h2>
      <textarea
        placeholder="Write a brief summary of your professional background and goals..."
        value={data}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
      <p className="text-xs text-slate-400 mt-1">{data.length} characters</p>
    </div>
  );
}
