import type { TemplateType, FontType } from '../types';

interface Props {
  template: TemplateType;
  onTemplateChange: (value: TemplateType) => void;
  font: FontType;
  onFontChange: (value: FontType) => void;
}

export default function TemplateSelector({ template, onTemplateChange, font, onFontChange }: Props) {
  const templates: { id: TemplateType; label: string }[] = [
    { id: 'editorial', label: '✨ Editorial' },
    { id: 'modern-minimalist', label: '⬛ Modern Minimalist' },
    { id: 'arctic-frost', label: '❄️ Arctic Frost' },
    { id: 'desert-rose', label: '🌹 Desert Rose' },
    { id: 'premium', label: '✨ Premium' },
    { id: 'modern', label: 'Modern' },
    { id: 'classic', label: 'Classic' },
    { id: 'minimal', label: 'Minimal' },
  ];

  const fonts: { id: FontType; label: string }[] = [
    { id: 'helvetica', label: 'Helvetica Neue' },
    { id: 'georgia', label: 'Georgia' },
    { id: 'arial', label: 'Arial' },
    { id: 'calibri', label: 'Calibri' },
    { id: 'cambria', label: 'Cambria' },
    { id: 'inter', label: 'Inter' },
    { id: 'playfair', label: 'Playfair Display' },
    { id: 'poppins', label: 'Poppins' },
    { id: 'roboto', label: 'Roboto' },
    { id: 'lora', label: 'Lora' },
    { id: 'garamond', label: 'EB Garamond' },
    { id: 'sourcesans', label: 'Source Sans Pro' },
    { id: 'merriweather', label: 'Merriweather' },
  ];

  return (
    <div className="flex gap-2">
      <select
        value={template}
        onChange={(e) => onTemplateChange(e.target.value as TemplateType)}
        className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {templates.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>
      
      <select
        value={font}
        onChange={(e) => onFontChange(e.target.value as FontType)}
        className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {fonts.map((f) => (
          <option key={f.id} value={f.id}>
            {f.label}
          </option>
        ))}
      </select>
    </div>
  );
}
