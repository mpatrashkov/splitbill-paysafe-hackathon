import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React, { FunctionComponent } from "react"

import { Ionicons } from "@expo/vector-icons"
import { NotificationsPage } from "./home/NotificationsPage"
import { SettingsPage } from "./home/SettingsPage"
import { BillsPage } from "./home/BillsPage"

const Tab = createBottomTabNavigator()

export const HomePage: FunctionComponent = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = ""

                    if (route.name === "Bills") {
                        iconName = "ios-cash"
                    } else if (route.name === "Notifications") {
                        iconName = "ios-notifications"
                    } else if (route.name === "Settings") {
                        iconName = "ios-settings"
                    }

                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    )
                },
            })}
        >
            <Tab.Screen name="Bills" component={BillsPage} />
            <Tab.Screen name="Notifications" component={NotificationsPage} />
            <Tab.Screen name="Settings" component={SettingsPage} />
        </Tab.Navigator>
    )
}
