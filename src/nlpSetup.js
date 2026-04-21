import { containerBootstrap } from '@nlpjs/core';
import { Nlp } from '@nlpjs/nlp';
import { LangPl } from '@nlpjs/lang-pl';

export async function setupNLP() {
  // Inicjalizacja środowiska NLP.js
  const container = await containerBootstrap();
  container.use(Nlp);
  container.use(LangPl); // Ustawienie języka polskiego
  
  const nlp = container.get('nlp');
  nlp.settings.autoSave = false;
  nlp.addLanguage('pl');

  // TRENOWANIE SIECI (Dodawanie tzw. Utterances - Przykładowych Wypowiedzi)
  // Składnia: nlp.addDocument('język', 'Przykładowe zdanie użytkownika', 'nazwa.intencji');
  
  // UWAGA: 'nazwa.intencji' (np. 'intent.emergency.report') to DOKŁADNIE TEN SAM KLUCZ,
  // którego użyłeś w bloku 'on' w pliku scenario.js! To w ten sposób moduły ze sobą "gadają".
  
  // Intencja: Zgłoszenie zdarzenia
  nlp.addDocument('pl', 'Ktoś zasłabł na ulicy', 'intent.emergency.report');
  nlp.addDocument('pl', 'Potrzebuję karetki, mój mąż upadł', 'intent.emergency.report');
  nlp.addDocument('pl', 'Wypadek samochodowy, są ranni', 'intent.emergency.report');
  nlp.addDocument('pl', 'Szybko pogotowie, ktoś leży i się nie rusza', 'intent.emergency.report');

  // Intencja: Pacjent NIEPRZYTOMNY
  nlp.addDocument('pl', 'Nie, leży bez ruchu', 'intent.patient.unconscious');
  nlp.addDocument('pl', 'Nie reaguje jak do niego mówię', 'intent.patient.unconscious');
  nlp.addDocument('pl', 'Jest nieprzytomny', 'intent.patient.unconscious');
  nlp.addDocument('pl', 'Zemdlal i sie nie budzi', 'intent.patient.unconscious');

  // Intencja: Pacjent PRZYTOMNY
  nlp.addDocument('pl', 'Tak, rozmawia ze mną', 'intent.patient.conscious');
  nlp.addDocument('pl', 'Jest przytomny, ale słaby', 'intent.patient.conscious');
  nlp.addDocument('pl', 'Otwiera oczy i patrzy', 'intent.patient.conscious');

  // Intencja: BRAK ODDECHU
  nlp.addDocument('pl', 'Nie słyszę oddechu', 'intent.patient.not_breathing');
  nlp.addDocument('pl', 'Klatka się nie unosi', 'intent.patient.not_breathing');
  nlp.addDocument('pl', 'Chyba nie oddycha', 'intent.patient.not_breathing');
  nlp.addDocument('pl', 'Sini się i nie łapie powietrza', 'intent.patient.not_breathing');

  // Intencja: ODDYCHA
  nlp.addDocument('pl', 'Tak, klatka się unosi', 'intent.patient.breathing');
  nlp.addDocument('pl', 'Oddycha normalnie', 'intent.patient.breathing');
  nlp.addDocument('pl', 'Czuję oddech na policzku', 'intent.patient.breathing');

  // Słowa wspierające (Fallback) - Jeśli NLP nie znajdzie dopasowania wyższego niż pewien próg pewności, zwróci 'None'.
  nlp.addAnswer('pl', 'None', 'fallback');

  // --- NOWE INTENCJE: ALERGIA ---
  // Zgłoszenie
  nlp.addDocument('pl', 'Ugryzła mnie pszczoła i puchnę', 'intent.allergy.report');
  nlp.addDocument('pl', 'Dusi się po zjedzeniu orzeszków', 'intent.allergy.report');
  nlp.addDocument('pl', 'Ktoś ma wstrząs anafilaktyczny', 'intent.allergy.report');

  // Pytanie o adrenalinę (EpiPen)
  nlp.addDocument('pl', 'Nie, nie mamy żadnego zastrzyku', 'intent.allergy.no_epipen');
  nlp.addDocument('pl', 'Tak, ma w plecaku adrenalinę', 'intent.allergy.has_epipen');

  // JAK DODAĆ NOWY SCENARIUSZ (Krok 3):
  // Dodaj tutaj nowe przykładowe wypowiedzi użytkownika i przypisz im nowe intencje, np.:
  // nlp.addDocument('pl', 'Pali się dom na ulicy Długiej', 'intent.fire.report');

  // Trenowanie modelu. To funkcja asynchroniczna, dlatego w main.js wyświetlamy
  // komunikat "Ładowanie sztucznej inteligencji..." dopóki Promise się nie rozwiąże.

  await nlp.train();
  return nlp;
}