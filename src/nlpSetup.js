import { containerBootstrap } from '@nlpjs/core';
import { Nlp } from '@nlpjs/nlp';
import { LangPl } from '@nlpjs/lang-pl';

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
   * ================================
   * --- INTENCJE DOT. BÓLU GŁOWY ---
   * ================================
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
   * ==============================================
   * --- INTENCJE DOT. BÓLU KRĘGOSŁUPA I PLECÓW ---
   * ==============================================
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
   * ====================================
   * --- INTENCJE DOT. CIĄŻY I PORODU ---
   * ====================================
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
   * ==================================================
   * --- INTENCJE DOT. CUKRZYCY I ZABURZEŃ GLIKEMII ---
   * ==================================================
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

  /** Scenariusz: Krwotok
   * ==============================
   * --- INTENCJE DOT. KRWOTOKU ---
   * ==============================
   **/ 

  // Zgłoszenie krwotoku
  nlp.addDocument('pl', 'osoba poszkodowana bardzo mocno krwawi z nogi', 'intent.hemorrhage.report');
  nlp.addDocument('pl', 'krew tryska pod ciśnieniem', 'intent.hemorrhage.report');
  nlp.addDocument('pl', 'jest głęboka rana cięta i mnóstwo krwi', 'intent.hemorrhage.report');
  nlp.addDocument('pl', 'osoba poszkodowana została dźgnięta nożem', 'intent.hemorrhage.report');

  // Bezpieczeństwo i okoliczności
  nlp.addDocument('pl', 'jest bezpiecznie, nikt nas nie atakuje', 'intent.hemorrhage.safety_ok');
  nlp.addDocument('pl', 'to był wypadek przy pracy piłą', 'intent.hemorrhage.crime_accident');
  nlp.addDocument('pl', 'ktoś ją napadł w bramie', 'intent.hemorrhage.crime_accident');

  // Szczegóły krwawienia
  nlp.addDocument('pl', 'krew jest jasnoczerwona i pulsuje', 'intent.hemorrhage.details');
  nlp.addDocument('pl', 'to rana na przedramieniu, krew płynie ciurkiem', 'intent.hemorrhage.details');
  nlp.addDocument('pl', 'rana jest w pachwinie', 'intent.hemorrhage.details');

  // Objawy wstrząsu
  nlp.addDocument('pl', 'jest bardzo blada i cała spocona', 'intent.hemorrhage.shock_symptoms');
  nlp.addDocument('pl', 'robi się bardzo senny i podsypia', 'intent.hemorrhage.shock_symptoms');
  nlp.addDocument('pl', 'skóra jest zimna i wilgotna', 'intent.hemorrhage.shock_symptoms');

  // Leki przeciwkrzepliwe
  nlp.addDocument('pl', 'tak, bierze leki na rozrzedzenie krwi', 'intent.hemorrhage.meds');
  nlp.addDocument('pl', 'przyjmuje acenokumarol', 'intent.hemorrhage.meds');
  nlp.addDocument('pl', 'nie wiem czy bierze jakieś leki', 'intent.hemorrhage.meds');

  /** Scenariusz: Osoba leżąca
   * ===================================
   * --- INTENCJE DOT. OSOBY LEŻĄCEJ ---
   * ===================================
   **/ 

  // Zgłoszenie
  nlp.addDocument('pl', 'widzę mężczyznę który leży na trawniku', 'intent.lying.report');
  nlp.addDocument('pl', 'ktoś leży przed klatką i się nie rusza', 'intent.lying.report');
  nlp.addDocument('pl', 'zauważyłem osobę leżącą w rowie', 'intent.lying.report');
  nlp.addDocument('pl', 'na przystanku leży kobieta, ma rozsypane zakupy', 'intent.lying.report');

  // Okoliczności i bezpieczeństwo
  nlp.addDocument('pl', 'to nie był wypadek, po prostu leży', 'intent.lying.safety_ok');
  nlp.addDocument('pl', 'nie widać zagrożeń w pobliżu', 'intent.lying.safety_ok');
  nlp.addDocument('pl', 'chyba go prąd poraził bo leży przy kablach', 'intent.lying.circumstances');
  nlp.addDocument('pl', 'wygląda to na potrącenie', 'intent.lying.circumstances');

  // Stan świadomości (częściowy kontakt)
  nlp.addDocument('pl', 'otwiera oczy ale bełkocze', 'intent.lying.partial_conscious');
  nlp.addDocument('pl', 'nic nie pamięta i jest splątany', 'intent.lying.partial_conscious');
  nlp.addDocument('pl', 'jest z nią utrudniony kontakt', 'intent.lying.partial_conscious');

  // Urazy i krew
  nlp.addDocument('pl', 'ma rozbitą głowę i widać krew na chodniku', 'intent.lying.trauma');
  nlp.addDocument('pl', 'nie widzę żadnych ran ani krwi', 'intent.lying.trauma');
  nlp.addDocument('pl', 'poszkodowany zwymiotował', 'intent.lying.trauma');

  // Neurologia i mowa
  nlp.addDocument('pl', 'skarży się na drętwienie prawej ręki', 'intent.lying.neurology');
  nlp.addDocument('pl', 'mówi niewyraźnie i opada mu kącik ust', 'intent.lying.neurology');
  nlp.addDocument('pl', 'kręci mu się w głowie i nic nie pamięta', 'intent.lying.neurology');

  // Historia, alkohol, cukrzyca
  nlp.addDocument('pl', 'czuć od niego silny zapach alkoholu', 'intent.lying.history');
  nlp.addDocument('pl', 'ma przy sobie legitymację diabetyka', 'intent.lying.history');
  nlp.addDocument('pl', 'choruje na serce', 'intent.lying.history');
  nlp.addDocument('pl', 'jest bardzo blady i ma sine usta', 'intent.lying.history');

  /** Scenariusz: Nieprzytomny
   * ==============================
   * --- INTENCJE DOT. NIEPRZYTOMNOŚCI ---
   * ==============================
   **/ 

  // Zgłoszenie nieprzytomności
  nlp.addDocument('pl', 'osoba poszkodowana leży i nie można z nią nawiązać kontaktu', 'intent.unconscious.report');
  nlp.addDocument('pl', 'osunął się na ziemię i w ogóle mnie nie słyszy', 'intent.unconscious.report');
  nlp.addDocument('pl', 'jest zupełnie wiotka i nie reaguje na szczypanie', 'intent.unconscious.report');
  nlp.addDocument('pl', 'nie można go obudzić', 'intent.unconscious.report');

  // Bezpieczeństwo i tlenek węgla (CO)
  nlp.addDocument('pl', 'jest bezpiecznie, nie czuję zapachów', 'intent.unconscious.safety_ok');
  nlp.addDocument('pl', 'czuć gaz w łazience', 'intent.unconscious.co_risk');
  nlp.addDocument('pl', 'piecyk gazowy był włączony', 'intent.unconscious.co_risk');
  nlp.addDocument('pl', 'w kuchni jest bardzo duszno i czuć spaleniznę', 'intent.unconscious.co_risk');

  // Skóra i poty (Hipoglikemia)
  nlp.addDocument('pl', 'jest bardzo blada i cała spocona', 'intent.unconscious.skin_symptoms');
  nlp.addDocument('pl', 'skóra jest zimna i wilgotna', 'intent.unconscious.skin_symptoms');
  nlp.addDocument('pl', 'ma sine usta', 'intent.unconscious.skin_symptoms');

  // Historia i cukrzyca
  nlp.addDocument('pl', 'choruje na cukrzycę i nadciśnienie', 'intent.unconscious.history');
  nlp.addDocument('pl', 'brała rano insulinę i leki na serce', 'intent.unconscious.history');
  nlp.addDocument('pl', 'często miewa ataki padaczki', 'intent.unconscious.history');

  // Wymioty
  nlp.addDocument('pl', 'widać treść pokarmową w ustach', 'intent.unconscious.vomiting');
  nlp.addDocument('pl', 'osoba poszkodowana wymiotowała przed chwilą', 'intent.unconscious.vomiting');
  nlp.addDocument('pl', 'nie widać żadnych wymiocin', 'intent.unconscious.vomiting');

  /** Scenariusz: Oparzenie
   * ==============================
   * --- INTENCJE DOT. OPARZEŃ ---
   * ==============================
   **/ 

  // Zgłoszenie oparzenia
  nlp.addDocument('pl', 'osoba poszkodowana oparzyła się wrzątkiem', 'intent.burns.report');
  nlp.addDocument('pl', 'wybuchł biokominek i moja dziewczyna jest poparzona', 'intent.burns.report');
  nlp.addDocument('pl', 'dziecko wylało na siebie gorącą kawę', 'intent.burns.report');
  nlp.addDocument('pl', 'mąż ma zwęglone ubranie na plecach po wybuchu', 'intent.burns.report');

  // Przyczyna oparzenia
  nlp.addDocument('pl', 'to było porażenie prądem w garażu', 'intent.burns.cause');
  nlp.addDocument('pl', 'oblała się kwasem w warsztacie', 'intent.burns.cause');
  nlp.addDocument('pl', 'wpadł nogą do dołu z wapnem', 'intent.burns.cause');
  nlp.addDocument('pl', 'oparzyła się ogniem z grilla', 'intent.burns.cause');

  // Objawy inhalacyjne (drogi oddechowe)
  nlp.addDocument('pl', 'ma osmalone brwi i drapie ją w gardle', 'intent.burns.inhalation_symptoms');
  nlp.addDocument('pl', 'ma sadzę w nosie i ciężko mu mówić', 'intent.burns.inhalation_symptoms');
  nlp.addDocument('pl', 'skarży się na duszność i pieczenie w przełyku', 'intent.burns.inhalation_symptoms');
  nlp.addDocument('pl', 'nie ma osmalonych brwi, oddycha normalnie', 'intent.burns.inhalation_symptoms');

  // Szczegóły (lokalizacja i wygląd)
  nlp.addDocument('pl', 'oparzenie jest na twarzy i dłoniach', 'intent.burns.details');
  nlp.addDocument('pl', 'na skórze wyszły ogromne bąble i pęcherze', 'intent.burns.details');
  nlp.addDocument('pl', 'skóra jest biała i twarda', 'intent.burns.details');
  nlp.addDocument('pl', 'ma poparzone krocze i brzuch', 'intent.burns.details');

  /** Scenariusz: Hipotermia
   * ================================
   * --- INTENCJE DOT. HIPOTERMII ---
   * ================================
   **/ 

  // Zgłoszenie
  nlp.addDocument('pl', 'osoba poszkodowana jest bardzo zimna i cały się trzęsie', 'intent.hypothermia.report');
  nlp.addDocument('pl', 'znalazłem bezdomnego na ławce, jest wychłodzony', 'intent.hypothermia.report');
  nlp.addDocument('pl', 'dziecko wpadło do lodowatej wody', 'intent.hypothermia.report');
  nlp.addDocument('pl', 'starsza pani leżała całą noc w nieogrzewanym domu', 'intent.hypothermia.report');

  // Czas ekspozycji
  nlp.addDocument('pl', 'przebywa na zewnątrz od kilku godzin', 'intent.hypothermia.exposure_time');
  nlp.addDocument('pl', 'leżał tam całą noc', 'intent.hypothermia.exposure_time');
  nlp.addDocument('pl', 'wyszedł rano na grzyby i teraz go znalazłem', 'intent.hypothermia.exposure_time');

  // Objawy (dreszcze, zachowanie, mowa)
  nlp.addDocument('pl', 'cały się trzęsie i nie może ustać na nogach', 'intent.hypothermia.symptoms');
  nlp.addDocument('pl', 'przestał mieć dreszcze mimo że jest mu zimno', 'intent.hypothermia.symptoms');
  nlp.addDocument('pl', 'jest splątany i mówi bardzo niewyraźnie', 'intent.hypothermia.symptoms');
  nlp.addDocument('pl', 'jest bardzo agresywny i pobudzony', 'intent.hypothermia.symptoms');

  // Ból i oddech
  nlp.addDocument('pl', 'skarży się na silny ból w klatce piersiowej', 'intent.hypothermia.vitals');
  nlp.addDocument('pl', 'ma duszność i ciężko mu się oddycha', 'intent.hypothermia.vitals');
  nlp.addDocument('pl', 'oddycha bardzo szybko i płytko', 'intent.hypothermia.vitals');

  // Odmrożenia i skóra
  nlp.addDocument('pl', 'palce u rąk są zupełnie białe i sztywne', 'intent.hypothermia.skin');
  nlp.addDocument('pl', 'ma sine palce i nos', 'intent.hypothermia.skin');
  nlp.addDocument('pl', 'skóra na nogach jest twarda jak lód', 'intent.hypothermia.skin');

  /** Scenariusz: Paraliż, bełkotliwa mowa
   * ===========================
   * --- INTENCJE DOT. UDARU ---
   * ===========================
   **/ 

  // Zgłoszenie paraliżu/bełkotu
  nlp.addDocument('pl', 'osoba poszkodowana nagle zaczęła dziwnie mówić i bełkotać', 'intent.paralysis.report');
  nlp.addDocument('pl', 'ma trudności z wypowiedzeniem słowa i opadniętą twarz', 'intent.paralysis.report');
  nlp.addDocument('pl', 'nie można go zrozumieć, jakby miał kluchy w buzi', 'intent.paralysis.report');
  nlp.addDocument('pl', 'tata upuścił widelec i nie może ruszyć ręką', 'intent.paralysis.report');

  // Twarz i mowa (FAST - Face/Speech)
  nlp.addDocument('pl', 'tak kącik ust jej zupełnie opadł', 'intent.paralysis.face_speech');
  nlp.addDocument('pl', 'twarz jest niesymetryczna przy uśmiechu', 'intent.paralysis.face_speech');
  nlp.addDocument('pl', 'mówi bardzo niewyraźnie i powoli', 'intent.paralysis.face_speech');
  nlp.addDocument('pl', 'nie może się uśmiechnąć prosto', 'intent.paralysis.face_speech');

  // Ręce i nogi (FAST - Arms)
  nlp.addDocument('pl', 'prawa ręka od razu opada przy próbie podniesienia', 'intent.paralysis.arms');
  nlp.addDocument('pl', 'nie ma w ogóle siły w lewej stronie ciała', 'intent.paralysis.arms');
  nlp.addDocument('pl', 'obie ręce trzymają się na tej samej wysokości', 'intent.paralysis.arms');
  nlp.addDocument('pl', 'nie może podnieść prawej nogi', 'intent.paralysis.arms');

  // Czas wystąpienia (FAST - Time)
  nlp.addDocument('pl', 'to się stało przed chwilą jakieś dziesięć minut temu', 'intent.paralysis.onset_time');
  nlp.addDocument('pl', 'ostatni raz widziałem go zdrowego rano', 'intent.paralysis.onset_time');
  nlp.addDocument('pl', 'trwa to od około godziny', 'intent.paralysis.onset_time');

  // Wizja i ból głowy
  nlp.addDocument('pl', 'mówi że przestała widzieć na jedno oko', 'intent.paralysis.vision_balance');
  nlp.addDocument('pl', 'ma bardzo silny ból głowy i kręci mu się w głowie', 'intent.paralysis.vision_balance');
  nlp.addDocument('pl', 'nie może utrzymać równowagi i zatacza się', 'intent.paralysis.vision_balance');

  // Historia i cukrzyca
  nlp.addDocument('pl', 'choruje na cukrzycę i bierze insulinę', 'intent.paralysis.history');
  nlp.addDocument('pl', 'leczy się na nadciśnienie tętnicze', 'intent.paralysis.history');
  nlp.addDocument('pl', 'nie czuć od niego alkoholu', 'intent.paralysis.history');

  /** Scenariusz: Porażenie prądem, piorunem
   * ===============================
   * --- INTENCJE DOT. PORAŻENIA ---
   * ===============================
   **/ 

  // Zgłoszenie
  nlp.addDocument('pl', 'osoba poszkodowana została porażona prądem', 'intent.electrocution.report');
  nlp.addDocument('pl', 'mąż naprawiał gniazdko i nagle go odrzuciło', 'intent.electrocution.report');
  nlp.addDocument('pl', 'piorun uderzył w drzewo obok i kolega upadł', 'intent.electrocution.report');
  nlp.addDocument('pl', 'dziecko włożyło drut do kontaktu', 'intent.electrocution.report');

  // Bezpieczeństwo i odłączenie prądu
  nlp.addDocument('pl', 'wyłączyłem bezpieczniki w całym domu', 'intent.electrocution.safety_confirmed');
  nlp.addDocument('pl', 'wyciągnąłem wtyczkę urządzenia z gniazdka', 'intent.electrocution.safety_confirmed');
  nlp.addDocument('pl', 'prąd jest już odcięty, jest bezpiecznie', 'intent.electrocution.safety_confirmed');

  // Serce i klatka piersiowa
  nlp.addDocument('pl', 'mówi że serce bije mu jak szalone i nierówno', 'intent.electrocution.heart_symptoms');
  nlp.addDocument('pl', 'skarży się na bardzo silny ból w klatce piersiowej', 'intent.electrocution.heart_symptoms');
  nlp.addDocument('pl', 'czuje kołatanie w piersiach', 'intent.electrocution.heart_symptoms');

  // Uraz i neurologia (upadek, czucie)
  nlp.addDocument('pl', 'spadł z drabiny po tym jak go prąd kopnął', 'intent.electrocution.trauma_neuro');
  nlp.addDocument('pl', 'mówi że nie czuje nóg i nie może nimi ruszać', 'intent.electrocution.trauma_neuro');
  nlp.addDocument('pl', 'rusza rękami i nogami normalnie', 'intent.electrocution.trauma_neuro');

  // Oparzenia
  nlp.addDocument('pl', 'ma czarne plamy na dłoniach i na stopach', 'intent.electrocution.burns');
  nlp.addDocument('pl', 'widać spaloną skórę w miejscu gdzie dotknął kabla', 'intent.electrocution.burns');
  nlp.addDocument('pl', 'nie widzę żadnych oparzeń na ciele', 'intent.electrocution.burns');

  /** Scenariusz: Powieszenie, zadzierzgnięcie
   * =================================
   * --- INTENCJE DOT. POWIESZENIA ---
   * =================================
   **/ 

  // Zgłoszenie zdarzenia
  nlp.addDocument('pl', 'znalazłem sąsiada który wisi na sznurze', 'intent.hanging.report');
  nlp.addDocument('pl', 'syn powiesił się na pasku u klamki', 'intent.hanging.report');
  nlp.addDocument('pl', 'ktoś wisi na gałęzi w lesie', 'intent.hanging.report');
  nlp.addDocument('pl', 'doszło do wypadku i pracownik zahaczył kablem o szyję', 'intent.hanging.report');

  // Potwierdzenie odcięcia pętli
  nlp.addDocument('pl', 'tak odcięliśmy ją już i leży na ziemi', 'intent.hanging.cut_confirmed');
  nlp.addDocument('pl', 'pętla jest już zdjęta z szyi', 'intent.hanging.cut_confirmed');
  nlp.addDocument('pl', 'właśnie go zdejmujemy ze sznura', 'intent.hanging.cut_confirmed');

  // Czas zdarzenia
  nlp.addDocument('pl', 'nie wiem jak długo tam jest ale ciało jest sine', 'intent.hanging.time');
  nlp.addDocument('pl', 'widziałam go żywego pół godziny temu', 'intent.hanging.time');
  nlp.addDocument('pl', 'to się stało przed chwilą widzę że jeszcze się rusza', 'intent.hanging.time');
  nlp.addDocument('pl', 'znalazłem go dopiero teraz nie mam pojęcia o czasie', 'intent.hanging.time');

  /** Scenariusz: Problemy kardiologiczne
   * ===============================
   * --- INTENCJE KARDIOLOGICZNE ---
   * ===============================
   **/ 

  // Zgłoszenie
  nlp.addDocument('pl', 'osoba poszkodowana źle się czuje i ma bardzo wysokie ciśnienie', 'intent.cardio.report');
  nlp.addDocument('pl', 'serce jej zaraz wyskoczy z piersi', 'intent.cardio.report');
  nlp.addDocument('pl', 'dziadek czuje się bardzo słabo i ma duszności', 'intent.cardio.report');
  nlp.addDocument('pl', 'mama ma bardzo szybkie tętno i kołatanie serca', 'intent.cardio.report');

  // Ból w klatce
  nlp.addDocument('pl', 'mówi że ją piecze za mostkiem i ból promieniuje do ręki', 'intent.cardio.pain');
  nlp.addDocument('pl', 'czuje silny ucisk w piersiach', 'intent.cardio.pain');
  nlp.addDocument('pl', 'nie skarży się na żaden ból w klatce', 'intent.cardio.pain');

  // Skóra i sinica
  nlp.addDocument('pl', 'ma fioletowe usta i jest cała blada', 'intent.cardio.skin');
  nlp.addDocument('pl', 'jest zalany zimnym potem i bardzo się poci', 'intent.cardio.skin');
  nlp.addDocument('pl', 'skóra wygląda normalnie', 'intent.cardio.skin');

  // Obrzęki
  nlp.addDocument('pl', 'nogi są bardzo spuchnięte w kostkach', 'intent.cardio.edema');
  nlp.addDocument('pl', 'ma ogromne obrzęki na łydkach', 'intent.cardio.edema');
  nlp.addDocument('pl', 'nie ma żadnej opuchlizny na nogach', 'intent.cardio.edema');

  // Historia i rozrusznik
  nlp.addDocument('pl', 'ma wszczepiony rozrusznik serca', 'intent.cardio.history');
  nlp.addDocument('pl', 'jest po zawale dwa lata temu', 'intent.cardio.history');
  nlp.addDocument('pl', 'leczy się na nadciśnienie i niewydolność serca', 'intent.cardio.history');

  // Wartości pomiarów
  nlp.addDocument('pl', 'ciśnienie wynosi dwieście na sto dziesięć', 'intent.cardio.vitals');
  nlp.addDocument('pl', 'ma puls ponad sto czterdzieści uderzeń na minutę', 'intent.cardio.vitals');
  nlp.addDocument('pl', 'nie mamy jak zmierzyć ciśnienia', 'intent.cardio.vitals');

  await nlp.train();
  return nlp;
}