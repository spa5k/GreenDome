import {
	EditionSelectorSheet,
	EditionViewer,
	getQuranTextEditions,
	getTranslationEditions,
	getTransliterationEditions,
	MushafViewer,
	SurahApi,
	Surahs,
} from '@quran/core';
import { Button } from '@quran/elements';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

interface LoaderData {
	surahInfo: Surahs;
}

interface Params {
	number: number;
}
export const Catch = () => <div>Route errorrrrrr</div>;

export const Loader = async ({ params }: { params: Params; }) => {
	const surahs = new SurahApi();
	const number = params.number;
	const surahInfo = await surahs.surahInfoByNumber(number);
	await getQuranTextEditions();
	await getTranslationEditions();
	await getTransliterationEditions();
	return { surahInfo };
};

export const Pending = () => <h1>Loading...</h1>;
export const Failure = () => <h1>Something went wrong...</h1>;

export default function Surah() {
	const { surahInfo } = useLoaderData() as LoaderData;
	// a state to toggle between mushaf and edition viewer
	const [isMushaf, setIsMushaf] = useState(false);

	if (!surahInfo) {
		return <h1>Loading..</h1>;
	}

	return (
		<div>
			<EditionSelectorSheet />

			<div>
				<h1>{surahInfo.nameSimple}</h1>
			</div>
			<Button onClick={() => setIsMushaf(!isMushaf)}>Toggle Mushaf</Button>
			{isMushaf && <MushafViewer surahInfo={surahInfo as Surahs} />}
			{!isMushaf && <EditionViewer surahInfo={surahInfo as Surahs} />}
		</div>
	);
}
