# Tokencraft

A web-based calculator for estimating token costs across different Large Language Model providers. Built as a learning project to explore Next.js 15 and modern web development practices.

## Overview

This application helps developers and researchers estimate costs when working with various LLM APIs. It provides real-time token counting and price comparisons across 100+ models from 9 different providers.

### Features

- Real-time token counting using GPT tokenizer
- Price comparison across multiple LLM providers
- Automatic output token estimation
- Search and filter functionality for models
- Responsive design that works on mobile and desktop

## Data Source

All pricing data is sourced from [llm-prices](https://github.com/simonw/llm-prices) by Simon Willison. This project aggregates official pricing information from LLM providers and maintains it in structured JSON files.

- Source repository: https://github.com/simonw/llm-prices
- Website: https://www.llm-prices.com/
- Last updated: 2025-11-30

### Supported Providers

The application currently supports models from:

- OpenAI (GPT-4o, GPT-4.5, GPT-4o Mini, o1, o3-mini)
- Anthropic (Claude 3.7 Sonnet, Claude 3.5 Sonnet, Claude 3 Haiku)
- Google (Gemini 2.5 Pro, Gemini 2.0 Flash)
- Mistral (Mistral Large, Mistral Medium 3, Mistral Small 3.1)
- xAI (Grok 4, Grok 3)
- DeepSeek (DeepSeek V3)
- Amazon (Nova Pro, Nova Lite, Nova Micro)
- Moonshot
- Minimax

## Technical Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Tokenizer**: gpt-tokenizer library
- **Animation**: Framer Motion

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/mathias1207/PromptPricing.git
cd PromptPricing
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Project Structure

```
/src
  /app
    /api/calc
      route.ts              # API endpoint for token calculation
    /components
      PromptInput.tsx       # Input component with estimator
      ModelSelector.tsx     # Model selection with search/filters
      TokenResultCard.tsx   # Results display component
    page.tsx                # Main page
    layout.tsx              # Root layout
  /lib
    loadPricing.ts          # Loads pricing data from JSON files
    tokenizer.ts            # Token counting logic
    constants.ts            # Application constants
  /styles
    globals.css             # Global styles and fonts

/data                       # Pricing data (from llm-prices)
  anthropic.json
  openai.json
  google.json
  mistral.json
  xai.json
  deepseek.json
  amazon.json
  moonshot-ai.json
  minimax.json
```

## How It Works

### Token Counting

The application uses the `gpt-tokenizer` library to count tokens in the input text. This provides accurate token counts compatible with OpenAI's tokenization.

### Output Estimation

Since users typically don't know how many output tokens they'll receive, the app includes an intelligent estimator with two modes:

1. **AUTO mode**: Automatically estimates output tokens based on input length
2. **Manual mode**: User can set expected output tokens using preset buttons or a slider

### Price Calculation

Prices are loaded from JSON files in the `/data` directory. The calculation considers both input and output tokens:

```
Total Cost = (Input Tokens / 1M × Input Price) + (Output Tokens / 1M × Output Price)
```

## Updating Prices

The pricing data comes from the llm-prices repository. To update:

```bash
# Clone the llm-prices repository
git clone https://github.com/simonw/llm-prices.git temp-llm-prices

# Copy JSON files
cp temp-llm-prices/data/*.json ./data/

# Clean up
rm -rf temp-llm-prices

# Rebuild if needed
npm run build
```

The app will automatically load the new prices on next start. In development mode with hot-reload, changes are reflected immediately.

## Development Notes

### Handling Duplicate IDs

The data loading system detects and handles duplicate model IDs by appending a numeric suffix. This prevents React key conflicts when rendering the model list.

### Hydration Issues

Number formatting (toLocaleString) can cause hydration mismatches between server and client. These are handled using `suppressHydrationWarning` on affected elements.

### Performance

- Model data is loaded once at build time
- No external API calls required for pricing lookups
- Client-side tokenization keeps the API simple

## Building for Production

```bash
npm run build
npm start
```

The application can be deployed to any platform that supports Next.js:

- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

## Known Issues

- Tokenization is based on GPT tokenizer, which may not be accurate for all models
- Some models (like Claude) use different tokenizers
- Price data depends on manual updates from the llm-prices project

## Future Improvements

- Add historical price tracking and visualization
- Implement side-by-side model comparison
- Add batch calculation for multiple prompts
- Create public API for programmatic access
- Support for more specialized models (audio, vision, real-time)

## Contributing

This is an open-source project. Feel free to fork and submit pull requests.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Credits

- Pricing data: [llm-prices](https://github.com/simonw/llm-prices) by Simon Willison
- Tokenizer: [gpt-tokenizer](https://github.com/niieani/gpt-tokenizer)

## Contact

Mathias Goldmann  
GitHub: [@mathias1207](https://github.com/mathias1207)  
Repository: https://github.com/mathias1207/PromptPricing
