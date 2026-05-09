import { createActor } from 'xstate';
import { 
  allergyMachine, allergyDialog,
  stomachMachine, stomachDialog,
  headacheMachine, headacheDialog,
  backpainMachine, backpainDialog
} from './scenario.js';
import { setupNLP } from './nlpSetup.js';

// --- BAZA WIEDZY O SCENARIUSZACH ---
const scenarioRegistry = {
  'allergy': { 
    machine: allergyMachine, 
    dialog: allergyDialog, 
    icon: '/src/img/allergy-icon.svg', // Ścieżka do SVG
    title: 'Alergia', 
    desc: 'Stany alergiczne mogą objawiać się dusznościami, wysypką, obrzękiem dróg oddechowych. Wymagają szybkiej identyfikacji i podjęcia działań ratunkowych.' 
  },
  'stomach': { 
    machine: stomachMachine, 
    dialog: stomachDialog, 
    icon: '/src/img/stomach-icon.svg', // Ścieżka do SVG
    title: 'Ból Brzucha', 
    desc: 'Silny ból brzucha może świadczyć o wielu groźnych schorzeniach. Kluczowe jest określenie umiejscowienia bólu oraz chorób współistniejących.' 
  },
  'headache': { 
    machine: headacheMachine, 
    dialog: headacheDialog, 
    icon: '/src/img/headache-icon.svg', // Ścieżka do SVG
    title: 'Ból Głowy', 
    desc: 'Nagły, rozdzierający ból głowy często zwiastuje stany zagrażające życiu, w tym udar lub pęknięcie tętniaka. Reakcja musi być natychmiastowa.' 
  },
  'backpain': { 
    machine: backpainMachine, 
    dialog: backpainDialog, 
    icon: '/src/img/placeholder.svg', // Ścieżka do SVG
    title: 'Ból Pleców', 
    desc: 'Urazy i silne bóle kręgosłupa mogą prowadzić do niedowładów. Istotne jest ustalenie występowania zaburzeń neurologicznych.' 
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

  recognition.onstart = () => {
    finalTranscript = '';
    micBtn.classList.add('recording');
    console.log("Rozpoczęto nasłuchiwanie...");
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      
      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' ';
      } else {
        interimTranscript += transcript;
      }
    }
    
    userInput.value = finalTranscript + interimTranscript;
    console.log("Transkrypcja:", userInput.value);
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
  if (currentState === 'ask_location') {
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
    avatar.innerHTML = `<img src="src/img/logo.png" alt="Bot" class="avatar-image">`;
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

  const cards = document.querySelectorAll('.scenario-card');
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      currentScenarioId = e.currentTarget.dataset.scenario;
      const meta = scenarioRegistry[currentScenarioId];
      
      document.getElementById('info-title').textContent = meta.title;
      document.getElementById('info-desc').textContent = meta.desc;
      
      // ZMIANA: Podmiana źródła obrazka zamiast textContent ikony Material
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