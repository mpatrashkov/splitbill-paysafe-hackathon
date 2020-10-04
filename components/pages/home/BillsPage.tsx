import React, { FunctionComponent, useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Typography, Layout } from "../../../styles"
import { BillOverview } from "../../BillOverview"
import { CustomButton } from "../../CustomButton"
import { ScrollView, FlatList } from "react-native-gesture-handler"
import { Bill } from "../../../types/bill"
import { authHeaders } from "../../../lib/headers"
import { splitBillApi } from "../../../http/splitBillApi"
import { HomeTabsNavigationProps } from "../../../types/navigation"

export const BillsPage: FunctionComponent<HomeTabsNavigationProps<"Bills">> = ({
    navigation,
}) => {
    const [activeBills, setActiveBills] = useState<Bill[]>([])
    const [pastBills, setPastBills] = useState<Bill[]>([])

    useEffect(() => {
        authHeaders()
            .then((headers) =>
                splitBillApi.get("/bills", {
                    headers,
                })
            )
            .then(({ data }) => {
                if (!data.error) {
                    setActiveBills(data.activeBills)
                    setPastBills(data.completedBills)
                }
            })
    }, [])

    const onNewBillClick = () => {
        navigation.push("NewBill")
    }

    const onBillClick = (bill: Bill) => {
        navigation.navigate("Bill", {
            id: bill.id,
        })
    }

    return (
        <ScrollView>
            <View style={Layout.container}>
                <View>
                    <Text style={Typography.sectionHeader}>Current Bills</Text>
                    {activeBills.map((bill) => (
                        <BillOverview
                            style={styles.bill}
                            bill={bill}
                            key={bill.id}
                            onPress={() => onBillClick(bill)}
                        />
                    ))}

                    <CustomButton
                        colour="primary"
                        onPress={onNewBillClick}
                        text="New Bill"
                        style={styles.button}
                    />
                </View>

                <View>
                    <Text style={Typography.sectionHeader}>Past Bills</Text>
                    {pastBills.map((bill) => (
                        <BillOverview
                            style={styles.bill}
                            bill={bill}
                            key={bill.id}
                            onPress={() => onBillClick(bill)}
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    bill: {
        marginVertical: 5,
    },
    button: {
        marginVertical: 5,
    },
})
