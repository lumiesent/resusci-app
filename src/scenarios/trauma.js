import { createMachine, assign } from 'xstate';

/** Scenariusz: Urazy, obrażenia
 * ===================================================
 * --- SCENARIUSZ URAZOWY ---
 * ===================================================
 **/

// Słownik Dialogów [Urazy]
export const traumaDialog = {
  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 81, słucham',
    hint: 'Przedstaw swoją lokalizację i podaj dokładny adres.'
  },

  ask_situation: {
    message: 'Dobrze, co się stało?.',
    hint: 'Zgłoś mechanizm urazu (np. "Pracownik spadł z rusztowania" lub "Samochód potrącił rowerzystę").'
  },

  ask_safety: {
    message: 'Czy na miejscu jest bezpiecznie? Czy nie ma zagrożenia ze strony maszyn, ruchu drogowego lub osób trzecich?',
    hint: 'Potwierdź bezpieczeństwo (np. "Tak, wyłączyliśmy maszyny" lub "Zabezpieczyliśmy miejsce wypadku trójkątem").'
  },

  ask_consciousness: {
    message: 'Czy osoba poszkodowana jest przytomna?',
    hint: 'Oceń przytomność (np. "Tak, krzyczy z bólu" lub "Jest nieprzytomna").'
  },

  ask_breathing: {
    message: 'Czy osoba poszkodowana oddycha?',
    hint: 'Oceń oddech (np. "Tak, oddycha, ale bardzo szybko i głośno").'
  },

  cpr: {
    message: 'Proszę natychmiast rozpocząć uciskanie klatki piersiowej. Zespół ratownictwa jest już w drodze.',
    hint: 'Rozpocznij RKO.'
  },

  ask_injury_details: {
    message: 'Jakiej części ciała dotyczy uraz i jak jest rozległy? Czy to jest rana cięta, czy może doszło do amputacji lub wbicia jakiegoś przedmiotu?',
    hint: 'Opisz ranę (np. "Ma głębokie rozcięcie na udzie" lub "Odcięło mu palce").'
  },

  ask_bleeding: {
    message: 'Czy występuje silne krwawienie? Czy krew tryska pod ciśnieniem, czy wypływa powoli?',
    hint: 'Opisz krwawienie (np. "Krew tryska bardzo mocno, ma całe spodnie czerwone").'
  },

  instruction_bleeding: {
    message: 'Proszę natychmiast ucisnąć to miejsce czymś czystym – gazą, ubraniem lub ręcznikiem. Jeśli opatrunek przesiąknie, nie zdejmujcie go, tylko dołóżcie kolejną warstwę. Jeśli w ranie jest ciało obce, proszę go pod żadnym pozorem nie wyciągać!',
    hint: 'Zatamuj krwotok i zabezpiecz ciało obce.'
  },

  instruction_amputation: {
    message: 'Odciętą część ciała proszę włożyć do czystego worka foliowego, a ten worek do drugiego worka z zimną wodą i lodem. Nie kładźcie części ciała bezpośrednio na lodzie!',
    hint: 'Zabezpiecz amputowaną część ciała.'
  },

  ask_mobility_sensation: {
    message: 'Czy osoba poszkodowana może ruszać rękami i nogami? Czy skarży się na brak czucia lub drętwienie?',
    hint: 'Sprawdź objawy neurologiczne (np. "Mówi, że nie czuje nóg").'
  },

  final_instructions: {
    message: 'Zgłoszenie przyjęte. Proszę nie ruszać osoby poszkodowanej, szczególnie jeśli podejrzewacie uraz kręgosłupa po upadku, chyba że wymaga tego resuscytacja lub ewakuacja z miejsca zagrożenia. Proszę monitorować oddech i czekać na zespół.',
    hint: 'Stabilizuj poszkodowanego i czekaj na pomoc.'
  }
};

// Maszyna Stanów [Urazy]
export const traumaMachine = createMachine({
  id: 'trauma',
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
        'intent.trauma.report': 'ask_safety',
        '*': 'ask_safety'
      }
    },
    ask_safety: {
      on: {
        'intent.trauma.safety_confirmed': 'ask_consciousness',
        '*': 'ask_consciousness'
      }
    },
    ask_consciousness: {
      on: {
        'intent.unconscious': 'ask_breathing',
        'intent.conscious': 'ask_injury_details',
        '*': 'ask_injury_details'
      }
    },
    ask_breathing: {
      on: {
        'intent.no_breathing': 'cpr',
        'intent.breathing': 'ask_injury_details'
      }
    },
    cpr: { type: 'final' },
    ask_injury_details: {
      on: {
        'intent.trauma.amputation': 'instruction_amputation',
        'intent.trauma.injury_info': 'ask_bleeding',
        '*': 'ask_bleeding'
      }
    },
    instruction_amputation: {
      on: {
        '*': 'ask_bleeding'
      }
    },
    ask_bleeding: {
      on: {
        'intent.trauma.bleeding': 'instruction_bleeding',
        'intent.trauma.no_bleeding': 'ask_mobility_sensation',
        '*': 'instruction_bleeding'
      }
    },
    instruction_bleeding: {
      on: {
        '*': 'ask_mobility_sensation'
      }
    },
    ask_mobility_sensation: {
      on: {
        'intent.trauma.neuro': 'final_instructions',
        '*': 'final_instructions'
      }
    },
    final_instructions: { type: 'final' }
  }
});