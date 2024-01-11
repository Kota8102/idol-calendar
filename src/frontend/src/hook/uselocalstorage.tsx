import { useState, useEffect } from 'react'

const useLocalStorage = (key: string, initialValue: unknown) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key)
			return item ? JSON.parse(item) : initialValue
		} catch (error) {
			console.error(error)
			return initialValue
		}
	})

	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(storedValue))
	}, [key, storedValue])

	return [storedValue, setStoredValue]
}

export default useLocalStorage
