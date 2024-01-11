import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CheckboxContext from '../../contexts/CheckboxContext'
import '../../styles/calendar.sass'
import useApi from '../../hook/useApi'
import useSessionStorage from '../../hook/usesessionstorage'
import { groupColors } from '../atom/idoldata'

type EventProps = {
	id: string
	title: string
	start: string
	groupId: string
	description: string
	location: string
}

const Calendar: React.FC = (): JSX.Element => {
	const [calendarDate, setCalendarDate] = useSessionStorage(
		'calendarDate',
		''
	)

	const navigate = useNavigate()
	const { groupidList } = useContext(CheckboxContext)

	// カレンダーの初期表示月をセッションストレージから読み込む
	// セッションストレージから日付を読み込む際の処理を変更
	const initialCalendarDate = calendarDate
		? new Date(calendarDate + '-01') // YYYY-MM 形式の文字列に "-01" を追加して日付オブジェクトを生成
		: new Date()

	// イベント取得のためのステートとAPIエンドポイント
	// APIエンドポイントのURLを管理
	const [apiEndpoint, setApiEndpoint] = useState<string>('')

	// useApiフックを使用してイベントデータを取得
	const { data: events } = useApi<EventProps[]>(apiEndpoint)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleDatesSet = (dateInfo: any) => {
		// 新しい表示範囲に基づいてAPIエンドポイントURLを更新
		const start = dateInfo.startStr // YYYY-MM-DD形式の日付
		const end = dateInfo.endStr // YYYY-MM-DD形式の日付

		setApiEndpoint(
			`https://meegvuv7f0.execute-api.ap-northeast-1.amazonaws.com/dev/events?since=${start}&until=${end}`
		)

		let year, month
		if (dateInfo.view.type === 'dayGridMonth') {
			// dayGridMonthビューの場合の処理

			const date = new Date(dateInfo.startStr)
			year = date.getFullYear()
			month = date.getMonth() + 1 // 月を取得（JavaScriptの月は0から始まる）

			// 月に1を加える
			month++
			if (month > 12) {
				month = 1 // 月が12を超えた場合、1月に設定
				year++ // 年を繰り上げる
			}
		} else {
			// listMonthビューまたは他のビューの場合の処理

			const date = new Date(dateInfo.startStr)
			year = date.getFullYear()
			month = date.getMonth() + 1 // 月を取得（JavaScriptの月は0から始まる）
		}

		// 月が1桁の場合、先頭に0を追加
		const monthStr = month < 10 ? '0' + month : '' + month

		// YYYY-MM形式でセッションストレージに保存
		setCalendarDate(`${year}-${monthStr}`)
	}

	const filterevents = (events ?? []).filter((event: EventProps) => {
		return groupidList.includes(event?.groupId)
	})

	return (
		<div className="calendar">
			<FullCalendar
				initialDate={initialCalendarDate}
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
				events={filterevents}
				datesSet={handleDatesSet}
				// eventのcssを調整
				eventDidMount={(info) => {
					const event = info.event
					const element = info.el

					element.style.borderColor = 'transparent'
					element.classList.add(
						// 'leading-5',
						'tracking-wide',
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

					navigate(`/event/${event.id}`)
				}}
			/>
		</div>
	)
}

export default Calendar
