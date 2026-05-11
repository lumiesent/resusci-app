import { createMachine, assign } from 'xstate';

/** Scenariusz: Osoba leżąca
 * ===================================================
 * --- SCENARIUSZ DLA OSOBY LEŻĄCEJ (NIEZNANY STAN) ---
 * ===================================================
 **/

// Słownik Dialogów [Osoba leżąca]
export const lyingDialog = {
  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 81, słucham',
    hint: 'Przedstaw swoją lokalizację i powiedz, gdzie dokładnie znajduje się osoba poszkodowana.'
  },

  ask_situation: {
    message: 'Dobrze, co się stało?.',
    hint: 'Zgłoś znalezienie osoby leżącej (np. "Na trawniku leży osoba, nie rusza się").'
  },

  ask_safety_circumstances: {
    message: 'Czy na miejscu jest bezpiecznie? Czy doszło do wypadku, potrącenia lub porażenia prądem?',
    hint: 'Oceń bezpieczeństwo i podaj okoliczności (np. "To nie wygląda na wypadek, po prostu leży").'
  },

  ask_consciousness: {
    message: 'Czy osoba poszkodowana jest przytomna? Czy reaguje na głos lub dotyk?',
    hint: 'Podejdź do osoby i oceń przytomność (np. "Otwiera oczy, ale strasznie bełkocze").'
  },

  ask_breathing: {
    message: 'Czy osoba poszkodowana oddycha?',
    hint: 'Oceń oddech, jeśli osoba jest nieprzytomna.'
  },

  cpr: {
    message: 'Proszę natychmiast rozpocząć uciskanie klatki piersiowej. Zespół ratownictwa jest już w drodze.',
    hint: 'Rozpocznij RKO.'
  },

  safe_position: {
    message: 'Proszę ułożyć osobę poszkodowaną w pozycji bocznej bezpiecznej i monitorować jej stan do przyjazdu karetki.',
    hint: 'Ułóż w pozycji bezpiecznej.'
  },

  ask_trauma_blood: {
    message: 'Czy widzi Pan u niej jakieś widoczne obrażenia, krew albo czy wymiotowała?',
    hint: 'Sprawdź ślady urazów (np. "Ma rozbitą głowę, chyba uderzyła w krawężnik").'
  },

  ask_neurology_memory: {
    message: 'Czy osoba poszkodowana wie co się stało? Czy skarży się na ból, drętwienie kończyn lub problemy z widzeniem?',
    hint: 'Zapytaj o pamięć zdarzenia i objawy neurologiczne.'
  },

  ask_medical_history: {
    message: 'Czy wiadomo, czy ta osoba choruje na cukrzycę, padaczkę lub ma problemy z sercem? Czy czuć od niej alkohol?',
    hint: 'Podaj informacje o chorobach lub zapachu alkoholu (pamiętaj, że alkohol może maskować udar lub cukrzycę).'
  },

  final_instructions: {
    message: 'Zgłoszenie zostało przyjęte. Proszę zostać przy osobie poszkodowanej, zapewnić jej komfort cieplny i nie pozwalać jej wstawać na siłę. Czekajcie na pomoc.',
    hint: 'Zostań na miejscu i monitoruj stan poszkodowanego.'
  }
};

// Maszyna Stanów [Osoba leżąca]
export const lyingMachine = createMachine({
  id: 'lying',
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
        'intent.lying.report': 'ask_safety_circumstances',
        '*': 'ask_safety_circumstances'
      }
    },
    ask_safety_circumstances: {
      on: {
        'intent.lying.safety_ok': 'ask_consciousness',
        'intent.lying.circumstances': 'ask_consciousness',
        '*': 'ask_consciousness'
      }
    },
    ask_consciousness: {
      on: {
        'intent.unconscious': 'ask_breathing',
        'intent.conscious': 'ask_trauma_blood',
        'intent.lying.partial_conscious': 'ask_trauma_blood', // Bełkotanie, brak pełnego kontaktu
        '*': 'ask_trauma_blood'
      }
    },
    ask_breathing: {
      on: {
        'intent.breathing': 'safe_position',
        'intent.no_breathing': 'cpr'
      }
    },
    cpr: { type: 'final' },
    safe_position: { type: 'final' },
    ask_trauma_blood: {
      on: {
        'intent.lying.trauma': 'ask_neurology_memory',
        '*': 'ask_neurology_memory'
      }
    },
    ask_neurology_memory: {
      on: {
        'intent.lying.neurology': 'ask_medical_history',
        '*': 'ask_medical_history'
      }
    },
    ask_medical_history: {
      on: {
        'intent.lying.history': 'final_instructions',
        '*': 'final_instructions'
      }
    },
    final_instructions: { type: 'final' }
  }
});