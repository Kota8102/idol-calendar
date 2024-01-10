// sidebar.tsx
import React from 'react'
import { idolColorData } from '../atom/idoldata'
import IdolsList from '../molecule/idolslist'

type Props = {
	isIdolslist?: boolean
}

const Sidebar: React.FC<Props> = ({ isIdolslist }) => {
	return <div>{isIdolslist ? <IdolsList idols={idolColorData} /> : null}</div>
}

export default Sidebar
