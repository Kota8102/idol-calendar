import React from 'react'

import Table from '../component/atom/table'
import Layout from '../component/organisms/layout'

const Idols: React.FC = () => {
	return (
		<Layout>
			<div>
				<h1 className="m-3 text-xl font-medium">Idol List</h1>
				<Table />
			</div>
		</Layout>
	)
}

export default Idols
