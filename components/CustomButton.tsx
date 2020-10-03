import React, { FunctionComponent } from "react"
import { View, Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Colours } from "../styles"
import { PressEvent } from "../types/types"

export const CustomButton: FunctionComponent<{
    text: string
    onPress: PressEvent
    colour: "primary"
    fullWidth?: boolean
    style?: Record<string, unknown>
    type?: "normal" | "fab"
    disabled?: boolean
}> = ({
    text,
    onPress,
    colour,
    fullWidth,
    style,
    type = "normal",
    disabled = false,
}) => {
    return (
        <View
            style={{
                ...styles.wrapper,
                ...(fullWidth && styles.fullWidth),
                ...(type === "fab" ? styles.fab : false),
                ...style,
            }}
        >
            <TouchableOpacity
                style={{
                    ...styles.container,
                    backgroundColor: backgroundColours[colour],
                }}
                onPress={onPress}
            >
                <Text
                    style={{
                        ...styles.text,
                        color: textColours[colour],
                    }}
                >
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const backgroundColours = {
    primary: Colours.primary,
}

const textColours = {
    primary: Colours.white,
}

const styles = StyleSheet.create({
    wrapper: {},
    container: {
        elevation: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    text: {
        textTransform: "uppercase",
        textAlign: "center",
    },
    fullWidth: {
        alignSelf: "stretch",
    },
    fab: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
    },
})
