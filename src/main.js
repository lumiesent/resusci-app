/**
 * GŁÓWNY KONTROLER APLIKACJI (main.js)
 * * Ten plik pełni rolę "dyrygenta" – łączy interfejs użytkownika (HTML/CSS),
 * logikę stanów (XState z scenario.js) oraz rozpoznawanie języka (NLP z nlpSetup.js).
 */
import { createActor } from 'xstate';
// IMPORT LOGIKI: Tutaj musisz dodać importy, gdy stworzysz nowe maszyny i słowniki dialogów.
import { 
  allergyMachine, allergyDialog
} from './scenario.js';
import { setupNLP } from './nlpSetup.js';



// --- REJESTR SCENARIUSZY ---
/**
 * TO JEST KLUCZOWE MIEJSCE:
 * Jeśli dodajesz nowy scenariusz (np. 'fire'), musisz go tutaj zarejestrować.
 * Klucze ('emergency', 'allergy') muszą odpowiadać wartościom 'data-scenario' w HTML.
 */
const scenarioRegistry = {
  'allergy': { machine: allergyMachine, dialog: allergyDialog }
};



// --- REFERENCJE DO ELEMENTÓW UI ---
// Pobieramy elementy z index.html, aby móc nimi manipulować (np. ukrywać/pokazywać ekrany).
const menuScreen = document.getElementById('menu-screen');
const chatScreen = document.getElementById('chat-screen');
const loadingStatus = document.getElementById('loading-status');
const scenarioList = document.getElementById('scenario-list');
const backBtn = document.getElementById('back-btn');

const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const micBtn = document.getElementById('mic-btn');
const hintText = document.getElementById('hint-text');



// --- ZMIENNE STANU APLIKACJI ---
let nlpEngine;       // Przechowuje wytrenowany model sztucznej inteligencji NLP.js.
let scenarioActor;   // "Aktor" XState – instancja aktualnie uruchomionej maszyny stanów.
let lastStateValue = null; // Pomocnicza zmienna, by nie powtarzać komunikatów w tym samym stanie.



// --- SYNTEZA MOWY (Bot mówi do nas) ---

const synth = window.speechSynthesis;

function speak(text) {
  // Przerwij poprzednią mowę, jeśli jeszcze trwa
  if (synth.speaking) synth.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pl-PL'; // Ustawienie języka polskiego dla lektora
  synth.speak(utterance);
}



// --- ROZPOZNAWANIE MOWY (My mówimy do bota) ---

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.lang = 'pl-PL';
  recognition.continuous = false; // Zatrzymaj nasłuchiwanie po jednym zdaniu
  recognition.interimResults = false; // Nie pokazuj wyników częściowych

  // Reakcja na rozpoznany tekst
  recognition.onresult = (event) => {
    userInput.value = event.results[0][0].transcript;
    handleUserInput(); // Automatyczne wysłanie po zakończeniu mowy
  };

  // Efekty wizualne nagrywania (zdefiniowane w style.css jako klasa .recording)
  recognition.onstart = () => micBtn.classList.add('recording');
  recognition.onend = () => micBtn.classList.remove('recording');
} else {
  // Jeśli przeglądarka nie wspiera SpeechRecognition, ukrywamy przycisk mikrofonu
  micBtn.style.display = 'none';
}



// --- FUNKCJA POMOCNICZA: DODAWANIE WIADOMOŚCI DO OKNA CZATU ---
function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender); // sender to 'bot' lub 'user'
  
  // Tworzenie awatara (D dla Dyspozytora, U dla Użytkownika)
  const avatar = document.createElement('div');
  avatar.classList.add('avatar');
  avatar.innerHTML = sender === 'bot' ? '<span>D</span>' : '<span>U</span>';
  msgDiv.appendChild(avatar);
  
  // Kontener na tekst
  const textDiv = document.createElement('div');
  textDiv.classList.add('text-content');
  textDiv.textContent = text;
  msgDiv.appendChild(textDiv);
  
  chatWindow.appendChild(msgDiv);
  // Automatyczne przewijanie czatu na sam dół przy nowej wiadomości
  chatWindow.scrollTop = chatWindow.scrollHeight;
}



let currentDialog = null; // Tu przechowujemy słownik tekstów dla wybranego scenariusza

// --- AKTUALIZACJA INTERFEJSU NA PODSTAWIE STANU MASZYNY ---
function updateUIFromState(state) {
  if (!state) return;
  
  // Pobieramy wiadomość i wskazówkę przypisaną do konkretnego stanu (np. 'ask_breathing')
  const dialog = currentDialog[state.value];
  if (dialog) {
    addMessage(dialog.message, 'bot'); // Bot pisze
    speak(dialog.message);            // Bot mówi
    hintText.textContent = dialog.hint; // Aktualizacja paska podpowiedzi
  }
}



// --- PRZETWARZANIE WEJŚCIA UŻYTKOWNIKA (NLP) ---
async function handleUserInput() {
  const text = userInput.value.trim();
  if (!text) return;

  // 1. Dodaj tekst użytkownika do okna czatu
  addMessage(text, 'user');
  userInput.value = '';

  // 2. Prześlij tekst do silnika NLP, aby odgadnąć intencję (Intent)
  const response = await nlpEngine.process('pl', text);
  
  // 3. Obsługa przypadku, gdy AI nic nie zrozumiało (Score poniżej progu lub intent 'None')
  if (response.intent === 'None') {
    addMessage('Nie zrozumiałem dokładnie. Spróbuj ująć to inaczej.', 'bot');
    speak('Nie zrozumiałem dokładnie. Spróbuj ująć to inaczej.');
    return;
  }
  
  // 4. WYŚLIJ INTENCJĘ DO MASZYNY STANÓW.
  // Jeśli maszyna w obecnym stanie posiada przejście (on:) dla tej intencji, zmieni stan.
  scenarioActor.send({ type: response.intent });
}



// --- URUCHAMIANIE KONKRETNEGO SCENARIUSZA ---
function startScenario(scenarioId) {
  // Przełączanie widoków
  menuScreen.classList.add('hidden');
  chatScreen.classList.remove('hidden');
  
  // Reset czatu
  chatWindow.innerHTML = '';
  hintText.textContent = "Czekam na połączenie...";
  lastStateValue = null;

  // Pobranie definicji z rejestru na podstawie klikniętej karty
  const selectedDef = scenarioRegistry[scenarioId];
  if (!selectedDef) {
      console.error("Nie znaleziono scenariusza w rejestrze:", scenarioId);
      return;
  }
  
  currentDialog = selectedDef.dialog;
  // Tworzymy "aktora" na bazie maszyny XState
  scenarioActor = createActor(selectedDef.machine);

  // Dodajemy przycisk inicjujący "połączenie"
  const callBtn = document.createElement('button');
  callBtn.innerHTML = 'Rozpocznij Scenariusz';
  callBtn.style.margin = '20px auto';
  callBtn.classList.add('modern-call-btn');
  chatWindow.appendChild(callBtn);

  callBtn.addEventListener('click', () => {
    callBtn.remove(); // Usuwamy przycisk po kliknięciu
    
    // Subskrypcja: funkcja ta wywoła się za każdym razem, gdy maszyna zmieni stan
    scenarioActor.subscribe((state) => {
      if (state.value !== lastStateValue) {
          lastStateValue = state.value;
          updateUIFromState(state);
      }
    });
    
    // Start maszyny (uruchamia stan 'initial')
    scenarioActor.start(); 
  });
}



// --- POWRÓT DO MENU ---
function exitScenario() {
  if (scenarioActor) {
    scenarioActor.stop(); // Zatrzymanie logiki maszyny, by nie działała w tle
  }
  synth.cancel(); // Wyciszenie bota
  if (recognition) recognition.stop();
  
  chatScreen.classList.add('hidden');
  menuScreen.classList.remove('hidden');
}



// --- INICJALIZACJA APLIKACJI (START) ---
async function initApp() {
  /**
   * Ładowanie AI (NLP) odbywa się na początku. 
   * Dopóki to trwa, użytkownik widzi komunikat "Ładowanie sztucznej inteligencji...".
   */
  nlpEngine = await setupNLP();
  
  // Gdy gotowe, ukrywamy status i pokazujemy listę scenariuszy
  loadingStatus.classList.add('hidden');
  scenarioList.classList.remove('hidden');

  // Podpięcie zdarzeń do kart w menu
  const cards = document.querySelectorAll('.scenario-card:not([disabled])');
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      const scenarioId = e.currentTarget.dataset.scenario;
      startScenario(scenarioId);
    });
  });

  // Obsługa przycisków i klawiatury
  backBtn.addEventListener('click', exitScenario);
  sendBtn.addEventListener('click', handleUserInput);
  
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserInput();
  });
  
  micBtn.addEventListener('click', () => {
    if (recognition) recognition.start();
  });
}

// ODPALENIE CAŁEGO PROCESU
initApp();