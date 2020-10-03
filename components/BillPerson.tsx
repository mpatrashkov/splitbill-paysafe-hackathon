import React, { FunctionComponent } from "react"
import { View, StyleSheet, Text } from "react-native"

export const BillPerson: FunctionComponent<{
    style?: Record<string, unknown>
}> = ({ style }) => {
    return (
        <View
            style={{
                ...styles.billPerson,
                ...style,
            }}
        >
            <Text
                style={{
                    color: "white",
                }}
            >
                H
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    billPerson: {
        width: 30,
        height: 30,
        elevation: 3,
        borderRadius: 15,
        backgroundColor: "#0097A7",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        // borderWidth: 1,
        marginHorizontal: 1,
    },
})
