import { useState } from 'react'

const useSessionStorage = (key: string, initialValue: unknown) => {
	// セッションストレージから値を読み込む関数
	const readValue = () => {
		const item = sessionStorage.getItem(key)
		return item ? JSON.parse(item) : initialValue
	}

	const [storedValue, setStoredValue] = useState(readValue)

	// セッションストレージに値を設定する関数
	const setValue = (value: unknown) => {
		setStoredValue(value)
		sessionStorage.setItem(key, JSON.stringify(value))
	}

	return [storedValue, setValue]
}

export default useSessionStorage
