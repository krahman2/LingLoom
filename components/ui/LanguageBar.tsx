"use client";

import Image from "next/image";

const languages = [
  {
    code: "bd",
    name: "Bangla",
    available: true,
  },
  {
    code: "in",
    name: "Hindi",
    available: true,
  },
  {
    code: "es",
    name: "Spanish",
    available: false,
  },
  {
    code: "fr",
    name: "French",
    available: false,
  },
];

export default function LanguageBar() {
  return (
    <div className="bg-neutral-900 px-8 py-4 flex justify-center">
      <div className="flex flex-wrap items-center justify-center gap-8 text-base md:text-lg text-white">
        {languages.map((lang) => (
          <span
            key={lang.code}
            className={`flex items-center gap-3 ${
              !lang.available ? "text-gray-400 italic" : "font-semibold"
            }`}
          >
            <Image
              src={`/images/Flags/${lang.code}.png`}
              alt={`${lang.name} flag`}
              width={24}
              height={18}
              className="rounded-sm"
            />
            {lang.name}
            {!lang.available && (
              <span className="text-xs italic">(coming soon)</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
