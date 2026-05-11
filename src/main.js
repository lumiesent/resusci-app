import { createActor } from 'xstate';

import { allergyMachine, allergyDialog } from './scenarios/allergy.js';
import { stomachMachine, stomachDialog } from './scenarios/stomach.js';
import { headacheMachine, headacheDialog } from './scenarios/headache.js';
import { backpainMachine, backpainDialog } from './scenarios/backpain.js';
import { pregnancyMachine, pregnancyDialog } from './scenarios/pregnancy.js';
import { diabetesMachine, diabetesDialog } from './scenarios/diabetes.js';
import { seizuresMachine, seizuresDialog } from './scenarios/seizures.js';
import { dyspneaMachine, dyspneaDialog } from './scenarios/dyspnea.js';
import { hemorrhageMachine, hemorrhageDialog } from './scenarios/hemorrhage.js';
import { lyingMachine, lyingDialog } from './scenarios/lying.js';
import { unconsciousMachine, unconsciousDialog } from './scenarios/unconscious.js';
import { burnsMachine, burnsDialog } from './scenarios/burns.js';
import { hypothermiaMachine, hypothermiaDialog } from './scenarios/hypothermia.js';
import { paralysisMachine, paralysisDialog } from './scenarios/paralysis.js';
import { electrocutionMachine, electrocutionDialog } from './scenarios/electrocution.js';

import { setupNLP } from './nlpSetup.js';
import { icons } from './icons.js'; // Zaimportuj ikony
import logoUrl from './img/logo.png';

// --- BAZA WIEDZY O SCENARIUSZACH ---
const scenarioRegistry = {
  'allergy': { 
    machine: allergyMachine, 
    dialog: allergyDialog, 
    icon: icons.allergy, // Ścieżka do SVG
    title: 'Alergia', 
    desc: 'Stany alergiczne mogą objawiać się dusznościami, wysypką, obrzękiem dróg oddechowych. Wymagają szybkiej identyfikacji i podjęcia działań ratunkowych.' 
  },
  'stomach': { 
    machine: stomachMachine, 
    dialog: stomachDialog, 
    icon: icons.stomach, // Ścieżka do SVG
    title: 'Ból Brzucha', 
    desc: 'Silny ból brzucha może świadczyć o wielu groźnych schorzeniach. Kluczowe jest określenie umiejscowienia bólu oraz chorób współistniejących.' 
  },
  'headache': { 
    machine: headacheMachine, 
    dialog: headacheDialog, 
    icon: icons.headache, // Ścieżka do SVG
    title: 'Ból Głowy', 
    desc: 'Nagły, rozdzierający ból głowy często zwiastuje stany zagrażające życiu, w tym udar lub pęknięcie tętniaka. Reakcja musi być natychmiastowa.' 
  },
  'backpain': { 
    machine: backpainMachine, 
    dialog: backpainDialog, 
    icon: icons.placeholder, // Ścieżka do SVG
    title: 'Ból Pleców', 
    desc: 'Urazy i silne bóle kręgosłupa mogą prowadzić do niedowładów. Istotne jest ustalenie występowania zaburzeń neurologicznych.' 
  },
  'pregnancy': { 
    machine: pregnancyMachine, 
    dialog: pregnancyDialog, 
    icon: icons.placeholder, // Ścieżka do SVG
    title: 'Ciąża, Poród, Poronienie', 
    desc: 'Specyficzne stany związane z ciąży, porodem i poronieniem wymagają szybkiej identyfikacji i podjęcia działań ratunkowych.' 
  },
  'diabetes': { 
    machine: diabetesMachine, 
    dialog: diabetesDialog, 
    icon: icons.placeholder, // Ścieżka do SVG
    title: 'Cukrzyca', 
    desc: 'Zaburzenia glikemii mogą prowadzić do stanów zagrożenia życia. Kluczowe jest szybkie rozpoznanie i podjęcie działań ratunkowych.' 
  },
  'seizures': { 
    machine: seizuresMachine, 
    dialog: seizuresDialog, 
    icon: icons.placeholder, // Ścieżka do SVG
    title: 'Drgawki', 
    desc: 'Ataki drgawkowe mogą być objawem poważnych schorzeń neurologicznych. Szybka identyfikacja i podjęcie działań ratunkowych są kluczowe.' 
  },
  'dyspnea': { 
    machine: dyspneaMachine, 
    dialog: dyspneaDialog, 
    icon: icons.placeholder, // Ścieżka do SVG
    title: 'Duszność', 
    desc: 'Duszność może być objawem wielu schorzeń, w tym chorób serca i płuc. Szybka identyfikacja i podjęcie działań ratunkowych są kluczowe.' 
  },
  'hemorrhage': { 
    machine: hemorrhageMachine, 
    dialog: hemorrhageDialog, 
    icon: icons.placeholder, // Ścieżka do SVG
    title: 'Krwotok', 
    desc: 'Krwotok, zarówno zewnętrzny, jak i wewnętrzny, stanowi bezpośrednie zagrożenie życia. Szybka identyfikacja i podjęcie działań ratunkowych są kluczowe.'
  },
  'lying': { 
    machine: lyingMachine, 
    dialog: lyingDialog, 
    icon: icons.placeholder, // Ścieżka do SVG
    title: 'Osoba Leżąca', 
    desc: 'Osoba leżąca, zwłaszcza nieprzytomna, wymaga szybkiej oceny stanu zdrowia i podjęcia odpowiednich działań ratunkowych.' 
  },
  'unconscious': { 
    machine: unconsciousMachine, 
    dialog: unconsciousDialog, 
    icon: icons.placeholder, // Ścieżka do SVG
    title: 'Nieprzytomny', 
    desc: 'Nieprzytomny pacjent wymaga natychmiastowej oceny stanu zdrowia i podjęcia odpowiednich działań ratunkowych.' 
  },
  'burns': { 
    machine: burnsMachine, 
    dialog: burnsDialog, 
    icon: icons.placeholder, // Ścieżka do SVG
    title: 'Oparzenia', 
    desc: 'Oparzenia, zwłaszcza rozległe lub głębokie, stanowią poważne zagrożenie dla zdrowia. Szybka identyfikacja i podjęcie działań ratunkowych są kluczowe.' 
  },
  'hypothermia': { 
    machine: hypothermiaMachine, 
    dialog: hypothermiaDialog, 
    icon: icons.placeholder, // Ścieżka do SVG
    title: 'Hipotermia', 
    desc: 'Hipotermia, czyli obniżenie temperatury ciała poniżej normy, może prowadzić do poważnych komplikacji zdrowotnych. Szybka identyfikacja i podjęcie działań ratunkowych są kluczowe.'
  },
  'paralysis': {
    machine: paralysisMachine,
    dialog: paralysisDialog,
    icon: icons.placeholder, // Ścieżka do SVG
    title: 'Paraliż', 
    desc: 'Paraliż, czyli utrata zdolności ruchowych, może być objawem poważnych schorzeń neurologicznych. Szybka identyfikacja i podjęcie działań ratunkowych są kluczowe.'
  },
  'electrocution': {
    machine: electrocutionMachine,
    dialog: electrocutionDialog,
    icon: icons.placeholder, // Ścieżka do SVG
    title: 'Porażenie prądem', 
    desc: 'Porażenie prądem, zwłaszcza wysokim napięciem, może prowadzić do poważnych obrażeń i stanowi bezpośrednie zagrożenie życia. Szybka identyfikacja i podjęcie działań ratunkowych są kluczowe, jednak najważniejsze jest twoje bezpieczeństwo.'
  }
};

// --- REFERENCJE DO ELEMENTÓW UI ---
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const micBtn = document.getElementById('mic-btn');
const hintText = document.getElementById('hint-text');

let nlpEngine;
let scenarioActor;
let lastStateValue = null;
let currentDialog = null;
let currentScenarioId = null;
let isHybridMode = false;

// --- SYSTEM NAWIGACJI ---
function navTo(targetScreenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    if (screen.id === targetScreenId) {
      screen.classList.add('active');
      screen.classList.remove('prev');
    } else if (screen.classList.contains('active')) {
      screen.classList.add('prev');
      screen.classList.remove('active');
    }
  });
}

document.querySelectorAll('.nav-back-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    navTo(e.currentTarget.dataset.target);
  });
});

// --- SYNTEZA MOWY ---
const synth = window.speechSynthesis;
function speak(text) {
  if (!isHybridMode) return; 
  if (synth.speaking) synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pl-PL';
  synth.speak(utterance);
}

// --- ROZPOZNAWANIE MOWY ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.lang = 'pl-PL';
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  let finalTranscript = '';
  let lastProcessedIndex = -1;

  recognition.onstart = () => {
    finalTranscript = '';
    lastProcessedIndex = -1;
    micBtn.classList.add('recording');
    console.log("Rozpoczęto nasłuchiwanie...");
  };

  // Wewnątrz funkcji setupSpeechRecognition lub tam, gdzie inicjalizujesz recognition:
  recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            // To jest tekst, który został definitywnie rozpoznany
            finalTranscript += event.results[i][0].transcript;
        } else {
            // To jest tekst "w locie", który jeszcze może się zmienić
            interimTranscript += event.results[i][0].transcript;
        }
    }

    // Aktualizujemy pole input tylko tekstem finalnym 
    // lub dynamicznie podmieniamy zawartość zamiast dopisywać (+=)
    if (finalTranscript !== '') {
        userInput.value = finalTranscript.trim();
        
        // Opcjonalnie: automatyczne wysłanie, jeśli chcesz trybu hands-free
        // handleUserInput(); 
    } else {
        // Opcjonalnie: pokaż użytkownikowi, co bot słyszy w tej chwili (szary tekst)
        userInput.value = interimTranscript;
    }
};
  
  recognition.onend = () => {
    micBtn.classList.remove('recording');
    if (finalTranscript.trim()) {
      userInput.value = finalTranscript.trim();
      handleUserInput();
    }
    console.log("Zakończono nasłuchiwanie.");
  };

  recognition.onerror = (event) => {
    console.error("Błąd rozpoznawania mowy:", event.error);
    micBtn.classList.remove('recording');
  };
}

// --- AKTUALIZACJA UI ZE STANU MASZYNY ---
function updateUIFromState(state) {
  if (!state) return;
  const dialog = currentDialog[state.value];
  if (dialog) {
    addMessage(dialog.message, 'bot');
    speak(dialog.message);
    hintText.textContent = dialog.hint;
  }
}

// --- WEJŚCIE UŻYTKOWNIKA (NLP) ---
async function handleUserInput() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  userInput.value = '';

  const currentState = scenarioActor.getSnapshot().value;

  // Obsługa stanów wymagających bezpośredniego tekstu (lokalizacja/lek)
  if (currentState === 'start') {
    scenarioActor.send({ type: 'USER_PROVIDED_LOCATION', text: text });
    return;
  } else if (currentState === 'ask_which_medicine') {
    scenarioActor.send({ type: 'USER_PROVIDED_MEDICINE', text: text });
    return;
  }

  const response = await nlpEngine.process('pl', text);
  
  if (response.intent === 'None' && (currentState == "ask_consciousness" || currentState == "ask_breathing")) {
    const fallbackMsg = 'Nie zrozumiałem dokładnie. Spróbuj ująć to inaczej.';
    addMessage(fallbackMsg, 'bot');
    speak(fallbackMsg);
    return;
  }
  
  scenarioActor.send({ type: response.intent, text: text });
}

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${sender}`;
  
  if (sender === 'bot') {
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    // Używamy zmiennej logoUrl zamiast sztywnej ścieżki tekstowej
    avatar.innerHTML = `<img src="${logoUrl}" alt="Bot" class="avatar-image">`;
    msgDiv.appendChild(avatar);
  }
  
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;
  msgDiv.appendChild(bubble);
  
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// --- START LOGIKI SCENARIUSZA (CZAT) ---
function startScenario() {
  navTo('screen-chat');
  chatWindow.innerHTML = '';
  hintText.textContent = "Łączenie z dyspozytorem...";
  lastStateValue = null;

  // Kluczowa zmiana: Zarządzanie widocznością przycisku mikrofonu
  if (isHybridMode && recognition) {
    micBtn.classList.remove('mic-hidden');
    micBtn.style.display = 'flex'; // Wymuszenie widoczności
    micBtn.disabled = false;
  } else {
    micBtn.classList.add('mic-hidden');
    micBtn.style.display = 'none'; // Ukrycie
    micBtn.disabled = true;
  }

  const selectedDef = scenarioRegistry[currentScenarioId];
  currentDialog = selectedDef.dialog;
  scenarioActor = createActor(selectedDef.machine);

  scenarioActor.subscribe((state) => {
    if (state.value !== lastStateValue) {
        lastStateValue = state.value;
        updateUIFromState(state);
    }
  });

  scenarioActor.start(); 
}

function exitScenario() {
  if (scenarioActor) scenarioActor.stop();
  if (synth.speaking) synth.cancel();
  if (recognition) recognition.stop();
  navTo('screen-info');
}

// --- INICJALIZACJA APLIKACJI ---
async function initApp() {
  document.getElementById('nav-to-scenario-btn').addEventListener('click', () => navTo('screen-scenario'));

  // Znajdź wszystkie obrazki z klasą logo-image i ustaw im poprawne źródło
  document.querySelectorAll('.logo-image').forEach(img => {
    img.src = logoUrl;
  });
  
  // 1. Rozpocznij ładowanie NLP
  nlpEngine = await setupNLP();
  
  // 2. Kiedy NLP jest gotowe:
  // Najpierw usuwamy klasę 'active' z loading-screen, żeby display: none zadziałało
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.classList.remove('active');
  
  // 3. Przechodzimy do ekranu powitalnego
  navTo('screen-welcome');
  
  // Domyślnie ukrywamy mikrofon na start
  if (micBtn) {
    micBtn.classList.add('mic-hidden');
  }

  // Ustaw ikony scenariuszy z obiektu icons
  const cards = document.querySelectorAll('.scenario-card');
  cards.forEach(card => {
    const scenarioId = card.dataset.scenario;
    const iconImg = card.querySelector('.icon');
    if (iconImg && scenarioRegistry[scenarioId]) {
      iconImg.src = scenarioRegistry[scenarioId].icon;
    }
  });

  // Dodaj event listenery do kart
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      currentScenarioId = e.currentTarget.dataset.scenario;
      const meta = scenarioRegistry[currentScenarioId];
      
      document.getElementById('info-title').textContent = meta.title;
      document.getElementById('info-desc').textContent = meta.desc;
      
      // Pobierz aktualną ścieżkę strony i połącz ją z ikoną
      const baseUrl = window.location.pathname.endsWith('/') 
                      ? window.location.pathname 
                      : window.location.pathname.slice(0, window.location.pathname.lastIndexOf('/') + 1);
      
      const infoIcon = document.getElementById('info-icon');
      infoIcon.src = meta.icon;
      
      navTo('screen-info');
    });
  });

  document.getElementById('mode-text-btn').addEventListener('click', () => {
    isHybridMode = false;
    startScenario();
  });

  document.getElementById('mode-hybrid-btn').addEventListener('click', () => {
    isHybridMode = true;
    startScenario();
  });

  document.getElementById('exit-chat-btn').addEventListener('click', exitScenario);
  sendBtn.addEventListener('click', handleUserInput);
  
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserInput();
  });
  
  // Logika przycisku mikrofonu
  micBtn.addEventListener('click', () => {
    if (!recognition) {
        alert("Twoja przeglądarka nie obsługuje rozpoznawania mowy.");
        return;
    }
    
    try {
        // Jeśli już nasłuchujemy, klikniecie zatrzymuje nagrywanie
        if (micBtn.classList.contains('recording')) {
            recognition.stop();
            console.log("Zatrzymano nagrywanie.");
        } else {
            // Wznów nagrywanie
            recognition.start();
            console.log("Wznowiono nagrywanie.");
        }
    } catch (e) {
        // Zabezpieczenie przed błędem, jeśli użytkownik kliknie dwa razy zbyt szybko
        console.warn("Błąd przy starcie/zatrzymaniu nagrywania:", e);
        try {
            recognition.stop();
        } catch (e2) {
            console.error("Nie można zatrzymać nagrywania:", e2);
        }
    }
  });
}

initApp();