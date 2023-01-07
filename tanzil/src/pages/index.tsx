import { rspc } from '@/utils/rspc.js';

import { Link } from 'react-router-dom';
const Index = () => {
	const { data } = rspc.useQuery(['surah_list']);
	if (!data) {
		return <p>loading..</p>;
	}
	return (
		<div>
			<div>
				{data?.map((d) => {
					return (
						<Link to={`/surah/${d.id}`} key={d.id}>
							<p>{d.id}</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Index;
