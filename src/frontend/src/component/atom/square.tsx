import React from 'react'
import { IconContext } from 'react-icons'
import { MdSquare } from 'react-icons/md'

type SquareProps = {
	color: string
	size: string
}

const Square: React.FC<SquareProps> = ({ color, size }) => {
	return (
		<IconContext.Provider value={{ color, size: size }}>
			<MdSquare />
		</IconContext.Provider>
	)
}

export default Square
