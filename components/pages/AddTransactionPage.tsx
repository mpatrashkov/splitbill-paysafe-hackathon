import React, { FunctionComponent } from "react"
import { View, Text, SectionList, StyleSheet } from "react-native"
import { RootStackNavigationProps } from "../../types/navigation"
import { TransactionCard } from "../Transaction"
import { Layout } from "../../styles"

const SectionHeader: FunctionComponent<{
    title: string
}> = ({ title }) => {
    return (
        <View style={sectionHeaderStyles.container}>
            <Text>{title}</Text>
        </View>
    )
}

const sectionHeaderStyles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginVertical: 10,
    },
})

export const AddTransactionPage: FunctionComponent<RootStackNavigationProps<
    "AddTransaction"
>> = ({ navigation, route }) => {
    const data = [
        {
            title: "27.9.2020",
            data: [1, 1, 1],
        },
        {
            title: "27.6.2020",
            data: [1, 1],
        },
        {
            title: "2.1.2020",
            data: [1, 1, 1, 1],
        },
    ]

    return (
        <View style={Layout.container}>
            <SectionList
                sections={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.transaction}>
                        <TransactionCard />
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
