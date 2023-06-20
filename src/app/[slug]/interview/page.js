import VideoContainer from "@/app/[slug]/interview/video_container";
import sihirApiClient from "@/helpers/axios";
import {useSearchParams} from "next/navigation";

const get_question_info = async (slug) => {
    const data = await sihirApiClient.post(`/v1/applications/b41368a5-725c-4a3d-a9e4-659f47f3eac3/questions/`)
    return data.data
}


export default async function Home({
                                       params: {
                                           slug,
                                           question_id

                                       },

                                   }) {

    // const question_info = await get_question_info(slug)

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
            {/*<VideoContainer*/}
            slug:
            {
                question_id
            }
            end
            {/*    token={'wss://stream.sihir.io?sessionId=32077381-be9e-4bd5-880c-31e0bd2fdda8&token=tok_VJ03qKgDo8Vtg4Zy'}*/}
            {/*/>*/}

        </div>
    )
}
