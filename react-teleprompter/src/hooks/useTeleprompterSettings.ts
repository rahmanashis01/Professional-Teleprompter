import { useState, useEffect } from 'react';

interface TeleprompterSettings {
  speed: number;
  fontSize: number;
  lineSpacing: number;
  margin: number;
  alignment: 'left' | 'center' | 'right';
  mirror: boolean;
}

export const useTeleprompterSettings = () => {
  const [settings, setSettings] = useState<TeleprompterSettings>({
    speed: 20,
    fontSize: 52,
    lineSpacing: 1.5,
    margin: 5,
    alignment: 'center',
    mirror: false
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('teleprompter_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem('teleprompter_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof TeleprompterSettings>(
    key: K,
    value: TeleprompterSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return {
    settings,
    updateSetting
  };
};
