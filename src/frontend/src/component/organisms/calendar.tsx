import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import React, { useState } from 'react'

// import CheckboxContext from '../../contexts/CheckboxContext'
// import LoadingContext from '../../contexts/LoadingContext'
// import ModalContext from '../../contexts/ModalContext'
// import CalendarContext from '../../contexts/Calendar'

import '../../styles/calendar.sass'
// import Modal from '../molecule/modal'

import { useNavigate } from 'react-router-dom'
import useApi from '../../hook/useApi'
import { groupColors } from '../atom/idoldata'

const Calendar: React.FC = (): JSX.Element => {
	const navigate = useNavigate()
	// const [events, setEvents] = useState([])

	// const { groupidList } = useContext(CheckboxContext)

	// const { setIsLoading } = useContext(LoadingContext)

	// const { showModal, setShowModal, setmodalEvent, setModalPosition } =
	// 	useContext(ModalContext)

	// const { setView } = useContext(CalendarContext)

	// イベント取得のためのステートとAPIエンドポイント
	// APIエンドポイントのURLを管理
	const [apiEndpoint, setApiEndpoint] = useState<string>('')

	// useApiフックを使用してイベントデータを取得
	const { data: events } = useApi<Event[]>(apiEndpoint)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleDatesSet = (dateInfo: any) => {
		// 新しい表示範囲に基づいてAPIエンドポイントURLを更新
		const start = dateInfo.startStr // YYYY-MM-DD形式の日付
		const end = dateInfo.endStr // YYYY-MM-DD形式の日付

		setApiEndpoint(
			`https://meegvuv7f0.execute-api.ap-northeast-1.amazonaws.com/dev/events?since=${start}&until=${end}`
		)
	}
	// const filterevents = (events ?? []).filter((event: Event) => {
	// 	return groupidList.includes(event.groupId)
	// })

	return (
		<div className="calendar">
			<FullCalendar
				plugins={[dayGridPlugin, listPlugin]}
				initialView="dayGridMonth"
				locales={[jaLocale]}
				dayMaxEvents={2}
				locale="ja"
				contentHeight={'auto'}
				headerToolbar={{
					left: 'prev today next',
					center: 'title',
					right: 'dayGridMonth listMonth',
				}}
				businessHours={{ daysOfWeek: [1, 2, 3, 4, 5] }}
				events={events ?? []}
				datesSet={handleDatesSet}
				// events={events ?? []}

				// datesSet={(viewInfo) => {
				// 	setView(viewInfo.view.type)
				// }}
				// eventのcssを調整
				eventDidMount={(info) => {
					const event = info.event
					const element = info.el

					element.style.borderColor = 'transparent'
					element.classList.add(
						// 'leading-5',
						// 'tracking-wide',
						// 'pl-1',
						'cursor-pointer' // hover時のカーソルの形をpointerに
					)

					// group毎の色を決定

					element.style.backgroundColor =
						groupColors[event.groupId] || 'white'

					// hober時の動作
					element.addEventListener('mouseenter', () => {
						element.style.opacity = '0.6'
					})
					element.addEventListener('mouseleave', () => {
						element.style.opacity = '1'
					})
				}}
				// eventのクリック時の動作
				eventClick={(info) => {
					const event = info.event
					console.log(event.id)

					navigate(`/event/${event.id}`)
				}}
			/>
		</div>
	)
}

export default Calendar
