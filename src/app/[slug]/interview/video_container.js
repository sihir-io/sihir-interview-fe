'use client'

import 'regenerator-runtime/runtime'
import {useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import OpenViduSession from "openvidu-react";


export default function VideoContainer({token, question, status, slug}) {
    const router = useRouter()
    const searchParams = useSearchParams()

    let pathname = usePathname()
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
    }, [])



    useEffect(() => {
        const element = document.getElementById('header_img')
        if (element) {
            element.src = 'https://cdn.discordapp.com/attachments/997261989292282007/1120080903260094534/atlas_simple_jappanese_drawing_of_dragon_fitting_white_backgrou_9655a5bc-6b86-4055-b426-77a02656345d.png'
        }
        const title = document.getElementById("titleContent");
        if (title) {
            title.remove()
        }

    }, [])

    const handleError = () => {
        // router.push('/error')
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className={'absolute z-50 bottom-20 text-2xl '}>
                Question: {question}
            </div>
            <OpenViduSession
                id="opv-session"
                sessionName={'6ac0bb49-3824-462c-8e87-452adeecc6d5'}
                user={'User'}
                token={token}
                joinSession={() => {
                }
                }
                leaveSession={() => {
                    router.push(`/${slug}`)
                }}
                error={handleError}
            />

        </main>
    )
}
