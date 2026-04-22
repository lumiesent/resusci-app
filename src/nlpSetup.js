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

  /** Scenariusz 4: Ból Głowy
   * ==================================
   * --- INTENCJE DOT. BÓLU GŁOWY ---
   * ==================================
   **/ 

  // Zgłoszenie bólu głowy
  nlp.addDocument('pl', 'Dzień dobry, osoba poszkodowana bardzo źle się czuje. Ma straszny ból głowy.', 'intent.headache.report'); // [cite: 29]
  nlp.addDocument('pl', 'Mój mąż zwija się z bólu, głowa mu pęka.', 'intent.headache.report');

  // Pytanie o przytomność
  nlp.addDocument('pl', 'Tak, siedzi, ale ledwo kontaktuje.', 'intent.headache.conscious'); // [cite: 33]
  nlp.addDocument('pl', 'Jest przytomny', 'intent.headache.conscious');
  nlp.addDocument('pl', 'Nie, stracił przytomność', 'intent.headache.unconscious');
  nlp.addDocument('pl', 'Zemdlał, nie ma z nim kontaktu', 'intent.headache.unconscious');

  // Pytanie o Oddech (Gałąź: nieprzytomny)
  nlp.addDocument('pl', 'Tak, oddycha', 'intent.headache.breathing');
  nlp.addDocument('pl', 'Nie oddycha', 'intent.headache.no_breathing');

  // Pytanie o okoliczności
  nlp.addDocument('pl', 'Jakieś pół godziny temu, nagle zaczęła krzyczeć, że głowa jej pęka i zwymiotowała.', 'intent.headache.circumstances'); // [cite: 35]
  nlp.addDocument('pl', 'Zaczęło się nagle po upadku i mocno wymiotuje.', 'intent.headache.circumstances');

  // Pytanie o mowę i widzenie
  nlp.addDocument('pl', 'Tak, bełkocze i mówi, że widzi podwójnie.', 'intent.headache.issues'); // [cite: 37]
  nlp.addDocument('pl', 'Mówi niewyraźnie i traci wzrok.', 'intent.headache.issues');
  nlp.addDocument('pl', 'Nie, normalnie mówi i widzi wyraźnie.', 'intent.headache.no_issues');

  // Pytanie o drętwienia
  nlp.addDocument('pl', 'Mówi, że drętwieje jej cała prawa strona ciała.', 'intent.headache.numbness'); // [cite: 39]
  nlp.addDocument('pl', 'Narzeka na drętwienie rąk.', 'intent.headache.numbness');
  nlp.addDocument('pl', 'Nie drętwieje mu nic.', 'intent.headache.no_numbness');

  // Pytanie o leki na stałe / historię
  nlp.addDocument('pl', 'Tak, choruje na nadciśnienie i bierze leki na rozrzedzenie krwi.', 'intent.headache.medical_history'); // [cite: 41]
  nlp.addDocument('pl', 'Bierze leki przeciwzakrzepowe ze względu na serce.', 'intent.headache.medical_history');
  nlp.addDocument('pl', 'Na nic nie choruje i nie bierze leków.', 'intent.headache.no_medical_history');
  
  // Szczegóły wymiotów
  nlp.addDocument('pl', 'Wymiotuje od godziny samą treścią żołądkową, bez krwi.', 'intent.headache.vomiting_details');
  nlp.addDocument('pl', 'To tylko woda i żółć, zdarzyło się trzy razy.', 'intent.headache.vomiting_details');
  nlp.addDocument('pl', 'Nie wymiotuje w ogóle.', 'intent.headache.no_vomiting');

  // Pytanie o uraz
  nlp.addDocument('pl', 'Tak, rano osoba poszkodowana uderzyła się mocno w głowę o szafkę.', 'intent.headache.trauma');
  nlp.addDocument('pl', 'Uderzyła się w głowę rano.', 'intent.headache.trauma');
  nlp.addDocument('pl', 'Spadł ze schodów jakieś dwie godziny temu.', 'intent.headache.trauma');
  nlp.addDocument('pl', 'Nie, nie było żadnego urazu ani upadku.', 'intent.headache.no_trauma');

  // Historia bólów głowy
  nlp.addDocument('pl', 'Osoba poszkodowana miewa migreny, ale ten ból jest zupełnie inny i silniejszy.', 'intent.headache.history_different');
  nlp.addDocument('pl', 'Często ją boli głowa i to wygląda tak samo jak zawsze.', 'intent.headache.history_similar');
  nlp.addDocument('pl', 'Nigdy wcześniej nie było takich problemów, to pierwszy raz.', 'intent.headache.no_history');
  
  /** Scenariusz 5: Ból Kręgosłupa, Pleców
   * ===============================================
   * --- INTENCJE DOT. BÓLU KRĘGOSŁUPA I PLECÓW ---
   * ===============================================
   **/ 

  // Zgłoszenie
  nlp.addDocument('pl', 'Dzień dobry, osoba poszkodowana nagle upadła i wyje z bólu, mówi że pękają jej plecy.', 'intent.backpain.report');
  nlp.addDocument('pl', 'Poszkodowany ma potworny ból kręgosłupa, nie może się ruszyć.', 'intent.backpain.report');

  // Przytomność
  nlp.addDocument('pl', 'Tak, leży na podłodze, jest bardzo blady i spocony.', 'intent.backpain.conscious');
  nlp.addDocument('pl', 'Tak, leży przytomna.', 'intent.backpain.conscious');
  nlp.addDocument('pl', 'Nie, stracił przytomność, nie reaguje.', 'intent.backpain.unconscious');

  // Oddech (Gałąź nieprzytomny)
  nlp.addDocument('pl', 'Tak, klatka się unosi, oddycha.', 'intent.backpain.breathing');
  nlp.addDocument('pl', 'Nie słyszę oddechu, nie oddycha.', 'intent.backpain.no_breathing');

  // 1. Od kiedy boli?
  nlp.addDocument('pl', 'Boli od jakiś dwóch godzin.', 'intent.backpain.since_when');
  nlp.addDocument('pl', 'Zaczęło się nagle przed chwilą.', 'intent.backpain.since_when');

  // 2. Okoliczności
  nlp.addDocument('pl', 'To stało się po podniesieniu ciężkiego kartonu.', 'intent.backpain.circumstances');
  nlp.addDocument('pl', 'Po prostu siedziała i nagle poczuła rozcinający ból.', 'intent.backpain.circumstances');

  // 3. Charakter bólu
  nlp.addDocument('pl', 'Mówi, że to jest ból rozlany, pulsujący.', 'intent.backpain.pain_character');
  nlp.addDocument('pl', 'Czuje ostry ucisk i kłucie.', 'intent.backpain.pain_character');
  nlp.addDocument('pl', 'Ból jest stały i bardzo piekący.', 'intent.backpain.pain_character');

  // 4. Promieniowanie bólu
  nlp.addDocument('pl', 'Promieniuje w dół do pachwiny i nóg.', 'intent.backpain.pain_radiation');
  nlp.addDocument('pl', 'Ból idzie do klatki piersiowej i ramion.', 'intent.backpain.pain_radiation');
  nlp.addDocument('pl', 'Boli tylko w jednym miejscu, nigdzie nie promieniuje.', 'intent.backpain.no_radiation');

  // 5. Skala bólu
  nlp.addDocument('pl', 'Mówi, że to 10 na 10, najgorszy w życiu.', 'intent.backpain.pain_severity');
  nlp.addDocument('pl', 'W skali do dziesięciu to jakieś osiem.', 'intent.backpain.pain_severity');

  // 6. Neurologia (Ruch, czucie, drętwienie)
  nlp.addDocument('pl', 'Nogi ma jak z waty i zaczynają drętwieć, słabo czuje dotyk.', 'intent.backpain.neurology_issues');
  nlp.addDocument('pl', 'Może ruszać nogami i ma pełne czucie, nic nie drętwieje.', 'intent.backpain.no_neurology_issues');

  // 7. Bezwiedne oddanie moczu/stolca
  nlp.addDocument('pl', 'Tak, niestety popuścił mocz i stolec bezwiednie.', 'intent.backpain.involuntary_excretion');
  nlp.addDocument('pl', 'Nie, nic takiego się nie stało.', 'intent.backpain.no_involuntary_excretion');

  // 8. Problemy z oddawaniem moczu (krew)
  nlp.addDocument('pl', 'Ma problemy z sikaniem, w moczu była krew.', 'intent.backpain.urination_problems');
  nlp.addDocument('pl', 'Oddaje mocz normalnie, bez bólu i krwi.', 'intent.backpain.no_urination_problems');

  // 9. Zaparcia i wzdęcia
  nlp.addDocument('pl', 'Tak, od kilku dni ma mocne zaparcia i wzdęty brzuch.', 'intent.backpain.constipation');
  nlp.addDocument('pl', 'Nie ma żadnych zaparć ani wzdęć.', 'intent.backpain.no_constipation');

  // 10. Choroby przewlekłe
  nlp.addDocument('pl', 'Leczy się na nadciśnienie i ma stwierdzoną rwę kulszową.', 'intent.backpain.medical_history');
  nlp.addDocument('pl', 'Nie, to zdrowy człowiek, na nic nie choruje.', 'intent.backpain.no_medical_history');
  
  await nlp.train();
  return nlp;
}