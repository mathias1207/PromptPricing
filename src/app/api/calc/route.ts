import { NextRequest, NextResponse } from 'next/server';
import { countTokens } from '@/lib/tokenizer';
import { MODEL_PRICING, calculatePrice } from '@/lib/loadPricing';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, outputTokens = 0 } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt provided' },
        { status: 400 }
      );
    }

    // Count input tokens
    const inputTokens = countTokens(prompt);

    // Calculate price for all models
    const prices: Record<string, { input: number; output: number; total: number }> = {};
    MODEL_PRICING.forEach(model => {
      prices[model.id] = calculatePrice(inputTokens, outputTokens, model);
    });

    return NextResponse.json({
      inputTokens,
      outputTokens,
      price: prices,
      characterCount: prompt.length,
    });
  } catch (error) {
    console.error('Error in /api/calc:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

