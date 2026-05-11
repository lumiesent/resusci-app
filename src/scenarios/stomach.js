import { createMachine, assign } from 'xstate';

/** Scenariusz: Ból Brzucha
 * ===============================
 * --- SCENARIUSZ BÓLU BRZUCHA ---
 * ===============================
 **/

// Słownik Dialogów [Ból brzucha]
export const stomachDialog = {
  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 81, słucham',
    hint: 'Przedstaw swoją lokalizację, podaj adres lub opisz swoje otoczenie, czy znajduje się w pobliżu jakiś znany punkt odniesienia?'
  },

  ask_situation: {
    message: 'Dobrze, co się stało?.',
    hint: 'Powiedz co się dzieje, zgłoś ból brzucha (np. "Osoba skarży się na silny ból brzucha").'
  },

  ask_consciousness: {
    message: 'Czy osoba poszkodowana jest przytomna?',
    hint: 'Oceń przytomność poszkodowanego (np. "Jest przytomny" lub "Nie, stracił przytomność").'
  },

  ask_breathing: {
    message: 'Czy osoba poszkodowana oddycha?',
    hint: 'Oceń oddech poszkodowanego (np. "Tak, oddycha" lub "Nie czuję oddechu").'
  },

  safe_position: {
    message: 'Proszę ułożyć osobę poszkodowaną w pozycji bocznej bezpiecznej i czekać na przyjazd karetki pogotowia.',
    hint: 'Oczekuj na przyjazd karetki w pozycji bezpiecznej.'
  },

  cpr: {
    message: 'Proszę natychmiast rozpocząć uciskanie klatki piersiowej. Zespół ratownictwa jest już w drodze.',
    hint: 'Rozpocznij Resuscytację Krążeniowo-Oddechową (RKO).'
  },

  ask_pain_location: {
    message: 'Gdzie dokładnie boli i czy ten ból gdzieś promieniuje?',
    hint: 'Wskaż miejsce bólu (np. "Boli go nad pępkiem, promieniuje do pleców").'
  },

  ask_vomiting: {
    message: 'Czy osoba poszkodowana wymiotuje?',
    hint: 'Odpowiedz czy występują wymioty i jak wyglądają (np. "Tak, raz zwymiotował, bez krwi" lub "Nie wymiotuje").'
  },

  ask_medical_history: {
    message: 'Zgłoszenie przyjęte, proszę czekać na przyjazd zespołu ratownictwa medycznego. Muszę zadać jeszcze kilka pytań. Czy osoba poszkodowana choruje na coś na stałe? Miała jakieś operacje brzucha?',
    hint: 'Przekaż informacje o chorobach i operacjach (np. "Choruje na serce. Nigdy nie miał operacji" lub "Na nic nie choruje").'
  },

  ask_skin: {
    message: 'Jak wygląda skóra? Czy jest blada?',
    hint: 'Opisz stan skóry poszkodowanego (np. "Jest bardzo blady i ma zimny pot" lub "Wygląda normalnie").'
  },

  ask_prior_medication: {
    message: 'Czy osoba poszkodowana brała jakieś leki przed moim telefonem?',
    hint: 'Odpowiedz czy zostały podane leki doraźne (np. "Dałem mu tabletkę rozkurczową" lub "Nic mu nie podawałem").'
  },

  ask_regular_medication: {
    message: 'Rozumiem. Pomoc jest w drodze. Proszę nie podawać poszkodowanemu już nic do picia ani do jedzenia i ułożyć go w pozycji półsiedzącej. Czy poszkodowany przyjmuje jakieś leki na stałe?',
    hint: 'Odpowiedz na temat leków branych na stałe (np. "Tak, ale od kilku dni nie bierze" lub "Bierze na stałe leki na serce").'
  },

  complete: {
    message: 'Dobrze, proszę kontrolować jak się czuje poszkodowany i nigdzie nie odchodzić. W przypadku pogorszenia stanu lub utraty przytomności proszę natychmiast dzwonić. Rozłączam się, do widzenia.',
    hint: 'Czekaj na przyjazd pomocy. Połączenie zakończone.'
  }
};

// Maszyna Stanów [Ból Brzucha]
export const stomachMachine = createMachine({
  id: 'stomach',
  initial: 'start',

  states: {
    start: {
      on: {
        'USER_PROVIDED_LOCATION': {
          target: 'ask_situation',
          actions: assign({
            location: ({ event }) => event.text 
          })
        }
      }
    },

    ask_situation: {
      on: { 
        'intent.stomach.report': 'ask_consciousness',
        '*': 'ask_consciousness'
      },
    },

    ask_consciousness: {
      on: {
        'intent.conscious': 'ask_pain_location',
        'intent.unconscious': 'ask_breathing'
      }
    },

    ask_breathing: {
      on: {
        'intent.breathing': 'safe_position',
        'intent.no_breathing': 'cpr'
      }
    },

    safe_position: {
      type: 'final'
    },

    cpr: {
      type: 'final'
    },

    ask_pain_location: {
      on: {
        'intent.stomach.pain_location': 'ask_vomiting',
        '*': 'ask_vomiting'
      }
    },

    ask_vomiting: {
      on: {
        'intent.stomach.vomiting': 'ask_medical_history',
        'intent.stomach.no_vomiting': 'ask_medical_history',
        '*': 'ask_medical_history'
      }
    },

    ask_medical_history: {
      on: {
        'intent.stomach.medical_history': 'ask_skin',
        'intent.stomach.no_medical_history': 'ask_skin',
        '*': 'ask_skin'
      }
    },

    ask_skin: {
      on: {
        'intent.stomach.pale_skin': 'ask_prior_medication',
        'intent.stomach.normal_skin': 'ask_prior_medication',
        '*': 'ask_prior_medication'
      }
    },

    ask_prior_medication: {
      on: {
        'intent.stomach.prior_medication': 'ask_regular_medication',
        'intent.stomach.no_prior_medication': 'ask_regular_medication',
        '*': 'ask_regular_medication'
      }
    },

    ask_regular_medication: {
      on: {
        'intent.stomach.regular_medication_stopped': 'complete',
        'intent.stomach.regular_medication_takes': 'complete',
        '*': 'complete'
      }
    },

    complete: {
      type: 'final'
    }
  }
});
