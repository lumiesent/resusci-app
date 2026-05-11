import { createMachine, assign } from 'xstate';

/** Scenariusz: Drgawki
 * ===================================================
 * --- SCENARIUSZ DRGAWEK I PADACZKI ---
 * ===================================================
 **/

// Słownik Dialogów [Drgawki]
export const seizuresDialog = {
  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 81, słucham',
    hint: 'Przedstaw swoją lokalizację, podaj adres lub opisz swoje otoczenie.'
  },

  ask_situation: {
    message: 'Dobrze, co się stało?.',
    hint: 'Zgłoś wystąpienie drgawek (np. "Osoba poszkodowana nagle upadła i cała się trzęsie").'
  },

  ask_safety: {
    message: 'Czy na miejscu jest bezpiecznie? Czy nie doszło do porażenia prądem lub zatrucia chemikaliami?',
    hint: 'Oceń bezpieczeństwo miejsca zdarzenia.'
  },

  ask_ongoing: {
    message: 'Czy osoba poszkodowana jest w tej chwili w trakcie drgawek?',
    hint: 'Odpowiedz, czy atak nadal trwa.'
  },

  protect_head: {
    message: 'Proszę zadbać o jej bezpieczeństwo. Proszę podłożyć coś miękkiego pod głowę, aby uniknąć urazów, ale pod żadnym pozorem nie wkładać niczego do ust. Czy to zrobione?',
    hint: 'Zabezpiecz głowę poszkodowanego.'
  },

  ask_consciousness: {
    message: 'Czy osoba poszkodowana jest przytomna?',
    hint: 'Oceń przytomność (np. "Nie, jest nieprzytomna").'
  },

  ask_breathing: {
    message: 'Czy osoba poszkodowana oddycha?',
    hint: 'Oceń oddech (np. "Tak, oddycha ciężko" lub "Nie słyszę oddechu").'
  },

  safe_position: {
    message: 'Proszę ułożyć osobę poszkodowaną w pozycji bocznej bezpiecznej i monitorować oddech do przyjazdu karetki.',
    hint: 'Ułóż w pozycji bezpiecznej.'
  },

  cpr: {
    message: 'Proszę natychmiast rozpocząć uciskanie klatki piersiowej. Zespół ratownictwa jest już w drodze.',
    hint: 'Rozpocznij RKO.'
  },

  ask_history: {
    message: 'Czy wiadomo, czy ta osoba choruje na padaczkę, cukrzycę, ma wysoką gorączkę lub czy może być w ciąży?',
    hint: 'Podaj informacje o chorobach.'
  },

  ask_duration_trauma: {
    message: 'Jak długo trwał ten atak? Czy doszło do jakiegoś urazu podczas upadku (np. uderzenia w głowę)?',
    hint: 'Podaj czas trwania i ewentualne urazy.'
  },

  ask_symptoms: {
    message: 'Czy doszło do mimowolnego oddania moczu lub przygryzienia języka?',
    hint: 'Zwróć uwagę na objawy towarzyszące.'
  },

  final_instructions: {
    message: 'Zgłoszenie zostało przyjęte. Proszę nie zostawiać osoby poszkodowanej samej i czekać na zespół ratownictwa.',
    hint: 'Czekaj na pomoc.'
  }
};

// Maszyna Stanów [Drgawki]
export const seizuresMachine = createMachine({
  id: 'seizures',
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
        'intent.seizures.report': 'ask_safety',
        '*': 'ask_safety'
      }
    },
    ask_safety: {
      on: {
        'intent.seizures.safety_ok': 'ask_ongoing',
        'intent.seizures.safety_hazard': 'ask_ongoing', 
        '*': 'ask_ongoing'
      }
    },
    ask_ongoing: {
      on: {
        'intent.seizures.ongoing': 'protect_head',
        'intent.seizures.ended': 'ask_consciousness',
        '*': 'ask_consciousness'
      }
    },
    protect_head: {
      on: {
        'intent.confirmation': 'ask_consciousness',
        '*': 'ask_consciousness'
      }
    },
    ask_consciousness: {
      on: {
        'intent.conscious': 'ask_history',
        'intent.unconscious': 'ask_breathing'
      }
    },
    ask_breathing: {
      on: {
        'intent.breathing': 'ask_history',
        'intent.no_breathing': 'cpr'
      }
    },
    cpr: { type: 'final' },
    ask_history: {
      on: {
        'intent.seizures.history': 'ask_duration_trauma',
        '*': 'ask_duration_trauma'
      }
    },
    ask_duration_trauma: {
      on: {
        'intent.seizures.details': 'ask_symptoms',
        '*': 'ask_symptoms'
      }
    },
    ask_symptoms: {
      on: {
        'intent.seizures.symptoms': 'final_instructions',
        '*': 'final_instructions'
      }
    },
    final_instructions: { type: 'final' }
  }
});