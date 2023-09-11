import Topbar from '@/components/shared/Topbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import LeftSidebar from '@/components/shared/LeftSidebar'
import Bottombar from '@/components/shared/Bottombar'
import RightSidebar from '@/components/shared/RightSidebar'
import { AuthProvider } from './Provider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Social Connect',
	description: 'Built with Next.js',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (

		<html lang='en'>
			<body className={inter.className}>
				<AuthProvider>
					<Topbar />
					<main className='flex flex-row'>
						<LeftSidebar />
						<section className='main-container'>
							<div className='w-full'>
								{children}
							</div>
						</section>
						<RightSidebar />
					</main>
					<Bottombar />
				</AuthProvider>
			</body>
		</html>

	)
}
