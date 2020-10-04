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
    handler?: (message: any) => any,
    saveMessages: boolean = false
) => {
    let messages: Object[] = [],
        setMessages: Function

    if (saveMessages) {
        const [_messages, _setMessages] = useState<Object[]>([])
        messages = _messages
        setMessages = _setMessages
    }

    const callback = (message: any) => {
        const obj = message

        if (saveMessages) {
            setMessages([...messages, obj])
        }

        if (handler) {
            handler(obj)
        }
    }

    useEffect(() => {
        socket.on(channel, callback)

        return () => {
            socket.off(channel, callback)
        }
    })

    return {
        messages,
        emit(message: any) {
            socket.emit(channel, message)
        },
        unsubscribe() {
            socket.off(channel, callback)
        },
    }
}
