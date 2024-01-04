import React from 'react'

import Layout from '../component/organisms/layout'
import Table from '../component/atom/table'

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
