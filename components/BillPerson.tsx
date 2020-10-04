import React, { FunctionComponent } from "react"
import { View, StyleSheet, Text } from "react-native"
import { User } from "../types/user"

export const BillPerson: FunctionComponent<{
    style?: Object
    size?: number
    user: User
}> = ({ style, size = 30, user }) => {
    let initials = ""

    for (let word of user.name.split(" ")) {
        initials += word[0].toUpperCase()
    }

    return (
        <View
            style={{
                ...styles.billPerson,
                ...style,
                width: size,
                height: size,
                borderRadius: size / 2,
            }}
        >
            <Text
                style={{
                    color: "white",
                    fontSize: size / 2.5,
                }}
            >
                {initials}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    billPerson: {
        elevation: 3,
        backgroundColor: "#0097A7",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        // borderWidth: 1,
        marginHorizontal: 1,
    },
})
