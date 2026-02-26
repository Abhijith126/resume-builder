import type { Language } from '../../types';
import { v4 as uuid } from 'uuid';

interface Props {
  data: Language[];
  onChange: (data: Language[]) => void;
}

const proficiencyLevels: Array<'beginner' | 'intermediate' | 'advanced' | 'fluent'> = ['beginner', 'intermediate', 'advanced', 'fluent'];

export default function LanguagesSection({ data, onChange }: Props) {
  const addLanguage = () => {
    onChange([
      ...data,
      { id: uuid(), name: '', proficiency: 'intermediate' },
    ]);
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    onChange(data.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)));
  };

  const removeLanguage = (id: string) => {
    onChange(data.filter((lang) => lang.id !== id));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newData = [...data];
    [newData[index - 1], newData[index]] = [newData[index], newData[index - 1]];
    onChange(newData);
  };

  const moveDown = (index: number) => {
    if (index === data.length - 1) return;
    const newData = [...data];
    [newData[index], newData[index + 1]] = [newData[index + 1], newData[index]];
    onChange(newData);
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-blue-400">Languages</h2>
        <button onClick={addLanguage} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors">+ Add</button>
      </div>
      <div className="space-y-3">
        {data.map((lang, index) => (
          <div key={lang.id} className="bg-slate-700 rounded p-3">
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-2">
                <button onClick={() => moveUp(index)} disabled={index === 0} className="w-7 h-7 bg-slate-600 hover:bg-slate-500 disabled:opacity-30 rounded text-xs transition-colors">↑</button>
                <button onClick={() => moveDown(index)} disabled={index === data.length - 1} className="w-7 h-7 bg-slate-600 hover:bg-slate-500 disabled:opacity-30 rounded text-xs transition-colors">↓</button>
              </div>
              <button onClick={() => removeLanguage(lang.id)} className="text-red-400 hover:text-red-300 text-sm ml-2">Remove</button>
            </div>
            <input
              placeholder="Language name"
              value={lang.name}
              onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
              className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mb-2"
            />
            <select
              value={lang.proficiency}
              onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
              className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-200"
            >
              {proficiencyLevels.map((level) => (
                <option key={level} value={level} className="capitalize">
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
