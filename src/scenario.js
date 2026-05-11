/** Plik Barrel Export - Scenariusze
 * ====================================
 * 
 * Ten plik ponownie eksportuje wszystkie scenariusze z nowych modułów w katalogu `/scenarios/`.
 * Pozwala to zachować kompatybilność wsteczną, jeśli inne części kodu importują z `scenario.js`.
 * 
 */

export { allergyMachine, allergyDialog } from './scenarios/allergy.js';
export { stomachMachine, stomachDialog } from './scenarios/stomach.js';
export { headacheMachine, headacheDialog } from './scenarios/headache.js';
export { backpainMachine, backpainDialog } from './scenarios/backpain.js';
export { pregnancyMachine, pregnancyDialog } from './scenarios/pregnancy.js';
export { diabetesMachine, diabetesDialog } from './scenarios/diabetes.js';