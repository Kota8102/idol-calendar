import React from 'react'
import { MdOutlineClose } from 'react-icons/md'

type CloseButtonProps = {
	onClick: () => void
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => (
	<button
		onClick={onClick}
		className="absolute top-5 right-5 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 p-2 text-black"
		aria-label="Close menu"
	>
		<MdOutlineClose size={20} />
	</button>
)

export default CloseButton
