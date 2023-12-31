import VideoContainer from "@/app/[slug]/interview/video_container";
import sihirApiClient from "@/helpers/axios";

const get_question_info = async (question_id) => {
    const data = await sihirApiClient.get(`/v1/applications/questions/${question_id}`)
    return data.data
}


export default async function Home({params: {slug, question_id}}) {
    const question_info = await get_question_info(question_id)

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
            <VideoContainer
                question={question_info.question}
                token={question_info.token}
                question_id={question_id}
                status={question_info.status}
                slug={slug}
            />
        </div>
    )
}
