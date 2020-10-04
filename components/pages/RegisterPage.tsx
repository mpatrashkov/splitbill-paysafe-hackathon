import React, { FunctionComponent, useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    AsyncStorage,
} from "react-native"
import { Form, Layout, Typography } from "../../styles"
import { CustomButton } from "../CustomButton"
import { splitBillApi } from "../../http/splitBillApi"
import { RootStackNavigationProps } from "../../types/navigation"
import { useSocketChannel } from "../../lib/socket"

export const RegisterPage: FunctionComponent<RootStackNavigationProps<
    "Register"
>> = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const { emit } = useSocketChannel("authenticate")

    const onRegisterClick = () => {
        splitBillApi
            .post("/auth/register", {
                email,
                name,
                password,
            })
            .then(({ data }) => {
                if (data.error) {
                    console.log("Nanovo")
                } else {
                    console.log(data)
                    AsyncStorage.setItem("@jwt", data.user.token)
                    emit({
                        token: data.user.token,
                    })
                    navigation.navigate("LinkAccount")
                }
            })
    }

    return (
        <View style={styles.container}>
            <Image source={require("../../img/logo.png")} style={styles.logo} />
            <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                placeholder="Email address"
            />
            <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.input}
                placeholder="Name"
            />
            <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
            />
            <CustomButton
                style={styles.register}
                colour="primary"
                text="Register"
                onPress={onRegisterClick}
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
