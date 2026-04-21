import { createMachine, assign } from 'xstate';

/** NOTATKI DLA PROGRAMISTY:
 * PLIK SCENARIUSZY I LOGIKI (scenario.js)
 * * Ten plik definiuje "kroki" (stany) w poszczególnych symulacjach,
 * * oraz to, co dyspozytor (Bot) ma powiedzieć w każdym z tych kroków.
 * * Używamy tu biblioteki XState do tworzenia tzw. "Maszyn Stanów" (State Machines).
 * 
 * ============================================================================
 * INSTRUKCJA DLA JUNIORA: JAK DODAĆ NOWY SCENARIUSZ (np. Wypadek Drogowy)
 * ============================================================================
 * 1. Skopiuj jeden z powyższych słowników (np. allergyDialog) i zmień nazwę (np. na carCrashDialog).
 * 2. Skonfiguruj w nim kroki, komunikaty i wskazówki.
 * 3. Skopiuj maszynę stanów (np. allergyMachine) i zmień nazwę (np. na carCrashMachine) oraz `id`.
 * 4. Dopasuj intencje (klucze w blokach `on: { ... }`) – zadeklaruj, na jakie sygnały AI reaguje maszyna w danym kroku.
 * 5. Pamiętaj o dodaniu słowa `export` przed `const`! (Inaczej plik main.js tego nie zobaczy).
 * 6. Przejdź do nlpSetup.js, aby "nauczyć" AI słów kluczowych odpowiadających nowym intencjom.
 * Loop:
 * Machine -> Intencje -> Dialog -> (powtórz)
 */

/** Scenariusz 2: Alergia
 * ===========================
 *  --- SCENARIUSZ ALERGII ---
 * ===========================
 **/ 

// 2A. Słownik Dialogów [Alergia]
export const allergyDialog = {

  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 81, słucham',
    hint: 'Powiedz co się dzieje, zgłoś reakcję alergiczną (np. "[osoba] zjadła orzechy i zaczyna się dusić.").'
  },

  ask_location: {
    message: 'Proszę podać dokładny adres.',
    hint: 'Przedstaw swoją lokalizację, podaj adres lub opisz swoje otoczenie, czy znajduje się w pobliżu jakiś znany punkt odniesienia?'
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

  // Przyjęcie zgłoszenia
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

// 2B. Maszyna Stanów [Alergia]
export const allergyMachine = createMachine({
  id: 'allergy',
  initial: 'start',

  states: {

    start: {
      on: { 'intent.allergy.report': 'ask_location' }
    },

    // Zapamiętaj informacje od użytkownika (lokalizacja)
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
        'intent.allergy.conscious': 'ask_breathing_difficulties',
        'intent.allergy.unconscious': 'ask_breathing'
      }
    },

    ask_breathing: {
      on: {
        'intent.allergy.breathing': 'safe_position',
        'intent.allergy.no_breathing': 'cpr'
      }
    },

    ask_breathing_difficulties: {
      on: {
        'intent.allergy.breathing_difficult': 'ask_swelling',
        'intent.allergy.breathing_normal': 'ask_swelling'
      }
    },

    safe_position: {
      type: 'final'
    },

    // Do dokończenia
    cpr: {
      type: 'final'
    },

    ask_swelling: {
      on: {
        'intent.allergy.swelling': 'ask_adrealine',
        'intent.allergy.no_swelling': 'ask_adrealine'
      }
    },

    ask_adrealine: {
      on: {
        'intent.allergy.adrealine': 'ask_rash',
        'intent.allergy.no_adrealine': 'ask_rash'
      }
    },

    ask_rash: {
      on: {
        'intent.allergy.rash': 'ask_medicines',
        'intent.allergy.no_rash': 'ask_medicines'
      }
    },

    ask_medicines: {
      on: {
        'intent.allergy.medicines': 'ask_which_medicine',
        'intent.allergy.no_medicines': 'ask_skin'
      }
    },

    // Zapamiętaj informacje od użytkownika (leki)
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
        'intent.allergy.pale_skin': 'complete'
      }
    },

    complete: {
      type: 'final'
    }
  }
});

/** Scenariusz 3: Ból Brzucha
 * ===============================
 * --- SCENARIUSZ BÓLU BRZUCHA ---
 * ===============================
 **/ 

// 3A. Słownik Dialogów [Ból brzucha]
export const stomachDialog = {

  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 67, słucham.',
    hint: 'Zgłoś silny ból brzucha (np. "[osoba] ma potworny ból brzucha").'
  },

  ask_location: {
    message: 'Proszę podać dokładny adres.',
    hint: 'Przedstaw swoją lokalizację, podaj adres lub opisz swoje otoczenie, czy znajduje się w pobliżu jakiś znany punkt odniesienia?'
  },

  ask_consciousness: {
    message: 'Czy osoba poszkodowana jest przytomna?',
    hint: 'Oceń przytomność poszkodowanego (np. "Jest przytomny" lub "Nie, stracił przytomność").'
  },

  // --- ROZGAŁĘZIENIE A: POSZKODOWANY NIEPRZYTOMNY ---
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

  // --- ROZGAŁĘZIENIE B: POSZKODOWANY PRZYTOMNY (WYWIAD) ---
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

// 3B. Maszyna Stanów [Ból Brzucha]
export const stomachMachine = createMachine({
  id: 'stomach',
  initial: 'start',

  states: {

    start: {
      on: { 'intent.stomach.report': 'ask_location' }
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
        'intent.stomach.conscious': 'ask_pain_location', // Rozgałęzienie: Przytomny -> wywiad brzuszny
        'intent.stomach.unconscious': 'ask_breathing'    // Rozgałęzienie: Nieprzytomny -> kontrola oddechu
      }
    },

    // --- GAŁĄŹ B: NIEPRZYTOMNY ---
    ask_breathing: {
      on: {
        'intent.stomach.breathing': 'safe_position',     // Rozgałęzienie: Oddycha -> Pozycja boczna
        'intent.stomach.no_breathing': 'cpr'             // Rozgałęzienie: Nie oddycha -> RKO
      }
    },

    safe_position: {
      type: 'final'
    },

    cpr: {
      type: 'final'
    },

    // --- GAŁĄŹ A: PRZYTOMNY ---
    ask_pain_location: {
      on: {
        'intent.stomach.pain_location': 'ask_vomiting'
      }
    },

    ask_vomiting: {
      on: {
        'intent.stomach.vomiting': 'ask_medical_history',
        'intent.stomach.no_vomiting': 'ask_medical_history'
      }
    },

    ask_medical_history: {
      on: {
        'intent.stomach.medical_history': 'ask_skin',
        'intent.stomach.no_medical_history': 'ask_skin'
      }
    },

    ask_skin: {
      on: {
        'intent.stomach.pale_skin': 'ask_prior_medication',
        'intent.stomach.normal_skin': 'ask_prior_medication'
      }
    },

    ask_prior_medication: {
      on: {
        'intent.stomach.prior_medication': 'ask_regular_medication',
        'intent.stomach.no_prior_medication': 'ask_regular_medication'
      }
    },

    ask_regular_medication: {
      on: {
        'intent.stomach.regular_medication_stopped': 'complete',
        'intent.stomach.regular_medication_takes': 'complete'
      }
    },

    complete: {
      type: 'final'
    }
  }
});