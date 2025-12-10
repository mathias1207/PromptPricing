# 📊 Guide de Mise à Jour des Prix

Ce projet utilise les données officielles de [llm-prices.com](https://www.llm-prices.com/).

## 🔄 Comment Mettre à Jour les Prix

### Option 1 : Mise à Jour Manuelle (Recommandée pour l'instant)

1. **Vérifier la dernière mise à jour** sur [llm-prices.com](https://www.llm-prices.com/)
   - En bas de page : "Prices last updated: YYYY-MM-DD"
   - Actuellement : **2025-11-30**

2. **Télécharger les derniers fichiers JSON**
   ```bash
   # Cloner ou télécharger depuis le repo GitHub
   git clone https://github.com/alexrudall/llm-pricing-calculator
   
   # Copier les fichiers dans votre projet
   cp llm-pricing-calculator/data/*.json ./data/
   ```

3. **Redémarrer le serveur**
   ```bash
   npm run dev
   ```

### Option 2 : Script Automatique (À implémenter)

Pour automatiser la vérification des mises à jour, vous pouvez :

1. **Créer un script de vérification**
   - Scraper la date "Prices last updated" sur llm-prices.com
   - Comparer avec la date actuelle dans vos données
   - Télécharger automatiquement si différent

2. **GitHub Actions** (recommandé)
   - Créer un workflow qui vérifie quotidiennement
   - Ouvre une PR automatique si des changements sont détectés

3. **Webhook GitHub**
   - S'abonner aux notifications du repo `alexrudall/llm-pricing-calculator`
   - Recevoir une notification à chaque commit

### Option 3 : API de Vérification

Créer un endpoint `/api/check-updates` qui :
- Fetch la page llm-prices.com
- Parse la date de mise à jour
- Compare avec `LAST_UPDATE_DATE` dans le code
- Retourne si une mise à jour est disponible

## 📅 Dernière Mise à Jour

**Date actuelle des prix** : 2025-11-30

## 🤖 Automatisation Future (TODO)

```bash
# À créer : Script de mise à jour automatique
npm run update-prices
```

Ce script pourrait :
1. Vérifier si des mises à jour sont disponibles
2. Télécharger les nouveaux fichiers JSON
3. Valider les données
4. Mettre à jour automatiquement

## 📝 Notes

- Les fichiers JSON sont dans `/data/`
- Le système charge automatiquement tous les modèles au démarrage
- Aucun redéploiement n'est nécessaire si vous utilisez le hot-reload en dev
- En production, un rebuild est nécessaire après mise à jour des JSON

