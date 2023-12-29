import React from 'react'
import { MdLaunch } from 'react-icons/md'

type CalendarEvent = {
	title: string
	date: Date | null
	formatdate: string
	description: string
	location: string
	idolname: string
	groupid: string
}

// Given a calendar event, returns a URL for a Google Calendar event.
// This is used by the Calendar component to render a link to add the event to
// a user's Google Calendar.
const GoogleCalendarLink = (event: CalendarEvent): string => {
	const eventStart = event.date
	if (!eventStart) {
		throw new Error('Event date is not defined.')
	}
	// 日付をフォーマットする
	const formatDate = (date: Date) => {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		return `${year}${month}${day}`
	}

	// 終日イベントの日付を設定
	const startDate = formatDate(eventStart)
	const endDate = formatDate(
		new Date(eventStart.getTime() + 24 * 60 * 60 * 1000)
	)

	const eventTitle = encodeURIComponent(event.title) + ' @' + event.idolname
	const eventDescription = encodeURIComponent(event.description || '')
	const eventLocation = encodeURIComponent(event.location || '')

	return `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDate}/${endDate}&details=${eventDescription}&location=${eventLocation}`
}

// Add the type for the component's props
type AddToGoogleCalendarButtonProps = {
	event: CalendarEvent
}

const AddToGoogleCalendarButton: React.FC<AddToGoogleCalendarButtonProps> = ({
	event,
}) => {
	const googleCalendarLink = GoogleCalendarLink(event)

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
