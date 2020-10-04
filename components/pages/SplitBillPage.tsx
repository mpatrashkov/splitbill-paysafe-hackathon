import React, { FunctionComponent, useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { RootStackNavigationProps } from "../../types/navigation"
import { authHeaders } from "../../lib/headers"
import { splitBillApi } from "../../http/splitBillApi"
import { Bill } from "../../types/bill"
import { BillPerson } from "../BillPerson"
import { Layout, Card } from "../../styles"
import { ScrollView } from "react-native-gesture-handler"
import { SectionHeader } from "../SectionHeader"
import { User } from "../../types/user"

export const SplitBillPage: FunctionComponent<RootStackNavigationProps<
    "SplitBill"
>> = ({ route }) => {
    const [bill, setBill] = useState<Bill>()
    const [transactions, setTransactions] = useState<
        {
            ower: User
            owsTo: User
            amount: number
        }[]
    >()

    useEffect(() => {
        authHeaders()
            .then((headers) =>
                splitBillApi.get("/bills/" + route.params.id, {
                    headers,
                })
            )
            .then(({ data }) => {
                setBill(data)
            })

        authHeaders()
            .then((headers) =>
                splitBillApi.get(`/bills/${route.params.id}/split`, {
                    headers,
                })
            )
            .then(({ data }) => {
                setTransactions(data)
            })
    }, [])

    return (
        <ScrollView>
            <View style={Layout.container}>
                <SectionHeader title="Accepted" />
                {bill?.users.map((user) => (
                    <View key={user.id} style={styles.user}>
                        <BillPerson
                            user={user}
                            size={50}
                            style={styles.image}
                        />
                        <View>
                            <Text style={styles.name}>{user.name}</Text>
                            <Text>Owes $10.07</Text>
                        </View>
                    </View>
                ))}
                <SectionHeader title="Waiting" />
                {bill?.users.map((user) => (
                    <View key={user.id} style={styles.user}>
                        <BillPerson
                            user={user}
                            size={50}
                            style={styles.image}
                        />
                        <View>
                            <Text style={styles.name}>{user.name}</Text>
                            <Text>Owes $10.07</Text>
                        </View>
                    </View>
                ))}
                <SectionHeader title="Transactions" />
                {transactions?.map((transaction, index) => (
                    <View key={index} style={styles.user}>
                        <BillPerson
                            user={transaction.ower}
                            size={40}
                            style={styles.image}
                        />
                        <View style={styles.flex}>
                            <Text style={styles.name}>
                                {transaction.ower.name}
                            </Text>
                            <Text>Owes {transaction.amount}лв.</Text>
                        </View>
                        <BillPerson
                            user={transaction.owsTo}
                            size={40}
                            style={styles.image}
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    user: {
        ...Card.card,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    image: {
        marginRight: 15,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
    },
    amount: {},
    flex: {
        flex: 1,
    },
})
