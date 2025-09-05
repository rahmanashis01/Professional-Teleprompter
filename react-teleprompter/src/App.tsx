import React, { useState, useEffect } from 'react';
import { ColoredTodoCheckbox } from './components/ColoredTodoCheckbox';
import { TerminalAnimation } from './components/TerminalAnimation';
import { useTranslation } from './hooks/useTranslation';
import { useTeleprompterSettings } from './hooks/useTeleprompterSettings';
import './App.css';

interface TodoItem {
  id: string;
  text: string;
  color: 'indigo' | 'emerald' | 'rose' | 'amber';
  completed: boolean;
}

function App() {
  const { language, t, toggleLanguage } = useTranslation();
  const { settings, updateSetting } = useTeleprompterSettings();
  const [script, setScript] = useState('');
  const [isPrompterMode, setIsPrompterMode] = useState(false);
  const [todos, setTodos] = useState<TodoItem[]>([]);

  // Initialize todos based on language
  useEffect(() => {
    const todoData: TodoItem[] = [
      {
        id: 'todo1',
        text: t('todo1'),
        color: 'indigo',
        completed: localStorage.getItem('todo_todo1') === 'true'
      },
      {
        id: 'todo2',
        text: t('todo2'),
        color: 'emerald',
        completed: localStorage.getItem('todo_todo2') === 'true'
      },
      {
        id: 'todo3',
        text: t('todo3'),
        color: 'rose',
        completed: localStorage.getItem('todo_todo3') === 'true'
      },
      {
        id: 'todo4',
        text: t('todo4'),
        color: 'amber',
        completed: localStorage.getItem('todo_todo4') === 'true'
      }
    ];
    setTodos(todoData);
  }, [language, t]);

  const handleTodoChange = (id: string, completed: boolean) => {
    localStorage.setItem(`todo_${id}`, completed.toString());
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed } : todo
      )
    );
  };

  const terminalMessages = language === 'bn' 
    ? [
        'আপনার উন্নত টেলিপ্রম্পটারে স্বাগতম!',
        'শুরু করতে এই টেক্সটটি আপনার নিজের স্ক্রিপ্ট দিয়ে প্রতিস্থাপন করুন।',
        'ডানদিকের সেটিংস ব্যবহার করে গতি, ফন্টের আকার এবং আরও অনেক কিছু সামঞ্জস্য করুন।'
      ]
    : [
        'Welcome to your advanced teleprompter!',
        'Start by replacing this text with your own script.',
        'Use the settings on the right to adjust speed, font size and more.'
      ];

  const startTeleprompter = () => {
    if (script.trim()) {
      setIsPrompterMode(true);
    }
  };

  const goBack = () => {
    setIsPrompterMode(false);
  };

  if (isPrompterMode) {
    return (
      <div className="fixed inset-0 bg-black z-50">
        <div 
          className="absolute inset-0 text-white p-8"
          style={{
            fontSize: `${settings.fontSize}px`,
            lineHeight: settings.lineSpacing,
            textAlign: settings.alignment,
            paddingLeft: `${settings.margin}%`,
            paddingRight: `${settings.margin}%`,
            transform: settings.mirror ? 'scaleX(-1)' : 'none'
          }}
        >
          <div className="whitespace-pre-wrap">
            {script}
          </div>
        </div>
        <div className="absolute top-1/2 left-0 w-full h-1 bg-red-500 opacity-75 transform -translate-y-1/2 pointer-events-none z-20"></div>
        <button 
          onClick={goBack}
          className="button realistic-button absolute top-4 left-4 z-20"
        >
          <div className="blob1"></div>
          <div className="inner">
            <i className="fas fa-arrow-left mr-2"></i>
            {t('goBackText')}
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Add your animated background elements here */}
      </div>

      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-30">
        <button 
          onClick={toggleLanguage}
          className="glass-effect hover:bg-white/20 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105"
        >
          {language === 'bn' ? 'EN' : 'বাং'}
        </button>
      </div>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 mt-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 animate-gradient">
          {t('title')}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Script Area */}
          <div className="lg:col-span-2">
            <div className="glass-effect p-6 rounded-2xl backdrop-blur-lg">
              <div className="flex justify-between items-center mb-4">
                <label className="text-xl font-medium text-white/90">
                  {t('scriptLabel')}
                </label>
              </div>
              
              <TerminalAnimation 
                messages={terminalMessages}
                isVisible={!script.trim()}
                title="টেলিপ্রম্পটার.exe"
              />
              
              <textarea 
                value={script}
                onChange={(e) => setScript(e.target.value)}
                rows={18}
                className="w-full p-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white text-lg backdrop-blur-sm transition-all duration-300"
                placeholder={t('scriptPlaceholder')}
              />
            </div>
          </div>

          {/* Controls Area */}
          <div className="glass-effect p-6 rounded-2xl backdrop-blur-lg">
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              {t('settingsTitle')}
            </h2>
            
            <div className="space-y-6">
              {/* Speed Control */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white/80">
                  {t('speedLabel')}
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={settings.speed}
                  onChange={(e) => updateSetting('speed', Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Font Size Control */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white/80">
                  {t('fontSizeLabel')}
                </label>
                <input 
                  type="range" 
                  min="12" 
                  max="120" 
                  value={settings.fontSize}
                  onChange={(e) => updateSetting('fontSize', Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Line Spacing Control */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white/80">
                  {t('lineSpacingLabel')}
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="3" 
                  step="0.1"
                  value={settings.lineSpacing}
                  onChange={(e) => updateSetting('lineSpacing', Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Margin Control */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white/80">
                  {t('marginLabel')}
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="45" 
                  value={settings.margin}
                  onChange={(e) => updateSetting('margin', Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Text Alignment */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white/80">
                  {t('alignLabel')}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['left', 'center', 'right'] as const).map((align) => (
                    <button 
                      key={align}
                      onClick={() => updateSetting('alignment', align)}
                      className={`p-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                        settings.alignment === align 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      <i className={`fas fa-align-${align}`}></i>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mirror Toggle */}
              <div>
                <label className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      checked={settings.mirror}
                      onChange={(e) => updateSetting('mirror', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`block w-14 h-8 rounded-full transition-all duration-300 ${
                      settings.mirror ? 'bg-purple-500' : 'bg-white/20 group-hover:bg-white/30'
                    }`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-all duration-300 shadow-lg ${
                      settings.mirror ? 'transform translate-x-6' : ''
                    }`}></div>
                  </div>
                  <div className="ml-3 text-white/80 text-sm font-medium">
                    {t('mirrorLabel')}
                  </div>
                </label>
              </div>

              {/* Todo Checklist */}
              <div>
                <label className="block mb-3 text-sm font-medium text-white/80">
                  {t('todoLabel')}
                </label>
                <ColoredTodoCheckbox 
                  todos={todos}
                  onTodoChange={handleTodoChange}
                />
              </div>
            </div>

            <button 
              onClick={startTeleprompter}
              className="button realistic-button w-full mt-8"
            >
              <div className="blob1"></div>
              <div className="inner">{t('startBtn')}</div>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 text-center py-2 glass-effect backdrop-blur-sm">
        <p className="text-xs text-white/70">
          <i className="far fa-copyright"></i> 2025 
          <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 ml-1">
            Ashis Rahman
          </span>
        </p>
        <p className="text-xs text-white/50 mt-0.5">
          <span>{t('developedBy')} </span>
          <span className="font-normal text-white/60">Ashis Rahman</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
