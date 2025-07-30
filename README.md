# Diet-Clic - Application Web de Diététique et Nutrition

Site web professionnel pour Manon Chaillou, diététicienne nutritionniste à Nantes.

## 📋 Sommaire

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture et technologies](#architecture-et-technologies)
3. [Environnement de développement](#environnement-de-développement)
4. [Installation et configuration](#installation-et-configuration)
5. [Déploiement continu](#déploiement-continu)
6. [Intégration continue](#intégration-continue)
7. [Sécurité](#sécurité)
8. [Accessibilité](#accessibilité)
9. [Tests](#tests)
10. [Performance et qualité](#performance-et-qualité)
11. [Documentation technique](#documentation-technique)
12. [Manuels](#manuels)

## 🎯 Vue d'ensemble

Diet-Clic est une application web moderne développée pour une diététicienne nutritionniste. Elle offre une présence en ligne professionnelle avec des fonctionnalités de prise de contact, de présentation des services et un espace d'administration sécurisé.

### Fonctionnalités principales

- **Site vitrine** : Présentation des services, parcours professionnel, FAQ
- **Formulaire de contact** : Système d'envoi d'emails sécurisé avec validation
- **Espace administration** : Dashboard protégé pour la gestion des contacts
- **Authentification** : Système complet avec Better Auth (email/password, OAuth, passkeys)
- **Responsive design** : Interface adaptée mobile/desktop avec animations fluides
- **SEO optimisé** : Métadonnées structurées, sitemap automatique, schema.org

## 🏗️ Architecture et technologies

### Stack technique

#### Frontend

- **Framework** : Next.js 15.4 (App Router)
- **Langage** : TypeScript 5.x
- **Styles** : Tailwind CSS 3.x
- **UI Components** : Radix UI + shadcn/ui
- **Animations** : Motion (Framer Motion)
- **Formulaires** : React Hook Form + Zod

#### Backend

- **Runtime** : Node.js
- **Base de données** : PostgreSQL avec Prisma ORM
- **Authentification** : Better Auth
- **Emails** : Resend API
- **Upload fichiers** : UploadThing
- **Validation** : Zod schemas

### Architecture logicielle

```
diet-clic/
├── app/                      # Next.js App Router
│   ├── (public)/            # Routes publiques
│   ├── (protected)/         # Routes protégées (auth requise)
│   ├── api/                 # Routes API
│   ├── auth/                # Pages d'authentification
│   └── generated/           # Code généré (Prisma)
├── domains/                 # Logique métier par domaine
│   ├── auth/               # Domaine authentification
│   └── user/               # Domaine utilisateur
├── shared/                  # Code partagé
│   ├── components/         # Composants réutilisables
│   ├── actions/            # Server Actions
│   ├── hooks/              # React hooks personnalisés
│   ├── lib/                # Utilitaires
│   ├── schemas/            # Schémas de validation
│   └── utils/              # Fonctions utilitaires
├── prisma/                  # Configuration base de données
└── public/                  # Assets statiques
```

### Paradigmes de développement

- **Domain-Driven Design** : Organisation par domaines métier
- **Component-Based Architecture** : Composants React modulaires et réutilisables
- **Server Components** : Utilisation des React Server Components pour les performances
- **Type Safety** : TypeScript strict mode avec inférence de types
- **Functional Programming** : Fonctions pures, immutabilité, composition

## 🛠️ Environnement de développement

### Prérequis

- Node.js 18.x ou supérieur
- npm 9.x ou supérieur
- PostgreSQL 14.x ou supérieur
- Git

### Outils de développement

- **Éditeur** : VS Code recommandé avec extensions TypeScript, Tailwind CSS
- **Linter** : ESLint avec configuration Next.js
- **Formatter** : Prettier (optionnel)
- **Type checking** : TypeScript compiler
- **Hot reload** : Next.js Fast Refresh avec Turbopack

### Configuration VS Code recommandée

```json
{
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.formatOnSave": true,
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true
	},
	"typescript.tsdk": "node_modules/typescript/lib"
}
```

## 📦 Installation et configuration

### 1. Cloner le repository

```bash
git clone https://github.com/[votre-username]/diet-clic.git
cd diet-clic
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration de l'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Base de données PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/diet_clic"

# Authentification Better Auth
BETTER_AUTH_SECRET="your-secret-key-min-32-chars"
BETTER_AUTH_URL="http://localhost:3000"

# OAuth Google (optionnel)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email avec Resend
EMAIL="admin@example.com"
RESEND_API_KEY="re_your_resend_api_key"
RESEND_DOMAIN="your-domain.com" # Optionnel

# UploadThing pour les uploads
UPLOADTHING_SECRET="sk_your_uploadthing_secret"
UPLOADTHING_APP_ID="your-app-id"

# URL publique
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 4. Initialiser la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables
npx prisma migrate dev
```

### 5. Lancer le serveur de développement

```bash
npm run dev
```

L'application sera accessible sur http://localhost:3000

## 🚀 Déploiement continu

### Protocole de déploiement

Le projet utilise un système de déploiement continu avec les étapes suivantes :

1. **Build** : Compilation TypeScript et génération des assets
2. **Tests** : Exécution des tests unitaires et de lint
3. **Optimisation** : Minification, tree-shaking, compression
4. **Déploiement** : Push vers l'environnement cible

### Environnements

- **Development** : Branche `develop`, déploiement automatique
- **Staging** : Branche `staging`, tests d'intégration
- **Production** : Branche `main`, déploiement manuel après validation

### Configuration Vercel (recommandé)

```json
{
	"buildCommand": "npm run build",
	"outputDirectory": ".next",
	"devCommand": "npm run dev",
	"installCommand": "npm install",
	"framework": "nextjs"
}
```

### Variables d'environnement de production

Configurez toutes les variables d'environnement dans votre plateforme de déploiement :

- Vercel : Project Settings > Environment Variables
- Netlify : Site Settings > Environment Variables
- Autres : Consultez la documentation de votre hébergeur

## 🔄 Intégration continue

### Protocole d'intégration

1. **Pre-commit hooks** : Lint et format du code
2. **CI Pipeline** : Tests automatisés sur chaque push
3. **Code review** : Pull request obligatoire
4. **Merge** : Intégration après validation

### Options d'implémentation

#### Option 1 : Vercel + Build Command (RECOMMANDÉE)

```json
// vercel.json
{
	"buildCommand": "npm run test:coverage && npm run lint && npm run build"
}
```

✅ **Avantages :** Simple, intégré, bloque les déploiements si tests échouent
⚠️ **Limitation :** Pas d'audit de sécurité automatique

#### Option 2 : GitHub Actions + Vercel

```yaml
# .github/workflows/ci.yml
name: CI Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - run: npm ci
      - run: npm run test:coverage
      - run: npm audit --audit-level=moderate
```

✅ **Avantages :** Contrôle total, audit sécurité, métriques détaillées

### Gestion des versions

- **Semantic Versioning** : MAJOR.MINOR.PATCH
- **Git Flow** : main, develop, feature/_, hotfix/_
- **Commits conventionnels** : feat:, fix:, docs:, etc.

## 🔒 Sécurité

### Mesures de sécurité implémentées

#### 1. Protection contre les failles OWASP Top 10

- **Injection SQL** : Utilisation de Prisma ORM avec requêtes préparées
- **Authentification** : Better Auth avec sessions sécurisées
- **XSS** : Sanitization automatique par React, CSP headers
- **CSRF** : Protection via tokens de session
- **Configuration** : Variables d'environnement pour les secrets
- **Composants vulnérables** : Audit régulier avec `npm audit`
- **Logging** : Journalisation des accès et erreurs
- **Monitoring** : Alertes sur les tentatives d'intrusion

#### 2. Headers de sécurité

```typescript
// next.config.ts
headers: [
	{
		key: "X-Content-Type-Options",
		value: "nosniff",
	},
	{
		key: "X-Frame-Options",
		value: "DENY",
	},
	{
		key: "X-XSS-Protection",
		value: "1; mode=block",
	},
	{
		key: "Referrer-Policy",
		value: "strict-origin-when-cross-origin",
	},
];
```

#### 3. Authentification et autorisation

- Sessions sécurisées avec Better Auth
- Rôles utilisateur (ADMIN, CLIENT)
- Middleware de protection des routes
- Expiration automatique des sessions
- Support OAuth2 et passkeys

#### 4. Protection des données

- Chiffrement HTTPS obligatoire
- Hashage des mots de passe
- Validation stricte des entrées avec Zod
- Sanitization des données utilisateur
- Rate limiting sur les API sensibles

## ♿ Accessibilité

### Conformité WCAG 2.1 AA

#### 1. Navigation et structure

- **Skip links** : Navigation rapide au contenu principal
- **Landmarks ARIA** : Structure sémantique claire
- **Focus visible** : Indicateurs de focus personnalisés
- **Navigation clavier** : 100% navigable au clavier

#### 2. Contenu et médias

- **Textes alternatifs** : Images décrites pour lecteurs d'écran
- **Contraste** : Ratio minimum 4.5:1 (AA)
- **Tailles de police** : Minimum 16px, redimensionnable
- **Langue** : Déclaration de langue française

#### 3. Formulaires

- **Labels associés** : Tous les champs ont des labels
- **Messages d'erreur** : Clairs et associés aux champs
- **Instructions** : Aide contextuelle disponible
- **Validation** : Feedback immédiat et accessible

#### 4. Composants interactifs

- **États ARIA** : aria-expanded, aria-current, etc.
- **Rôles ARIA** : Sémantique renforcée
- **Annonces** : Live regions pour les changements dynamiques

### Tests d'accessibilité

```bash
# Audit avec Lighthouse
npm run lighthouse

# Tests avec axe-core
npm run test:a11y
```

## 🧪 Tests

### Harnais de test unitaire

Le projet utilise **Jest** et **React Testing Library** pour les tests unitaires, configurés pour Next.js 14 avec TypeScript.

#### Configuration

```bash
# Installation des dépendances
npm install -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom @types/jest ts-jest

# Scripts disponibles
npm test          # Exécuter les tests
npm test:watch    # Mode watch
npm test:coverage # Avec couverture de code
```

#### Structure des tests

```
__tests__/
├── shared/
│   ├── actions/
│   │   └── contact.test.ts         # Tests Server Actions
│   ├── schemas/
│   │   └── contact-schema.test.ts  # Tests validation Zod
│   └── components/
│       └── emails/
│           └── contact-email-template.test.tsx
```

#### Tests de la fonctionnalité Contact

##### 1. Tests de validation (Schéma Zod)

- ✅ Validation du nom complet (format, longueur)
- ✅ Validation de l'email (format RFC)
- ✅ Validation du sujet (requis)
- ✅ Validation du message (10-2000 caractères)
- ✅ Validation des pièces jointes (max 3, URL valides)

##### 2. Tests de l'action serveur

- ✅ Envoi réussi avec données valides
- ✅ Gestion des pièces jointes
- ✅ Erreurs de validation
- ✅ Erreurs d'envoi d'email
- ✅ Cas limites (caractères spéciaux, longueur max)

##### 3. Tests du template d'email

- ✅ Rendu correct avec toutes les informations
- ✅ Gestion des options de sujet
- ✅ Affichage des pièces jointes
- ✅ Formatage du message (sauts de ligne)

#### Couverture de code

La couverture actuelle se concentre sur la fonctionnalité de contact :

- **Actions** : 89.42% (contact.ts)
- **Schémas** : 100% (contact-schema.ts)
- **Templates** : 99.44% (contact-email-template.tsx)

### Stratégie de tests

1. **Tests unitaires** : Validation de la logique métier
2. **Tests d'intégration** : Vérification des interactions
3. **Mocks** : Isolation des dépendances externes
4. **Assertions** : Vérification exhaustive des cas

### Exemple de test

```typescript
describe("contact server action", () => {
	it("should send email with valid form data", async () => {
		const formData = new FormData();
		formData.append("fullName", "Jean Dupont");
		formData.append("email", "jean@example.com");
		formData.append("subject", "consultation");
		formData.append("message", "Message de test");

		const result = await contact(undefined, formData);

		expect(result.status).toBe(ActionStatus.SUCCESS);
		expect(mockSendEmail).toHaveBeenCalled();
	});
});
```

## 📊 Performance et qualité

### Critères de performance

#### 1. Core Web Vitals

- **LCP** (Largest Contentful Paint) : < 2.5s
- **FID** (First Input Delay) : < 100ms
- **CLS** (Cumulative Layout Shift) : < 0.1

#### 2. Optimisations implémentées

- **Code splitting** : Chargement par route automatique
- **Image optimization** : Next/Image avec formats modernes
- **Font optimization** : Préchargement des polices
- **Caching** : Headers de cache optimisés
- **Compression** : Gzip/Brotli activé
- **Lazy loading** : Composants et images

#### 3. Monitoring

```typescript
// Exemple de monitoring des performances
export function reportWebVitals(metric: NextWebVitalsMetric) {
	if (metric.label === "web-vital") {
		console.log(metric);
		// Envoyer à votre service d'analytics
	}
}
```

### Critères de qualité

- **TypeScript** : Mode strict, 0 erreurs
- **ESLint** : 0 warnings, règles Next.js
- **Build** : 0 erreurs, bundle size optimisé
- **Accessibilité** : Score Lighthouse > 95
- **SEO** : Score Lighthouse 100

## 📚 Documentation technique

### Architecture détaillée

#### 1. Flux de données

```mermaid
graph TD
    A[Client Browser] --> B[Next.js Frontend]
    B --> C[Server Actions]
    C --> D[Prisma ORM]
    D --> E[PostgreSQL]
    C --> F[External APIs]
    F --> G[Resend Email]
    F --> H[UploadThing]
```

#### 2. Modèle de données

```prisma
model User {
  id              String   @id
  name            String
  email           String   @unique
  role            UserRole @default(CLIENT)
  emailVerified   Boolean
  sessions        Session[]
  accounts        Account[]
  contactRequests ContactRequest[]
}

model ContactRequest {
  id          String @id @default(cuid())
  firstName   String
  lastName    String
  email       String
  phone       String?
  subject     String
  message     String
  status      ContactStatus @default(PENDING)
  createdAt   DateTime @default(now())
  user        User? @relation(...)
}
```

#### 3. Patterns et conventions

- **Naming** : camelCase pour les variables, PascalCase pour les composants
- **Structure** : Un composant par fichier, index.ts pour les exports
- **Types** : Interfaces pour les props, types pour le reste
- **Async** : Server Actions pour les mutations, SWR/React Query pour les queries

### API Documentation

#### Server Actions

```typescript
// Contact form submission
export async function submitContactForm(data: ContactFormData) {
  // Validation avec Zod
  const validated = contactSchema.parse(data)

  // Sauvegarde en base
  const contact = await prisma.contactRequest.create({
    data: validated
  })

  // Envoi email
  await sendEmail({
    to: process.env.EMAIL,
    subject: `Nouveau contact: ${validated.subject}`,
    react: <ContactEmailTemplate {...validated} />
  })

  return { success: true, id: contact.id }
}
```

## 📖 Manuels

### Manuel de déploiement

#### 1. Prérequis de production

- Node.js 18.x LTS
- PostgreSQL 14.x+
- Domaine avec SSL
- Compte Resend vérifié
- Variables d'environnement configurées

#### 2. Étapes de déploiement

```bash
# 1. Build de production
npm run build

# 2. Migration de base de données
npx prisma migrate deploy

# 3. Démarrage du serveur
npm start
```

#### 3. Configuration serveur

```nginx
# Exemple Nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Manuel d'utilisation

#### Pour les administrateurs

1. **Connexion** : `/auth/signin` avec email/mot de passe
2. **Dashboard** : Vue d'ensemble des contacts
3. **Gestion contacts** : Filtrage, tri, export
4. **Paramètres** : Configuration du profil

#### Pour les développeurs

1. **Installation locale** : Suivre le guide d'installation
2. **Ajout de fonctionnalités** : Créer une branche feature/\*
3. **Tests** : Écrire les tests avant le merge
4. **Documentation** : Mettre à jour ce README

### Manuel de mise à jour

#### 1. Mise à jour des dépendances

```bash
# Vérifier les mises à jour
npm outdated

# Mettre à jour (prudent)
npm update

# Mise à jour majeure
npm install package@latest
```

#### 2. Mise à jour de la base de données

```bash
# Créer une migration
npx prisma migrate dev --name description_of_change

# Appliquer en production
npx prisma migrate deploy
```

#### 3. Rollback

```bash
# Revenir à la version précédente
git checkout tags/v1.0.0

# Restaurer la base de données
npx prisma migrate resolve --rolled-back
```

## 🎯 Cahier de recettes

### Tests fonctionnels

1. **Page d'accueil**
   - [ ] Affichage correct sur mobile/desktop
   - [ ] Navigation fonctionnelle
   - [ ] Animations fluides
   - [ ] Liens actifs

2. **Formulaire de contact**
   - [ ] Validation des champs
   - [ ] Messages d'erreur clairs
   - [ ] Envoi d'email réussi
   - [ ] Message de confirmation

3. **Authentification**
   - [ ] Connexion email/password
   - [ ] Connexion Google OAuth
   - [ ] Déconnexion
   - [ ] Gestion des erreurs

4. **Dashboard admin**
   - [ ] Accès protégé
   - [ ] Liste des contacts
   - [ ] Filtres fonctionnels
   - [ ] Actions sur les contacts

### Tests de sécurité

- [ ] Injection SQL impossible
- [ ] XSS bloqué
- [ ] CSRF protégé
- [ ] Headers de sécurité présents
- [ ] Sessions sécurisées

### Tests de performance

- [ ] Temps de chargement < 3s
- [ ] Score Lighthouse > 90
- [ ] Pas de memory leaks
- [ ] Bundle size optimisé

## 🐛 Plan de correction des bogues

### Processus de gestion des bugs

1. **Identification** : Issue GitHub avec template
2. **Priorisation** : P0 (critique) à P3 (mineur)
3. **Assignation** : Développeur responsable
4. **Correction** : Branch hotfix/\* pour P0/P1
5. **Validation** : Tests + code review
6. **Déploiement** : Selon la priorité

### Template de bug report

```markdown
## Description

Brève description du bug

## Étapes de reproduction

1. Aller sur...
2. Cliquer sur...
3. Observer...

## Comportement attendu

Ce qui devrait se passer

## Comportement actuel

Ce qui se passe réellement

## Environnement

- Browser:
- OS:
- Version:

## Screenshots

Si applicable
```

## 📞 Support

- **Documentation Next.js** : https://nextjs.org/docs
- **Documentation Prisma** : https://www.prisma.io/docs
- **Documentation Better Auth** : https://better-auth.com
- **Issues GitHub** : [Lien vers les issues]
- **Contact développeur** : [Email du développeur]

---

_Dernière mise à jour : [Date]_
_Version : 1.0.0_
