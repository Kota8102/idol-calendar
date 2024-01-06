import React, { ReactNode } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import Header from './header'
import Footer from './footer'
import Sidebar from './sidebar'

import AppContext from '../../contexts/AppContext'

type Props = {
	children: ReactNode
	isIdolslist?: boolean
}

const Layout = ({ children, isIdolslist }: Props) => {
	return (
		<AppContext>
			<HelmetProvider>
				<Helmet>
					<script
						async
						src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3246657715738995"
						crossOrigin="anonymous"
					></script>
				</Helmet>
				<div className="flex flex-col h-screen">
					<Header />
					<main className="flex-grow py-1 md:p-2">
						<div className="flex flex-col md:flex-row">
							<div className="basis-1/12 p-2 md:inline-block">
								<Sidebar isIdolslist={isIdolslist} />
							</div>
							<div className="flex-auto md:p-1">{children}</div>
						</div>
					</main>
					<Footer />
				</div>
			</HelmetProvider>
		</AppContext>
	)
}

export default Layout
