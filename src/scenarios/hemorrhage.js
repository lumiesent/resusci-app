import { createMachine, assign } from 'xstate';

/** Scenariusz: Krwotok, krwawienie
 * ===================================================
 * --- SCENARIUSZ KRWOTOKU I KRWAWIENIA ---
 * ===================================================
 **/

// Słownik Dialogów [Krwotok]
export const hemorrhageDialog = {
  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 81, słucham',
    hint: 'Przedstaw swoją lokalizację, podaj dokładny adres lub punkt odniesienia.'
  },

  ask_situation: {
    message: 'Dobrze, co się stało?.',
    hint: 'Zgłoś krwotok lub ranę (np. "Osoba poszkodowana bardzo mocno skaleczyła się w nogę, krew tryska pod ciśnieniem").'
  },

  ask_safety_circumstances: {
    message: 'Czy na miejscu jest bezpiecznie? Jak doszło do tego urazu (wypadek, napad)?',
    hint: 'Oceń bezpieczeństwo i podaj okoliczności zdarzenia.'
  },

  ask_intensity_location: {
    message: 'Gdzie dokładnie jest rana i jak wygląda krwawienie? Czy krew pulsuje, wypływa pod ciśnieniem, czy powoli wycieka?',
    hint: 'Opisz lokalizację rany i intensywność krwawienia (np. "Rana na udzie, krew pulsuje").'
  },

  instruction_pressure: {
    message: 'Proszę natychmiast ucisnąć to miejsce ręką przez czystą tkaninę lub gazę. Proszę nie puszczać ucisku i nie zdejmować opatrunku, nawet jeśli przesiąknie. Czy to zrobione?',
    hint: 'Potwierdź zastosowanie ucisku.'
  },

  ask_consciousness: {
    message: 'Czy osoba poszkodowana jest przytomna?',
    hint: 'Oceń przytomność (np. "Tak, jest przytomna, ale bardzo blada").'
  },

  ask_breathing: {
    message: 'Czy osoba poszkodowana oddycha?',
    hint: 'Oceń oddech (w przypadku utraty przytomności).'
  },

  cpr: {
    message: 'Proszę natychmiast rozpocząć uciskanie klatki piersiowej. Zespół ratownictwa jest już w drodze.',
    hint: 'Rozpocznij RKO.'
  },

  ask_shock_skin: {
    message: 'Jak wygląda skóra osoby poszkodowanej? Czy jest blada, spocona, czy kontakt z nią jest utrudniony?',
    hint: 'Opisz objawy wstrząsu (np. "Jest blada jak ściana i cała spocona, robi się senna").'
  },

  ask_meds: {
    message: 'Czy osoba poszkodowana przyjmuje na stałe leki na rozrzedzenie krwi (przeciwkrzepliwe)?',
    hint: 'Podaj informacje o lekach (np. "Tak, bierze leki na krzepliwość").'
  },

  final_instructions: {
    message: 'Zgłoszenie przyjęte. Proszę cały czas mocno uciskać ranę. Jeśli opatrunek przesiąknie, proszę dołożyć kolejną warstwę na wierzch, nie zdejmując poprzedniej. Czekajcie na zespół.',
    hint: 'Oczekuj na pomoc, nie zwalniając ucisku.'
  }
};

// Maszyna Stanów [Krwotok]
export const hemorrhageMachine = createMachine({
  id: 'hemorrhage',
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
        'intent.hemorrhage.report': 'ask_safety_circumstances',
        '*': 'ask_safety_circumstances'
      }
    },
    ask_safety_circumstances: {
      on: {
        'intent.hemorrhage.safety_ok': 'ask_intensity_location',
        'intent.hemorrhage.crime_accident': 'ask_intensity_location',
        '*': 'ask_intensity_location'
      }
    },
    ask_intensity_location: {
      on: {
        'intent.hemorrhage.details': 'instruction_pressure',
        '*': 'instruction_pressure'
      }
    },
    instruction_pressure: {
      on: {
        'intent.confirmation': 'ask_consciousness',
        '*': 'ask_consciousness'
      }
    },
    ask_consciousness: {
      on: {
        'intent.unconscious': 'ask_breathing',
        'intent.conscious': 'ask_shock_skin',
        '*': 'ask_shock_skin'
      }
    },
    ask_breathing: {
      on: {
        'intent.breathing': 'ask_shock_skin', // Kontynuacja wywiadu mimo nieprzytomności (jeśli oddycha)
        'intent.no_breathing': 'cpr'
      }
    },
    cpr: { type: 'final' },
    ask_shock_skin: {
      on: {
        'intent.hemorrhage.shock_symptoms': 'ask_meds',
        '*': 'ask_meds'
      }
    },
    ask_meds: {
      on: {
        'intent.hemorrhage.meds': 'final_instructions',
        '*': 'final_instructions'
      }
    },
    final_instructions: { type: 'final' }
  }
});