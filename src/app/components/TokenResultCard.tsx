'use client';

import { useEffect, useState } from 'react';
import { MODEL_PRICING, getModelById } from '@/lib/loadPricing';

interface TokenResultCardProps {
  inputTokens: number;
  outputTokens: number;
  prices: Record<string, { input: number; output: number; total: number }>;
  selectedModel: string;
  characterCount: number;
}

export default function TokenResultCard({ 
  inputTokens,
  outputTokens,
  prices, 
  selectedModel,
  characterCount 
}: TokenResultCardProps) {
  const [animatedInputTokens, setAnimatedInputTokens] = useState(0);
  const [animatedOutputTokens, setAnimatedOutputTokens] = useState(0);
  const [animatedPrice, setAnimatedPrice] = useState(0);

  const currentModel = getModelById(selectedModel);
  const currentPrice = prices[selectedModel]?.total || 0;
  const totalTokens = inputTokens + outputTokens;

  useEffect(() => {
    setAnimatedInputTokens(inputTokens);
    setAnimatedOutputTokens(outputTokens);
    setAnimatedPrice(currentPrice);
  }, [inputTokens, outputTokens, currentPrice]);

  return (
    <div className="flex-1 flex flex-col min-h-0 gap-6">
      {/* Main Result Card */}
      <div className="relative group">
        <div className="p-6 rounded-2xl border-2 border-pop-dark bg-white shadow-cartoon transition-transform group-hover:-translate-y-1">
          
          <div className="space-y-4">
            {/* Tokens Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-pop-bg p-3 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">📥</span>
                  <div className="text-gray-500 text-[10px] font-black tracking-widest uppercase">
                    Input
                  </div>
                </div>
                <div className="text-2xl font-black text-pop-dark">
                  {inputTokens.toLocaleString()}
                </div>
              </div>
              
              <div className="bg-pop-bg p-3 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">📤</span>
                  <div className="text-gray-500 text-[10px] font-black tracking-widest uppercase">
                    Output
                  </div>
                </div>
                <div className="text-2xl font-black text-pop-dark">
                  {outputTokens.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="pt-3 border-t-2 border-dashed border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-500 text-xs font-black tracking-widest uppercase mb-1">
                    Total Cost
                  </div>
                  <div className="text-4xl font-black text-pop-purple tracking-tight">
                    ${currentPrice.toFixed(5)}
                  </div>
                  <div className="text-xs text-gray-400 font-medium mt-1">
                    {totalTokens.toLocaleString()} tokens total
                  </div>
                </div>
                <div className="text-5xl">💰</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-2 mt-2">
        <span className="text-sm font-black text-pop-dark">📊 COMPARISON</span>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3 min-h-0 pb-4">
        {MODEL_PRICING.map((model) => {
          const modelPrice = prices[model.id]?.total || 0;
          const isSelected = model.id === selectedModel;
          
          return (
            <div
              key={model.id}
              className={`
                p-3 rounded-xl border-2 transition-all duration-200
                ${isSelected 
                  ? 'border-pop-dark bg-pop-bg shadow-cartoon-sm' 
                  : 'border-transparent bg-white hover:border-gray-200 hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full border border-pop-dark"
                    style={{ backgroundColor: model.color }}
                  />
                  <span className={`text-sm font-bold ${isSelected ? 'text-pop-dark' : 'text-gray-500'}`}>
                    {model.name}
                  </span>
                </div>
                <div className={`
                  font-mono text-sm font-bold
                  ${isSelected ? 'text-pop-purple' : 'text-gray-400'}
                `}>
                  ${modelPrice.toFixed(5)}
                </div>
              </div>
              {prices[model.id] && (
                <div className="flex gap-2 text-[10px] font-mono font-bold text-gray-400">
                  <span>In: ${prices[model.id].input.toFixed(6)}</span>
                  <span>•</span>
                  <span>Out: ${prices[model.id].output.toFixed(6)}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border-2 border-pop-dark rounded-lg p-2 text-center shadow-cartoon-sm">
          <div className="text-[10px] font-bold text-gray-400 uppercase">Ratio</div>
          <div className="text-xs font-black text-pop-dark">{(inputTokens / (characterCount || 1)).toFixed(2)}</div>
        </div>
        <div className="bg-green-50 border-2 border-pop-dark rounded-lg p-2 text-center shadow-cartoon-sm">
          <div className="text-[10px] font-bold text-green-600 uppercase">Min</div>
          <div className="text-xs font-black text-green-700">${Math.min(...Object.values(prices).map(p => p.total)).toFixed(4)}</div>
        </div>
        <div className="bg-red-50 border-2 border-pop-dark rounded-lg p-2 text-center shadow-cartoon-sm">
          <div className="text-[10px] font-bold text-red-600 uppercase">Max</div>
          <div className="text-xs font-black text-red-700">${Math.max(...Object.values(prices).map(p => p.total)).toFixed(4)}</div>
        </div>
      </div>
    </div>
  );
}
