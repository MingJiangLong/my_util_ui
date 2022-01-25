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
    },
    getToadyInHistory() {
        return Http.fetch<ResponseType<{ code: string, day: string, result: { date: string, title: string }[] }>>('/free/todayinhistory')
    },
    /**
     * 笑话接口
     * @returns 
     */
    getJoke() {
        return Http.fetch<ResponseType<{ type: string, title: string, content: string }>>('/article/randomjoke')
    }
}

export default Api