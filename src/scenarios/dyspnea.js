import { createMachine, assign } from 'xstate';

/** Scenariusz: Duszność / Trudności w oddychaniu
 * ===================================================
 * --- SCENARIUSZ DUSZNOŚCI ---
 * ===================================================
 **/

// Słownik Dialogów [Duszność]
export const dyspneaDialog = {
  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 81, słucham',
    hint: 'Przedstaw swoją lokalizację, podaj adres lub opisz swoje otoczenie.'
  },

  ask_situation: {
    message: 'Dobrze, co się stało?.',
    hint: 'Zgłoś duszność (np. "Osoba poszkodowana nagle zaczęła się dusić i ledwo łapie powietrze").'
  },

  ask_consciousness_trauma_choking: {
    message: 'Czy osoba poszkodowana jest przytomna? Czy doszło do jakiegoś urazu klatki piersiowej lub zadławienia?',
    hint: 'Oceń przytomność i sprawdź, czy w drogach oddechowych nie ma ciała obcego lub czy nie było wypadku.'
  },

  ask_breathing: {
    message: 'Czy osoba poszkodowana oddycha?',
    hint: 'Oceń oddech (np. "Tak, oddycha bardzo szybko" lub "Nie, przestała oddychać").'
  },

  cpr: {
    message: 'Proszę natychmiast rozpocząć uciskanie klatki piersiowej. Zespół ratownictwa jest już w drodze.',
    hint: 'Rozpocznij resuscytację krążeniowo-oddechową.'
  },

  safe_position: {
    message: 'Proszę ułożyć osobę poszkodowaną w pozycji bocznej bezpiecznej i stale monitorować oddech.',
    hint: 'Ułóż w pozycji bezpiecznej.'
  },

  ask_onset_skin: {
    message: 'Od kiedy trwa duszność i jak wygląda skóra osoby poszkodowanej? Czy jest blada, sina lub spocona?',
    hint: 'Podaj czas trwania objawów oraz opisz wygląd skóry (np. "Trwa to 10 minut, jest blada i sina wokół ust").'
  },

  ask_history_meds: {
    message: 'Czy osoba poszkodowana choruje na stałe (np. na serce, astmę, POChP) i czy bierze jakieś leki wziewne?',
    hint: 'Podaj informacje o chorobach przewlekłych i lekach (np. "Choruje na astmę, brała inhalator, ale nie pomaga").'
  },

  ask_additional_symptoms: {
    message: 'Czy występuje ból w klatce piersiowej, kaszel (ewentualnie z krwią) lub obrzęk nóg?',
    hint: 'Opisz dodatkowe objawy, jeśli występują.'
  },

  final_instructions: {
    message: 'Zgłoszenie zostało przyjęte, pomoc jest w drodze. Proszę zapewnić osobie poszkodowanej dostęp do świeżego powietrza, pomóc jej przyjąć najwygodniejszą pozycję (zwykle siedzącą) i nie zostawiać jej samej.',
    hint: 'Oczekuj na przyjazd karetki.'
  }
};

// Maszyna Stanów [Duszność]
export const dyspneaMachine = createMachine({
  id: 'dyspnea',
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
        'intent.dyspnea.report': 'ask_consciousness_trauma_choking',
        '*': 'ask_consciousness_trauma_choking'
      }
    },
    ask_consciousness_trauma_choking: {
      on: {
        'intent.unconscious': 'ask_breathing',
        'intent.conscious': 'ask_onset_skin',
        'intent.dyspnea.trauma_choking': 'ask_onset_skin', // Można tu dodać osobne gałęzie dla urazów
        '*': 'ask_onset_skin'
      }
    },
    ask_breathing: {
      on: {
        'intent.breathing': 'safe_position',
        'intent.no_breathing': 'cpr'
      }
    },
    safe_position: { type: 'final' },
    cpr: { type: 'final' },
    ask_onset_skin: {
      on: {
        'intent.dyspnea.skin_symptoms': 'ask_history_meds',
        '*': 'ask_history_meds'
      }
    },
    ask_history_meds: {
      on: {
        'intent.dyspnea.history_meds': 'ask_additional_symptoms',
        '*': 'ask_additional_symptoms'
      }
    },
    ask_additional_symptoms: {
      on: {
        'intent.dyspnea.details': 'final_instructions',
        '*': 'final_instructions'
      }
    },
    final_instructions: { type: 'final' }
  }
});