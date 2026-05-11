# 🚑 Resusci Call (2026) 
**Resusci Call** to interaktywny symulator rozmów z dyspozytorem
medycznym (999/112), stworzony w celu edukacji i oswajania użytkowników z procedurami
ratunkowymi. Aplikacja wykorzystuje zaawansowane maszyny stanów do prowadzenia
realistycznych dialogów w sytuacjach zagrożenia życia.
## ✨ Główne Funkcje 
* **Specjalistyczne Scenariusze**: Od alergii i duszności, po
porażenie prądem i zatrzymanie krążenia. 
* **Tryb Hybrydowy**: Obsługa rozpoznawania mowy
(STT) oraz syntezy mowy (TTS), pozwalająca na "rozmowę" z telefonem.
* **Silnik NLP**: Inteligentne przetwarzanie języka naturalnego w
celu interpretacji intencji użytkownika.
* **Logika XState**: Stabilne prowadzenie rozmowy w oparciu o profesjonalne algorytmy
medyczne.
* **Wskazówki Edukacyjne**: System podpowiedzi uczący, jakie informacje są
kluczowe dla ratowników.
## ️🧪 Technologia 
* **Framework**: Vanilla JavaScript / Vite
* **State Management**: `xstate` (Maszyny stanów)
* **NLP**: `node-nlp` (przetwarzanie intencji)
* **UI**: HTML5 / CSS3
* **Speech API**: Web Speech API (Recognition & Synthesis)
## 🚀 Uruchomienie projektu 
1. Sklonuj repozytorium.
2. Zainstaluj zależności: ```bash npm install ```
3. Uruchom serwer deweloperski: ```bash npm run dev ```
## 📖 Przykładowy Przepływ Scenariusza (Alergia)
Alergia (plik `allergy.js`) prowadzi użytkownika przez precyzyjną ścieżkę diagnostyczną: 
1. **Lokalizacja** → 2. **Opis sytuacji** → 3. **Ocena przytomności** → 4. **Ocena oddechu** → 5. **Wywiad szczegółowy** (obrzęki, adrenalina, leki) → 6. **Instruktaż przedmedyczny**.
---
## ⚖️ Licencja i Zasady Użytkowania 
Projekt korzysta z modelu licencji hybrydowej: 
### 1. Kod Źródłowy (Software) 
Kod silnika aplikacji (np. `main.js`), skrypty sterujące oraz struktura plików
(`index.html`) objęte są **Licencją MIT**. Możesz kopiować, modyfikować i rozpowszechniać
kod programu do celów prywatnych i komercyjnych. 
### 2. Dane i Treści (Content & Scenarios)
Wszystkie dane zawarte w folderze `src/scenarios/` (w tym plik `allergy.js`), baza wiedzy
`scenarioRegistry` w `main.js`, baza intencji `nlpSetup.js` oraz teksty dialogów są **zastrzeżone (All Rights Reserved)**.
**Zabrania się:** 
* Kopiowania scenariuszy do innych projektów bez zgody autora. 
* Wykorzystywania treści merytorycznych (medycznych) w celach komercyjnych.
---
## ⚠️ Zastrzeżenie (Disclaimer) 
Aplikacja ma charakter **wyłącznie edukacyjny i symulacyjny**. W przypadku rzeczywistego zagrożenia życia należy niezwłocznie wybrać numer alarmowy **112** lub **999**.
--- 
## 👥 Autorzy i Zespół

| Autor | Rola | Strona | Kontakt |
| :--- | :--- | :--- | :--- |
| **Patryk Czyżewski** | Lead Developer, Projektant Wizualny & Architekt AI | [Lumiesent](https://www.lumiesent.pl) | p.lumiesent@gmail.com |
| **Maciej Szolc** | Kontrola Jakości, Opracowanie merytoryczne, & dokumentacja | [Wyjdź w teren](https://www.wyjdzwteren.com) | wyjdzwteren@gmail.com |
