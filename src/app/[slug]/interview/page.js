'use client'

import 'regenerator-runtime/runtime'
import {useEffect, useState} from "react";
import {usePathname, useRouter} from 'next/navigation'
import OpenViduSession from "openvidu-react";


export default function Home() {
    const router = useRouter()
    let pathname = usePathname()
    const [response, setResponse] = useState(null);
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
            .then(function (stream) {
                console.log(stream)
            })
            .catch(function (err0r) {
                console.error("Something went wrong!");
            });
    })
    const slug = pathname.split('/')[1]

    useEffect(() => {
        const element = document.getElementById('header_img')
        if (element) {
            element.src = 'https://cdn.discordapp.com/attachments/997261989292282007/1120080903260094534/atlas_simple_jappanese_drawing_of_dragon_fitting_white_backgrou_9655a5bc-6b86-4055-b426-77a02656345d.png'
        }
        const title = document.getElementById("titleContent");
        if (title) {
            title.remove()
        }
        //    Get interview_obj from local_storage
        const interview_obj = localStorage.getItem('interview_obj')
        if (!interview_obj) {
            router.push(`/${slug}`)
        }

        const interview_obj_json = JSON.parse(interview_obj)
        if (!interview_obj_json || !interview_obj_json.token) {
            router.push('/error')
        }
        setResponse(interview_obj_json)
    })
    if (!response || !response.token) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1>
                    Loading...
                </h1>
            </main>
        )
    }
    const handleError = () => {
        router.push('/error')
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className={'absolute z-50 bottom-20 text-2xl '}>
                Question: {response.question}
            </div>
            <OpenViduSession
                id="opv-session"
                sessionName={''}
                user={'User'}
                token={response.token}
                joinSession={() => {
                    if (response) {
                        localStorage.removeItem('interview_obj')
                    }
                }
                }
                leaveSession={() => {
                    console.log('leaveSession')
                    router.back(`/error`)
                    setResponse(null)
                }}
                error={handleError}
            />

        </main>
    )
}
