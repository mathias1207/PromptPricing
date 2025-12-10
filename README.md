# 🚀 Tokencraft

**Tokencraft** est un calculateur de coût de tokens moderne et intuitif pour les modèles de langage (LLM). Comparez instantanément les prix entre 100+ modèles de différents fournisseurs.

![Tokencraft Preview](https://img.shields.io/badge/Status-Beta-yellow) ![Next.js](https://img.shields.io/badge/Next.js-15-black) ![License](https://img.shields.io/badge/License-MIT-blue)

🌐 **Demo Live** : [À venir]

## ✨ Fonctionnalités

- 🔢 **Calcul précis des tokens** - Utilise le tokenizer GPT officiel
- 💰 **Comparaison multi-modèles** - 100+ modèles de 9 fournisseurs
- 📊 **Estimation intelligente** - Mode AUTO pour estimer les tokens de sortie
- 🔍 **Recherche & Filtres** - Trouvez rapidement le modèle idéal
- 🎨 **Design moderne** - Interface Neo-Brutalism/Pop inspirée
- ⚡ **Temps réel** - Résultats instantanés avec animations fluides
- 📱 **Responsive** - Fonctionne sur desktop et mobile

## 🎯 Pourquoi Tokencraft ?

Contrairement aux calculateurs classiques, Tokencraft vous permet de :
- ✅ **Voir TOUS les modèles disponibles** (pas seulement 5-10)
- ✅ **Comparer les coûts input ET output** séparément
- ✅ **Estimer automatiquement** la taille de la réponse
- ✅ **Avoir des prix toujours à jour** (source officielle llm-prices.com)

## 📊 Sources de Données

Les prix proviennent du projet officiel **[llm-prices](https://github.com/simonw/llm-prices)** maintenu par Simon Willison et la communauté. Ce projet agrège les tarifs officiels de tous les fournisseurs LLM.

- 🔗 **Repo GitHub** : [simonw/llm-prices](https://github.com/simonw/llm-prices/tree/main)
- 🌐 **Site web** : [llm-prices.com](https://www.llm-prices.com/)
- 📅 **Dernière mise à jour** : 2025-11-30

### Fournisseurs supportés

| Provider | Modèles | Exemples |
|----------|---------|----------|
| **OpenAI** | 20+ | GPT-4o, GPT-4.5, GPT-4o Mini, o1, o3-mini |
| **Anthropic** | 8+ | Claude 3.7 Sonnet, Claude 3.5 Sonnet, Claude 3 Haiku |
| **Google** | 30+ | Gemini 2.5 Pro, Gemini 2.0 Flash, Gemini 1.5 Pro |
| **Mistral** | 15+ | Mistral Large, Mistral Medium 3, Mistral Small 3.1 |
| **xAI** | 10+ | Grok 4, Grok 3, Grok 4 Fast |
| **DeepSeek** | 4+ | DeepSeek V3, DeepSeek Chat |
| **Amazon** | 5+ | Nova Pro, Nova Lite, Nova Micro |
| **Moonshot** | 8+ | Moonshot v1 |
| **Minimax** | 2+ | Minimax Pro |

## 🛠️ Stack Technique

- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript
- **Styling** : TailwindCSS + CSS Custom
- **Tokenizer** : gpt-tokenizer
- **Animations** : Framer Motion
- **Deployment** : Vercel / Netlify compatible

## 📦 Installation

```bash
# Cloner le repo
git clone https://github.com/mathias1207/PromptPricing.git
cd PromptPricing

# Installer les dépendances
npm install

# Lancer en dev
npm run dev

# Build pour production
npm run build
npm start
```

L'application sera accessible sur **http://localhost:3000**

## 🎨 Design

Tokencraft utilise un design **Neo-Brutalism** moderne avec :
- 🎨 Palette de couleurs vives (violet, jaune, rose)
- 🖊️ Bordures épaisses (2px)
- 📦 Ombres dures (cartoon shadows)
- 🔤 Typographie bold (Inter Tight + JetBrains Mono)
- ✨ Micro-interactions subtiles

## 🔄 Mise à Jour des Prix

### Automatique (Recommandé)

Les prix sont stockés dans `/data/*.json` et proviennent directement de [llm-prices](https://github.com/simonw/llm-prices).

Pour mettre à jour :

```bash
# 1. Cloner le repo llm-prices
git clone https://github.com/simonw/llm-prices.git temp-llm-prices

# 2. Copier les fichiers JSON
cp temp-llm-prices/data/*.json ./data/

# 3. Nettoyer
rm -rf temp-llm-prices

# 4. Rebuild (les changements seront automatiques en dev avec hot-reload)
npm run build
```

### Vérifier les mises à jour

Consultez [llm-prices.com](https://www.llm-prices.com/) - en bas de page :
```
Prices last updated: 2025-11-30
```

Si la date est plus récente que celle dans votre `/data`, mettez à jour !

## 📂 Structure du Projet

```
/src
  /app
    /api/calc/route.ts       # API endpoint pour calcul des tokens
    /components              # Composants React
      AnimatedBackground.tsx # (supprimé, design cartoon)
      PromptInput.tsx        # Zone de saisie + estimateur
      ModelSelector.tsx      # Sélecteur avec recherche/filtres
      TokenResultCard.tsx    # Affichage des résultats
    page.tsx                 # Page principale
    layout.tsx              # Layout global
  /lib
    loadPricing.ts          # Chargement des prix depuis JSON
    tokenizer.ts            # Comptage de tokens
    constants.ts            # Constantes (date MAJ, etc.)
  /styles
    globals.css             # Styles globaux + fonts
/data                        # Fichiers JSON de prix (source: llm-prices)
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

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Netlify

```bash
# Build
npm run build

# Le dossier .next sera déployé automatiquement
```

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Pushez (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Roadmap

- [ ] **API publique** - Endpoint pour intégrations tierces
- [ ] **Mode comparaison** - Comparer 2-3 modèles côte à côte
- [ ] **Historique** - Voir l'évolution des prix dans le temps
- [ ] **Notifications** - Alertes sur changements de prix
- [ ] **Dark mode** - Thème sombre (actuellement clair uniquement)
- [ ] **Export PDF** - Exporter les estimations
- [ ] **Calculateur batch** - Pour calculer plusieurs prompts
- [ ] **Support GPT-4o-realtime** - Modèles audio/vision

## 📄 Licence

MIT License - voir [LICENSE](LICENSE) pour plus de détails.

## 🙏 Crédits

- **Données de prix** : [llm-prices](https://github.com/simonw/llm-prices) par Simon Willison
- **Tokenizer** : [gpt-tokenizer](https://github.com/niieani/gpt-tokenizer)
- **Design inspiration** : Neo-Brutalism / Modern Cartoon aesthetic

## 📧 Contact

Mathias Goldmann - [@mathias1207](https://github.com/mathias1207)

**Repo** : [https://github.com/mathias1207/PromptPricing](https://github.com/mathias1207/PromptPricing)

---

⭐ **Star ce repo** si Tokencraft vous aide à optimiser vos coûts LLM !
