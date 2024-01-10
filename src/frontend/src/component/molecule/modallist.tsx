import React from 'react'
import {
	MdLocationOn,
	MdGroup,
	MdFormatAlignLeft,
	MdCalendarMonth,
} from 'react-icons/md'

import { groupColors } from '../atom/idoldata'
import ModalDetail from '../atom/modaldetail'
import Square from '../atom/square'

type EventProps = {
	location: string
	groupid: string
	idolname: string
	description: string
	start: string
	title: string
}

const ModalList: React.FC<EventProps> = ({
	location,
	groupid,
	idolname,
	description,
	start,
	title,
}) => {
	const color = groupColors[groupid]

	return (
		<div className="flex flex-col space-y-2 pl-6 pr-6 pb-3 pt-3">
			<div className="flex inline-flex items-start pt-1 pb-2">
				<div className="pr-5 pt-2">
					<Square color={color} size="18" />
				</div>
				<div className="whitespace-pre-wrap text-xl md:text-2xl ">
					{title}
				</div>
			</div>

			<ModalDetail text={start}>
				<MdCalendarMonth size={21} />
			</ModalDetail>

			<ModalDetail text={idolname}>
				<MdGroup size={21} />
			</ModalDetail>

			{description && (
				<div className="flex inline-flex items-start pt-2 pb-2">
					<div className="pr-5 pt-2">
						<MdFormatAlignLeft size={18} />
					</div>
					<div
						className="whitespace-pre-wrap overflow-auto break-words"
						dangerouslySetInnerHTML={{
							__html: description,
						}}
					/>
				</div>
			)}

			{location && (
				<ModalDetail text={location}>
					<MdLocationOn size={18} />
				</ModalDetail>
			)}
		</div>
	)
}

export default ModalList
