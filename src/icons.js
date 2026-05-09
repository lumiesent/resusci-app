// 1. Zostawiamy czysty kod SVG (bez nagłówka data:...)
const allergyRaw = `<svg width="73" height="37" viewBox="0 0 73 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_163)">
<path d="M36.4988 9.76237C41.5385 9.76237 45.6238 5.69784 45.6238 0.683671C45.6238 -4.33019 41.5385 -8.395 36.4988 -8.395C31.4593 -8.395 27.3739 -4.33019 27.3739 0.683671C27.3739 5.69784 31.4593 9.76237 36.4988 9.76237Z" stroke="#333333" stroke-width="2" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M27.375 -2.34106C27.375 -2.34106 21.2917 -5.36729 15.2084 -5.36729C9.12502 -5.36729 3.04169 0.685174 3.04169 0.685174C3.04169 0.685174 9.12502 6.73764 15.2084 6.73764C21.2917 6.73764 27.375 3.71141 27.375 3.71141" stroke="#333333" stroke-width="2" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M39.5417 9.76389C39.5417 9.76389 42.5834 15.8164 42.5834 21.8688C42.5834 27.9213 36.5 33.9738 36.5 33.9738C36.5 33.9738 30.4167 27.9213 30.4167 21.8688C30.4167 15.8164 33.4584 9.76389 33.4584 9.76389" stroke="#333333" stroke-width="2" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M45.625 -2.34106C45.625 -2.34106 51.7083 -5.36729 57.7917 -5.36729C63.875 -5.36729 69.9583 0.685174 69.9583 0.685174C69.9583 0.685174 63.875 6.73764 57.7917 6.73764C51.7083 6.73764 45.625 3.71141 45.625 3.71141" stroke="#333333" stroke-width="2" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M27.8967 4.96487C27.8967 4.96487 21.4444 7.10472 17.1428 11.3844C12.8412 15.6641 12.8412 24.2238 12.8412 24.2238C12.8412 24.2238 21.4444 24.2238 25.7459 19.9441C30.0475 15.6641 32.1982 9.24457 32.1982 9.24457" stroke="#333333" stroke-width="2" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M45.1033 4.96487C45.1033 4.96487 51.5556 7.10472 55.8572 11.3844C60.1587 15.6641 60.1587 24.2238 60.1587 24.2238C60.1587 24.2238 51.5556 24.2238 47.2541 19.9441C42.9526 15.6641 40.8018 9.24457 40.8018 9.24457" stroke="#333333" stroke-width="2" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_3_163">
<rect width="73" height="37" fill="white"/>
</clipPath>
</defs>
</svg>`;

const stomachRaw = `<svg width="73" height="37" viewBox="0 0 73 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_225)">
<path d="M55.967 -13.7429C55.967 -13.7429 51.1 0.134767 51.1 11.6284C51.1 15.3084 52.1369 18.3879 53.5333 21.4549C55.1408 24.9847 57.225 28.4975 58.7546 32.8901C59.9689 36.3759 60.8336 40.4155 60.8336 45.4571" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.0334 -13.7429C17.0334 -13.7429 21.9 0.134767 21.9 11.6284C21.9 15.3084 20.8634 18.3879 19.4667 21.4549C17.8593 24.9847 15.7751 28.4975 14.2454 32.8901C13.0314 36.3759 12.1667 40.4155 12.1667 45.4571" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.4667 21.4549H53.5333" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.2452 32.8901C14.2452 32.8901 31.6333 37 36.5 45.4571C41.3667 37 58.7543 32.8901 58.7543 32.8901" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<g clip-path="url(#clip1_3_225)">
<path d="M36.5 11.2762C37.2999 11.2762 37.9484 10.4873 37.9484 9.51429C37.9484 8.54121 37.2999 7.75238 36.5 7.75238C35.7001 7.75238 35.0516 8.54121 35.0516 9.51429C35.0516 10.4873 35.7001 11.2762 36.5 11.2762Z" stroke="#333333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</g>
<defs>
<clipPath id="clip0_3_225">
<rect width="73" height="37" fill="white"/>
</clipPath>
<clipPath id="clip1_3_225">
<rect width="3.47619" height="4.22857" fill="white" transform="translate(34.7619 7.39999)"/>
</clipPath>
</defs>
</svg>`;

const headacheRaw = `<svg width="73" height="37" viewBox="0 0 73 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_190)">
<path d="M21.2917 9.1748C16.2521 9.1748 12.1667 12.912 12.1667 17.5224C12.1667 22.1327 16.2521 25.8699 21.2917 25.8699C22.3582 25.8699 23.382 25.7024 24.3334 25.395" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.9694 13.6396C8.89473 11.841 6.08344 8.02562 6.08344 3.60976C6.08344 0.238184 7.72207 -2.78305 10.3106 -4.82411" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.0146 -14.2948C21.5509 -15.1941 21.2916 -16.1989 21.2916 -17.2591C21.2916 -21.101 24.6961 -24.2154 28.8958 -24.2154C33.0954 -24.2154 36.5 -21.101 36.5 -17.2591V25.8699" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24.3334 25.8699C24.3334 28.9435 27.057 31.435 30.4167 31.435C33.7765 31.435 36.5 28.9435 36.5 25.8699" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M51.7083 9.1748C56.748 9.1748 60.8333 12.912 60.8333 17.5224C60.8333 22.1327 56.748 25.8699 51.7083 25.8699C50.6419 25.8699 49.6181 25.7024 48.6666 25.395" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M60.0306 13.6396C64.1053 11.841 66.9167 8.02562 66.9167 3.60976C66.9167 0.238184 65.2778 -2.78305 62.6894 -4.82411" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M48.6667 25.8699C48.6667 28.9435 45.9432 31.435 42.5833 31.435C39.2235 31.435 36.5 28.9435 36.5 25.8699" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_3_190">
<rect width="73" height="37" fill="white"/>
</clipPath>
</defs>
</svg>`;

const placeholderRaw = `<svg width="73" height="37" viewBox="0 0 73 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_253)">
<path d="M63.875 -5.19542V18.3622C63.875 18.9145 63.5158 19.4232 62.9363 19.6917L37.3863 31.5202C36.8352 31.7754 36.1648 31.7754 35.6137 31.5202L10.0637 19.6917C9.48434 19.4232 9.125 18.9145 9.125 18.3622L9.12494 -5.19542C9.12494 -5.74773 9.48428 -6.25663 10.0637 -6.52485L35.6137 -18.3536C36.1648 -18.6087 36.8352 -18.6087 37.3863 -18.3536L62.9363 -6.52485C63.5155 -6.25663 63.875 -5.74773 63.875 -5.19542Z" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.7323 -5.34616L35.6137 6.17296C36.1648 6.42821 36.8352 6.42821 37.3863 6.17296L62.3542 -5.38621" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M36.5 29.3958V6.58333" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_3_253">
<rect width="73" height="37" fill="white"/>
</clipPath>
</defs>
</svg>`;

// 2. Tutaj dodajemy nagłówek TYLKO RAZ i kodujemy treść
export const icons = {
  allergy: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(allergyRaw)}`,
  headache: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(headacheRaw)}`,
  stomach: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(stomachRaw)}`,
  placeholder: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(placeholderRaw)}`
};