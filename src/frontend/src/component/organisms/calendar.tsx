import React, { useState, useContext } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import listPlugin from '@fullcalendar/list'

// import CheckboxContext from '../../contexts/CheckboxContext'
// import LoadingContext from '../../contexts/LoadingContext'
import ModalContext from '../../contexts/ModalContext'
// import CalendarContext from '../../contexts/Calendar'

import '../../styles/calendar.sass'
import Modal from '../molecule/modal'
import { groupColors } from '../atom/idoldata'

import useApi from '../../hook/useApi'

const Calendar: React.FC = (): JSX.Element => {
	// const [events, setEvents] = useState([])

	// const { groupidList } = useContext(CheckboxContext)

	// const { setIsLoading } = useContext(LoadingContext)

	const { showModal, setShowModal, setmodalEvent, setModalPosition } =
		useContext(ModalContext)

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
			`https://k91ii0yh3d.execute-api.ap-northeast-1.amazonaws.com/dev/events?since=${start}&until=${end}`
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
				dayMaxEvents={3}
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
						'text-xs',
						'leading-5',
						'tracking-wide',
						'pl-1',
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

					let dateValue: Date | null = null
					if (event.start) {
						dateValue = new Date(event.start)
					}
					let formatdateValue = ''
					if (dateValue) {
						formatdateValue = dateValue.toLocaleDateString(
							'ja-JP',
							{
								month: '2-digit',
								day: '2-digit',
								weekday: 'short',
							}
						)
					}

					// getBoundingClientRectを使ってクリックされたイベントの位置情報を取得する
					const eventRect = info.el.getBoundingClientRect()
					setShowModal(false)
					setShowModal(true)

					setmodalEvent({
						title: event.title,
						date: dateValue,
						formatdate: formatdateValue,
						description: event.extendedProps.description,
						location: event.extendedProps.location,
						idolname: event.extendedProps.idolname,
						groupid: event.groupId,
					})

					setModalPosition({
						width: eventRect.width,
						height: eventRect.height,
						top: eventRect.top,
						left: eventRect.left,
						right: eventRect.right,
					})
				}}
			/>

			{showModal && (
				<div className="modal overlay show flex flex-col">
					<Modal />
				</div>
			)}
		</div>
	)
}

export default Calendar
