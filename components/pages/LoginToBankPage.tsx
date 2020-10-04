import React, { FunctionComponent } from "react"
import { RootStackNavigationProps } from "../../types/navigation"
import { useSocketChannel } from "../../lib/socket"

import { WebView } from "react-native-webview"
import { Text } from "react-native"

export const LoginToBankPage: FunctionComponent<RootStackNavigationProps<
    "LoginToBank"
>> = ({ route, navigation }) => {
    useSocketChannel("bank", (message) => {
        if (message.type === "authenticated") {
            navigation.replace("Home")
        }
    })

    console.log(route.params.url)

    return (
        <WebView
            source={{
                uri:
                    "https://identity.dskbank.bg/connect/authorize?response_type=code&client_id=5c465f40-2b83-4fc3-a536-66b02eede727&redirect_uri=http://wethebest.asuscomm.com/bank/dsk/success&scope=ais.sandbox&state=18de6fd8-904b-4292-8e55-d8bf75edf47b",
            }}
        />
    )
}
