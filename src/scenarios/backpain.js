import { createMachine, assign } from 'xstate';

/** Scenariusz: Ból Kręgosłupa, Pleców
 * ===================================================
 * --- SCENARIUSZ BÓLU KRĘGOSŁUPA I PLECÓW ---
 * ===================================================
 **/

// Słownik Dialogów [Ból Kręgosłupa, Pleców]
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

// Maszyna Stanów [Ból Kręgosłupa, Pleców]
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
        'intent.conscious': 'ask_since_when',
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
