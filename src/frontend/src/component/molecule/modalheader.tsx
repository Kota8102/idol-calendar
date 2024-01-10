import React, { useContext } from 'react'
import { MdOutlineClose } from 'react-icons/md'

import ModalContext from '../../contexts/ModalContext'
// import AddToGoogleCalendarButton from './AddToGoogleCalendarButton'

const ModalHeader: React.FC = () => {
	const handleMouseDown = (event: React.MouseEvent) => {
		event.stopPropagation()
	}

	const { setShowModal, modalEvent, setmodalEvent } = useContext(ModalContext)

	const handleClick = () => {
		setShowModal(false)
		setmodalEvent({
			title: '',
			date: null,
			formatdate: '',
			description: '',
			location: '',
			idolname: '',
			groupid: '',
		})
	}

	return (
		<div
			className="modal-header flex justify-end p-3 space-x-1"
			onMouseDown={handleMouseDown}
		>
			<button
				type="button"
				className="w-10 h-10p-2 hover:bg-gray-200 hover:rounded-md flex items-center justify-center"
			>
				{/* <AddToGoogleCalendarButton event={modalEvent} /> */}
			</button>

			<button
				type="button"
				className="w-10 h-10 p-2 hover:bg-gray-200 hover:rounded-md flex items-center justify-center"
				onClick={handleClick}
			>
				<MdOutlineClose size={24} />
			</button>
		</div>
	)
}

export default ModalHeader
