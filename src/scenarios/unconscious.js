import { createMachine, assign } from 'xstate';

/** Scenariusz: Nieprzytomny
 * ===================================================
 * --- SCENARIUSZ DLA OSOBY NIEPRZYTOMNEJ ---
 * ===================================================
 **/

// Słownik Dialogów [Nieprzytomny]
export const unconsciousDialog = {
  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 81, słucham',
    hint: 'Przedstaw swoją lokalizację, podaj dokładny adres lub punkt odniesienia.'
  },

  ask_situation: {
    message: 'Dobrze, co się stało?.',
    hint: 'Zgłoś znalezienie osoby nieprzytomnej (np. "Osoba poszkodowana nagle osunęła się na ziemię i nie ma z nią kontaktu").'
  },

  ask_safety_co: {
    message: 'Czy na miejscu jest bezpiecznie? Czy w pomieszczeniu czuć jakiś dziwny zapach lub czy działa piecyk gazowy?',
    hint: 'Oceń bezpieczeństwo i ryzyko zatrucia tlenkiem węgla lub gazem.'
  },

  ask_breathing: {
    message: 'Czy osoba poszkodowana oddycha? Proszę pochylić się nad jej twarzą i sprawdzić, czy czuć ruch powietrza i czy klatka piersiowa się unosi.',
    hint: 'Oceń oddech przez 10 sekund (np. "Tak, oddycha, ale jest zupełnie wiotka").'
  },

  cpr: {
    message: 'Proszę natychmiast rozpocząć uciskanie klatki piersiowej. Zespół ratownictwa jest już w drodze.',
    hint: 'Rozpocznij RKO.'
  },

  safe_position_instruction: {
    message: 'Proszę ułożyć osobę poszkodowaną w pozycji bocznej bezpiecznej, aby zapewnić drożność dróg oddechowych. Czy to zrobione?',
    hint: 'Potwierdź ułożenie w pozycji bocznej.'
  },

  ask_skin_sweat: {
    message: 'Jak wygląda skóra osoby poszkodowanej? Czy jest blada, sina, czy może bardzo spocona?',
    hint: 'Opisz wygląd skóry (np. "Jest bardzo blada i cała spocona").'
  },

  ask_history_meds: {
    message: 'Czy wiadomo, czy osoba poszkodowana choruje na cukrzycę, nadciśnienie lub padaczkę? Czy brała dzisiaj jakieś leki?',
    hint: 'Podaj informacje o chorobach i lekach (np. "Choruje na cukrzycę, brała rano insulinę").'
  },

  ask_vomiting: {
    message: 'Czy osoba poszkodowana wymiotowała lub czy widać coś w jej ustach?',
    hint: 'Sprawdź ryzyko zachłyśnięcia.'
  },

  final_instructions: {
    message: 'Zgłoszenie zostało przyjęte. Proszę być przy osobie poszkodowanej, monitorować jej oddech i nie zostawiać jej samej do przyjazdu karetki.',
    hint: 'Czekaj na zespół ratownictwa.'
  }
};

// Maszyna Stanów [Nieprzytomny]
export const unconsciousMachine = createMachine({
  id: 'unconscious',
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
        'intent.unconscious.report': 'ask_safety_co',
        '*': 'ask_safety_co'
      }
    },
    ask_safety_co: {
      on: {
        'intent.unconscious.safety_ok': 'ask_breathing',
        'intent.unconscious.co_risk': 'ask_breathing', // Priorytetem jest oddech po ewakuacji/przewietrzeniu
        '*': 'ask_breathing'
      }
    },
    ask_breathing: {
      on: {
        'intent.no_breathing': 'cpr',
        'intent.breathing': 'safe_position_instruction',
        '*': 'safe_position_instruction'
      }
    },
    cpr: { type: 'final' },
    safe_position_instruction: {
      on: {
        'intent.confirmation': 'ask_skin_sweat',
        '*': 'ask_skin_sweat'
      }
    },
    ask_skin_sweat: {
      on: {
        'intent.unconscious.skin_symptoms': 'ask_history_meds',
        '*': 'ask_history_meds'
      }
    },
    ask_history_meds: {
      on: {
        'intent.unconscious.history': 'ask_vomiting',
        '*': 'ask_vomiting'
      }
    },
    ask_vomiting: {
      on: {
        'intent.unconscious.vomiting': 'final_instructions',
        '*': 'final_instructions'
      }
    },
    final_instructions: { type: 'final' }
  }
});