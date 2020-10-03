import React, { FunctionComponent } from "react"
import { View, Text } from "react-native"
import { Typography, Layout } from "../../styles"

export const SettingsPage: FunctionComponent = () => {
    return (
        <View style={Layout.container}>
            <Text style={Typography.sectionHeader}>Settings</Text>
        </View>
    )
}
