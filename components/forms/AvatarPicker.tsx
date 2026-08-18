"use client";

import { useState } from "react";

export function AvatarPicker({
  label = "Adicionar foto de perfil",
  initialLetter,
  initialImageUrl,
}: {
  label?: string;
  initialLetter?: string;
  initialImageUrl?: string;
}) {
  const [preview, setPreview] = useState<string | undefined>(initialImageUrl);

  return (
    <div className="flex flex-col items-center gap-2 py-2">
      <label
        htmlFor="avatar"
        className="group relative flex h-28 w-28 cursor-pointer items-center justify-center rounded-full bg-zinc-100 shadow-sm ring-2 ring-teal-600/20 transition-all duration-150 hover:ring-teal-600/50 active:scale-[0.97] dark:bg-zinc-800"
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Pré-visualização da foto"
            className="h-full w-full rounded-full object-cover"
          />
        ) : initialLetter ? (
          <span className="text-3xl font-semibold text-zinc-500 dark:text-zinc-400">
            {initialLetter.charAt(0).toUpperCase()}
          </span>
        ) : (
          <span className="text-4xl">🙂</span>
        )}
        <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 text-transparent transition-all duration-150 group-hover:bg-black/40 group-hover:text-white">
          <span className="text-xs font-medium">
            {preview ? "Trocar" : "Adicionar"}
          </span>
        </span>
        <span className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-base text-white shadow-sm ring-2 ring-white dark:ring-zinc-900">
          📷
        </span>
        <input
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
          className="sr-only"
        />
      </label>
      <span className="text-sm font-medium text-teal-700 dark:text-teal-400">
        {label}
      </span>
      <span className="text-xs text-zinc-500 dark:text-zinc-500">(Opcional)</span>
    </div>
  );
}
