import type { Certification } from '../../types';
import { v4 as uuid } from 'uuid';

interface Props {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export default function CertificationsSection({ data, onChange }: Props) {
  const addCertification = () => {
    onChange([
      ...data,
      { id: uuid(), title: '', issuer: '', date: '' },
    ]);
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onChange(data.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)));
  };

  const removeCertification = (id: string) => {
    onChange(data.filter((cert) => cert.id !== id));
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
        <h2 className="text-lg font-semibold text-blue-400">Certifications / Courses</h2>
        <button onClick={addCertification} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors">+ Add</button>
      </div>
      <div className="space-y-4">
        {data.map((cert, index) => (
          <div key={cert.id} className="bg-slate-700 rounded p-3">
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-2">
                <button onClick={() => moveUp(index)} disabled={index === 0} className="w-7 h-7 bg-slate-600 hover:bg-slate-500 disabled:opacity-30 rounded text-xs transition-colors">↑</button>
                <button onClick={() => moveDown(index)} disabled={index === data.length - 1} className="w-7 h-7 bg-slate-600 hover:bg-slate-500 disabled:opacity-30 rounded text-xs transition-colors">↓</button>
              </div>
              <button onClick={() => removeCertification(cert.id)} className="text-red-400 hover:text-red-300 text-sm px-3 py-1">Remove</button>
            </div>
            <input
              placeholder="Certification Title"
              value={cert.title}
              onChange={(e) => updateCertification(cert.id, 'title', e.target.value)}
              className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <input
              placeholder="Issuing Organization"
              value={cert.issuer}
              onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
              className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <div className="flex gap-2">
              <input
                placeholder="Date (e.g., Jan 2024)"
                value={cert.date}
                onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-600 border border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
