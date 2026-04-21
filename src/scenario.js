/**
 * PLIK SCENARIUSZY I LOGIKI (scenario.js)
 * * Ten plik definiuje "kroki" (stany) w poszczególnych symulacjach,
 * * oraz to, co dyspozytor (Bot) ma powiedzieć w każdym z tych kroków.
 * * Używamy tu biblioteki XState do tworzenia tzw. "Maszyn Stanów" (State Machines).
 */

import { createMachine } from 'xstate';

// ============================================================================
// SCENARIUSZ 1: ZATRZYMANIE KRĄŻENIA (emergency)
// ============================================================================

/**
 * 1A. SŁOWNIK DIALOGÓW (Zatrzymanie krążenia)
 * Ten obiekt przypisuje tekst bota i podpowiedzi (UI) do konkretnych kroków scenariusza.
 * UWAGA: Klucze tutaj ('start', 'ask_consciousness') MUSZĄ być identyczne jak stany w maszynie poniżej.
 */
export const scenarioDialog = {
  start: {
    message: 'Numer alarmowy 112, w czym mogę pomóc?',
    hint: 'Powiedz co się stało (np. "Ktoś zasłabł na ulicy").'
  },
  ask_consciousness: {
    message: 'Zrozumiałem. Czy poszkodowany jest przytomny?',
    hint: 'Odpowiedz czy osoba reaguje, np. "Nie, leży bez ruchu" lub "Tak, rozmawia ze mną".'
  },
  ask_breathing: {
    message: 'Proszę sprawdzić, czy pacjent oddycha. Proszę przyłożyć ucho do jego ust i obserwować klatkę piersiową przez 10 sekund.',
    hint: 'Odpowiedz czy oddycha (np. "Nie słyszę oddechu", "Tak, klatka się unosi").'
  },
  ask_symptoms: {
    message: 'Co dokładnie mu dolega? Na co się uskarża?',
    hint: 'Podaj objawy (np. "Boli go w klatce piersiowej").'
  },
  cpr_instructions: {
    message: 'Wysyłam Zespół Ratownictwa Medycznego. Proszę natychmiast rozpocząć uciśnięcia klatki piersiowej. Będę panu dyktował tempo.',
    hint: 'Zastosuj się do instrukcji.'
  },
  recovery_position: {
    message: 'Proszę ułożyć poszkodowanego w pozycji bocznej ustalonej i cały czas kontrolować oddech. Karetka jest w drodze.',
    hint: 'Oczekuj na przyjazd ZRM.'
  }
};

/**
 * 1B. MASZYNA STANÓW (Zatrzymanie krążenia)
 * Definiuje, po jakich ścieżkach może poruszać się użytkownik.
 * Zapobiega to omyłkowemu przeskoczeniu z pierwszego kroku od razu do np. resuscytacji.
 */
export const emergencyMachine = createMachine({
  id: 'emergency',   // Unikalny identyfikator maszyny
  initial: 'start',  // Od tego stanu zawsze zaczynamy za każdym razem, gdy uruchamiamy ten scenariusz
  states: {
    
    // KROK 1: Powitanie i oczekiwanie na zgłoszenie
    start: {
      // Blok 'on' nasłuchuje na intencje zwrócone przez sztuczną inteligencję (NLP).
      // Jeśli AI rozpozna 'intent.emergency.report', maszyna przechodzi do stanu 'ask_consciousness'
      on: { 'intent.emergency.report': 'ask_consciousness' }
    },
    
    // KROK 2: Sprawdzanie przytomności (Tu mamy rozgałęzienie scenariusza!)
    ask_consciousness: {
      on: {
        'intent.patient.unconscious': 'ask_breathing', // Jeśli jest nieprzytomny -> pytamy o oddech
        'intent.patient.conscious': 'ask_symptoms'     // Jeśli jest przytomny -> pytamy o objawy
      }
    },
    
    // KROK 3: Sprawdzanie oddechu (trafimy tu tylko w przypadku osoby nieprzytomnej)
    ask_breathing: {
      on: {
        'intent.patient.not_breathing': 'cpr_instructions', // Brak oddechu -> instrukcje RKO
        'intent.patient.breathing': 'recovery_position'     // Oddycha -> pozycja boczna
      }
    },
    
    // KROKI KOŃCOWE (Zakończenie rozmowy)
    // Parametr { type: 'final' } oznacza koniec scenariusza, dyspozytor wykonał swoje zadanie.
    ask_symptoms: { type: 'final' },
    cpr_instructions: { type: 'final' },
    recovery_position: { type: 'final' }
  }
});


// ============================================================================
// SCENARIUSZ 2: ALERGIA / WSTRZĄS ANAFILAKTYCZNY
// ============================================================================

/**
 * 2A. SŁOWNIK DIALOGÓW (Alergia)
 */
export const allergyDialog = {
  start: {
    message: 'Numer alarmowy 112, w czym mogę pomóc?',
    hint: 'Zgłoś silną reakcję alergiczną (np. "Dusi się po użądleniu").'
  },
  ask_epipen: {
    message: 'Czy poszkodowany ma przy sobie ampułkostrzykawkę z adrenaliną?',
    hint: 'Odpowiedz czy ma zastrzyk (np. "Tak, ma w torbie" lub "Nie mamy").'
  },
  instruct_epipen: {
    message: 'Proszę natychmiast podać adrenalinę w zewnętrzną część uda. Karetka jest już w drodze.',
    hint: 'Podaj adrenalinę i czekaj.'
  },
  dispatch_only: {
    message: 'Rozumiem. Wysyłam Zespół Ratownictwa Medycznego na sygnale. Proszę zapewnić mu dostęp świeżego powietrza.',
    hint: 'Czekaj na przyjazd ratowników.'
  }
};

/**
 * 2B. MASZYNA STANÓW (Alergia)
 */
export const allergyMachine = createMachine({
  id: 'allergy',
  initial: 'start',
  states: {
    
    start: {
      on: { 'intent.allergy.report': 'ask_epipen' }
    },
    
    ask_epipen: {
      // Rozgałęzienie: czy dzwoniący ma przy sobie adrenalinę (np. EpiPen)?
      on: {
        'intent.allergy.has_epipen': 'instruct_epipen', // Tak -> instruujemy o podaniu w udo
        'intent.allergy.no_epipen': 'dispatch_only'     // Nie -> wysyłamy szybko karetkę bez podawania leku
      }
    },
    
    instruct_epipen: { type: 'final' },
    dispatch_only: { type: 'final' }
  }
});

// ============================================================================
// INSTRUKCJA DLA JUNIORA: JAK DODAĆ NOWY SCENARIUSZ (np. Wypadek Drogowy)
// ============================================================================
// 1. Skopiuj jeden z powyższych słowników (np. allergyDialog) i zmień nazwę (np. na carCrashDialog).
// 2. Skonfiguruj w nim kroki, komunikaty i wskazówki.
// 3. Skopiuj maszynę stanów (np. allergyMachine) i zmień nazwę (np. na carCrashMachine) oraz `id`.
// 4. Dopasuj intencje (klucze w blokach `on: { ... }`) – zadeklaruj, na jakie sygnały AI reaguje maszyna w danym kroku.
// 5. Pamiętaj o dodaniu słowa `export` przed `const`! (Inaczej plik main.js tego nie zobaczy).
// 6. Przejdź do nlpSetup.js, aby "nauczyć" AI słów kluczowych odpowiadających nowym intencjom.