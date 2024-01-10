import idolData from '../../data/idol.json'

type Idol = {
	id: number
	name: string
	color: string
	colorcode: string
	url: string
	twitter: string
}

type IdolColorData = {
	id: number
	name: string
	color: string
	colorcode: string
}

type IdolSocialData = {
	id: number
	name: string
	url: string
	twitter: string
}

export const IdolSocialData: IdolSocialData[] = idolData.map(
	(idol: Idol): IdolSocialData => ({
		id: idol.id,
		name: idol.name,
		url: idol.url,
		twitter: idol.twitter,
	})
)

export const idolColorData: IdolColorData[] = idolData.map(
	(idol: Idol): IdolColorData => ({
		id: idol.id,
		name: idol.name,
		color: idol.color,
		colorcode: idol.colorcode,
	})
)

export type GroupColors = { [id: string]: string }

// idを文字列に変換し、idとcolorcodeのみを抽出し、オブジェクトに変換
export const groupColors: GroupColors = idolData.reduce((acc, idol) => {
	acc[idol.id.toString()] = idol.colorcode
	return acc
}, {} as GroupColors)

export const numberOfIdols = idolData.length
