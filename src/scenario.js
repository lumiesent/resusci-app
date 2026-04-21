import { createMachine } from 'xstate';

/** NOTATKI DLA PROGRAMISTY:
 * PLIK SCENARIUSZY I LOGIKI (scenario.js)
 * * Ten plik definiuje "kroki" (stany) w poszczególnych symulacjach,
 * * oraz to, co dyspozytor (Bot) ma powiedzieć w każdym z tych kroków.
 * * Używamy tu biblioteki XState do tworzenia tzw. "Maszyn Stanów" (State Machines).
 * 
 * ============================================================================
 * INSTRUKCJA DLA JUNIORA: JAK DODAĆ NOWY SCENARIUSZ (np. Wypadek Drogowy)
 * ============================================================================
 * 1. Skopiuj jeden z powyższych słowników (np. allergyDialog) i zmień nazwę (np. na carCrashDialog).
 * 2. Skonfiguruj w nim kroki, komunikaty i wskazówki.
 * 3. Skopiuj maszynę stanów (np. allergyMachine) i zmień nazwę (np. na carCrashMachine) oraz `id`.
 * 4. Dopasuj intencje (klucze w blokach `on: { ... }`) – zadeklaruj, na jakie sygnały AI reaguje maszyna w danym kroku.
 * 5. Pamiętaj o dodaniu słowa `export` przed `const`! (Inaczej plik main.js tego nie zobaczy).
 * 6. Przejdź do nlpSetup.js, aby "nauczyć" AI słów kluczowych odpowiadających nowym intencjom.
 */

// ============================================================================
// SCENARIUSZ 2: ALERGIA / WSTRZĄS ANAFILAKTYCZNY
// ============================================================================

/** Scenariusz 2: Alergia
 * ===========================
 *  --- SCENARIUSZ ALERGII ---
 * ===========================
 **/ 

// 2A. Słownik Dialogów [Alergia]
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

// 2B. Maszyna Stanów [Alergia]
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