import React from 'react'
import { Link } from 'react-router-dom'

type MenuItemProps = {
	to: string
	label: string
}

const MenuItem: React.FC<MenuItemProps> = ({ to, label }) => (
	<li className="hover:bg-gray-100">
		<Link
			to={to}
			className="flex justify-between items-center p-4 text-gray-600 font-bold"
		>
			{label} <span className="text-gray-800">{'> '}</span>
		</Link>
	</li>
)

export default MenuItem
