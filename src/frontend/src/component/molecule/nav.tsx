import React, { useState } from 'react'
import HamburgerIcon from '../atom/hamburger_Icon'
import Menu from './menu'

const Nav: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const closeMenu = () => {
		setIsMenuOpen(false)
	}

	return (
		<nav>
			<button onClick={toggleMenu}>
				<HamburgerIcon />
			</button>

			<Menu isOpen={isMenuOpen} onClose={closeMenu} />
		</nav>
	)
}

export default Nav
