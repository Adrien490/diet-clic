# 📋 Cahier de Recettes - Diet-Clic

## 1. Tests Fonctionnels Détaillés

### FR-001 : Page d'accueil

**Objectif :** Vérifier l'affichage et la navigation de la page d'accueil

#### Scénario 1.1 : Affichage responsive

- **Prérequis :** Navigateur ouvert
- **Actions :**
  1. Aller sur https://diet-clic.vercel.app
  2. Tester sur desktop (1920x1080)
  3. Tester sur mobile (375x667)
  4. Tester sur tablette (768x1024)
- **Résultat attendu :** Layout s'adapte sans scroll horizontal, contenu lisible
- **Critères d'acceptation :**
  - Pas de débordement horizontal
  - Police minimum 16px
  - Éléments cliquables ≥ 44px

#### Scénario 1.2 : Navigation principale

- **Actions :**
  1. Cliquer sur "À propos"
  2. Cliquer sur "Prestations"
  3. Cliquer sur "FAQ"
  4. Cliquer sur "Contact"
- **Résultat attendu :** Ancres fonctionnelles, animations fluides
- **Critères d'acceptation :** Défilement fluide < 1s

### FR-002 : Formulaire de contact

**Objectif :** Vérifier la validation et l'envoi du formulaire

#### Scénario 2.1 : Validation des champs

- **Actions :**
  1. Laisser "Nom complet" vide → soumettre
  2. Saisir "J" dans "Nom complet" → soumettre
  3. Saisir "email-invalide" → soumettre
  4. Saisir message < 10 caractères → soumettre
- **Résultat attendu :** Messages d'erreur appropriés affichés
- **Critères d'acceptation :**
  - "Le nom et prénom sont requis" pour champ vide
  - "L'email doit être valide" pour format incorrect
  - "Le message doit contenir au moins 10 caractères"

#### Scénario 2.2 : Envoi réussi

- **Actions :**
  1. Remplir tous les champs correctement
  2. Soumettre le formulaire
- **Résultat attendu :**
  - Message de confirmation affiché
  - Email reçu par l'administrateur
  - Formulaire réinitialisé
- **Critères d'acceptation :** Email reçu dans les 30 secondes

### FR-003 : Authentification

**Objectif :** Vérifier le système d'authentification

#### Scénario 3.1 : Connexion email/password

- **Actions :**
  1. Aller sur /auth/signin
  2. Saisir email valide + password incorrect
  3. Saisir email + password corrects
- **Résultat attendu :**
  - Erreur affichée pour password incorrect
  - Redirection vers dashboard si succès

#### Scénario 3.2 : OAuth Google

- **Actions :**
  1. Cliquer sur "Se connecter avec Google"
  2. Autoriser l'application
- **Résultat attendu :** Connexion réussie, redirection dashboard

## 2. Tests de Sécurité

### SEC-001 : Protection OWASP

#### Test 2.1 : Injection SQL

- **Action :** Saisir `'; DROP TABLE users; --` dans les champs
- **Résultat attendu :** Données traitées comme string, pas d'injection

#### Test 2.2 : XSS

- **Action :** Saisir `<script>alert('XSS')</script>` dans le formulaire
- **Résultat attendu :** Script échappé, pas d'exécution

#### Test 2.3 : Headers de sécurité

- **Action :** Inspecter les headers HTTP
- **Résultat attendu :**
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - X-XSS-Protection: 1; mode=block

### SEC-002 : Authentification

#### Test 2.4 : Accès routes protégées

- **Action :** Aller sur /dashboard sans être connecté
- **Résultat attendu :** Redirection vers /auth/signin

## 3. Tests de Performance

### PERF-001 : Core Web Vitals

#### Test 3.1 : Lighthouse Audit

- **Action :** Exécuter Lighthouse sur la page d'accueil
- **Critères d'acceptation :**
  - Performance Score ≥ 90
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

#### Test 3.2 : Temps de chargement

- **Action :** Mesurer le temps de First Contentful Paint
- **Résultat attendu :** FCP < 1.8s

## 4. Tests d'Accessibilité

### A11Y-001 : Navigation clavier

#### Test 4.1 : Navigation Tab

- **Action :** Naviguer uniquement au clavier (Tab/Shift+Tab)
- **Résultat attendu :** Tous les éléments interactifs accessibles

#### Test 4.2 : Lecteur d'écran

- **Action :** Tester avec VoiceOver/NVDA
- **Résultat attendu :** Contenu annoncé correctement

### A11Y-002 : Contraste et visibilité

#### Test 4.3 : Contraste des couleurs

- **Action :** Vérifier les ratios de contraste
- **Résultat attendu :** Ratio ≥ 4.5:1 (AA)

#### Test 4.4 : Zoom 200%

- **Action :** Zoomer à 200%
- **Résultat attendu :** Contenu lisible, pas de scroll horizontal

## 5. Tests de Régression

### REG-001 : Après mise à jour

- Réexécuter tous les tests fonctionnels
- Vérifier la compatibilité des nouvelles fonctionnalités
- Contrôler les performances

## 6. Critères de Validation Globaux

### Critères d'acceptation pour la recette :

- ✅ 100% des tests fonctionnels passent
- ✅ 0 vulnérabilité critique de sécurité
- ✅ Score Lighthouse ≥ 90 sur tous les domaines
- ✅ 100% des tests d'accessibilité AA passent
- ✅ 0 régression détectée

### Critères de non-acceptation (bloquants) :

- ❌ Formulaire de contact non fonctionnel
- ❌ Authentification défaillante
- ❌ Faille de sécurité critique
- ❌ Inaccessibilité majeure
- ❌ Performance < 70 sur Lighthouse
