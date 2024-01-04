// sidebar.tsx
import React from 'react'
import IdolsList from '../molecule/idolslist'
import { idolColorData } from '../atom/idoldata'

type Props = {
	isIdolslist?: boolean
}

const Sidebar: React.FC<Props> = ({ isIdolslist }) => {
	return <div>{isIdolslist ? <IdolsList idols={idolColorData} /> : null}</div>
}

export default Sidebar
