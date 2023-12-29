import { createContext } from 'react'

type LoadingContextType = {
	isLoading: boolean
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const LoadingContext = createContext<LoadingContextType>({
	isLoading: true,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setIsLoading: () => {},
})

export default LoadingContext
