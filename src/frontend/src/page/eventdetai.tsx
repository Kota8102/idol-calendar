import React from 'react'
import { useParams } from 'react-router-dom'
import EventDetailHeader from '../component/molecule/eventdetail_header'
import ModalList from '../component/molecule/modallist'

import useApi from '../hook/useApi'

type Event = {
	title: string
	date: string
	start: string
	description: string
	location: string
	idolname: string
	groupId: string
}

const EventDetail: React.FC = () => {
	const { eventId } = useParams<{ eventId: string }>()

	const { data: events } = useApi<Event[]>(
		`https://meegvuv7f0.execute-api.ap-northeast-1.amazonaws.com/dev/events/${eventId}`
	)

	const eventDetails =
		events && events.length > 0
			? events[0]
			: {
					title: '',
					date: '',
					start: '',
					description: '',
					location: '',
					idolname: '',
					groupId: '',
			  }

	return (
		<div>
			<div>
				<EventDetailHeader
					location={eventDetails.location}
					idolname={eventDetails.idolname}
					description={eventDetails.description}
					start={eventDetails.start}
					title={eventDetails.title}
				/>
			</div>
			<div>
				<ModalList
					location={eventDetails.location}
					groupid={eventDetails.groupId}
					idolname={eventDetails.idolname}
					description={eventDetails.description}
					start={eventDetails.start}
					title={eventDetails.title}
				/>
			</div>
		</div>
	)
}
export default EventDetail
