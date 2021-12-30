import { ResponseType } from "@/modules/ResponseType"
import Http from "./http"

const Api = {
    fetchAppBackgroundImage() {
        return Http.fetch<ResponseType<any>>('/image/randomACGN')
    },
    sendMsgToRobot(msg: string) {
        return Http.fetch<ResponseType<{ result: number, content: string }>>('/robot/chat', {
            msg
        })
    }
}

export default Api