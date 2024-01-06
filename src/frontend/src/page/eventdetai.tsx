import React from 'react'
import Layout from '../component/organisms/layout'
import { useParams } from 'react-router-dom'

import useApi from '../hook/useApi'
import { IconContext } from 'react-icons'
import {
	MdSquare,
	MdLocationOn,
	MdGroup,
	MdFormatAlignLeft,
} from 'react-icons/md'

import ModalDetail from '../component/atom/modaldetail'

import { groupColors } from '../component/atom/idoldata'

type Event = {
	title: string
	date: Date | null
	formatdate: string
	description: string
	location: string
	idolname: string
	groupId: string
}

const EventDetail: React.FC = () => {
	const { eventId } = useParams<{ eventId: string }>()

	// イベントデータがまだ取得されていない、または配列が空の場合の処理
	const { data: events, error } = useApi<Event[]>(
		`https://meegvuv7f0.execute-api.ap-northeast-1.amazonaws.com/dev/events/${eventId}`
	)

	// ローディング、エラー、またはデータがまだ存在しない場合の処理
	if (error) {
		return <div>Error loading event details.</div>
	}
	if (!events || events.length === 0) {
		return <div>Loading event details...</div> // ローディングメッセージ
	}

	// 配列の最初のイベントを取得
	const eventDetails = events[0]
	const groupid = eventDetails.groupId
	const color = groupColors[groupid]
	return (
		<Layout>
			<div className="p-5">
				<div></div>

				<div>
					<div className="flex inline-flex items-center justify-start pt-1 pb-2">
						<div className="pr-5 flex items-center justify-center">
							<IconContext.Provider value={{ color, size: '18' }}>
								<MdSquare />
							</IconContext.Provider>
						</div>
						<div className="whitespace-pre-wrap text-xl md:text-2xl flex items-center">
							{eventDetails.title}
						</div>
					</div>

					<ModalDetail text={eventDetails.idolname}>
						<MdGroup size={21} />
					</ModalDetail>

					{eventDetails.description && (
						<div className="flex inline-flex items-start pt-2 pb-2">
							<div className="pr-5 pt-2">
								<MdFormatAlignLeft size={18} />
							</div>
							<div
								className="whitespace-pre-wrap overflow-auto break-words"
								dangerouslySetInnerHTML={{
									__html: eventDetails.description,
								}}
							/>
						</div>
					)}

					{eventDetails.location && (
						<ModalDetail text={eventDetails.location}>
							<MdLocationOn size={18} />
						</ModalDetail>
					)}
				</div>
			</div>
		</Layout>
	)
}

export default EventDetail
