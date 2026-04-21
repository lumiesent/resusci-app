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
  nlp.addDocument('pl', 'Poszkodowana zjadła orzechy i zaczyna się dusić.', 'intent.allergy.report');

  // Pytanie o przytomność
  nlp.addDocument('pl', 'Tak, osoba jest przytomna', 'intent.allergy.conscious');
  nlp.addDocument('pl', 'Osoba jest nieprzytomna', 'intent.allergy.unconscious');

  // Pytanie o oddech
  nlp.addDocument('pl', 'Tak, oddycha', 'intent.allergy.breathing');
  nlp.addDocument('pl', 'Nie, nie czuję oddechu', 'intent.allergy.no_breathing');

  // Pytanie o stan oddechu
  nlp.addDocument('pl', 'Coraz ciężej mu złapać oddech', 'intent.allergy.breathing_difficult');
  nlp.addDocument('pl', 'Oddycha normalnie', 'intent.allergy.breathing_normal');

  // Pytanie o obrzęki
  nlp.addDocument('pl', 'Poszkodowany ma obrzęki na gardle', 'intent.allergy.swelling')
  nlp.addDocument('pl', 'Nie widzę żadnych obrzęków', 'intent.allergy.no_swelling')

  // Pytanie o adrealinę
  nlp.addDocument('pl', 'Tak, wiemy o uczuleniu i mamy adrealinę', 'intent.allergy.adrealine')
  nlp.addDocument('pl', 'Tak, wiemy o alergii ale nie mamy adrealiny', 'intent.allergy.no_adrealine')
  nlp.addDocument('pl', 'To pierwszy taki przypadek', 'intent.allergy.no_adrealine')

  // Pytanie o wysypkę
  nlp.addDocument('pl', 'Tak, na klatce piersiowej pojawiły się czerwone plamy', 'intent.allergy.rash')
  nlp.addDocument('pl', 'Nie, nie widzę żadnych miejsc z wysypką', 'intent.allergy.no_rash')

  // Pytanie o leki
  nlp.addDocument('pl', 'Podałem jej tabletkę leku na alergię', 'intent.allergy.medicines')
  nlp.addDocument('pl', 'Dzisiaj nie przyjmowała żadnych leków', 'intent.allergy.no_medicines')

  // Pytanie o skórę
  nlp.addDocument('pl', 'Wygląda dobrze, nie widzę żadnych zmian', 'intent.allergy.normal_skin')
  nlp.addDocument('pl', 'Skóra wygląda normalnie', 'intent.allergy.normal_skin')
  nlp.addDocument('pl', 'Mocno się spociła', 'intent.allergy.sweaty_skin')
  nlp.addDocument('pl', 'Leci z niej pot', 'intent.allergy.sweaty_skin')
  nlp.addDocument('pl', 'Jest bardzo blada', 'intent.allergy.pale_skin')
  nlp.addDocument('pl', 'Wygląda strasznie biało', 'intent.allergy.pale_skin')

  await nlp.train();
  return nlp;
}