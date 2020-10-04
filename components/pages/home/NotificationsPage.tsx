import React, { FunctionComponent } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Typography, Layout, Card } from "../../../styles"
import { User } from "../../../types/user"
import { Bill } from "../../../types/bill"
import { FlatList } from "react-native-gesture-handler"
import { BillPerson } from "../../BillPerson"

const AddedToBill: FunctionComponent<{
    user?: User
    bill?: Bill
    time?: string
}> = () => {
    return (
        <View style={addedToBillStyles.container}>
            <BillPerson style={addedToBillStyles.image} />
            <View style={addedToBillStyles.title}>
                <Text style={addedToBillStyles.name}>Miroslav </Text>
                <Text style={addedToBillStyles.text}>added you to a bill</Text>
            </View>
            <Text>1h</Text>
        </View>
    )
}

const addedToBillStyles = StyleSheet.create({
    container: {
        ...Card.card,
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        marginRight: 15,
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
    },
    text: {
        fontSize: 16,
    },
    title: {
        flex: 1,
        flexDirection: "row",
    },
})

const AskedToPay: FunctionComponent<{
    user: User
    bill: Bill
    time: string
}> = () => {
    return (
        <View>
            <Text>Ask</Text>
        </View>
    )
}

export const NotificationsPage: FunctionComponent = () => {
    const Notification = (type: "addToBill" | "askedToPay") => {
        switch (type) {
            case "addToBill":
                return AddedToBill
            case "askedToPay":
                return AskedToPay
        }
    }

    const data = [1, 1, 1]

    return (
        <View style={Layout.container}>
            <Text style={Typography.sectionHeader}>Notifications</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <AddedToBill />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 5,
    },
})
