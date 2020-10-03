import React, { FunctionComponent, useContext, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Layout, Typography, Form } from "../../../styles"
import { TextInput } from "react-native-gesture-handler"
import { CustomButton } from "../../CustomButton"
import { NewBillStackNavigationProps } from "../../../types/navigation"
import { NewBillContext } from "../../../state/newBill"

export const NamePage: FunctionComponent<NewBillStackNavigationProps<
    "Name"
>> = ({ navigation }) => {
    const { state, dispatch } = useContext(NewBillContext)

    const [name, setName] = useState(state.name)

    const onNextClick = () => {
        dispatch({
            type: "SET_NAME",
            payload: {
                name,
            },
        })

        navigation.push("People")
    }

    return (
        <View style={Layout.verticalCenterContainer}>
            <Text style={Typography.big}>Name</Text>
            <TextInput
                value={name}
                style={styles.input}
                onChangeText={(text) => setName(text)}
                placeholder="Food & Drinks"
            />
            <CustomButton
                colour="primary"
                text="Next"
                onPress={onNextClick}
                type="fab"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        ...Form.input,
        width: 200,
        textAlign: "center",
        fontSize: 16,
        marginTop: 15,
    },
})
