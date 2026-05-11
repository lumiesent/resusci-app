import { createMachine, assign } from 'xstate';

/** Scenariusz: Ciąża, poród, poronienie
 * ===================================================
 * --- SCENARIUSZ CIĄŻY, PORODU I PORONIENIA ---
 * ===================================================
 **/

// Słownik Dialogów [Ciąża, poród, poronienie]
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

// Maszyna Stanów [Ciąża, poród, poronienie]
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
        'intent.conscious': 'ask_pregnancy_details',
        'intent.unconscious': 'ask_breathing'
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
