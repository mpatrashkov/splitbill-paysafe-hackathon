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

const Stack = createStackNavigator<RootStackParamList>()

const screenOptions = {
    ...TransitionPresets.FadeFromBottomAndroid,
    headerShown: false,
}

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar />
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginPage}
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
