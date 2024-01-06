// useApi.ts
import { useState, useEffect } from 'react'

type ApiOptions = {
	method?: string // HTTP method like GET, POST, etc.
	headers?: { [key: string]: string } // Optional headers
	body?: unknown // Optional body, use for POST or PUT requests
}

const useApi = <T>(url: string, options?: ApiOptions) => {
	const [data, setData] = useState<T | null>(null)
	const [error, setError] = useState<{
		message: string
		status?: number
	} | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url, {
					method: options?.method || 'GET', // Default to GET
					headers: options?.headers,
					body: options?.body ? JSON.stringify(options.body) : null,
				})
				if (response.ok) {
					const result = await response.json()
					setData(result)
				} else {
					throw new Error(response.statusText || 'Unknown error')
				}
			} catch (e) {
				if (e instanceof Error) {
					setError({
						message: e.message,
						status:
							e.name === 'Error' ? undefined : parseInt(e.name),
					})
				} else {
					setError({ message: 'An unexpected error occurred' })
				}
			}
		}
		fetchData()
	}, [url]) // Rerun when URL changes

	return { data, error }
}

export default useApi
