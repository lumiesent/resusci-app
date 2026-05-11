import { createMachine, assign } from 'xstate';

/** Scenariusz: Paraliż, bełkotliwa mowa (Udar)
 * ===================================================
 * --- SCENARIUSZ PODEJRZENIA UDARU MÓZGU ---
 * ===================================================
 **/

// Słownik Dialogów [Paraliż / Udar]
export const paralysisDialog = {
  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 81, słucham',
    hint: 'Przedstaw swoją lokalizację i podaj dokładny adres.'
  },

  ask_situation: {
    message: 'Dobrze, co się stało?.',
    hint: 'Zgłoś objawy (np. "Osoba poszkodowana nagle zaczęła bełkotać i nie może podnieść ręki").'
  },

  ask_safety: {
    message: 'Czy na miejscu jest bezpiecznie?',
    hint: 'Potwierdź bezpieczeństwo.'
  },

  ask_consciousness: {
    message: 'Czy osoba poszkodowana jest przytomna?',
    hint: 'Oceń przytomność (np. "Tak, siedzi na krześle, ale nie rozumie co do niej mówię").'
  },

  ask_breathing: {
    message: 'Czy osoba poszkodowana oddycha?',
    hint: 'Oceń oddech u osoby nieprzytomnej.'
  },

  cpr: {
    message: 'Proszę natychmiast rozpocząć uciskanie klatki piersiowej. Zespół ratownictwa jest już w drodze.',
    hint: 'Rozpocznij RKO.'
  },

  ask_fast_face_speech: {
    message: 'Proszę spojrzeć na twarz tej osoby. Czy kącik ust po jednej stronie opadł? Czy po poproszeniu o uśmiech twarz jest niesymetryczna? Czy mowa jest bełkotliwa lub niewyraźna?',
    hint: 'Opisz wygląd twarzy i mowę (np. "Ma wykrzywione usta i bełkocze jakby miała kluchy w buzi").'
  },

  ask_fast_arms: {
    message: 'Proszę poprosić tę osobę, aby wyciągnęła obie ręce przed siebie z dłońmi do góry. Czy jedna z rąk opada lub czy brakuje w niej siły?',
    hint: 'Opisz siłę w kończynach (np. "Prawa ręka od razu jej opada, nie ma w niej w ogóle siły").'
  },

  ask_time_onset: {
    message: 'Kiedy ta osoba była ostatni raz widziana zdrowa, bez żadnych objawów?',
    hint: 'Podaj dokładny czas (np. "20 minut temu jeszcze normalnie piliśmy herbatę").'
  },

  ask_vision_headache_balance: {
    message: 'Czy osoba poszkodowana skarży się na silny ból głowy, zaburzenia widzenia lub czy ma problem z utrzymaniem równowagi?',
    hint: 'Opisz dodatkowe objawy neurologiczne.'
  },

  ask_diabetes_history: {
    message: 'Czy wiadomo, czy osoba poszkodowana choruje na cukrzycę lub nadciśnienie? Czy czuć od niej alkohol?',
    hint: 'Podaj informacje o chorobach (pamiętaj, że cukrzyca może dawać podobne objawy).'
  },

  final_instructions: {
    message: 'Zgłoszenie przyjęte. Proszę nie podawać osobie poszkodowanej nic do picia ani jedzenia, ani żadnych leków. Niech pozostanie w pozycji siedzącej lub leżącej, jeśli tak jej wygodniej. Czekajcie na zespół.',
    hint: 'Monitoruj stan osoby i nie podawaj żadnych płynów.'
  }
};

// Maszyna Stanów [Paraliż / Udar]
export const paralysisMachine = createMachine({
  id: 'paralysis',
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
        'intent.paralysis.report': 'ask_safety',
        '*': 'ask_safety'
      }
    },
    ask_safety: {
      on: {
        'intent.confirmation': 'ask_consciousness',
        '*': 'ask_consciousness'
      }
    },
    ask_consciousness: {
      on: {
        'intent.unconscious': 'ask_breathing',
        'intent.conscious': 'ask_fast_face_speech',
        '*': 'ask_fast_face_speech'
      }
    },
    ask_breathing: {
      on: {
        'intent.breathing': 'final_instructions', // Pozycja bezpieczna domyślnie w instrukcji końcowej dla nieprzytomnych
        'intent.no_breathing': 'cpr'
      }
    },
    cpr: { type: 'final' },
    ask_fast_face_speech: {
      on: {
        'intent.paralysis.face_speech': 'ask_fast_arms',
        '*': 'ask_fast_arms'
      }
    },
    ask_fast_arms: {
      on: {
        'intent.paralysis.arms': 'ask_time_onset',
        '*': 'ask_time_onset'
      }
    },
    ask_time_onset: {
      on: {
        'intent.paralysis.onset_time': 'ask_vision_headache_balance',
        '*': 'ask_vision_headache_balance'
      }
    },
    ask_vision_headache_balance: {
      on: {
        'intent.paralysis.vision_balance': 'ask_diabetes_history',
        '*': 'ask_diabetes_history'
      }
    },
    ask_diabetes_history: {
      on: {
        'intent.paralysis.history': 'final_instructions',
        '*': 'final_instructions'
      }
    },
    final_instructions: { type: 'final' }
  }
});