import { ReactNode } from 'react';

export interface BaseTourCardProps {
  title: string;
  price: number;
  code?: string;
  imageNode: ReactNode;
  actionNode: ReactNode;
  isTourTable?: boolean;
  isAdmin?: boolean;
}

export const BaseTourCard = ({ title, price, code, imageNode, actionNode, isTourTable = false, isAdmin = false }: BaseTourCardProps) => (
  <div className="flex flex-col h-full rounded-2xl shadow-lg overflow-hidden transition-all duration-300 border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/80 backdrop-blur-sm group hover:shadow-2xl hover:border-emerald-500/40">
    <div className="relative h-48 sm:h-52 w-full shrink-0 overflow-hidden bg-zinc-100">{imageNode}</div>
    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
      <div>
        {code && (
          <span className="inline-block px-2.5 py-0.5 mb-1.5 text-xs font-mono font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 rounded-md border border-emerald-300 dark:border-emerald-800">
            Tour #{code}
          </span>
        )}
        <h3 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
          {title}
        </h3>
        {(isTourTable || isAdmin) && (
          <p className="text-sm font-semibold text-emerald-600 mt-1">${price.toLocaleString('en-US')} / person</p>
        )}
      </div>
      <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800">{actionNode}</div>
    </div>
  </div>
);
