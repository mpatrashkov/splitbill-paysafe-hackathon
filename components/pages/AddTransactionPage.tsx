import React, { FunctionComponent, useState, useEffect } from "react"
import { View, SectionList, StyleSheet } from "react-native"
import { RootStackNavigationProps } from "../../types/navigation"
import { TransactionCard } from "../Transaction"
import { Layout } from "../../styles"
import { Transaction } from "../../types/transaction"
import { authHeaders } from "../../lib/headers"
import { splitBillApi } from "../../http/splitBillApi"
import { SectionHeader } from "../SectionHeader"

export const AddTransactionPage: FunctionComponent<RootStackNavigationProps<
    "AddTransaction"
>> = ({ navigation, route }) => {
    const [transactions, setTransactions] = useState<
        {
            title: string
            data: Transaction[]
        }[]
    >([])

    useEffect(() => {
        authHeaders()
            .then((headers) =>
                splitBillApi.get(
                    `/bills/${route.params.id}/transactions/eligible`,
                    {
                        headers,
                    }
                )
            )
            .then(({ data }) => {
                if (!data.error) {
                    const result: {
                        title: string
                        data: Transaction[]
                    }[] = []

                    for (const name in data) {
                        if (data[name].length) {
                            result.push({
                                title: name,
                                data: data[name],
                            })
                        }
                    }

                    setTransactions(result)
                }
            })
    }, [])

    const addTransactionClick = async (id: number) => {
        const headers = await authHeaders()
        await splitBillApi.post(
            `/bills/${route.params.id}`,
            {
                transactionId: id,
            },
            {
                headers,
            }
        )

        let section: {
            title: string
            data: Transaction[]
        } | null = null

        for (const group of transactions) {
            if (group.data.find((transaction) => transaction.id === id)) {
                section = group
                break
            }
        }

        if (section?.data.length === 1) {
            setTransactions(
                transactions.filter((group) => group.title !== section?.title)
            )
        } else {
            setTransactions(
                transactions.map((group) =>
                    group.title === section?.title
                        ? {
                              ...group,
                              data: group.data.filter(
                                  (transaction) => transaction.id === id
                              ),
                          }
                        : group
                )
            )
        }
    }

    return (
        <View style={Layout.container}>
            <SectionList
                sections={transactions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.transaction}>
                        <TransactionCard
                            transaction={item}
                            ownTransaction
                            onPress={() => addTransactionClick(item.id)}
                        />
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <SectionHeader title={title} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    transaction: {
        marginVertical: 5,
    },
})
