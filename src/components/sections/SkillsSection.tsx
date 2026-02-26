interface Props {
  data: string[];
  onChange: (data: string[]) => void;
}

export default function SkillsSection({ data, onChange }: Props) {
  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      const input = e.currentTarget.value.trim();
      // Split by comma if present, otherwise add as single skill
      const newSkills = input.includes(',')
        ? input.split(',').map(s => s.trim()).filter(s => s.length > 0)
        : [input];
      onChange([...data, ...newSkills]);
      e.currentTarget.value = '';
    }
  };

  const removeSkill = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3 text-blue-400">Skills</h2>
      <input
        placeholder="Type skills separated by commas (e.g. NET, C#, C++) and press Enter..."
        onKeyDown={addSkill}
        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
      />
      <div className="flex flex-wrap gap-2">
        {data.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-blue-600 rounded-full text-sm flex items-center gap-2"
          >
            {skill}
            <button
              onClick={() => removeSkill(i)}
              className="hover:text-red-300 transition-colors"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      {data.length === 0 && (
        <p className="text-slate-400 text-sm">No skills added yet</p>
      )}
    </div>
  );
}
