import { createMachine, assign } from 'xstate';

/** Scenariusz: Problemy kardiologiczne
 * ===================================================
 * --- SCENARIUSZ KARDIOLOGICZNY ---
 * ===================================================
 **/

// Słownik Dialogów [Kardiologia]
export const cardiologyDialog = {
  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 81, słucham',
    hint: 'Przedstaw swoją lokalizację i podaj dokładny adres.'
  },

  ask_situation: {
    message: 'Dobrze, co się stało?.',
    hint: 'Zgłoś objawy (np. "Osoba poszkodowana ma bardzo wysokie ciśnienie i mówi, że serce jej zaraz wyskoczy").'
  },

  ask_consciousness: {
    message: 'Czy osoba poszkodowana jest przytomna?',
    hint: 'Oceń przytomność (np. "Tak, siedzi na fotelu, ale jest bardzo słaba").'
  },

  ask_breathing: {
    message: 'Czy osoba poszkodowana oddycha?',
    hint: 'Oceń oddech (np. "Tak, oddycha, ale bardzo ciężko i szybko").'
  },

  cpr: {
    message: 'Proszę natychmiast rozpocząć uciskanie klatki piersiowej. Zespół ratownictwa jest już w drodze.',
    hint: 'Rozpocznij RKO.'
  },

  ask_pain_chest: {
    message: 'Czy występuje ból w klatce piersiowej? Jeśli tak, to gdzie dokładnie i czy ten ból gdzieś promieniuje, na przykład do żuchwy lub lewej ręki?',
    hint: 'Opisz ból (np. "Mówi, że piecze ją za mostkiem").'
  },

  ask_skin_cyanosis: {
    message: 'Jak wygląda skóra? Czy usta lub palce są sine? Czy osoba jest zalana zimnym potem?',
    hint: 'Opisz wygląd (np. "Jest bardzo blada i ma fioletowe usta").'
  },

  ask_edema: {
    message: 'Czy osoba poszkodowana ma spuchnięte nogi, szczególnie w okolicach kostek?',
    hint: 'Sprawdź obrzęki (np. "Tak, nogi są bardzo spuchnięte").'
  },

  ask_history_meds: {
    message: 'Czy ta osoba choruje na serce? Czy miała kiedyś zawał, operację lub czy ma wszczepiony rozrusznik?',
    hint: 'Podaj historię choroby (np. "Jest po zawale i ma wszczepiony stymulator").'
  },

  ask_vitals_values: {
    message: 'Czy mierzyli Państwo ciśnienie? Jeśli tak, jaki był wynik?',
    hint: 'Podaj wynik (np. "Ciśnienie jest bardzo wysokie, powyżej 200").'
  },

  final_instructions: {
    message: 'Zgłoszenie przyjęte. Proszę, aby osoba poszkodowana nie wykonywała żadnego wysiłku. Jeśli ma leki przepisane na stałe przez kardiologa na taką sytuację (np. nitrogliceryna), można je podać. Proszę czekać na zespół.',
    hint: 'Zapewnij odpoczynek i monitoruj stan.'
  }
};

// Maszyna Stanów [Kardiologia]
export const cardiologyMachine = createMachine({
  id: 'cardiology',
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
        'intent.cardio.report': 'ask_consciousness',
        '*': 'ask_consciousness'
      }
    },
    ask_consciousness: {
      on: {
        'intent.unconscious': 'ask_breathing',
        'intent.conscious': 'ask_pain_chest',
        '*': 'ask_pain_chest'
      }
    },
    ask_breathing: {
      on: {
        'intent.no_breathing': 'cpr',
        'intent.breathing': 'ask_pain_chest'
      }
    },
    cpr: { type: 'final' },
    ask_pain_chest: {
      on: {
        'intent.cardio.pain': 'ask_skin_cyanosis',
        '*': 'ask_skin_cyanosis'
      }
    },
    ask_skin_cyanosis: {
      on: {
        'intent.cardio.skin': 'ask_edema',
        '*': 'ask_edema'
      }
    },
    ask_edema: {
      on: {
        'intent.cardio.edema': 'ask_history_meds',
        '*': 'ask_history_meds'
      }
    },
    ask_history_meds: {
      on: {
        'intent.cardio.history': 'ask_vitals_values',
        '*': 'ask_vitals_values'
      }
    },
    ask_vitals_values: {
      on: {
        'intent.cardio.vitals': 'final_instructions',
        '*': 'final_instructions'
      }
    },
    final_instructions: { type: 'final' }
  }
});