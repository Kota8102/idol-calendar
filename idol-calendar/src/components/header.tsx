'use client'

import dynamic from 'next/dynamic'

// FullCalendarを動的にインポートし、SSRを無効化
const FullCalendar = dynamic(() => import('@fullcalendar/react'), { ssr: false })

export default function Home() {
	return (
		<main>
			<FullCalendar initialView="dayGridMonth" />
		</main>
	)
}
