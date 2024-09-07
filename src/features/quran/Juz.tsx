import React from "react";

interface Verse {
  chapter: number;
  verse: number;
}

interface JuzReference {
  juz: number;
  start: Verse;
  end: Verse;
}

interface JuzListProps {
  references: JuzReference[];
}

const JuzList: React.FC<JuzListProps> = ({ references }) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Juzs
      </h2>
      <ul className="space-y-4">
        {references.map((juz) => (
          <li
            key={juz.juz}
            className="p-4 border rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-100"
          >
            <h3 className="text-xl font-semibold">Juz {juz.juz}</h3>
            <p>
              Start: Chapter {juz.start.chapter}, Verse {juz.start.verse}
            </p>
            <p>
              End: Chapter {juz.end.chapter}, Verse {juz.end.verse}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JuzList;
