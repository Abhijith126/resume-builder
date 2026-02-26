import type { Interest } from '../../types';
import { v4 as uuid } from 'uuid';

interface Props {
  data: Interest[];
  onChange: (data: Interest[]) => void;
}

export default function InterestsSection({ data, onChange }: Props) {
  const addInterest = () => {
    onChange([...data, { id: uuid(), title: '' }]);
  };

  const updateInterest = (id: string, value: string) => {
    onChange(data.map((int) => (int.id === id ? { ...int, title: value } : int)));
  };

  const removeInterest = (id: string) => {
    onChange(data.filter((int) => int.id !== id));
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-blue-400">Interests</h2>
        <button onClick={addInterest} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors">+ Add</button>
      </div>
      <div className="space-y-2">
        {data.map((interest) => (
          <div key={interest.id} className="flex gap-2">
            <input
              placeholder="Interest (e.g., Machine Learning, Photography)"
              value={interest.title}
              onChange={(e) => updateInterest(interest.id, e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={() => removeInterest(interest.id)} className="text-red-400 hover:text-red-300 text-sm px-3 py-1">×</button>
          </div>
        ))}
      </div>
    </div>
  );
}
