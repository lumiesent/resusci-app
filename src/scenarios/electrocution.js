import { createMachine, assign } from 'xstate';

/** Scenariusz: Porażenie prądem, piorunem
 * ===================================================
 * --- SCENARIUSZ PORAŻENIA PRĄDEM ---
 * ===================================================
 **/

// Słownik Dialogów [Porażenie prądem]
export const electrocutionDialog = {
  start: {
    message: 'Ratownictwo Medyczne, dyspozytor 81, słucham',
    hint: 'Przedstaw swoją lokalizację i podaj dokładny adres.'
  },

  ask_situation: {
    message: 'Dobrze, co się stało?.',
    hint: 'Zgłoś porażenie (np. "Mąż naprawiał gniazdko i go poraziło, leży na ziemi").'
  },

  ask_safety_disconnect: {
    message: 'Czy źródło prądu zostało odłączone? Czy wyłączono bezpieczniki? Proszę pod żadnym pozorem nie dotykać tej osoby, dopóki nie ma pewności, że nie jest pod napięciem.',
    hint: 'Potwierdź odłączenie prądu (np. "Tak, wyciągnąłem wtyczkę z kontaktu" lub "Bezpieczniki są wyłączone").'
  },

  ask_consciousness: {
    message: 'Czy osoba poszkodowana jest przytomna?',
    hint: 'Oceń przytomność (np. "Jest przytomny, ale bardzo blady").'
  },

  ask_breathing: {
    message: 'Czy osoba poszkodowana oddycha?',
    hint: 'Oceń oddech u osoby nieprzytomnej (pamiętaj o 10 sekundach).'
  },

  cpr: {
    message: 'Proszę natychmiast rozpocząć uciskanie klatki piersiowej. Zespół ratownictwa jest już w drodze.',
    hint: 'Rozpocznij RKO.'
  },

  ask_heart_chest_pain: {
    message: 'Czy osoba poszkodowana skarży się na ból w klatce piersiowej lub czy czuje, że jej serce bije bardzo szybko lub nierówno?',
    hint: 'Zapytaj o kołatanie serca i ból (np. "Mówi, że serce mu bije jak szalone").'
  },

  ask_trauma_mobility: {
    message: 'Czy ta osoba spadła z wysokości lub została odrzucona? Czy porusza normalnie wszystkimi kończynami i czy ma w nich czucie?',
    hint: 'Sprawdź skutki upadku i objawy neurologiczne (np. "Spadł z drabiny i nie może ruszać nogami").'
  },

  ask_burns: {
    message: 'Czy widzi Pan na ciele jakieś rany lub oparzenia? Proszę sprawdzić miejsca, którymi prąd mógł wejść i wyjść z ciała.',
    hint: 'Opisz rany (np. "Ma czarne plamy na dłoniach i na stopie").'
  },

  final_instructions: {
    message: 'Zgłoszenie przyjęte. Proszę monitorować stan osoby poszkodowanej. Jeśli istnieje podejrzenie urazu kręgosłupa po upadku, proszę jej nie ruszać, chyba że jest to konieczne do ratowania życia. Czekajcie na zespół.',
    hint: 'Zapewnij spokój poszkodowanemu i czekaj na pomoc.'
  }
};

// Maszyna Stanów [Porażenie prądem]
export const electrocutionMachine = createMachine({
  id: 'electrocution',
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
        'intent.electrocution.report': 'ask_safety_disconnect',
        '*': 'ask_safety_disconnect'
      }
    },
    ask_safety_disconnect: {
      on: {
        'intent.electrocution.safety_confirmed': 'ask_consciousness',
        '*': 'ask_consciousness'
      }
    },
    ask_consciousness: {
      on: {
        'intent.unconscious': 'ask_breathing',
        'intent.conscious': 'ask_heart_chest_pain',
        '*': 'ask_heart_chest_pain'
      }
    },
    ask_breathing: {
      on: {
        'intent.no_breathing': 'cpr',
        'intent.breathing': 'ask_heart_chest_pain'
      }
    },
    cpr: { type: 'final' },
    ask_heart_chest_pain: {
      on: {
        'intent.electrocution.heart_symptoms': 'ask_trauma_mobility',
        '*': 'ask_trauma_mobility'
      }
    },
    ask_trauma_mobility: {
      on: {
        'intent.electrocution.trauma_neuro': 'ask_burns',
        '*': 'ask_burns'
      }
    },
    ask_burns: {
      on: {
        'intent.electrocution.burns': 'final_instructions',
        '*': 'final_instructions'
      }
    },
    final_instructions: { type: 'final' }
  }
});