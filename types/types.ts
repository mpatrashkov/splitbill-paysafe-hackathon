import { GestureResponderEvent } from "react-native"

export type PressEvent = (ev: GestureResponderEvent) => void

export type Action = {
    type: string
    payload: any
}
