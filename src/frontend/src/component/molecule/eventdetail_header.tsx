import React from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import AddToGoogleCalendarButton from './googlecalendar_button'

type EventDetailHeaderProps = {
	location: string
	title: string
	start: string
	description: string
	idolname: string
}
const EventDetailHeader: React.FC<EventDetailHeaderProps> = ({
	location,
	title,
	start,
	description,
	idolname,
}) => {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate(-1) // Navigate back
	}

	return (
		<div className="modal-header flex justify-end p-3 space-x-3">
			<button
				type="button"
				className="w-10 h-10 p-2 bg-gray-200 rounded-md flex items-center justify-center"
			>
				<AddToGoogleCalendarButton
					location={location}
					title={title}
					start={start}
					description={description}
					idolname={idolname}
				/>
			</button>

			<button
				type="button"
				className="w-10 h-10 p-2 bg-gray-200 rounded-md flex items-center justify-center"
				onClick={handleClick}
			>
				<MdOutlineClose size={24} />
			</button>
		</div>
	)
}

export default EventDetailHeader
