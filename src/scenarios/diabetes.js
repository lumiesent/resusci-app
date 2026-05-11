import { createMachine, assign } from 'xstate';

/** Scenariusz: Cukrzyca
 * ===================================================
 * --- SCENARIUSZ CUKRZYCY I HIPOGLIKEMII ---
 * ===================================================
 **/

// Słownik Dialogów [Cukrzyca]
export const diabetesDialog = {
  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 007, słucham?',
    hint: 'Zgłoś zaburzenia zachowania lub nagłe osłabienie powiązane z cukrzycą (np. "Poszkodowany jest diabetykiem i bardzo dziwnie się zachowuje").'
  },

  ask_location: {
    message: 'Proszę podać dokładny adres.',
    hint: 'Podaj dokładny adres zdarzenia.'
  },

  ask_consciousness: {
    message: 'Czy osoba poszkodowana jest przytomna?',
    hint: 'Oceń przytomność (np. "Tak, siedzi na podłodze, ale bełkocze" lub "Nie, straciła przytomność").'
  },

  ask_breathing: {
    message: 'Czy osoba poszkodowana oddycha?',
    hint: 'Oceń oddech (np. "Tak, oddycha" lub "Nie słyszę oddechu").'
  },

  safe_position_glucagon: {
    message: 'Proszę ułożyć osobę poszkodowaną w pozycji bocznej bezpiecznej. Jeśli posiadają Państwo glukagon i potrafią go użyć, użycie go w tym wypadku jest uzasadnione. Proszę czekać na przyjazd karetki.',
    hint: 'Oczekuj na przyjazd karetki. Rozważ podanie glukagonu domięśniowo.'
  },

  cpr: {
    message: 'Proszę natychmiast rozpocząć uciskanie klatki piersiowej. Zespół ratownictwa jest już w drodze.',
    hint: 'Rozpocznij RKO.'
  },

  ask_sugar_level: {
    message: 'Czy oznaczono poziom glukozy? Jeśli tak, to jaki jest wynik i kiedy go dokonano?',
    hint: 'Podaj wynik z glukometru, pompy lub aplikacji sensorowej (np. "Przed chwilą pokazał 35 mg/dl").'
  },

  ask_behavior_skin: {
    message: 'Czy u osoby poszkodowanej występują zaburzenia świadomości, mowy lub widzenia? Jak wyglądają powłoki skórne – czy jest spocona lub blada?',
    hint: 'Opisz zachowanie i wygląd skóry (np. "Jest zlany zimnym potem, blady i agresywny").'
  },

  ask_breathing_difficulties: {
    message: 'Czy osoba poszkodowana ma trudności w oddychaniu?',
    hint: 'Poinformuj o ewentualnej duszności (np. "Oddycha normalnie" lub "Ma ciężki oddech").'
  },

  ask_insulin_history: {
    message: 'Czy poszkodowany przyjmuje insulinę lub leczy się na coś jeszcze?',
    hint: 'Potwierdź leki (np. "Tak, bierze insulinę na stałe").'
  },

  ask_give_sugar: {
    message: 'Zgłoszenie przyjęte, proszę czekać na zespół ratownictwa medycznego. Czy poszkodowany jest w stanie bezpiecznie przełykać? Jeśli tak, proszę podać coś słodkiego do picia i uważać, żeby się nie zadławił.',
    hint: 'Spróbuj podać słodki napój lub cukier, jeśli osoba może to bezpiecznie połknąć.'
  },

  complete: {
    message: 'Dobrze. Proszę nie zostawiać poszkodowanego samego. Jeśli mimo podania cukru nie będzie kontaktu lub pacjent straci przytomność, proszę natychmiast dzwonić. Rozłączam się.',
    hint: 'Obserwuj stan poszkodowanego. Połączenie zakończone.'
  }
};

// Maszyna Stanów [Cukrzyca]
export const diabetesMachine = createMachine({
  id: 'diabetes',
  initial: 'start',

  states: {
    start: {
      on: { 'intent.diabetes.report': 'ask_location' }
    },

    ask_location: {
      on: {
        'USER_PROVIDED_LOCATION': {
          target: 'ask_consciousness',
          actions: assign({
            location: ({ event }) => event.text 
          })
        }
      }
    },

    ask_consciousness: {
      on: {
        'intent.conscious': 'ask_sugar_level',
        'intent.unconscious': 'ask_breathing'
      }
    },

    ask_breathing: {
      on: {
        'intent.breathing': 'safe_position_glucagon',
        'intent.no_breathing': 'cpr'
      }
    },

    safe_position_glucagon: { type: 'final' },
    cpr: { type: 'final' },

    ask_sugar_level: {
      on: { 
        'intent.diabetes.sugar_measured': 'ask_behavior_skin',
        'intent.diabetes.sugar_not_measured': 'ask_behavior_skin',
        '*': 'ask_behavior_skin' 
      }
    },

    ask_behavior_skin: {
      on: { 
        'intent.diabetes.behavior_skin_issues': 'ask_breathing_difficulties',
        '*': 'ask_breathing_difficulties'
      }
    },

    ask_breathing_difficulties: {
      on: { 
        'intent.diabetes.breathing_issues': 'ask_insulin_history',
        'intent.diabetes.no_breathing_issues': 'ask_insulin_history',
        '*': 'ask_insulin_history'
      }
    },

    ask_insulin_history: {
      on: {
        'intent.diabetes.takes_insulin': 'ask_give_sugar',
        'intent.diabetes.no_insulin': 'ask_give_sugar',
        '*': 'ask_give_sugar'
      }
    },

    ask_give_sugar: {
      on: { 
        'intent.diabetes.give_sugar_yes': 'complete',
        'intent.diabetes.give_sugar_no': 'complete',
        '*': 'complete' 
      }
    },

    complete: {
      type: 'final'
    }
  }
});
