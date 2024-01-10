import React from 'react'

import Loader from '../component/atom/loader'
import Calendar from '../component/organisms/calendar'
import Layout from '../component/organisms/layout'

const Home: React.FC = (): JSX.Element => {
	return (
		// <Layout isIdolslist={true}>
		<Layout>
			<div>
				<Loader />
				<Calendar />
			</div>
		</Layout>
	)
}

export default Home
