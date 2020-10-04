import React, { FunctionComponent } from "react"
import { RootStackNavigationProps } from "../../types/navigation"
import { useSocketChannel } from "../../lib/socket"

import { WebView } from "react-native-webview"
import { Text } from "react-native"

export const LoginToBankPage: FunctionComponent<RootStackNavigationProps<
    "LoginToBank"
>> = ({ route, navigation }) => {
    const { unsubscribe } = useSocketChannel("bank", (message) => {
        if (message.type === "authenticated") {
            console.log(message)
            unsubscribe()
            navigation.replace("Home")
        }
    })

    console.log(route.params.url)

    return (
        <WebView
            source={{
                uri: route.params.url,
            }}
        />
    )
}
