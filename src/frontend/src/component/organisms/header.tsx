import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
	return (
		<header className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
			<Link to="/" className="text-2xl font-medium">
				Idol Calendar
			</Link>
			<nav className="flex items-center">
				<Link
					to="/idols"
					className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white hover:bg-gray-500 mr-4"
				>
					Idol List
				</Link>
				<Link
					to="/about"
					className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white hover:bg-gray-500 "
				>
					About
				</Link>
			</nav>
		</header>
	)
}

export default Header
