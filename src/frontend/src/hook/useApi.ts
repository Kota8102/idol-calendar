import { useState, useEffect } from 'react'

type ApiOptions = {
	method?: string
	headers?: { [key: string]: string }
	body?: unknown
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
				// キャッシュの確認
				const cachedData = sessionStorage.getItem(url)
				if (cachedData) {
					// キャッシュからデータを読み込む
					setData(JSON.parse(cachedData))
				} else {
					// APIからデータを取得
					const response = await fetch(url, {
						method: options?.method || 'GET',
						headers: options?.headers,
						body: options?.body
							? JSON.stringify(options.body)
							: null,
					})
					if (response.ok) {
						const result = await response.json()
						setData(result)
						sessionStorage.setItem(url, JSON.stringify(result)) // データをセッションストレージに保存
					} else {
						throw new Error(response.statusText || 'Unknown error')
					}
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
	}, [url, options]) // URLまたはオプションが変更されたときに再実行

	return { data, error }
}

export default useApi
