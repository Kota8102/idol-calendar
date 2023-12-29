import { createContext } from 'react'

type CalendarContextType = {
	view: string
	setView: React.Dispatch<React.SetStateAction<string>>
}

const CalendarContext = createContext<CalendarContextType>({
	view: 'dayGridPlugin',
	setView: () => {
		//何もしない。
	},
})

export default CalendarContext
