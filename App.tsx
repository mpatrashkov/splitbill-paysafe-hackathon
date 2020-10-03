import "react-native-gesture-handler"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack"
import { RootStackParamList } from "./types/navigation"
import { NavigationContainer } from "@react-navigation/native"
import { LoginPage } from "./components/pages/LoginPage"
import { RegisterPage } from "./components/pages/RegisterPage"

const Stack = createStackNavigator<RootStackParamList>()

const screenOptions = {
    ...TransitionPresets.FadeFromBottomAndroid,
}

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
