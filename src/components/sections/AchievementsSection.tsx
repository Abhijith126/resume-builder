import type { Achievement } from '../../types';
import { v4 as uuid } from 'uuid';

interface Props {
  data: Achievement[];
  onChange: (data: Achievement[]) => void;
}

export default function AchievementsSection({ data, onChange }: Props) {
  const addAchievement = () => {
    onChange([
      ...data,
      { id: uuid(), title: '', description: '' },
    ]);
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: string) => {
    onChange(data.map((ach) => (ach.id === id ? { ...ach, [field]: value } : ach)));
  };

  const removeAchievement = (id: string) => {
    onChange(data.filter((ach) => ach.id !== id));
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
        <h2 className="text-lg font-semibold text-blue-400">Key Achievements</h2>
        <button onClick={addAchievement} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors">+ Add</button>
      </div>
      <div className="space-y-4">
        {data.map((ach, index) => (
          <div key={ach.id} className="bg-slate-700 rounded p-3">
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-2">
                <button onClick={() => moveUp(index)} disabled={index === 0} className="w-7 h-7 bg-slate-600 hover:bg-slate-500 disabled:opacity-30 rounded text-xs transition-colors">↑</button>
                <button onClick={() => moveDown(index)} disabled={index === data.length - 1} className="w-7 h-7 bg-slate-600 hover:bg-slate-500 disabled:opacity-30 rounded text-xs transition-colors">↓</button>
              </div>
              <button onClick={() => removeAchievement(ach.id)} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
            </div>
            <input
              placeholder="Achievement Title"
              value={ach.title}
              onChange={(e) => updateAchievement(ach.id, 'title', e.target.value)}
              className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <textarea
              placeholder="Describe the achievement and its impact..."
              value={ach.description}
              onChange={(e) => updateAchievement(ach.id, 'description', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
