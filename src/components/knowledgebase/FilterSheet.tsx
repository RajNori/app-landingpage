'use client';

import { KMS_CONTENT } from '@/data/knowledgebase';

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  facet: { [k: string]: string | null };
  onFacetChange: (facet: { [k: string]: string | null }) => void;
}

export default function FilterSheet({
  isOpen,
  onClose,
  facet,
  onFacetChange,
}: FilterSheetProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-black/30"
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 h-full w-full sm:w-[360px] bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
          <div className="font-medium">Filters</div>
          <button
            className="text-sm text-zinc-500"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="p-4 space-y-5">
          {KMS_CONTENT.facets.map((f) => (
            <div key={f.key}>
              <div className="text-xs uppercase text-zinc-500 mb-2">
                {f.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {f.values.map((v) => (
                  <button
                    key={v}
                    onClick={() =>
                      onFacetChange({
                        ...facet,
                        [f.key]: facet[f.key] === v ? null : v,
                      })
                    }
                    className={`px-3 py-1.5 rounded-full text-sm border transition ${
                      facet[f.key] === v
                        ? 'bg-zinc-900 text-white border-zinc-900'
                        : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="pt-2">
            <button
              onClick={() => onFacetChange({ type: null, status: null })}
              className="text-sm text-purple-700 hover:underline"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
