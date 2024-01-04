import Header from '../components/header'
// import Footer from '../components/footer'
import '../styles/globals.css'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<Header />
			{children}
			{/* <Footer /> */}
		</div>
	)
}
