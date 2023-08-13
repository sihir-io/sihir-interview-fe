import './globals.css'
import {Inter} from 'next/font/google'


export const metadata = {
    title: 'Sihir Interview',
    description: 'Interview with Sihir',
}

const Bubble = ({xCord, yCord, duration}) => {

    return (
        <div className={'absolute w-10 h-10 rounded-full bg-primary floating ' + duration}
             style={{top: yCord, left: xCord}}/>
    )
}


const FloatingBubbles = (screenWidth, screenHeight) => {
    return [{x: 100, y: 100}, {x: 700, y: 200}, {x: 1220, y: 900}, {x: 1700, y: 400}, {
        x: 500,
        y: 800
    }].map((bubble) => {
        let duration = `duration-${Math.floor(Math.random() * 10) * 100}`

        return <Bubble xCord={bubble.x} yCord={bubble.y} duration={duration}/>
    })
}
export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={'bg-primary-black min-h-screen flex justify-center items-center overflow-hidden '}>
        <FloatingBubbles screenWidth={1000} screenHeight={1000}/>
        <div className={' bg-primary-white px-5 py-10 shadow-2xl rounded-2xl border-2 border-primary  z-20 '}>
            {children}
        </div>
        </body>
        </html>
    )
}
