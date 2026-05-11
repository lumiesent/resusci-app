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
  nlp.addDocument('pl', 'Tak, osoba jest przytomna', 'intent.conscious');
  nlp.addDocument('pl', 'Osoba jest nieprzytomna', 'intent.unconscious');

  // Pytanie o oddech
  nlp.addDocument('pl', 'Tak, oddycha', 'intent.breathing');
  nlp.addDocument('pl', 'Nie, nie czuję oddechu', 'intent.no_breathing');

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
  nlp.addDocument('pl', 'Tak, krzyczy z bólu, jest cały spocony.', 'intent.conscious');
  nlp.addDocument('pl', 'Jest przytomny', 'intent.conscious');
  nlp.addDocument('pl', 'Nie, stracił przytomność', 'intent.unconscious');
  nlp.addDocument('pl', 'Zemdlał, nie ma z nim kontaktu', 'intent.unconscious');

  // Pytanie o Oddech
  nlp.addDocument('pl', 'Tak, oddycha', 'intent.breathing');
  nlp.addDocument('pl', 'Klatka piersiowa się unosi', 'intent.breathing');
  nlp.addDocument('pl', 'Nie oddycha', 'intent.no_breathing');
  nlp.addDocument('pl', 'Nie słyszę oddechu', 'intent.no_breathing');

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
  nlp.addDocument('pl', 'Tak, siedzi, ale ledwo kontaktuje.', 'intent.conscious');
  nlp.addDocument('pl', 'Jest przytomny', 'intent.conscious');
  nlp.addDocument('pl', 'Nie, stracił przytomność', 'intent.unconscious');
  nlp.addDocument('pl', 'Zemdlał, nie ma z nim kontaktu', 'intent.unconscious');

  // Pytanie o Oddech (Gałąź: nieprzytomny)
  nlp.addDocument('pl', 'Tak, oddycha', 'intent.breathing');
  nlp.addDocument('pl', 'Nie oddycha', 'intent.no_breathing');

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
  nlp.addDocument('pl', 'Tak, leży na podłodze, jest bardzo blady i spocony.', 'intent.conscious');
  nlp.addDocument('pl', 'Tak, leży przytomna.', 'intent.conscious');
  nlp.addDocument('pl', 'Nie, stracił przytomność, nie reaguje.', 'intent.unconscious');

  // Oddech (Gałąź nieprzytomny)
  nlp.addDocument('pl', 'Tak, klatka się unosi, oddycha.', 'intent.breathing');
  nlp.addDocument('pl', 'Nie słyszę oddechu, nie oddycha.', 'intent.no_breathing');

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

  /** Scenariusz 6: Ciąża, poród, poronienie
   * ===============================================
   * --- INTENCJE DOT. CIĄŻY I PORODU ---
   * ===============================================
   **/ 

  // Zgłoszenie
  nlp.addDocument('pl', 'Dzień dobry, osoba poszkodowana zaczęła rodzić! Odeszły jej wody i ma bardzo silne skurcze.', 'intent.pregnancy.report');
  nlp.addDocument('pl', 'Kobieta rodzi, ma silne bóle.', 'intent.pregnancy.report');
  nlp.addDocument('pl', 'Poszkodowana krwawi i ma skurcze, to chyba poronienie.', 'intent.pregnancy.report');

  // Przytomność
  nlp.addDocument('pl', 'Tak, poszkodowana jest przytomna.', 'intent.conscious');
  nlp.addDocument('pl', 'Tak, siedzi i krzyczy z bólu.', 'intent.conscious');
  nlp.addDocument('pl', 'Nie, straciła przytomność, nie reaguje.', 'intent.unconscious');
  nlp.addDocument('pl', 'Zemdlała i nie ma z nią kontaktu.', 'intent.unconscious');

  // Oddech (Gałąź nieprzytomny)
  nlp.addDocument('pl', 'Tak, klatka się unosi, oddycha.', 'intent.breathing');
  nlp.addDocument('pl', 'Nie słyszę oddechu, nie oddycha.', 'intent.no_breathing');

  // Która ciąża, tydzień, poród
  nlp.addDocument('pl', 'To druga ciąża, trzydziesty dziewiąty tydzień.', 'intent.pregnancy.details');
  nlp.addDocument('pl', 'Pierwsza ciąża, ósmy miesiąc.', 'intent.pregnancy.details');

  // Pojedyncza/mnoga, zagrożona, powikłania
  nlp.addDocument('pl', 'Ciąża pojedyncza, nie jest zagrożona. Wcześniej nie było powikłań.', 'intent.pregnancy.complications');
  nlp.addDocument('pl', 'To bliźniaki, ciąża wysokiego ryzyka.', 'intent.pregnancy.complications');

  // Skurcze i wody płodowe
  nlp.addDocument('pl', 'Skurcze są co trzy minuty i trwają bardzo długo. Wody są mętne.', 'intent.pregnancy.contractions_fluid');
  nlp.addDocument('pl', 'Wody odeszły pół godziny temu, skurcze co pięć minut.', 'intent.pregnancy.contractions_fluid');
  nlp.addDocument('pl', 'Wody jeszcze nie odeszły, ale skurcze są częste.', 'intent.pregnancy.contractions_fluid');

  // Ruchy płodu
  nlp.addDocument('pl', 'Tak, mały się ruszał jeszcze przed chwilą.', 'intent.pregnancy.fetal_movements');
  nlp.addDocument('pl', 'Tak, czuje ruchy dziecka.', 'intent.pregnancy.fetal_movements');
  nlp.addDocument('pl', 'Nie czuje ruchów dziecka od rana.', 'intent.pregnancy.no_fetal_movements');

  // Krwawienie
  nlp.addDocument('pl', 'Nie ma krwi, nic nie krwawi.', 'intent.pregnancy.no_bleeding');
  nlp.addDocument('pl', 'Tak, występuje silne krwawienie z dróg rodnych.', 'intent.pregnancy.bleeding');

  // Uraz i historia chorób
  nlp.addDocument('pl', 'Choruje na tarczycę, bierze Euthyrox. Urazów nie było.', 'intent.pregnancy.trauma_medical');
  nlp.addDocument('pl', 'Miała wypadek, upadła na brzuch. Nie bierze żadnych leków.', 'intent.pregnancy.trauma_medical');
  nlp.addDocument('pl', 'Jest w pełni zdrowa, żadnego urazu nie było.', 'intent.pregnancy.trauma_medical');

  /** Scenariusz 7: Cukrzyca
   * ===============================================
   * --- INTENCJE DOT. CUKRZYCY I ZABURZEŃ GLIKEMII ---
   * ===============================================
   **/ 

  // Zgłoszenie
  nlp.addDocument('pl', 'Dzień dobry, osoba poszkodowana jest diabetykiem i bardzo dziwnie się zachowuje. Jest agresywna, bełkocze i cała się trzęsie.', 'intent.diabetes.report'); // [cite: 76]
  nlp.addDocument('pl', 'Ktoś ma chyba atak cukrzycy, dziwnie się zachowuje.', 'intent.diabetes.report');
  nlp.addDocument('pl', 'Poszkodowany ma cukrzycę i nagle bardzo źle się poczuł.', 'intent.diabetes.report'); // [cite: 44, 45]

  // Przytomność
  nlp.addDocument('pl', 'Tak, siedzi na podłodze, ale nie da się z nim dogadać. Jest cały zlany zimnym potem i blady.', 'intent.conscious');
  nlp.addDocument('pl', 'Tak, jest przytomny.', 'intent.conscious');
  nlp.addDocument('pl', 'Nie, stracił przytomność, nie reaguje.', 'intent.unconscious');
  nlp.addDocument('pl', 'Zemdlał i nie ma z nim kontaktu.', 'intent.unconscious');

  // Oddech (Gałąź nieprzytomny)
  nlp.addDocument('pl', 'Tak, klatka się unosi, oddycha.', 'intent.breathing');
  nlp.addDocument('pl', 'Nie słyszę oddechu, nie oddycha.', 'intent.no_breathing');

  // Poziom glukozy
  nlp.addDocument('pl', 'Tak, przed chwilą. Glukometr pokazał 35.', 'intent.diabetes.sugar_measured'); // [cite: 82]
  nlp.addDocument('pl', 'Sprawdzaliśmy w aplikacji z sensora, cukier drastycznie spadł.', 'intent.diabetes.sugar_measured'); // [cite: 54]
  nlp.addDocument('pl', 'Nie mierzyliśmy, nie mamy sprzętu.', 'intent.diabetes.sugar_not_measured');

  // Zachowanie i stan skóry (Świadomość, mowa, wilgotność, kolor)
  nlp.addDocument('pl', 'Jest bardzo pobudzony, bełkocze i strasznie się poci.', 'intent.diabetes.behavior_skin_issues'); // [cite: 57, 58, 87]
  nlp.addDocument('pl', 'Jest blady jak ściana i zlany potem.', 'intent.diabetes.behavior_skin_issues'); // [cite: 58]
  nlp.addDocument('pl', 'Mówi normalnie, ale skóra jest bardzo wilgotna.', 'intent.diabetes.behavior_skin_issues'); 

  // Trudności w oddychaniu
  nlp.addDocument('pl', 'Tak, ma duszności i oddycha bardzo ciężko.', 'intent.diabetes.breathing_issues'); // [cite: 59, 70]
  nlp.addDocument('pl', 'Nie, oddycha normalnie.', 'intent.diabetes.no_breathing_issues');

  // Insulina i choroby
  nlp.addDocument('pl', 'Tak, bierze insulinę na stałe.', 'intent.diabetes.takes_insulin'); // [cite: 84]
  nlp.addDocument('pl', 'Choruje tylko na cukrzycę, bierze tabletki.', 'intent.diabetes.takes_insulin'); // [cite: 60, 61]
  nlp.addDocument('pl', 'Nie przyjmuje insuliny.', 'intent.diabetes.no_insulin');

  // Podanie cukru (Bezpieczeństwo)
  nlp.addDocument('pl', 'Tak, pije właśnie słodki sok.', 'intent.diabetes.give_sugar_yes'); // [cite: 89]
  nlp.addDocument('pl', 'Daliśmy mu cukier i jest w stanie przełykać.', 'intent.diabetes.give_sugar_yes');
  nlp.addDocument('pl', 'Nie jest w stanie nic przełknąć, wypluwa wszystko.', 'intent.diabetes.give_sugar_no'); // [cite: 64]

  /** Scenariusz: Drgawki
   * ==============================
   * --- INTENCJE DOT. DRGAWEK ---
   * ==============================
   **/ 

  // Zgłoszenie
  nlp.addDocument('pl', 'mój syn nagle upadł i cały się trzęsie', 'intent.seizures.report');
  nlp.addDocument('pl', 'Mężczyzna na przystanku ma drgawki, z buzi leci mu piana', 'intent.seizures.report');
  nlp.addDocument('pl', 'Osoba poszkodowana ma atak, rzuca nią o ziemię', 'intent.seizures.report');
  nlp.addDocument('pl', 'Przestał się trząść, ale jest nieprzytomny', 'intent.seizures.report');

  // Bezpieczeństwo
  nlp.addDocument('pl', 'Jest bezpiecznie, nie ma prądu ani gazu', 'intent.seizures.safety_ok');
  nlp.addDocument('pl', 'Doszło do porażenia prądem', 'intent.seizures.safety_hazard');

  // Czy trwają drgawki
  nlp.addDocument('pl', 'Tak, właśnie bardzo mocno drga', 'intent.seizures.ongoing');
  nlp.addDocument('pl', 'Nie, drgawki już ustąpiły', 'intent.seizures.ended');

  // Historia i szczegóły
  nlp.addDocument('pl', 'Choruje na padaczkę od lat', 'intent.seizures.history');
  nlp.addDocument('pl', 'To kobieta w ciąży', 'intent.seizures.history');
  nlp.addDocument('pl', 'Ma bardzo wysoką gorączkę', 'intent.seizures.history');

  // Czas i urazy
  nlp.addDocument('pl', 'Trwało to około trzy minuty', 'intent.seizures.details');
  nlp.addDocument('pl', 'Uderzył się mocno w głowę o chodnik', 'intent.seizures.details');

  // Objawy (mocz, język)
  nlp.addDocument('pl', 'Popuścił mocz i ugryzł się w język', 'intent.seizures.symptoms');
  nlp.addDocument('pl', 'Widzę krew w ustach', 'intent.seizures.symptoms');

  /** Scenariusz: Duszność
   * ==============================
   * --- INTENCJE DOT. DUSZNOŚCI ---
   * ==============================
   **/ 

  // Zgłoszenie duszności
  nlp.addDocument('pl', 'osoba poszkodowana nagle zaczęła się dusić', 'intent.dyspnea.report');
  nlp.addDocument('pl', 'nie może złapać tchu i charczy', 'intent.dyspnea.report');
  nlp.addDocument('pl', 'ledwo oddycha i siedzi nieruchomo', 'intent.dyspnea.report');
  nlp.addDocument('pl', 'brakuje jej powietrza', 'intent.dyspnea.report');

  // Uraz lub zadławienie
  nlp.addDocument('pl', 'zadławił się orzechem', 'intent.dyspnea.trauma_choking');
  nlp.addDocument('pl', 'ma wbity kawałek metalu w klatkę piersiową', 'intent.dyspnea.trauma_choking');
  nlp.addDocument('pl', 'uderzył się mocno w pierś podczas upadku', 'intent.dyspnea.trauma_choking');

  // Wygląd skóry i czas
  nlp.addDocument('pl', 'jest bardzo blady i cały zlany zimnym potem', 'intent.dyspnea.skin_symptoms');
  nlp.addDocument('pl', 'usta zrobiły się sine', 'intent.dyspnea.skin_symptoms');
  nlp.addDocument('pl', 'zaczęło się to dziesięć minut temu', 'intent.dyspnea.skin_symptoms');

  // Historia i leki
  nlp.addDocument('pl', 'choruje na astmę i brał leki wziewne', 'intent.dyspnea.history_meds');
  nlp.addDocument('pl', 'jest po zawale i ma pochp', 'intent.dyspnea.history_meds');
  nlp.addDocument('pl', 'bierze na stałe leki na serce', 'intent.dyspnea.history_meds');

  // Dodatkowe objawy
  nlp.addDocument('pl', 'skarży się na silny ból w klatce piersiowej', 'intent.dyspnea.details');
  nlp.addDocument('pl', 'od tygodnia ma spuchniętą nogę', 'intent.dyspnea.details');
  nlp.addDocument('pl', 'kaszle krwią', 'intent.dyspnea.details');

  await nlp.train();
  return nlp;
}