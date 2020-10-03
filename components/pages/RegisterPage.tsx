import React, { FunctionComponent } from "react"
import { View, Text, StyleSheet, TextInput, Image } from "react-native"
import { Form, Layout, Typography } from "../../styles"
import { CustomButton } from "../CustomButton"

export const RegisterPage: FunctionComponent<{}> = () => {
    return (
        <View style={styles.container}>
            <Image source={require("../../img/logo.png")} style={styles.logo} />
            <TextInput style={styles.input} placeholder="Name" />
            <TextInput style={styles.input} placeholder="Email address" />
            <TextInput style={styles.input} placeholder="Password" />
            <CustomButton
                style={styles.register}
                colour="primary"
                text="Register"
                onPress={() => {}}
                fullWidth
            />
            <Text>
                By registering you agree to{" "}
                <Text style={Typography.clickable}>Terms & Conditions</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...Layout.centerContainer,
        marginVertical: 20,
        paddingHorizontal: 30,
    },
    title: {
        ...Typography.title,
        alignSelf: "flex-start",
    },
    input: {
        marginBottom: 20,
        ...Form.wideInput,
    },
    register: {
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 150,
    },
})
