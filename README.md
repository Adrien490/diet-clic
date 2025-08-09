# Diet-Clic – Application Web pour Diététicienne Nutritionniste

> **BLOC 2 : CONCEVOIR ET DÉVELOPPER DES APPLICATIONS LOGICIELLES**

**Production :** [https://diet-clic.vercel.app](https://diet-clic.vercel.app)

---

## 📋 Sommaire

- [1. Architecture & Technologies](#1-architecture--technologies)
- [2. Environnements & CI/CD](#2-environnements--cicd)
  - [2.1 C2.1.1 – Environnements de déploiement & test](#21-c211--environnements-de-déploiement--test)
  - [2.2 C2.1.2 – Intégration continue](#22-c212--intégration-continue)
- [3. Conception & Développement](#3-conception--développement)
  - [3.1 C2.2.1 – Prototype](#31-c221--prototype)
  - [3.2 C2.2.2 – Harnais de tests unitaires](#32-c222--harnais-de-tests-unitaires)
  - [3.3 C2.2.3 – Évolutivité, sécurité, accessibilité](#33-c223--évolutivité-sécurité-accessibilité)
  - [3.4 C2.2.4 – Déploiement continu](#34-c224--déploiement-continu)
- [4. Tests & Qualité](#4-tests--qualité)
  - [4.1 C2.3.1 – Cahier de recettes](#41-c231--cahier-de-recettes)
  - [4.2 C2.3.2 – Plan de correction des bogues](#42-c232--plan-de-correction-des-bogues)
- [5. Documentation d'Exploitation (C2.4.1)](#5-documentation-dexploitation-c241)
  - [5.1 Manuel de déploiement](#51-manuel-de-déploiement)
  - [5.2 Manuel d'utilisation](#52-manuel-dutilisation)
  - [5.3 Manuel de mise à jour](#53-manuel-de-mise-à-jour)
- [6. Conformité & Données (RGPD)](#6-conformité--données-rgpd)
- [7. Annexes](#7-annexes)

---

## 1. Architecture & Technologies

**Frontend :** Next.js 15, React 19, TypeScript strict
**Backend :** Next.js API Routes + Server Actions, Prisma ORM
**Base de données :** PostgreSQL
**Auth :** Better Auth (OAuth + Passkeys)
**UI :** Tailwind CSS 4, Radix UI, shadcn/ui
**Tests :** Jest + React Testing Library (RTL)
**Déploiement :** Vercel (Git Integration)
**Observabilité :** Sentry (Errors, Performance)

### Architecture (DDD léger)

```
app/              # App Router
  (public)/       # Routes publiques
  (protected)/    # Routes protégées
  api/            # API Routes
  auth/           # Pages d'auth

domains/          # Logique métier par domaines
  auth/
  user/

shared/
  components/     # UI réutilisable
  actions/        # Server Actions
  hooks/
  utils/
  schemas/        # Validation Zod

prisma/           # Schéma & migrations
```

### Choix Techniques Justifiés

| Technologie     | Alternative Évaluée | Justification du Choix                  |
| --------------- | ------------------- | --------------------------------------- |
| **Next.js 15**  | Nuxt.js, Gatsby     | SSR natif, App Router, écosystème React |
| **Better Auth** | NextAuth, Clerk     | Passkeys natifs, configuration simple   |
| **Prisma ORM**  | Drizzle, TypeORM    | Type-safety, migrations versioning      |
| **Radix UI**    | Chakra, Mantine     | Accessibilité native, personnalisation  |
| **Vercel**      | Netlify, Railway    | Intégration Next.js, CI/CD zéro-config  |

---

## 2. Environnements & CI/CD

### Matrice des environnements

| Environnement  | Usage        | Particularités                      |
| -------------- | ------------ | ----------------------------------- |
| **Local**      | Dev locale   | Hot reload, logs verbeux, DB locale |
| **Preview**    | PR/feature   | Vercel Preview, DB staging          |
| **Production** | Utilisateurs | Monitoring complet, Sentry          |

---

### 2.1 C2.1.1 – Environnements de déploiement & test

#### Environnement de Développement Détaillé

**Poste de Développement :**

- **Éditeur :** IDE moderne avec :
  - ESLint intégré
  - Prisma ORM avec auto-complétion
  - Tailwind CSS IntelliSense
  - TypeScript strict
  - Support Git intégré

#### Protocole de Déploiement Continu (CD)

1. **Push vers GitHub** (`feature/*`, `fix/*`)
2. **Build Vercel** : lint + typecheck + tests + build
3. **Prévisualisation** : déploiement Vercel Preview
4. **Validation** : recette + Sentry (erreurs/perfs)
5. **Merge sur `main`** : déploiement Production
6. **Migrations** : `prisma migrate deploy`

#### Composants Techniques Identifiés

| Composant                 | Technologie            | Rôle                       | Preuve                  |
| ------------------------- | ---------------------- | -------------------------- | ----------------------- |
| **Compilateur**           | TypeScript 5.x         | Transformation TS → JS     | `tsc --noEmit`          |
| **Serveur d'application** | Next.js 15 (Node 20.x) | Rendu pages, API Routes    | Build artifacts Vercel  |
| **Gestion de sources**    | Git + GitHub           | Versioning                 | Repository GitHub       |
| **Runner de tests**       | Jest 30.x              | Exécution tests unitaires  | Coverage reports        |
| **Build System**          | Next.js + Turbopack    | Compilation optimisée      | `.next/` output         |
| **Base de données**       | PostgreSQL 15 + Prisma | Persistance + migrations   | `prisma migrate status` |
| **Audit Performance**     | Lighthouse CLI         | Métriques CWV (script npm) | `npm run lighthouse`    |
| **Audit Accessibilité**   | pa11y                  | Tests a11y (script npm)    | `npm run test:a11y`     |

#### Critères Qualité & Performance (SLO)

**Service Level Objectives (SLO) :**

| Métrique             | Objectif     | Mesure Actuelle | Évidence                |
| -------------------- | ------------ | --------------- | ----------------------- |
| **Taux d'erreur**    | < 1%         | À mesurer       | Sentry Issues           |
| **Lighthouse**       | ≥ 90         | À mesurer       | `npm run lighthouse`    |
| **Couverture tests** | ≥ 80% global | 12.8% global    | `npm run test:coverage` |

---

### 2.2 C2.1.2 – Intégration continue

**Stratégie Git**

- Branches `feature/*` et `fix/*`
- Commits directs sur `main` possibles
- Conventional Commits recommandés

#### Badge de Couverture

![Coverage Badge](https://img.shields.io/badge/coverage-12.8%25-red)

**Qualité du Code :**

- ESLint + TypeScript strict configurés
- Tests unitaires Jest (contact uniquement)
- Build validation dans Vercel

---

## 3. Conception & Développement

### 3.1 C2.2.1 – Prototype

**Objectif :** Site vitrine professionnel + gestion des demandes de contact.

#### Présentation du Prototype Réalisé

**Version actuelle :** v0.1.0 - Déployée sur Vercel

#### User Stories Détaillées

**US-VIS-01 : Consultation des prestations**

> En tant que **visiteur**, je veux consulter les prestations de diététique proposées afin de choisir la consultation adaptée à mes besoins.

**Critères d'acceptation :**

- Affichage des types de consultation (individuelle/groupe)
- Tarifs transparents et détaillés
- Interface responsive desktop/mobile/tablette

**US-VIS-02 : Envoi demande de contact**

> En tant que **patient potentiel**, je veux envoyer une demande de contact avec mes informations et besoins spécifiques afin d'être recontacté par la diététicienne.

**Critères d'acceptation :**

- Formulaire avec validation temps réel
- Upload de pièces jointes (max 3, 4MB)
- Confirmation d'envoi + email de réception

**US-ADM-01 : Gestion des contacts**

> En tant qu'**administrateur (diététicienne)**, je veux accéder à un dashboard sécurisé pour gérer les demandes de contact et suivre les consultations.

**Critères d'acceptation :**

- Authentification sécurisée (OAuth + passkeys)
- Liste avec filtres par statut et date
- Actions : traiter, archiver, ajouter notes

#### Ergonomie Multi-Équipements

**Breakpoints Responsive :**

| Appareil     | Résolution     | Adaptations                                         |
| ------------ | -------------- | --------------------------------------------------- |
| **Mobile**   | 375px - 767px  | Menu hamburger, boutons tactiles, formulaire stacké |
| **Tablette** | 768px - 1023px | Navigation horizontale, grille 2 colonnes           |
| **Desktop**  | 1024px+        | Layout complet, sidebar, interactions hover         |

---

### 3.2 C2.2.2 – Harnais de tests unitaires

**Outils** : Jest, RTL, jsdom, mocks (Resend, UploadThing)
**Couverture** : 46 tests (contact) – actions serveur, schémas Zod, templates email

#### Couverture Réelle (Dernière Exécution)

**Résultats Par Fichier :**

| Fichier                      | Statements | Branches  | Functions | Lines     | Statut             |
| ---------------------------- | ---------- | --------- | --------- | --------- | ------------------ |
| `contact.ts`                 | 89.42%     | 86.67%    | 100%      | 89.42%    | ✅ PASS            |
| `contact-schema.ts`          | 100%       | 100%      | 100%      | 100%      | ✅ PASS            |
| `contact-email-template.tsx` | 99.44%     | 40%       | 100%      | 99.44%    | ✅ PASS            |
| **GLOBAL (Contact)**         | **89.4%**  | **86.2%** | **100%**  | **89.4%** | ✅ **PASS**        |
| **GLOBAL (Projet complet)**  | **12.8%**  | **10.2%** | **8.5%**  | **12.8%** | ⚠️ **À améliorer** |

---

### 3.3 C2.2.3 – Évolutivité, sécurité, accessibilité

#### Tableau OWASP - Couverture Sécurité

| Faille                                 | Contrôle                    | Test                    | Preuve                            |
| -------------------------------------- | --------------------------- | ----------------------- | --------------------------------- |
| **A01 - Broken Access Control**        | Middleware auth + RBAC      | Rôles ADMIN/CLIENT      | `middleware.ts` + `UserRole` enum |
| **A02 - Cryptographic Failures**       | HTTPS + env secrets         | npm audit               | `npm audit` 0 vulnerabilities     |
| **A03 - Injection**                    | Prisma ORM + Zod validation | Tests payloads hostiles | `contact-schema.test.ts`          |
| **A04 - Insecure Design**              | Security by design          | DDD + Auth patterns     | Architecture DDD + Better Auth    |
| **A05 - Security Misconfiguration**    | Headers sécurité + CSP      | Configuration headers   | `next.config.ts` + `vercel.json`  |
| **A06 - Vulnerable Components**        | npm audit                   | Audit automatique       | `npm audit` clean report          |
| **A07 - Identification/Auth Failures** | Better Auth + passkeys      | Session + role checks   | `auth.ts` + `getSession()`        |
| **A08 - Software/Data Integrity**      | Build reproductible         | Vercel build hash       | Build artifacts Vercel            |
| **A09 - Security Logging Failures**    | Sentry                      | Monitoring actif        | `sentry.server.config.ts`         |
| **A10 - Server-Side Request Forgery**  | Prisma + validation input   | Zod schema validation   | `contact-schema.ts` validation    |

#### Accessibilité WCAG 2.1 AA

**Référentiel choisi :** WCAG 2.1 AA + RGAA 4.1 (aligné)

**Justification :**

- Standard international reconnu
- Niveau AA = équilibre accessibilité/faisabilité
- RGAA 4.1 pour conformité légale française
- Radix UI implémente nativement WCAG

#### Upload et Gestion des Fichiers

**Types MIME Autorisés :**

- Documents : PDF, DOC, DOCX
- Images : JPEG, PNG, WebP
- Taille max : 4MB par fichier
- Limitation : 3 fichiers par soumission

**Politique de Sécurité :**

```typescript
const allowedMimeTypes = [
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"image/jpeg",
	"image/png",
	"image/webp",
];

// Stockage : UploadThing S3 avec chiffrement
// Rétention : 2 ans puis purge automatique (RGPD)
```

---

### 3.4 C2.2.4 – Déploiement continu

#### Déploiement Automatique

**Stratégie actuelle :**

- Push sur `main` → déploiement automatique Vercel
- Preview deployments sur toutes les branches
- Variables d'environnement gérées dans Vercel

#### Traçabilité des Versions

**Variables d'environnement Vercel disponibles :**

- `VERCEL_GIT_COMMIT_SHA` : Hash du commit
- `VERCEL_GIT_COMMIT_REF` : Branche source
- `VERCEL_ENV` : Environnement (production/preview)
- `npm_package_version` : Version du package.json

#### VCS et Traçabilité

- **GitHub** : Repository public
- **Déploiement** : Vercel auto sur main et preview sur PR
- **Migrations** : `prisma migrate deploy` à chaque déploiement
- **Monitoring** : Sentry release health
- **Rollback** : redeploy build précédent dans Vercel

---

## 4. Tests & Qualité

### 4.1 C2.3.1 – Cahier de recettes

#### Tests Fonctionnels Implémentés

**Tests unitaires actuels :**

- Validation du schéma de contact (Zod)
- Action serveur de contact
- Template email de contact
- 46 tests au total pour le module contact

#### Tests Manuels Recommandés

| Test                   | Description                   | Statut     |
| ---------------------- | ----------------------------- | ---------- |
| **Formulaire Contact** | Envoi avec toutes les données | À tester   |
| **Upload Fichiers**    | Test limites (taille, nombre) | À tester   |
| **Dashboard Admin**    | Connexion et gestion contacts | À tester   |
| **Responsive**         | Test sur différents appareils | À tester   |
| **Performance**        | Lighthouse audit              | À exécuter |
| **Accessibilité**      | pa11y audit                   | À exécuter |

---

### 4.2 C2.3.2 – Plan de correction des bogues

#### Processus de Gestion des Bugs

1. **Détection** : Via utilisateurs, monitoring Sentry, ou tests
2. **Documentation** : Issue GitHub avec reproduction
3. **Priorisation** : P0 (critique) à P3 (mineur)
4. **Correction** : Branche `fix/*` avec tests
5. **Validation** : Tests locaux + review
6. **Déploiement** : Via Vercel automatique

#### Template Issue GitHub

```markdown
## Description

[Description claire du bug]

## Étapes de reproduction

1. ...
2. ...

## Comportement attendu

[Ce qui devrait se passer]

## Comportement observé

[Ce qui se passe réellement]

## Environnement

- Browser:
- OS:
- Version:
```

---

## 5. Documentation d'Exploitation (C2.4.1)

### 5.1 Manuel de déploiement

#### Prérequis Techniques

**Environnement Local :**

- Node.js 20.x LTS
- PostgreSQL 15.x
- Git 2.x

**Comptes Externes :**

- Vercel (déploiement)
- Sentry (monitoring)
- Resend (emails)
- UploadThing (fichiers)

#### Procédure de Déploiement Local

```bash
# Clone du repository
git clone https://github.com/diet-clic/diet-clic.git
cd diet-clic

# Installation des dépendances
npm ci

# Variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec les valeurs

# Base de données
npx prisma generate
npx prisma migrate dev

# Lancement
npm run dev
```

#### Configuration des Services Externes

**Sentry :**

```bash
SENTRY_DSN="https://xxx@xxx.ingest.sentry.io/xxx"
SENTRY_ENVIRONMENT="production"
```

**Resend (Emails) :**

```bash
RESEND_API_KEY="re_xxx"
RESEND_FROM_EMAIL="noreply@diet-clic.com"
RESEND_TO_EMAIL="contact@diet-clic.com"
```

**UploadThing (Fichiers) :**

```bash
UPLOADTHING_SECRET="sk_live_xxx"
UPLOADTHING_APP_ID="xxx"
```

---

### 5.2 Manuel d'utilisation

#### Guide Administrateur

**Connexion au Dashboard :**

1. Aller sur `https://diet-clic.com/auth/signin`
2. Cliquer "Connexion Google" ou utiliser passkey
3. Redirection automatique vers `/dashboard`

**Gestion des Contacts :**

| Action                     | Procédure                                    |
| -------------------------- | -------------------------------------------- |
| **Voir nouveaux contacts** | Dashboard > Filtre "Nouveau"                 |
| **Traiter une demande**    | Clic contact > "Changer statut" > "En cours" |
| **Rechercher un contact**  | Barre recherche > Nom ou email               |

#### Guide Visiteur

**Envoi d'une demande de contact :**

1. **Navigation :** Aller sur la page d'accueil
2. **Section Contact :** Scroll vers le formulaire ou clic menu "Contact"
3. **Remplissage :**
   - Nom complet (requis)
   - Email valide (requis)
   - Sujet de consultation (liste déroulante)
   - Message détaillé (10-500 caractères)
   - Pièces jointes (optionnel, max 3 fichiers de 4MB)
4. **Envoi :** Clic "Envoyer le message"
5. **Confirmation :** Message de succès

---

### 5.3 Manuel de mise à jour

#### Procédure de Mise à Jour

```bash
# Sauvegarde base de données (si locale)
pg_dump dietclic > backup_$(date +%Y%m%d).sql

# Mise à jour du code
git pull origin main

# Mise à jour des dépendances
npm ci

# Migrations base de données
npx prisma migrate deploy

# Rebuild
npm run build

# Redémarrage
npm run start
```

#### Déploiement Production

Le déploiement en production est automatique :

1. Push sur la branche `main`
2. Vercel détecte le changement
3. Build et déploiement automatiques
4. Migrations Prisma exécutées

---

## 6. Conformité & Données (RGPD)

### Registre des Traitements

| Traitement                 | Finalité              | Base légale      | Données                 | Durée            |
| -------------------------- | --------------------- | ---------------- | ----------------------- | ---------------- |
| **Demandes contact**       | Gestion consultations | Intérêt légitime | Nom, email, message     | 2 ans            |
| **Authentification admin** | Accès dashboard       | Contrat          | Email, profil OAuth     | Durée du contrat |
| **Logs erreurs**           | Debugging             | Intérêt légitime | IP (hashée), User-Agent | 90 jours         |

### Sous-traitants et DPA

| Sous-traitant   | Service           | Données transférées | Transfert hors UE |
| --------------- | ----------------- | ------------------- | ----------------- |
| **Vercel**      | Hébergement       | Toutes données app  | 🇺🇸 USA (SCCs)     |
| **Sentry**      | Monitoring        | Logs d'erreur       | 🇺🇸 USA (SCCs)     |
| **Resend**      | Emails            | Nom, email contact  | 🇺🇸 USA (SCCs)     |
| **UploadThing** | Stockage fichiers | Fichiers joints     | 🇺🇸 USA (SCCs)     |

### Mesures de Sécurité

- **Chiffrement :** TLS 1.3 transport
- **Accès :** Authentification OAuth + passkeys
- **Audit :** Logs Sentry
- **Minimisation :** Collecte strictement nécessaire

---

## 7. Annexes

### 7.1 Variables d'environnement

```bash
# Base de données
DATABASE_URL="postgresql://user:pass@host:5432/db"
DIRECT_URL="postgresql://user:pass@host:5432/db"

# Auth
BETTER_AUTH_SECRET="xxx"
BETTER_AUTH_URL="https://diet-clic.com"
GOOGLE_CLIENT_ID="xxx"
GOOGLE_CLIENT_SECRET="xxx"

# Services externes
RESEND_API_KEY="re_xxx"
UPLOADTHING_SECRET="sk_live_xxx"
UPLOADTHING_APP_ID="xxx"

# Monitoring
SENTRY_DSN="https://xxx@xxx.ingest.sentry.io/xxx"
NEXT_PUBLIC_SENTRY_DSN="https://xxx@xxx.ingest.sentry.io/xxx"
SENTRY_ENVIRONMENT="production"
```

### 7.2 Commit Convention (Conventional Commits)

`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:` …
**Versioning** : SemVer, tags `vX.Y.Z`

### 7.3 Règles de sécurité HTTP (Next.js)

```ts
// next.config.ts (extrait)
const securityHeaders = [
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "X-Frame-Options", value: "DENY" },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{
		key: "Strict-Transport-Security",
		value: "max-age=63072000; includeSubDomains; preload",
	},
];
```

---
