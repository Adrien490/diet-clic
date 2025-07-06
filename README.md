# Manon Diététique - Site Web

Site web professionnel pour Manon Chaillou, diététicienne nutritionniste.

## Technologies utilisées

- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Resend** - Service d'envoi d'emails
- **UploadThing** - Gestion des fichiers uploadés
- **Zod** - Validation des données
- **React Hook Form** - Gestion des formulaires

## Installation

1. Clonez le repository :

```bash
git clone <repository-url>
cd diet-clic
```

2. Installez les dépendances :

```bash
npm install
```

3. Configurez les variables d'environnement :
   - Créez un fichier `.env.local` à la racine du projet
   - Copiez le contenu de `.env.example` et remplissez les valeurs

4. Lancez le serveur de développement :

```bash
npm run dev
```

## Configuration des emails

Le site utilise [Resend](https://resend.com) pour l'envoi d'emails avec une méthode générique réutilisable.

### Variables d'environnement requises

```env
# Email de l'administrateur (destinataire des messages)
ADMIN_EMAIL=votre-email@exemple.com

# Clé API Resend (obligatoire)
RESEND_API_KEY=re_votre_cle_api_resend

# Domaine Resend (optionnel - utilise onboarding@resend.dev par défaut)
RESEND_DOMAIN=votre-domaine.com

# URL du site (pour la production)
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

### Configuration Resend

1. **Créer un compte Resend** sur [resend.com](https://resend.com)
2. **Obtenir votre clé API** dans le dashboard Resend
3. **(Optionnel) Vérifier votre domaine** pour l'envoi d'emails personnalisés
4. **Sans domaine vérifié** : L'application utilise automatiquement `onboarding@resend.dev`

### Utilisation de la méthode sendEmail

#### Méthode générique

```typescript
import { sendEmail } from "./shared/actions/send-email";

// Email simple avec HTML
await sendEmail({
	to: "destinataire@exemple.com",
	subject: "Mon sujet",
	html: "<h1>Bonjour</h1><p>Mon message</p>",
});

// Email avec template React
await sendEmail({
	to: ["user1@exemple.com", "user2@exemple.com"],
	subject: "Email avec template",
	react: MonTemplateReact({ data: "valeurs" }),
	from: "nom@mon-domaine.com", // Optionnel
	replyTo: "reponse@mon-domaine.com", // Optionnel
});
```

#### Utilisation pour les emails de contact

```typescript
import { sendEmail } from "./shared/actions/send-email";
import { ContactEmailTemplate } from "./shared/components/email-template";

// Email de contact avec template React
await sendEmail({
	to: process.env.ADMIN_EMAIL,
	subject: "Nouvelle demande de contact",
	react: ContactEmailTemplate({
		fullName: "John Doe",
		email: "john@exemple.com",
		subject: "Demande d'information",
		message: "Je souhaite plus d'informations...",
		attachment: ["https://exemple.com/fichier.pdf"],
	}),
	replyTo: "john@exemple.com",
});
```

### Exemples d'utilisation

La méthode `sendEmail` est générique et peut être utilisée pour tous types d'emails :

- Emails simples avec HTML
- Templates React personnalisés
- Destinataires multiples
- Pièces jointes

## Configuration UploadThing

Pour la gestion des pièces jointes :

1. **Créez un compte** sur [uploadthing.com](https://uploadthing.com)
2. **Créez une nouvelle app** et obtenez vos identifiants
3. **Ajoutez à votre `.env.local`** :

```env
UPLOADTHING_SECRET=sk_live_votre_secret
UPLOADTHING_APP_ID=votre_app_id
```

## Fonctionnalités

- **Page d'accueil** avec présentation des services
- **Section À propos** avec parcours et valeurs
- **Services** détaillés avec descriptions
- **FAQ** avec questions fréquentes
- **Formulaire de contact** avec :
  - Validation des données avec Zod
  - Upload de pièces jointes via UploadThing
  - Envoi d'emails avec server action et template React professionnel
  - Gestion d'erreurs complète
- **Système d'emails générique** :
  - Méthode réutilisable pour différents types d'emails
  - Support HTML et templates React
  - Configuration automatique de l'expéditeur
  - Gestion des pièces jointes

## Scripts disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run start` - Serveur de production
- `npm run lint` - Vérification du code

## Structure du projet

```
diet-clic/
├── app/                    # App Router Next.js
│   ├── api/               # Routes API
│   ├── contact/           # Page de contact
│   └── ...
├── shared/                # Composants et utilitaires partagés
│   ├── components/        # Composants React
│   ├── actions/           # Server Actions
│   │   ├── send-email.ts  # Méthode générique d'envoi d'emails
│   │   └── contact.ts     # Actions spécifiques au contact
│   ├── examples/          # Exemples d'utilisation
│   ├── schemas/           # Schémas de validation
│   └── ...
└── public/               # Assets statiques
```

## Déploiement

1. **Configurez les variables d'environnement** sur votre plateforme de déploiement
2. **(Optionnel) Vérifiez votre domaine** sur Resend pour un email personnalisé
3. **Mettez à jour** `NEXT_PUBLIC_SITE_URL` avec votre URL de production
4. **Déployez** avec votre plateforme préférée (Vercel, Netlify, etc.)

## Support

Pour toute question ou problème, consultez la documentation des services utilisés :

- [Next.js Documentation](https://nextjs.org/docs)
- [Resend Documentation](https://resend.com/docs)
- [UploadThing Documentation](https://docs.uploadthing.com)
