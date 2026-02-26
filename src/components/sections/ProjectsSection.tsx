import type { Project } from '../../types';
import { v4 as uuid } from 'uuid';

interface Props {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export default function ProjectsSection({ data, onChange }: Props) {
  const addProject = () => {
    onChange([
      ...data,
      { id: uuid(), name: '', technologies: '', description: '', link: '' },
    ]);
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange(data.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)));
  };

  const removeProject = (id: string) => {
    onChange(data.filter((proj) => proj.id !== id));
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
        <h2 className="text-lg font-semibold text-blue-400">Projects</h2>
        <button onClick={addProject} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors">+ Add</button>
      </div>
      <div className="space-y-4">
        {data.map((proj, index) => (
          <div key={proj.id} className="bg-slate-700 rounded p-3">
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-1">
                <button onClick={() => moveUp(index)} disabled={index === 0} className="w-7 h-7 bg-slate-600 hover:bg-slate-500 disabled:opacity-30 rounded text-xs transition-colors">↑</button>
                <button onClick={() => moveDown(index)} disabled={index === data.length - 1} className="w-7 h-7 bg-slate-600 hover:bg-slate-500 disabled:opacity-30 rounded text-xs transition-colors">↓</button>
              </div>
              <button onClick={() => removeProject(proj.id)} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input placeholder="Project Name" value={proj.name} onChange={(e) => updateProject(proj.id, 'name', e.target.value)} className="px-3 py-2 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input placeholder="Technologies Used" value={proj.technologies} onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)} className="px-3 py-2 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input placeholder="Link (optional)" value={proj.link} onChange={(e) => updateProject(proj.id, 'link', e.target.value)} className="px-3 py-2 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <textarea placeholder="Description" value={proj.description} onChange={(e) => updateProject(proj.id, 'description', e.target.value)} rows={2} className="px-3 py-2 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}