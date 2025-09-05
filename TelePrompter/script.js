// --- DOM Elements ---
const editorView = document.getElementById('editor-view');
const prompterView = document.getElementById('prompter-view');

// Editor controls
const scriptInput = document.getElementById('script');
const speedControl = document.getElementById('speed');
const fontSizeControl = document.getElementById('fontSize');
const lineSpacingControl = document.getElementById('lineSpacing');
const marginControl = document.getElementById('margin');
const alignBtns = document.querySelectorAll('.align-btn');
const mirrorToggle = document.getElementById('mirror');
const startBtn = document.getElementById('startBtn');

// Prompter elements
const goBackBtn = document.getElementById('goBackBtn');
const prompterTextContainer = document.getElementById('prompter-text-container');
const prompterText = document.getElementById('prompter-text');
const playPauseIndicator = document.getElementById('play-pause-indicator');
const playPauseIcon = playPauseIndicator.querySelector('i');

// New elements for language and file upload
const langToggle = document.getElementById('langToggle');
const langText = document.getElementById('langText');
const fileInput = document.getElementById('fileInput');
const fileStatus = document.getElementById('fileStatus');

// --- Translation System ---
const translations = {
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
        fileProcessing: 'ফাইল প্রক্রিয়াকরণ হচ্ছে...',
        fileSuccess: 'ফাইল সফলভাবে লোড হয়েছে!',
        fileError: 'ত্রুটি: ফাইল পড়তে পারছি না',
        fileTypeError: 'শুধুমাত্র PDF এবং DOCX ফাইল সমর্থিত',
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
        fileProcessing: 'Processing file...',
        fileSuccess: 'File loaded successfully!',
        fileError: 'Error: Could not read file',
        fileTypeError: 'Only PDF and DOCX files are supported',
        developedBy: 'Developed by'
    }
};

// --- State Management ---
let isPlaying = false;
let scrollInterval;
let currentPosition = 0;
let currentLang = 'bn'; // Default language
let state = {
    script: '',
    speed: 20,
    fontSize: 52,
    lineSpacing: 1.5,
    margin: 5,
    align: 'center',
    mirror: false,
    language: 'bn'
};

// --- Core Functions ---

function playTeleprompter() {
    if (!isPlaying) {
        isPlaying = true;
        showPlayPauseIndicator(true);
        const scrollSpeed = parseInt(state.speed, 10);
        const intervalDuration = 110 - scrollSpeed;

        scrollInterval = setInterval(() => {
            currentPosition -= 1;
            prompterTextContainer.style.top = `${currentPosition}px`;

            if (currentPosition < -prompterText.clientHeight) {
                pauseTeleprompter();
            }
        }, intervalDuration);
    }
}

function pauseTeleprompter() {
    if (isPlaying) {
        isPlaying = false;
        showPlayPauseIndicator(false);
        clearInterval(scrollInterval);
    }
}

function resetTeleprompter() {
    pauseTeleprompter();
    currentPosition = prompterView.clientHeight;
    prompterTextContainer.style.top = `${currentPosition}px`;
}

// --- UI & State Sync Functions ---

function applyStylesToPrompter() {
    prompterText.innerText = state.script;
    prompterText.style.fontSize = `${state.fontSize}px`;
    prompterText.style.lineHeight = state.lineSpacing;
    prompterText.style.textAlign = state.align;
    prompterText.style.paddingLeft = `${state.margin}%`;
    prompterText.style.paddingRight = `${state.margin}%`;
    if (state.mirror) {
        prompterText.classList.add('mirrored');
    } else {
        prompterText.classList.remove('mirrored');
    }
}

function updateControlsFromState() {
    scriptInput.value = state.script;
    speedControl.value = state.speed;
    fontSizeControl.value = state.fontSize;
    lineSpacingControl.value = state.lineSpacing;
    marginControl.value = state.margin;
    mirrorToggle.checked = state.mirror;
    
    alignBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.id.includes(state.align)) {
            btn.classList.add('active');
        }
    });
}

function showPlayPauseIndicator(playing) {
    playPauseIcon.className = playing ? 'fas fa-pause' : 'fas fa-play';
    playPauseIndicator.classList.add('visible');
    setTimeout(() => {
        playPauseIndicator.classList.remove('visible');
    }, 500);
}

// --- Language Functions ---
function updateLanguage() {
    const t = translations[currentLang];
    
    // Update all text elements
    document.getElementById('mainTitle').textContent = t.title;
    document.getElementById('scriptLabel').textContent = t.scriptLabel;
    document.getElementById('uploadText').textContent = t.uploadText;
    document.getElementById('settingsTitle').textContent = t.settingsTitle;
    document.getElementById('speedLabel').textContent = t.speedLabel;
    document.getElementById('fontSizeLabel').textContent = t.fontSizeLabel;
    document.getElementById('lineSpacingLabel').textContent = t.lineSpacingLabel;
    document.getElementById('marginLabel').textContent = t.marginLabel;
    document.getElementById('alignLabel').textContent = t.alignLabel;
    document.getElementById('mirrorLabel').textContent = t.mirrorLabel;
    document.getElementById('todoLabel').textContent = t.todoLabel;
    document.querySelector('label[for="todo1"]').textContent = t.todo1;
    document.querySelector('label[for="todo2"]').textContent = t.todo2;
    document.querySelector('label[for="todo3"]').textContent = t.todo3;
    document.querySelector('label[for="todo4"]').textContent = t.todo4;
    document.getElementById('startBtn').textContent = t.startBtn;
    document.getElementById('goBackText').textContent = t.goBackText;
    document.getElementById('developedBy').textContent = t.developedBy;
    scriptInput.placeholder = t.scriptPlaceholder;
    
    // Update page title
    document.title = t.title;
    
    // Update language toggle button
    langText.textContent = currentLang === 'bn' ? 'EN' : 'বাং';
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
}

function toggleLanguage() {
    currentLang = currentLang === 'bn' ? 'en' : 'bn';
    state.language = currentLang;
    updateLanguage();
    saveStateToLocalStorage();
}

// --- File Upload Functions ---
async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n\n';
    }
    
    return fullText.trim();
}

async function extractTextFromDOCX(file) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
}

async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const t = translations[currentLang];
    fileStatus.textContent = t.fileProcessing;
    fileStatus.className = 'mt-2 text-sm loading';
    
    try {
        let text = '';
        
        if (file.type === 'application/pdf') {
            text = await extractTextFromPDF(file);
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                   file.name.endsWith('.docx')) {
            text = await extractTextFromDOCX(file);
        } else {
            throw new Error(t.fileTypeError);
        }
        
        if (text) {
            scriptInput.value = text;
            state.script = text;
            saveStateToLocalStorage();
            fileStatus.textContent = t.fileSuccess;
            fileStatus.className = 'mt-2 text-sm success';
            
            // Clear success message after 3 seconds
            setTimeout(() => {
                fileStatus.textContent = '';
                fileStatus.className = 'mt-2 text-sm text-gray-400';
            }, 3000);
        }
    } catch (error) {
        fileStatus.textContent = error.message || t.fileError;
        fileStatus.className = 'mt-2 text-sm error';
        console.error('File processing error:', error);
    }
    
    // Reset file input
    fileInput.value = '';
}

// --- Local Storage ---

function saveStateToLocalStorage() {
    localStorage.setItem('teleprompterState', JSON.stringify(state));
}

function loadStateFromLocalStorage() {
    const savedState = localStorage.getItem('teleprompterState');
    if (savedState) {
        state = JSON.parse(savedState);
        currentLang = state.language || 'bn';
    } else {
        // Set default script if nothing is saved
        state.script = translations[currentLang].defaultScript;
    }
    updateControlsFromState();
    updateLanguage();
}

// --- Event Listeners ---

// Language toggle
langToggle.addEventListener('click', toggleLanguage);

// File upload
fileInput.addEventListener('change', handleFileUpload);

// Editor controls
scriptInput.addEventListener('input', () => {
    state.script = scriptInput.value;
    saveStateToLocalStorage();
});
speedControl.addEventListener('input', () => {
    state.speed = speedControl.value;
    saveStateToLocalStorage();
});
fontSizeControl.addEventListener('input', () => {
    state.fontSize = fontSizeControl.value;
    saveStateToLocalStorage();
});
lineSpacingControl.addEventListener('input', () => {
    state.lineSpacing = lineSpacingControl.value;
    saveStateToLocalStorage();
});
marginControl.addEventListener('input', () => {
    state.margin = marginControl.value;
    saveStateToLocalStorage();
});
mirrorToggle.addEventListener('change', () => {
    state.mirror = mirrorToggle.checked;
    saveStateToLocalStorage();
});

alignBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        alignBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.align = btn.id.split('-')[1];
        saveStateToLocalStorage();
    });
});

// View switching
startBtn.addEventListener('click', () => {
    editorView.classList.add('hidden');
    prompterView.classList.remove('hidden');
    applyStylesToPrompter();
    resetTeleprompter();
    // Automatically start playing
    setTimeout(playTeleprompter, 500); // Small delay before starting
});

goBackBtn.addEventListener('click', () => {
    editorView.classList.remove('hidden');
    prompterView.classList.add('hidden');
    pauseTeleprompter();
});

// Keyboard controls for prompter view
document.addEventListener('keydown', (e) => {
    // Only apply when prompter is visible
    if (prompterView.classList.contains('hidden')) return;

    if (e.code === 'Space') {
        e.preventDefault();
        isPlaying ? pauseTeleprompter() : playTeleprompter();
    }
});

// --- Initial Load ---
window.addEventListener('load', () => {
    loadStateFromLocalStorage();
    
    // Set current year in copyright
    const currentYear = new Date().getFullYear();
    document.getElementById('copyrightYear').textContent = currentYear;
});

// --- Cursor Trail Effect ---
const cursorTrail = document.querySelector('.cursor-trail');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const distX = mouseX - cursorX;
    const distY = mouseY - cursorY;
    
    cursorX += distX * 0.1;
    cursorY += distY * 0.1;
    
    cursorTrail.style.left = cursorX + 'px';
    cursorTrail.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// --- Update Slider Progress Visualization ---
function updateSliderProgress() {
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
        const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.setProperty('--value', value + '%');
    });
}

// Update slider progress on input
speedControl.addEventListener('input', updateSliderProgress);
fontSizeControl.addEventListener('input', updateSliderProgress);
lineSpacingControl.addEventListener('input', updateSliderProgress);
marginControl.addEventListener('input', updateSliderProgress);

// Initialize slider progress
updateSliderProgress();

// --- Add Particle Effects on Button Click ---
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.background = 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 5 + 2;
    const lifetime = Math.random() * 1000 + 500;
    
    let opacity = 1;
    const startTime = Date.now();
    
    function updateParticle() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / lifetime;
        
        if (progress >= 1) {
            particle.remove();
            return;
        }
        
        const x = parseFloat(particle.style.left) + Math.cos(angle) * velocity;
        const y = parseFloat(particle.style.top) + Math.sin(angle) * velocity + progress * 2;
        
        opacity = 1 - progress;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = opacity;
        particle.style.transform = `scale(${1 - progress * 0.5})`;
        
        requestAnimationFrame(updateParticle);
    }
    
    updateParticle();
}

// Add particle effects to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => createParticle(x, y), i * 50);
        }
    });
});

// --- Terminal Animation Logic ---
const terminalAnimation = document.getElementById('terminalAnimation');
const typingText = document.getElementById('typingText');
const scriptTextarea = document.getElementById('script');

// Messages to cycle through
const terminalMessages = {
    bn: [
        'আপনার উন্নত টেলিপ্রম্পটারে স্বাগতম!',
        'শুরু করতে এই টেক্সটটি আপনার নিজের স্ক্রিপ্ট দিয়ে প্রতিস্থাপন করুন।',
        'ডানদিকের সেটিংস ব্যবহার করে গতি, ফন্টের আকার এবং আরও অনেক কিছু সামঞ্জস্য করুন।'
    ],
    en: [
        'Welcome to your advanced teleprompter!',
        'Start by replacing this text with your own script.',
        'Use the settings on the right to adjust speed, font size and more.'
    ]
};

let currentMessageIndex = 0;

function cycleTerminalMessages() {
    const currentLang = document.body.getAttribute('data-lang') || 'bn';
    const messages = terminalMessages[currentLang];
    
    if (messages && messages.length > 0) {
        typingText.textContent = messages[currentMessageIndex];
        currentMessageIndex = (currentMessageIndex + 1) % messages.length;
    }
}

// Start cycling messages every 6 seconds (matches animation duration)
setInterval(cycleTerminalMessages, 6000);

// Hide terminal animation when user types in textarea
scriptTextarea.addEventListener('input', function() {
    if (this.value.length > 0) {
        terminalAnimation.classList.add('hidden');
    } else {
        terminalAnimation.classList.remove('hidden');
    }
});

// Show terminal animation when textarea is empty on focus out
scriptTextarea.addEventListener('blur', function() {
    if (this.value.length === 0) {
        terminalAnimation.classList.remove('hidden');
    }
});

// Initialize terminal animation
cycleTerminalMessages();

// --- Todo Checkbox Functionality ---
function initializeTodoCheckboxes() {
    const coloredCheckboxes = document.querySelectorAll('.colored-checkbox');
    
    // Load saved checkbox states from localStorage
    coloredCheckboxes.forEach(checkbox => {
        const savedState = localStorage.getItem(`todo_${checkbox.id}`);
        if (savedState === 'true') {
            checkbox.checked = true;
        }
    });
    
    // Add event listeners for state persistence
    coloredCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            localStorage.setItem(`todo_${this.id}`, this.checked);
            
            // Add some visual feedback
            if (this.checked) {
                // Create a small celebration effect
                createTodoCompleteEffect(this);
            }
        });
    });
}

// Create a small particle effect when todo is completed
function createTodoCompleteEffect(checkbox) {
    const rect = checkbox.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create small celebration particles
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY);
        }, i * 100);
    }
}

// Add progress tracking
function updateTodoProgress() {
    const totalTodos = document.querySelectorAll('.colored-checkbox').length;
    const completedTodos = document.querySelectorAll('.colored-checkbox:checked').length;
    const progress = Math.round((completedTodos / totalTodos) * 100);
    
    // You can add a progress indicator here if needed
    console.log(`Todo Progress: ${completedTodos}/${totalTodos} (${progress}%)`);
}

// Initialize todo checkboxes when page loads
initializeTodoCheckboxes();

// Update progress whenever a checkbox changes
document.addEventListener('change', function(e) {
    if (e.target.classList.contains('colored-checkbox')) {
        updateTodoProgress();
    }
});
