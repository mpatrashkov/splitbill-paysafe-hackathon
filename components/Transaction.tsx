import React, { FunctionComponent } from "react"
import { View, StyleSheet, Text } from "react-native"
import { Colours } from "../styles"
import { BillPerson } from "./BillPerson"

export const Transaction: FunctionComponent = () => {
    return (
        <View style={styles.container}>
            <BillPerson style={styles.image} size={50} />
            <View style={styles.name}>
                <Text style={styles.title}>NETFLIX INC</Text>
                <Text style={styles.amount}>14.05$</Text>
            </View>
            <View>
                <Text style={styles.amount}>1h</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colours.white,
        elevation: 3,
        borderRadius: 5,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        marginRight: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    amount: {
        fontSize: 16,
    },
    name: {
        flex: 1,
    },
})
