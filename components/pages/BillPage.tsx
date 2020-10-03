import React, { FunctionComponent, useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { BillPerson } from "../BillPerson"
import { Bill } from "../../types/bill"
import { splitBillApi } from "../../http/splitBillApi"
import { RootStackNavigationProps } from "../../types/navigation"
import { authHeaders } from "../../lib/headers"

export const BillPage: FunctionComponent<RootStackNavigationProps<"Bill">> = ({
    route,
}) => {
    const [bill, setBill] = useState<Bill>()

    useEffect(() => {
        authHeaders()
            .then((headers) =>
                splitBillApi.get(`/bills/${route.params.id}`, {
                    headers,
                })
            )
            .then(({ data }) => {
                setBill(data)
            })
    })

    return (
        <View>
            <View style={styles.details}>
                <Text style={styles.amount}>{bill?.amount}лв</Text>
                <Text style={styles.title}>{bill?.name}</Text>
                <View style={styles.people}>
                    <BillPerson size={50} />
                    <BillPerson size={50} />
                    <BillPerson size={50} />
                    <BillPerson size={50} />
                </View>
            </View>
            <View style={styles.transactions}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    details: {
        alignItems: "center",
        marginTop: 20,
    },
    amount: {
        fontSize: 48,
        fontWeight: "bold",
    },
    title: {
        marginBottom: 20,
        fontSize: 18,
        // fontWeight: "bold",
    },
    people: {
        flexDirection: "row",
    },
    transactions: {},
})
