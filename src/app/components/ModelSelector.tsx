'use client';

import { useState, useRef, useEffect } from 'react';
import { MODEL_PRICING, getAllProviders } from '@/lib/loadPricing';

interface ModelSelectorProps {
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
}

export default function ModelSelector({ selectedModel, onSelectModel }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedModelData = MODEL_PRICING.find(m => m.id === selectedModel);
  const providers = getAllProviders();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter models
  const filteredModels = MODEL_PRICING.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         model.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProvider = selectedProvider === 'all' || 
                           model.provider.toLowerCase() === selectedProvider.toLowerCase();
    return matchesSearch && matchesProvider;
  });

  // Group by provider
  const groupedModels: Record<string, typeof MODEL_PRICING> = {};
  filteredModels.forEach(model => {
    if (!groupedModels[model.provider]) {
      groupedModels[model.provider] = [];
    }
    groupedModels[model.provider].push(model);
  });

  return (
    <div className="w-full relative z-50" ref={dropdownRef}>
      <label className="block text-pop-dark font-black text-lg tracking-tight mb-2">
        🤖 CHOOSE MODEL
      </label>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between
          px-4 py-4 rounded-xl
          bg-white border-2 border-pop-dark
          transition-all duration-200
          ${isOpen ? 'shadow-cartoon-sm' : 'shadow-cartoon'}
          hover:translate-x-[1px] hover:translate-y-[1px]
        `}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-4 h-4 rounded-full border-2 border-pop-dark"
            style={{ backgroundColor: selectedModelData?.color }}
          />
          <div className="text-left">
            <div className="text-pop-dark font-bold text-lg leading-none">
              {selectedModelData?.name || 'Select a model'}
            </div>
            <div className="text-xs text-gray-500 font-bold mt-1">
              {selectedModelData?.provider.toUpperCase()} • ${selectedModelData?.inputCostPer1M}/${selectedModelData?.outputCostPer1M}
            </div>
          </div>
        </div>
        
        <div className={`
          border-2 border-pop-dark rounded-lg p-1 transition-transform duration-300
          ${isOpen ? 'rotate-180 bg-pop-bg' : 'bg-transparent'}
        `}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      <div className={`
        absolute top-full left-0 right-0 mt-3
        bg-white border-2 border-pop-dark rounded-xl
        shadow-cartoon-lg overflow-hidden
        transition-all duration-200 origin-top
        ${isOpen 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-[-10px] scale-95 pointer-events-none'
        }
      `}>
        {/* Search & Filter */}
        <div className="p-3 border-b-2 border-gray-200 bg-pop-bg space-y-2">
          <input
            type="text"
            placeholder="🔍 Search models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border-2 border-pop-dark text-sm font-medium outline-none focus:shadow-cartoon-sm transition-all"
          />
          
          {/* Provider Filter Pills */}
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setSelectedProvider('all')}
              className={`px-2 py-1 rounded-md text-xs font-bold border-2 transition-all ${
                selectedProvider === 'all'
                  ? 'bg-pop-purple text-white border-pop-dark'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-pop-dark'
              }`}
            >
              All ({MODEL_PRICING.length})
            </button>
            {providers.map(provider => {
              const count = MODEL_PRICING.filter(m => m.provider === provider).length;
              return (
                <button
                  key={provider}
                  onClick={() => setSelectedProvider(provider)}
                  className={`px-2 py-1 rounded-md text-xs font-bold border-2 transition-all ${
                    selectedProvider === provider
                      ? 'bg-pop-purple text-white border-pop-dark'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-pop-dark'
                  }`}
                >
                  {provider} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Models List */}
        <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-2">
          {Object.keys(groupedModels).length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              No models found
            </div>
          ) : (
            Object.entries(groupedModels).map(([provider, models]) => (
              <div key={provider} className="mb-3">
                <div className="px-2 py-1 text-xs font-black text-gray-400 uppercase tracking-wider">
                  {provider}
                </div>
                <div className="space-y-1">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        onSelectModel(model.id);
                        setIsOpen(false);
                        setSearchQuery('');
                      }}
                      className={`
                        w-full flex items-center justify-between
                        px-3 py-2 rounded-lg border-2 border-transparent
                        transition-all duration-150
                        group
                        ${selectedModel === model.id 
                          ? 'bg-pop-bg border-pop-dark' 
                          : 'hover:bg-gray-50 hover:border-gray-200'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div 
                          className="w-2 h-2 rounded-full border border-pop-dark flex-shrink-0"
                          style={{ backgroundColor: model.color }}
                        />
                        <span className={`text-xs font-bold truncate ${selectedModel === model.id ? 'text-pop-dark' : 'text-gray-600'}`}>
                          {model.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <div className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                          <span className="text-[10px] font-mono font-bold text-gray-500">
                            ${model.inputCostPer1M}
                          </span>
                        </div>
                        <div className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                          <span className="text-[10px] font-mono font-bold text-gray-500">
                            ${model.outputCostPer1M}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Info */}
        <div className="p-2 border-t-2 border-gray-200 bg-pop-bg">
          <div className="text-[10px] text-gray-400 font-bold text-center">
            {filteredModels.length} model{filteredModels.length !== 1 ? 's' : ''} • Prices: 2025-11-30 • <a href="https://www.llm-prices.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-pop-purple">llm-prices.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
