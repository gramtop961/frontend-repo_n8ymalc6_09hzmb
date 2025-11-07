import React from 'react';
import { Rocket } from 'lucide-react';

const HeroHeader = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-6 text-white shadow-lg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.1),transparent_35%)]" />
      <div className="relative z-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
          <Rocket className="h-4 w-4" />
          Interactive Step Form
        </div>
        <h1 className="text-2xl font-bold sm:text-3xl">Create your project in steps</h1>
        <p className="mt-1 max-w-prose text-white/90">
          Move through a guided, interactive flow. After each step, you can preview your images and details before submitting.
        </p>
      </div>
    </div>
  );
};

export default HeroHeader;
