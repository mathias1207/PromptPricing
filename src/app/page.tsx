'use client';

import { useState } from 'react';
import PromptInput from './components/PromptInput';
import ModelSelector from './components/ModelSelector';
import TokenResultCard from './components/TokenResultCard';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [outputTokens, setOutputTokens] = useState(1000);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<{
    inputTokens: number;
    outputTokens: number;
    price: Record<string, { input: number; output: number; total: number }>;
    characterCount: number;
  } | null>(null);

  const handleCalculate = async () => {
    if (!prompt.trim()) return;

    setIsCalculating(true);
    try {
      const response = await fetch('/api/calc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, outputTokens }),
      });

      if (!response.ok) {
        throw new Error('Calculation failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error calculating:', error);
      alert('Failed to calculate tokens. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <main className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-[80px] px-8 flex items-center justify-between bg-white border-b-2 border-pop-dark relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-pop-purple border-2 border-pop-dark shadow-cartoon-sm flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-pop-dark">
            PROMPT PRICING CALCULATOR
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/mathias1207/PromptPricing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-pop-dark text-white font-bold text-sm rounded-lg border-2 border-pop-dark shadow-cartoon-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-cartoon-hover transition-all duration-150"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <div className="bg-pop-yellow px-3 py-1 rounded-full border-2 border-pop-dark font-bold text-xs shadow-cartoon-sm">
            BETA v1.0
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Input */}
        <div className="w-1/2 p-8 flex flex-col bg-white border-r-2 border-pop-dark">
          <PromptInput
            value={prompt}
            onChange={setPrompt}
            onCalculate={handleCalculate}
            isCalculating={isCalculating}
            outputTokens={outputTokens}
            onOutputTokensChange={setOutputTokens}
          />
        </div>

        {/* Right Panel - Results */}
        <div className="w-1/2 p-8 flex flex-col bg-[#F0F9FF] relative">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pop-pink/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pop-purple/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-full max-w-lg mx-auto flex flex-col h-full relative z-10">
            <div className="mb-6">
              <ModelSelector
                selectedModel={selectedModel}
                onSelectModel={setSelectedModel}
              />
            </div>

            {result ? (
              <TokenResultCard
                inputTokens={result.inputTokens}
                outputTokens={result.outputTokens}
                prices={result.price}
                selectedModel={selectedModel}
                characterCount={result.characterCount}
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-24 h-24 mb-6 rounded-3xl bg-white border-2 border-pop-dark shadow-cartoon flex items-center justify-center transform -rotate-6 animate-bounce-slight">
                  <span className="text-4xl">👋</span>
                </div>
                <h3 className="text-xl font-black text-pop-dark mb-2">Ready to crunch numbers!</h3>
                <p className="text-gray-500 font-medium text-center max-w-xs">
                  Paste your text on the left and I'll tell you how much it costs.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
