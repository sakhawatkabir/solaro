"use client";

import { useState, useCallback } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing/client";

export default function ProductImages({ value = [], onChange }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { startUpload, isUploading } = useUploadThing("productGallery", {
    onClientUploadComplete: (res) => {
      const urls = res.map((f) => f.url);
      const newImages = [...value, ...urls];
      onChange(newImages);
      setUploading(false);
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      setUploading(false);
    },
  });

  const handleFiles = useCallback(
    (files) => {
      if (!files || files.length === 0) return;
      setUploading(true);
      startUpload(Array.from(files));
    },
    [startUpload],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleRemove = (index) => {
    onChange(value.filter((_, idx) => idx !== index));
  };

  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Product Images</h3>

      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {value.map((url, i) => (
            <div
              key={i}
              onClick={() => {
                const reordered = [url, ...value.filter((_, idx) => idx !== i)];
                onChange(reordered);
              }}
              className={`
                relative group rounded-lg overflow-hidden border-2 aspect-square cursor-pointer
                ${i === 0 ? "border-emerald-500" : "border-zinc-700 hover:border-zinc-500"}
              `}
            >
              <img
                src={url}
                alt={`Product ${i + 1}`}
                className="w-full h-full object-cover"
              />
              {i === 0 && (
                <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-emerald-500 text-white text-[10px] font-medium rounded">
                  Main
                </span>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(i);
                }}
                className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-colors duration-200
          ${
            isDragging
              ? "border-emerald-500 bg-emerald-500/5"
              : "border-zinc-700 hover:border-zinc-600"
          }
        `}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading || isUploading}
        />

        {uploading || isUploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            <p className="text-sm text-zinc-400">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
              <Upload className="w-5 h-5 text-zinc-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-300">
                <span className="text-emerald-400 font-medium">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                PNG, JPG, WEBP up to 4MB (max 10 images)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
