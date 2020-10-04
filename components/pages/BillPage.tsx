import React, { FunctionComponent, useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { BillPerson } from "../BillPerson"
import { Bill } from "../../types/bill"
import { splitBillApi } from "../../http/splitBillApi"
import { RootStackNavigationProps } from "../../types/navigation"
import { authHeaders } from "../../lib/headers"
import { CustomButton } from "../CustomButton"
import { Layout } from "../../styles"
import { TransactionCard } from "../Transaction"
import { ScrollView, FlatList } from "react-native-gesture-handler"

export const BillPage: FunctionComponent<RootStackNavigationProps<"Bill">> = ({
    navigation,
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
    }, [])

    const addTransactionClick = () => {
        navigation.push("AddTransaction", {
            id: route.params.id,
        })
    }

    return (
        <View style={Layout.centerContainer}>
            <View style={styles.details}>
                <Text style={styles.amount}>{bill?.amount}лв</Text>
                <Text style={styles.title}>{bill?.name}</Text>
                <View style={styles.people}>
                    {bill?.users.map((user) => (
                        <BillPerson size={50} user={user} key={user.id} />
                    ))}
                </View>
            </View>
            <View style={styles.transactions}>
                <View style={styles.buttons}>
                    <CustomButton
                        colour="primary"
                        text="Add Transaction"
                        onPress={addTransactionClick}
                        style={styles.button}
                    />

                    <CustomButton
                        colour="primary"
                        text="Split"
                        onPress={() => {}}
                        style={styles.button}
                    />
                </View>

                <FlatList
                    data={bill?.transactions}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.transaction}>
                            <TransactionCard transaction={item} />
                        </View>
                    )}
                />
            </View>
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
    transactions: {
        marginTop: 30,
        alignSelf: "stretch",
    },
    transaction: {
        marginVertical: 5,
    },
    button: {
        marginBottom: 10,
        flex: 1,
        marginHorizontal: 5,
    },
    buttons: {
        flexDirection: "row",
        marginHorizontal: -5,
    },
})
