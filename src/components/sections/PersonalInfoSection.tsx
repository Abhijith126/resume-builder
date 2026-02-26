import { useState, useRef } from 'react';
import type { PersonalInfo } from '../../types';

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

interface CropBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function PersonalInfoSection({ data, onChange }: Props) {
  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImage, setTempImage] = useState<string>('');
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [cropBox, setCropBox] = useState<CropBox>({ x: 0, y: 0, width: 0, height: 0 });
  const [dragging, setDragging] = useState<'move' | 'resize' | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleChange = (field: keyof PersonalInfo) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({ ...data, [field]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
        // Reset file input so same file can be selected again
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
    
    // Initialize crop box to 400x400 centered
    const minDim = Math.min(img.naturalWidth, img.naturalHeight);
    const size = Math.min(400, minDim);
    const x = (img.naturalWidth - size) / 2;
    const y = (img.naturalHeight - size) / 2;
    setCropBox({ x, y, width: size, height: size });
  };

  const handleMouseDown = (e: React.MouseEvent, action: 'move' | 'resize') => {
    e.preventDefault();
    setDragging(action);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !containerRef.current || !imageRef.current) return;

    const imgRect = imageRef.current.getBoundingClientRect();
    const scale = imageRef.current.naturalWidth / imgRect.width;

    const deltaX = (e.clientX - dragStart.x) * scale;
    const deltaY = (e.clientY - dragStart.y) * scale;

    if (dragging === 'move') {
      // Move the crop box
      let newX = cropBox.x + deltaX;
      let newY = cropBox.y + deltaY;

      newX = Math.max(0, Math.min(newX, imageSize.width - cropBox.width));
      newY = Math.max(0, Math.min(newY, imageSize.height - cropBox.height));

      setCropBox({ ...cropBox, x: newX, y: newY });
    } else if (dragging === 'resize') {
      // Resize the crop box from bottom-right - maintain square aspect ratio
      const delta = Math.max(deltaX, deltaY); // Use the larger delta to maintain square
      let newWidth = cropBox.width + delta;
      let newHeight = cropBox.width + delta; // Always equal to width for square

      const minSize = 100;
      const maxWidth = imageSize.width - cropBox.x;
      const maxHeight = imageSize.height - cropBox.y;
      const maxSize = Math.min(maxWidth, maxHeight);

      newWidth = Math.max(minSize, Math.min(newWidth, maxSize));
      newHeight = newWidth; // Keep it square

      setCropBox({ ...cropBox, width: newWidth, height: newHeight });
    }

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const cropImage = () => {
    if (!imageRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const outputSize = 400;
    canvas.width = outputSize;
    canvas.height = outputSize;

    const img = new Image();
    img.onload = () => {
      ctx?.drawImage(
        img,
        cropBox.x, cropBox.y, cropBox.width, cropBox.height,
        0, 0, outputSize, outputSize
      );
      const cropped = canvas.toDataURL();
      onChange({ ...data, photo: cropped });
      setShowCropModal(false);
      setTempImage('');
    };
    img.src = tempImage;
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3 text-blue-400">Personal Information</h2>
      
      {/* Photo Upload */}
      <div className="mb-4">
        <div className="flex items-center gap-4">
          {data.photo ? (
            <img 
              src={data.photo} 
              alt={data.name}
              className={`w-20 h-20 object-cover border-2 border-blue-400 ${
                data.photoShape === 'square' ? '' : 'rounded-full'
              }`}
            />
          ) : (
            <div className={`w-20 h-20 bg-slate-700 border-2 border-slate-600 flex items-center justify-center ${
              data.photoShape === 'square' ? '' : 'rounded-full'
            }`}>
              <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-300"
            />
            {data.photo && (
              <button
                onClick={() => onChange({ ...data, photo: undefined })}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-xs text-white font-semibold"
              >
                Remove
              </button>
            )}
          </div>
        </div>
        
        {/* Photo Shape Selector */}
        <div className="mt-3">
          <label className="block text-sm text-slate-300 mb-2">Photo Shape</label>
          <select
            value={data.photoShape || 'circle'}
            onChange={(e) => onChange({ ...data, photoShape: (e.target.value as 'square' | 'circle') })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-300"
          >
            <option value="circle">Circle</option>
            <option value="square">Square</option>
          </select>
        </div>
      </div>

      {/* Crop Modal */}
      {showCropModal && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Crop Photo</h3>
            <p className="text-sm text-slate-300 mb-4">Drag to move the selection • Drag bottom-right corner to resize</p>
            
            {/* Image Container */}
            <div 
              ref={containerRef}
              className="relative bg-slate-900 rounded-lg overflow-hidden border-2 border-slate-600 mb-4"
              style={{ maxHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {/* Image */}
              <img
                ref={imageRef}
                src={tempImage}
                alt="Crop"
                onLoad={handleImageLoad}
                className="max-w-full max-h-full object-contain"
                style={{
                  cursor: dragging === 'move' ? 'grabbing' : 'grab',
                  userSelect: 'none',
                }}
              />

              {/* Crop Selection Box - Only show after image loads */}
              {imageSize.width > 0 && imageRef.current && (
                <div
                  className="absolute border-2 border-dashed border-cyan-400 bg-cyan-400/10"
                  style={{
                    left: `${(cropBox.x / imageSize.width) * 100}%`,
                    top: `${(cropBox.y / imageSize.height) * 100}%`,
                    width: `${(cropBox.width / imageSize.width) * 100}%`,
                    height: `${(cropBox.height / imageSize.height) * 100}%`,
                    cursor: dragging === 'move' ? 'grabbing' : 'grab',
                  }}
                  onMouseDown={(e) => handleMouseDown(e, 'move')}
                >
                  {/* Resize Handle - Bottom Right */}
                  <div
                    className="absolute w-4 h-4 bg-cyan-400 border border-white rounded-full"
                    style={{
                      bottom: '-8px',
                      right: '-8px',
                      cursor: 'nwse-resize',
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e, 'resize');
                    }}
                  />

                  {/* Corner indicators */}
                  <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
                  <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
                  <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
                  <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowCropModal(false);
                  setTempImage('');
                }}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-white font-medium"
              >
                Cancel
              </button>
              <button
                onClick={cropImage}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium"
              >
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <input
          placeholder="Full Name"
          value={data.name}
          onChange={handleChange('name')}
          className="col-span-2 px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange('email')}
          className="px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Phone"
          value={data.phone}
          onChange={handleChange('phone')}
          className="px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Location (City, Country)"
          value={data.location}
          onChange={handleChange('location')}
          className="px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Website"
          value={data.website}
          onChange={handleChange('website')}
          className="px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="LinkedIn URL"
          value={data.linkedin}
          onChange={handleChange('linkedin')}
          className="col-span-2 px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
