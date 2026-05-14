import { createMachine, assign } from 'xstate';

/** Scenariusz: Nagłe Zatrzymanie Krążenia (cpr)
 * ==========================================
 * Na podstawie diagramu z aplikacji Obsidian.
 * Odwzorowano wszystkie węzły i połączenia.
 * ==========================================
 **/

// Słownik Dialogów [cpr]
export const cprDialog = {
  start: {
    message: 'Pogotowie Ratunkowe, słucham? Proszę podać lokalizację zdarzenia.',
    hint: 'Podaj adres lub opisz charakterystyczne punkty w okolicy.'
  },

  ask_situation: {
    message: 'Dobrze, co się stało?',
    hint: 'Opisz krótko co widzisz (np. "Ktoś leży", "Osoba nie oddycha").'
  },

  // Alternatywa po pełnej intencji
  ask_location_confirm: {
    message: 'Zrozumiałem, powtórz proszę jeszcze raz dokładnie lokalizację, abyśmy mieli pewność.',
    hint: 'Potwierdź adres zdarzenia.'
  },

  // Sekcja Bezpieczeństwo
  ask_safety: {
    message: 'Czy na miejscu jest bezpiecznie dla Ciebie i poszkodowanego?',
    hint: 'Sprawdź czy jest bezpiecznie, nie ma ognia, prądu lub ruchu pojazdów.'
  },

  safety_check_full: {
    message: 'Czy na miejscu jest bezpiecznie dla Ciebie i poszkodowanego?',
    hint: 'Sprawdź czy jest bezpiecznie, nie ma ognia, prądu lub ruchu pojazdów.'
  },

  safety_check_uncertain: {
    message: 'Czy na miejscu jest bezpiecznie dla Ciebie i poszkodowanego?',
    hint: 'Sprawdź czy jest bezpiecznie, nie ma ognia, prądu lub ruchu pojazdów.'
  },

  safety_check_incomplete: {
    message: 'Czy na miejscu jest bezpiecznie dla Ciebie i poszkodowanego?',
    hint: 'Sprawdź czy jest bezpiecznie, nie ma ognia, prądu lub ruchu pojazdów.'
  },

  unsafe_stop: {
    message: 'Nie podchodź do osoby poszkodowanej. Proszę oczekiwać na przyjazd służb w bezpiecznej odległości.',
    hint: 'Twoje bezpieczeństwo jest najważniejsze. Zachowaj bezpieczną odległość i czekaj na ratowników.'
  },

  // Wywiad medyczny
  ask_consciousness: {
    message: 'Czy osoba poszkodowana jest przytomna? Czy reaguje na głos lub dotyk?',
    hint: 'Głośno zawołaj i delikatnie potrząśnij za ramiona. Przekaż dyspozytorowi, czy poszkodowany jest przytomny.'
  },

  ask_breathing: {
    message: 'Czy osoba poszkodowana oddycha? Sprawdź czy klatka piersiowa się unosi.',
    hint: 'Obserwuj oddech przez 10 sekund. Przekaż dyspozytorowi, czy poszkodowany oddycha normalnie, czy nie oddycha wcale.'
  },

  wait_for_services: {
    message: 'Proszę oczekiwać na przyjazd służb i cały czas kontrolować stan poszkodowanego.',
    hint: 'Nie rozłączaj się z dyspozytorem. Informuj o wszelkich zmianach stanu poszkodowanego.'
  },

  // KLUCZOWY STAN cpr
  cpr_init: {
    message: 'Proszę włączyć tryb GŁOŚNOMÓWIĄCY w telefonie. Czy w pobliżu znajduje się urządzenie AED?',
    hint: 'Włącz tryb głośnomówiący i rozejrzyj się za defibrylatorem.'
  },

  // Ścieżki AED
  send_for_aed: {
    message: 'Jeśli jest z Tobą inna osoba, wskaż ją i poślij po AED.',
    hint: 'Wyślij kogoś konkretnego, np. "Pan w niebieskiej kurtce, proszę przynieść AED!".'
  },

  aed_far_instruction: {
    message: 'Jeśli AED jest daleko, nie szukaj go samemu. Skupimy się na uciskaniu klatki piersiowej.',
    hint: 'Pozostań przy poszkodowanym.'
  },

  aed_near_instruction: {
    message: 'Jeśli AED jest w pobliżu, pójdź po nie natychmiast.',
    hint: 'Przynieś urządzenie tak szybko, jak to możliwe. Nie zostawiaj poszkodowanego bez opieki na dłużej niż kilka sekund. Powiedz dyspozytorowi, że już masz AED.'
  },

  // Resuscytacja
  cpr_instruction: {
    message: 'Proszę położyć ręce na środku klatki piersiowej, w dolnej części mostka, i uciskać mocno i szybko, około 2 razy na sekundę. Nie przestawaj, dopóki nie przyniosą AED, poszkodowany nie oddycha, zmęczysz się lub nie przyjedzie zespół.',
    hint: 'Uciskaj rytmicznie (ok. 100-120 razy na minutę). Przekaż dyspozytorowi jeśli poszkodowany zaczyna oddychać lub jeśli pojawią się jakiekolwiek zmiany.'
  },

  cpr_waiting_aed: {
    message: 'Proszę położyć ręce na środku klatki piersiowej, w dolnej części mostka, i uciskać mocno i szybko, około 2 razy na sekundę. Nie przestawaj, dopóki nie przyniosą AED, poszkodowany nie oddycha, zmęczysz się lub nie przyjedzie zespół.',
    hint: 'Uciskaj rytmicznie (ok. 100-120 razy na minutę). Przekaż dyspozytorowi jeśli poszkodowany zaczyna oddychać lub jeśli pojawią się jakiekolwiek zmiany.'
  },

  cpr_no_aed: {
    message: 'Proszę położyć ręce na środku klatki piersiowej, w dolnej części mostka, i uciskać mocno i szybko, około 2 razy na sekundę. Nie przestawaj aż do zmęczenia, powrotu oddechu u poszkodowanego, przyjazdu i przejęciu poszkodowanego przez służby lub gdy zrobi się niebezpiecznie.',
    hint: 'Uciskaj rytmicznie (ok. 100-120 razy na minutę). Przekaż dyspozytorowi jeśli poszkodowany zaczyna oddychać lub jeśli pojawią się jakiekolwiek zmiany.'
  },

  cpr_no_aed_loop: {
    message: 'Kontynuuj uciskanie klatki piersiowej aż do zmęczenia, powrotu oddechu u poszkodowanego, przyjazdu i przejęciu poszkodowanego przez służby lub gdy zrobi się niebezpiecznie.',
    hint: 'Nie przestawaj, aż do przyjazdu ratowników. Przekaż dyspozytorowi jeśli poszkodowany zaczyna oddychać lub jeśli pojawią się jakiekolwiek zmiany.'
  },

  aed_distance_check: {
    message: 'Czy AED jest w pobliżu?',
    hint: 'Sprawdź, czy urządzenie jest łatwo dostępne. Przekaż dyspozytorowi, czy AED jest blisko, czy daleko.'
  },

  // Praca z AED
  aed_connect: {
    message: 'Proszę podłączyć AED. Przyklej elektrody na gołą klatkę piersiową zgodnie z rysunkiem.',
    hint: 'Słuchaj komend głosowych urządzenia. Upewnij się, że elektrody są dobrze przylepione do skóry. Przekaż dyspozytorowi, czy elektrody są poprawnie przyklejone.'
  },

  aed_analysis: {
    message: 'W trakcie analizy rytmu serca proszę nie dotykać poszkodowanego, aby nie zaburzyć odczytu.',
    hint: 'Odsuń się od osoby poszkodowanej. Nie dotykaj jej ani nie pozwól nikomu innemu dotykać, dopóki AED nie zakończy analizy. Powiadom dyspozytora, o pomyślnym zakończeniu analizy.'
  },

  aed_defib: {
    message: 'Proszę upewnić się, że nikt na pewno nie dotyka poszkodowanego i wykonać defibrylację, jeśli urządzenie o to prosi.',
    hint: 'Naciśnij przycisk po upewnieniu się, że nikt nie dotyka ciała. Przekaż dyspozytorowi stan poszkodowanego po defibrylacji, czy osoba oddycha?'
  },

  aed_loop: {
    message: 'Wykonuj polecenia urządzenia AED aż do zmęczenia, powrotu oddechu u poszkodowanego, przyjazdu i przejęciu poszkodowanego przez służby lub gdy zrobi się niebezpiecznie.',
    hint: 'Kontynuuj RKO naprzemiennie z poleceniami AED. Przekaż dyspozytorowi, jeśli poszkodowany zaczyna oddychać lub jeśli pojawią się jakiekolwiek zmiany.'
  },

  // Powrót funkcji życiowych
  check_breathing_confirm: {
    message: 'Proszę jeszcze raz sprawdzić, czy osoba poszkodowana na pewno oddycha.',
    hint: 'Upewnij się, że oddech jest prawidłowy. Przekaż dyspozytorowi, jeśli poszkodowany zaczyna oddychać lub jeśli pojawią się jakiekolwiek zmiany.'
  },

  check_breathing_confirm_no_aed: {
    message: 'Proszę jeszcze raz sprawdzić, czy osoba poszkodowana na pewno oddycha.',
    hint: 'Upewnij się, że oddech jest prawidłowy. Przekaż dyspozytorowi, jeśli poszkodowany zaczyna oddychać lub jeśli pojawią się jakiekolwiek zmiany.'
  },

  recovery_position: {
    message: 'Proszę ułożyć osobę poszkodowaną w pozycji bocznej bezpiecznej.',
    hint: 'Ułóż poszkodowanego na boku, aby zabezpieczyć drogi oddechowe.'
  },

  recovery_position_init: {
    message: 'Proszę ułożyć osobę poszkodowaną w pozycji bocznej bezpiecznej.',
    hint: 'Ułóż poszkodowanego na boku, aby zabezpieczyć drogi oddechowe.'
  },
   

  recovery_position_final: {
    message: 'Proszę ułożyć osobę poszkodowaną w pozycji bocznej bezpiecznej.',
    hint: 'Ułóż poszkodowanego na boku, aby zabezpieczyć drogi oddechowe.'
  },

  monitoring: {
    message: 'Kontroluj funkcje życiowe poszkodowanego. NIE ODŁĄCZAJ AED! Czekaj na przyjazd służb.',
    hint: 'Pozostań przy poszkodowanym do czasu przekazania go ratownikom. Przekaż dyspozytorowi, jeśli pojawią się jakiekolwiek zmiany.'
  },

  monitoring_no_aed: {
    message: 'Kontroluj funkcje życiowe poszkodowanego. Czekaj na przyjazd służb.',
    hint: 'Pozostań przy poszkodowanym do czasu przekazania go ratownikom. Przekaż dyspozytorowi, jeśli pojawią się jakiekolwiek zmiany.'
  }
};

// Maszyna Stanów [cpr]
export const cprMachine = createMachine({
  id: 'cpr',
  initial: 'start',
  states: {
    start: {
      on: {
        'USER_PROVIDED_LOCATION': 'ask_situation'
      }
    },

    ask_situation: {
      on: {
        'intent.cpr.lying': 'safety_check_uncertain',       // Użytkownik mówi że ktoś leży

        'intent.cpr.unconscious': 'safety_check_incomplete', // Ktoś jest nieprzytomny
        'intent.unconscious': 'safety_check_incomplete',           // Ktoś jest nieprzytomny (alternatywa)

        'intent.cpr.not_breathing': 'safety_check_full',     // Ktoś NIE oddycha
        'intent.no_breathing': 'safety_check_full',

        'None': { // Użytkownik bełkotał lub NLP nic nie dopasowało
          target: 'ask_situation', 
          actions: () => console.log('Nie zrozumiałem, pytam jeszcze raz') 
        }
      }
    },

    /*
    full_intent_branch: {
      on: {
        'intent.location_repeat': 'ask_location_confirm',
        '*': 'safety_check_full'
      }
    },
    */

    ask_location_confirm: {
      on: {
        '*': 'safety_check_full'
      }
    },

    // Sekcja Bezpieczeństwa (3 warianty wejściowe z diagramu)
    safety_check_uncertain: {
      on: {
        'intent.safe': 'ask_consciousness',
        'intent.unsafe': 'unsafe_stop',
        'None': { // Użytkownik bełkotał lub NLP nic nie dopasowało
          target: 'safety_check_uncertain', 
          actions: () => console.log('Nie zrozumiałem, pytam jeszcze raz o bezpieczeństwo') 
        }
      }
    },
    safety_check_incomplete: {
      on: {
        'intent.safe': 'ask_breathing',
        'intent.unsafe': 'unsafe_stop',
        'None': { // Użytkownik bełkotał lub NLP nic nie dopasowało
          target: 'safety_check_incomplete', 
          actions: () => console.log('Nie zrozumiałem, pytam jeszcze raz o bezpieczeństwo') 
        }
      }
    },
    safety_check_full: {
      on: {
        'intent.safe': 'cpr_init',
        'intent.unsafe': 'unsafe_stop',
        'None': { // Użytkownik bełkotał lub NLP nic nie dopasowało
          target: 'safety_check_full', 
          actions: () => console.log('Nie zrozumiałem, pytam jeszcze raz o bezpieczeństwo') 
        }
      }
    },

    unsafe_stop: {
      type: 'final'
    },

    ask_consciousness: {
      on: {
        'intent.conscious': 'wait_for_services',
        'intent.unconscious': 'ask_breathing',
        'None': { // Użytkownik bełkotał lub NLP nic nie dopasowało
          target: 'ask_consciousness', 
          actions: () => console.log('Nie zrozumiałem, pytam jeszcze raz o przytomność') 
        }
      }
    },

    ask_breathing: {
      on: {
        'intent.breathing': 'recovery_position',
        'intent.no_breathing': 'cpr_init',
        'None': { // Użytkownik bełkotał lub NLP nic nie dopasowało
          target: 'ask_breathing', 
          actions: () => console.log('Nie zrozumiałem, pytam jeszcze raz o oddychanie') 
        }
      }
    },

    cpr_init: {
      on: {
        'intent.cpr.breathing_restored': 'check_breathing_confirm_no_aed',
        'intent.breathing': 'check_breathing_confirm_no_aed',

        'intent.aed.here': 'aed_connect',
        'intent.aed.someone_went': 'cpr_waiting_aed',
        'intent.aed.know_where': 'send_for_aed',
        'intent.aed.none': 'cpr_no_aed',

        'None': { // Użytkownik bełkotał lub NLP nic nie dopasowało
          target: 'cpr_init', 
          actions: () => console.log('Nie zrozumiałem, pytam jeszcze raz o AED') 
        }
      }
    },

    send_for_aed: {
      on: {
        'intent.cpr.breathing_restored': 'check_breathing_confirm_no_aed',
        'intent.breathing': 'check_breathing_confirm_no_aed',

        'intent.aed.someone_sent': 'cpr_waiting_aed',
        'intent.aed.alone': 'aed_distance_check',

        'None': { // Użytkownik bełkotał lub NLP nic nie dopasowało
          target: 'send_for_aed', 
          actions: () => console.log('Nie zrozumiałem, pytam jeszcze raz o wysłanie po AED') 
        }
      }
    },

    aed_distance_check: {
      on: {
        'intent.cpr.breathing_restored': 'check_breathing_confirm_no_aed',
        'intent.breathing': 'check_breathing_confirm_no_aed',

        'intent.aed.far': 'cpr_no_aed',
        'intent.aed.near': 'aed_near_instruction',

        'None': { // Użytkownik bełkotał lub NLP nic nie dopasowało
          target: 'aed_distance_check', 
          actions: () => console.log('Nie zrozumiałem, pytam jeszcze raz o odległość AED') 
        }
      }
    },

    aed_near_instruction: {
      on: {
        'intent.cpr.breathing_restored': 'check_breathing_confirm_no_aed',
        'intent.breathing': 'check_breathing_confirm_no_aed',

        'intent.aed.back': 'aed_connect',
        '*': 'aed_connect'
      }
    },

    cpr_waiting_aed: {
      on: {
        'intent.cpr.breathing_restored': 'check_breathing_confirm_no_aed',
        'intent.breathing': 'check_breathing_confirm_no_aed',
        
        'intent.aed.arrived': 'aed_connect',
        '*': 'aed_connect'
      }
    },

    cpr_no_aed: {
      on: {
        'intent.cpr.failed': 'cpr_no_aed_loop',
        'intent.cpr.breathing_restored': 'check_breathing_confirm_no_aed',
        'intent.breathing': 'check_breathing_confirm_no_aed',

        'None': { // Użytkownik bełkotał lub NLP nic nie dopasowało
          target: 'cpr_no_aed',
          actions: () => console.log('Nie zrozumiałem, pytam jeszcze raz o stan poszkodowanego')
        }
      }
    },

    cpr_no_aed_loop: {
      on: {
        'intent.cpr.breathing_restored': 'check_breathing_confirm_no_aed',
        'intent.breathing': 'check_breathing_confirm_no_aed',
        'intent.cpr.failed': 'cpr_no_aed',

        'None': { // Użytkownik bełkotał lub NLP nic nie dopasowało
          target: 'cpr_no_aed_loop',
          actions: () => console.log('Nie zrozumiałem, pytam jeszcze raz o stan poszkodowanego')
        }
      }
    },

    // Flow pracy z AED
    aed_connect: {
      on: {
        '*': 'aed_analysis'
      }
    },

    aed_analysis: {
      on: {
        'intent.cpr.analysis_done': 'aed_defib',
        '*': 'aed_defib'
      }
    },

    aed_defib: {
      on: {
        'intent.cpr.failed': 'aed_loop',
        'intent.cpr.breathing_restored': 'check_breathing_confirm',
        'intent.breathing': 'check_breathing_confirm',

        'None': { // Użytkownik bełkotał lub NLP nic nie dopasowało
          target: 'aed_defib',
          actions: () => console.log('Nie zrozumiałem, pytam jeszcze raz o wynik defibrylacji')
        }
      }
    },

    aed_loop: {
      on: {
        'intent.cpr.failed': 'aed_defib',
        'intent.cpr.breathing_restored': 'check_breathing_confirm',
        'intent.breathing': 'check_breathing_confirm',

        'None': { // Użytkownik bełkotał lub NLP nic nie dopasowało
          target: 'aed_loop',
          actions: () => console.log('Nie zrozumiałem, pytam jeszcze raz o stan poszkodowanego po defibrylacji')
        }
      }
    },

    check_breathing_confirm: {
      on: {
        'intent.breathing': 'recovery_position_init',
        'intent.cpr.breathing_restored': 'recovery_position_init',
        'intent.no_breathing': 'aed_loop', // Powrót do RKO/AED jeśli pomyłka

        'None': { // Użytkownik bełkotał lub NLP nic nie dopasowało 
          target: 'check_breathing_confirm',
          actions: () => console.log('Nie zrozumiałem, pytam jeszcze raz o oddychanie') 
        }
      }
    },

    check_breathing_confirm_no_aed: {
      on: {
        'intent.breathing': 'recovery_position_final',
        'intent.cpr.breathing_restored': 'recovery_position_final',
        'intent.no_breathing': 'cpr_no_aed_loop', // Powrót do RKO/AED jeśli pomyłka
        'None': { // Użytkownik bełkotał lub NLP nic nie dopasowało
          target: 'check_breathing_confirm_no_aed',
          actions: () => console.log('Nie zrozumiałem, pytam jeszcze raz o oddychanie') 
        }
      }
    },

    recovery_position: {
      on: {
        '*': 'recovery_position'
      }
    },

    recovery_position_aed: {
      on: {
        '*': 'monitoring'
      }
    },

    recovery_position_init: {
      on: {
        '*': 'monitoring'
      }
    },

    recovery_position_final: {
      on: {
        '*': 'monitoring_no_aed'
      }
    },

    monitoring: {
      on: {
        '*': 'finish'
      }
    },

    monitoring_no_aed: {
      on: {
        '*': 'finish'
      }
    },

    wait_for_services: {
      type: 'final'
    },

    finish: {
      type: 'final'
    }
  }
});