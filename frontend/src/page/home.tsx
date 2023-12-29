import React from 'react'

import Layout from '../component/organisms/layout'
import Calendar from '../component/organisms/calendar'
import Loader from '../component/atom/loader'

const Home: React.FC = (): JSX.Element => {
	return (
		<Layout isIdolslist={true}>
			<div>
				<Loader />
				<Calendar />
			</div>
		</Layout>
	)
}

export default Home
