import React from 'react'
import Layout from '../component/organisms/layout'
import { useParams } from 'react-router-dom'

const EventDetail: React.FC = () => {
	const { eventId } = useParams<{ eventId: string }>()

	return (
		<Layout>
			<h1>Event Detail for Event ID: {eventId}</h1>
		</Layout>
	)
}

export default EventDetail
