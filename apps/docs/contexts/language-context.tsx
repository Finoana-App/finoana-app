"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type Language = "en" | "fr";

interface Translations {
  [key: string]: {
    en: string;
    fr: string;
  };
}

const translations: Translations = {
  "nav.vision": { en: "Vision", fr: "Vision" },
  "nav.features": { en: "Features", fr: "Fonctionnalités" },
  "nav.architecture": { en: "Architecture", fr: "Architecture" },
  "nav.values": { en: "Values", fr: "Valeurs" },
  "nav.getStarted": { en: "Get Started", fr: "Commencer" },

  "hero.badge": {
    en: "Faith · Community · Peace",
    fr: "Foi · Communauté · Paix",
  },
  "hero.title": { en: "Finoana", fr: "Finoana" },
  "hero.subtitle": {
    en: "A sanctuary for prayer, spiritual sharing, and Christian fellowship in a calm, distraction-free digital space.",
    fr: "Un sanctuaire pour la prière, le partage spirituel et la communion chrétienne dans un espace numérique calme et sans distraction.",
  },
  "hero.cta.primary": {
    en: "Explore the Platform",
    fr: "Explorer la plateforme",
  },
  "hero.cta.secondary": {
    en: "Read Documentation",
    fr: "Lire la documentation",
  },

  "vision.badge": { en: "Our Vision", fr: "Notre Vision" },
  "vision.title": {
    en: "Technology that serves faith, not distracts from it",
    fr: "Une technologie au service de la foi, pas une distraction",
  },
  "vision.description": {
    en: "In a world of constant noise, Finoana creates space for what matters most. We believe digital tools should strengthen spiritual connection, not compete with it. Our platform is designed with intentionality at its core—every feature, every interaction, every moment serves the purpose of bringing believers closer together and closer to God.",
    fr: "Dans un monde de bruit constant, Finoana crée un espace pour ce qui compte le plus. Nous croyons que les outils numériques devraient renforcer la connexion spirituelle, et non la concurrencer. Notre plateforme est conçue avec l'intentionnalité au cœur—chaque fonctionnalité, chaque interaction, chaque moment sert le but de rapprocher les croyants entre eux et de Dieu.",
  },
  "vision.principle1.title": {
    en: "Contemplative Design",
    fr: "Design Contemplatif",
  },
  "vision.principle1.desc": {
    en: "Every element exists to reduce friction and increase focus. No ads, no algorithmic feeds, no endless scrolling.",
    fr: "Chaque élément existe pour réduire la friction et augmenter la concentration. Pas de publicités, pas de flux algorithmiques, pas de défilement infini.",
  },
  "vision.principle2.title": {
    en: "Secure Sanctuary",
    fr: "Sanctuaire Sécurisé",
  },
  "vision.principle2.desc": {
    en: "Your prayers and testimonies are sacred. End-to-end encryption ensures your spiritual journey remains private.",
    fr: "Vos prières et témoignages sont sacrés. Le chiffrement de bout en bout garantit que votre parcours spirituel reste privé.",
  },
  "vision.principle3.title": {
    en: "Community First",
    fr: "Communauté d'abord",
  },
  "vision.principle3.desc": {
    en: "Built for real fellowship, not followers. Meaningful connections over metrics, depth over reach.",
    fr: "Conçu pour une vraie communion, pas pour des abonnés. Des connexions significatives plutôt que des métriques, la profondeur plutôt que la portée.",
  },

  "features.badge": { en: "Features", fr: "Fonctionnalités" },
  "features.title": {
    en: "Everything you need for digital fellowship",
    fr: "Tout ce dont vous avez besoin pour la communion numérique",
  },
  "features.subtitle": {
    en: "A complete spiritual toolkit designed with care and purpose",
    fr: "Une boîte à outils spirituelle complète conçue avec soin et intention",
  },

  "features.prayer.title": { en: "Prayer Wall", fr: "Mur de Prière" },
  "features.prayer.desc": {
    en: "Share prayer requests and intercede for others. Watch as the community lifts each other up in real-time.",
    fr: "Partagez vos demandes de prière et intercédez pour les autres. Regardez la communauté s'élever mutuellement en temps réel.",
  },

  "features.testimony.title": { en: "Testimonies", fr: "Témoignages" },
  "features.testimony.desc": {
    en: "Publish and discover stories of faith. Celebrate answered prayers and God's work in daily life.",
    fr: "Publiez et découvrez des histoires de foi. Célébrez les prières exaucées et l'œuvre de Dieu dans la vie quotidienne.",
  },

  "features.groups.title": { en: "Thematic Groups", fr: "Groupes Thématiques" },
  "features.groups.desc": {
    en: "Join communities around specific topics—marriage, parenting, healing, missions, and more.",
    fr: "Rejoignez des communautés autour de sujets spécifiques—mariage, parentalité, guérison, missions, et plus encore.",
  },

  "features.resources.title": {
    en: "Spiritual Resources",
    fr: "Ressources Spirituelles",
  },
  "features.resources.desc": {
    en: "Access verified devotionals, sermons, and study materials from trusted sources.",
    fr: "Accédez à des méditations, sermons et matériaux d'étude vérifiés de sources fiables.",
  },

  "features.moments.title": {
    en: "Collective Moments",
    fr: "Moments Collectifs",
  },
  "features.moments.desc": {
    en: "Participate in synchronized prayer times and worship sessions with believers worldwide.",
    fr: "Participez à des temps de prière synchronisés et des sessions d'adoration avec des croyants du monde entier.",
  },

  "features.safe.title": { en: "Safe Environment", fr: "Environnement Sûr" },
  "features.safe.desc": {
    en: "Moderated spaces ensure respectful, benevolent interactions focused on spiritual growth.",
    fr: "Des espaces modérés assurent des interactions respectueuses et bienveillantes axées sur la croissance spirituelle.",
  },

  "architecture.badge": {
    en: "Technical Architecture",
    fr: "Architecture Technique",
  },
  "architecture.title": {
    en: "Built for trust, designed for peace",
    fr: "Construit pour la confiance, conçu pour la paix",
  },
  "architecture.subtitle": {
    en: "A modern, secure foundation that respects your data and your faith",
    fr: "Une fondation moderne et sécurisée qui respecte vos données et votre foi",
  },

  "architecture.security.title": { en: "Security", fr: "Sécurité" },
  "architecture.security.item1": {
    en: "End-to-end encryption for private content",
    fr: "Chiffrement de bout en bout pour le contenu privé",
  },
  "architecture.security.item2": {
    en: "Zero-knowledge authentication",
    fr: "Authentification à connaissance nulle",
  },
  "architecture.security.item3": {
    en: "GDPR & privacy-first design",
    fr: "Conception RGPD et vie privée d'abord",
  },

  "architecture.performance.title": { en: "Performance", fr: "Performance" },
  "architecture.performance.item1": {
    en: "Global CDN for instant access",
    fr: "CDN mondial pour un accès instantané",
  },
  "architecture.performance.item2": {
    en: "Offline-first architecture",
    fr: "Architecture hors-ligne d'abord",
  },
  "architecture.performance.item3": {
    en: "Real-time synchronization",
    fr: "Synchronisation en temps réel",
  },

  "architecture.scale.title": { en: "Scalability", fr: "Évolutivité" },
  "architecture.scale.item1": {
    en: "Serverless infrastructure",
    fr: "Infrastructure sans serveur",
  },
  "architecture.scale.item2": {
    en: "Auto-scaling for peak moments",
    fr: "Auto-scaling pour les pics d'activité",
  },
  "architecture.scale.item3": {
    en: "Multi-region availability",
    fr: "Disponibilité multi-régions",
  },

  "values.badge": { en: "Our Values", fr: "Nos Valeurs" },
  "values.title": {
    en: "Principles that guide every decision",
    fr: "Des principes qui guident chaque décision",
  },

  "values.faith.title": { en: "Faith-Centered", fr: "Centré sur la Foi" },
  "values.faith.desc": {
    en: "Every feature is evaluated against one question: does this bring people closer to God?",
    fr: "Chaque fonctionnalité est évaluée selon une question: cela rapproche-t-il les gens de Dieu?",
  },

  "values.simplicity.title": {
    en: "Radical Simplicity",
    fr: "Simplicité Radicale",
  },
  "values.simplicity.desc": {
    en: "We remove what distracts. Technology should be invisible, serving the mission without demanding attention.",
    fr: "Nous supprimons ce qui distrait. La technologie doit être invisible, servant la mission sans demander d'attention.",
  },

  "values.privacy.title": { en: "Sacred Privacy", fr: "Vie Privée Sacrée" },
  "values.privacy.desc": {
    en: "Your spiritual life is between you and God. We never sell data, never profile, never exploit.",
    fr: "Votre vie spirituelle est entre vous et Dieu. Nous ne vendons jamais de données, ne profilons jamais, n'exploitons jamais.",
  },

  "values.community.title": {
    en: "Authentic Community",
    fr: "Communauté Authentique",
  },
  "values.community.desc": {
    en: "Real relationships over virtual metrics. We measure success in transformed lives, not engagement rates.",
    fr: "Des relations réelles plutôt que des métriques virtuelles. Nous mesurons le succès en vies transformées, pas en taux d'engagement.",
  },

  "mobile.badge": { en: "Mobile App", fr: "Application Mobile" },
  "mobile.title": {
    en: "Take your faith journey everywhere",
    fr: "Emportez votre parcours de foi partout",
  },
  "mobile.subtitle": {
    en: "The Finoana mobile app is coming soon. Get notified when it launches.",
    fr: "L'application mobile Finoana arrive bientôt. Soyez informé de son lancement.",
  },
  "mobile.comingSoon": { en: "Coming Soon", fr: "Bientôt disponible" },
  "mobile.notify": { en: "Notify Me", fr: "Me notifier" },
  "mobile.emailPlaceholder": {
    en: "Enter your email",
    fr: "Entrez votre email",
  },
  "mobile.ios": { en: "App Store", fr: "App Store" },
  "mobile.android": { en: "Google Play", fr: "Google Play" },

  "footer.tagline": {
    en: "A sanctuary for faith in the digital age.",
    fr: "Un sanctuaire pour la foi à l'ère numérique.",
  },
  "footer.links.about": { en: "About", fr: "À propos" },
  "footer.links.privacy": { en: "Privacy", fr: "Confidentialité" },
  "footer.links.terms": { en: "Terms", fr: "Conditions" },
  "footer.links.contact": { en: "Contact", fr: "Contact" },
  "footer.copyright": {
    en: "Finoana. All rights reserved.",
    fr: "Finoana. Tous droits réservés.",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = useCallback(
    (key: string): string => {
      const translation = translations[key];
      if (!translation) {
        console.warn(`Missing translation for key: ${key}`);
        return key;
      }
      return translation[language];
    },
    [language],
  );

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "fr" : "en"));
  }, []);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
