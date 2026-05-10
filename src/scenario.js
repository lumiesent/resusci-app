import { createMachine, assign } from 'xstate';

/** NOTATKI DLA PROGRAMISTY:
 * PLIK SCENARIUSZY I LOGIKI (scenario.js)
 * * Ten plik definiuje "kroki" (stany) w poszczególnych symulacjach,
 * * oraz to, co dyspozytor (Bot) ma powiedzieć w każdym z tych kroków.
 * * Używamy tu biblioteki XState do tworzenia tzw. "Maszyn Stanów" (State Machines).
 * * ============================================================================
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
 * --- SCENARIUSZ ALERGII ---
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
        'intent.allergy.breathing_normal': 'ask_swelling',
        '*': 'ask_swelling'
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
        'intent.allergy.pale_skin': 'complete',
        '*': 'complete'
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

/** Scenariusz 4: Ból Głowy
 * ==================================
 * --- SCENARIUSZ BÓLU GŁOWY ---
 * ==================================
 **/ 

// 4A. Słownik Dialogów [Ból Głowy]
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
    message: 'Zgłoszenie przyjęte, proszę czekać na przyjazd zespołu ratownictwa medycznego. Muszę zadać jeszcze kilka pytań. Czy występują jakieś drętwienia?', // 
    hint: 'Sprecyzuj (np. "Mówi, że drętwieje jej cała prawa strona ciała." lub "Nie drętwieje mu nic.").'
  },

  ask_medical_history: {
    message: 'Czy osoba poszkodowana choruje na coś na stałe? Przyjmuje leki przeciwzakrzepowe?', 
    hint: 'Opisz choroby (np. "Tak, choruje na nadciśnienie i bierze leki na rozrzedzenie krwi." lub "Na nic nie choruje i nie bierze leków").'
  },

  complete: {
    message: 'Rozumiem. Pomoc jest już w drodze. Proszę nie podawać osobie poszkodowanej nic do jedzenia ani picia. W przypadku pogorszenia stanu lub utraty przytomności proszę natychmiast dzwonić. Rozłączam się, do widzenia.', // [cite: 42, 43]
    hint: 'Czekaj na przyjazd pomocy. Połączenie zakończone.'
  }
};

// 4B. Maszyna Stanów [Ból Głowy]
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
        'intent.headache.conscious': 'ask_circumstances', // Gałąź przytomny -> Wywiad
        'intent.headache.unconscious': 'ask_breathing'    // Gałąź nieprzytomny -> Kontrola oddechu
      }
    },

    // --- GAŁĄŹ NIEPRZYTOMNY ---
    ask_breathing: {
      on: {
        'intent.headache.breathing': 'safe_position',     
        'intent.headache.no_breathing': 'cpr'             
      }
    },

    safe_position: {
      type: 'final'
    },

    cpr: {
      type: 'final'
    },

    // --- GAŁĄŹ PRZYTOMNY ---
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

/** Scenariusz 5: Ból Kręgosłupa, Pleców
 * ===================================================
 * --- SCENARIUSZ BÓLU KRĘGOSŁUPA I PLECÓW ---
 * ===================================================
 **/ 

// 5A. Słownik Dialogów [Ból Kręgosłupa, Pleców]
export const backpainDialog = {

  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 69, słucham?',
    hint: 'Zgłoś silny ból pleców/kręgosłupa poszkodowanego (np. "Poszkodowany ma potworny ból kręgosłupa").'
  },

  ask_location: {
    message: 'Proszę podać dokładny adres zdarzenia.',
    hint: 'Podaj adres.'
  },

  ask_consciousness: {
    message: 'Czy osoba poszkodowana jest przytomna?',
    hint: 'Oceń przytomność (np. "Tak, leży przytomna" lub "Nie, zemdlała").'
  },

  // --- NIEPRZYTOMNY ---
  ask_breathing: {
    message: 'Czy osoba poszkodowana oddycha?',
    hint: 'Oceń oddech poszkodowanego (np. "Tak, klatka się unosi, oddycha" lub "Nie słyszę oddechu").'
  },
  safe_position: {
    message: 'Proszę ułożyć osobę poszkodowaną w pozycji bocznej bezpiecznej, o ile nie ma podejrzenia urazu kręgosłupa, i czekać na przyjazd karetki.',
    hint: 'Oczekuj na przyjazd karetki.'
  },
  cpr: {
    message: 'Proszę natychmiast rozpocząć uciskanie klatki piersiowej. Zespół ratownictwa jest w drodze.',
    hint: 'Rozpocznij RKO.'
  },

  // --- PRZYTOMNY (WYWIAD MEDYCZNY) ---
  ask_since_when: {
    message: 'Od kiedy dokładnie osobę poszkodowaną boli kręgosłup?',
    hint: 'Podaj czas (np. "Boli od jakiś dwóch godzin").'
  },

  ask_circumstances: {
    message: 'W jakich okolicznościach pojawił się ból? Czy doszło do jakiegoś urazu, wysiłku fizycznego?',
    hint: 'Opisz sytuację (np. "Zaczęło się po podniesieniu ciężaru").'
  },

  ask_pain_character: {
    message: 'Jaki jest charakter tego bólu? Czy jest on rozlany, punktowy, pulsujący, czy może to tępy ucisk?',
    hint: 'Opisz charakter bólu (np. "Czuje ostry ucisk i kłucie").'
  },

  ask_pain_radiation: {
    message: 'Czy ten ból gdzieś promieniuje? Na przykład do pachwiny, krocza, nóg, ramion lub klatki piersiowej?',
    hint: 'Wskaż promieniowanie (np. "Promieniuje w dół do pachwiny i nóg" lub "Nigdzie nie promieniuje").'
  },

  ask_pain_severity: {
    message: 'Proszę ocenić nasilenie bólu u osoby poszkodowanej w skali od 0 do 10.',
    hint: 'Podaj ocenę w skali (np. "Mówi, że to 10 na 10").'
  },

  ask_neurology: {
    message: 'Czy występuje drętwienie kończyn? Czy osoba poszkodowana może normalnie poruszać nogami i czy czucie jest w nich zachowane?',
    hint: 'Oceń neurologię (np. "Nogi drętwieją i słabo czuje dotyk" lub "Może ruszać nogami i ma pełne czucie, nic nie drętwieje.").'
  },

  ask_involuntary_excretion: {
    message: 'Czy osoba poszkodowana oddała bezwiednie stolec lub mocz?',
    hint: 'Odpowiedz na temat bezwiednego załatwienia się (np. "Tak, niestety popuścił mocz" lub "Nie, nic takiego się nie stało").'
  },

  ask_urination_problems: {
    message: 'Czy osoba poszkodowana normalnie oddaje mocz? Czy są z tym problemy, dolegliwości lub czy widać było krew w moczu?',
    hint: 'Opisz oddawanie moczu (np. "Ma problemy z sikaniem, była krew" lub "Oddaje mocz normalnie, bez bólu i krwi.").'
  },

  ask_constipation: {
    message: 'Czy występują zaparcia lub mocne wzdęcia brzucha?',
    hint: 'Opisz problemy trawienne (np. "Tak, ma wzdęcia od kilku dni" lub "Nie ma żadnych zaparć ani wzdęć".).'
  },

  ask_medical_history: {
    message: 'Zgłoszenie zostało przyjęte. Czy osoba poszkodowana choruje na coś przewlekle? Na przykład rwa kulszowa, ciąża lub problemy z sercem?',
    hint: 'Podaj choroby (np. "Leczy się na nadciśnienie" lub "Nie, to zdrowy człowiek, na nic nie choruje").'
  },

  complete: {
    message: 'Rozumiem. Zespół ratownictwa medycznego jest w drodze. Proszę pomóc osobie poszkodowanej przyjąć pozycję, która sprawia najmniej bólu. W przypadku zmiany stanu proszę natychmiast o ponowny kontakt. Rozłączam się.',
    hint: 'Czekaj na przyjazd pomocy. Połączenie zakończone.'
  }
};

// 5B. Maszyna Stanów [Ból Kręgosłupa, Pleców]
export const backpainMachine = createMachine({
  id: 'backpain',
  initial: 'start',

  states: {
    start: {
      on: { 'intent.backpain.report': 'ask_location' }
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
        'intent.backpain.conscious': 'ask_since_when',
        'intent.backpain.unconscious': 'ask_breathing'
      }
    },

    // --- GAŁĄŹ: NIEPRZYTOMNY ---
    ask_breathing: {
      on: {
        'intent.backpain.breathing': 'safe_position',     
        'intent.backpain.no_breathing': 'cpr'             
      }
    },
    safe_position: { type: 'final' },
    cpr: { type: 'final' },

    // --- GAŁĄŹ: PRZYTOMNY (Kaskada pytań z wywiadu) ---
    ask_since_when: {
      on: { 
        'intent.backpain.since_when': 'ask_circumstances',
        '*': 'ask_circumstances' 
      }
    },

    ask_circumstances: {
      on: { 
        'intent.backpain.circumstances': 'ask_pain_character',
        '*': 'ask_pain_character'
      }
    },

    ask_pain_character: {
      on: { 
        'intent.backpain.pain_character': 'ask_pain_radiation',
        '*': 'ask_pain_radiation'
      }
    },

    ask_pain_radiation: {
      on: {
        'intent.backpain.pain_radiation': 'ask_pain_severity',
        'intent.backpain.no_radiation': 'ask_pain_severity',
        '*': 'ask_pain_severity'
      }
    },

    ask_pain_severity: {
      on: { 
        'intent.backpain.pain_severity': 'ask_neurology',
        '*': 'ask_neurology' 
      }
    },

    ask_neurology: {
      on: {
        'intent.backpain.neurology_issues': 'ask_involuntary_excretion',
        'intent.backpain.no_neurology_issues': 'ask_involuntary_excretion',
        '*': 'ask_involuntary_excretion'
      }
    },

    ask_involuntary_excretion: {
      on: {
        'intent.backpain.involuntary_excretion': 'ask_urination_problems',
        'intent.backpain.no_involuntary_excretion': 'ask_urination_problems',
        '*': 'ask_urination_problems'
      }
    },

    ask_urination_problems: {
      on: {
        'intent.backpain.urination_problems': 'ask_constipation',
        'intent.backpain.no_urination_problems': 'ask_constipation',
        '*': 'ask_constipation'
      }
    },

    ask_constipation: {
      on: {
        'intent.backpain.constipation': 'ask_medical_history',
        'intent.backpain.no_constipation': 'ask_medical_history',
        '*': 'ask_medical_history'
      }
    },

    ask_medical_history: {
      on: {
        'intent.backpain.medical_history': 'complete',
        'intent.backpain.no_medical_history': 'complete',
        '*': 'complete'
      }
    },

    complete: {
      type: 'final'
    }
  }
});

/** Scenariusz 6: Ciąża, poród, poronienie
 * ===================================================
 * --- SCENARIUSZ CIĄŻY, PORODU I PORONIENIA ---
 * ===================================================
 **/ 

// 6A. Słownik Dialogów [Ciąża, poród, poronienie]
export const pregnancyDialog = {

  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 70, słucham?',
    hint: 'Zgłoś rozpoczęcie akcji porodowej, skurcze lub krwawienie u poszkodowanej (np. "Poszkodowana zaczęła rodzić! Odeszły jej wody i ma bardzo silne skurcze").'
  },

  ask_location: {
    message: 'Proszę podać dokładny adres.',
    hint: 'Podaj dokładny adres zdarzenia.'
  },

  ask_consciousness: {
    message: 'Czy poszkodowana jest przytomna?',
    hint: 'Oceń przytomność (np. "Tak, poszkodowana jest przytomna" lub "Nie, straciła przytomność").'
  },

  // --- GAŁĄŹ: NIEPRZYTOMNA ---
  ask_breathing: {
    message: 'Czy poszkodowana oddycha?',
    hint: 'Oceń oddech (np. "Tak, oddycha" lub "Nie słyszę oddechu").'
  },
  safe_position: {
    message: 'Proszę ułożyć poszkodowaną w pozycji bocznej ustalonej, najlepiej na lewym boku (zapobiega to uciskowi na duże naczynia krwionośne), i czekać na przyjazd karetki.',
    hint: 'Oczekuj na przyjazd karetki w pozycji bezpiecznej.'
  },
  cpr: {
    message: 'Proszę natychmiast rozpocząć uciskanie klatki piersiowej. Zespół ratownictwa jest już w drodze.',
    hint: 'Rozpocznij RKO.'
  },

  // --- GAŁĄŹ: PRZYTOMNA (WYWIAD MEDYCZNY) ---
  ask_pregnancy_details: {
    message: 'Która to ciąża? Który tydzień i który to poród?',
    hint: 'Podaj szczegóły ciąży (np. "To druga ciąża, 39. tydzień").'
  },

  ask_complications: {
    message: 'Czy ciąża jest pojedyncza czy mnoga? Czy jest zagrożona i czy w przeszłości występowały komplikacje?',
    hint: 'Odpowiedz o potencjalnych zagrożeniach (np. "Ciąża pojedyncza, nie jest zagrożona").'
  },

  ask_contractions_fluid: {
    message: 'Czy występują skurcze i co ile minut? Czy są zachowane wody płodowe, a jeśli nie, to kiedy odeszły?',
    hint: 'Opisz skurcze i wody płodowe (np. "Skurcze są co 3 minuty. Wody odeszły przed chwilą").'
  },

  ask_movements: {
    message: 'Czy poszkodowana czuje ruchy płodu?',
    hint: 'Zwróć uwagę na ruchy dziecka (np. "Tak, czuje ruchy dziecka").'
  },

  ask_bleeding: {
    message: 'Czy występuje krwawienie z dróg rodnych?',
    hint: 'Poinformuj o ewentualnym krwotoku (np. "Nie ma krwi" lub "Tak, występuje silne krwawienie").'
  },

  ask_trauma_medical: {
    message: 'Zgłoszenie przyjęte, proszę czekać na przyjazd zespołu ratownictwa medycznego. Muszę zadać jeszcze kilka pytań. Czy w ostatnim czasie doszło u poszkodowanej do urazu brzucha? Na co choruje i czy przyjmuje jakieś leki?',
    hint: 'Opisz historię medyczną i urazy (np. "Choruje na tarczycę, bierze Euthyrox. Urazów nie było").'
  },

  complete: {
    message: 'Rozumiem. Pomoc jest już w drodze. Proszę przygotować dokumentację ciąży i torbę do szpitala. W przypadku urodzenia dziecka przed przyjazdem karetki lub pogorszenia stanu poszkodowanej, proszę natychmiast dzwonić. Rozłączam się.',
    hint: 'Czekaj na przyjazd pomocy. Przygotuj niezbędne dokumenty.'
  }
};

// 6B. Maszyna Stanów [Ciąża, poród, poronienie]
export const pregnancyMachine = createMachine({
  id: 'pregnancy',
  initial: 'start',

  states: {
    start: {
      on: { 'intent.pregnancy.report': 'ask_location' }
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
        'intent.pregnancy.conscious': 'ask_pregnancy_details',
        'intent.pregnancy.unconscious': 'ask_breathing'
      }
    },

    // --- GAŁĄŹ: NIEPRZYTOMNA ---
    ask_breathing: {
      on: {
        'intent.pregnancy.breathing': 'safe_position',     
        'intent.pregnancy.no_breathing': 'cpr'             
      }
    },
    safe_position: { type: 'final' },
    cpr: { type: 'final' },

    // --- GAŁĄŹ: PRZYTOMNA (Wywiad ciągły) ---
    ask_pregnancy_details: {
      on: { 
        'intent.pregnancy.details': 'ask_complications',
        '*': 'ask_complications' 
      }
    },

    ask_complications: {
      on: { 
        'intent.pregnancy.complications': 'ask_contractions_fluid',
        '*': 'ask_contractions_fluid'
      }
    },

    ask_contractions_fluid: {
      on: { 
        'intent.pregnancy.contractions_fluid': 'ask_movements',
        '*': 'ask_movements'
      }
    },

    ask_movements: {
      on: {
        'intent.pregnancy.fetal_movements': 'ask_bleeding',
        'intent.pregnancy.no_fetal_movements': 'ask_bleeding',
        '*': 'ask_bleeding'
      }
    },

    ask_bleeding: {
      on: { 
        'intent.pregnancy.bleeding': 'ask_trauma_medical',
        'intent.pregnancy.no_bleeding': 'ask_trauma_medical',
        '*': 'ask_trauma_medical' 
      }
    },

    ask_trauma_medical: {
      on: {
        'intent.pregnancy.trauma_medical': 'complete',
        '*': 'complete'
      }
    },

    complete: {
      type: 'final'
    }
  }
});