import React, { useContext } from 'react'
import CheckboxContext from '../../contexts/CheckboxContext'

type Props = {
	name: string
	color: string
	colorcode: string
	index: number
	groupid: string
}

const Checkbox: React.FC<Props> = ({
	name,
	color,
	colorcode,
	index,
	groupid,
}) => {
	const { checkList, setCheckList, groupidList, setGroupidList } =
		useContext(CheckboxContext)

	return (
		<label className="flex my-1 items-center hover:bg-gray-200 px-2 cursor-pointer">
			<input
				type="checkbox"
				checked={checkList[index]}
				onChange={() => {
					const newCheckList = [...checkList]
					if (checkList[index]) {
						newCheckList[index] = false
						setGroupidList(groupidList.filter((e) => e !== groupid))
					} else {
						newCheckList[index] = true
						setGroupidList([...groupidList, groupid])
					}
					setCheckList(newCheckList)
				}}
				className={`w-4 h-4 block border rounded ${
					checkList[index] ? color : ''
				}`}
				style={{
					accentColor: colorcode,
					borderColor: colorcode,
					backgroundColor: checkList[index]
						? colorcode
						: 'transparent',
				}}
			/>
			<p className="px-2 truncate">{name}</p>
		</label>
	)
}

export default Checkbox
