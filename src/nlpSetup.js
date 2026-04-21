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

  /** Scenariusz 3: Ból Brzucha
   * ==================================
   * --- INTENCJE DOT. BÓLU BRZUCHA ---
   * ==================================
   **/ 

  nlp.addDocument('pl', 'Dzień dobry, mój mąż ma potworny ból brzucha.', 'intent.stomach.report');
  nlp.addDocument('pl', 'Zaczęło się nagle godzinę temu, zwija się na podłodze.', 'intent.stomach.report');

  // Pytanie o przytomność
  nlp.addDocument('pl', 'Tak, krzyczy z bólu, jest cały spocony.', 'intent.stomach.conscious');
  nlp.addDocument('pl', 'Jest przytomny', 'intent.stomach.conscious');
  nlp.addDocument('pl', 'Nie, stracił przytomność', 'intent.stomach.unconscious');
  nlp.addDocument('pl', 'Zemdlał, nie ma z nim kontaktu', 'intent.stomach.unconscious');

  // Pytanie o Oddech
  nlp.addDocument('pl', 'Tak, oddycha', 'intent.stomach.breathing');
  nlp.addDocument('pl', 'Klatka piersiowa się unosi', 'intent.stomach.breathing');
  nlp.addDocument('pl', 'Nie oddycha', 'intent.stomach.no_breathing');
  nlp.addDocument('pl', 'Nie słyszę oddechu', 'intent.stomach.no_breathing');

  // Pytanie o Ból
  nlp.addDocument('pl', 'Boli go nad pępkiem, mówi, że ból promieniuje mu aż do pleców, pod łopatkę.', 'intent.stomach.pain_location');
  nlp.addDocument('pl', 'Boli go cały brzuch i promieniuje na plecy', 'intent.stomach.pain_location');

  // Pytanie o Wymioty
  nlp.addDocument('pl', 'Tak, raz zwymiotował, ale to była tylko treść żołądkowa, bez krwi.', 'intent.stomach.vomiting');
  nlp.addDocument('pl', 'Nie, nie wymiotuje.', 'intent.stomach.no_vomiting');

  // Pytanie o Historia medyczna
  nlp.addDocument('pl', 'Choruje na serce i ma nadciśnienie. Nigdy nie miał operacji.', 'intent.stomach.medical_history');
  nlp.addDocument('pl', 'Na nic nie choruje i nie miał operacji', 'intent.stomach.no_medical_history');
  nlp.addDocument('pl', 'Jest w pełni zdrowy', 'intent.stomach.no_medical_history');

  // Pytanie o Skóra
  nlp.addDocument('pl', 'Jest bardzo blady i ma zimny pot na czole.', 'intent.stomach.pale_skin');
  nlp.addDocument('pl', 'Skóra wygląda normalnie', 'intent.stomach.normal_skin');

  // Pytanie o Leki doraźne (przed telefonem)
  nlp.addDocument('pl', 'Dałem mu tabletkę rozkurczową, ale w ogóle nie pomogła.', 'intent.stomach.prior_medication');
  nlp.addDocument('pl', 'Nic mu nie dawałem', 'intent.stomach.no_prior_medication');

  // Pytanie o Leki stałe
  nlp.addDocument('pl', 'Tak, ale od kilku dni nie bierze.', 'intent.stomach.regular_medication_stopped');
  nlp.addDocument('pl', 'Bierze na stałe leki na serce', 'intent.stomach.regular_medication_takes');
  
  await nlp.train();
  return nlp;
}