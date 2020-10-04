import React, { FunctionComponent } from "react"
import { View, Text, StyleSheet } from "react-native"

export const SectionHeader: FunctionComponent<{
    title: string
}> = ({ title }) => {
    return (
        <View style={sectionHeaderStyles.container}>
            <Text>{title}</Text>
        </View>
    )
}

const sectionHeaderStyles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginVertical: 10,
    },
})
