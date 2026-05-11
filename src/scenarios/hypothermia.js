import { createMachine, assign } from 'xstate';

/** Scenariusz: Wyziębienie, hipotermia
 * =============================
 * --- SCENARIUSZ HIPOTERMII ---
 * =============================
 **/

// Słownik Dialogów [Hipotermia]
export const hypothermiaDialog = {
  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 81, słucham',
    hint: 'Przedstaw swoją lokalizację i podaj dokładny adres.'
  },

  ask_situation: {
    message: 'Dobrze, co się stało?.',
    hint: 'Zgłoś przypadek wychłodzenia (np. "Znalazłem osobę w lesie, jest bardzo zimna i ledwo się rusza").'
  },

  ask_consciousness: {
    message: 'Czy osoba poszkodowana jest przytomna?',
    hint: 'Oceń przytomność (np. "Tak, odpowiada, ale bardzo powoli").'
  },

  ask_breathing: {
    message: 'Czy osoba poszkodowana oddycha?',
    hint: 'Oceń oddech u osoby nieprzytomnej.'
  },

  cpr: {
    message: 'Proszę natychmiast rozpocząć uciskanie klatki piersiowej. Zespół ratownictwa jest już w drodze.',
    hint: 'Rozpocznij RKO.'
  },

  safe_position: {
    message: 'Proszę ułożyć osobę poszkodowaną w pozycji bocznej bezpiecznej i chronić przed dalszym wychłodzeniem.',
    hint: 'Ułóż w pozycji bezpiecznej.'
  },

  ask_exposure_time: {
    message: 'Jak długo ta osoba mogła przebywać w niskiej temperaturze?',
    hint: 'Podaj przybliżony czas (np. "Mówi, że zgubiła się rano, więc pewnie kilka godzin").'
  },

  ask_shivering_behavior: {
    message: 'Czy osoba poszkodowana trzęsie się z zimna? Czy mówi wyraźnie i czy ma problem z utrzymaniem równowagi?',
    hint: 'Opisz dreszcze, mowę i koordynację (np. "Przestała się trząść, ale jest bardzo splątana i bełkocze").'
  },

  ask_chest_pain_dyspnea: {
    message: 'Czy osoba poszkodowana skarży się na ból w klatce piersiowej lub ma trudności z oddychaniem?',
    hint: 'Zgłoś dodatkowe objawy (np. "Mówi, że dusi ją w klatce piersiowej").'
  },

  ask_frostbite: {
    message: 'Czy widać jakieś odmrożenia? Czy skóra na dłoniach lub stopach jest biała i sztywna?',
    hint: 'Sprawdź stan skóry kończyn.'
  },

  final_instructions: {
    message: 'Zgłoszenie przyjęte. Proszę nie pozwalać osobie poszkodowanej na gwałtowne ruchy ani wysiłek fizyczny. Jeśli to możliwe, proszę okryć ją czymś ciepłym, ale nie rozgrzewać gwałtownie. Czekajcie na pomoc.',
    hint: 'Zapewnij komfort cieplny i monitoruj stan.'
  }
};

// Maszyna Stanów [Hipotermia]
export const hypothermiaMachine = createMachine({
  id: 'hypothermia',
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
        'intent.hypothermia.report': 'ask_consciousness',
        '*': 'ask_consciousness'
      }
    },
    ask_consciousness: {
      on: {
        'intent.unconscious': 'ask_breathing',
        'intent.conscious': 'ask_exposure_time',
        '*': 'ask_exposure_time'
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
    ask_exposure_time: {
      on: {
        'intent.hypothermia.exposure_time': 'ask_shivering_behavior',
        '*': 'ask_shivering_behavior'
      }
    },
    ask_shivering_behavior: {
      on: {
        'intent.hypothermia.symptoms': 'ask_chest_pain_dyspnea',
        '*': 'ask_chest_pain_dyspnea'
      }
    },
    ask_chest_pain_dyspnea: {
      on: {
        'intent.hypothermia.vitals': 'ask_frostbite',
        '*': 'ask_frostbite'
      }
    },
    ask_frostbite: {
      on: {
        'intent.hypothermia.skin': 'final_instructions',
        '*': 'final_instructions'
      }
    },
    final_instructions: { type: 'final' }
  }
});