"use client";

import { useState } from "react";

export function AvatarPicker({
  label = "Foto de perfil (opcional)",
  initialLetter,
  initialImageUrl,
}: {
  label?: string;
  initialLetter?: string;
  initialImageUrl?: string;
}) {
  const [preview, setPreview] = useState<string | undefined>(initialImageUrl);

  return (
    <div className="flex items-center gap-4">
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Pré-visualização da foto"
          className="h-16 w-16 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-200 text-xl font-semibold text-zinc-500 dark:bg-zinc-800">
          {initialLetter?.charAt(0).toUpperCase() || "?"}
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="avatar" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
        <input
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
          className="text-sm text-zinc-600 dark:text-zinc-400"
        />
      </div>
    </div>
  );
}
