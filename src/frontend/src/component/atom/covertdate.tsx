import React from 'react'

type DataProps = {
	date: string
}

const CovertDate: React.FC<DataProps> = ({ date }) => {
	const weekdays = ['日', '月', '火', '水', '木', '金', '土']
	const dt = new Date(date)
	const year = dt.getFullYear()
	const month = ('00' + (dt.getMonth() + 1)).slice(-2)
	const day = ('00' + dt.getDate()).slice(-2)
	const weekday = weekdays[dt.getDay()]
	return <>{`${year}/${month}/${day}(${weekday})`}</>
}

export default CovertDate
