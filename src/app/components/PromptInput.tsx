'use client';

import { useState, useEffect } from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onCalculate: () => void;
  isCalculating: boolean;
  outputTokens: number;
  onOutputTokensChange: (value: number) => void;
}

const OUTPUT_PRESETS = [
  { label: 'Short', value: 500, emoji: '💬', desc: 'Quick answer' },
  { label: 'Medium', value: 2000, emoji: '📝', desc: 'Detailed response' },
  { label: 'Long', value: 5000, emoji: '📄', desc: 'In-depth analysis' },
  { label: 'Very Long', value: 10000, emoji: '📚', desc: 'Full article' },
];

export default function PromptInput({ 
  value, 
  onChange, 
  onCalculate, 
  isCalculating,
  outputTokens,
  onOutputTokensChange 
}: PromptInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [inputTokenEstimate, setInputTokenEstimate] = useState(0);

  // Estimate input tokens (rough: 1 token ≈ 4 chars)
  useEffect(() => {
    const estimated = Math.ceil(value.length / 4);
    setInputTokenEstimate(estimated);
    
    // Auto estimate output based on input length
    if (autoMode) {
      // Smart estimation logic:
      // - Short prompts (< 100 tokens) → likely want medium response (2000)
      // - Medium prompts (100-500) → likely want detailed response (3000)
      // - Long prompts (500+) → likely want very detailed (5000+)
      let autoEstimate = 2000; // default
      
      if (estimated < 100) {
        autoEstimate = 2000;
      } else if (estimated < 500) {
        autoEstimate = 3000;
      } else {
        autoEstimate = 5000;
      }
      
      onOutputTokensChange(autoEstimate);
    }
  }, [value, autoMode, onOutputTokensChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onCalculate();
    }
  };

  const handlePresetClick = (presetValue: number) => {
    setAutoMode(false);
    onOutputTokensChange(presetValue);
  };

  return (
    <div className="flex-1 flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <label className="text-pop-dark font-black text-lg tracking-tight">
          📝 YOUR PROMPT
        </label>
        <div className="flex items-center gap-2">
          <span className="bg-pop-blue/20 border-2 border-pop-dark px-3 py-1 rounded-full font-bold text-xs shadow-cartoon-sm text-pop-blue">
            ~{inputTokenEstimate} tokens in
          </span>
          <span className="bg-pop-yellow border-2 border-pop-dark px-3 py-1 rounded-full font-bold text-xs shadow-cartoon-sm">
            {value.length} chars
          </span>
        </div>
      </div>
      
      <div 
        className={`
          relative flex-1 rounded-xl border-2 border-pop-dark
          transition-all duration-200 bg-white
          ${isFocused ? 'shadow-cartoon' : 'shadow-cartoon-sm'}
        `}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Type something amazing here..."
          className="
            w-full h-full p-6
            bg-transparent
            text-pop-dark font-medium text-lg leading-relaxed
            resize-none outline-none
            placeholder:text-gray-400
            rounded-xl
          "
          spellCheck={false}
        />
      </div>

      {/* Output Tokens Estimator */}
      <div className="bg-white border-2 border-pop-dark rounded-xl p-4 shadow-cartoon-sm">
        <div className="flex items-center justify-between mb-3">
          <label className="text-pop-dark font-bold text-sm flex items-center gap-2">
            <span>💬</span>
            <span>Expected Response Size</span>
          </label>
          <button
            onClick={() => setAutoMode(!autoMode)}
            className={`
              px-3 py-1 rounded-lg font-bold text-xs border-2 border-pop-dark
              transition-all duration-150
              ${autoMode 
                ? 'bg-pop-purple text-white shadow-cartoon-sm' 
                : 'bg-white text-pop-dark hover:bg-gray-50'
              }
            `}
          >
            {autoMode ? '🤖 AUTO' : '✋ MANUAL'}
          </button>
        </div>

        {/* Quick Presets */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {OUTPUT_PRESETS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => handlePresetClick(preset.value)}
              className={`
                p-2 rounded-lg border-2 transition-all duration-150
                ${outputTokens === preset.value && !autoMode
                  ? 'border-pop-purple bg-pop-purple/10 shadow-cartoon-sm' 
                  : 'border-gray-200 bg-white hover:border-pop-purple/50 hover:bg-pop-purple/5'
                }
              `}
            >
              <div className="text-xl mb-1">{preset.emoji}</div>
              <div className={`text-xs font-bold ${outputTokens === preset.value && !autoMode ? 'text-pop-purple' : 'text-gray-600'}`}>
                {preset.label}
              </div>
              <div className="text-[10px] text-gray-400 font-medium" suppressHydrationWarning>
                {preset.value.toLocaleString()}
              </div>
            </button>
          ))}
        </div>

        {/* Visual Display */}
        <div className="bg-gradient-to-r from-pop-purple/10 to-pop-pink/10 p-3 rounded-lg border border-pop-purple/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white border-2 border-pop-dark rounded-lg px-3 py-2 shadow-cartoon-sm">
                <div className="text-xs text-gray-500 font-bold mb-0.5">OUTPUT TOKENS</div>
                <div className="text-2xl font-black text-pop-purple font-mono" suppressHydrationWarning>
                  {outputTokens.toLocaleString()}
                </div>
              </div>
              <div className="text-sm text-gray-600 max-w-[200px]">
                <span className="font-bold">{getOutputDescription(outputTokens)}</span>
              </div>
            </div>
            {autoMode && (
              <div className="bg-white border border-pop-purple/30 px-2 py-1 rounded text-[10px] font-bold text-pop-purple">
                AUTO ESTIMATED
              </div>
            )}
          </div>
        </div>

        {/* Manual Slider (only shown when not auto) */}
        {!autoMode && (
          <div className="mt-3">
            <input
              type="range"
              min="100"
              max="16000"
              step="100"
              value={outputTokens}
              onChange={(e) => onOutputTokensChange(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer border-2 border-pop-dark
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-6
                [&::-webkit-slider-thumb]:h-6
                [&::-webkit-slider-thumb]:bg-pop-purple
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-pop-dark
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:shadow-cartoon-sm
                [&::-webkit-slider-thumb]:hover:bg-pop-pink
                [&::-moz-range-thumb]:w-6
                [&::-moz-range-thumb]:h-6
                [&::-moz-range-thumb]:bg-pop-purple
                [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-pop-dark
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:cursor-pointer
                [&::-moz-range-thumb]:hover:bg-pop-pink
              "
            />
            <div className="flex justify-between mt-1 text-[10px] font-bold text-gray-400">
              <span>100</span>
              <span>8K</span>
              <span>16K</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="text-xs font-bold text-gray-500 bg-white border-2 border-gray-200 px-3 py-1 rounded-lg">
          ⌨️ Cmd + Enter
        </div>
        
        <button
          onClick={onCalculate}
          disabled={!value.trim() || isCalculating}
          className="
            px-8 py-4
            bg-pop-purple text-white font-black text-lg tracking-wide
            rounded-xl border-2 border-pop-dark
            shadow-cartoon
            transition-all duration-150
            hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-cartoon-hover
            active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            flex items-center gap-3
          "
        >
          {isCalculating ? (
            <>
              <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <span>CALCULATE COST</span>
              <span className="text-xl">🚀</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function getOutputDescription(tokens: number): string {
  if (tokens < 500) return 'A few sentences';
  if (tokens < 1000) return 'A short paragraph';
  if (tokens < 2000) return '1-2 paragraphs';
  if (tokens < 3000) return 'A detailed explanation';
  if (tokens < 5000) return 'Multiple paragraphs';
  if (tokens < 8000) return 'A long article';
  return 'Very extensive content';
}
