import React from 'react'

const HamburgerIcon: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			<svg
				className="h-6 w-6 fill-current text-white"
				viewBox="0 0 24 24"
			>
				<path
					fillRule="evenodd"
					d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
				/>
			</svg>
			<span className="text-[11px]">menu</span>
		</div>
	)
}

export default HamburgerIcon
