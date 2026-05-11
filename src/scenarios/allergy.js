import { createMachine, assign } from 'xstate';

/** Scenariusz: Alergia
 * ===========================
 * --- SCENARIUSZ ALERGII ---
 * ===========================
 **/

// Słownik Dialogów [Alergia]
export const allergyDialog = {
  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 81, słucham',
    hint: 'Przedstaw swoją lokalizację, podaj adres lub opisz swoje otoczenie, czy znajduje się w pobliżu jakiś znany punkt odniesienia?'
  },

  ask_situation: {
    message: 'Dobrze, co się stało?.',
    hint: 'Powiedz co się dzieje, zgłoś reakcję alergiczną (np. "[osoba] zjadła orzechy i zaczyna się dusić.").'
  },

  ask_consciousness: {
    message: 'Czy poszkodowany jest przytomny?',
    hint: 'Oceń przytomność poszkodowanego (np. "Tak, osoba jest przytomna" lub "Osoba jest nieprzytomna.").'
  },

  ask_breathing: {
    message: 'Czy poszkodowany oddycha?',
    hint: 'Oceń oddech poszkodowanego, następnie odpowiedz (np. "Tak, oddycha" lub "Nie, nie czuję oddechu.").'
  },

  ask_breathing_difficulties: {
    message: 'Czy ma trudności w oddychaniu? Od kiedy?',
    hint: 'Oceń sposób oddechu poszkodowanego, następnie odpowiedz (np. "Oddycha normalnie" lub "Coraz ciężej mu złapać oddech.").'
  },

  safe_position: {
    message: 'Proszę ułożyć osobę poszkodowaną w pozycji bocznej bezpiecznej i czekać na przyjazd karetki pogotowia.',
    hint: 'Oczekuj na przyjazd karetki w pozycji bezpiecznej.'
  },

  cpr: {
    message: 'Proszę natychmiast rozpocząć uciskanie klatki piersiowej. Zespół ratownictwa jest już w drodze.',
    hint: 'Rozpocznij Resuscytację Krążeniowo-Oddechową (RKO).'
  },

  ask_swelling: {
    message: 'Zgłoszenie zostało przyjęte, proszę czekać na przyjazd ratownictwa medycznego. Proszę się nie rozłączać, muszę zadać jeszcze kilka pytań. Czy poszkodowany ma obrzęki? Jeśli tak to w jakim miejscu się znajdują?',
    hint: 'Przekaż stan obrzęków oraz ich dokładne miejsce (np. "Poszkodowany ma obrzęki na gardle" lub "Nie widzę żadnych obrzęków.").'
  },

  ask_adrealine: {
    message: 'Czy osoba poszkodowana wiedziała wcześniej o tym uczuleniu? Czy ma przy sobie adrealinę?',
    hint: 'Przekaż rzeczywistą wiedzę na temat uczuleniu oraz czy posiadasz adrealinę (np. "Tak, wiemy o uczuleniu i mamy adrealinę", "Tak, wiemy o alergii ale nie mamy adrealiny" lub "To pierwszy taki przypadek.").'
  },

  ask_rash: {
    message: 'Czy ma jakąś wysypkę na ciele?',
    hint: 'Przekaż wszelkie zauważalne zmiany na ciele (np. "Tak, na klatce piersiowej pojawiły się czerwone plamy" lub "Nie, nie widzę żadnych miejsc z wysypką.").'
  },

  ask_medicines: {
    message: 'Czy żona choruje na coś jeszcze? Przyjmowała dziś jakieś nowe leki?',
    hint: 'Przekaż rzeczywistą wiedzę na temat stanu zdrowotnego oraz przyjmowanych leków (np. "Podałem jej tabletkę leku na alergię" lub "Dzisiaj nie przyjmowała żadnych leków.").'
  },

  ask_which_medicines: {
    message: 'Jaki był to lek?',
    hint: 'Przekaż pełną nazwę leku, opisz wygląd lub zastosowanie leku tak, by można było go zidentyfikować.'
  },

  ask_skin: {
    message: 'Jak teraz wygląda jej skóra? Jest blada lub spocona?',
    hint: 'Przekaż stan skóry (np. "Jest bardzo blada" lub "Mocno się spociła.").'
  },

  complete: {
    message: 'Rozumiem. Pomoc jest już w drodze. Proszę pomóc żonie usiąść wygodnie, nie zostawiać jej samej i ułatwić dostęp do świeżego powietrza. W przypadku zmiany stanu żony proszę o ponowny kontakt. Ja się rozłączam, do widzenia.',
    hint: 'Czekaj na przyjazd pomocy. Połączenie zakończone.'
  }
};

// Maszyna Stanów [Alergia]
export const allergyMachine = createMachine({
  id: 'allergy',
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
        'intent.allergy.report': 'ask_consciousness',
        '*': 'ask_consciousness'
      },
    },

    ask_consciousness: {
      on: {
        'intent.conscious': 'ask_breathing_difficulties',
        'intent.unconscious': 'ask_breathing'
      }
    },

    ask_breathing: {
      on: {
        'intent.breathing': 'safe_position',
        'intent.no_breathing': 'cpr'
      }
    },

    ask_breathing_difficulties: {
      on: {
        'intent.allergy.breathing_difficult': 'ask_swelling',
        'intent.allergy.breathing_normal': 'ask_swelling',
        '*': 'ask_swelling'
      }
    },

    safe_position: {
      type: 'final'
    },

    cpr: {
      type: 'final'
    },

    ask_swelling: {
      on: {
        'intent.allergy.swelling': 'ask_adrealine',
        'intent.allergy.no_swelling': 'ask_adrealine',
        '*': 'ask_adrealine'
      }
    },

    ask_adrealine: {
      on: {
        'intent.allergy.adrealine': 'ask_rash',
        'intent.allergy.no_adrealine': 'ask_rash',
        '*': 'ask_rash'
      }
    },

    ask_rash: {
      on: {
        'intent.allergy.rash': 'ask_medicines',
        'intent.allergy.no_rash': 'ask_medicines',
        '*': 'ask_medicines'
      }
    },

    ask_medicines: {
      on: {
        'intent.allergy.medicines': 'ask_which_medicine',
        'intent.allergy.no_medicines': 'ask_skin'
      }
    },

    ask_which_medicine: {
      on: {
        'USER_PROVIDED_MEDICINE': {
          target: 'ask_skin',
          actions: assign({
            location: ({ event }) => event.text 
          })
        }
      }
    },

    ask_skin: {
      on: {
        'intent.allergy.normal_skin': 'complete',
        'intent.allergy.sweaty_skin': 'complete',
        'intent.allergy.pale_skin': 'complete',
        '*': 'complete'
      }
    },

    complete: {
      type: 'final'
    }
  }
});
