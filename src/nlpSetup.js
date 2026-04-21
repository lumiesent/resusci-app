import { containerBootstrap } from '@nlpjs/core';
import { Nlp } from '@nlpjs/nlp';
import { LangPl } from '@nlpjs/lang-pl';

/** NOTATKI DLA PROGRAMISTY:
 * 
 * Ten plik jest miejscem, gdzie definiujesz "mózg" bota, czyli jego zdolność do rozumienia języka naturalnego.
 * Funkcja setupNLP() jest asynchroniczna, ponieważ trenowanie modelu NLP może zająć chwilę. W main.js
 * wyświetlamy komunikat "Ładowanie sztucznej inteligencji..." dopóki Promise się nie rozwiąże.
 * 
 * JAK DODAĆ NOWY SCENARIUSZ (Krok 2):
 * Dodaj tutaj nowe przykładowe wypowiedzi użytkownika i przypisz im nowe intencje, np.:
 * nlp.addDocument('pl', 'Pali się dom na ulicy Długiej', 'intent.fire.report');
 * TRENOWANIE SIECI (Dodawanie tzw. Utterances - Przykładowych Wypowiedzi)
 * Składnia: nlp.addDocument('język', 'Przykładowe zdanie użytkownika', 'nazwa.intencji');
 * 
 * UWAGA: 'nazwa.intencji' (np. 'intent.emergency.report') to DOKŁADNIE TEN SAM KLUCZ,
 * którego użyłeś w bloku 'on' w pliku scenario.js! To w ten sposób moduły ze sobą "gadają".
 * 
 * JAK DODAĆ NOWY SCENARIUSZ (Krok 3):
 * Dodaj tutaj nowe przykładowe wypowiedzi użytkownika i przypisz im nowe intencje, np.:
 * nlp.addDocument('pl', 'Pali się dom na ulicy Długiej', 'intent.fire.report');
 * 
 * Trenowanie modelu. To funkcja asynchroniczna, dlatego w main.js wyświetlamy
 * komunikat "Ładowanie sztucznej inteligencji..." dopóki Promise się nie rozwiąże.
 */

export async function setupNLP() {
  // Inicjalizacja środowiska NLP.js
  const container = await containerBootstrap();
  container.use(Nlp);
  // Ustawienie języka polskiego dla NLP.js
  container.use(LangPl); 
  
  // Pobranie instancji NLP z kontenera
  const nlp = container.get('nlp');
  nlp.settings.autoSave = false;
  nlp.addLanguage('pl');

  /** Scenariusz 2: Alergia
   * ==============================
   *  --- INTENCJE DOT. ALERGII ---
   * ==============================
   **/ 

  // Zgłoszenie
  nlp.addDocument('pl', 'Ugryzła mnie pszczoła i puchnę', 'intent.allergy.report');
  nlp.addDocument('pl', 'Dusi się po zjedzeniu orzeszków', 'intent.allergy.report');
  nlp.addDocument('pl', 'Ktoś ma wstrząs anafilaktyczny', 'intent.allergy.report');

  // Pytanie o adrenalinę (EpiPen)
  nlp.addDocument('pl', 'Nie, nie mamy żadnego zastrzyku', 'intent.allergy.no_epipen');
  nlp.addDocument('pl', 'Tak, ma w plecaku adrenalinę', 'intent.allergy.has_epipen');



  

  await nlp.train();
  return nlp;
}