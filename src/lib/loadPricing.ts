// Load pricing data from JSON files
import openaiData from '../../data/openai.json';
import anthropicData from '../../data/anthropic.json';
import googleData from '../../data/google.json';
import mistralData from '../../data/mistral.json';
import xaiData from '../../data/xai.json';
import deepseekData from '../../data/deepseek.json';
import amazonData from '../../data/amazon.json';
import moonshotData from '../../data/moonshot-ai.json';
import minimaxData from '../../data/minimax.json';

export interface ModelPricing {
  id: string;
  name: string;
  provider: string;
  inputCostPer1M: number;
  outputCostPer1M: number;
  inputCachedCostPer1M?: number;
  color: string;
}

interface PricingFile {
  vendor: string;
  models: Array<{
    id: string;
    name: string;
    price_history: Array<{
      input: number;
      output: number;
      input_cached?: number | null;
      from_date: string | null;
      to_date: string | null;
    }>;
  }>;
}

const PROVIDER_COLORS: Record<string, string> = {
  openai: '#10a37f',
  anthropic: '#d97757',
  google: '#4285f4',
  mistral: '#f2547d',
  xai: '#000000',
  deepseek: '#2563eb',
  amazon: '#ff9900',
  'moonshot-ai': '#8b5cf6',
  minimax: '#ec4899',
};

function parseModelsFromFile(data: PricingFile): ModelPricing[] {
  const models: ModelPricing[] = [];
  const vendor = data.vendor;
  const color = PROVIDER_COLORS[vendor] || '#6b7280';
  const seenIds = new Set<string>();

  data.models.forEach((model, index) => {
    // Get the most recent pricing (first in array with no to_date)
    const currentPrice = model.price_history.find(
      (price) => price.to_date === null
    ) || model.price_history[0];

    if (currentPrice) {
      // Handle duplicate IDs by making them unique
      let uniqueId = model.id;
      if (seenIds.has(uniqueId)) {
        uniqueId = `${model.id}-${index}`;
        console.warn(`Duplicate model ID found: ${model.id}, using ${uniqueId} instead`);
      }
      seenIds.add(uniqueId);

      models.push({
        id: uniqueId,
        name: model.name,
        provider: vendor.charAt(0).toUpperCase() + vendor.slice(1),
        inputCostPer1M: currentPrice.input,
        outputCostPer1M: currentPrice.output,
        inputCachedCostPer1M: currentPrice.input_cached ?? undefined,
        color,
      });
    }
  });

  return models;
}

// Load all models
export const MODEL_PRICING: ModelPricing[] = [
  ...parseModelsFromFile(openaiData as PricingFile),
  ...parseModelsFromFile(anthropicData as PricingFile),
  ...parseModelsFromFile(googleData as PricingFile),
  ...parseModelsFromFile(mistralData as PricingFile),
  ...parseModelsFromFile(xaiData as PricingFile),
  ...parseModelsFromFile(deepseekData as PricingFile),
  ...parseModelsFromFile(amazonData as PricingFile),
  ...parseModelsFromFile(moonshotData as PricingFile),
  ...parseModelsFromFile(minimaxData as PricingFile),
];

export function calculatePrice(
  inputTokens: number,
  outputTokens: number,
  model: ModelPricing
): { input: number; output: number; total: number } {
  const inputCost = (inputTokens / 1_000_000) * model.inputCostPer1M;
  const outputCost = (outputTokens / 1_000_000) * model.outputCostPer1M;
  return {
    input: inputCost,
    output: outputCost,
    total: inputCost + outputCost,
  };
}

export function getModelById(id: string): ModelPricing | undefined {
  return MODEL_PRICING.find((model) => model.id === id);
}

export function getModelsByProvider(provider: string): ModelPricing[] {
  return MODEL_PRICING.filter(
    (model) => model.provider.toLowerCase() === provider.toLowerCase()
  );
}

export function getAllProviders(): string[] {
  const providers = new Set(MODEL_PRICING.map((model) => model.provider));
  return Array.from(providers).sort();
}

