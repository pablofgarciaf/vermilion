'use client';

import { useState } from 'react';
import { ChevronDown, Compass } from 'lucide-react';

interface Option {
  href: string;
  label: string;
}

export function TourCategoryDropdown({ label, options }: { label: string; options: Option[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-sm md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-2xl border border-white/20 bg-zinc-950/55 px-5 py-3 text-left text-sm font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-zinc-900/70"
      >
        <span className="flex items-center gap-2"><Compass className="h-4 w-4 text-emerald-300" />{label}</span>
        <ChevronDown className={`h-4 w-4 text-emerald-300 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ease-out ${open ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="space-y-2 rounded-2xl border border-white/15 bg-zinc-950/45 p-2 shadow-xl backdrop-blur-lg">
            {options.map((option, index) => (
              <a
                key={option.href}
                href={option.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/50 hover:bg-emerald-500/30"
                style={{ transitionDelay: open ? `${index * 35}ms` : '0ms' }}
              >
                {option.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
