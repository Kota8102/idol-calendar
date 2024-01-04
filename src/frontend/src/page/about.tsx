import React from 'react'
import Layout from '../component/organisms/layout'
import Markdown from '../component/atom/markdown'

const markdownText = `
# このサイトについて
本サイトの内容と方針について簡単に説明します。

## 本サイトの内容について
このサイトは、地下アイドルのライブ情報をまとめているサイトです。

登録しているアイドルは、私がよくライブに行くアイドルのみであり、今後の追加の可能性もあります。

ライブ情報は、1日1回(0時更新)で提供しています。

## プライバシーポリシー
このブログサイトでは Cookie を取得しています。詳しくはプライバシーポリシーをご確認ください。

[プライバシーポリシー](/privacypolicy)

## お問い合わせ

このサイトに関するお問い合わせは、以下のフォームからご送信ください。

[お問い合わせ](https://forms.gle/qBN7Y265P82KL4xi6)

`

const AboutPage: React.FC = () => {
	return (
		<Layout>
			<Markdown body={markdownText} />
		</Layout>
	)
}

export default AboutPage
