import { useState, useEffect } from 'react';

export type Language = 'bn' | 'en';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  bn: {
    title: 'টেলিপ্রম্পটার',
    scriptLabel: 'আপনার স্ক্রিপ্ট',
    uploadText: 'ফাইল আপলোড',
    settingsTitle: 'সেটিংস',
    speedLabel: 'স্ক্রোল গতি',
    fontSizeLabel: 'ফন্টের আকার',
    lineSpacingLabel: 'লাইনের ব্যবধান',
    marginLabel: 'পাশের মার্জিন',
    alignLabel: 'টেক্সট অ্যালাইনমেন্ট',
    mirrorLabel: 'আয়না টেক্সট',
    todoLabel: 'টুডু তালিকা',
    todo1: 'স্ক্রিপ্ট প্রস্তুত করুন',
    todo2: 'গতি সেট করুন',
    todo3: 'ফন্ট সাইজ সামঞ্জস্য করুন',
    todo4: 'টেলিপ্রম্পটার টেস্ট করুন',
    startBtn: 'টেলিপ্রম্পটার শুরু করুন',
    goBackText: 'ফিরে যান',
    scriptPlaceholder: 'আপনার স্ক্রিপ্ট এখানে পেস্ট করুন...',
    defaultScript: 'আপনার উন্নত টেলিপ্রম্পটারে স্বাগতম!\n\nশুরু করতে এই টেক্সটটি আপনার নিজের স্ক্রিপ্ট দিয়ে প্রতিস্থাপন করুন।\n\nডানদিকের সেটিংস ব্যবহার করে গতি, ফন্টের আকার এবং আরও অনেক কিছু সামঞ্জস্য করুন।',
    developedBy: 'ডেভেলপড বাই'
  },
  en: {
    title: 'Teleprompter',
    scriptLabel: 'Your Script',
    uploadText: 'Upload File',
    settingsTitle: 'Settings',
    speedLabel: 'Scroll Speed',
    fontSizeLabel: 'Font Size',
    lineSpacingLabel: 'Line Spacing',
    marginLabel: 'Side Margin',
    alignLabel: 'Text Alignment',
    mirrorLabel: 'Mirror Text',
    todoLabel: 'Todo List',
    todo1: 'Prepare your script',
    todo2: 'Set the speed',
    todo3: 'Adjust font size',
    todo4: 'Test teleprompter',
    startBtn: 'Start Teleprompter',
    goBackText: 'Go Back',
    scriptPlaceholder: 'Paste your script here...',
    defaultScript: 'Welcome to your advanced Teleprompter!\n\nTo get started, replace this text with your own script.\n\nUse the settings on the right to adjust speed, font size, and more.',
    developedBy: 'Developed by'
  }
};

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>('bn');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem('teleprompter_language') as Language;
    if (savedLang && (savedLang === 'bn' || savedLang === 'en')) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem('teleprompter_language', language);
    // Update document title and lang attribute
    document.title = translations[language].title;
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'bn' ? 'en' : 'bn');
  };

  return {
    language,
    t,
    toggleLanguage
  };
};
