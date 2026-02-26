import React, { useState } from 'react';
import type { Resume } from '../types';

const SECTIONS = [
  { id: 'summary', label: 'Summary', icon: '📝' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'languages', label: 'Languages', icon: '🌐' },
  { id: 'achievements', label: 'Achievements', icon: '✦' },
  { id: 'certifications', label: 'Certifications', icon: '📜' },
  { id: 'interests', label: 'Interests', icon: '♦' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
];

const DEFAULT_LAYOUT = {
  main: ['summary', 'experience', 'education'],
  sidebar: ['skills', 'languages', 'achievements', 'certifications', 'interests', 'projects']
};

interface SectionLayoutManagerProps {
  layout?: Resume['layout'];
  onLayoutChange: (layout: Resume['layout']) => void;
}

export default function SectionLayoutManager({ layout: propLayout, onLayoutChange }: SectionLayoutManagerProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverZone, setDragOverZone] = useState<'main' | 'sidebar' | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const layout = propLayout || DEFAULT_LAYOUT;

  const moveSection = (fromZone: 'main' | 'sidebar', toZone: 'main' | 'sidebar', index: number) => {
    const fromList = [...layout[fromZone]];
    const toList = [...layout[toZone]];
    const [moved] = fromList.splice(index, 1);
    toList.push(moved);
    onLayoutChange({
      main: fromZone === 'main' ? fromList : layout.main,
      sidebar: fromZone === 'sidebar' ? toList : layout.sidebar,
    });
  };

  const moveWithinZone = (zone: 'main' | 'sidebar', fromIndex: number, toIndex: number) => {
    const list = [...layout[zone]];
    const [moved] = list.splice(fromIndex, 1);
    list.splice(toIndex, 0, moved);
    onLayoutChange({
      main: zone === 'main' ? list : layout.main,
      sidebar: zone === 'sidebar' ? list : layout.sidebar,
    } as Resume['layout']);
  };

  const handleDragStart = (e: React.DragEvent, sectionId: string) => {
    setDraggedId(sectionId);
    e.dataTransfer.effectAllowed = 'move';
    if (e.dataTransfer.setDragImage) {
      const img = new Image();
      e.dataTransfer.setDragImage(img, 0, 0);
    }
  };

  const handleDragOver = (e: React.DragEvent, zone: 'main' | 'sidebar', index?: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverZone(zone);
    if (index !== undefined) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverZone(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetZone: 'main' | 'sidebar') => {
    e.preventDefault();
    setDragOverZone(null);
    setDragOverIndex(null);
    if (!draggedId) return;

    const fromZone = layout.main.includes(draggedId) ? 'main' : 'sidebar';
    const index = layout[fromZone].indexOf(draggedId);

    if (fromZone !== targetZone) {
      moveSection(fromZone, targetZone, index);
    }
    setDraggedId(null);
  };

  const renderSection = (sectionId: string, index: number, zone: 'main' | 'sidebar') => {
    const section = SECTIONS.find(s => s.id === sectionId);
    if (!section) return null;
    const isDragging = draggedId === sectionId;
    
    return (
      <div
        key={sectionId}
        draggable
        onDragStart={(e) => handleDragStart(e, sectionId)}
        onDragOver={(e) => handleDragOver(e, zone, index)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, zone)}
        className={`
          group flex items-center gap-3 px-4 py-3 mb-2 rounded-lg cursor-move transition-all relative
          ${isDragging ? 'opacity-40 scale-95 bg-slate-800/30' : ''}
          ${dragOverZone === zone && dragOverIndex === index ? 'ring-2 ring-amber-400 ring-inset bg-amber-500/10' : ''}
          ${dragOverZone === zone && dragOverIndex !== index && !isDragging ? 'bg-gradient-to-r from-slate-800/50 to-slate-900/50' : 'bg-slate-800/60'}
          border-l-4 border-blue-600/50 hover:border-blue-500 hover:bg-slate-800/80 shadow-sm
        `}
      >
        {/* Position Badge */}
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center font-bold text-white text-xs shadow-md">
          {index + 1}
        </div>
        
        <span className="text-lg flex-shrink-0">{section.icon}</span>
        <span className="text-lg flex-shrink-0">{section.icon}</span>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-slate-100 block truncate">{section.label}</span>
          <span className="text-xs text-slate-400 block">{zone === 'main' ? 'Main Column' : 'Right Sidebar'}</span>
        </div>
        <div className="ml-auto flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => moveWithinZone(zone, index, Math.max(0, index - 1))}
            disabled={index === 0}
            className="p-1.5 rounded bg-slate-700/60 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white transition-all"
            title="Move up"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>
          </button>
          <button
            onClick={() => moveWithinZone(zone, index, Math.min((zone === 'main' ? layout.main : layout.sidebar).length - 1, index + 1))}
            disabled={index === (zone === 'main' ? layout.main.length - 1 : layout.sidebar.length - 1)}
            className="p-1.5 rounded bg-slate-700/60 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white transition-all"
            title="Move down"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Main Column */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">📄 Main Column</h3>
            <p className="text-xs text-slate-400 mt-1">Left section of resume</p>
          </div>
          <span className="px-2 py-1 bg-blue-900/40 text-blue-300 text-xs font-semibold rounded border border-blue-800/50">
            {layout.main.length} sections
          </span>
        </div>
        <div
          className={`
            space-y-1 min-h-[120px] p-4 rounded-lg border-2 transition-all
            ${dragOverZone === 'main' ? 'border-amber-400 bg-amber-500/5 ring-2 ring-amber-400 ring-inset' : 'border-dashed border-slate-600 bg-slate-900/30'}
          `}
          onDragOver={(e) => handleDragOver(e, 'main')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'main')}
        >
          {layout.main.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-6 italic">
              ↓ Drop sections here to add them to main column
            </p>
          )}
          {layout.main.map((sectionId, idx) => renderSection(sectionId, idx, 'main'))}
        </div>
      </div>

      {/* Sidebar Column */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">📌 Right Sidebar</h3>
            <p className="text-xs text-slate-400 mt-1">Right section of resume</p>
          </div>
          <span className="px-2 py-1 bg-emerald-900/40 text-emerald-300 text-xs font-semibold rounded border border-emerald-800/50">
            {layout.sidebar.length} sections
          </span>
        </div>
        <div
          className={`
            space-y-1 min-h-[120px] p-4 rounded-lg border-2 transition-all
            ${dragOverZone === 'sidebar' ? 'border-amber-400 bg-amber-500/5 ring-2 ring-amber-400 ring-inset' : 'border-dashed border-slate-600 bg-slate-900/30'}
          `}
          onDragOver={(e) => handleDragOver(e, 'sidebar')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'sidebar')}
        >
          {layout.sidebar.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-6 italic">
              ↓ Drop sections here to add them to right sidebar
            </p>
          )}
          {layout.sidebar.map((sectionId, idx) => renderSection(sectionId, idx, 'sidebar'))}
        </div>
      </div>

      {/* Help Section */}
      <div className="border-t border-slate-700 pt-4 mt-6">
        <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-4 space-y-3">
          <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <span>ℹ️</span> How to Rearrange Sections
          </h4>
          <ul className="text-xs text-slate-400 space-y-2">
            <li className="flex gap-2">
              <span className="text-blue-400">🖱️</span>
              <span><strong className="text-slate-300">Drag & Drop:</strong> Drag any section between columns</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">↕️</span>
              <span><strong className="text-slate-300">Reorder:</strong> Use arrow buttons to move sections up/down</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">🔢</span>
              <span><strong className="text-slate-300">Position:</strong> Numbers show order (1st, 2nd, etc.)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
