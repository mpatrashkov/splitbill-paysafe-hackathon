import React, { FunctionComponent } from "react"
import { View, StyleSheet, Text, Image } from "react-native"
import { Colours } from "../styles"
import { BillPerson } from "./BillPerson"
import { Transaction } from "../types/transaction"
import { splitBillBaseUrl } from "../config"
import moment from "moment"
import { PressEvent } from "../types/types"
import { TouchableOpacity } from "react-native-gesture-handler"

export const TransactionCard: FunctionComponent<{
    transaction: Transaction
    ownTransaction?: boolean
    onPress?: PressEvent
}> = ({ transaction, ownTransaction = false, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {!ownTransaction ? (
                <BillPerson
                    style={styles.image}
                    size={50}
                    user={transaction.user}
                />
            ) : (
                <Image
                    source={{
                        uri: `${splitBillBaseUrl}/logos/${transaction.bankId}_logo.png`,
                    }}
                    style={styles.bankImage}
                />
            )}
            <View style={styles.name}>
                <Text style={styles.title}>{transaction.description}</Text>
                <Text style={styles.amount}>{transaction.amount}лв.</Text>
            </View>
            <View>
                <Text style={styles.amount}>
                    {moment(transaction.date).fromNow()}
                </Text>
            </View>
        </TouchableOpacity>
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
    bankImage: {
        marginRight: 15,
        width: 50,
        height: 50,
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
