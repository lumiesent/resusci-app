import { createMachine, assign } from 'xstate';

/** Scenariusz: Powieszenie, zadzierzgnięcie
 * ==============================
 * --- SCENARIUSZ POWIESZENIA ---
 * ==============================
 **/

// Słownik Dialogów [Powieszenie]
export const hangingDialog = {
  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 81, słucham',
    hint: 'Przedstaw swoją lokalizację i podaj dokładny adres.'
  },

  ask_situation: {
    message: 'Dobrze, co się stało?.',
    hint: 'Zgłoś zdarzenie (np. "Znalazłem osobę, która powiesiła się w garażu").'
  },

  ask_safety_cut: {
    message: 'Czy pętla została już zdjęta z szyi? Jeśli nie, proszę natychmiast ją odciąć lub zdjąć, ale proszę uważać, by osoba poszkodowana nie spadła na Pana/Panią. Czy jest to możliwe do wykonania teraz?',
    hint: 'Potwierdź odcięcie pętli i zabezpieczenie osoby (np. "Tak, właśnie ją odcinam i kładę na ziemi").'
  },

  ask_time: {
    message: 'Jak dawno mogło do tego dojść? Czy wie Pan/Pani, jak długo ta osoba tak przebywała?',
    hint: 'Podaj przybliżony czas (np. "Nie było mnie 10 minut" lub "Nie wiem, ciało jest zimne").'
  },

  ask_consciousness: {
    message: 'Czy osoba poszkodowana jest przytomna?',
    hint: 'Oceń przytomność (np. "Nie reaguje na nic, jest zupełnie wiotka").'
  },

  ask_breathing: {
    message: 'Czy osoba poszkodowana oddycha? Czy klatka piersiowa się unosi?',
    hint: 'Sprawdź oddech (np. "Nie widzę, żeby oddychała, usta są sine").'
  },

  cpr: {
    message: 'Proszę natychmiast rozpocząć uciskanie klatki piersiowej. Zespół ratownictwa i inne służby są już w drodze. Proszę nie przerywać do ich przyjazdu.',
    hint: 'Rozpocznij resuscytację (RKO).'
  },

  instruction_stabilization: {
    message: 'Proszę ułożyć osobę poszkodowaną płasko na plecach. Należy ograniczyć wszelkie ruchy szyją i głową – może dojść do urazu kręgosłupa. Proszę stabilizować głowę w jednej linii z tułowiem.',
    hint: 'Stabilizuj odcinek szyjny kręgosłupa.'
  },

  final_instructions: {
    message: 'Zgłoszenie zostało przyjęte. Na miejsce wysłano zespół ratownictwa oraz Policję. Proszę pozostać przy osobie poszkodowanej i monitorować oddech. Jeśli przestanie oddychać, proszę natychmiast zacząć uciskanie klatki piersiowej.',
    hint: 'Czekaj na służby, zachowaj spokój na miejscu zdarzenia.'
  }
};

// Maszyna Stanów [Powieszenie]
export const hangingMachine = createMachine({
  id: 'hanging',
  initial: 'start',
  states: {
    start: {
      on: {
        'intent.location': 'ask_situation',
        '*': 'ask_situation'
      }
    },
    ask_situation: {
      on: {
        'intent.hanging.report': 'ask_safety_cut',
        '*': 'ask_safety_cut'
      }
    },
    ask_safety_cut: {
      on: {
        'intent.hanging.cut_confirmed': 'ask_time',
        '*': 'ask_time'
      }
    },
    ask_time: {
      on: {
        'intent.hanging.time': 'ask_consciousness',
        '*': 'ask_consciousness'
      }
    },
    ask_consciousness: {
      on: {
        'intent.unconscious': 'ask_breathing',
        'intent.conscious': 'instruction_stabilization', // Mało prawdopodobne, ale logiczne
        '*': 'ask_breathing'
      }
    },
    ask_breathing: {
      on: {
        'intent.no_breathing': 'cpr',
        'intent.breathing': 'instruction_stabilization'
      }
    },
    cpr: { type: 'final' },
    instruction_stabilization: {
      on: {
        'intent.confirmation': 'final_instructions',
        '*': 'final_instructions'
      }
    },
    final_instructions: { type: 'final' }
  }
});