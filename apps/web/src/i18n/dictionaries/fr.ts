import { NavigationKey } from '@/components/dashboard';

import { Dictionary } from './en';

export const fr: Dictionary = {
  nav: {
    vision: 'Vision',
    features: 'Fonctionnalités',
    architecture: 'Architecture',
    values: 'Valeurs',
  },
  hero: {
    badge: 'Foi · Communauté · Paix',
    title: 'Renforcer la Foi par la Technologie',
    subtitle:
      "Une plateforme conçue pour soutenir la croissance spirituelle, la construction de communauté et l'apprentissage basé sur la foi à l'ère numérique.",
    cta: {
      primary: 'Commencer',
      secondary: 'En Savoir Plus',
    },
  },
  vision: {
    badge: 'Notre Vision',
    title: "Construire l'Avenir de la Foi Numérique",
    description:
      'Nous envisageons un monde où la technologie sert de pont vers une connexion spirituelle plus profonde, un engagement communautaire et une croissance significative dans la foi.',
    principles: {
      community: {
        title: "Communauté d'Abord",
        desc: 'Créer des espaces où les croyants peuvent se connecter, partager et grandir ensemble dans une communion authentique.',
      },
      scripture: {
        title: "Centré sur l'Écriture",
        desc: 'Ancrer chaque fonctionnalité et interaction dans la vérité et la sagesse bibliques.',
      },
      accessible: {
        title: 'Accessible à Tous',
        desc: 'Garantir que les ressources spirituelles et la communauté sont disponibles pour tous, partout.',
      },
    },
  },
  features: {
    header: {
      badge: 'Fonctionnalités Principales',
      title: 'Tout ce dont Vous Avez Besoin pour Votre Croissance Spirituelle',
      subtitle: 'Des outils puissants conçus pour enrichir votre parcours de foi et vous connecter à votre communauté.',
    },
    items: {
      prayer: { title: 'Demandes de Prière', desc: 'Partagez vos besoins de prière et intercédez pour les autres.' },
      testimony: { title: 'Partager des Témoignages', desc: "Célébrez l'œuvre de Dieu dans votre vie." },
      groups: { title: 'Petits Groupes', desc: "Rejoignez ou créez des petits groupes pour l'étude biblique." },
      resources: {
        title: "Ressources d'Étude",
        desc: 'Accédez à des sermons, des dévotions et des ressources bibliques.',
      },
      moments: { title: 'Moments Quotidiens', desc: 'Capturez et partagez des moments significatifs de foi.' },
      safe: { title: 'Espace Sécurisé', desc: 'Un environnement modéré qui protège une croissance authentique.' },
    },
  },
  architecture: {
    badge: 'Fondation Technique',
    title: 'Construit sur une Infrastructure Solide',
    subtitle: 'Architecture de niveau entreprise conçue pour la fiabilité, la sécurité et la croissance.',
    sections: {
      security: {
        title: 'Sécurité Avant Tout',
        items: [
          'Chiffrement de bout en bout pour toutes les communications',
          'Authentification à connaissance nulle',
          'Audits de sécurité réguliers et conformité',
        ],
      },
      performance: {
        title: 'Ultra Rapide',
        items: [
          'CDN global pour une livraison de contenu instantanée',
          'Requêtes de base de données optimisées',
          'Stratégies de mise en cache intelligentes',
        ],
      },
      scale: {
        title: 'Conçu pour Évoluer',
        items: [
          'Architecture de microservices',
          "Infrastructure à mise à l'échelle automatique",
          'Équilibrage de charge et redondance',
        ],
      },
    },
  },
  values: {
    badge: 'Nos Valeurs',
    title: 'Ce en Quoi Nous Croyons',
    items: {
      faith: {
        title: 'Centré sur la Foi',
        desc: 'Chaque décision est ancrée dans les principes bibliques.',
      },
      simplicity: {
        title: 'Simplicité Radicale',
        desc: 'Outils intuitifs et accessibles à tous.',
      },
      privacy: {
        title: 'La Vie Privée Compte',
        desc: 'Votre parcours est personnel. Nous protégeons vos données.',
      },
      community: {
        title: 'Communauté Plutôt que Compétition',
        desc: 'Favoriser des connexions authentiques plutôt que des métriques.',
      },
    },
  },
  mobile: {
    badge: 'Application Mobile',
    title: 'La Foi Dans Votre Poche',
    subtitle: 'Restez connecté partout, à tout moment. Bientôt disponible sur iOS et Android.',
    labels: {
      comingSoon: 'Bientôt Disponible',
      ios: 'App Store',
      android: 'Google Play',
      notify: 'Me Notifier',
    },
    form: {
      emailPlaceholder: 'Entrez votre email',
      successMessage: "Merci ! Nous vous informerons du lancement de l'application.",
    },
  },
  footer: {
    tagline: 'Renforcer la foi par la technologie',
    links: {
      about: 'À propos',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      contact: 'Contact',
    },
    copyright: 'Finoana. Tous droits réservés.',
  },
  auth: {
    headings: {
      loginTitle: 'Bienvenue.',
      loginSubtitle: 'Connectez-vous pour continuer votre parcours.',
      registerTitle: 'Rejoignez-nous.',
      registerSubtitle: "Commencez votre parcours de foi aujourd'hui.",
    },
    fields: {
      name: 'Nom',
      namePlaceholder: 'Ton nom',
      firstName: 'Prénom',
      firstNamePlaceholder: 'Ton prénom',
      email: 'Email',
      emailPlaceholder: 'ton@email.com',
      password: 'Mot de passe',
    },
    actions: {
      continue: 'Continuer',
      loading: 'Connexion...',
      google: 'Continuer avec Google',
      createAccount: 'Créer un compte',
      creatingAccount: 'Création de compte...',
      signIn: 'Se connecter',
      forgotPassword: 'Oublié?',
      newHere: 'Nouveau ici?',
      haveAccount: 'Vous avez déjà un compte?',
      divider: 'ou',
      sending: 'Envoi en cours...',
    },
    resetPassword: {
      title: 'Mot de passe oublié ?',
      subtitle: 'Entrez votre email et nous vous enverrons un lien de réinitialisation.',
      sent: 'Email envoyé à',
      action: 'Envoyer le lien',
      back: 'Retour à la connexion',
      tryAgain: 'Reessayer',
    },
    validation: {
      nameRequired: 'Le nom est requis',
      firstNameRequired: 'Le prénom est requis',
      emailRequired: "L'email est requis",
      passwordRequired: 'Le mot de passe est requis',
      passwordMin: 'Le mot de passe doit contenir au moins 6 caractères',
      genericError: 'Une erreur est survenue. Veuillez réessayer.',
      loginFailed: 'Connexion echouée. Veuillez réessayer.',
      googleFailed: 'Connexion avec Google echouée. Veuillez réessayer.',
    },
    passwordStrength: {
      none: '',
      weak: 'Faible',
      fair: 'Moyen',
      good: 'Bon',
      strong: 'Fort',
    },
  },
  dashboard: {
    navigation: {
      home: 'Accueil',
      profile: 'Profil',
      settings: 'Paramètres',
      faithCommunity: 'Foi en communauté',
      shareThought: 'Partager une pensée',
      logout: 'Se déconnecter',
    } satisfies Record<NavigationKey | 'faithCommunity' | 'shareThought' | 'logout', string>,
    ui: {
      search: 'Rechercher des prières, des personnes, des sujets...',
      verseTitle: 'Verset du jour',
      followTitle: 'Personnes à suivre',
      footer: 'Marcher ensemble dans la foi. Partagez l’amour, répandez l’espoir.',
    },
    profile: {
      badge: 'Profil',
      anonymous: 'Anonyme',
      unknownUser: 'Utilisateur Inconnu',
      unknown: 'Inconnu',
      actions: {
        edit: {
          title: 'Modifier le profil',
          description: 'Mettre à jour les informations de votre profil',
        },
        save: 'Enregistrer',
        saving: 'Enregistrement...',
        cancel: 'Annuler',
        follow: 'Suivre',
        removeFollower: 'Supprimer',
      },
      labels: {
        displayName: "Nom d'affichage",
        displayNamePlaceholder: "Ton nom d'affichage",
        bio: 'Biographie',
        bioPlaceholder: 'Une brève description de toi',
        privacy: 'Confidentialité',
        privacyPlaceholder: 'Niveau de confidentialité',
        joined: 'Membre depuis',
        following: {
          title: 'Abonnements',
          description: 'Les personnes que tu suives',
        },
        followers: {
          title: 'Abonnés',
          description: 'Les personnes qui t’abonnent',
        },
      },
      privacyLevels: {
        public: 'Public',
        private: 'Privé',
        anonymous: 'Anonyme',
        description: "Public: visible à tous · Privé: visible aux abonnés · Anonyme: masque l'identité",
      },
      message: {
        displayNameRequired: "Le nom d'affichage est requis",
        profileUpdated: 'Profil mis à jour avec succès',
        updateFailed: 'Une erreur est survenue. Veuillez réessayer.',
      },
      tabs: {
        all: 'Tout',
        prayers: 'Prieres',
        testimonies: 'Témoignages',
        devotions: 'Dévotions',
      },
    },
    post: {
      createPost: 'Créer un post',
      category: 'Catégorie :',
      placeholder: 'Partage une prière, une pensée ou un témoignage...',
      anonymous: 'Publier anonymement',
      anonymousDescription: 'Ton nom ne sera pas visible pour les autres',
      postingAs: 'Publié en tant que',
      postingAsDescription: 'Tape pour masquer ton identité',
      actions: {
        comment: 'Commentaires',
        like: "J'adore",
        share: 'Partages',
      },
      categories: {
        prayer: 'Prière',
        devotion: 'Dévotion',
        testimony: 'Témoignage',
        general: 'Général',
      },
      badges: {
        prayerRequest: 'Requête de prière',
        devotion: 'Dévotion',
        testimony: 'Témoignage',
        general: 'Général',
        prayerAnswered: 'Requête de prière répondue',
      },
    },
  },
  common: {
    cancel: 'Annuler',
    save: 'Enregistrer',
    loading: 'Chargement...',
    empty: 'Aucun utilisateur trouvé',
    openMenu: 'Ouvrir le menu',
    share: 'Partager',
    you: 'vous',
    seeMore: 'Voir plus',
    seeLess: 'Voir moins',
  },
};
