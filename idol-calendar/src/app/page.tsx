'use client'

import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const Home: React.FC = () => {
	return (
		<main>
			<FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
		</main>
	)
}

export default Home
