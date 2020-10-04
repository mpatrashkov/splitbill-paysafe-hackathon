import "react-native-gesture-handler"
import React from "react"
import { StyleSheet, Text, View, StatusBar } from "react-native"
import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack"
import { RootStackParamList } from "./types/navigation"
import { NavigationContainer } from "@react-navigation/native"
import { LoginPage } from "./components/pages/LoginPage"
import { RegisterPage } from "./components/pages/RegisterPage"
import { HomePage } from "./components/pages/HomePage"
import { NewBillPage } from "./components/pages/NewBillPage"
import { BillPage } from "./components/pages/BillPage"
import { AddTransactionPage } from "./components/pages/AddTransactionPage"
import { LinkAccountPage } from "./components/pages/LinkAccountPage"
import { LoginToBankPage } from "./components/pages/LoginToBankPage"
import { startWebSocket } from "./lib/socket"
import { SplitBillPage } from "./components/pages/SplitBillPage"
import moment from "moment"

moment.updateLocale("en", {
    relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "seconds",
        ss: "%ss",
        m: "a minute",
        mm: "%dm",
        h: "an hour",
        hh: "%dh",
        d: "a day",
        dd: "%dd",
        M: "a month",
        MM: "%dm",
        y: "a year",
        yy: "%dy",
    },
})

const Stack = createStackNavigator<RootStackParamList>()

const screenOptions = {
    ...TransitionPresets.FadeFromBottomAndroid,
}

startWebSocket()

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar />
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginPage}
                    options={{
                        ...screenOptions,
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="SplitBill"
                    component={SplitBillPage}
                    options={{
                        ...screenOptions,
                    }}
                />
                <Stack.Screen
                    name="LinkAccount"
                    component={LinkAccountPage}
                    options={screenOptions}
                />
                <Stack.Screen
                    name="LoginToBank"
                    component={LoginToBankPage}
                    options={screenOptions}
                />
                <Stack.Screen
                    name="Home"
                    component={HomePage}
                    options={{
                        ...screenOptions,
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="AddTransaction"
                    component={AddTransactionPage}
                    options={screenOptions}
                />
                <Stack.Screen
                    name="Bill"
                    component={BillPage}
                    options={screenOptions}
                />
                <Stack.Screen
                    name="NewBill"
                    component={NewBillPage}
                    options={{
                        ...screenOptions,
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterPage}
                    options={screenOptions}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
})
