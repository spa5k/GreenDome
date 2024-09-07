import { Highlight } from "@/components/extra/hero-highlight";

const hadiths = [
  {
    text:
      "The Prophet (ﷺ) said: 'The first matter that the slave will be brought to account for on the Day of Judgment is the prayer. If it is sound, then the rest of his deeds will be sound. And if it is bad, then the rest of his deeds will be bad.'",
    source: "Jami` at-Tirmidhi 413",
  },
  {
    text: "The Prophet (ﷺ) said: 'Between a man and shirk and kufr there stands his giving up prayer.'",
    source: "Saheeh Muslim 82",
  },
  {
    text:
      "“The Messenger of Allah (ﷺ) said: ‘The covenant that distinguishes between us and them is prayer; so whoever leaves it, he has committed Kufr.’”",
    source: "Sunan Ibn Majah 1079",
  },
  {
    text: "The Prophet (ﷺ) said: 'The key to Paradise is prayer; the key to prayer is wudu (ablution).'",
    source: "Sunan al-Tirmidhī 4",
  },
  {
    text:
      "The Prophet (ﷺ) said: 'The closest that a servant comes to his Lord is when he is prostrating, so make plenty of supplication then.'",
    source: "Sahih Muslim 482",
  },
  {
    text:
      "The Prophet (ﷺ) said, \"When you stand for Prayer say Takbir and then recite from the Holy Qur'an (of what you know by heart) and then bow till you feel at ease. Then raise your head and stand up straight, then prostrate till you feel at ease during your prostration, then sit with calmness till you feel at ease (do not hurry) and do the same in all your prayers.",
    source: "Sahih al-Bukhari 757",
  },
  {
    text:
      "The Prophet (ﷺ) said, \"The prayer of a person who does Hadath (passes urine, stool or wind) is not accepted till he performs (repeats) the ablution.\" A person from Hadaramout asked Abu Huraira, \"What is 'Hadath'?\" Abu Huraira replied, \"'Hadath' means the passing of wind from the anus.\"",
    source: "Sahih al-Bukhari 137",
  },
  {
    text:
      "The Prophet (ﷺ) said, \"If anyone of you feels drowsy while praying he should go to bed (sleep) till his slumber is over because in praying while drowsy one does not know whether one is asking for forgiveness or for a bad thing for oneself.\"",
    source: "Sahih al-Bukhari 211",
  },
  {
    text:
      "The Prophet (ﷺ) said, \"If anyone of you feels drowsy while praying, he should sleep till he understands what he is saying (reciting)\"",
    source: "Sahih al-Bukhari 212",
  },
];

export const SalahHadithDisplay = () => {
  const currentHadithIndex = Math.floor(Math.random() * hadiths.length);

  return (
    <div className="p-4 text-balance w-full  md:w-1/2 text-center items-center">
      <p className="text-lg ">
        <Highlight>{hadiths[currentHadithIndex].text}</Highlight>
      </p>
      <p className="text-sm mt-2">
        Source: {hadiths[currentHadithIndex].source}
      </p>
    </div>
  );
};
