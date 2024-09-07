export interface Edition {
  id: number;
  name: string;
  slug: string;
  author: string;
  language: string;
  direction: string;
  type: string;
  enabled: boolean;
}

// export enum Type {
//   TRANSLATION = "translation",
//   QURAN = "quran",
//   TRANSLITERATION = "transliteration",
//   QURAN_TRANSLITERATION = "quran_transliteration",
// }

// const getEditionType = (name: string): Type => {
//   const quranTransliteration = /^ara_quran.*la$/;
//   const quranRegex = /^ara_quran(?!.*(la\d*)$)/;
//   const genericTransliteration = /^(?!ara_quran).*(la$|la*$)/;

//   if (
//     quranTransliteration.test(name) ||
//     (name.startsWith("ara_quran") && name.includes("la"))
//   ) {
//     return Type.QURAN_TRANSLITERATION;
//   }
//   if (
//     quranRegex.test(name) ||
//     (name.startsWith("ara_quran") && !name.includes("la"))
//   ) {
//     return Type.QURAN;
//   }
//   if (
//     genericTransliteration.test(name) &&
//     !name.startsWith("ara_quran") &&
//     name.includes("la")
//   ) {
//     return Type.TRANSLITERATION;
//   }
//   return Type.TRANSLATION;
// };

// const blackList = ["ara_quranphoneticst", "eng_literal"];

// const enableList = [
//   "urd-muhammadhussain",
//   "spa-islamicfoundati",
//   "zho-mazhonggang-la",
//   "eng-abdelhaleem",
// ];

// export const fetchEditions = async (types?: Type[]): Promise<Edition[]> => {
//   const url = "../quran/data/editions.json";
//   const json = await fetch(url).then((response) => response.json());
//   const editions: Edition[] = json;
//   const finalEditions: Edition[] = [];

//   for (const edition of editions) {
//     if (!blackList.includes(edition.name)) {
//       const editionType = getEditionType(edition.name);
//       if (!types || types.includes(editionType)) {
//         const editionFinal: Edition = {
//           id: edition.id,
//           name: edition.name,
//           author: edition.author,
//           language: edition.language,
//           direction: edition.direction,
//           source: edition.source,
//           type: editionType,
//           enabled: enableList.includes(edition.name) ? 1 : 0,
//         };
//         finalEditions.push(editionFinal);
//       }
//     }
//   }

//   return finalEditions;
// };
