import { rspc } from '@/utils/rspc.js';
import type { FC } from 'react';
import { useParams } from 'react-router-dom';

const Component: FC = () => {
	const { id } = useParams();
	const { data } = rspc.useQuery(['surah_info', parseInt(String(id))]);
	const { data: ayahs } = rspc.useQuery(['ayahs', parseInt(String(id))]);

	return (
		<div>
			<p>blog/[id].tsx: {id}</p>;
			<p>{data?.name_arabic}</p>

			<p>{data?.name_simple}</p>
			{ayahs?.map((ayah) => {
				return <p key={ayah.ayah}>{ayah.indopak}</p>;
			})}
		</div>
	);
};

export default Component;
