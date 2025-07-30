# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-15

### ✨ Ajouté

- **Architecture complète** : Domain-Driven Design avec Next.js 15
- **Frontend moderne** : React 19, TypeScript 5, Tailwind CSS 4
- **Interface utilisateur** : Composants Radix UI + shadcn/ui
- **Authentification sécurisée** : Better Auth avec OAuth Google et passkeys
- **Base de données** : PostgreSQL avec Prisma ORM
- **Formulaire de contact** : Validation Zod, envoi emails Resend
- **Espace administration** : Dashboard protégé pour gestion des contacts
- **SEO optimisé** : Métadonnées, sitemap automatique, schema.org
- **Accessibilité WCAG 2.1 AA** : Navigation clavier, lecteurs d'écran
- **Tests unitaires** : Jest + React Testing Library (46 tests)
- **Sécurité OWASP** : Headers sécurisés, protection XSS/CSRF
- **Documentation complète** : Manuels déploiement, utilisation, mise à jour

### 🔧 Configuration

- **Environnement de développement** : Hot reload avec Turbopack
- **Linting** : ESLint avec règles Next.js
- **Base de données** : Migrations Prisma automatisées
- **Déploiement** : Configuration Vercel optimisée
- **Monitoring** : Lighthouse, Core Web Vitals

### 📱 Fonctionnalités

- **Page d'accueil responsive** : Hero, à propos, prestations, FAQ
- **Formulaire de contact avancé** : Upload de fichiers, validation temps réel
- **Système d'authentification** : Email/password, OAuth, récupération mot de passe
- **Dashboard administrateur** : Gestion contacts, filtres, export
- **Pages légales** : Mentions légales, politique de confidentialité

### 🎨 Design

- **Design system cohérent** : Variables CSS, composants réutilisables
- **Animations fluides** : Motion (Framer Motion) pour les interactions
- **Mode sombre/clair** : Thème adaptatif automatique
- **Responsive design** : Mobile-first, tablette, desktop

### 🚀 Performance

- **Core Web Vitals optimisés** : LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Optimisation images** : Next/Image avec formats AVIF/WebP
- **Code splitting** : Chargement par route automatique
- **Compression** : Gzip/Brotli, cache optimisé

### 🔒 Sécurité

- **Headers sécurisés** : X-Frame-Options, CSP, HSTS
- **Validation stricte** : Sanitization des entrées utilisateur
- **Sessions sécurisées** : Expiration automatique, tokens rotatifs
- **Audit dépendances** : Vérification vulnérabilités npm

### ♿ Accessibilité

- **Navigation clavier** : Tab index optimisé, focus visible
- **Lecteurs d'écran** : ARIA labels, landmarks sémantiques
- **Contraste** : Ratio 4.5:1 minimum (AA)
- **Skip links** : Navigation rapide au contenu principal

## [0.2.0] - 2024-01-10

### ✨ Ajouté

- Configuration initiale Next.js 15 avec App Router
- Setup TypeScript et Tailwind CSS
- Composants UI de base avec shadcn/ui
- Page d'accueil avec sections principales

### 🔧 Configuration

- Structure de projet avec architecture domaines
- Configuration Prisma et PostgreSQL
- Setup Jest pour les tests unitaires

## [0.1.0] - 2024-01-05

### ✨ Ajouté

- Initialisation du projet
- Configuration de base Git
- README initial
- Structure de fichiers

---

## Types de changements

- ✨ **Ajouté** pour les nouvelles fonctionnalités
- 🔧 **Modifié** pour les changements dans les fonctionnalités existantes
- 🐛 **Corrigé** pour les corrections de bugs
- 🗑️ **Supprimé** pour les fonctionnalités supprimées
- 🔒 **Sécurité** pour les corrections de vulnérabilités
- 📚 **Documentation** pour les changements de documentation
- 🎨 **Style** pour les changements de formatage/style
- ⚡ **Performance** pour les améliorations de performance
- ♿ **Accessibilité** pour les améliorations d'accessibilité
