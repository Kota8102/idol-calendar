import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../molecule/nav'

const Header: React.FC = () => {
	return (
		<header className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
			<Link to="/" className="text-xl font-medium">
				Idol Calendar
			</Link>
			<Nav />
		</header>
	)
}

export default Header
