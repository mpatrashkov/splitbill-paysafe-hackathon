import { useEffect, useState } from "react"
import io from "socket.io-client"
import { splitBillBaseUrl } from "../config"

export let socket: SocketIOClient.Socket

export const startWebSocket = () => {
    socket = io(splitBillBaseUrl)

    // socket.on("connect", () => {
    //     console.log("yey1")
    // })
}

export const useSocketChannel = (
    channel: string,
    handler: (message: any) => any,
    saveMessages: boolean = false
) => {
    let messages: Object[] = [],
        setMessages: Function

    if (saveMessages) {
        const [_messages, _setMessages] = useState<Object[]>([])
        messages = _messages
        setMessages = _setMessages
    }

    useEffect(() => {
        const callback = (message: string) => {
            const obj = JSON.parse(message)

            if (saveMessages) {
                setMessages([...messages, obj])
            }

            handler(obj)
        }

        socket.on(channel, callback)

        return () => {
            socket.off(channel, callback)
        }
    })

    return {
        messages,
        emit(message: string) {
            socket.emit(channel, message)
        },
    }
}
