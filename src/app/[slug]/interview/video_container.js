'use client'

import 'regenerator-runtime/runtime'
import {useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import OpenViduSession from "openvidu-react";
import sihirApiClient from "@/helpers/axios";


export default function VideoContainer({token, question, status, question_id, slug}) {
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
    const [count, setCount] = useState(5);

    useEffect(() => {
        // Countdown logic
        const interval = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);

        // Cleanup the interval when component is unmounted or count reaches 0
        if (count === 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [count]);

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
            {
                (count !== 0) ?
                    (
                        <h1 className={'absolute z-50 mx-auto text-3xl w-[50vw] bg-white shadow-xl text-black p-8 '}>
                            Answer the following question after {count} seconds: {question}. After you are done, press the red button at top. 
                        </h1>
                    ) :
                    (
                        <div className={'absolute z-50 bottom-20 text-2xl '}>
                            Question: {question}
                        </div>
                    )
            }
            <OpenViduSession
                id="opv-session"
                sessionName={'6ac0bb49-3824-462c-8e87-452adeecc6d5'}
                user={'User'}
                token={token}
                joinSession={() => {
                }
                }
                leaveSession={() => {
                    sihirApiClient.put(`v1/applications/${question_id}/stop-recording`).then((val) => {
                        router.push(`/${slug}`)
                    }).catch(
                        (e) => {
                            router.push(`/${slug}`)

                        }
                    )
                }}
                error={handleError}
            />

        </main>
    )
}

// https://sihir-containerized-api.azurewebsites.net/api/v1/applications/65758580-d776-4fb9-ae59-4491d1845cb2/stop-recording/
// https://sihir-containerized-api.azurewebsites.net/api/v1/applications/65758580-d776-4fb9-ae59-4491d1845cb2/stop-recording