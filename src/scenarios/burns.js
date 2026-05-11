import { createMachine, assign } from 'xstate';

/** Scenariusz: Oparzenia
 * ===================================================
 * --- SCENARIUSZ OPARZENIA ---
 * ===================================================
 **/

// Słownik Dialogów [Oparzenie]
export const burnsDialog = {
  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 81, słucham',
    hint: 'Przedstaw swoją lokalizację i podaj dokładny adres.'
  },

  ask_situation: {
    message: 'Dobrze, co się stało?.',
    hint: 'Zgłoś oparzenie (np. "Osoba poszkodowana wylała na siebie wrzątek" lub "Wybuchł biokominek").'
  },

  ask_cause_safety: {
    message: 'Co było przyczyną oparzenia? Czy to był ogień, prąd, chemikalia, czy gorący płyn? Czy na miejscu jest bezpiecznie?',
    hint: 'Podaj przyczynę i oceń bezpieczeństwo (np. "To był kwas w warsztacie, już jest bezpiecznie").'
  },

  ask_consciousness: {
    message: 'Czy osoba poszkodowana jest przytomna?',
    hint: 'Oceń przytomność (np. "Tak, jest przytomna i bardzo krzyczy z bólu").'
  },

  ask_breathing_inhalation: {
    message: 'Czy osoba poszkodowana oddycha swobodnie? Czy ma osmalone brwi, włosy w nosie lub czy skarży się na silne pieczenie w gardle?',
    hint: 'Sprawdź objawy oparzenia dróg oddechowych (np. "Ma osmaloną twarz i mówi, że ją drapie w gardle").'
  },

  ask_breathing_standard: {
    message: 'Czy osoba poszkodowana oddycha?',
    hint: 'Oceń oddech u osoby nieprzytomnej.'
  },

  cpr: {
    message: 'Proszę natychmiast rozpocząć uciskanie klatki piersiowej. Zespół ratownictwa jest już w drodze.',
    hint: 'Rozpocznij RKO.'
  },

  ask_location_severity: {
    message: 'Która część ciała została oparzona? Jak wygląda skóra – czy są pęcherze, czy skóra jest biała lub zwęglona?',
    hint: 'Opisz lokalizację i wygląd rany (np. "Cała twarz i klatka piersiowa, są ogromne bąble").'
  },

  instruction_cooling: {
    message: 'Proszę natychmiast zacząć schładzać oparzone miejsca czystą, letnią wodą przez kilkanaście minut. Jeśli osoba ma na sobie pierścionki lub bransoletki, proszę je zdjąć, zanim pojawi się obrzęk.',
    hint: 'Zastosuj schładzanie i zdejmij biżuterię (jeśli to możliwe).'
  },

  final_instructions: {
    message: 'Zgłoszenie zostało przyjęte. Proszę kontynuować schładzanie wodą. Nie wolno smarować oparzeń tłuszczem ani białkiem, nie wolno też przebijać pęcherzy. Czekajcie na zespół.',
    hint: 'Nie smaruj oparzeń niczym poza wodą/opatrunkiem hydrożelowym.'
  }
};

// Maszyna Stanów [Oparzenie]
export const burnsMachine = createMachine({
  id: 'burns',
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
        'intent.burns.report': 'ask_cause_safety',
        '*': 'ask_cause_safety'
      }
    },
    ask_cause_safety: {
      on: {
        'intent.burns.cause': 'ask_consciousness',
        '*': 'ask_consciousness'
      }
    },
    ask_consciousness: {
      on: {
        'intent.unconscious': 'ask_breathing_standard',
        'intent.conscious': 'ask_breathing_inhalation',
        '*': 'ask_breathing_inhalation'
      }
    },
    ask_breathing_standard: {
      on: {
        'intent.no_breathing': 'cpr',
        'intent.breathing': 'ask_location_severity'
      }
    },
    cpr: { type: 'final' },
    ask_breathing_inhalation: {
      on: {
        'intent.burns.inhalation_symptoms': 'ask_location_severity',
        '*': 'ask_location_severity'
      }
    },
    ask_location_severity: {
      on: {
        'intent.burns.details': 'instruction_cooling',
        '*': 'instruction_cooling'
      }
    },
    instruction_cooling: {
      on: {
        'intent.confirmation': 'final_instructions',
        '*': 'final_instructions'
      }
    },
    final_instructions: { type: 'final' }
  }
});