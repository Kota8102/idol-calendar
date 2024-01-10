import React from 'react'
import { MdLaunch } from 'react-icons/md'

type CalendarEventProps = {
	title: string
	start: string
	description: string
	location: string
	idolname: string
}

const AddToGoogleCalendarButton: React.FC<CalendarEventProps> = ({
	title,
	start,
	description,
	location,
	idolname,
}) => {
	const startDate = start.replaceAll('-', '')

	const eventTitle = encodeURIComponent(title) + ' @' + idolname
	const eventDescription = encodeURIComponent(description || '')
	const eventLocation = encodeURIComponent(location || '')

	const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDate}/${startDate}&details=${eventDescription}&location=${eventLocation}`

	return (
		<a
			href={googleCalendarLink}
			target="_blank"
			rel="noopener noreferrer"
			className="inline-block"
		>
			<MdLaunch size={21} className="w-21 h-21" />
		</a>
	)
}

export default AddToGoogleCalendarButton
