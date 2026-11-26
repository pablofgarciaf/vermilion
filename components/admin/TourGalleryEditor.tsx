'use client';

import type { Dispatch, SetStateAction } from 'react';
import { Loader2, Plus, Trash2, Upload } from 'lucide-react';
import type { Tour } from '@/types';

type TourGalleryEditorProps = {
  formData: Partial<Tour>;
  setFormData: Dispatch<SetStateAction<Partial<Tour>>>;
  isDragging: boolean;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  uploadProgress: number | null;
  onUpload: (files: FileList | File[]) => void;
  onRemove: (index: number) => void;
};

export function TourGalleryEditor({
  formData,
  setFormData,
  isDragging,
  setIsDragging,
  uploadProgress,
  onUpload,
  onRemove,
}: TourGalleryEditorProps) {
  const gallery = formData.gallery || [];

  return (
    <section className="space-y-3 glass-input/70 p-6 rounded-2xl border border-zinc-800">
      <div className="flex items-center justify-between">
        <label className="text-zinc-700 dark:text-zinc-300 font-semibold uppercase tracking-wider flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>Tour Gallery Photos</span>
        </label>
        <span className="text-[10px] text-zinc-500">{gallery.length} photos added</span>
      </div>

      <div className="flex items-center justify-between gap-2 pb-2">
        <span className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold">
          Upload file or add URL:
        </span>
        <button
          type="button"
          onClick={() => setFormData((previous) => ({ ...previous, gallery: [...(previous.gallery || []), ''] }))}
          className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/30 text-emerald-400 hover:text-zinc-900 dark:text-white rounded-lg text-xs font-semibold transition-all"
        >
          + Add Image URL
        </button>
      </div>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          if (event.dataTransfer.files.length > 0) onUpload(event.dataTransfer.files);
        }}
        className={`border-2 border-dashed rounded-xl p-3 text-center transition-colors relative cursor-pointer ${
          isDragging ? 'border-emerald-500 bg-emerald-950/30' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
        }`}
      >
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={(event) => {
            if (event.target.files?.length) onUpload(event.target.files);
          }}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
        <div className="flex items-center justify-center gap-2 text-zinc-600 dark:text-zinc-400">
          {uploadProgress !== null ? (
            <div className="flex items-center gap-2 text-emerald-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="font-semibold">Uploading to Gallery {uploadProgress}%</span>
            </div>
          ) : (
            <>
              <Upload className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs">Upload gallery image to Firebase Storage (Drag & Drop or Click)</span>
            </>
          )}
        </div>
      </div>

      {gallery.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          {gallery.map((imageUrl, index) => {
            const isFeatured = index === 0;
            return (
              <div
                key={`${imageUrl}-${index}`}
                className={`relative group rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 ${
                  isFeatured ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
                }`}
              >
                <img src={imageUrl} alt={`Gallery ${index + 1}`} width={300} height={200} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-end p-2 backdrop-blur-sm pointer-events-none">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onRemove(index);
                    }}
                    className="p-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl shadow-lg transform scale-90 group-hover:scale-100 transition-all pointer-events-auto relative z-50 cursor-pointer"
                    title="Remove image"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
