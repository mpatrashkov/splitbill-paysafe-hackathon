import React, { FunctionComponent, useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    AsyncStorage,
} from "react-native"
import { RootStackNavigationProps } from "../../types/navigation"
import { CustomButton } from "../CustomButton"
import { Typography, Form, Layout } from "../../styles"
import { splitBillApi } from "../../http/splitBillApi"
import { useSocketChannel } from "../../lib/socket"

export const LoginPage: FunctionComponent<RootStackNavigationProps<
    "Login"
>> = ({ navigation }) => {
    const [email, setEmail] = useState("test@test.com")
    const [password, setPassword] = useState("test123")

    const { emit } = useSocketChannel("authenticate")

    const onRegisterRedirect = () => {
        navigation.navigate("Register")
    }

    const onLoginClick = () => {
        splitBillApi
            .post("/auth/login", {
                email,
                password,
            })
            .then(({ data }) => {
                if (data.error) {
                    console.log("Nanovo")
                } else {
                    AsyncStorage.setItem("@jwt", data.user.token)
                    emit({
                        token: data.user.token,
                    })
                    navigation.navigate("Home")
                }
            })
    }

    return (
        <View style={styles.container}>
            <Image source={require("../../img/logo.png")} style={styles.logo} />
            <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.email}
                placeholder="Email address"
            />
            <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={Form.wideInput}
                secureTextEntry={true}
                placeholder="Password"
            />
            <CustomButton
                style={styles.login}
                colour="primary"
                text="Login"
                onPress={onLoginClick}
                fullWidth
            />
            <Text>
                Don't have an account?{" "}
                <Text
                    style={{ ...Typography.clickable }}
                    onPress={onRegisterRedirect}
                >
                    Register now
                </Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...Layout.centerContainer,
        paddingHorizontal: 30,
    },
    logo: {
        marginTop: 150,
        marginBottom: 50,
        width: 150,
        height: 150,
    },
    email: {
        ...Form.wideInput,
        marginBottom: 20,
    },
    login: {
        marginVertical: 20,
    },
})
