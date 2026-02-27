import { NavigationKey } from '@/components/dashboard';

export const en = {
  nav: {
    vision: 'Vision',
    features: 'Features',
    architecture: 'Architecture',
    values: 'Values',
  },
  hero: {
    badge: 'Faith · Community · Peace',
    title: 'Empowering Faith Through Technology',
    subtitle:
      'A platform designed to support spiritual growth, community building, and faith-based learning in the digital age.',
    cta: {
      primary: 'Get Started',
      secondary: 'Learn More',
    },
  },
  vision: {
    badge: 'Our Vision',
    title: 'Building the Future of Digital Faith',
    description:
      'We envision a world where technology serves as a bridge to deeper spiritual connection, community engagement, and meaningful growth in faith.',
    principles: {
      community: {
        title: 'Community First',
        desc: 'Creating spaces where believers can connect, share, and grow together in authentic fellowship.',
      },
      scripture: {
        title: 'Scripture Centered',
        desc: 'Grounding every feature and interaction in biblical truth and wisdom.',
      },
      accessible: {
        title: 'Accessible to All',
        desc: 'Ensuring that spiritual resources and community are available to everyone, everywhere.',
      },
    },
  },
  features: {
    header: {
      badge: 'Core Features',
      title: 'Everything You Need for Spiritual Growth',
      subtitle: 'Powerful tools designed to enhance your faith journey and connect with your community.',
    },
    items: {
      prayer: { title: 'Prayer Requests', desc: 'Share prayer needs and intercede for others.' },
      testimony: { title: 'Share Testimonies', desc: "Celebrate God's work in your life." },
      groups: { title: 'Small Groups', desc: 'Join or create groups for Bible study and fellowship.' },
      resources: { title: 'Study Resources', desc: 'Access sermons, devotionals, and biblical resources.' },
      moments: { title: 'Daily Moments', desc: 'Capture and share meaningful moments of faith.' },
      safe: { title: 'Safe Space', desc: 'A moderated environment that protects spiritual growth.' },
    },
  },
  architecture: {
    badge: 'Technical Foundation',
    title: 'Built on Solid Infrastructure',
    subtitle: 'Enterprise-grade architecture designed for reliability, security, and growth.',
    sections: {
      security: {
        title: 'Security First',
        items: [
          'End-to-end encryption for all communications',
          'Zero-knowledge authentication',
          'Regular security audits and compliance',
        ],
      },
      performance: {
        title: 'Lightning Fast',
        items: ['Global CDN for instant content delivery', 'Optimized database queries', 'Smart caching strategies'],
      },
      scale: {
        title: 'Built to Scale',
        items: ['Microservices architecture', 'Auto-scaling infrastructure', 'Load balancing and redundancy'],
      },
    },
  },
  values: {
    badge: 'Our Values',
    title: 'What We Stand For',
    items: {
      faith: {
        title: 'Faith-Centered',
        desc: 'Every decision and feature is grounded in biblical principles.',
      },
      simplicity: {
        title: 'Radical Simplicity',
        desc: 'Intuitive and accessible tools for everyone.',
      },
      privacy: {
        title: 'Privacy Matters',
        desc: 'Your spiritual journey is personal. We protect your data.',
      },
      community: {
        title: 'Community Over Competition',
        desc: 'Fostering genuine connections rather than engagement metrics.',
      },
    },
  },
  mobile: {
    badge: 'Mobile App',
    title: 'Faith in Your Pocket',
    subtitle: 'Stay connected anywhere, anytime. Coming soon to iOS and Android.',
    labels: {
      comingSoon: 'Coming Soon',
      ios: 'App Store',
      android: 'Google Play',
      notify: 'Notify Me',
    },
    form: {
      emailPlaceholder: 'Enter your email',
      successMessage: "Thank you! We'll notify you when the app launches.",
    },
  },
  footer: {
    tagline: 'Empowering faith through technology',
    links: {
      about: 'About',
      privacy: 'Privacy',
      terms: 'Terms',
      contact: 'Contact',
    },
    copyright: 'Finoana. All rights reserved.',
  },
  auth: {
    headings: {
      loginTitle: 'Welcome back.',
      loginSubtitle: 'Sign in to continue your journey.',
      registerTitle: 'Join us.',
      registerSubtitle: 'Start your journey in faith today.',
    },
    fields: {
      name: 'Name',
      namePlaceholder: 'Your name',
      firstName: 'First Name',
      firstNamePlaceholder: 'Your first name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      password: 'Password',
    },
    actions: {
      continue: 'Continue',
      loading: 'Processing...',
      google: 'Continue with Google',
      createAccount: 'Create an account',
      creatingAccount: 'Creating account...',
      signIn: 'Sign in',
      forgotPassword: 'Forgot Password?',
      newHere: 'New here?',
      haveAccount: 'Already have an account?',
      divider: 'or',
      sending: 'Sending...',
    },
    resetPassword: {
      title: 'Forgot Password?',
      subtitle: "Enter your email address and we'll send you a link to reset your password.",
      sent: 'Email sent to',
      action: 'Send reset link',
      back: 'Back to sign in',
      tryAgain: 'Try again',
    },
    validation: {
      nameRequired: 'Name is required',
      firstNameRequired: 'First name is required',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      passwordMin: 'Password must be at least 6 characters',
      genericError: 'An error occurred. Please try again.',
      loginFailed: 'Login failed. Please try again.',
      googleFailed: 'Google login failed. Please try again.',
    },
    passwordStrength: {
      none: '',
      weak: 'Weak',
      fair: 'Fair',
      good: 'Good',
      strong: 'Strong',
    },
  },
  dashboard: {
    navigation: {
      home: 'Home',
      profile: 'Profile',
      settings: 'Settings',
      faithCommunity: 'Faith in Community',
      shareThought: 'Share Thought',
      logout: 'Logout',
    } satisfies Record<NavigationKey | 'faithCommunity' | 'shareThought' | 'logout', string>,
    ui: {
      search: 'Search prayers, people, topics...',
      verseTitle: 'Verse of the day',
      followTitle: 'People to follow',
      footer: 'Walking together in faith. Share love, spread hope, build community.',
    },
    profile: {
      badge: 'Profile',
      anonymous: 'Anonymous',
      unknownUser: 'Unknown user',
      unknown: 'Unknown',
      actions: {
        edit: {
          title: 'Edit Profile',
          description: 'Update your profile information',
        },
        save: 'Save changes',
        saving: 'Saving...',
        cancel: 'Cancel',
        follow: 'Follow',
        removeFollower: 'Remove follower',
      },
      labels: {
        displayName: 'Display name',
        displayNamePlaceholder: 'Your display name',
        bio: 'Bio',
        bioPlaceholder: 'A short description of yourself',
        privacy: 'Privacy level',
        privacyPlaceholder: 'Select privacy level',
        joined: 'Joined',
        following: {
          title: 'Following',
          description: 'People you follow',
        },
        followers: {
          title: 'Followers',
          description: 'People who follow you',
        },
      },
      privacyLevels: {
        public: 'Public',
        private: 'Private',
        anonymous: 'Anonymous',
        description: 'Public: visible to everyone · Private: visible to followers · Anonymous: hides identity',
      },
      message: {
        displayNameRequired: 'Display name is required',
        profileUpdated: 'Profile updated successfully',
        updateFailed: 'Failed to update profile. Please try again.',
      },
      tabs: {
        all: 'All',
        prayers: 'Prayers',
        testimonies: 'Testimonies',
        devotions: 'Devotions',
      },
      roles: {
        admin: 'Admin',
        moderator: 'Moderator',
        user: 'User',
      },
    },
    post: {
      createPost: 'Create post',
      category: 'Category : ',
      placeholder: 'Share a prayer, thought, or testimony...',
      anonymous: 'Posting anonymously',
      anonymousDescription: "Your name won't be visible to others",
      postingAs: 'Posting as',
      postingAsDescription: 'Tap to hide your identity',
      actions: {
        comment: 'Comments',
        like: 'Likes',
        share: 'Shares',
      },
      categories: {
        prayer: 'Prayer',
        devotion: 'Devotional',
        testimony: 'Testimony',
        general: 'General',
      },
      badges: {
        prayerRequest: 'Prayer Request',
        devotion: 'Devotion',
        testimony: 'Testimony',
        general: 'General',
        prayerAnswered: 'Prayer Answered',
      },
    },
  },
  common: {
    cancel: 'Cancel',
    save: 'Save changes',
    loading: 'Loading...',
    empty: 'No data found',
    openMenu: 'Open menu',
    share: 'Share',
    you: 'you',
    seeMore: 'See more',
    seeLess: 'See less',
  },
};

export type Dictionary = typeof en;
