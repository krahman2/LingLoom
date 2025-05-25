"use client";

import React from "react";

export function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-accent ${props.className || ""}`}
    />
  );
}
