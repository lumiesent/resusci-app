import { createMachine, assign } from 'xstate';

/** Scenariusz: Ból Głowy
 * ==================================
 * --- SCENARIUSZ BÓLU GŁOWY ---
 * ==================================
 **/

// Słownik Dialogów [Ból Głowy]
export const headacheDialog = {
  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 88, słucham?',
    hint: 'Zgłoś silny ból głowy poszkodowanego (np. "Osoba poszkodowana bardzo źle się czuje. Ma straszny ból głowy.").'
  },

  ask_location: {
    message: 'Proszę podać dokładny adres.',
    hint: 'Przedstaw swoją lokalizację, podaj adres.'
  },

  ask_consciousness: {
    message: 'Czy osoba poszkodowana jest przytomna?',
    hint: 'Oceń przytomność poszkodowanego (np. "Tak, siedzi, ale ledwo kontaktuje" lub "Nie, stracił przytomność").'
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

  ask_circumstances: {
    message: 'Od kiedy boli i w jakich okolicznościach się to zaczęło?', 
    hint: 'Podaj czas i powód wystąpienia (np. "Jakieś pół godziny temu, nagle zaczęła krzyczeć, że głowa jej pęka i zwymiotowała.").' 
  },

  ask_vomiting_details: {
    message: 'Od kiedy występują wymioty, ile razy wystąpiły i jak wygląda treść – czy widać tam krew?',
    hint: 'Opisz wymioty (np. "Wymiotuje od godziny samą wodą, bez krwi" lub "Nie wymiotuje w ogóle").'
  },

  ask_trauma: {
    message: 'Czy w ostatnim czasie doszło u osoby poszkodowanej do jakiegoś urazu głowy lub upadku?',
    hint: 'Poinformuj o ewentualnych wypadkach (np. "Uderzyła się w głowę rano" lub "Nie, nie było żadnego urazu ani upadku").'
  },

  ask_headache_history: {
    message: 'Czy podobne bóle głowy występowały u osoby poszkodowanej wcześniej? Jeśli tak, to czy obecny ból jest taki sam czy inny?',
    hint: 'Porównaj z przeszłością (np. "Miewa migreny, ale ten ból jest zupełnie inny" lub "Nigdy wcześniej nie było takich problemów, to pierwszy raz").'
  },

  ask_speech_vision_issues: {
    message: 'Czy osoba poszkodowana ma trudności w mówieniu lub widzeniu?',
    hint: 'Oceń stan wzroku/mowy (np. "Tak, bełkocze i mówi, że widzi podwójnie" lub "Nie, normalnie mówi i widzi wyraźnie").' 
  },

  ask_numbness: {
    message: 'Zgłoszenie przyjęte, proszę czekać na przyjazd zespołu ratownictwa medycznego. Muszę zadać jeszcze kilka pytań. Czy występują jakieś drętwienia?', 
    hint: 'Sprecyzuj (np. "Mówi, że drętwieje jej cała prawa strona ciała." lub "Nie drętwieje mu nic.").'
  },

  ask_medical_history: {
    message: 'Czy osoba poszkodowana choruje na coś na stałe? Przyjmuje leki przeciwzakrzepowe?', 
    hint: 'Opisz choroby (np. "Tak, choruje na nadciśnienie i bierze leki na rozrzedzenie krwi." lub "Na nic nie choruje i nie bierze leków").'
  },

  complete: {
    message: 'Rozumiem. Pomoc jest już w drodze. Proszę nie podawać osobie poszkodowanej nic do jedzenia ani picia. W przypadku pogorszenia stanu lub utraty przytomności proszę natychmiast dzwonić. Rozłączam się, do widzenia.',
    hint: 'Czekaj na przyjazd pomocy. Połączenie zakończone.'
  }
};

// Maszyna Stanów [Ból Głowy]
export const headacheMachine = createMachine({
  id: 'headache',
  initial: 'start',

  states: {
    start: {
      on: { 'intent.headache.report': 'ask_location' }
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
        'intent.conscious': 'ask_circumstances',
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

    ask_circumstances: {
      on: {
        'intent.headache.circumstances': 'ask_speech_vision_issues',
        '*': 'ask_speech_vision_issues'
      }
    },

    ask_vomiting_details: {
      on: {
        'intent.headache.vomiting_details': 'ask_trauma',
        'intent.headache.no_vomiting': 'ask_trauma',
        '*': 'ask_trauma'
      }
    },

    ask_trauma: {
      on: {
        'intent.headache.trauma': 'ask_headache_history',
        'intent.headache.no_trauma': 'ask_headache_history',
        '*': 'ask_headache_history'
      }
    },

    ask_headache_history: {
      on: {
        'intent.headache.history_different': 'ask_speech_vision_issues',
        'intent.headache.history_similar': 'ask_speech_vision_issues',
        'intent.headache.no_history': 'ask_speech_vision_issues',
        '*': 'ask_speech_vision_issues'
      }
    },

    ask_speech_vision_issues: {
      on: {
        'intent.headache.issues': 'ask_numbness',
        'intent.headache.no_issues': 'ask_numbness',
        '*': 'ask_numbness'
      }
    },

    ask_numbness: {
      on: {
        'intent.headache.numbness': 'ask_medical_history',
        'intent.headache.no_numbness': 'ask_medical_history',
        '*': 'ask_medical_history'
      }
    },

    ask_medical_history: {
      on: {
        'intent.headache.medical_history': 'complete',
        'intent.headache.no_medical_history': 'complete',
        '*': 'complete'
      }
    },

    complete: {
      type: 'final'
    }
  }
});
