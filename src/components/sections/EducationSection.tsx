import type { Education } from '../../types';
import { v4 as uuid } from 'uuid';

interface Props {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export default function EducationSection({ data, onChange }: Props) {
  const addEducation = () => {
    onChange([
      ...data,
      {
        id: uuid(),
        degree: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        gpa: '',
      },
    ]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)));
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
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
        <h2 className="text-lg font-semibold text-blue-400">Education</h2>
        <button onClick={addEducation} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors">+ Add</button>
      </div>
      <div className="space-y-4">
        {data.map((edu, index) => (
          <div key={edu.id} className="bg-slate-700 rounded p-3">
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-1">
                <button onClick={() => moveUp(index)} disabled={index === 0} className="w-7 h-7 bg-slate-600 hover:bg-slate-500 disabled:opacity-30 rounded text-xs transition-colors">↑</button>
                <button onClick={() => moveDown(index)} disabled={index === data.length - 1} className="w-7 h-7 bg-slate-600 hover:bg-slate-500 disabled:opacity-30 rounded text-xs transition-colors">↓</button>
              </div>
              <button onClick={() => removeEducation(edu.id)} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input placeholder="Degree / Certificate" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className="px-3 py-2 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} className="px-3 py-2 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input placeholder="Location" value={edu.location} onChange={(e) => updateEducation(edu.id, 'location', e.target.value)} className="px-3 py-2 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input placeholder="GPA (optional)" value={edu.gpa} onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)} className="px-3 py-2 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input placeholder="Start Year" value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} className="px-3 py-2 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input placeholder="End Year" value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} className="px-3 py-2 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}