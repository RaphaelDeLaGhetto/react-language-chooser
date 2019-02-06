// This is actually a small section of the data for testing.
// The next 12 lines demonstrate the actual data format of one entry from the downloaded resource at:
// https://ldml.api.sil.org?query=alltags&ext=json
//   {
//     "full": "sok-Latn-TD", 
//     "iso639_3": "sok", 
//     "name": "Sokoro", 
//     "region": "TD", 
//     "sldr": true, 
//     "tag": "sok", 
//     "tags": [
//         "sok-TD", 
//         "sok-Latn"
//     ]
// }
// There could be more than one entry with the same "iso639_3" code (e.g. 'blt' has 3 entries), but there will only be
// one entry with the same "tag".

module.exports = [
  { name: 'Lao', code: 'lo', country: 'Cambodia, Lao People\'s Democratic Republic', otherNames: 'Lao-Kao'},
  { name: 'Thai', code: 'th', country: 'Cambodia, Thailand', otherNames: 'Thai-Ko'},
  { name: 'Akeu', code: 'aeu', country: 'China, Lao People\'s Democratic Republic', otherNames: 'Aki, Akui, Akheu'},
  { name: 'Akha', code: 'ahk', country: 'China, Lao People\'s Democratic Republic', otherNames: 'Ahka, Aini, Aka'},
  { name: 'Ban Khor', code: 'bfa', country: 'Thailand', otherNames: 'pasa kidd'},
  { name: 'Pa\'o Karen', code: 'blk', country: 'Myanamar, Thailand', otherNames: 'P\'ao, Northern'},
  { name: 'Blang', code: 'blr', country: 'China, Myanamar, Thailand', otherNames: 'Kem Degne'},
  { name: 'Tai Dam', code: 'blt', country: 'China, Lao People\'s Democratic Republic', otherNames: 'Black Tai, Hei'},
  { name: 'Sokoro', code: 'sok', country: 'Chad', otherNames: '' }
];


