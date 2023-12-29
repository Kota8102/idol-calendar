import { createContext } from 'react'

interface CheckboxContextType {
	checkList: boolean[]
	setCheckList: React.Dispatch<React.SetStateAction<boolean[]>>
	groupidList: string[]
	setGroupidList: React.Dispatch<React.SetStateAction<string[]>>
}

const CheckboxContext = createContext<CheckboxContextType>({
	checkList: [],
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setCheckList: () => {},
	groupidList: [],
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setGroupidList: () => {},
})

export default CheckboxContext
