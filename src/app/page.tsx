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
            TOKENCRAFT
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
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
