import React from 'react'
import { IconContext } from 'react-icons'
import { MdSquare } from 'react-icons/md'

type Props = {
	color: string
	size: string
}

const Square: React.FC<Props> = ({ color, size }) => {
	return (
		<IconContext.Provider value={{ color, size: size }}>
			<MdSquare />
		</IconContext.Provider>
	)
}

export default Square
