import './globals.css'
import {Inter} from 'next/font/google'


export const metadata = {
    title: 'Sihir Interview',
    description: 'Interview with Sihir',
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <div>
            {children}
        </div>
        </body>
        </html>
    )
}