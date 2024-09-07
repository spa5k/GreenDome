import { Edition } from "../api/edition";

export const translationEditions: Edition[] = [
  {
    id: 211,
    slug: "eng-mustafakhattaba",
    author: "Mustafa Khattab Allah Edition",
    language: "English",
    direction: "ltr",
    type: "TRANSLATION",
    name: "Clear Quran, Allah Edition",
    enabled: true,
  },
  {
    id: 101,
    slug: "eng-ummmuhammad",
    author: "Umm Muhammad",
    language: "English",
    direction: "ltr",
    type: "TRANSLATION",
    name: "Saheeh International",
    enabled: true,
  },
  {
    id: 244,
    slug: "hin-muhammadfarooqk",
    author: "Muhammad Farooq Khan And Muhammad Ahmed",
    language: "Hindi",
    direction: "ltr",
    type: "TRANSLATION",
    enabled: true,
    name: "Farooq Khan And Ahmed",
  },
  {
    id: 273,
    slug: "urd-abulaalamaududi",
    author: "Abul A Ala Maududi",
    language: "Urdu",
    direction: "rtl",
    type: "TRANSLATION",
    enabled: true,
    name: "Maududi",
  },
];
