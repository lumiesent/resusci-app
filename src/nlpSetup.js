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

  // Potwierdzenia ogólne (dla wszystkich pytań tak/nie)
  nlp.addDocument('pl', 'Tak', 'intent.confirm.yes');
  nlp.addDocument('pl', 'TAK', 'intent.confirm.yes');
  nlp.addDocument('pl', 'Nie', 'intent.confirm.no');
  nlp.addDocument('pl', 'NIE', 'intent.confirm.no');

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

  /** Scenariusz: Urazy, obrażenia
   * ========================
   * --- INTENCJE URAZOWE ---
   * ========================
   **/ 

  // Zgłoszenie
  nlp.addDocument('pl', 'doszło do wypadku mężczyzna spadł z drugiego piętra', 'intent.trauma.report'); // 
  nlp.addDocument('pl', 'samochód potrącił rowerzystę na skrzyżowaniu', 'intent.trauma.report'); // [cite: 39]
  nlp.addDocument('pl', 'kolega nadział się udem na metalowy pręt', 'intent.trauma.report'); // 
  nlp.addDocument('pl', 'pracownik w warsztacie odciął sobie palce piłą', 'intent.trauma.report'); // [cite: 40]

  // Bezpieczeństwo
  nlp.addDocument('pl', 'miejsce jest bezpieczne, maszyny wyłączone', 'intent.trauma.safety_confirmed');
  nlp.addDocument('pl', 'zabezpieczyliśmy auto trójkątem, nic się nie pali', 'intent.trauma.safety_confirmed');

  // Szczegóły urazu
  nlp.addDocument('pl', 'ma głęboką ranę ciętą na przedramieniu', 'intent.trauma.injury_info'); // 
  nlp.addDocument('pl', 'pręt tkwi głęboko w nogdze i wystaje', 'intent.trauma.injury_info'); // 
  nlp.addDocument('pl', 'ma uraz kręgosłupa i nie może się ruszać', 'intent.trauma.injury_info'); // [cite: 36]

  // Amputacja
  nlp.addDocument('pl', 'odcięło mu dwa palce u dłoni', 'intent.trauma.amputation'); // [cite: 40, 47]
  nlp.addDocument('pl', 'maszyna urwała mu rękę w nadgarstku', 'intent.trauma.amputation');

  // Krwawienie
  nlp.addDocument('pl', 'krew tryska pod bardzo dużym ciśnieniem', 'intent.trauma.bleeding'); // [cite: 39, 48]
  nlp.addDocument('pl', 'całe spodnie są już czerwone od krwi', 'intent.trauma.bleeding');
  nlp.addDocument('pl', 'nie widać żadnego dużego krwawienia', 'intent.trauma.no_bleeding');

  // Neurologia
  nlp.addDocument('pl', 'nie czuje nóg i mówi że mu drętwieją ręce', 'intent.trauma.neuro');
  nlp.addDocument('pl', 'może normalnie ruszać wszystkimi kończynami', 'intent.trauma.neuro');

  /** Scenariusz: Nagłe Zatrzymanie Krążenia (NZK)
   * =======================================
   * --- INTENCJE DOT. NZK (ZATRZYMANIA) ---
   * =======================================
   **/ 

  // --- ZGŁOSZENIA POCZĄTKOWE (Rozgałęzienie intencji) ---

  // 1. Niepewna Intencja (Ktoś leży) - intent.cpr.lying
  nlp.addDocument('pl', 'Widzę kogoś na chodniku, chyba zemdlał', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Jakiś gość leży pod ławką w parku', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Na klatce schodowej leży nieznajoma osoba', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Potrzebna pomoc, ktoś upadł na przejściu dla pieszych', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Zauważyłem kobietę leżącą na ziemi w sklepie', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Ktoś tu leży i się nie rusza', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Ktoś leży na ulicy i nie reaguje na nic!', 'intent.cpr.lying');
  nlp.addDocument('pl', 'W łazience znaleźliśmy leżącego kolegę', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Na peronie leży starszy pan', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Człowiek padł na ziemię i tak został', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Widzę nieprzytomną sylwetkę na trawniku', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Ktoś osunął się na ścianę i teraz leży', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Sąsiad leży na wycieraczce pod drzwiami', 'intent.cpr.lying');
  nlp.addDocument('pl', 'W biurze zemdlała koleżanka, leży na podłodze', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Nieznajomy leży twarzą do ziemi przy drodze', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Znalazłem kogoś nieprzytomnego w piwnicy', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Chyba ktoś zasłabł, leży nieruchomo', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Na parkingu leży jakiś mężczyzna', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Kobieta leży na środku chodnika', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Widzę ciało leżące na ziemi w lesie', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Zauważyłem leżącą osobę, muszę sprawdzić co się stało', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Ktoś leży na ziemi', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Mężczyzna osunął się na ziemię', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Widzę osobę leżącą na przystanku', 'intent.cpr.lying');
  nlp.addDocument('pl', 'Pracownik leży bez ruchu w garażu', 'intent.cpr.lying');

  // 2. Niepełna Intencja (Nieprzytomny) - intent.cpr.unconscious
  nlp.addDocument('pl', 'Potrząsam nim, ale nie reaguje', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'On jest nieprzytomny, nic do niego nie dociera', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Wołam go, ale zero reakcji', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Chyba stracił przytomność, jest bez kontaktu', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Leży i nie reaguje na szczypanie ani wołanie', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Zemdlał i nie mogę go dobudzić', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Ona nie kontaktuje, oczy ma zamknięte', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Jest kompletnie nieświadomy tego co się dzieje', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Nie odpowiada na żadne pytania', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Próbuję go ocucić, ale bez skutku', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Mój mąż się nie budzi, jest całkiem wiotki', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Osunęła się i straciła przytomność', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Nie otwiera oczu, kiedy go dotykam', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Jest jak kłoda, zero reakcji na bodźce', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Znalazłem go, jest nieprzytomny i blady', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Nie rusza się i nie mówi, chyba zemdlał', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Ona straciła świadomość, nie wiem co robić', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Głośno krzyczę, ale on nie reaguje', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Jest bez kontaktu, nie czuje bólu', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Przelewa mi się przez ręce, jest nieprzytomny', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Znalazłem nieprzytomnego mężczyznę', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Osoba nie reaguje na głos ani dotyk', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'Zemdlał i nie można go obudzić', 'intent.cpr.unconscious');
  nlp.addDocument('pl', 'On nie reaguje, jest zupełnie wiotki', 'intent.cpr.unconscious');

  // 3. Pełna Intencja (Brak oddechu - Krytyczne) - intent.cpr.not_breathing
  nlp.addDocument('pl', 'Ratunku, on przestał oddychać!', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'On nie dycha, zsiniał na twarzy', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'Klatka się nie rusza, nie czuję powietrza', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'Brak tętna i nie oddycha, szybko!', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'Twarz robi się fioletowa, brak oddechu', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'On charczy i przestaje oddychać', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'Usta mu sinieją, klatka piersiowa stoi', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'Przykładałem ucho, nic nie słychać, nie oddycha', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'To zatrzymanie krążenia, on nie oddycha', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'Zupełny brak oddechu, jest zimny', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'Chyba umiera, przestał łapać powietrze', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'Nie ma oddechu, natychmiastowa pomoc potrzebna', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'Tylko łapie powietrze jak ryba, to nie jest oddech', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'Zero ruchów klatki piersiowej, brak tchu', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'Ona nie oddycha, jest sina na ustach', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'Sprawdziłem, nie ma oddechu przez 10 sekund', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'On nie żyje? Nie oddycha wcale!', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'Jego płuca nie pracują, brak wydechu', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'Nie reaguje i nie pobiera powietrza', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'Potrzebujemy defibrylatora, on nie oddycha', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'Mój mąż nagle upadł, nie oddycha i sinieje na twarzy', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'Klatka piersiowa się nie unosi, on nie oddycha', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'Jest siny i nie łapie powietrza', 'intent.cpr.not_breathing');
  nlp.addDocument('pl', 'Nie czuć oddechu, klatka piersiowa stoi w miejscu', 'intent.cpr.not_breathing');

  // --- BEZPIECZEŃSTWO ---

  // 1. Jest bezpiecznie, nie ma zagrożeń - intent.safe
  nlp.addDocument('pl', 'Wokół jest czysto i bezpiecznie', 'intent.safe');
  nlp.addDocument('pl', 'Mogę podejść, nic mi nie grozi', 'intent.safe');
  nlp.addDocument('pl', 'Teren jest zabezpieczony', 'intent.safe');
  nlp.addDocument('pl', 'Nie widzę żadnych kabli ani ognia', 'intent.safe');
  nlp.addDocument('pl', 'Jestem w bezpiecznym miejscu', 'intent.safe');
  nlp.addDocument('pl', 'Nic nam tu nie zagraża', 'intent.safe');
  nlp.addDocument('pl', 'Tak, tu jest spokojnie', 'intent.safe');
  nlp.addDocument('pl', 'Wszystko pod kontrolą, jest bezpiecznie', 'intent.safe');
  nlp.addDocument('pl', 'Okolica wygląda na bezpieczną', 'intent.safe');
  nlp.addDocument('pl', 'Nie ma ruchu aut, jest ok', 'intent.safe');
  nlp.addDocument('pl', 'Mogę bez obaw udzielać pomocy', 'intent.safe');
  nlp.addDocument('pl', 'Brak widocznych niebezpieczeństw', 'intent.safe');
  nlp.addDocument('pl', 'Miejsce zdarzenia jest stabilne', 'intent.safe');
  nlp.addDocument('pl', 'Tak, nikt nas nie zaatakuje', 'intent.safe');
  nlp.addDocument('pl', 'W porządku, nie ma gazu ani dymu', 'intent.safe');
  nlp.addDocument('pl', 'Jest bezpiecznie, ludzie pomagają', 'intent.safe');
  nlp.addDocument('pl', 'Obszar jest wolny od zagrożeń', 'intent.safe');
  nlp.addDocument('pl', 'Tak, droga jest pusta, bezpiecznie', 'intent.safe');
  nlp.addDocument('pl', 'Brak ryzyka wybuchu czy pożaru', 'intent.safe');
  nlp.addDocument('pl', 'Opanowałem sytuację, jest bezpiecznie', 'intent.safe');
  nlp.addDocument('pl', 'Tak, jest bezpiecznie', 'intent.safe');
  nlp.addDocument('pl', 'Nie ma żadnego zagrożenia', 'intent.safe');

  // 2. Jest niebezpiecznie - intent.unsafe
  nlp.addDocument('pl', 'Widzę dym, chyba coś się pali', 'intent.unsafe');
  nlp.addDocument('pl', 'Uwaga, rozlane paliwo na ziemi', 'intent.unsafe');
  nlp.addDocument('pl', 'Jest tu agresywny pies, boję się podejść', 'intent.unsafe');
  nlp.addDocument('pl', 'Wszędzie jest pełno szkła i ostrych krawędzi', 'intent.unsafe');
  nlp.addDocument('pl', 'On leży w kałuży, a obok są przewody elektryczne', 'intent.unsafe');
  nlp.addDocument('pl', 'Pachnie benzyną i spalenizną', 'intent.unsafe');
  nlp.addDocument('pl', 'To środek ruchliwej ulicy, samochody pędzą', 'intent.unsafe');
  nlp.addDocument('pl', 'Osoba jest agresywna i ma nóż', 'intent.unsafe');
  nlp.addDocument('pl', 'Ściana budynku grozi zawaleniem', 'intent.unsafe');
  nlp.addDocument('pl', 'Jest tu bardzo ślisko, wyciek substancji chemicznej', 'intent.unsafe');
  nlp.addDocument('pl', 'Czuć wyraźnie gaz w całym pomieszczeniu', 'intent.unsafe');
  nlp.addDocument('pl', 'Wybuchł pożar w rogu pokoju', 'intent.unsafe');
  nlp.addDocument('pl', 'Tłum ludzi napiera, jest niebezpiecznie', 'intent.unsafe');
  nlp.addDocument('pl', 'Zauważyłem iskrzące kable nad poszkodowanym', 'intent.unsafe');
  nlp.addDocument('pl', 'Woda zalewa pomieszczenie, grozi porażeniem', 'intent.unsafe');
  nlp.addDocument('pl', 'On trzyma coś niebezpiecznego w ręku', 'intent.unsafe');
  nlp.addDocument('pl', 'Widzę ogień wydostający się spod maski auta', 'intent.unsafe');
  nlp.addDocument('pl', 'Sufit pęka, musimy uciekać', 'intent.unsafe');
  nlp.addDocument('pl', 'Jest ciemno i nie widzę co leży na ziemi', 'intent.unsafe');
  nlp.addDocument('pl', 'Okolica jest niebezpieczna, słychać strzały', 'intent.unsafe');
  nlp.addDocument('pl', 'Jest tu niebezpiecznie, czuć gaz', 'intent.unsafe');
  nlp.addDocument('pl', 'W garażu pracował silnik auta, boję się wejść', 'intent.unsafe');
  nlp.addDocument('pl', 'Został porażony prądem, kable są na ziemi', 'intent.unsafe');

  // --- WYWIAD MEDYCZNY ---

  // 1. Świadomość i kontakt - intent.conscious
  nlp.addDocument('pl', 'Tak, osoba jest przytomna', 'intent.conscious');
  nlp.addDocument('pl', 'Otworzył oczy i coś mówi', 'intent.conscious');
  nlp.addDocument('pl', 'Poszkodowany zaczął do mnie mówić', 'intent.conscious');
  nlp.addDocument('pl', 'Otworzył oczy i reaguje na ból', 'intent.conscious');
  nlp.addDocument('pl', 'Tak, on się ocknął', 'intent.conscious');
  nlp.addDocument('pl', 'Wróciła mu przytomność', 'intent.conscious');
  nlp.addDocument('pl', 'Wiedział jak się nazywa, kontaktuje', 'intent.conscious');
  nlp.addDocument('pl', 'Ścisnął moją rękę, gdy go o to poprosiłem', 'intent.conscious');
  nlp.addDocument('pl', 'Jest przytomny, ale bardzo osłabiony', 'intent.conscious');
  nlp.addDocument('pl', 'Odzyskał świadomość przed chwilą', 'intent.conscious');
  nlp.addDocument('pl', 'Patrzy na mnie i kiwa głową', 'intent.conscious');
  nlp.addDocument('pl', 'Można z nim normalnie porozmawiać', 'intent.conscious');
  nlp.addDocument('pl', 'Tak, reaguje na dotyk i dźwięk', 'intent.conscious');
  nlp.addDocument('pl', 'Ocknęła się i pyta co się stało', 'intent.conscious');
  nlp.addDocument('pl', 'Ona jest świadoma, pamieta wypadek', 'intent.conscious');
  nlp.addDocument('pl', 'Ma otwarte oczy i wodzi nimi za mną', 'intent.conscious');
  nlp.addDocument('pl', 'Tak, wybudził się z omdlenia', 'intent.conscious');
  nlp.addDocument('pl', 'Jęczy i próbuje usiąść, jest przytomny', 'intent.conscious');
  nlp.addDocument('pl', 'Słyszy mnie i odpowiada półsłówkami', 'intent.conscious');
  nlp.addDocument('pl', 'Jego stan się poprawił, odzyskał przytomność', 'intent.conscious');
  nlp.addDocument('pl', 'Tak, nawiązałem z nim kontakt', 'intent.conscious');
  nlp.addDocument('pl', 'Próbuje coś powiedzieć, jest świadomy', 'intent.conscious');

  // 2. Nieprzytomność i brak kontaktu - intent.unconscious
  nlp.addDocument('pl', 'Cały czas jest nieprzytomny', 'intent.unconscious');
  nlp.addDocument('pl', 'W ogóle nie reaguje na moje wołanie', 'intent.unconscious');
  nlp.addDocument('pl', 'Nie reaguje na nic, boże on chyba nie żyje!', 'intent.unconscious');
  nlp.addDocument('pl', 'Nie, zero kontaktu z tą osobą', 'intent.unconscious');
  nlp.addDocument('pl', 'Wciąż nie odzyskał świadomości', 'intent.unconscious');
  nlp.addDocument('pl', 'Nie otwiera oczu, mimo że go szarpię', 'intent.unconscious');
  nlp.addDocument('pl', 'Brak jakiejkolwiek reakcji na bodźce', 'intent.unconscious');
  nlp.addDocument('pl', 'Ona śpi i nie da się jej obudzić', 'intent.unconscious');
  nlp.addDocument('pl', 'Dalej jest wiotki i nieprzytomny', 'intent.unconscious');
  nlp.addDocument('pl', 'Nie ma z nim żadnego kontaktu', 'intent.unconscious');
  nlp.addDocument('pl', 'Próbuję go ocucić, ale nic to nie daje', 'intent.unconscious');
  nlp.addDocument('pl', 'Leży bezwładnie i nie odpowiada', 'intent.unconscious');
  nlp.addDocument('pl', 'Stan nieprzytomności się utrzymuje', 'intent.unconscious');
  nlp.addDocument('pl', 'Zupełny brak reakcji na głos', 'intent.unconscious');
  nlp.addDocument('pl', 'On jest w głębokiej śpiączce, nie reaguje', 'intent.unconscious');
  nlp.addDocument('pl', 'Nadal nie kontaktuje ze światem', 'intent.unconscious');
  nlp.addDocument('pl', 'Oczy zamknięte, ciało bezwładne', 'intent.unconscious');
  nlp.addDocument('pl', 'Nic do niego nie dociera, jest nieprzytomny', 'intent.unconscious');
  nlp.addDocument('pl', 'Nie, w ogóle się nie rusza', 'intent.unconscious');
  nlp.addDocument('pl', 'Niestety, jest zupełnie nieświadomy', 'intent.unconscious');
  nlp.addDocument('pl', 'Zero odzewu z jego strony', 'intent.unconscious');
  nlp.addDocument('pl', 'Nie, jest zupełnie nieprzytomny', 'intent.unconscious');

  // 3. Oddycha - intent.breathing
  nlp.addDocument('pl', 'Tak, wyczuwam regularny oddech', 'intent.breathing');
  nlp.addDocument('pl', 'Klatka piersiowa unosi się prawidłowo', 'intent.breathing');
  nlp.addDocument('pl', 'Widzę, że oddycha', 'intent.breathing');
  nlp.addDocument('pl', 'Tak, oddech jest zachowany', 'intent.breathing');
  nlp.addDocument('pl', 'Słyszę jak nabiera powietrza', 'intent.breathing');
  nlp.addDocument('pl', 'Oddycha, ale bardzo płytko', 'intent.breathing');
  nlp.addDocument('pl', 'Jego płuca pracują', 'intent.breathing');
  nlp.addDocument('pl', 'Czuć powiew powietrza z nosa', 'intent.breathing');
  nlp.addDocument('pl', 'Tak, oddycha spokojnie', 'intent.breathing');
  nlp.addDocument('pl', 'Ma miarowy, prawidłowy oddech', 'intent.breathing');
  nlp.addDocument('pl', 'Sprawdziłem, oddech jest obecny', 'intent.breathing');
  nlp.addDocument('pl', 'Klatka rusza się w górę i w dół', 'intent.breathing');
  nlp.addDocument('pl', 'Czuję jego oddech na dłoni', 'intent.breathing');
  nlp.addDocument('pl', 'Tak, bierze wdechy', 'intent.breathing');
  nlp.addDocument('pl', 'Lustro zaparowało, więc oddycha', 'intent.breathing');
  nlp.addDocument('pl', 'Pobiera powietrze regularnie', 'intent.breathing');
  nlp.addDocument('pl', 'Tak, oddycha, choć rzęzi', 'intent.breathing');
  nlp.addDocument('pl', 'Widzę ruchy klatki piersiowej', 'intent.breathing');
  nlp.addDocument('pl', 'Ona oddycha, widzę to wyraźnie', 'intent.breathing');
  nlp.addDocument('pl', 'Tak, tętno i oddech są', 'intent.breathing');
  nlp.addDocument('pl', 'Tak, oddycha normalnie', 'intent.breathing');
  nlp.addDocument('pl', 'Czuję oddech na swoim policzku', 'intent.breathing');

  // 4. Brak oddechu - intent.no_breathing
  nlp.addDocument('pl', 'Nie, ona w ogóle nie oddycha', 'intent.no_breathing');
  nlp.addDocument('pl', 'Klatka piersiowa stoi nieruchomo', 'intent.no_breathing');
  nlp.addDocument('pl', 'Brak jakiegokolwiek ruchu powietrza', 'intent.no_breathing');
  nlp.addDocument('pl', 'Nie słyszę oddechu, nic a nic', 'intent.no_breathing');
  nlp.addDocument('pl', 'On nie bierze tchu', 'intent.no_breathing');
  nlp.addDocument('pl', 'To bezdech, on nie oddycha', 'intent.no_breathing');
  nlp.addDocument('pl', 'Nie wyczuwam tętna ani oddechu', 'intent.no_breathing');
  nlp.addDocument('pl', 'Jej płuca nie pracują', 'intent.no_breathing');
  nlp.addDocument('pl', 'Zero oddechu przez ostatnie 10 sekund', 'intent.no_breathing');
  nlp.addDocument('pl', 'On już nie oddycha, ratujcie go', 'intent.no_breathing');
  nlp.addDocument('pl', 'Nie ma żadnych ruchów klatki', 'intent.no_breathing');
  nlp.addDocument('pl', 'Nie czuję powietrza przy ustach', 'intent.no_breathing');
  nlp.addDocument('pl', 'Oddech ustał całkowicie', 'intent.no_breathing');
  nlp.addDocument('pl', 'Płuca stanęły, on nie oddycha', 'intent.no_breathing');
  nlp.addDocument('pl', 'Nie, oddech jest niewyczuwalny', 'intent.no_breathing');
  nlp.addDocument('pl', 'Ciało sztywnieje, brak oddechu', 'intent.no_breathing');
  nlp.addDocument('pl', 'Nic nie czuję na policzku, nie oddycha', 'intent.no_breathing');
  nlp.addDocument('pl', 'Nie dycha, zrób coś!', 'intent.no_breathing');
  nlp.addDocument('pl', 'Brak funkcji oddechowych', 'intent.no_breathing');
  nlp.addDocument('pl', 'Niestety, oddech się zatrzymał', 'intent.no_breathing');
  nlp.addDocument('pl', 'Nie, nie oddycha', 'intent.no_breathing');
  nlp.addDocument('pl', 'Brak oddechu, nic nie czuję', 'intent.no_breathing');

  // --- LOGIKA AED ---

  // 1. AED jest dostępny i przy poszkodowanym - intent.aed.here
  nlp.addDocument('pl', 'Mam defibrylator już przy sobie', 'intent.aed.here');
  nlp.addDocument('pl', 'AED jest rozpakowane obok pacjenta', 'intent.aed.here');
  nlp.addDocument('pl', 'Skrzynka z AED leży tuż obok mnie', 'intent.aed.here');
  nlp.addDocument('pl', 'Przynieśli mi AED, mam je', 'intent.aed.here');
  nlp.addDocument('pl', 'Urządzenie jest gotowe do użycia tutaj', 'intent.aed.here');
  nlp.addDocument('pl', 'Trzymam defibrylator w rękach', 'intent.aed.here');
  nlp.addDocument('pl', 'AED jest już na miejscu zdarzenia', 'intent.aed.here');
  nlp.addDocument('pl', 'Mam sprzęt pod ręką', 'intent.aed.here');
  nlp.addDocument('pl', 'Defibrylator dotarł do nas', 'intent.aed.here');
  nlp.addDocument('pl', 'Udało się przynieść AED do chorego', 'intent.aed.here');
  nlp.addDocument('pl', 'Maszyna jest gotowa obok niego', 'intent.aed.here');
  nlp.addDocument('pl', 'Oto AED, mamy je', 'intent.aed.here');
  nlp.addDocument('pl', 'Urządzenie stoi przy głowie poszkodowanego', 'intent.aed.here');
  nlp.addDocument('pl', 'Mam AED, otwieram je', 'intent.aed.here');
  nlp.addDocument('pl', 'Właśnie kładę AED obok niego', 'intent.aed.here');
  nlp.addDocument('pl', 'Otrzymałem defibrylator, jest tutaj', 'intent.aed.here');
  nlp.addDocument('pl', 'Posiadamy AED na miejscu akcji', 'intent.aed.here');
  nlp.addDocument('pl', 'Sprzęt jest już obecny', 'intent.aed.here');
  nlp.addDocument('pl', 'AED jest dostarczone do pacjenta', 'intent.aed.here');
  nlp.addDocument('pl', 'Tak, defibrylator jest obok', 'intent.aed.here');
  nlp.addDocument('pl', 'Mamy AED na miejscu', 'intent.aed.here');
  nlp.addDocument('pl', 'Defibrylator jest już przy mnie', 'intent.aed.here');

  // 2. Ktoś poszedł po AED, ale jeszcze nie wrócił - intent.aed.someone_went
  nlp.addDocument('pl', 'Czekamy, aż ktoś wróci z defibrylatorem', 'intent.aed.someone_went');
  nlp.addDocument('pl', 'Wysłaliśmy kogoś do recepcji po AED', 'intent.aed.someone_went');
  nlp.addDocument('pl', 'Pomocnik pobiegł szukać urządzenia', 'intent.aed.someone_went');
  nlp.addDocument('pl', 'On jeszcze nie wrócił ze sprzętem', 'intent.aed.someone_went');
  nlp.addDocument('pl', 'Ktoś pobiegł po AED, czekam na nich', 'intent.aed.someone_went');
  nlp.addDocument('pl', 'Szukają teraz defibrylatora w budynku', 'intent.aed.someone_went');
  nlp.addDocument('pl', 'Kolega poszedł po maszynę na dół', 'intent.aed.someone_went');
  nlp.addDocument('pl', 'Wciąż czekam na dostarczenie AED', 'intent.aed.someone_went');
  nlp.addDocument('pl', 'Pobiegli po to, zaraz powinni być', 'intent.aed.someone_went');
  nlp.addDocument('pl', 'Wysłannik jest w drodze po defibrylator', 'intent.aed.someone_went');
  nlp.addDocument('pl', 'Ktoś szuka skrzynki z AED', 'intent.aed.someone_went');
  nlp.addDocument('pl', 'Zaraz ktoś tu przyniesie AED', 'intent.aed.someone_went');
  nlp.addDocument('pl', 'Osoba trzecia pobiegła po pomoc medyczną i sprzęt', 'intent.aed.someone_went');
  nlp.addDocument('pl', 'Czekamy na powrót osoby z AED', 'intent.aed.someone_went');
  nlp.addDocument('pl', 'On poszedł to sprawdzić, czy jest AED', 'intent.aed.someone_went');
  nlp.addDocument('pl', 'Ktoś się oddalił, żeby przynieść defibrylator', 'intent.aed.someone_went');
  nlp.addDocument('pl', 'Pobiegli po AED do ochrony', 'intent.aed.someone_went');
  nlp.addDocument('pl', 'Zaraz będzie tu sprzęt, ktoś po niego poleciał', 'intent.aed.someone_went');
  nlp.addDocument('pl', 'Czekamy na urządzenie, kolega po nie poszedł', 'intent.aed.someone_went');
  nlp.addDocument('pl', 'Ochoniarz poszedł przynieść defibrylator', 'intent.aed.someone_went');

  // 3. AED jest dostępny, ale nie przy poszkodowanym - intent.aed.know_where
  nlp.addDocument('pl', 'AED wisi na ścianie w korytarzu', 'intent.aed.know_where');
  nlp.addDocument('pl', 'Wiem, że defibrylator jest w portierni', 'intent.aed.know_where');
  nlp.addDocument('pl', 'Widzę stąd szafkę z AED', 'intent.aed.know_where');
  nlp.addDocument('pl', 'Urządzenie jest dostępne przy wejściu', 'intent.aed.know_where');
  nlp.addDocument('pl', 'Tam na dole wisi defibrylator', 'intent.aed.know_where');
  nlp.addDocument('pl', 'W tym biurze zawsze jest AED', 'intent.aed.know_where');
  nlp.addDocument('pl', 'Znam lokalizację najbliższego AED', 'intent.aed.know_where');
  nlp.addDocument('pl', 'Wiem gdzie to jest, przy windach', 'intent.aed.know_where');
  nlp.addDocument('pl', 'Defibrylator znajduje się w holu głównym', 'intent.aed.know_where');
  nlp.addDocument('pl', 'Tak, widziałem tabliczkę z AED', 'intent.aed.know_where');
  nlp.addDocument('pl', 'Urządzenie jest w zasięgu wzroku w recepcji', 'intent.aed.know_where');
  nlp.addDocument('pl', 'Szafka z AED jest naprzeciwko kasy', 'intent.aed.know_where');
  nlp.addDocument('pl', 'Zauważyłem defibrylator przy automacie', 'intent.aed.know_where');
  nlp.addDocument('pl', 'AED jest na zewnątrz budynku', 'intent.aed.know_where');
  nlp.addDocument('pl', 'Wiem gdzie to wisi, w strefie obsługi', 'intent.aed.know_where');
  nlp.addDocument('pl', 'Tam przy schodach jest zielona skrzynka AED', 'intent.aed.know_where');
  nlp.addDocument('pl', 'Lokalizacja AED jest mi znana', 'intent.aed.know_where');
  nlp.addDocument('pl', 'Tak, widzę defibrylator przy bramkach', 'intent.aed.know_where');
  nlp.addDocument('pl', 'Maszyna jest w pokoju socjalnym', 'intent.aed.know_where');
  nlp.addDocument('pl', 'Wiem, że w tym budynku jest AED', 'intent.aed.know_where');

  // 4. Brak AED - intent.aed.none
  nlp.addDocument('pl', 'Tu nie ma żadnego defibrylatora', 'intent.aed.none');
  nlp.addDocument('pl', 'Nigdzie nie widzę AED', 'intent.aed.none');
  nlp.addDocument('pl', 'Nie mamy dostępu do sprzętu medycznego', 'intent.aed.none');
  nlp.addDocument('pl', 'W tej okolicy nie ma defibrylatora', 'intent.aed.none');
  nlp.addDocument('pl', 'Brak urządzenia AED w pobliżu', 'intent.aed.none');
  nlp.addDocument('pl', 'Nie posiadamy tu defibrylatora', 'intent.aed.none');
  nlp.addDocument('pl', 'Niestety, tu nie ma AED', 'intent.aed.none');
  nlp.addDocument('pl', 'Szukaliśmy, ale nie znaleźliśmy defibrylatora', 'intent.aed.none');
  nlp.addDocument('pl', 'To prywatny dom, nie ma tu AED', 'intent.aed.none');
  nlp.addDocument('pl', 'W tym sklepie nie wisi żadne urządzenie', 'intent.aed.none');
  nlp.addDocument('pl', 'Nie ma tu takiego sprzętu', 'intent.aed.none');
  nlp.addDocument('pl', 'Jesteśmy w szczerym polu, brak AED', 'intent.aed.none');
  nlp.addDocument('pl', 'Nikt nie ma defibrylatora', 'intent.aed.none');
  nlp.addDocument('pl', 'Brak aparatury do reanimacji', 'intent.aed.none');
  nlp.addDocument('pl', 'W całym budynku nie ma AED', 'intent.aed.none');
  nlp.addDocument('pl', 'Nie mam pod ręką żadnego urządzenia', 'intent.aed.none');
  nlp.addDocument('pl', 'Defibrylatora brak', 'intent.aed.none');
  nlp.addDocument('pl', 'Nie, tu nie znajdziemy AED', 'intent.aed.none');
  nlp.addDocument('pl', 'W tej fabryce zapomnieli o AED', 'intent.aed.none');
  nlp.addDocument('pl', 'Nie ma opcji, żeby tu był defibrylator', 'intent.aed.none');

  // 5. Ktoś został posłany po AED - intent.aed.someone_sent
  nlp.addDocument('pl', 'Wysłałem właśnie kogoś po sprzęt', 'intent.aed.someone_sent');
  nlp.addDocument('pl', 'Poprosiłem przechodnia o przyniesienie AED', 'intent.aed.someone_sent');
  nlp.addDocument('pl', 'Ktoś już leci po defibrylator', 'intent.aed.someone_sent');
  nlp.addDocument('pl', 'Zadysponowałem osobę do szukania AED', 'intent.aed.someone_sent');
  nlp.addDocument('pl', 'Posłałem syna do straży po AED', 'intent.aed.someone_sent');
  nlp.addDocument('pl', 'Nakazałem przynieść urządzenie', 'intent.aed.someone_sent');
  nlp.addDocument('pl', 'Ktoś z pracowników już po to pobiegł', 'intent.aed.someone_sent');
  nlp.addDocument('pl', 'Delegowałem kogoś do odnalezienia AED', 'intent.aed.someone_sent');
  nlp.addDocument('pl', 'Już wysyłam kogoś po maszynę', 'intent.aed.someone_sent');
  nlp.addDocument('pl', 'Ochroniarz został wysłany po defibrylator', 'intent.aed.someone_sent');
  nlp.addDocument('pl', 'Kazałem mu biec po AED', 'intent.aed.someone_sent');
  nlp.addDocument('pl', 'Właśnie posłałem ludzi po sprzęt medyczny', 'intent.aed.someone_sent');
  nlp.addDocument('pl', 'Zaraz ktoś dostarczy AED, poszli po nie', 'intent.aed.someone_sent');
  nlp.addDocument('pl', 'Wysłałem sąsiada po AED do apteki', 'intent.aed.someone_sent');
  nlp.addDocument('pl', 'Ktoś już został oddelegowany po AED', 'intent.aed.someone_sent');
  nlp.addDocument('pl', 'Poprosiłem ich, żeby znaleźli AED', 'intent.aed.someone_sent');
  nlp.addDocument('pl', 'Posłałem kolegę, żeby przyniósł skrzynkę', 'intent.aed.someone_sent');
  nlp.addDocument('pl', 'Już biegną po defibrylator', 'intent.aed.someone_sent');
  nlp.addDocument('pl', 'Ktoś poszedł sprawdzić, czy jest AED przy bramie', 'intent.aed.someone_sent');
  nlp.addDocument('pl', 'Wydałem polecenie przyniesienia AED', 'intent.aed.someone_sent');

  // 6. Jestem sam, nie mam kogo wysłać - intent.aed.alone
  nlp.addDocument('pl', 'Jestem tu zupełnie sam', 'intent.aed.alone');
  nlp.addDocument('pl', 'Nie mam kogo wysłać po urządzenie', 'intent.aed.alone');
  nlp.addDocument('pl', 'Brak osób trzecich, które mogłyby pomóc', 'intent.aed.alone');
  nlp.addDocument('pl', 'Jestem tylko ja i poszkodowany', 'intent.aed.alone');
  nlp.addDocument('pl', 'Nikt inny nie widzi tego zdarzenia', 'intent.aed.alone');
  nlp.addDocument('pl', 'Nie ma nikogo, kogo mógłbym poprosić o pomoc', 'intent.aed.alone');
  nlp.addDocument('pl', 'Sam muszę wszystko robić', 'intent.aed.alone');
  nlp.addDocument('pl', 'W okolicy nie ma żywej duszy', 'intent.aed.alone');
  nlp.addDocument('pl', 'Nie mam pomocnika przy sobie', 'intent.aed.alone');
  nlp.addDocument('pl', 'Jestem jedynym świadkiem', 'intent.aed.alone');
  nlp.addDocument('pl', 'Pustki, nikogo nie ma w pobliżu', 'intent.aed.alone');
  nlp.addDocument('pl', 'Nie mogę odejść od pacjenta, a jestem sam', 'intent.aed.alone');
  nlp.addDocument('pl', 'Samotnie udzielam pomocy', 'intent.aed.alone');
  nlp.addDocument('pl', 'Nie mam kogo poprosić o przyniesienie AED', 'intent.aed.alone');
  nlp.addDocument('pl', 'Nikogo nie widzę na ulicy', 'intent.aed.alone');
  nlp.addDocument('pl', 'Jestem zdany tylko na siebie', 'intent.aed.alone');
  nlp.addDocument('pl', 'Brak kogokolwiek do pomocy', 'intent.aed.alone');
  nlp.addDocument('pl', 'Nikt mi nie pomoże przynieść sprzętu', 'intent.aed.alone');
  nlp.addDocument('pl', 'Jestem sam w tym pomieszczeniu', 'intent.aed.alone');
  nlp.addDocument('pl', 'W pojedynkę nic nie zdziałam z AED', 'intent.aed.alone');

  // 7. AED jest daleko - intent.aed.far
  nlp.addDocument('pl', 'Defibrylator jest na drugim końcu osiedla', 'intent.aed.far');
  nlp.addDocument('pl', 'AED wisi kilometr stąd', 'intent.aed.far');
  nlp.addDocument('pl', 'To zbyt daleko, żeby po to biec', 'intent.aed.far');
  nlp.addDocument('pl', 'Najbliższy sprzęt jest na stacji benzynowej daleko stąd', 'intent.aed.far');
  nlp.addDocument('pl', 'AED znajduje się w innej dzielnicy', 'intent.aed.far');
  nlp.addDocument('pl', 'Urządzenie jest zbyt oddalone', 'intent.aed.far');
  nlp.addDocument('pl', 'Zanim tam dojdę, minie wieczność', 'intent.aed.far');
  nlp.addDocument('pl', 'To jest kawał drogi stąd', 'intent.aed.far');
  nlp.addDocument('pl', 'Za daleko na pieszą wyprawę po AED', 'intent.aed.far');
  nlp.addDocument('pl', 'Defibrylator jest w budynku oddalonym o 10 minut', 'intent.aed.far');
  nlp.addDocument('pl', 'Dystans do AED jest zbyt duży', 'intent.aed.far');
  nlp.addDocument('pl', 'Nie zdążę przynieść tego na czas, to za daleko', 'intent.aed.far');
  nlp.addDocument('pl', 'Maszyna jest na samej górze biurowca', 'intent.aed.far');
  nlp.addDocument('pl', 'To spory kawałek stąd', 'intent.aed.far');
  nlp.addDocument('pl', 'AED jest nieosiągalne w krótkim czasie', 'intent.aed.far');
  nlp.addDocument('pl', 'Daleko stąd widziałem taki sprzęt', 'intent.aed.far');
  nlp.addDocument('pl', 'Musiałbym jechać autem po to AED', 'intent.aed.far');
  nlp.addDocument('pl', 'To nie jest w bliskim sąsiedztwie', 'intent.aed.far');
  nlp.addDocument('pl', 'Urządzenie jest zbyt daleko od miejsca wypadku', 'intent.aed.far');
  nlp.addDocument('pl', 'AED jest w porcie, a my na plaży, to daleko', 'intent.aed.far');

  // 8. AED jest w pobliżu - intent.aed.near
  nlp.addDocument('pl', 'AED jest tuż za rogiem', 'intent.aed.near');
  nlp.addDocument('pl', 'Defibrylator wisi u sąsiada obok', 'intent.aed.near');
  nlp.addDocument('pl', 'W tym samym korytarzu jest urządzenie', 'intent.aed.near');
  nlp.addDocument('pl', 'To tylko kilka metrów stąd', 'intent.aed.near');
  nlp.addDocument('pl', 'AED znajduje się w tym samym budynku', 'intent.aed.near');
  nlp.addDocument('pl', 'Bardzo blisko jest szafka z AED', 'intent.aed.near');
  nlp.addDocument('pl', 'Na parterze wisi defibrylator, jesteśmy na pierwszym', 'intent.aed.near');
  nlp.addDocument('pl', 'Blisko nas jest apteka z AED', 'intent.aed.near');
  nlp.addDocument('pl', 'To jest na wyciągnięcie ręki w recepcji', 'intent.aed.near');
  nlp.addDocument('pl', 'Widzę tabliczkę AED niedaleko', 'intent.aed.near');
  nlp.addDocument('pl', 'Zaraz obok w sklepie jest defibrylator', 'intent.aed.near');
  nlp.addDocument('pl', 'W zasięgu minuty biegu jest AED', 'intent.aed.near');
  nlp.addDocument('pl', 'To blisko, ktoś może zaraz skoczyć', 'intent.aed.near');
  nlp.addDocument('pl', 'Szafka z AED jest w sąsiednim pokoju', 'intent.aed.near');
  nlp.addDocument('pl', 'Mamy defibrylator na tym piętrze', 'intent.aed.near');
  nlp.addDocument('pl', 'To niedaleko stąd, widzę skrzynkę', 'intent.aed.near');
  nlp.addDocument('pl', 'W hali obok jest AED', 'intent.aed.near');
  nlp.addDocument('pl', 'To rzut beretem, tam wisi AED', 'intent.aed.near');
  nlp.addDocument('pl', 'Bliziutko jest stacja z AED', 'intent.aed.near');
  nlp.addDocument('pl', 'Wiem, że AED jest tuż przy wejściu', 'intent.aed.near');

  // 9. Już wróciłem z AED - intent.aed.back
  nlp.addDocument('pl', 'Mam już defibrylator, właśnie wróciłem', 'intent.aed.back');
  nlp.addDocument('pl', 'Przyniosłem AED, co teraz?', 'intent.aed.back');
  nlp.addDocument('pl', 'Jestem z powrotem ze sprzętem', 'intent.aed.back');
  nlp.addDocument('pl', 'Dostarczyłem defibrylator do poszkodowanego', 'intent.aed.back');
  nlp.addDocument('pl', 'Mam go! Już jestem na miejscu', 'intent.aed.back');
  nlp.addDocument('pl', 'Udało mi się przynieść AED, jestem z powrotem', 'intent.aed.back');
  nlp.addDocument('pl', 'Wróciłem ze skrzynką', 'intent.aed.back');
  nlp.addDocument('pl', 'Mam to urządzenie, jestem obok', 'intent.aed.back');
  nlp.addDocument('pl', 'Oto AED, zdążyłem wrócić', 'intent.aed.back');
  nlp.addDocument('pl', 'Defibrylator już tu jest, wróciłem', 'intent.aed.back');
  nlp.addDocument('pl', 'Właśnie dobiegłem z powrotem z AED', 'intent.aed.back');
  nlp.addDocument('pl', 'Jestem z AED przy pacjencie', 'intent.aed.back');
  nlp.addDocument('pl', 'Przyniesione! Co dalej robić?', 'intent.aed.back');
  nlp.addDocument('pl', 'Już wróciłem z pomocy z defibrylatorem', 'intent.aed.back');
  nlp.addDocument('pl', 'AED jest ze mną, wróciłem szybko', 'intent.aed.back');
  nlp.addDocument('pl', 'Mamy to, wróciłem ze sprzętem', 'intent.aed.back');
  nlp.addDocument('pl', 'Otrzymałem AED i jestem z nim tutaj', 'intent.aed.back');
  nlp.addDocument('pl', 'Wróciłem, kładę defibrylator obok', 'intent.aed.back');
  nlp.addDocument('pl', 'Jestem z powrotem, przyniosłem co trzeba', 'intent.aed.back');
  nlp.addDocument('pl', 'Melduję się z AED na miejscu', 'intent.aed.back');

  // --- RESUSCYTACJA I FEEDBACK ---

  // 1. Feedback o zakończeniu analizy rytmu - intent.cpr.analysis_done
  nlp.addDocument('pl', 'AED powiedziało, że analiza zakończona', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'Skończyło analizować rytm serca', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'Komunikat: analiza zakończona, odsunąć się', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'Defibrylator przestał analizować', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'Maszyna skończyła badanie', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'Mamy wynik analizy z AED', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'Urządzenie mówi, że już po analizie', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'Analiza rytmu dobiegła końca', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'Urządzenie kazało przestać, bo analizowało i już skończyło', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'AED już nie analizuje', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'Przerwało analizę, bo skończyło sprawdzać', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'Usłyszałem sygnał końca analizy', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'Defibrylator zakończył skanowanie pacjenta', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'Już po wszystkim, urządzenie sprawdziło rytm', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'AED wydało werdykt po analizie', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'Zakończono proces analizowania', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'Analiza wykonana, czekam na instrukcje', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'Urządzenie przestało wydawać dźwięki analizy', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'Koniec analizy rytmu przez AED', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'AED skończyło swoją pracę nad analizą', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'Użytkownik mówi o zakończeniu analizy', 'intent.cpr.analysis_done');
  nlp.addDocument('pl', 'Urządzenie skończyło analizować rytm', 'intent.cpr.analysis_done');

  // 2. Feedback negatywny - poszkodowany nadal nie oddycha - intent.cpr.failed
  nlp.addDocument('pl', 'Uciskam już długo, ale on nie reaguje', 'intent.cpr.failed');
  nlp.addDocument('pl', 'Moja pomoc nic nie daje, ciągle nie dycha', 'intent.cpr.failed');
  nlp.addDocument('pl', 'Nadal brak oznak życia po masażu serca', 'intent.cpr.failed');
  nlp.addDocument('pl', 'To nic nie pomaga, on wciąż jest siny', 'intent.cpr.failed');
  nlp.addDocument('pl', 'Robię to, co mówisz, ale on nie ożywa', 'intent.cpr.failed');
  nlp.addDocument('pl', 'Mimo reanimacji, oddech nie wraca', 'intent.cpr.failed');
  nlp.addDocument('pl', 'Nie widzę poprawy po moich uciskach', 'intent.cpr.failed');
  nlp.addDocument('pl', 'Nic się nie zmienia, wciąż nie oddycha', 'intent.cpr.failed');
  nlp.addDocument('pl', 'Masaż serca nie przynosi skutku', 'intent.cpr.failed');
  nlp.addDocument('pl', 'On się nie budzi, mimo moich starań', 'intent.cpr.failed');
  nlp.addDocument('pl', 'Cały czas martwy punkt, zero oddechu', 'intent.cpr.failed');
  nlp.addDocument('pl', 'Uciskanie klatki nic nie zmienia', 'intent.cpr.failed');
  nlp.addDocument('pl', 'Niestety, resuscytacja na razie nie działa', 'intent.cpr.failed');
  nlp.addDocument('pl', 'On nie reaguje na moją pomoc', 'intent.cpr.failed');
  nlp.addDocument('pl', 'Pompuję, ale on nadal jest nieprzytomny i bezdechu', 'intent.cpr.failed');
  nlp.addDocument('pl', 'Nie widzę, żeby zaczął oddychać', 'intent.cpr.failed');
  nlp.addDocument('pl', 'Dalej nic, żadnej reakcji na masaż', 'intent.cpr.failed');
  nlp.addDocument('pl', 'Moje wysiłki nie przynoszą efektu', 'intent.cpr.failed');
  nlp.addDocument('pl', 'Wciąż brak tętna, mimo CPR', 'intent.cpr.failed');
  nlp.addDocument('pl', 'Nie udaje się przywrócić oddechu', 'intent.cpr.failed');
  nlp.addDocument('pl', 'Użytkownik mówi że to nic nie dało', 'intent.cpr.failed');
  nlp.addDocument('pl', 'Dalej nie oddycha mimo uciskania', 'intent.cpr.failed');

  // 3. Feedback pozytywny - oddech wrócił - intent.cpr.breathing_restored
  nlp.addDocument('pl', 'O rany, on zaczął oddychać!', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Wrócił mu oddech, widzę jak dycha', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Zaczął kaszleć i łapać powietrze', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Oddech wrócił po defibrylacji', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Chyba go uratowaliśmy, bo oddycha', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Znowu dycha, klatka zaczęła pracować', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Otworzył oczy i wziął głęboki wdech', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Zaczął samodzielnie oddychać', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Czuję tętno i widzę oddech', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Udało się! Oddech powrócił', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Pacjent zaczął przejawiać oznaki życia', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Ożył! Widzę jak nabiera tchu', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Funkcje życiowe wróciły, oddycha', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Wykonał głęboki wdech, jest super', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Złapał powietrze i się poruszył', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Reanimacja skuteczna, oddycha już sam', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Słyszę jego oddech, wrócił!', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'On oddycha samodzielnie, co teraz?', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Pojawił się regularny oddech', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Pacjent odzyskał oddech po uciskaniu', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Zaczął się poruszać, chyba oddycha', 'intent.cpr.breathing_restored');
  nlp.addDocument('pl', 'Oddech wrócił, czuję go wyraźnie', 'intent.cpr.breathing_restored');

  // 4. Pomyłka - poszkodowany jednak nie oddycha - intent.no_breathing
  nlp.addDocument('pl', 'Cofam to, on jednak nie oddycha', 'intent.no_breathing');
  nlp.addDocument('pl', 'Źle spojrzałem, on w ogóle nie dycha', 'intent.no_breathing');
  nlp.addDocument('pl', 'Pomyliłem się, on wciąż nie oddycha', 'intent.no_breathing');
  nlp.addDocument('pl', 'Znowu przestał oddychać, tragedia', 'intent.no_breathing');
  nlp.addDocument('pl', 'To tylko mi się zdawało, on nie bierze tchu', 'intent.no_breathing');
  nlp.addDocument('pl', 'Wcześniej myślałem, że tak, ale jednak nie oddycha', 'intent.no_breathing');
  nlp.addDocument('pl', 'Błąd, klatka piersiowa wcale się nie rusza', 'intent.no_breathing');
  nlp.addDocument('pl', 'Niestety, to nie był oddech, on nie żyje', 'intent.no_breathing');
  nlp.addDocument('pl', 'Jednak brak oddechu, spanikowałem', 'intent.no_breathing');
  nlp.addDocument('pl', 'Sprawdziłem jeszcze raz, on nie oddycha', 'intent.no_breathing');
  nlp.addDocument('pl', 'To było tylko drgnięcie, on nie bierze tchu', 'intent.no_breathing');
  nlp.addDocument('pl', 'Wycofuję co powiedziałem, nie oddycha', 'intent.no_breathing');
  nlp.addDocument('pl', 'Znowu nie czuję żadnego oddechu', 'intent.no_breathing');
  nlp.addDocument('pl', 'Urojenie, on jednak w ogóle nie pracuje płucami', 'intent.no_breathing');
  nlp.addDocument('pl', 'Zmylił mnie, on wciąż nie oddycha', 'intent.no_breathing');
  nlp.addDocument('pl', 'Szybko, jednak nie oddycha, wracam do ucisków', 'intent.no_breathing');
  nlp.addDocument('pl', 'Myślałem, że dycha, ale on jest siny i bezdechu', 'intent.no_breathing');
  nlp.addDocument('pl', 'Błędna ocena, brak czynności oddechowych', 'intent.no_breathing');
  nlp.addDocument('pl', 'Nie, jednak nie czuję powietrza, on nie dycha', 'intent.no_breathing');
  nlp.addDocument('pl', 'To nie był oddech, on wciąż nie reaguje', 'intent.no_breathing');
  nlp.addDocument('pl', 'Jednak się pomyliłem, jednak nie oddycha', 'intent.no_breathing');

  await nlp.train();

  
  /**
   * Poprawiona funkcja dopasowana do main.js
   * Przyjmuje dwa argumenty: język oraz tekst
   */
  async function process(lang, text) {
    // Wywołujemy oryginalną metodę z NLP.js przekazując język i tekst
    const response = await nlp.process(lang, text);
    
    //console.log(`[NLP] Tekst: ${text} | Intencja: ${response.intent} | Pewność: ${response.score}`);
    
    // Kluczowy filtr: Jeśli bot słabo zrozumiał intencję, traktujemy to jako brak dopasowania
    if (response.score < 0.5) {
      return { intent: 'None', score: response.score };
    }
    return response;
  }

  // Zwracamy obiekt z funkcją process, który w main.js ląduje jako nlpEngine
  return { process };

  // Legacy code - zwracał cały obiekt nlp, ale teraz zwracamy tylko funkcję process
  // return nlp;
}